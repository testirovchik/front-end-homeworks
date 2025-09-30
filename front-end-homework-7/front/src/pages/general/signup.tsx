import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IUser } from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";

export const SignUp = () => {
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm<IUser>()
  const [error, setError] = useState("")
  const handleSignUp: SubmitHandler<IUser> = (data) => {
    Axios.post("/signup", data)
    .then(() => {
      navigate("/login")
    })
    .catch((err) => {
      if(axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    })

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit(handleSignUp)} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {/* Name */}
        <div>
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
          {...register("name", {required: "please enter your name"})}
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        {/* Surname */}
        <div>
          {errors.surname && <p className="text-red-400">{errors.surname.message}</p>}
          <label className="block text-gray-700 font-medium mb-2">
            Surname
          </label>
          <input
          {...register("surname", {required: "please enter your surname"})}
            type="text"
            name="surname"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your surname"
          />
        </div>

        {/* Login */}
        <div>
          {errors.login && <p className="text-red-400">{errors.login.message}</p>}
          <label className="block text-gray-700 font-medium mb-2">Login</label>
          <input
          {...register("login", {required: "please enter your login"})}
            type="text"
            name="login"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your login"
          />
        </div>

        {/* Password */}
        <div>
          {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
          {...register("password", {required: "please enter your password", minLength: {value: 8, message:"password is too short"}})}
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>

        {/* Already have account */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
