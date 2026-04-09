/*import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
  }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    };

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };
    
    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
                   <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                    {truncateText(productName)}
                   </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                    <img 
                        src={`${import.meta.env.VITE_BACK_END_URL}/images/${image}`}
                        alt={productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"/>
                

                <div className="flex items-start gap-5 mt-3">
                    <button
                        onClick={() => removeItemFromCart({
                            image,
                            productName,
                            description,
                            specialPrice,
                            price,
                            productId,
                            quantity,
                        })}
                        className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                        <HiOutlineTrash size={16} className="text-rose-600"/>
                        Remove
                    </button>
                    </div>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(Number(specialPrice))}
            </div>

            <div className="justify-self-center">
                <SetQuantity 
                    quantity={currentQuantity}
                    cardCounter={true}
                    handeQtyIncrease={() => handleQtyIncrease({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    handleQtyDecrease={() => {handleQtyDecrease({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}}/>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(Number(currentQuantity) * Number(specialPrice))}
            </div>
        </div>
    )
};

export default ItemContent;

 */

import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import truncateText from "../../utils/truncateText";
import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/imageUrl";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
  }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity
        ));
    };

    const handleQtyDecrease = (cartItems) => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItems, newQuantity));
        }
    };

    const removeItemFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems, toast));
    };
    
    return (
        <motion.div whileHover={{ scale: 1.01 }} className="bg-white dark:border-slate-300 p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row items-center gap-6 group relative">
            <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-32 shrink-0 border" 
                style={{ backgroundImage: `url(${getImageUrl(image)})` }}
            >

            </div>
            <div className="flex flex-1 flex-col gap-1 w-full">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-slate-900 text-lg font-bold">{truncateText(productName)}</p>
                    </div>
                    <button 
                        onClick={() => removeItemFromCart({
                            image,
                            productName,
                            description,
                            specialPrice,
                            price,
                            productId,
                            quantity,
                        })}
                        className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 border dark:border-slate-400 dark:hover:bg-red-900/20 p-2 rounded-full flex items-center justify-center"
                    >
                        <HiOutlineTrash size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <div>
                        <SetQuantity 
                            quantity={currentQuantity}
                            cardCounter={true}
                            handeQtyIncrease={() => handleQtyIncrease({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            handleQtyDecrease={() => {handleQtyDecrease({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}}
                        />
                    </div>
                    <p className="text-slate-900 dark:text-black text-lg font-black tracking-tight font-semibold">
                        {formatPrice(Number(currentQuantity) * Number(specialPrice))}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ItemContent;