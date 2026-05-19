import { useState } from "react";
import { motion } from "framer-motion";

import {
  AddRounded,
  RemoveRounded,
  ShoppingBagOutlined,
  FavoriteBorderRounded,
  FavoriteRounded,
  CheckRounded,
  Twitter,
  Facebook,
  Instagram,
} from "@mui/icons-material";

import StarRating from "../common/StarRating";
import { useCart } from "../../hooks/useCart";
import { shareOnTwitter, shareOnFacebook, shareOnInstagram } from "../../services/socialShare";

const ProductDetailView = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-400 font-medium">Loading...</p>
      </div>
    );

  const handleAdd = () => {
    addToCart(product, qty);
    
    // Trigger success feedback
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQty(1); // Optional: reset quantity after adding
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In the future, hook this up to a useWishlist hook or user profile backend
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
      {/* IMAGE CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <div className="overflow-hidden rounded-[40px] bg-[#F5F5F7] flex items-center justify-center h-[500px] md:h-[700px] p-10">
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col justify-center"
      >
        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
          {product.brand}
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 mt-6">
          <StarRating rating={product.rating} />
          <span className="text-gray-500 font-medium tracking-tight">
            ({product.reviewCount || 0} reviews)
          </span>
        </div>

        <div className="mt-10">
          <p className="text-4xl font-semibold tracking-tight text-[#1d1d1f]">
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(product.price)}
          </p>
        </div>

        <p className="mt-8 text-gray-500 leading-relaxed text-xl tracking-tight max-w-xl">
          {product.description}
        </p>

        {/* QTY & ACTIONS */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center bg-[#F5F5F7] rounded-full p-1 border border-gray-200/60">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all duration-300 text-[#1d1d1f]"
            >
              <RemoveRounded />
            </button>
            <div className="w-12 text-center font-semibold text-lg text-[#1d1d1f]">
              {qty}
            </div>
            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all duration-300 text-[#1d1d1f]"
            >
              <AddRounded />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className={`flex-1 sm:flex-none h-14 px-10 rounded-full font-medium text-lg tracking-tight flex items-center justify-center gap-3 transition-all duration-300 ${
                isAdded 
                ? "bg-green-600 text-white" 
                : "bg-[#1d1d1f] text-white hover:bg-black"
              }`}
            >
              {isAdded ? (
                <>
                  <CheckRounded sx={{ fontSize: 22 }} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBagOutlined sx={{ fontSize: 22 }} />
                  Add to Bag
                </>
              )}
            </button>

            <button 
              onClick={toggleFavorite}
              className={`h-14 w-14 rounded-full transition-all duration-300 flex items-center justify-center ${
                isFavorite 
                ? "bg-red-50 text-red-500 border border-red-100" 
                : "bg-[#F5F5F7] text-[#1d1d1f] hover:bg-gray-200"
              }`}
            >
              {isFavorite ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            </button>
          </div>
        </div>

        {/* SHARE */}
        <div className="mt-16 pt-10 border-t border-gray-200/60">
          <p className="text-sm font-semibold tracking-tight text-gray-500 mb-5">
            Share this product
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => shareOnTwitter(product.name, window.location.href)}
              className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Twitter fontSize="small" />
            </button>
            <button
              onClick={() => shareOnFacebook(window.location.href)}
              className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Facebook fontSize="small" />
            </button>
            <button
              onClick={shareOnInstagram}
              className="w-12 h-12 rounded-full bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Instagram fontSize="small" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailView;