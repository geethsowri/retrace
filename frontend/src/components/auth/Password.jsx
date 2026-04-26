import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../redux/api/usersApiSlice";
import toast from "react-hot-toast"; // ✅ Switched to hot-toast

const Password = ({ close }) => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user?.data?.email);
      setFirstName(user?.data?.firstName);
    }
  }, [user]);

  useEffect(() => {
    setOldPassword("");
    setNewPassword("");
  }, [close]);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();
      toast.success(response?.message || "Password updated successfully");
      close();
    } catch (error) {
      toast.error(error?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-lg font-semibold text-white">Change Password</h2>
      <p className="text-sm text-gray-500">Confirm your current password before setting a new one.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="oldPassword" className="text-xs text-gray-400">Current Password <span className="text-red-400">*</span></label>
          <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password" placeholder="••••••••"
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="newPassword" className="text-xs text-gray-400">New Password <span className="text-red-400">*</span></label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password" placeholder="••••••••"
            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
        </div>
        <button type="submit" disabled={isLoading}
          className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50">
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Password;