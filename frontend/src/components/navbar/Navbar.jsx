import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import NavProfile from "./NavProfile";
import SearchBox from "./SearchBox";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="navbar bg-[#080808]/80 backdrop-blur-xl w-full sticky top-0 z-30 border-b border-white/[0.06]">
      <div className="navbar-start">
        <div className="lg:hidden">
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost text-gray-400 hover:text-white hover:bg-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
        <Link className="flex items-center gap-2 px-2 text-white font-semibold text-lg tracking-tight hover:opacity-80 transition" to="/">
          <img className="w-7 h-7" src={logo} alt="logo" />
          reTrace
        </Link>
      </div>

      <div className="navbar-center hidden flex-none lg:block">
        <ul className="menu menu-horizontal gap-1">
          <NavLinks />
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <div className="hidden md:flex">
          <SearchBox />
        </div>
        <NavProfile />
      </div>
    </div>
  );
};
export default Navbar;
