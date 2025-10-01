import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { ILogin, IResponse } from "../../types";
import axios from "axios";
import { useState } from "react";
import { Axios } from "../../lib/api";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin: SubmitHandler<ILogin> = data => {
        Axios.post("/login", data)
            .then(() => navigate("/profile"))
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    const responseError = err.response?.data as IResponse<string>;
                    setError(responseError.message);
                }
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 animate-gradient-x">
            <div className="relative w-full max-w-md p-10 space-y-6 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700">
                
                {/* Glowing animated header */}
                <h1 className="text-4xl font-extrabold text-center text-indigo-400 tracking-widest animate-pulseGlow">
                    LOGIN
                </h1>

                {/* Error message */}
                {error && <p className="text-red-400 text-center font-medium animate-shake">{error}</p>}

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                    {/* Login Input */}
                    <div>
                        <label className="block mb-1 text-gray-300 font-semibold">
                            {errors.login ? <span className="text-red-400">{errors.login.message}</span> : "Login"}
                        </label>
                        <input
                            {...register("login", { required: "Please enter your login" })}
                            type="text"
                            placeholder="Enter your login"
                            className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:scale-105 transition-all duration-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block mb-1 text-gray-300 font-semibold">
                            {errors.password ? <span className="text-red-400">{errors.password.message}</span> : "Password"}
                        </label>
                        <input
                            {...register("password", { required: "Please enter your password", minLength: { value: 5, message: "Password too short" } })}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:scale-105 transition-all duration-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 font-bold text-white bg-indigo-500 rounded-2xl shadow-xl hover:shadow-indigo-700/50 hover:scale-105 transition-all duration-300 transform tracking-wide text-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-sm text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* Tailwind Animations */}
            <style>
                {`
                    @keyframes gradient-x {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-x {
                        background-size: 200% 200%;
                        animation: gradient-x 15s ease infinite;
                    }
                    @keyframes pulseGlow {
                        0%, 100% { text-shadow: 0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.4); }
                        50% { text-shadow: 0 0 20px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.6); }
                    }
                    .animate-pulseGlow {
                        animation: pulseGlow 2s infinite;
                    }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }
                    .animate-shake {
                        animation: shake 0.3s;
                    }
                `}
            </style>
        </div>
    );
};
