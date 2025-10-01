import { useNavigate, useOutletContext } from "react-router-dom";
import { type IContext } from "../../types";
import { Axios } from "../../lib/api";

export const Profile = () => {
  const { account } = useOutletContext<IContext>();
  const navigate = useNavigate();
  const handleLougout = () => {
    Axios.post("/logout")
    .then(() => navigate("/"))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center max-w-sm w-full">
        {/* Profile Image */}
        <img
          src={account.picture?import.meta.env.VITE_BASE + account.picture: import.meta.env.VITE_DEFAULT_PIC }
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-md border-4 border-indigo-500"
        />

        {/* Username */}
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{account.name} {account.surname}</h1>
        <p className="text-gray-500 text-sm">Frontend Developer</p>
        <p className="text-red-400">{account.isPrivate?"Your account is private": "Your account is public"}</p>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition duration-200">
            Edit Profile
          </button>
          <button onClick={handleLougout} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl shadow-md transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};