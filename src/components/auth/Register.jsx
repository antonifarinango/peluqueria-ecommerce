import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
     };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                            Crear Cuenta
                        </h1>
                    </div>
            <hr className="mt-2 mb-5 text-black" />
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
            </div>

            <button
                disabled={loader}
                className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3"
                type="submit">
                {loader ? (
                    <>
                    <Spinners /> Cargando...
                    </>
                ) : (
                    <>Registrarse</>
                )}
            </button>

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