import { useState, useEffect } from "react";
import { uploadImage } from "../../services/cloudinary";

const ProductForm = ({ product, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    department: "", // e.g. Men, Women, Kids, Unisex
    category: "",
    subCategory: "", // Dynamic based on category
    image: "",
    limitedTime: false,
    handpicked: false,
    weeklyPick: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        brand: product.brand || "",
        price: product.price || "",
        description: product.description || "",
        department: product.department || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        image: product.image || "",
        limitedTime: product.limitedTime || false,
        handpicked: product.handpicked || false,
        weeklyPick: product.weeklyPick || false,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Reset subCategory if category changes
    if (name === "category") {
      setForm({ ...form, category: value, subCategory: "" });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return form.image;
    setUploading(true);
    try {
      const url = await uploadImage(imageFile);
      setForm({ ...form, image: url });
      setImageFile(null);
      return url;
    } catch (err) {
      alert("Image upload failed: " + err.message);
      return form.image;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = form.image;
    if (imageFile) {
      imageUrl = await handleImageUpload();
    }
    onSubmit({ ...form, image: imageUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
        required
      />
      <input
        name="brand"
        value={form.brand}
        onChange={handleChange}
        placeholder="Brand (Optional)"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
      />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (KES)"
          className="w-full sm:w-1/3 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
          required
        />
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full sm:w-1/3 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
          required
        >
          <option value="">Select Department</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Unisex">Unisex / Home</option>
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full sm:w-1/3 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
          required
        >
          <option value="">Select Category</option>
          <option value="luxury">Luxury</option>
          <option value="local">Local Brand</option>
          <option value="home-decor">Home Decor</option>
          <option value="bags">Bags</option>
        </select>
      </div>

      {/* Dynamic Sub-Categories */}
      {form.category === "home-decor" && (
        <select
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
          required
        >
          <option value="">Select Home Decor Item</option>
          <option value="Curtains">Curtains</option>
          <option value="Fleece Blankets">Fleece Blankets</option>
          <option value="Throw Pillows">Throw Pillows</option>
        </select>
      )}

      {form.category === "bags" && (
        <select
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
          required
        >
          <option value="">Select Bag Type</option>
          <option value="Backpacks">Backpacks</option>
          <option value="Crossbody Bags">Crossbody Bags</option>
          <option value="Tote Bags">Tote Bags</option>
          <option value="Diaper Bags">Diaper Bags</option>
          <option value="Fanny Packs">Fanny Packs</option>
          <option value="Pencil Cases">Pencil Cases</option>
          <option value="Sling Bags">Sling Bags</option>
          <option value="Laptop Sleeves / Washbags">Laptop Sleeves / Washbags</option>
        </select>
      )}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="3"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
        required
      />

      {/* --- NEW SECTION TOGGLES --- */}
      <div className="flex flex-wrap gap-4 bg-[#dee0e0] p-4 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="limitedTime"
            checked={form.limitedTime}
            onChange={handleChange}
            className="w-4 h-4 accent-apple-blue"
          />
          <span className="text-sm font-medium">Limited-Time Offer</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="handpicked"
            checked={form.handpicked}
            onChange={handleChange}
            className="w-4 h-4 accent-apple-blue"
          />
          <span className="text-sm font-medium">Handpicked For You</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="weeklyPick"
            checked={form.weeklyPick}
            onChange={handleChange}
            className="w-4 h-4 accent-apple-blue"
          />
          <span className="text-sm font-medium">This Week's Pick</span>
        </label>
      </div>

      <div>
        <label className="block mb-1 font-medium">Current Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-apple-blue"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Upload New Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />
      </div>
      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="h-20 object-cover rounded shadow"
        />
      )}
      <button
        type="submit"
        disabled={loading || uploading}
        className="bg-apple-blue text-white px-6 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        {uploading
          ? "Uploading..."
          : loading
          ? "Saving..."
          : product
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;