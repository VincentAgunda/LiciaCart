import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AddRounded, CheckRounded } from "@mui/icons-material";
import { useCart } from "../../hooks/useCart";

// 3 Different background shades matching modern tech storefronts
const SHADES = ["bg-[#f5f5f7]", "bg-[#e8eaed]", "bg-[#f5f5f7]"];

const ProductCard = memo(({ product, shadeIndex = 0 }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Pick shade based on index
  const bgClass = SHADES[shadeIndex % 3];

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents triggering the card's product link
    
    if (!isAdded) {
      addToCart(product);
      setIsAdded(true);
    }
  };

  // Automatically reset the button state after 2 seconds
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 30px 60px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className={`group relative ${bgClass} rounded-[32px] overflow-hidden cursor-pointer h-[480px] flex flex-col will-change-transform border border-transparent hover:border-gray-200/30 transition-colors duration-300`}
    >
      {/* Content Top */}
      <div className="p-8 z-10 relative pointer-events-none">
        <h4 className="text-[12px] font-semibold tracking-wider text-[#0071e3] uppercase mb-1">
          {product.brand || "New"}
        </h4>
        <h3 className="text-[26px] md:text-[28px] leading-[1.15] font-semibold tracking-tight text-[#1d1d1f] max-w-[85%]">
          {product.name}
        </h3>
        <p className="mt-2 text-md font-medium text-gray-500">
          {new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
          }).format(product.price)}
        </p>
      </div>

      {/* Image Container & Main Click Area */}
      <Link to={`/product/${product.id}`} className="absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-24 h-[55%] flex items-end justify-center px-8">
          <img
  src={product.imageUrl || product.image} 
  alt={product.name}
  loading="lazy"
  className="w-full h-full object-contain origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
/>
        </div>
      </Link>

      {/* Interactive Bottom Action Bar */}
      <div className="absolute bottom-6 inset-x-6 flex justify-between items-center z-20">
        {/* Blue Shop Button */}
        <Link
          to={`/product/${product.id}`}
          className="bg-[#0071e3] text-white px-5 h-11 rounded-full flex items-center justify-center text-[14px] font-medium tracking-tight hover:bg-[#0077ed] active:scale-95 transition-all duration-200 shadow-sm shadow-[#0071e3]/20"
        >
          Shop
        </Link>

        {/* Dynamic Black Add Button */}
        <motion.button
          layout
          onClick={handleAdd}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`h-11 bg-[#1d1d1f] text-white flex items-center justify-center hover:bg-black active:scale-95 transition-colors duration-200 select-none overflow-hidden ${
            isAdded ? "px-4 rounded-full" : "w-11 rounded-full"
          }`}
          aria-label="Add to cart"
        >
          <motion.div layout className="flex items-center gap-1.5 justify-center whitespace-nowrap">
            {isAdded ? (
              <>
                <motion.span
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="flex items-center"
                >
                  <CheckRounded sx={{ fontSize: 18 }} />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-[13px] font-medium tracking-tight"
                >
                  Added to cart
                </motion.span>
              </>
            ) : (
              <AddRounded sx={{ fontSize: 22 }} />
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
});

export default ProductCard;