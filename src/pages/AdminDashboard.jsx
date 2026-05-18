import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProductForm from "../components/admin/ProductForm";
import OrderManager from "../components/admin/OrderManager";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const fetchData = async () => {
      const prodSnap = await getDocs(collection(db, "products"));
      setProducts(prodSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      const orderSnap = await getDocs(collection(db, "orders"));
      setOrders(orderSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchData();
  }, [refresh, user]);

  const handleProductSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id), data);
        setEditingProduct(null);
      } else {
        await addDoc(collection(db, "products"), data);
      }
      setRefresh((r) => r + 1);
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setView("products");
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      setRefresh((r) => r + 1);
    }
  };

  if (!user || !user.isAdmin) {
    return <div className="p-8 text-center">Access denied. Redirecting...</div>;
  }

  return (
    <div className="flex min-h-screen bg-apple-white">
      <AdminSidebar activeView={view} onNavigate={setView} />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>

        {view === "dashboard" && (
          <div className="space-y-4">
            <p>Welcome, {user.name || user.email}.</p>
            <p>Use the sidebar to manage products and view orders.</p>
          </div>
        )}

        {view === "products" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm
              product={editingProduct}
              onSubmit={handleProductSubmit}
              loading={loading}
            />
            <h3 className="text-lg font-semibold mt-8 mb-4">Existing Products</h3>
            <div className="grid gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-[#dee0e0] p-4 rounded-xl shadow-sm"
                >
                  <div>
                    <span className="font-medium text-lg">{p.name}</span>
                    {p.brand && <span className="text-gray-500 ml-2">– {p.brand}</span>}
                    <p className="text-sm text-gray-400 mt-1">KES {p.price}</p>
                    
                    {/* Visual indicators for sections */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {p.department && <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">{p.department}</span>}
                        {p.subCategory && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">{p.subCategory}</span>}
                        {p.limitedTime && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Limited Time</span>}
                        {p.handpicked && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Handpicked</span>}
                        {p.weeklyPick && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">Weekly Pick</span>}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-apple-blue font-medium hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 font-medium hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === "orders" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <OrderManager
              orders={orders}
              onRefresh={() => setRefresh((r) => r + 1)}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;