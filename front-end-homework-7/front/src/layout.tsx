import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "./lib/api";
import { type IUser, type IResponse } from "./types";

export const Layout = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState<IUser | null>(null)
  useEffect(() => {
    Axios.get<IResponse>("/verify")
    .then(response => {
      setAccount(response.data.payload as IUser)
    }).catch(() => {
      navigate("/login")
    })
  }, [])
  return account && (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Profile App</h1>

        <div className="space-x-6">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/profile/followers"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`
            }
          >
            Followers
          </NavLink>

          <NavLink
            to="/profile/followings"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`
            }
          >
            Followings
          </NavLink>

          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              `font-medium ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`
            }
          >
            Settings
          </NavLink>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet context={{account}}/>
      </main>
    </div>
  );
}; 