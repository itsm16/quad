import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import bcryptjs, { hash } from 'bcryptjs'
import z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/features/userSlice';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [createErr, setCreateErr] = useState(false);
    const store = useSelector(state => state.user.user);
    const currentUser = store.name;
    // console.log("cu",currentUser);
    currentUser !== null && currentUser ? navigate("/") : ""

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    // const user = JSON.parse(storedUser);

    const schema = z.object({
        name: z.string().min(2, { message: "Name is too small" }),
        email: z.string().email({ message: "Enter a valid email" }),
        password: z.string().min(3, { message: "Password too small" }).max(20, { message: "Too long" })
    })

    async function onSubmit(data) {

        const check = schema.safeParse(data);
        if (!check.success) {
            setError(true);
            return
        }

        const hashedPassword = await bcryptjs.hash(data.password, 10);
        if(!data.password && !hashedPassword){
            setCreateErr(true) 
            return
        }

        localStorage.setItem("localUser", JSON.stringify({name : data.name, email: data.email, password: hashedPassword}))
        localStorage.setItem("current", JSON.stringify({name : data.name, email: data.email}))
        dispatch(signup({ name: data.name, email: data.email }));

        setCreateErr(false);
        setError(false);
        reset();
        navigate("/")
        console.log(data);
    }

    return (
        <div className="bg-black text-white h-[100vh] flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 rounded-md border-gray-900/70 w-[90%] h-fit py-15 px-3">
                <div className="text-2xl font-semibold">Sign Up</div>
                <div className=" flex flex-col items-center justify-center w-[90%] gap-5">
                    <input {...register("name", { required: "Name is required" })} className="text-white border-gray-300/40 bg-black input outline-none" placeholder="Name" type="text" />
                    {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                    <input {...register("email", { required: "Email is required" })} className="text-white border-gray-300/40 bg-black input outline-none" placeholder="Email" type="text" />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                    <input {...register("password", { required: "Password is required" })} className="text-white border-gray-300/40 bg-black input outline-none" placeholder="Password" type="text" />
                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                </div>
                {error &&
                    <div className="text-red-500 text-center text-sm w-[85%]">
                        <div>Check if the fields are appropriate and in the given range</div>
                        <p>name: min 2 </p>
                        <p>Password: 3-20</p>
                    </div>
                }
                {createErr && <div className='text-red-500'>Couldn't create, Try again</div>}
                <button type="submit" className="btn rounded-lg border-none bg-gray-200 w-[40%] max-w-[250px] text-black">Sign Up</button>
            </form>
            <div className="text-md">Already a user? <button onClick={() => navigate("/login")} className="cursor-pointer text-blue-600 text-lg font-semibold">Login</button></div>
        </div>
    )
}

export default Signup