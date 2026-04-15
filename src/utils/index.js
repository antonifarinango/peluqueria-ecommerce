import { FaBoxOpen, FaHome, FaShoppingCart, FaStore, FaThList } from "react-icons/fa";
import { bannerImageOne, bannerImageThree, bannerImageTwo } from "./constant";

export const bannerLists = [
  {
    id: 1,
    image: "../../public/s_1.webp",
    title: "Nueva Colección",
    subtitle: "Moda Urbana",
    description: "Descubre prendas que definen tu estilo y marcan tendencia",
  },
  {
    id: 2,
    image: "../../public/s_2.webp",
    title: "Estilo Premium",
    subtitle: "Outfits Exclusivos",
    description: "Eleva tu look con diseños únicos y calidad superior",
  },
  {
    id: 3,
    image: "../../public/s_3.webp",
    title: "Ofertas Especiales",
    subtitle: "Hasta -20%",
    description: "Renueva tu guardarropa con descuentos irresistibles",
  }
];


export const adminNavigation = [
  {
    name: "Panel de control", 
    href: "/admin", 
    icon: FaHome, 
    current: true 
  }, {
    name: "Órdenes", 
    href: "/admin/orders", 
    icon: FaShoppingCart
  }, {
    name: "Productos", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }, {
    name: "Categorías", 
    href: "/admin/categories", 
    icon: FaThList
  }, {
    name: "Vendedores", 
    href: "/admin/sellers", 
    icon: FaStore 
  }
];


export const sellerNavigation = [
  {
    name: "Ordenes", 
    href: "/admin/orders", 
    icon: FaShoppingCart,
    current: true 
  }, {
    name: "Productos", 
    href: "/admin/products", 
    icon: FaBoxOpen
  }
];