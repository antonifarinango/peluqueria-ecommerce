import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { payphonePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const PayphonePayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { totalPrice } = useSelector((state) => state.carts);
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    useEffect(() => {
        // Cargar el script de Cajita de Payphone dinámicamente como module
        const scriptId = 'payphone-box-script';
        let script = document.getElementById(scriptId);

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = "https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js";
            script.type = "module";
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            script.onerror = () => setErrorMessage("No se pudo cargar la pasarela de Payphone.");
            document.body.appendChild(script);
        } else {
            setScriptLoaded(true);
        }

        // Cargar el CSS de Cajita de Payphone
        const cssId = 'payphone-box-css';
        let css = document.getElementById(cssId);
        if (!css) {
            css = document.createElement('link');
            css.id = cssId;
            css.rel = 'stylesheet';
            css.href = "https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css";
            document.head.appendChild(css);
        }

        return () => {
            // Mantener cargado para futuras compras
        };
    }, []);

    useEffect(() => {
        if (scriptLoaded && totalPrice > 0 && selectedUserCheckoutAddress) {
            const container = document.getElementById('payphone-button-container');
            if (container) {
                container.innerHTML = ''; // Limpiar botón previo
            }

            const initializeBox = () => {
                if (typeof window.PPaymentButtonBox === 'undefined') {
                    // Pequeña espera en caso de que el módulo no se haya registrado aún en window
                    setTimeout(initializeBox, 100);
                    return;
                }

                try {
                    const amountInCents = Math.round(Number(totalPrice) * 100);
                    const clientTxId = "TXN_" + Date.now();
                    
                    // Asegurar que la dirección de checkout quede en localStorage
                    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(selectedUserCheckoutAddress));

                    const ppb = new window.PPaymentButtonBox({
                        token: import.meta.env.VITE_PAYPHONE_TOKEN || '',
                        clientTransactionId: clientTxId,
                        amount: amountInCents,
                        amountWithoutTax: amountInCents,
                        currency: "USD",
                        reference: "Pago de orden de peluquería",
                        lang: "es",
                        defaultMethod: "card"
                    });

                    ppb.render('payphone-button-container');
                } catch (err) {
                    console.error("Error al renderizar la cajita de pagos:", err);
                    setErrorMessage("Error de configuración de la pasarela de pagos.");
                }
            };

            initializeBox();
        }
    }, [scriptLoaded, totalPrice, selectedUserCheckoutAddress]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Pago Seguro con Payphone</h3>
            <p className="text-gray-500 text-xs mb-6">
                Paga de forma segura con tu saldo Payphone o directamente usando tu tarjeta de crédito o débito preferida.
            </p>
            
            <div className="flex justify-between items-center mb-6 py-3 border-y border-gray-100 text-lg">
                <span className="font-semibold text-gray-700">Total a pagar:</span>
                <span className="text-2xl font-black text-custom-blue">${Number(totalPrice).toFixed(2)}</span>
            </div>

            {loading && (
                <div className="flex justify-center items-center my-4 gap-2 text-custom-blue font-semibold text-sm">
                    <Spinners /> Guardando tu pedido en el sistema...
                </div>
            )}

            {errorMessage && (
                <p className="text-red-500 text-sm font-medium my-3">{errorMessage}</p>
            )}

            <div id="payphone-button-container" className="flex justify-center mt-4">
                {!scriptLoaded && !errorMessage && (
                    <div className="flex flex-col items-center gap-2 text-gray-400 text-sm">
                        <Spinners /> Cargando caja de pagos Payphone...
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayphonePayment;
