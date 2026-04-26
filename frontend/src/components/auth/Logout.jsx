import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ switched to react-hot-toast

const Logout = ({ close }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      dispatch(removeUserInfo());
      navigate("/");
      close();
      toast.success(response.message || "Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Logout failed.");
    }
  };

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-lg font-semibold text-white">Log out?</h2>
      <p className="text-sm text-gray-400">You'll need to log back in to access your entries.</p>
      <div className="flex gap-3">
        <button onClick={close}
          className="flex-1 py-2.5 rounded-lg border border-white/[0.08] text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
          Cancel
        </button>
        <button onClick={handleLogout} disabled={isLoading}
          className="flex-1 py-2.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm transition disabled:opacity-50">
          {isLoading ? "Logging out..." : "Log out"}
        </button>
      </div>
    </div>
  );
};

export default Logout;
