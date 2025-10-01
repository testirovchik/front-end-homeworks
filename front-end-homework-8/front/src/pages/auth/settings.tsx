// settings.tsx
import { LoginChange } from "./newLogin";
import { PasswordChange } from "./newPassword";
import { PublicPrivate } from "./pr-pb";
import { ImagePicker } from "./utilities/image-picker";

export const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-900/70 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-3xl p-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <ImagePicker />
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Account Settings
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your login credentials and keep your account secure
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Login change form */}
          <div className="p-8 bg-gray-800/70 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Change Login
            </h2>
            <LoginChange />
          </div>

          {/* Password change form */}
          <div className="p-8 bg-gray-800/70 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:scale-[1.02] transition duration-300">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Change Password
            </h2>
            <PasswordChange />
          </div>

          <div>
            <h2>Choose your account's privacy</h2>
            <PublicPrivate/>
          </div>
        </div>
      </div>
    </div>
  );
};
