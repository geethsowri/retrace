import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircleUserRound, LogOut, LockKeyhole, ChevronDown } from "lucide-react";
import ModalLayout from "../ModalLayout";
import { useState, useRef, useEffect } from "react";
import Profile from "../auth/Profiles";
import Password from "../auth/Password";
import Logout from "../auth/Logout";

const NavProfile = () => {
  const user = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link to="/signup" className="hidden lg:inline-flex items-center px-3 py-1.5 rounded-lg text-sm text-gray-400 border border-white/[0.07] hover:text-white hover:bg-white/5 transition">
          Sign Up
        </Link>
        <Link to="/login" className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-300 bg-white/5 border border-white/[0.07] hover:text-white hover:bg-white/10 transition"
        >
          {user.data.firstName}
          <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-[#141414] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden py-1">
            <li>
              <button onClick={() => { setOpenProfile(true); setDropdownOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                <CircleUserRound size={15} /> Profile
              </button>
            </li>
            <li>
              <button onClick={() => { setOpenPassword(true); setDropdownOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                <LockKeyhole size={15} /> Change Password
              </button>
            </li>
            <li className="border-t border-white/[0.06] mt-1 pt-1">
              <button onClick={() => { setOpenLogout(true); setDropdownOpen(false); }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition">
                <LogOut size={15} /> Log out
              </button>
            </li>
          </ul>
        )}
      </div>

      <ModalLayout isOpen={openProfile} close={() => setOpenProfile(false)}>
        <Profile close={() => setOpenProfile(false)} />
      </ModalLayout>
      <ModalLayout isOpen={openPassword} close={() => setOpenPassword(false)}>
        <Password close={() => setOpenPassword(false)} />
      </ModalLayout>
      <ModalLayout isOpen={openLogout} close={() => setOpenLogout(false)}>
        <Logout close={() => setOpenLogout(false)} />
      </ModalLayout>
    </>
  );
};

export default NavProfile;
