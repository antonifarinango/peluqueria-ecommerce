import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";
import { FiArrowRight, FiPhone, FiScissors, FiStar, FiMessageSquare, FiCalendar, FiUser, FiMail } from "react-icons/fi";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="w-full bg-background selection:bg-primary-fixed selection:text-on-primary-fixed">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
                        src="/img-hero.png"
                        alt="Arte en cada fibra"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="flex flex-col gap-8 items-start"
                    >
                        <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">DESDE 2014</span>
                        <h1 className="font-headline text-6xl md:text-7xl leading-[1.1] tracking-tight text-on-surface w-full">
                            Todo lo que necesitas para cuidar tu imagen en un solo lugar.
                        </h1>
                        <p className="text-secondary text-lg leading-relaxed font-body col-span-1">
                            En nuestra peluquería combinamos técnica, tendencia y atención personalizada para ofrecerte un resultado que realmente refleje tu esencia. No se trata solo de un corte, sino de cómo te sientes al salir.
                        </p>
                        <div className="flex gap-4 mt-4">

                            <a href="https://wa.me/593985143439?text=Hola,%20quiero%20reservar%20una%20cita."
                                target="_blank"
                                rel="noopener noreferrer"
                                className='bg-primary hover:bg-primary-container text-on-primary px-10 py-5 rounded-md transition-all duration-300 font-medium tracking-wide shadow-lg shadow-primary/20'>
                                RESERVA TU SESIÓN
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Specializations Section (Bento Grid) */}
            <section className="py-32 bg-surface">
                <div className="max-w-screen-2xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="font-headline text-4xl md:text-5xl mb-6">¿ Por qué elegirnos ?</h2>
                        </div>
                        <Link to="/services" className="text-primary font-medium flex items-center gap-2 border-b border-primary/20 pb-1 hover:border-primary transition-all font-label text-xs tracking-widest uppercase">
                            VER SERVICIOS <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Cut */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="md:col-span-4 bg-surface-container-low px-10 rounded-xl group hover:bg-surface-container transition-colors duration-500"
                        >
                            <div>
                                <div className='flex align-center gap-2'>
                                    <FiStar className='mt-3 text-primary'></FiStar>
                                    <h3 className="py-1 font-headline text-2xl ">Experiencia y dedicación</h3>
                                </div>

                                <p className="text-secondary mb-8 font-body">Trabajamos con compromiso y enfoque en cada detalle para lograr resultados que te hagan sentir segura y satisfecha.</p>
                            </div>

                            <div>
                                <div className='flex align-center gap-2'>
                                    <FiStar className='mt-3 text-primary'></FiStar>
                                    <h3 className="font-headline text-2xl py-1">Productos de calidad</h3>
                                </div>
                                <p className="text-secondary mb-8 font-body">Utilizamos productos que cuidan tu cabello y garantizan un mejor acabado y mayor duración.</p>
                            </div>
                            <div>
                                <div className='flex align-center gap-2'>
                                    <FiStar className='mt-3 text-primary'></FiStar>
                                    <h3 className="font-headline text-2xl py-1">Ambiente cómodo y agradable</h3>
                                </div>
                                <p className="text-secondary mb-8 font-body">Un espacio pensado para que te relajes y disfrutes tu tiempo mientras cuidas tu imagen.</p>
                            </div>
                            <div>
                                <div className='flex align-center gap-2'>
                                    <FiStar className='mt-3 text-primary'></FiStar>
                                    <h3 className="font-headline text-2xl py-1">Resultados que se notan</h3>
                                </div>
                                <p className="text-secondary mb-8 font-body">El objetivo es que salgas viendo un cambio real, con un look que resalte tu estilo y confianza.</p>
                            </div>


                        </motion.div>

                        {/* Color Image Block */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="md:col-span-5 relative overflow-hidden rounded-xl  group"
                        >
                            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="/img-inicio.png" alt="Color Editorial" />
                        </motion.div>

                        {/* Styling Block */}
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                            className="md:col-span-3 text-on-primary rounded-xl flex flex-col justify-between group overflow-hidden"
                        >
                            <div className='h-[450px] hover:scale-110 transition-transform duration-1000 '>
                                <img src="/img-peinado-inicio.jpg" alt="" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-32 bg-surface-container-low">
                <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] bg-surface-container-highest rounded-xl overflow-hidden shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-700">
                            <img className="w-full h-full object-cover" src="/inicio-2.jpg" alt="cuidado de la piel" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-white p-1 rounded-xl shadow-xl rotate-[3deg] hidden lg:block">
                            <img className="w-full h-full object-cover rounded-lg" src="/productos-inicio.jpg" alt="Stylist Working" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="font-label uppercase tracking-[0.2em] text-primary font-bold text-xs">Productos naturales</span>
                        <h2 className="font-headline text-4xl md:text-5xl leading-tight"><span className='text-primary'>Cuida y realza </span>tu belleza todos los días con nuestros productos naturales</h2>
                        <p className="text-secondary text-lg leading-relaxed font-body">
                            Descubre <span className='text-primary font-semibold'>productos naturales </span>diseñados para cuidar, restaurar y potenciar tu cabello y tu piel. Cada fórmula está pensada para ofrecer resultados visibles, respetando tu bienestar y resaltando tu belleza de forma natural.
                            <br />
                            Trabajamos con productos elaborados con <span className='text-primary font-semibold'>ingredientes 100% naturales</span>, seleccionados por sus beneficios reales para el cuidado del cabello y la piel. Cada fórmula está pensada para nutrir, restaurar y proteger sin recurrir a químicos agresivos.
                            <br />
                            El uso constante de estos productos ayuda a mejorar la textura, fortalecer desde la raíz y mantener una apariencia saludable y equilibrada. Son ideales para incorporar en tu rutina diaria y prolongar los resultados de cada servicio.
                        </p>
                        <div className="grid grid-cols-2 gap-8 py-4">
                            <div>
                                <p className="text-4xl font-headline text-primary tracking-tighter transition-all hover:scale-105">100%</p>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-1 font-label font-bold">
                                    Ingredientes Naturales
                                </p>
                            </div>
                            <div>
                                <p className="text-4xl font-headline text-primary tracking-tighter transition-all hover:scale-105">0%</p>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-1 font-label font-bold">
                                    Químicos Agresivos
                                </p>
                            </div>
                        </div>
                        <div className="p-6 bg-surface-container-highest/30 rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                            <p className="italic text-on-surface-variant font-medium font-body leading-relaxed">"Resultados visibles, cuidado natural."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Apothecary Callout */}
            <section className="py-20 bg-background">
                <div className="max-w-screen-2xl mx-auto px-8">
                    <div className="p-12 md:p-20 rounded-2xl flex flex-col md:flex-row gap-12 items-center justify-between border border-2  shadow-sm transition-all hover:shadow-md">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="font-headline text-3xl mb-4 italic">Descubre nuestros productos naturales</h3>
                            <p className="text-secondary text-lg font-body leading-relaxed">
                                Explora una selección de productos 100% naturales para el cuidado del cabello y la piel. Agrégalos a tu carrito directamente desde esta página y realiza tu pedido de forma rápida a través de WhatsApp, con entrega local.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/products" className="bg-blue flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-green-200/50 hover:scale-105">
                                Revisar Catalógo
                                <FiArrowRight size={25} />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section 
            <section className="py-32 bg-surface" id="book">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-headline text-4xl md:text-5xl mb-6">Reserve Your Seat</h2>
                        <p className="text-secondary font-body">Please provide your details, and our concierge will reach out within 2 hours to confirm your appointment window.</p>
                    </div>
                    <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase font-label">
                                  <FiUser size={12} /> Full Name
                                </label>
                                <input className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 outline-none font-body" placeholder="e.g. Elena Voci" type="text"/>
                            </div>
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase font-label">
                                  <FiMail size={12} /> Email Address
                                </label>
                                <input className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 outline-none font-body" placeholder="elena@example.com" type="email"/>
                            </div>
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase font-label">
                                  <FiScissors size={12} /> Preferred Service
                                </label>
                                <select className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 outline-none appearance-none cursor-pointer font-body">
                                    <option>Signature Cut & Style</option>
                                    <option>Bespoke Color Transformation</option>
                                    <option>Editorial Styling / Event</option>
                                    <option>Repair & Glow Treatment</option>
                                </select>
                            </div>
                            <div className="relative group">
                                <label className="flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-secondary mb-2 uppercase font-label">
                                  <FiCalendar size={12} /> Date & Time
                                </label>
                                <input className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-colors py-2 outline-none font-body" type="datetime-local"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 items-center">
                            <button className="w-full md:w-auto min-w-[300px] bg-primary text-on-primary py-5 px-12 rounded-md font-bold tracking-widest hover:bg-on-primary-container transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20 uppercase font-label" type="submit">
                                REQUEST APPOINTMENT
                            </button>
                            <p className="text-[10px] text-outline text-center uppercase tracking-widest font-label font-bold">By submitting, you agree to our 24-hour cancellation policy.</p>
                        </div>
                    </form>
                </div>
            </section>
            */}
        </div>
    )
}

export default Home;
