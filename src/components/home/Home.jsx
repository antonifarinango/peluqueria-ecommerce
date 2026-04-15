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
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9_sjdDb_LgCLlVOPKpXJSOCa-joF033DlHlCeiN-1fiB8RJTyFYu03M3vce0mfqyVNYh9H-DzAPFtEpnFGNHtECrcvRZVX0-mwZ426x-D8-CM5LFZDbNuer0_isegh5lxLoC1sXAEx2FiCh7rWp0fgL_Y0QdqbsVeqLf23VHhKWi6QfW7aPx9WK3x81028jyglmhGMOephG4bFphQSgxZcNp7ZYXUckShoYCFlUfqAHZXSZHD6xhKDyLT5PrgDQwNApnJ40Xik9rv" 
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
                        <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">ESTABLECIDO EN 2024</span>
                        <h1 className="font-headline text-6xl md:text-8xl leading-[1.1] tracking-tight text-on-surface">
                            Arte en <br/><span className="serif-italic">Cada Fibra.</span>
                        </h1>
                        <p className="text-secondary text-lg max-w-md leading-relaxed font-body">
                            Un santuario boutique donde la precisión editorial se encuentra con la belleza sin esfuerzo. Curamos looks que definen identidades.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <Link to="/contact" className="bg-primary hover:bg-primary-container text-on-primary px-10 py-5 rounded-md transition-all duration-300 font-medium tracking-wide shadow-lg shadow-primary/20">
                                RESERVA TU SESIÓN
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Specializations Section (Bento Grid) */}
            <section className="py-32 bg-surface">
                <div className="max-w-screen-2xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="font-headline text-4xl md:text-5xl mb-6">Nuestras Especialidades</h2>
                            <p className="text-secondary text-lg font-body">Desde cortes arquitectónicos hasta color multidimensional, nuestros servicios se adaptan a la textura y el ritmo único de tu cabello.</p>
                        </div>
                        <Link to="/products" className="text-primary font-medium flex items-center gap-2 border-b border-primary/20 pb-1 hover:border-primary transition-all font-label text-xs tracking-widest uppercase">
                            VER MENÚ COMPLETO <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Cut */}
                        <motion.div 
                          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                          className="md:col-span-4 bg-surface-container-low p-10 rounded-xl group hover:bg-surface-container transition-colors duration-500"
                        >
                            <FiScissors className="text-4xl text-primary mb-8" />
                            <h3 className="font-headline text-2xl mb-4">Cortes de Precisión</h3>
                            <p className="text-secondary mb-8 font-body">Modelado arquitectónico diseñado para crecer maravillosamente. Incluye lavado y secado de autor.</p>
                            <ul className="space-y-3 text-sm text-on-surface-variant font-medium font-label tracking-wide">
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Corte Master Stylist</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Transformación Creativa</li>
                                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Flequillo y Enmarcado Facial</li>
                            </ul>
                        </motion.div>
                        
                        {/* Color Image Block */}
                        <motion.div 
                          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                          className="md:col-span-5 relative overflow-hidden rounded-xl h-[450px] group"
                        >
                            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlArxI7bkptJgxIHUDkjkoxYmfaDds0L-zR3GfiqVyPsd8A-X12oBGvp6OMbNa-j8CkEcN8mb-0w1KvSQAzIN5grRs-KlNDKiKBQ5kwkQoLGDN4X4X-80oj6347_8YHoMt2vxazqZhZDm91_BqF26vYH9B2k1dGSyt5cp1lBvwE_46QoDpVVQYhtk5k60MshSZIkk0SjF2mS-J00VF74FsgLhx-HSVANjjaZTfQ_CnBAoN5P9QZze3V7fV1A8m5_7wyNLbfpHQLEne" alt="Color Editorial"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-10 text-white">
                                <h3 className="font-headline text-3xl mb-2">Color Editorial</h3>
                                <p className="text-white/80 max-w-xs font-body">Balayage a medida y transformaciones correctivas.</p>
                            </div>
                        </motion.div>

                        {/* Styling Block */}
                        <motion.div 
                          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                          className="md:col-span-3 bg-primary text-on-primary p-10 rounded-xl flex flex-col justify-between group"
                        >
                            <div>
                                <FiStar className="text-4xl mb-8 group-hover:rotate-12 transition-transform" />
                                <h3 className="font-headline text-2xl mb-4">La Suite de Peinado</h3>
                                <p className="text-on-primary/80 font-body">Ondas de alfombra roja, alisados de seda y peinados editoriales de vanguardia.</p>
                            </div>
                            <button className="mt-8 border border-on-primary/30 py-3 rounded-lg hover:bg-on-primary hover:text-primary transition-all text-xs font-bold uppercase tracking-widest font-label">
                                EXPLORAR LOOKS
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-32 bg-surface-container-low">
                <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] bg-surface-container-highest rounded-xl overflow-hidden shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-700">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsYR0zun-mhOMLpOpmJ52g-FPgt2Czi03VrOrGkBhqyoxW5uuN418M-rWfNZTNtUGyKCIhS9ljbdutRpWQcJ4LJH7Q6K9kr2FQr94OmiB2XRbh9gX6OYSAHajvhFiXZig55WFJ-DKuC8V-uoO-Zap6GqMguVthiTHVBH46uQ07wa4YEHXQ2rWt7XgxIOOa1xWs10AXJQ7afYHJPIfR4O9OzSAGSKbWNDvAWTNWqSB3C6-8qDoN-iXKLgul2Dq_Ics1PxD-lk7Yxg6c" alt="Salon Interior"/>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-white p-4 rounded-xl shadow-xl rotate-[3deg] hidden lg:block">
                            <img className="w-full h-full object-cover rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPHvd0F2tBkxttROyckyY60881wMz-JYN2gzwEyxXUV2O6XjzTehLoJCRdCH95nhHCekSRAk0mDvsTDmxhOcfKSLN6rtUoW9VmAN69RE67b8wbxyGwe6GOmIpIN9iaA0_5x6QoOzp5JD7JjEiOq_-Xnu5j9qP4PCdadkwivIw1jmL0D_cmLNoHWtCXgTECztx9TsQwOj3-oNylrXH4n2H451S3m13r2nPWZUyD5M9aHurAqIR8IuBdY5V3aYDburrJ5n5zKcmFOycD" alt="Stylist Working"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="font-label uppercase tracking-[0.2em] text-primary font-bold text-xs">NUESTRA FILOSOFÍA</span>
                        <h2 className="font-headline text-4xl md:text-5xl leading-tight">Más allá de la silla: <br/><span className="serif-italic">La Experiencia Curada.</span></h2>
                        <p className="text-secondary text-lg leading-relaxed font-body">
                            En The Editorial Salon, creemos que el cabello es la expresión más íntima de la marca personal. Fundado por estilistas galardonados, nuestro espacio está diseñado para ser un estudio colaborativo donde la visión se encuentra con la técnica.
                        </p>
                        <div className="grid grid-cols-2 gap-8 py-4">
                            <div>
                                <p className="text-4xl font-headline text-primary tracking-tighter transition-all hover:scale-105">15+</p>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-1 font-label font-bold">Años de Excelencia</p>
                            </div>
                            <div>
                                <p className="text-4xl font-headline text-primary tracking-tighter transition-all hover:scale-105">100%</p>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-1 font-label font-bold">Cuidado a Medida</p>
                            </div>
                        </div>
                        <div className="p-6 bg-surface-container-highest/30 rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                            <p className="italic text-on-surface-variant font-medium font-body leading-relaxed">"No solo seguimos tendencias; las editamos para que se adapten a tu estilo de vida."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Apothecary Callout */}
            <section className="py-20 bg-background">
                <div className="max-w-screen-2xl mx-auto px-8">
                    <div className="bg-surface-container-lowest p-12 md:p-20 rounded-2xl flex flex-col md:flex-row gap-12 items-center justify-between border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="font-headline text-3xl mb-4 italic">Boticario Exclusivo</h3>
                            <p className="text-secondary text-lg font-body leading-relaxed">Nuestra colección curada de cuidado capilar profesional está disponible exclusivamente en tienda o mediante consulta personalizada por WhatsApp para entrega local.</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="https://wa.me/yournumber" className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-green-200/50 hover:scale-105">
                                <FiMessageSquare size={20} />
                                COMPRAR POR WHATSAPP
                            </a>
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
