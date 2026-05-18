import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { initiateSTKPush } from "../services/mpesa";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import Button from "../components/common/Button";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    city: "",
    address: "",
  });
  const [payment, setPayment] = useState("mpesa");
  const [processing, setProcessing] = useState(false);

  const subtotal = cartTotal;
  const tax = subtotal * 0.16;
  const shipping = subtotal > 0 ? 300 : 0;
  const total = subtotal + tax + shipping;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setProcessing(true);

    try {
      const paymentResult = await initiateSTKPush(
        form.phone,
        total,
        `Order-${Date.now()}`
      );

      if (!paymentResult.success) {
        alert("Payment failed. Please try again.");
        setProcessing(false);
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customerName: form.fullName,
        phone: form.phone,
        city: form.city,
        address: form.address,
        items: cart.map(({ id, name, price, qty, image }) => ({
          productId: id,
          name,
          price,
          qty,
          image,
        })),
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod: payment,
        status: "Pending",
        createdAt: new Date(),
        mpesaCheckoutID: paymentResult.checkoutRequestID,
      });

      clearCart();
      alert(
        "Order placed successfully! You will receive a payment prompt on your phone."
      );
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing your order.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Secure Payment
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <CheckoutForm formData={form} onChange={handleChange} />
              <PaymentMethod selected={payment} onSelect={setPayment} />
              <Button type="submit" disabled={processing} className="w-full">
                {processing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          <aside className="sticky top-24">
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Snapshot</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">KES {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">KES {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">KES {shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">KES {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;