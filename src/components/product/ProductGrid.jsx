import { useRef, useState, useEffect } from "react";
import { PlayArrowRounded } from "@mui/icons-material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isCarousel = false }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, children } = scrollRef.current;
      if (children && children.length > 0) {
        // Grab the width of a single card item + its gap
        const itemWidth = children[0].offsetWidth + 24; // 24px matches gap-6
        const newIndex = Math.round(scrollLeft / itemWidth);
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const firstChild = current.children[0];
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 24;
        
        // If we are at the last item, loop back to the start
        if (activeIndex >= products.length - 1) {
          current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }
  };

  if (isCarousel) {
    return (
      <div className="relative group/carousel">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-[400px] snap-start shrink-0"
            >
              <ProductCard product={product} shadeIndex={index} />
            </div>
          ))}
        </div>

        {/* Custom Pill Pagination and Play Control Container */}
        <div className="flex items-center justify-center gap-2 mt-4 w-full">
          {/* Pill Container for Dots */}
          <div className="flex items-center gap-2 bg-[#e8e8ed] px-4 py-2.5 h-9 rounded-full transition-all duration-300">
            {products.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 bg-[#86868b] ${
                  activeIndex === index ? "w-5 bg-[#1d1d1f]" : "w-1.5"
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center hover:bg-[#d2d2d7] active:scale-95 transition-all"
            aria-label="Next slide"
          >
            <PlayArrowRounded className="text-[20px]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} shadeIndex={index} />
      ))}
    </div>
  );
};

export default ProductGrid;