import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBox = ({ toggle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/entries?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/entries");
    }
    toggle && toggle();
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <div className="relative flex items-center">
        <Search size={14} className="absolute left-3 text-gray-500 pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entries..."
          autoComplete="off"
          className="pl-9 pr-4 py-1.5 w-52 rounded-lg bg-white/5 border border-white/[0.07] text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/40 transition"
        />
      </div>
    </form>
  );
};

export default SearchBox;