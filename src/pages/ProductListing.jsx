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

  const [filters, setFilters] = useState({
    department: "",
    category: "",
    minPrice: 0,
    maxPrice: 100000,
    rating: 0,
  });

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

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : "Store."}{" "}
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
              <div className="bg-[#f5f5f7] rounded-[40px] p-24 text-center">
                <h2 className="text-3xl font-semibold tracking-tight mb-4">
                  No products found
                </h2>
                <p className="text-[#86868b] text-lg">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
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