import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/api/usersApiSlice";
import toast from "react-hot-toast"; // changed import
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../redux/features/userSlice";

const Signup = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      dispatch(userInfo(response));
      navigate("/", { replace: true });
      toast.success(
        `${response.data.firstName}, your account is created and you're logged in!`
      );
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-[calc(100svh-64px-52px)] flex items-center justify-center px-4 py-12 bg-[#080808]">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-sm text-gray-500">Start your private journal today</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-2xl p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="firstname" className="text-xs text-gray-400">First Name <span className="text-red-400">*</span></label>
                <input id="firstname" type="text" name="firstName" placeholder="Jane" onChange={handleChange} value={formData.firstName} required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastname" className="text-xs text-gray-400">Last Name</label>
                <input id="lastname" type="text" name="lastName" placeholder="Doe" onChange={handleChange} value={formData.lastName}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs text-gray-400">Email <span className="text-red-400">*</span></label>
              <input id="email" type="email" name="email" placeholder="you@example.com" onChange={handleChange} value={formData.email} required autoComplete="email"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs text-gray-400">Password <span className="text-red-400">*</span></label>
              <input id="password" type="password" name="password" placeholder="••••••••" onChange={handleChange} value={formData.password} required
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition" />
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition disabled:opacity-50">
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
