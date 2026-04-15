import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiScissors, FiStar, FiTriangle } from "react-icons/fi";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
    return (
        <div className="bg-background selection:bg-primary-fixed selection:text-on-primary-fixed">
            {/* Hero Section: Our Heritage */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="w-full pt-32 pb-20 px-8"
            >
                <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="md:w-1/2 flex flex-col gap-8">
                        <span className="label-md uppercase tracking-[0.3em] text-primary font-bold text-xs">ESTABLECIDO EN 2024</span>
                        <h1 className="font-headline text-5xl md:text-8xl text-on-surface leading-tight">Nuestra <br /><span className="italic font-light opacity-90">Herencia.</span></h1>
                        <p className="text-secondary text-lg max-w-xl font-body leading-relaxed">
                            Fundado por un colectivo de estilistas editoriales y directores creativos, The Editorial Salon nació del deseo de cerrar la brecha entre el arte de la alta moda y el lujo cotidiano.
                        </p>
                        <div className="flex gap-12 py-4">
                            <div>
                                <h4 className="text-4xl font-headline text-primary tracking-tighter">NY / LDN</h4>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-2 Manrope font-bold">Raíces Globales</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-headline text-primary tracking-tighter">10k+</h4>
                                <p className="text-[10px] uppercase tracking-widest text-secondary mt-2 Manrope font-bold">Rostros Estilizados</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="aspect-[4/5] bg-surface-container-high rounded-sm overflow-hidden shadow-2xl skew-y-1 transition-transform hover:skew-y-0 duration-700">
                             <img 
                                className="w-full h-full object-cover" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPHvd0F2tBkxttROyckyY60881wMz-JYN2gzwEyxXUV2O6XjzTehLoJCRdCH95nhHCekSRAk0mDvsTDmxhOcfKSLN6rtUoW9VmAN69RE67b8wbxyGwe6GOmIpIN9iaA0_5x6QoOzp5JD7JjEiOq_-Xnu5j9qP4PCdadkwivIw1jmL0D_cmLNoHWtCXgTECztx9TsQwOj3-oNylrXH4n2H451S3m13r2nPWZUyD5M9aHurAqIR8IuBdY5V3aYDburrJ5n5zKcmFOycD" 
                                alt="Studio Interior"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* The Gilt Standard Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="py-32 bg-surface-container-low"
            >
                <div className="max-w-screen-xl mx-auto px-8 text-center flex flex-col items-center gap-10">
                    <FiStar size={40} className="text-primary opacity-30" />
                    <h2 className="font-headline text-4xl md:text-6xl text-on-surface">El Estándar Gilt</h2>
                    <p className="text-secondary text-xl max-w-3xl font-body leading-relaxed">
                        No solo cortamos el cabello; diseñamos siluetas. Cada cita comienza con un mapeo facial integral y un análisis de textura para asegurar que tu estilo sea tan único como tu genoma.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-10">
                        <div className="flex flex-col gap-4 items-center">
                            <FiScissors className="text-3xl text-primary" />
                            <h4 className="font-headline text-xl">Corte Arquitectónico</h4>
                            <p className="text-sm text-secondary font-body">Diseñado para crecer perfectamente durante 8-12 semanas.</p>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <FiTriangle className="text-3xl text-primary" />
                            <h4 className="font-headline text-xl">Sincronización de Textura</h4>
                            <p className="text-sm text-secondary font-body">Productos específicos asignados a tu tipo de cabello biológico.</p>
                        </div>
                        <div className="flex flex-col gap-4 items-center">
                            <FiStar className="text-3xl text-primary" />
                            <h4 className="font-headline text-xl">Lujo Silencioso</h4>
                            <p className="text-sm text-secondary font-body">Un ambiente diseñado para la máxima relajación sensorial.</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Contact & Location Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="py-32 px-8"
            >
                <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="bg-surface-container-high p-12 md:p-20 rounded-sm">
                        <h2 className="font-headline text-4xl mb-12 text-on-surface">Visita el Santuario</h2>
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiMapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">El Estudio de la Quinta Avenida</h4>
                                    <p className="text-secondary font-body text-lg leading-relaxed">1202 Madison Avenue <br />New York, NY 10128</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiPhone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">Conserje Privado</h4>
                                    <p className="text-secondary font-body text-lg">+1 (212) 555-0198</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiMail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">Consultas Generales</h4>
                                    <p className="text-secondary font-body text-lg">hello@editorialsalon.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-12 justify-center">
                        <div className="aspect-video bg-surface-container rounded-sm overflow-hidden shadow-xl">
                            <img 
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_B7SjF7oE-tNoYVOnlF8I9R8u5b6_R8F-XfO_H3hZzT_p8u6f4-N2yT-yQ9M-F_P-f_W-j-p-b-z-z-z-z-z-z-z-z-z-z-z-z-z-z-z-z-z" 
                                alt="Stylist Working"
                            />
                        </div>
                        <div className="p-10 border-l-8 border-primary bg-surface-container-low italic">
                            <p className="text-2xl font-headline text-on-surface mb-4">"El cabello es el único accesorio que nunca te quitas. Nos aseguramos de que sea el correcto."</p>
                            <cite className="font-bold Manrope text-xs tracking-widest uppercase text-secondary">— ELARA VANCE, DIRECTORA FUNDADORA</cite>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-40 bg-on-surface text-center px-8">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <h2 className="font-headline text-5xl md:text-7xl mb-12 text-surface leading-tight tracking-tighter">Modela tu propio <br /><span className="italic font-light opacity-80">futuro.</span></h2>
                    <button className="bg-primary text-on-primary px-12 py-5 rounded-sm hover:scale-105 transition-all font-bold tracking-[0.2em] text-sm uppercase shadow-2xl shadow-primary/20">
                        Reserva tu Transformación
                    </button>
                    <p className="mt-8 text-surface/40 text-xs font-bold tracking-widest uppercase Manrope">Citas limitadas disponibles por mes.</p>
                </div>
            </section>
        </div>
    );
}
