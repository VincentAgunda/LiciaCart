import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

import { db } from "../services/firebase";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductDetailView from "../components/product/ProductDetailView";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snap = await getDoc(doc(db, "products", id));

        if (snap.exists()) {
          setProduct({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {loading ? (
          <div className="flex justify-center py-32">
            <CircularProgress sx={{ color: "#1d1d1f" }} />
          </div>
        ) : product ? (
          <div className="bg-white rounded-[40px] p-8 md:p-12 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <ProductDetailView product={product} />
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-24 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Product not found
            </h2>
            <p className="text-[#86868b] text-lg">
              The product you are looking for does not exist or has been removed.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;