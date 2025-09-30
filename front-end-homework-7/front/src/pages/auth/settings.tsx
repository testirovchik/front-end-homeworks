// settings.tsx

import { LoginChange } from "./newLogin";
import { PasswordChange } from "./newPassword";


export const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-10">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Account Settings
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login change form */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-inner">
            <LoginChange />
          </div>

          {/* Password change form */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-inner">
            <PasswordChange />
          </div>
        </div>
      </div>
    </div>
  );
};
