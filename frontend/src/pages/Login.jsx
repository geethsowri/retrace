import { useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/features/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();

      dispatch(userInfo(response));
      navigate("/", { replace: true });

      toast.success(`Welcome back, ${response.data.firstName}`);
    } catch (error) {
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-[calc(100dvh-64px-52px)] flex items-center justify-center px-4 py-12 bg-[#080808]">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-gray-500">Log in to continue to reTrace</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs text-gray-400">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs text-gray-400">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                value={password}
                required
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            No account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
