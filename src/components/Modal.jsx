import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/features/uiSlice";
import { useForm } from "react-hook-form";
import z from "zod";
import { addTodo } from "../store/features/todoSlice";

function Modal() {
  const [error, setError] = useState(false);
  const [place, setPlace] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const showModal = useSelector((state) => state.ui.ui.addModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      city: "",
    },
  });

  function onSubmit(data) {
    const { title, desc } = data;

    const schema = z.object({
      title: z.string().min(3, { message: "Title is too short" }),
      desc: z.string().min(5, { message: "Description is too short" }).max(210, { message: "Description is too long" }),
    });

    const check = schema.safeParse(data);

    if (!check.success) {
      setError(true);
      return;
    }

    setError(false);
    console.log("Form Submitted:", {
      data,
      type: place ? "place-details" : "general",
    });

    const newTodo = {
      id: todos.length + 1,
      title: data.title,
      desc: data.desc,
      api: place ? { type: "visit", city: data.city } : { type: "general" },
    };

    dispatch(addTodo(newTodo));
    localStorage.setItem("localTodos", JSON.stringify([...todos, newTodo]));

    dispatch(setModal());
    reset(); 
  }

  return (
    <div className={`modal ${showModal ? "modal-open" : ""}`}>
      <div className="md:w-[500px] md:min-h-[50%] p-4 border border-gray-700/50 bg-black/10 backdrop-blur-sm rounded-xl">

        <div className="flex justify-end">
          <button
            onClick={() => dispatch(setModal())}
            className="bg-white rounded-full font-semibold text-black w-6 h-6 text-xs flex items-center justify-center"
          >
            X
          </button>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="my-2 mx-3 flex flex-col gap-4 text-white">
        
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="input bg-black border-white/70 p-2 rounded-md"
              type="text"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

         
            <textarea
              {...register("desc", { required: "Description is required" })}
              placeholder="Description"
              className="textarea bg-black border-white/70 p-2 rounded-md"
            />
            {errors.desc && <span className="text-red-500 text-sm">{errors.desc.message}</span>}

            {/* Toggle Place Details */}
            <div className="flex gap-2 items-center">
              <div>Get place details</div>
              <input
                onClick={() => setPlace((prev) => !prev)}
                checked={place}
                className="checkbox checkbox-sm bg-black text-black checked:bg-white checked:text-black"
                type="checkbox"
              />
            </div>

         
            {place && (
              <select
                {...register("city")}
                className="w-fit bg-inherit select border focus:bg-black border-white/70 rounded-md text-white"
              >
                <option className="bg-black" value="">Select City</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Glasgow">Glasgow</option>
                <option value="Jabalpur">Jabalpur</option>
              </select>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button className="btn bg-white text-black px-4 py-2 rounded-md">Submit</button>
            </div>
          </div>
        </form>

        {/* Error Messages */}
        {error && (
          <div className="text-center mt-5 text-red-500">
            Try again, check if details are appropriate or too short/too long
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
