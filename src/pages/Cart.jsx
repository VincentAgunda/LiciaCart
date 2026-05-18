import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const subtotal = cartTotal;
  const tax = subtotal * 0.16;
  const shipping = subtotal > 0 ? 300 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Shopping Bag
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-10 text-center">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <CartSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;