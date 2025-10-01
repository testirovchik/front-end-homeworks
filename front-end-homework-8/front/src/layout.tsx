import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "./lib/api";
import { type IUser, type IResponse } from "./types";

export const Layout = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState<IUser | null>(null)

  useEffect(() => {
    Axios.get<IResponse<IUser>>("/verify")
      .then(response => setAccount(response.data.payload as IUser))
      .catch(() => navigate("/login"))
  }, [navigate]);

  if (!account) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* Navbar */}
      <nav className="bg-gray-800/90 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center border-b border-gray-700 transition-all duration-500 hover:backdrop-blur-lg">
        <h1 className="text-2xl font-extrabold text-indigo-500 tracking-wide animate-pulse">
          Profile App
        </h1>

        <div className="space-x-6 flex items-center">
          {[
            { name: "Profile", to: "" },
            { name: "Followers", to: "followers" },
            { name: "Posts", to: "posts" },
            { name: "Followings", to: "followings" },
            { name: "Settings", to: "settings" },
          ].map(link => (
            <NavLink
              key={link.to}
              to={`/profile/${link.to}`}
              end={link.to === ""}
              className={({ isActive }) =>
                `relative font-medium text-sm transition-all duration-300 group ${
                  isActive
                    ? "text-indigo-400"
                    : "text-gray-400 hover:text-indigo-300"
                }`
              }
            >
              {link.name}
              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 group-hover:w-full ${
                  link.to === "" ? "group-hover:w-full" : ""
                }`}
              />
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-8 bg-gray-900/80 backdrop-blur-sm transition-colors duration-500">
        <Outlet context={{ account, setAccount }} />
      </main>
    </div>
  );
};
