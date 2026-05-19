import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase"; 
import { uploadImage } from "../services/cloudinary"; 
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import OrderManager from "../components/admin/OrderManager";
import { CloseRounded, CheckRounded } from "@mui/icons-material";

// Reusable Sub-Form Component
const AdminProductForm = ({ product, onSubmit, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    price: product?.price || "",
    department: product?.department || "Men",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    limitedTime: product?.limitedTime || false,
    handpicked: product?.handpicked || false,
    weeklyPick: product?.weeklyPick || false,
  });

  const [imageMode, setImageMode] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      ...formData, 
      price: Number(formData.price),
      imageFile: imageMode === "upload" ? imageFile : null,
      imageUrl: imageMode === "url" ? formData.imageUrl : previewUrl
    });
  };

  const handleImageModeChange = (mode) => {
    setImageMode(mode);
    if (mode === "url") {
      setPreviewUrl(formData.imageUrl);
      setImageFile(null);
    } else {
      setPreviewUrl(imageFile ? URL.createObjectURL(imageFile) : "");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      {/* Basic Meta Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <input type="text" value={formData.brand || ""} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price (KES)</label>
          <input required type="number" value={formData.price || ""} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Department</label>
          <select required value={formData.department || "Men"} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Kitchen Accessories">Kitchen Accessories</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
      </div>

      {/* Image Handler with Preview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
        <div className="md:col-span-3">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Product Image</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                type="button" 
                onClick={() => handleImageModeChange("url")} 
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${imageMode === "url" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`}
              >
                Image URL
              </button>
              <button 
                type="button" 
                onClick={() => handleImageModeChange("upload")} 
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${imageMode === "upload" ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"}`}
              >
                Upload File
              </button>
            </div>
          </div>
          
          {imageMode === "url" ? (
            <input 
              required={!previewUrl} 
              type="url" 
              placeholder="https://images.unsplash.com/..." 
              value={formData.imageUrl || ""} 
              onChange={(e) => {
                setFormData({...formData, imageUrl: e.target.value});
                setPreviewUrl(e.target.value);
              }} 
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black text-sm" 
            />
          ) : (
            <input 
              required={!previewUrl} 
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full h-12 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 transition" 
            />
          )}
        </div>
        
        {previewUrl && (
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-400 mb-2 font-medium">Image Preview</span>
            <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center p-1">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" onError={(e) => { e.target.src = "https://placehold.co/100?text=Error"; }} />
            </div>
          </div>
        )}
      </div>

      {/* Homepage Promotional Section Placement Toggles */}
      <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200/60">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Homepage Banner Promotions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center gap-3 cursor-pointer bg-white p-3.5 rounded-xl border border-gray-200 select-none hover:bg-gray-50 transition shadow-sm">
            <input type="checkbox" checked={formData.limitedTime} onChange={(e) => setFormData({...formData, limitedTime: e.target.checked})} className="w-5 h-5 accent-black rounded cursor-pointer" />
            <span className="text-sm font-medium text-gray-800">Limited-Time Offer</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer bg-white p-3.5 rounded-xl border border-gray-200 select-none hover:bg-gray-50 transition shadow-sm">
            <input type="checkbox" checked={formData.handpicked} onChange={(e) => setFormData({...formData, handpicked: e.target.checked})} className="w-5 h-5 accent-black rounded cursor-pointer" />
            <span className="text-sm font-medium text-gray-800">Handpicked For You</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer bg-white p-3.5 rounded-xl border border-gray-200 select-none hover:bg-gray-50 transition shadow-sm">
            <input type="checkbox" checked={formData.weeklyPick} onChange={(e) => setFormData({...formData, weeklyPick: e.target.checked})} className="w-5 h-5 accent-black rounded cursor-pointer" />
            <span className="text-sm font-medium text-gray-800">This Week's Pick</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea required rows="3" value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black resize-none" />
      </div>
      
      {/* Submission Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={loading} className="px-6 h-12 bg-black text-white font-medium rounded-xl flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition">
          <CheckRounded sx={{ fontSize: 20 }} /> {loading ? "Saving..." : "Save Product"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-6 h-12 bg-gray-100 text-black font-medium rounded-xl flex items-center gap-2 hover:bg-gray-200 transition">
            <CloseRounded sx={{ fontSize: 20 }} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (user && !user.isAdmin) navigate("/", { replace: true });
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
      let finalImageUrl = data.imageUrl;

      // Cloudinary Asset Management Pipeline Block
      if (data.imageFile) {
        finalImageUrl = await uploadImage(data.imageFile);
      }

      const productData = {
        name: data.name,
        brand: data.brand,
        price: data.price,
        department: data.department,
        description: data.description,
        imageUrl: finalImageUrl,
        limitedTime: data.limitedTime,
        handpicked: data.handpicked,
        weeklyPick: data.weeklyPick,
      };

      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id), productData);
      } else {
        // FIXED: Only wrapping the reference in a single collection() function
        await addDoc(collection(db, "products"), productData);
      }
      
      setEditingProduct(null);
      setShowForm(false);
      setRefresh((r) => r + 1);
    } catch (err) {
      alert("Error processing product: " + err.message);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you absolutely sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      setRefresh((r) => r + 1);
    }
  };

  if (!user || !user.isAdmin) return <div className="p-8 text-center text-gray-500 font-medium">Access denied...</div>;

  return (
    <div className="flex min-h-screen bg-[#fbfbfd]">
      <AdminSidebar activeView={view} onNavigate={setView} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-8 text-black tracking-tight">
          Admin Dashboard
        </h1>

        {view === "dashboard" && (
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-medium mb-2">Welcome, {user.name || user.email}</h2>
            <p className="text-gray-500">Use the sidebar to manage products repository configurations and review active buyer orders.</p>
          </div>
        )}

        {view === "products" && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-black">Products Repository</h2>
              {!showForm && (
                <button 
                  onClick={() => { setEditingProduct(null); setShowForm(true); }}
                  className="bg-black text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm"
                >
                  + Add Product
                </button>
              )}
            </div>

            {showForm && (
              <div className="mb-10">
                <h3 className="text-lg font-medium mb-4 text-gray-700">{editingProduct ? "Modify Repository Item" : "Create New Repository Item"}</h3>
                <AdminProductForm 
                  product={editingProduct} 
                  onSubmit={handleProductSubmit} 
                  loading={loading} 
                  onCancel={() => { setShowForm(false); setEditingProduct(null); }}
                />
              </div>
            )}

            <div className="grid gap-4">
              {products.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                  <div className="flex items-center gap-5">
                    {p.imageUrl && (
                      <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center p-1 border border-gray-100 overflow-hidden flex-shrink-0">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-lg text-black block leading-snug">{p.name}</span>
                      <p className="text-sm text-gray-500 mt-0.5">KES {p.price.toLocaleString()} • {p.brand}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-200/60">
                          {p.department}
                        </span>
                        {p.limitedTime && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            Limited-Time
                          </span>
                        )}
                        {p.handpicked && (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            Handpicked
                          </span>
                        )}
                        {p.weeklyPick && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            Weekly Pick
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4 sm:mt-0 pt-3 sm:pt-0 border-t border-gray-100 sm:border-0 w-full sm:w-auto justify-end">
                    <button onClick={() => handleEdit(p)} className="text-[#0066cc] font-semibold text-sm hover:underline">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 font-semibold text-sm hover:underline">Delete</button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-400">
                  No repository inventory matches found.
                </div>
              )}
            </div>
          </section>
        )}

        {view === "orders" && (
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Orders Manager</h2>
            <OrderManager orders={orders} onRefresh={() => setRefresh((r) => r + 1)} />
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;