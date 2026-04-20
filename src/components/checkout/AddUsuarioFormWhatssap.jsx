import React, { useEffect } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';

export default function AddUsuarioFormWhatssapp() {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const datosUsuario = (data) =>{
        dispatch({
            type:"SET_USUARIO",
            payload:{
                nombreUsuario:data.nombreUsuario,
                telefonoUsuario : data.telefonoUsuario
            }
        });

        toast.success("Datos guardados");
    }


    return (

        <div className="flex item-center justify-center">
            <form
                onSubmit={handleSubmit(datosUsuario)}
                className="sm:w-100">
                <div className="flex flex-col gap-4">
                    <InputField
                        label="Nombre Usuario"
                        id="nombreUsuario"
                        type="text"
                        message="*Nombre usuario"
                        placeholder="Ingrese el nombre del usuario"
                        register={register}
                        required={true}
                        errors={errors}
                    />

                    <InputField
                        label="Teléfono"
                        id="telefonoUsuario"
                        type="text"
                        message="*Número de contacto"
                        placeholder="Ingrese un número de contacto"
                        register={register}
                        required={true}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={btnLoader}
                    className="text-white bg-blue px-4 py-2 rounded-md mt-4"
                    type="submit">
                    {btnLoader ? (
                        <>
                            <Spinners /> Loading...
                        </>
                    ) : (
                        <>Save</>
                    )}
                </button>
            </form>
        </div>

    )

}