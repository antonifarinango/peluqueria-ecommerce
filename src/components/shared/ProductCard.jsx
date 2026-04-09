import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";
import ProductViewModal from "./ProductViewModal";
import { FiArrowRight, FiEye, FiMessageCircle, FiShoppingBag } from "react-icons/fi";
import { getImageUrl } from "../../utils/imageUrl";

const ProductCard = ({ ...item }) => {
    const { productId, productName, image, description, quantity, price, discount, specialPrice } = item;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const isAvailable = quantity > 0;

    const addToCartHandler = (cartItem) => {
        if (!isAvailable) {
            toast.error("Product is out of stock");
            return;
        }
        dispatch(addToCart(cartItem));
        toast.success("Product added to cart");
    };

    return (
        <div className="group flex flex-col h-full">
            <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-surface-container-low rounded-sm">
                {image ? (
                    <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={getImageUrl(image)} 
                        alt={productName} 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-outline-variant/10">
                        <span className="font-headline italic text-outline opacity-50">Editorial</span>
                    </div>
                )}
                
                {/* Floating Actions on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
                     <div className="flex gap-2">
                        <button 
                            onClick={() => setOpen(true)}
                            className="bg-surface/90 backdrop-blur-md text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-all duration-300 transform hover:scale-110"
                            title="Quick View"
                        >
                            <FiEye size={18} />
                        </button>
                        <button 
                            onClick={() => addToCartHandler(item)}
                            className="bg-surface/90 backdrop-blur-md text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-all duration-300 transform hover:scale-110"
                            disabled={!isAvailable}
                            title="Add to Cart"
                        >
                            <FiShoppingBag size={18} />
                        </button>
                     </div>
                     
                     <a 
                        href="https://wa.me/yournumber" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-on-primary p-4 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
                    >
                        <FiMessageCircle size={20} />
                    </a>
                </div>

                {!isAvailable && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="bg-on-background text-background px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">Sold Out</span>
                    </div>
                )}
            </div>

            {/* Info Section - Split Price/Title */}
            <div className="flex justify-between items-start mb-2 gap-4">
                <h3 className="font-headline text-xl text-on-surface leading-tight transition-colors group-hover:text-primary cursor-pointer" onClick={() => setOpen(true)}>
                    {productName}
                </h3>
                <div className="flex flex-col items-end">
                    {specialPrice ? (
                        <>
                            <span className="font-body text-primary font-bold text-lg">${Number(specialPrice).toFixed(2)}</span>
                            <span className="text-[10px] text-secondary line-through opacity-50">${Number(price).toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-body text-primary font-bold text-lg">${Number(price).toFixed(2)}</span>
                    )}
                </div>
            </div>

            <p className="text-secondary text-sm mb-6 leading-relaxed font-body line-clamp-2">
                {description || "No description available for this curated item."}
            </p>

            <div className="mt-auto flex flex-col gap-4">
                <a 
                    href="https://wa.me/yournumber" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-label tracking-widest uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 w-fit group/link"
                >
                    Order via WhatsApp
                    <FiArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
            </div>

            {open && (
                <ProductViewModal 
                    open={open} 
                    setOpen={setOpen} 
                    product={item} 
                    isAvailable={isAvailable} 
                />
            )}
        </div>
    );
};

export default ProductCard;
