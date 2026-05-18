import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchRounded, ArrowForwardRounded } from "@mui/icons-material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center h-[72px] rounded-full bg-white border border-gray-200 shadow-xl shadow-black/[0.03] overflow-hidden">
        <div className="pl-6 text-gray-400">
          <SearchRounded sx={{ fontSize: 24 }} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search premium products..."
          className="flex-1 h-full px-4 text-[15px] bg-transparent outline-none placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="h-[56px] mr-2 px-7 rounded-full bg-black text-white font-medium flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Search
          <ArrowForwardRounded sx={{ fontSize: 20 }} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;