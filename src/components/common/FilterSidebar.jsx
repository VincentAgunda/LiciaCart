import { useState } from "react";
import { motion } from "framer-motion";
import {
  TuneRounded,
  KeyboardArrowDownRounded,
  RestartAltRounded,
  CheckRounded,
} from "@mui/icons-material";

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [local, setLocal] = useState({
    department: filters?.department || "",
    category: filters?.category || "",
    minPrice: filters?.minPrice || 0,
    maxPrice: filters?.maxPrice || 100000,
    rating: filters?.rating || 0,
  });

  const handleApply = () => {
    onFilterChange(local);
  };

  const handleReset = () => {
    const reset = {
      department: "",
      category: "",
      minPrice: 0,
      maxPrice: 100000,
      rating: 0,
    };
    setLocal(reset);
    onFilterChange(reset);
  };

  return (
    <aside className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-[320px] bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-black/[0.03] overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center">
              <TuneRounded sx={{ fontSize: 22 }} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Filters</h3>
              <p className="text-sm text-gray-400">Refine your products</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
          >
            <RestartAltRounded sx={{ fontSize: 20 }} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-7">
          {/* DEPARTMENT */}
          <div>
            <label className="block text-sm font-medium mb-3">Department</label>
            <div className="relative">
              <select
                value={local.department}
                onChange={(e) => setLocal({ ...local, department: e.target.value })}
                className="appearance-none w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 text-sm"
              >
                <option value="">All Departments</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex / Home</option>
              </select>
              <KeyboardArrowDownRounded
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                sx={{ fontSize: 22 }}
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-3">Category</label>
            <div className="relative">
              <select
                value={local.category}
                onChange={(e) => setLocal({ ...local, category: e.target.value })}
                className="appearance-none w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 text-sm"
              >
                <option value="">All Categories</option>
                <option value="luxury">Luxury Collection</option>
                <option value="local">Local Brands</option>
                <option value="home-decor">Home Decor</option>
                <option value="bags">Bags</option>
              </select>
              <KeyboardArrowDownRounded
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                sx={{ fontSize: 22 }}
              />
            </div>
          </div>

          {/* MIN PRICE */}
          <div>
            <label className="block text-sm font-medium mb-3">Minimum Price</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">KES</span>
              <input
                type="number"
                value={local.minPrice}
                onChange={(e) => setLocal({ ...local, minPrice: +e.target.value })}
                className="w-full h-14 pl-16 pr-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* MAX PRICE */}
          <div>
            <label className="block text-sm font-medium mb-3">Maximum Price</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">KES</span>
              <input
                type="number"
                value={local.maxPrice}
                onChange={(e) => setLocal({ ...local, maxPrice: +e.target.value })}
                className="w-full h-14 pl-16 pr-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* RATING */}
          <div>
            <label className="block text-sm font-medium mb-3">Minimum Rating</label>
            <div className="relative">
              <select
                value={local.rating}
                onChange={(e) => setLocal({ ...local, rating: +e.target.value })}
                className="appearance-none w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300 text-sm"
              >
                <option value="0">Any Rating</option>
                <option value="5">5 ★ Premium</option>
                <option value="4">4 ★ & Above</option>
                <option value="3">3 ★ & Above</option>
              </select>
              <KeyboardArrowDownRounded
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                sx={{ fontSize: 22 }}
              />
            </div>
          </div>

          {/* APPLY BUTTON */}
          <button
            onClick={handleApply}
            className="w-full h-14 rounded-2xl bg-black text-white font-medium hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CheckRounded sx={{ fontSize: 20 }} />
            Apply Filters
          </button>
        </div>
      </motion.div>
    </aside>
  );
};

export default FilterSidebar;