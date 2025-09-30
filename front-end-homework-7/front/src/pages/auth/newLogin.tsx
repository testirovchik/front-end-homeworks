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
          const axiosError = err.response?.data as IResponse
          setError(axiosError.message);
        }
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        {error && <p className="text-red-400">{error}</p>}

        <form onSubmit={handleSubmit(handleNewLogin)} className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">Login Change</h2>

          {/* New login */}
          <div>
            <label
              htmlFor="newLogin"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              {errors ? (
                <p className="text-red-400">{errors.newLogin?.message}</p>
              ) : (
                "NewLogin"
              )}
            </label>
            <input
              {...register("newLogin", { required: "please enter new login" })}
              id="newLogin"
              type="text"
              placeholder="Enter new login"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              {errors ? (
                <p className="text-red-400">{errors.password?.message}</p>
              ) : (
                "password"
              )}
            </label>
            <input
              {...register("password", {
                required: "please enter new login",
                minLength: { value: 5, message: "password is too short" },
              })}
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
