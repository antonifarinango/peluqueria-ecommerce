import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { stripePaymentConfirmation, payphonePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const { cart } = useSelector((state) => state.carts);
    const [loading, setLoading] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    const payphoneId = searchParams.get("id");
    const clientTransactionId = searchParams.get("clientTransactionId");

    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : null;

    useEffect(() => {
        if (paymentIntent &&
            clientSecret &&
            redirectStatus &&
            cart &&
            cart?.length > 0
        ) { 
            const sendData = {
                addressId: selectedUserCheckoutAddress?.addressId,
                pgName: "Stripe",
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment successful"
              };
            dispatch(stripePaymentConfirmation(sendData, setErrorMessage, setLoading, toast));
        }
    }, [paymentIntent, clientSecret, redirectStatus, cart]);

    useEffect(() => {
        if (payphoneId &&
            clientTransactionId &&
            cart &&
            cart?.length > 0
        ) {
            const sendData = {
                addressId: selectedUserCheckoutAddress?.addressId,
                pgName: "Payphone",
                pgPaymentId: payphoneId,
                pgStatus: "succeeded",
                pgResponseMessage: `Pago exitoso con Payphone. Transacción ID: ${payphoneId}`
            };
            dispatch(payphonePaymentConfirmation(sendData, clientTransactionId, setErrorMessage, setLoading, toast));
        }
    }, [payphoneId, clientTransactionId, cart]);

    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-50'>
            {loading ? (
                <div className='flex flex-col items-center gap-3 text-custom-blue font-semibold text-lg bg-white p-8 rounded-xl shadow-md border border-gray-100'>
                    <Spinners />
                    <p className="text-gray-600 text-sm">Confirmando tu pago, por favor espera...</p>
                </div>
            ) : errorMessage ? (
                <div className="p-8 rounded-xl shadow-lg text-center max-w-md mx-auto border border-red-100 bg-white">
                    <div className="text-red-500 mb-4 flex justify-center animate-bounce">    
                        <FaTimesCircle size={64} />
                    </div>
                    <h2 className='text-3xl font-extrabold text-red-600 mb-2'>¡Pago Fallido!</h2>
                    <p className="text-gray-500 mb-6 text-sm">{errorMessage}</p>
                    <button 
                        onClick={() => navigate('/checkout')}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md"
                    >
                        Volver al Checkout
                    </button>
                </div>
            ) : (
                <div className="p-8 rounded-xl shadow-lg text-center max-w-md mx-auto border border-green-100 bg-white">
                    <div className="text-green-500 mb-4 flex justify-center animate-bounce">    
                        <FaCheckCircle size={64} />
                    </div>
                    <h2 className='text-3xl font-extrabold text-green-600 mb-2'>¡Pago Exitoso!</h2>
                    <p className="text-gray-500 mb-6 text-sm">
                        ¡Muchas gracias por tu compra! Tu pago ha sido procesado correctamente y estamos registrando tu pedido.
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-md"
                    >
                        Ir al Inicio
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentConfirmation;