import { useForm, type SubmitHandler } from "react-hook-form";
import { type INewLogin, type IResponse } from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginChange = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<INewLogin>()
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleNewLogin: SubmitHandler<INewLogin> = data => {
    Axios.patch("update/login", data)
      .then(() => {
        navigate("/profile");
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          const axiosError = err.response?.data as IResponse<string>
          setError(axiosError.message);
        }
      })
  }

  return (
    <div className="w-full">
      <div className="w-full bg-gray-900/70 rounded-2xl shadow-lg border border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          Change Login
        </h1>

        {/* Error message */}
        {error && (
          <p className="mb-4 text-red-400 text-sm font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(handleNewLogin)} className="space-y-6">
          {/* New login */}
          <div>
            <label
              htmlFor="newLogin"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              New Login
            </label>
            <input
              {...register("newLogin", { required: "Please enter new login" })}
              id="newLogin"
              type="text"
              placeholder="Enter new login"
              className={`w-full rounded-lg border px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-500 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
                ${errors.newLogin ? "border-red-500" : "border-gray-700"}`}
            />
            {errors.newLogin && (
              <p className="text-red-400 text-sm mt-1">
                {errors.newLogin.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Please enter password",
                minLength: { value: 5, message: "Password is too short" },
              })}
              id="password"
              type="password"
              placeholder="Enter password"
              className={`w-full rounded-lg border px-4 py-2 bg-gray-800 text-gray-200 placeholder-gray-500 
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition 
                ${errors.password ? "border-red-500" : "border-gray-700"}`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md 
              hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 
              transition transform hover:scale-[1.01]"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
