/*
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);
    const newCart = { ...cart };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <MdShoppingCart size={36} className="text-gray-700" />
                    Your Cart
                </h1>
                <p className="text-lg text-gray-600 mt-2">All your selected items</p>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
                <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                    Product
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    Price
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    Quantity
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    Total
                </div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                    cart.map((item, i) => <ItemContent key={i} {...item}/>)}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(newCart?.totalPrice)}</span>
                    </div>

                    <p className="text-slate-500">
                        Taxes and shipping calculated at checkout
                    </p>

                    <Link 
                        className="w-full flex justify-end" 
                        to={user ? "/checkout" : "/register"}
                        onClick={(e) => {
                            if (!user) {
                                toast("¡Ya casi! Por favor regístrate para completar tu orden", { icon: "👋" })
                            }
                        }}
                    >
                    <button
                        className="font-semibold w-[300px] py-2 px-4 rounded-xs bg-custom-blue text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duration-500">
                        <MdShoppingCart size={20} />
                        Checkout
                    </button>
                    </Link>

                    <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
*/

import { motion } from 'framer-motion';
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
import { FiChevronRight, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, totalPrice } = useSelector((state) => state.carts);
    const { cartConsole } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);
    const newCart = { ...cart };

    const handleWhatsApp = () => {
    const telefono = `${import.meta.env.VITE_TELEFONO_WHATSSAPP}`;

    const productos = cart
        .map(p => `• ${p.productName} x${p.quantity}`)
        .join("\n");

    const mensaje = `Hola, quiero hacer este pedido 👇
*-------------------------*
🛒 *Productos:*
${productos}
*-------------------------*
💰 *Total:* $${totalPrice}
*-------------------------*
Quedo atento a la confirmación 👍
*-------------------------*
📲 *| Enviado desde la tienda online |*`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
};

    const handleCheckout = () => {
        if (!user) {
            toast("¡Ya casi! Por favor regístrate para completar tu orden", { icon: "👋" });
            navigate("/register");
            return;
        }

        const roles = user?.roles || [];

        if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_SELLER")) {
            navigate("/checkout");
        } else if (roles.includes("ROLE_USER")) {
            handleWhatsApp();
        }
    };

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="flex-1 flex justify-center py-8 lg:py-12 px-4 w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full max-w-[1100px] flex flex-col lg:flex-row gap-8 mt-[80px]">
                {/* Left Hand Side: Cart Items */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                            <Link to="/products" className="hover:text-custom-blue transition-colors">Productos</Link>
                            <FiChevronRight size={20} />
                            <span className="text-custom-blue">Carrito</span>
                        </div>
                        <h1 className="text-slate-900  text-4xl font-black leading-tight tracking-tight flex items-center gap-3">
                            <MdShoppingCart size={36} className="text-slate-900 dark:text-white" />
                            Tus Productos
                        </h1>
                        <p className="text-slate-700 text-sm font-medium">Todos tus productos seleccionados</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {cart && cart.length > 0 &&
                                cart.map((item, i) => <ItemContent key={i} {...item} />)}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100 dark:border-blue-800 mt-4">
                        <FiInfo size={20} className="text-blue-500" />
                        <p className="text-slate-700  text-sm font-medium">Tu carrito está listo. El costo de envío se calculará al confirmar tu dirección de entrega.</p>
                    </div>
                </div>

                {/* Right Hand Side: Order Summary */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="bg-white p-8 rounded-xl shadow-xl border sticky top-24 border-black/15 border-2">
                        <h3 className="text-slate-900 text-2xl font-extrabold mb-6">Detalle del pedido</h3>
                        <div className="flex flex-col gap-4 mb-6">

                            <div className="flex justify-between items-center text-slate-600">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-bold text-slate-900">{formatPrice(newCart?.totalPrice)}</span>
                            </div>
                            {/**<div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                <span className="font-medium">Envío</span>
                                <span className="text-custom-blue font-bold">Calculated at checkout</span>
                            </div> */}

                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-extrabold text-slate-900">Total</span>
                                <span className="text-2xl font-black text-custom-blue">{formatPrice(newCart?.totalPrice)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* <Link 
                                className="w-full bg-custom-blue hover:bg-blue-700 text-white flex items-center justify-center gap-3 py-4 rounded-xl font-extrabold text-lg transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                                to={user ? "/checkout" : "/register"}
                                onClick={(e) => {
                                    if (!user) {
                                        toast("¡Ya casi! Por favor regístrate para completar tu orden", { icon: "👋" })
                                    }
                                }}
                            >
                                <MdShoppingCart size={24} />
                                Checkout
                            </Link>*/}
                            <button
                                className="w-full bg-success
                                cursor-pointer hover:bg-on-success text-white flex items-center justify-center gap-3 py-4 rounded-xl font-extrabold text-lg transition-all shadow-lg shadow-blue-200 dark:shadow-none"
                                onClick={handleCheckout}
                            >
                                <FaWhatsapp size={28} />
                                Comprar
                            </button>

                            <Link
                                className="w-full text-white
                                bg-blue hover:bg-on-blue dark:hover:bg-slate-260 py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                                to="/products"
                            >
                                <MdArrowBack size={20} />
                                Continuar comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Cart;