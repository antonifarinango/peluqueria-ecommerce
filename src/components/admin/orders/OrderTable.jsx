import { DataGrid } from '@mui/x-data-grid'
import { adminOrderTableColumn } from '../../helper/tableColumn';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import UpdateOrderForm from './UpdateOrderForm';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useDispatch } from 'react-redux';
import { getAddressesById } from '../../../store/actions';

const OrderTable = ({ adminOrder, pagination }) => {
  const dispatch = useDispatch();
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrder?.map((item) => {
    return {
      id: item.orderId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.orderStatus,
      date: item.orderDate,
      orderProductId: item.orderItems
        .map(i => i.product.productId)
        .join(", "),
      orderProduct: item.orderItems
        .map(i => i.product.productName)
        .join(", ")
      
    }
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`)
  }

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  }

  const handleViewPdf = async (row) => {
    const fullOrder = adminOrder.find(o => o.orderId === row.id);
    if (!fullOrder) return;
    
    let addressData = null;
    if (fullOrder.addressId) {
        try {
            addressData = await dispatch(getAddressesById(fullOrder.addressId));
        } catch (e) {
            console.error("No se pudo cargar la direccion", e);
        }
    }
    
    await generateOrderPDF(fullOrder, addressData);
  }

  const generateOrderPDF = async (order, addressData) => {
    const doc = new jsPDF();

    // Colores principales
    const primaryColor = [63, 81, 181]; // Azul tipo Índigo (puedes ajustarlo)
    const secondaryColor = [100, 100, 100]; // Gris oscuro
    
    // ==========================================
    // 1. HEADER (LOGO Y DATOS DE LA EMPRESA)
    // ==========================================
    // NOTA: Para poner el logo real de tu empresa, puedes convertir el logo a Base64
    // o cargar la imagen y usar doc.addImage. Aquí dejamos un espacio / cuadro de ejemplo.
    
    // Cargamos la imagen desde la carpeta public (Vite la sirve en la ruta raíz)
    const logoUrl = "/logo.png";
    doc.addImage(logoUrl, 'PNG', 14, 15, 30, 30);
    
    // Datos de la empresa (Izquierda)
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...secondaryColor);
    doc.text("[Nombre de tu empresa S.A.]", 14, 52);
    doc.setFontSize(9);
    doc.text("Rut: 76.123.456-7", 14, 57);
    doc.text("Dirección: Calle Falsa 123", 14, 62);
    doc.text("Teléfono: (555) 123-4567", 14, 67);
    doc.text("Correo: ventas@miempresa.com", 14, 72);
    doc.text("Sitio Web: www.miempresa.com", 14, 77);

    // ==========================================
    // 2. ORDEN DE COMPRA Y FECHA (Derecha)
    // ==========================================
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(150, 150, 150); // Color gris claro o azul para el titulo
    doc.text("ORDEN DE COMPRA", 196, 25, { align: "right" });
    
    // Cuadro de Número y Fecha usando autoTable
    autoTable(doc, {
      body: [
        ['Fecha', order.orderDate || "N/A"],
        ['Número de Orden', order.orderId || "N/A"]
      ],
      theme: 'plain',
      styles: { fontSize: 10, halign: 'right', cellPadding: 1 },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: secondaryColor },
        1: { textColor: [0, 0, 0], halign: 'center', lineWidth: 0.1, lineColor: secondaryColor }
      },
      margin: { left: 130 },
      startY: 32,
      tableWidth: 66
    });

    // ==========================================
    // 3. DATOS DEL CLIENTE
    // ==========================================
    autoTable(doc, {
      head: [['SEÑORES:']],
      body: [
        // PARA ORDENES SIN STRIPE
        [`A nombre de: ${order.nombre || order.email || "Cliente anónimo"}`],
        [`Dirección de envío: ${addressData ? [addressData.buildingName, addressData.street, addressData.city, addressData.state, addressData.country, addressData.pincode].filter(Boolean).join(", ") : `ID de Dirección ${order.addressId || "N/A"}`}`],
        // PARA ORDENES SIN STRIPE
        [`Teléfono: ${order.telefono || addressData?.mobileNumber || "N/A"}`],
        [`Estado del Pago: ${order.payment?.pgStatus || "Pendiente"} (${order.payment?.paymentMethod || ""})`]
        
        /* NECESARIO PARA IMPLEMENTAR STRIPE
        [`A nombre de: ${order.email || "Cliente anónimo"}`],
        [`Dirección de envío: ${addressData ? [addressData.buildingName, addressData.street, addressData.city, addressData.state, addressData.country, addressData.pincode].filter(Boolean).join(", ") : `ID de Dirección ${order.addressId || "N/A"}`}`],
        [`Teléfono: ${addressData?.mobileNumber || addressData?.mobileNumber}`],
        [`Estado del Pago: ${order.payment?.pgStatus || "Pendiente"} (${order.payment?.paymentMethod || ""})`]
        */
      ],
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 11, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: [0, 0, 0], lineColor: [255,255,255] },
      margin: { left: 14, right: 14 },
      startY: 90
    });

    // ==========================================
    // 4. TABLA DE ARTÍCULOS
    // ==========================================
    const tableColumn = ["ARTICULO #", "DESCRIPCIÓN", "CANT", "Precio Unitario", "Descuento", "TOTAL"];
    const tableRows = [];
    
    // Sumatorias calculadas por si faltan en el backend
    let subtotalCalc = 0;

    order.orderItems?.forEach((item) => {
        const pId = item.product?.productId || "--";
        const pName = item.product?.productName || "Desconocido";
        const unitPrice = item.product?.price || item.orderedProductPrice || 0;
        const qty = item.quantity || 0;
        
        // Descuento en % o estático
        const itemDiscount = item.discount || 0; 
        const rowTotal = item.orderedProductPrice * qty;
        
        subtotalCalc += rowTotal;

        tableRows.push([
            `[${pId}]`,
            pName,
            qty,
            `$${unitPrice.toFixed(2)}`,
            `${itemDiscount}%`,
            `$${rowTotal.toFixed(2)}`
        ]);
    });

    let finalYItems = doc.lastAutoTable?.finalY || 100;

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: doc.lastAutoTable.finalY + 10,
      theme: 'grid',
      headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 9, halign: 'center' },
      bodyStyles: { fontSize: 9, textColor: 50 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 30 },
        1: { halign: 'left' },
        2: { halign: 'center', cellWidth: 20 },
        3: { halign: 'right', cellWidth: 30 },
        4: { halign: 'center', cellWidth: 25 },
        5: { halign: 'right', cellWidth: 30 },
      },
    });

    finalYItems = doc.lastAutoTable.finalY;

    // ==========================================
    // 5. CAJA DE COMENTARIOS Y TABLA DE TOTALES
    // ==========================================
    
    // Caja de comentarios (Izquierda)
    autoTable(doc, {
      head: [['Comentarios o instrucciones especiales']],
      body: [['El pedido fue procesado exitosamente.\nGracias por su compra.']],
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontSize: 9 },
      bodyStyles: { fontSize: 9, minCellHeight: 30 },
      margin: { left: 14 },
      tableWidth: 100,
      startY: finalYItems + 10
    });

    // Módulos de Totales (Derecha)
    // El total real que cobraste (invoice amount)
    const orderTotalAmount = order.totalAmount || subtotalCalc;
    // Si manejas IVA real, calculalo, si no, es demostrativo o dejas solo NETO y TOTAL
    
    autoTable(doc, {
      body: [
        ['SUBTOTAL', `$${subtotalCalc.toFixed(2)}`],
        //['IVA (19%)', `$0.00`], // Modifica según tu lógica de impuestos si la tienes
        ['OTROS', `$0.00`],
        ['TOTAL', `$${orderTotalAmount.toFixed(2)}`]
      ],
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'left', cellWidth: 40, textColor: 50 },
        1: { halign: 'right', lineWidth: 0.1, lineColor: 200 }
      },
      margin: { left: 120 },
      startY: finalYItems + 10
    });
    
    // Fondo de color para el TOTAL final (Reconstruir la ultima fila del total simulando la imagen)
    const finalTotalsY = doc.lastAutoTable.finalY;
    doc.setFillColor(...primaryColor);
    doc.setGState(new doc.GState({opacity: 0.25}));
    doc.rect(120, finalTotalsY - 7.5, 76, 7.5, 'F');
    doc.setGState(new doc.GState({opacity: 1.0}));

    // ==========================================
    // 6. RENDERIZADO DEL PDF
    // ==========================================
    // Abre el PDF en una nueva pestaña
    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div>
      <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>
        All Orders
      </h1>

      <div>
        <DataGrid
          className='w-full'
          rows={tableRecords}
          columns={adminOrderTableColumn(handleEdit, handleViewPdf)}
          paginationMode='server'
          rowCount={pagination?.totalElements || 0}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pagination?.pageSize || 10,
                page: currentPage - 1,
              },
            },
          }}
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnClick
          disableColumnResize
          pageSizeOptions={[pagination?.pageSize || 10]}
          pagination
          paginationOptions={{
            showFirstButton: true,
            showLastButton: true,
            hideNextButton: currentPage === pagination?.totalPages,
          }}
        />
      </div>

      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title='Update Order Status'>
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          open={updateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
        />
      </Modal>
    </div>
  )
}

export default OrderTable