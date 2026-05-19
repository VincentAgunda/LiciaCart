import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TuneRounded,
  KeyboardArrowDownRounded,
  RestartAltRounded,
  CheckRounded,
  CloseFullscreenRounded,
  OpenInFullRounded,
  CloseRounded
} from "@mui/icons-material";

const FilterSidebar = ({ filters, onFilterChange, isMobileOpen, onMobileClose }) => {
  const [local, setLocal] = useState({
    department: filters?.department || "",
    category: filters?.category || "",
    minPrice: filters?.minPrice || 0,
    maxPrice: filters?.maxPrice || 100000,
    rating: filters?.rating || 0,
  });

  const [isMinimized, setIsMinimized] = useState(false);

  // Sync local state when external filters change (e.g. from Header URL changes)
  useEffect(() => {
    setLocal({
      department: filters?.department || "",
      category: filters?.category || "",
      minPrice: filters?.minPrice || 0,
      maxPrice: filters?.maxPrice || 100000,
      rating: filters?.rating || 0,
    });
  }, [filters]);

  const handleApply = () => {
    onFilterChange(local);
    if (onMobileClose) onMobileClose();
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

  const SidebarContent = (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
            <TuneRounded sx={{ fontSize: 20 }} />
          </div>
          {!isMinimized && (
            <div>
              <h3 className="font-semibold text-lg">Filters</h3>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!isMinimized && (
            <button
              onClick={handleReset}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center text-gray-500"
              title="Reset Filters"
            >
              <RestartAltRounded sx={{ fontSize: 20 }} />
            </button>
          )}
          
          {/* Desktop Minimize Button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hidden lg:flex w-10 h-10 rounded-xl hover:bg-gray-100 transition-all duration-300 items-center justify-center text-gray-500"
            title={isMinimized ? "Expand" : "Collapse"}
          >
            {isMinimized ? <OpenInFullRounded sx={{ fontSize: 18 }} /> : <CloseFullscreenRounded sx={{ fontSize: 18 }} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="flex lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 items-center justify-center text-gray-800"
          >
            <CloseRounded sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
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
                    <option value="Kitchen Accessories">Kitchen Accessories</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                  <KeyboardArrowDownRounded className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* PRICE RANGE */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Min Price</label>
                  <input
                    type="number"
                    value={local.minPrice}
                    onChange={(e) => setLocal({ ...local, minPrice: +e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-2">Max Price</label>
                  <input
                    type="number"
                    value={local.maxPrice}
                    onChange={(e) => setLocal({ ...local, maxPrice: +e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* APPLY BUTTON */}
              <button
                onClick={handleApply}
                className="w-full h-14 rounded-2xl bg-black text-white font-medium hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
              >
                <CheckRounded sx={{ fontSize: 20 }} />
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className={`hidden lg:block sticky top-28 transition-all duration-500 ease-in-out ${isMinimized ? "w-[90px]" : "w-[320px]"}`}>
        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-black/[0.03] overflow-hidden">
          {SidebarContent}
        </div>
      </aside>

      {/* MOBILE OVERLAY & SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex-1 overflow-y-auto pb-8">
                {SidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;