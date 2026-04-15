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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial="hidden" animate="visible" variants={fadeIn}
              className="font-label text-xs tracking-widest uppercase text-primary mb-6 block font-bold"
            >
              Excelencia Curada
            </motion.span>
            <motion.h1 
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-6xl md:text-8xl font-headline text-on-surface leading-none tracking-tighter mb-8"
            >
              Menú de Servicios
            </motion.h1>
            <motion.p 
              initial="hidden" animate="visible" variants={fadeIn}
              className="text-xl text-secondary leading-relaxed max-w-lg font-body"
            >
              El arte se une a la precisión. Tratamos cada cabello como un lienzo a medida, combinando técnica contemporánea con elegancia atemporal.
            </motion.p>
          </div>
          <div className="hidden md:block">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-48 h-48 bg-surface-container-low rounded-full overflow-hidden shadow-2xl"
            >
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGLElYzYYP6VBJRhC_E3I4Slig8IYb2dsSlyGj_rvkEacf4GarTMtq9kE0zyACdlIv5686kmQTUlChjpDtvekJAEWHR-ZAclejz_V_YYORg-12w3xCOW9NJe_hfCtr6-2qlUd_DFQBiQQqoCwSrTE1ee4HST_gCF5f_tgX5GDfSXwfRjSYe3hXCVpvqZIsv2Zf7nWosA_yr1pw0yJWl6dj3X_WoQsKxNVEFM1dJP7mBPzwHwDxb2kAMMjv1OqsliusRjjmXGnKMfhH" 
                alt="Stylist Hands"
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
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out transform group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzs91W2hvHP-8dYktVkjB42V78lS9aPUoK_B8JrhsDEtwQ0bAR9hZRq8CIdcMzwMkmvvaq1E7VbXm6rpFMpxsJ5Xq000I_bNlRIEJIRsuIYp5ZPUm_cfwKkgRo5PdMAqcrNLijODSTtsUnyupSm6CQbqkxMi2weVYzQJfuPhirphn9CMTffwQb2oiA6hurRXf_7M60KZBmQkwZ2v3SCs-vdj2XXGsD3zCcd3NncGjm--1unnoSDEomVXkS402P6paqcBlmPElo0BnU" 
                alt="Signature Balayage"
              />
            </div>
          </div>
          <div className="md:col-span-5 md:pl-12">
            <div className="space-y-8">
              <div>
                <span className="text-primary font-label text-xs tracking-[0.2em] uppercase mb-4 block font-bold">Técnica de Autor</span>
                <h2 className="text-5xl font-headline mb-6 text-on-surface leading-tight">Balayage Editorial</h2>
                <p className="text-secondary leading-relaxed mb-8 font-body text-lg">
                  Nuestra técnica de pintura a mano alzada diseñada para imitar los efectos naturales de aclarado del sol. Incluye un tratamiento de brillo a medida y un secado de lujo.
                </p>
                <div className="flex items-baseline gap-4 mb-10 border-b border-outline-variant/30 pb-6 w-fit">
                  <span className="text-xs font-label uppercase text-secondary font-bold tracking-widest">Desde</span>
                  <span className="text-4xl font-headline text-primary tracking-tighter">$320</span>
                </div>
                <Link to="/contact" className="inline-block px-12 py-5 bg-primary text-on-primary hover:bg-primary-container transition-all duration-300 font-label text-xs tracking-widest uppercase font-bold rounded-md shadow-xl shadow-primary/20">
                  Reservar Experiencia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Bento Grid */}
      <section className="bg-surface-container-low py-32 rounded-3xl mx-8">
        <div className="px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-12">
            
            {/* Cutting & Styling */}
            <div className="space-y-12">
              <div className="border-b border-outline-variant/30 pb-6 flex items-center gap-4">
                <FiScissors className="text-primary text-2xl" />
                <h3 className="text-3xl font-headline italic">Corte y Peinado</h3>
              </div>
              <div className="space-y-10">
                <ServiceItem title="El Corte Editorial" price="$145+" desc="Corte de precisión que incluye masaje capilar personalizado y secado editorial de autor." />
                <ServiceItem title="Secado de Autor" price="$85+" desc="Peinado de alto volumen y larga duración utilizando productos botánicos franceses de primera calidad." />
                <ServiceItem title="Peinado para Eventos" price="$175+" desc="Recogidos, ondas editoriales o peinado vanguardista a medida para ocasiones especiales." />
              </div>
            </div>

            {/* Color Artistry */}
            <div className="space-y-12">
              <div className="border-b border-outline-variant/30 pb-6 flex items-center gap-4">
                <FiZap className="text-primary text-2xl" />
                <h3 className="text-3xl font-headline italic">Arte del Color</h3>
              </div>
              <div className="space-y-10">
                <ServiceItem title="Color Global Completo" price="$195+" desc="Saturación de un solo proceso de la raíz a las puntas utilizando fórmulas sin amoníaco a base de aceite." />
                <ServiceItem title="Luces Multi-tonales Completas" price="$280+" desc="Técnica tradicional de papel de aluminio para máxima luminosidad y dimensión." />
                <ServiceItem title="Corrección de Color" price="Consulta" desc="Cambios tonales complejos y restauración. Precio determinado previa consulta experta." />
              </div>
            </div>

            {/* Treatments & Rituals */}
            <div className="space-y-12">
              <div className="border-b border-outline-variant/30 pb-6 flex items-center gap-4">
                <FiStar className="text-primary text-2xl" />
                <h3 className="text-3xl font-headline italic">Tratamientos y Rituales</h3>
              </div>
              <div className="space-y-10">
                <ServiceItem title="Reparación Molecular" price="$65+" desc="Tratamiento de péptidos K12 para revertir el daño causado por el calor y los servicios químicos." />
                <ServiceItem title="Brillo y Resplandor" price="$95+" desc="Brillo de unión ácida para sellar las cutículas y proporcionar un reflejo tipo espejo." />
                <ServiceItem title="Ritual de Detox Capilar" price="$110+" desc="Exfoliación seguida de una mascarilla de arcilla botánica rica en nutrientes." />
              </div>
            </div>

          </div>
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
  <div className="group">
    <div className="flex justify-between items-baseline mb-3">
      <h4 className="text-xl font-medium group-hover:text-primary transition-colors duration-300 font-headline italic">
        {title}
      </h4>
      <span className="text-primary font-bold text-sm font-label tracking-widest">{price}</span>
    </div>
    <p className="text-sm text-secondary leading-relaxed font-body opacity-80 group-hover:opacity-100 transition-opacity">
      {desc}
    </p>
  </div>
);

export default Services;
