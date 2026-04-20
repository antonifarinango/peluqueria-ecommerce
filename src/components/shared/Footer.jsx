import { Link } from 'react-router-dom';
import { FiInstagram, FiMessageCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container-high transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start px-8 gap-12 max-w-screen-2xl mx-auto">
        {/* Brand and Description */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="text-xl font-headline italic text-on-background">Estilos Any Look</div>
          <p className="text-[18px] text-secondary leading-relaxed font-body">
            Todo lo que necesitas para cuidar tu imagen en un solo lugar.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-primary hover:text-on-background transition-colors p-2 bg-surface-container rounded-full">
              <FiInstagram size={18} />
            </a>
            <a href="#" className="text-primary hover:text-on-background transition-colors p-2 bg-surface-container rounded-full">
              <FiMessageCircle size={18} />
            </a>
            <a href="#" className="text-primary hover:text-on-background transition-colors p-2 bg-surface-container rounded-full">
              <FiMail size={18} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-headline text-lg text-on-background">Contáctanos</h4>
            <nav className="flex flex-col gap-3 text-sm text-secondary font-body">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-primary text-xs" />De los Fundadores y Sebastián de Benalcázar
              </span>
              <span className="flex items-center gap-2">
                <FiPhone className="text-primary text-xs" /> +1 (212) 555-0198
              </span>
            </nav>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-headline text-lg text-on-background">Horario de atención</h4>
            <nav className="flex flex-col gap-3 text-sm text-secondary font-body">
              <p>Lunes - Viernes: 9am - 7pm</p>
              <p>Sábado: 9am - 5pm</p>
            </nav>
          </div>
          <div className="flex">
            <img src="../public/logo-web.png" alt="logo" className='md:h-30 md:w-70' />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 px-8 max-w-screen-2xl mx-auto pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-blue font-body">© 2026<a href="https://wa.me/593984053628?text=Hola,%20quiero%20una%20página%20web"
          target="_blank"
          rel="noopener noreferrer"
          className='ml-5 text-blue'>
            AF SOLUTIONS
        </a>
        </p>
        {/**<div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-secondary Manrope">
          <Link href="/" className="hover:text-primary transition-colors">Instagram</Link>
        </div> */}
        
      </div>
    </footer>
  );
}
