import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/api/usersApiSlice";
import toast from "react-hot-toast"; // ✅ switched to react-hot-toast

const Profile = ({ close }) => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user?.data?.email);
      setFirstName(user?.data?.firstName);
      setLastName(user?.data?.lastName);
    }
  }, [user, close]);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({ firstName, lastName }).unwrap();
      toast.success(response?.message || "Profile updated successfully");
      close();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-lg font-semibold text-white">Profile</h2>
      <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-gray-400">
        {email} <span className="text-gray-600 text-xs ml-1">· cannot be changed</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-xs text-gray-400">First Name <span className="text-red-400">*</span></label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-xs text-gray-400">Last Name</label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Optional"
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
          </div>
        </div>
        <button type="submit" disabled={isLoading}
          className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50">
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;