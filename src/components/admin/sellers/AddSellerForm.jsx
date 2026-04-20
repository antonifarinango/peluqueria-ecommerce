import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addNewDashboardSeller } from "../../../store/actions";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";

const AddSellerForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addSellerHandler = (data) => {
    const sendData = {
      ...data,
      role: ["seller"],
    };

    dispatch(addNewDashboardSeller(sendData, toast, reset, setOpen, setLoader));
  };

  return (
    <div className="py-5 relative h-full ">
      <form className="space-y-4 " onSubmit={handleSubmit(addSellerHandler)}>
        <div className="flex  flex-col gap-4 w-full">
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
            label="Correo electrónico"
            required
            id="email"
            type="email"
            message="*El correo electrónico es obligatorio"
            placeholder="Ingresa tu correo electrónico"
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

        <div className="flex  w-full justify-between items-center absolute bottom-14">
          <button
            disabled={loader}
            onClick={() => setOpen(false)}
            type="button"
            className={`border border-blue-500 rounded-[5px] font-metropolis  text-textColor py-[10px] px-4 text-sm font-medium`}
          >
            Cancelar
          </button>
          <button
            disabled={loader}
            type="submit"
            className={`font-metropolis rounded-[5px]  bg-blue hover:bg-on-blue text-white  py-[10px] px-4 text-sm font-medium`}
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Cargando...
              </div>
            ) : (
              "Agregar Nuevo Vendedor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSellerForm;