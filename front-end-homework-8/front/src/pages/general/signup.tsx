import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";

export const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const [error, setError] = useState("");

    const handleSignUp: SubmitHandler<IUser> = (data) => {
        Axios.post("/signup", data)
            .then(() => navigate("/login"))
            .catch(err => {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data.message);
                }
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 animate-gradient-x">
            <form onSubmit={handleSubmit(handleSignUp)} className="relative w-full max-w-md p-10 space-y-6 bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700">
                
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center text-indigo-400 tracking-widest animate-pulseGlow">
                    SIGN UP
                </h1>

                {/* Error */}
                {error && <p className="text-red-400 text-center font-medium animate-shake">{error}</p>}

                {/* Name */}
                <div>
                    <label className="block mb-1 text-gray-300 font-semibold">
                        {errors.name && <span className="text-red-400">{errors.name.message}</span>} Name
                    </label>
                    <input
                        {...register("name", { required: "Please enter your name" })}
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Surname */}
                <div>
                    <label className="block mb-1 text-gray-300 font-semibold">
                        {errors.surname && <span className="text-red-400">{errors.surname.message}</span>} Surname
                    </label>
                    <input
                        {...register("surname", { required: "Please enter your surname" })}
                        type="text"
                        placeholder="Enter your surname"
                        className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Login */}
                <div>
                    <label className="block mb-1 text-gray-300 font-semibold">
                        {errors.login && <span className="text-red-400">{errors.login.message}</span>} Login
                    </label>
                    <input
                        {...register("login", { required: "Please enter your login" })}
                        type="text"
                        placeholder="Enter your login"
                        className="w-full px-5 py-3 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 text-gray-300 font-semibold">
                        {errors.password && <span className="text-red-400">{errors.password.message}</span>} Password
                    </label>
                    <input
                        {...register("password", { required: "Please enter your password", minLength: { value: 8, message: "Password is too short" } })}
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
                    Sign Up
                </button>

                {/* Already have account */}
                <p className="text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition-colors">
                        Login
                    </Link>
                </p>

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
            </form>
        </div>
    );
};
