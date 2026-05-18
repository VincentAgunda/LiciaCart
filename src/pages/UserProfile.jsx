import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import OrderHistory from "../components/user/OrderHistory";
import Wishlist from "../components/user/Wishlist";

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const snap = await getDocs(q);
        setOrders(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      };
      fetchOrders();

      const fetchWishlist = async () => {
        const q = query(
          collection(db, "wishlists"),
          where("userId", "==", user.uid)
        );
        const snap = await getDocs(q);
        setWishlist(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      };
      fetchWishlist();
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 ${
              activeTab === "orders"
                ? "border-b-2 border-apple-blue text-apple-blue"
                : "text-gray-text"
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`pb-2 ${
              activeTab === "wishlist"
                ? "border-b-2 border-apple-blue text-apple-blue"
                : "text-gray-text"
            }`}
          >
            Wishlist
          </button>
        </div>
        {activeTab === "orders" ? (
          <OrderHistory orders={orders} />
        ) : (
          <Wishlist items={wishlist} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;