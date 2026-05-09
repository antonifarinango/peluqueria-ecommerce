import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser, authenticateGoogleUser } from "../../store/actions";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
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

    const loginHandler = async (data) => {
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
        
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-6">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md bg-white">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <AiOutlineLogin className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                            Iniciar Sesión
                        </h1>
                    </div>
            <hr className="mt-2 mb-5 text-slate-200" />

            {/* Botón de Google por encima de los campos tradicionales */}
            <div className="flex flex-col items-center justify-center w-full mb-4">
                <GoogleLogin
                    onSuccess={(res) => {
                        dispatch(authenticateGoogleUser(res.credential, toast, navigate, setLoader, (email, name) => {
                            toast.success("¡Cuenta de Google válida! Completa tu registro.");
                            navigate("/register", { state: { email, name, token: res.credential } });
                        }));
                    }}
                    onError={() => toast.error("Error al autenticar con Google")}
                    text="signin_with"
                    shape="rectangular"
                    width="100%"
                />
                <div className="flex items-center w-full my-4">
                    <hr className="flex-grow border-slate-300" />
                    <span className="px-3 text-slate-500 text-xs font-semibold whitespace-nowrap">O INGRESA CON TU CUENTA</span>
                    <hr className="flex-grow border-slate-300" />
                </div>
            </div>
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
                    type="password"
                    message="*La contraseña es obligatoria"
                    placeholder="Ingresa tu contraseña"
                    register={register}
                    errors={errors}
                    />
            </div>

            <button
                disabled={loader}
                className="bg-primary flex gap-2 items-center justify-center font-semibold text-white w-full py-2 cursor-pointer hover:pointer transition-colors rounded-[5px] my-3"
                type="submit">
                {loader ? (
                    <>
                    <Spinners /> Cargando...
                    </>
                ) : (
                    <>Ingresar</>
                )}
            </button>

            <p className="text-center text-sm text-slate-700 mt-6">
              ¿No tienes una cuenta?
              <Link
                className="font-semibold underline hover:text-black"
                to="/register">
              <span> Regístrate</span></Link>  
            </p>
            </form>
        </div>
    );
}

export default LogIn;