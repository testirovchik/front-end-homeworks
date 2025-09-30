import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { ILogin, IResponse } from "../../types";
import axios from "axios";
import { useState } from "react";
import { Axios } from "../../lib/api";

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILogin>();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const hanldeLogin:SubmitHandler<ILogin> = data => {
        Axios.post("/login", data)
        .then(() => {
            navigate("/profile")
        }).catch(error => {
            if(axios.isAxiosError(error)) {
                const responseError = error.response?.data as IResponse;
                setError(responseError.message)
            }
        })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit(hanldeLogin)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-600">{errors.login? <p className="text-red-400">{errors.login.message}</p>: "login"}</label>
                        <input
                            {...register("login", {required: "Please enter the input"})}
                            type="text"
                            placeholder="Enter your login"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-600">{errors.password? <p className="text-red-400">{errors.password.message}</p>: "password"}</label>
                        <input
                        {...register("password", {required: "Please enter the password!", minLength: {value: 5, message: "password is too short"}})}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};
