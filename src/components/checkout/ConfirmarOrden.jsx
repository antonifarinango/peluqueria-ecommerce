import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stripePaymentConfirmation, createUserCart } from '../../store/actions';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

// PARA ORDENES SIN STRIPE
const ConfirmarOrden = () => {
    const dispatch = useDispatch();
    // PARA ORDENES SIN STRIPE
    const [loading, setLoading] = useState(false);
    // PARA ORDENES SIN STRIPE
    const [errorMessage, setErrorMessage] = useState("");
    
    // PARA ORDENES SIN STRIPE
    const { cart, totalPrice, cartId } = useSelector((state) => state.carts);
    /* NECESARIO PARA IMPLEMENTAR STRIPE 
    const { cart, totalPrice } = useSelector((state) => state.carts);
    */
    // PARA ORDENES SIN STRIPE
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
    const { nombreUsuario, telefonoUsuario } = useSelector((state) => state.usuarios);
    // PARA ORDENES SIN STRIPE
    const { errorMessage: errorsMsg } = useSelector((state) => state.errors);

    // PARA ORDENES SIN STRIPE - Sincronización del carrito con el backend
    useEffect(() => {
        /* NECESARIO PARA IMPLEMENTAR STRIPE
        (El useEffect no existía en la versión inicial sin sincronización)
        */
        if (cart.length > 0 && !cartId && !errorsMsg) {
            const sendCartItems = cart.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });
            dispatch(createUserCart(sendCartItems));
        }
    }, [dispatch, cartId, cart, errorsMsg]);

    const handleConfirmOrder = () => {
        // PARA ORDENES SIN STRIPE - Validación robusta
        if (!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId) {
            /* NECESARIO PARA IMPLEMENTAR STRIPE
            if (!selectedUserCheckoutAddress) {
            */
            toast.error("Por favor, selecciona una dirección de envío válida.");
            return;
        }

        // PARA ORDENES SIN STRIPE - Preparación de datos manuales
        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "Manual",
            pgPaymentId: "MANUAL_" + Date.now(),
            pgStatus: "succeeded",
            pgResponseMessage: `Orden manual para ${nombreUsuario} (${telefonoUsuario})`,
            // PARA ORDENES SIN STRIPE
            nombre: nombreUsuario,
            // PARA ORDENES SIN STRIPE
            telefono: telefonoUsuario
        };

        /* NECESARIO PARA IMPLEMENTAR STRIPE
        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "Manual",
            pgPaymentId: "MANUAL_" + Date.now(),
            pgStatus: "succeeded",
            pgResponseMessage: `Orden manual para ${nombreUsuario} (${telefonoUsuario})`
        };
        */

        // PARA ORDENES SIN STRIPE 
        // console.log("Enviando orden:", sendData);
        setLoading(true);
        // PARA ORDENES SIN STRIPE - Reutilización del endpoint de pagos online
        dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirmar tu Pedido</h2>
            
            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Usuario:</span>
                    <span className="font-semibold text-gray-900">{nombreUsuario}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Teléfono:</span>
                    <span className="font-semibold text-gray-900">{telefonoUsuario}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-lg">
                    <span className="font-bold text-gray-800">Total a pagar:</span>
                    <span className="text-2xl font-black text-custom-blue">
                        ${Number(totalPrice).toFixed(2)}
                    </span>
                </div>
            </div>

            <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className="w-full bg-custom-blue hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {loading ? (
                    <>
                        <Spinners /> Procesando...
                    </>
                ) : (
                    "Confirmar Compra"
                )}
            </button>
            
            {errorMessage && (
                <p className="text-red-500 text-center mt-4 text-sm font-medium">
                    {errorMessage}
                </p>
            )}

            <p className="text-gray-500 text-xs text-center mt-6">
                Al confirmar, tu pedido será registrado y procesado manualmente.
            </p>
        </div>
    )
}

export default ConfirmarOrden
