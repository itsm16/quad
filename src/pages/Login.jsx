import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import z from 'zod'
import bcryptjs from 'bcryptjs'
import { login } from '../store/features/userSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const localStorageUser = localStorage.getItem("localUser")
    const localUser = JSON.parse(localStorageUser);
    const store = useSelector(state => state.user.user);
    const currentUser = store.name;
    // console.log("cu",currentUser);
    currentUser !== null && currentUser ? navigate("/") : ""


    const schema = z.object({
        email: z.string().email({ message: "Enter a valid email" }),
        password: z.string().min(3, { message: "Password too small" }).max(20, { message: "Too long" })
    })

    async function onSubmit(data) {

        const check = schema.safeParse(data);
        if (!check.success) {
            setError(true);
            return
        }

        if (!localUser) {
            setNotFound(true)
            console.log("Not found")
            return
        }

        const passwordCheck = await bcryptjs.compare(data.password, localUser.password)
        if (!passwordCheck) {
            setNotFound(true)
            console.log("Not found")
            return
        }

        console.log("Found")
        dispatch(login({ name: localUser.name, email: localUser.email }));

        setNotFound(false);
        setError(false);
        reset();
        navigate("/")
    }

    return (
        <div className="bg-black text-white h-[100vh] flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 rounded-md border-gray-900/70 w-[90%] h-fit py-15 px-3">
                <div className="text-2xl font-semibold">Login</div>
                <div className=" flex flex-col items-center justify-center w-[90%] gap-5">
                    <input {...register("email")} className="text-white border-gray-300/40 bg-black input outline-none" placeholder="Email" type="text" />
                    {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                    <input {...register("password")} className="text-white border-gray-300/40 bg-black input outline-none" placeholder="Password" type="text" />
                    {errors.password && <div className="text-red-500">{errors.password.message}</div>}
                </div>
                {error &&
                    <div className="text-red-500 text-sm w-[85%] text-center">
                        <div>Check if the fields are appropriate</div>
                    </div>
                }
                {notFound && <div className='text-red-500'>Not Found!</div>}
                <button type="submit" className="btn rounded-lg border-none bg-gray-200 w-[40%] max-w-[250px] text-black">Login</button>
            </form>
            {/* <button onClick={()=>console.log(store)} className="btn">k</button> */}

            <div className="text-md">Not a user? <button onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer text-lg font-semibold">Sign Up</button></div>
        </div>
    )
}

export default Login