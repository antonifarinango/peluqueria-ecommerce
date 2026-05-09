import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { registerNewUser, authenticateGoogleUser, registerGoogleUser } from '../../store/actions';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [googleData, setGoogleData] = useState(location.state || null);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        if (googleData) {
            dispatch(registerGoogleUser({
                username: data.username,
                password: data.password,
                token: googleData.token
            }, toast, navigate, setLoader));
        } else {
            dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-6">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                            {googleData ? "Completar Cuenta" : "Crear Cuenta"}
                        </h1>
                    </div>
            <hr className="mt-2 mb-5 text-slate-200" />
            
            {/* Botón de Google por encima de los campos tradicionales */}
            {!googleData && (
                <div className="flex flex-col items-center justify-center w-full mb-4">
                    <GoogleLogin
                        onSuccess={(res) => {
                            dispatch(authenticateGoogleUser(res.credential, toast, navigate, setLoader, (email, name) => {
                                setGoogleData({ email, name, token: res.credential });
                            }));
                        }}
                        onError={() => toast.error("Error al autenticar con Google")}
                        text="signup_with"
                        shape="rectangular"
                        width="100%"
                    />
                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-slate-300" />
                        <span className="px-3 text-slate-500 text-xs font-semibold whitespace-nowrap">O REGÍSTRATE CON TU EMAIL</span>
                        <hr className="flex-grow border-slate-300" />
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <InputField
                    label="Nombre de usuario"
                    required
                    id="username"
                    type="text"
                    message="*El nombre de usuario es obligatorio"
                    placeholder="Ingresa tu nombre de usuario"
                    register={register}
                    errors={errors}
                    />
                
                <InputField
                    label="Contraseña"
                    required
                    id="password"
                    min={6}
                    type="password"
                    message="*La contraseña es obligatoria"
                    placeholder="Ingresa tu contraseña"
                    register={register}
                    errors={errors}
                    />

                {googleData ? (
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md mb-2 text-sm flex flex-col gap-1 my-2">
                        <span className="font-semibold text-xs uppercase tracking-wider text-blue-600">Cuenta de Google Vinculada</span>
                        <span className="font-semibold text-slate-800 mt-1">{googleData.email}</span>
                        <span className="text-xs text-slate-500 mt-2">
                            Hemos verificado tu identidad de Google. Elige tu usuario y contraseña de acceso final para completar la cuenta.
                        </span>
                    </div>
                ) : (
                    <InputField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*El correo electrónico es obligatorio"
                        placeholder="Ingresa tu correo electrónico"
                        register={register}
                        errors={errors}
                        />
                )}
            </div>

            <button
                disabled={loader}
                className="bg-primary flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3 cursor-pointer"
                type="submit">
                {loader ? (
                    <>
                    <Spinners /> Cargando...
                    </>
                ) : (
                    <>{googleData ? "Completar Registro" : "Registrarse"}</>
                )}
            </button>

            {googleData && (
                <button
                    type="button"
                    onClick={() => {
                        setGoogleData(null);
                        reset();
                    }}
                    className="border border-slate-300 flex gap-2 items-center justify-center font-semibold text-slate-700 w-full py-2 hover:bg-slate-50 transition-colors duration-100 rounded-xs my-1 cursor-pointer">
                    Cancelar Registro con Google
                </button>
            )}

            <p className="text-center text-sm text-slate-700 mt-6">
              ¿Ya tienes una cuenta?
              <Link
                className="font-semibold underline hover:text-black"
                to="/login">
              <span> Inicia sesión</span></Link>  
            </p>
            </form>
        </div>
    );
}

export default Register