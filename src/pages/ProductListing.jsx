import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { TuneRounded } from "@mui/icons-material";

import { db } from "../services/firebase";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterSidebar from "../components/common/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    department: searchParams.get("department") || "",
    category: searchParams.get("category") || "",
    minPrice: 0,
    maxPrice: 100000,
    rating: 0,
  });

  // Sync state if URL changes (e.g. clicking header dropdown while already on page)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      department: searchParams.get("department") || prev.department,
      category: searchParams.get("category") || prev.category,
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        let q = query(collection(db, "products"), limit(50));
        const constraints = [];

        if (filters.department) {
          constraints.push(where("department", "==", filters.department));
        }
        if (filters.category) {
          constraints.push(where("category", "==", filters.category));
        }
        if (filters.rating > 0) {
          constraints.push(where("rating", ">=", filters.rating));
        }

        if (constraints.length > 0) {
          q = query(collection(db, "products"), ...constraints, limit(50));
        }

        const snap = await getDocs(q);

        let results = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        results = results.filter(
          (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
        );

        if (searchQuery) {
          const qLower = searchQuery.toLowerCase();
          results = results.filter(
            (p) =>
              p.name?.toLowerCase().includes(qLower) ||
              p.brand?.toLowerCase().includes(qLower)
          );
        }

        setProducts(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-16">
        
        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-semibold">Products</h1>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium"
          >
            <TuneRounded sx={{ fontSize: 18 }} />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={setFilters} 
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)}
          />

          <div className="flex-1 transition-all duration-500">
            <div className="hidden lg:block mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : filters.department || "Store."}{" "}
                <span className="text-[#86868b]">
                  The best way to buy the products you love.
                </span>
              </h1>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#f5f5f7] rounded-[32px] h-[460px] animate-pulse"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} isCarousel={false} />
            ) : (
              <div className="bg-[#f5f5f7] rounded-[40px] p-16 md:p-24 text-center">
                <h2 className="text-3xl font-semibold tracking-tight mb-4">
                  No products found
                </h2>
                <p className="text-[#86868b] text-lg max-w-md mx-auto">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <button 
                  onClick={() => setFilters({ department: "", category: "", minPrice: 0, maxPrice: 100000, rating: 0 })}
                  className="mt-8 bg-black text-white px-6 py-3 rounded-2xl font-medium hover:scale-[1.02] transition-transform"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductListing;