import { Badge } from "@mui/material";
import { useState, useEffect } from "react";
import { FiShoppingBag, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserMenu";

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", path: "/" },
        { name: "Servicios", path: "/services" },
        { name: "Productos", path: "/products" },
        { name: "Sobre Nosotros", path: "/about" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface/90 py-3 shadow-sm" : "bg-transparent py-2"}`}>
            <div className="flex justify-between items-center px-8 md:px-12 max-w-screen-2xl mx-auto">
                {/* Logo */}
                <Link to="/" className="">
                        <img src="/logo-web.png" alt="logo" className='w-40' />
                </Link>


                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-12 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`font-label font-semibold  text-xs tracking-widest uppercase transition-all duration-300 pb-1 border-b ${path === link.path
                                    ? "text-primary border-primary"
                                    : "text-black border-transparent hover:text-primary hover:border-primary/30"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-6 items-center">
                    {/* Cart */}
                    <Link to="/cart" className="text-primary hover:scale-95 transition-transform relative">
                        <Badge
                            badgeContent={cart?.length || 0}
                            color="primary"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: '0.6rem',
                                    height: '14px',
                                    minWidth: '14px',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    fontFamily: 'Manrope',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <FiShoppingBag size={22} />
                        </Badge>
                    </Link>

                    {/* Auth / User Menu */}
                    {(user && user.id) ? (
                        <div className="text-primary hover:scale-95 transition-transform">
                            <UserMenu />
                        </div>
                    ) : (
                        <Link to="/login" className="text-primary hover:scale-95 transition-transform">
                            <FiUser size={24} />
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-primary transition-transform active:scale-90"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        {navbarOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Sidebar */}
            <div className={`fixed  inset-y-0 right-0 w-full max-w-xs bg-surface shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full p-8 pt-20">
                    <button onClick={() => setNavbarOpen(false)} className="absolute top-6 right-8 text-primary">
                        <FiX size={28} />
                    </button>
                    <div className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setNavbarOpen(false)}
                                className={`text-xs tracking-[0.2em] font-bold uppercase transition-colors font-label ${path === link.path ? "text-primary" : "text-secondary"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-outline-variant/20">
                        <p className="text-[10px] uppercase tracking-widest text-outline font-label font-bold">
                            Estilos Any Look
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Backdrop */}
            {navbarOpen && (
                <div
                    className="fixed inset-0 bg-on-background/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setNavbarOpen(false)}
                />

            )}
        </nav>
    );
};

export default Navbar;
;