import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiScissors, FiStar, FiTriangle } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from 'react';

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
    useEffect(() => {
        const coords = [-0.083994, -78.430859];
        const map = L.map("mapid").setView(coords, 16);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
            }
        ).addTo(map);

        L.marker(coords)
            .addTo(map)
            .bindPopup("<b>Estilos Any Look</b>")
            .openPopup();

        map.scrollWheelZoom.disable();
        map.touchZoom.disable();

        return () => map.remove();
    }, []);

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
                        <span className="label-md uppercase tracking-[0.3em] text-primary font-bold text-xs">DESDE 2010</span>
                        <h1 className="font-headline text-5xl md:text-8xl text-on-surface leading-tight">Sobre Mí</h1>
                        <p className="text-secondary text-lg max-w-xl font-body leading-relaxed">
                            Soy una profesional apasionada por el cuidado y la estética del cabello. Trabajo con productos de alta calidad y me mantengo en constante actualización para ofrecerte lo mejor en cortes, coloración y tratamientos.
                            <br />
                            Mi enfoque es brindarte una atención personalizada, entendiendo tu estilo y necesidades para lograr resultados que realmente te representen.
                        </p>

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

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="w-full bg-on-surface py-20"
            >
                {/* CONTENIDO INTERNO */}
                <div className="max-w-screen-xl mx-auto px-6 md:px-8">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                        <div>
                            <h3 className="text-7xl font-bold text-white">+200</h3>
                            <p className="text-lg text-gray-300">Clientes</p>
                        </div>

                        <div>
                            <h3 className="text-7xl font-bold text-white">5+</h3>
                            <p className="text-lg text-gray-300">Años</p>
                        </div>

                        <div>
                            <h3 className="text-7xl font-bold text-white">100%</h3>
                            <p className="text-lg text-gray-300">Satisfacción</p>
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
                        <h2 className="font-headline text-4xl mb-12 text-on-surface">Visítanos</h2>
                        <div className="flex flex-col gap-10">
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiMapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">Estilos Any Look</h4>
                                    <p className="text-secondary font-body text-lg leading-relaxed">De los Fundadores y Sebastián de Benalcázar</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiPhone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">Whatssapp</h4>
                                    <p className="text-secondary font-body text-lg">0985143439</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-full text-primary">
                                    <FiMail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-headline text-xl mb-2">TikTok</h4>
                                    <p className="text-secondary font-body text-lg">hello@editorialsalon.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12 justify-center">
                        <div className="aspect-video bg-surface-container rounded-sm overflow-hidden shadow-xl">
                            <div id="mapid" style={{ width: "100%", height: "400px" }} className='z-10'></div>
                        </div>
                        <div className="p-10 border-l-8 border-primary bg-surface-container-low italic">
                            <p className="text-2xl font-headline text-on-surface mb-4">"El cabello es el único accesorio que nunca te quitas. Nos aseguramos de que sea el correcto."</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-40 bg-on-surface text-center px-8">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <h2 className="font-headline text-5xl md:text-7xl mb-12 text-surface leading-tight tracking-tighter">Porque tu imagen importa, aquí encontrarás el cuidado y estilo que mereces.</h2>
                </div>
            </section>
        </div>
    );
}
