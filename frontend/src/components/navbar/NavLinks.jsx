import { Link, useLocation } from "react-router-dom";
import { House, NotebookTabs, Info } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: House },
  { to: "/entries", label: "Your Entries", icon: NotebookTabs },
  { to: "/about", label: "About", icon: Info },
];

const NavLinks = ({ toggle }) => {
  const { pathname } = useLocation();

  return (
    <>
      {links.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <li key={to} className="mt-4 sm:mt-0" onClick={toggle}>
            <Link
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                active
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
