import { Link } from 'react-router-dom';
import { FiInstagram, FiMessageCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-surface-container-high transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start px-8 gap-12 max-w-screen-2xl mx-auto">
        {/* Brand and Description */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="text-xl font-headline italic text-on-background">The Editorial Salon</div>
          <p className="text-sm text-secondary leading-relaxed font-body">
            Defining the contemporary standard of beauty through craftsmanship and quiet luxury. Join us for a curated experience.
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
            <h4 className="font-headline text-lg text-on-background">Contact</h4>
            <nav className="flex flex-col gap-3 text-sm text-secondary font-body">
              <span className="flex items-center gap-2">
                <FiMapPin className="text-primary text-xs" /> 1202 Madison Ave, NY
              </span>
              <span className="flex items-center gap-2">
                <FiPhone className="text-primary text-xs" /> +1 (212) 555-0198
              </span>
              <span className="flex items-center gap-2 font-medium text-primary">
                hello@editorialsalon.com
              </span>
            </nav>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-headline text-lg text-on-background">Hours</h4>
            <nav className="flex flex-col gap-3 text-sm text-secondary font-body">
              <p>Mon - Fri: 10am - 8pm</p>
              <p>Sat: 9am - 6pm</p>
              <p>Sun: Closed</p>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-headline text-lg text-on-background">Legal</h4>
            <nav className="flex flex-col gap-3 text-sm text-secondary font-body">
              <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/about" className="hover:text-primary transition-colors">Accessibility</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 px-8 max-w-screen-2xl mx-auto pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-secondary font-body">© 2024 The Editorial Salon. All Rights Reserved.</p>
        <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-secondary Manrope">
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          <Link to="/about" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
