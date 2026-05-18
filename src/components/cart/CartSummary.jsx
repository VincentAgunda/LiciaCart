import { useNavigate } from "react-router-dom";

import {
  ShoppingBagOutlined,
  LocalShippingOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";

import Button from "../common/Button";

const CartSummary = ({
  subtotal,
  tax,
  shipping,
  total,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-7 shadow-xl shadow-black/[0.03] sticky top-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
          <ReceiptLongOutlined />
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Order Summary
          </h3>

          <p className="text-sm text-gray-400">
            Secure checkout
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <ShoppingBagOutlined sx={{ fontSize: 18 }} />

            Subtotal
          </div>

          <span className="font-medium">
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <ReceiptLongOutlined sx={{ fontSize: 18 }} />

            Tax (16%)
          </div>

          <span className="font-medium">
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(tax)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <LocalShippingOutlined sx={{ fontSize: 18 }} />

            Shipping
          </div>

          <span className="font-medium">
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(shipping)}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <span className="text-lg font-semibold">
            Total
          </span>

          <span className="text-2xl font-semibold tracking-tight">
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
            }).format(total)}
          </span>
        </div>
      </div>

      <Button
        className="w-full mt-8 h-14"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;