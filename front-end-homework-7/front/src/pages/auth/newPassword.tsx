import { useForm, type SubmitHandler } from "react-hook-form";
import { type INewPassword, type IResponse } from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const PasswordChange = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<INewPassword>()
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleNewPassword: SubmitHandler<INewPassword> = data => {
    Axios.patch("update/password", data)
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

        <form onSubmit={handleSubmit(handleNewPassword)} className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">Password Change</h2>

          {/* Old password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              {errors ? (
                <p className="text-red-400">{errors.oldPassword?.message}</p>
              ) : (
                "Old Password"
              )}
            </label>
            <input
              {...register("oldPassword", { required: "please enter old password" })}
              id="oldPassword"
              type="password"
              placeholder="Enter old password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* New password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              {errors ? (
                <p className="text-red-400">{errors.newPassword?.message}</p>
              ) : (
                "New Password"
              )}
            </label>
            <input
              {...register("newPassword", {
                required: "please enter new password",
                minLength: { value: 5, message: "password is too short" },
              })}
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
