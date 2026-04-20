import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";

const AddCategoryForm = ({ setOpen, open, category, update = false }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const addNewCategoryHandler = (data) => {
    if (!update) {
      //dispatch createCategoryDashboardAction
      dispatch(createCategoryDashboardAction(data, setOpen, reset, toast));
    } else {
      //dispatch updateCategoryDashboardAction
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast)
      );
    }
  };
  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [update, category]);

  return (
    <div className="py-5 relative h-full">
      <form
        className="space-y-4 "
        onSubmit={handleSubmit(addNewCategoryHandler)}
      >
        <div className="flex md:flex-row flex-col gap-4 w-full ">
          <InputField
            label="Nombre de la Categoría"
            required
            id="categoryName"
            type="text"
            message="Este campo es obligatorio*"
            placeholder="Nombre de la Categoría"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex  w-full justify-between items-center absolute bottom-14">
          <button
            disabled={open}
            onClick={() => setOpen(false)}
            type="button"
            className={`border border-borderColor bg-red-800 rounded-[5px] font-metropolis  text-white py-[10px] px-4 text-sm font-medium`}
          >
            Cancelar
          </button>
          <button
            disabled={open}
            type="submit"
            className={`rounded-[5px] bg-blue hover:bg-on-blue text-white py-[10px] px-4 text-sm font-medium`}
          >
            {open ? "Cargando..." : update ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;