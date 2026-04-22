import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiScissors, FiStar, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Services = () => {
  return (
    <div className="bg-background selection:bg-primary-fixed selection:text-on-primary-fixed pt-32 pb-20">
      {/* Hero Section */}
      <header className="px-8 mb-24 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-50">
          <div className="max-w-2xl">
            <motion.span
              initial="hidden" animate="visible" variants={fadeIn}
              className="font-label text-xs tracking-widest uppercase text-primary mb-6 block font-bold"
            >
              Servicio de calidad
            </motion.span>
            <motion.h1
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-6xl md:text-7xl font-headline text-on-surface leading-none mb-8"
            >
              Nuestros Servicios
            </motion.h1>
            <motion.p
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-xl text-secondary leading-relaxed max-w-lg font-body"
            >
              Descubre una variedad de servicios pensados para resaltar tu estilo, cuidar tu imagen y hacerte sentir segura en cada momento. Cada detalle está enfocado en brindarte resultados visibles y una experiencia que quieras repetir.
            </motion.p>
          </div>
          <div className="hidden md:flex w-150">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="h-150 bg-primary-container-low overflow-hidden shadow-2xl"
            >
              <img
                className="w-full h-full object-cover"
                
                src="/servicios-1.jpg"
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Featured Service Section */}
      <section className="px-8 mb-40 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 relative">
            <div className="aspect-[4/5] bg-surface-container-highest rounded-xl overflow-hidden shadow-2xl group">
              <img
                className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out transform group-hover:scale-105"
                src="/img-servicios.png"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-headline mb-6 text-on-surface leading-tight">Expertos en color</h2>
                <p className="text-secondary leading-relaxed mb-8 font-body text-lg">
                  Trabajamos con técnicas avanzadas de color para brindarte un resultado impecable y duradero. Realzamos tu cabello con tonos personalizados que potencian tu estilo.
                </p>
                <a href="https://wa.me/593985143439?text=Hola,%20quiero%20reservar%20una%20cita."
                  target="_blank"
                  rel="noopener noreferrer"
                  className='bg-primary hover:bg-primary-container text-on-primary px-10 py-5 rounded-md transition-all duration-300 font-medium tracking-wide shadow-lg shadow-primary/20'>
                  RESERVAR
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='flex flex-wrap gap-5 justify-center'>
          <ServiceItem title="Coloración profesional" desc="Dale vida a tu cabello con un color que realmente te represente. Trabajo para lograr tonos intensos, uniformes y duraderos que resalten tu estilo y te hagan sentir renovada desde el primer momento." />

          <ServiceItem title="Corte de cabello" desc="Renueva tu imagen con un corte de cabello profesional que se adapte a tu estilo y personalidad. Ya sea que busques un look clásico, moderno o algo más atrevido, cada detalle se trabaja con precisión para lograr un resultado favorecedor y bien definido." />

          <ServiceItem title="Peinados" desc="¿Tienes un evento especial o simplemente quieres verte diferente? Realizo peinados que destacan, desde looks naturales hasta estilos más elegantes que te harán sentir segura y lista para cualquier ocasión." />

          <ServiceItem title="Microblading" desc="Diseño y definición de cejas mediante técnica semipermanente, logrando un acabado natural que mejora la expresión del rostro y aporta equilibrio." />

          <ServiceItem title="Manicura y pedicura" desc="Luce manos y pies impecables en todo momento. Disfruta de un acabado limpio, elegante y duradero que complementa tu estilo." />

          <ServiceItem title="Tinturado" desc="Cambio o mantenimiento del color del cabello utilizando productos de calidad que ayudan a proteger su estructura, logrando un tono uniforme y acorde a tu estilo." />
        </div>
      </section>

      {/* Final CTA Section 
      <section className="py-48 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="text-6xl md:text-8xl font-headline mb-16 leading-[1.1] tracking-tighter"
          >
            Your transformation <br/><span className="serif-italic opacity-80">awaits.</span>
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link to="/contact" className="w-full md:w-auto px-16 py-6 bg-primary text-on-primary font-label text-xs tracking-widest uppercase hover:bg-primary-container transition-all rounded-md shadow-2xl shadow-primary/20 font-bold">
              Book Appointment
            </Link>
            <Link to="/about" className="w-full md:w-auto px-16 py-6 border border-outline-variant/50 text-on-surface font-label text-xs tracking-widest uppercase hover:bg-surface-container transition-all rounded-md font-bold">
              View Stylists
            </Link>
          </div>
        </div>
      </section>*/}
    </div>
  );
};

const ServiceItem = ({ title, price, desc }) => (
  <div className="group w-120 p-6 bg-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">

    <div className="flex justify-between items-start mb-3">
      <h4 className="text-gray-800 text-lg font-semibold group-hover:text-primary">
        {title}
      </h4>

      <span className="text-sm font-semibold text-gray-600">
        {price}
      </span>
    </div>

    <p className="text-gray-500 text-sm leading-relaxed">
      {desc}
    </p>

  </div>
);

export default Services;
