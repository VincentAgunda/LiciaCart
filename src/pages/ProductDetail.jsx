import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";

import { db } from "../services/firebase";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductDetailView from "../components/product/ProductDetailView";
import ProductGrid from "../components/product/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Re-run the fetch anytime the ID changes (e.g., clicking a suggested product)
  useEffect(() => {
    const fetchProductAndSuggestions = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on new product

      try {
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) {
          const productData = { id: snap.id, ...snap.data() };
          setProduct(productData);

          // Fetch suggested products from the same department
          const q = query(
            collection(db, "products"),
            where("department", "==", productData.department || ""),
            limit(5)
          );
          const suggestionSnap = await getDocs(q);
          
          // Map and filter out the currently viewed product
          const suggestedItems = suggestionSnap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((p) => p.id !== id)
            .slice(0, 4); // Keep exactly 4 for a clean grid

          setSuggestions(suggestedItems);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductAndSuggestions();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-black selection:text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <KeyboardArrowLeftRounded sx={{ fontSize: 18 }} /> Back to Shop
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <CircularProgress sx={{ color: "#1d1d1f" }} />
          </div>
        ) : product ? (
          <>
            {/* MAIN PRODUCT VIEW */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
              <ProductDetailView product={product} />
            </div>

            {/* SUGGESTED PRODUCTS SECTION */}
            {suggestions.length > 0 && (
              <div className="mt-24 mb-10">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
                  You might also like.{" "}
                  <span className="text-[#86868b]">More from {product.department}.</span>
                </h2>
                <ProductGrid products={suggestions} isCarousel={true} />
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-[3rem] p-24 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Product not found
            </h2>
            <p className="text-[#86868b] text-lg mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link to="/products" className="bg-black text-white px-6 py-3 rounded-2xl font-medium hover:scale-[1.02] transition-transform">
              Browse all products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;