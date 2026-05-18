import { motion } from "framer-motion";

import {
  AddRounded,
  RemoveRounded,
  DeleteOutlineRounded,
} from "@mui/icons-material";

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <motion.div
      layout
      className="bg-white border border-gray-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:shadow-black/[0.03] transition-all duration-500"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* IMAGE */}
        <div className="overflow-hidden rounded-[1.5rem] bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full sm:w-32 h-32 object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {item.name}
            </h3>

            <p className="text-gray-400 mt-2 text-sm">
              Premium Collection
            </p>

            <p className="text-2xl font-semibold mt-4">
              {new Intl.NumberFormat("en-KE", {
                style: "currency",
                currency: "KES",
              }).format(item.price)}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    Math.max(1, item.qty - 1)
                  )
                }
                className="w-12 h-12 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <RemoveRounded />
              </button>

              <div className="w-14 text-center font-semibold">
                {item.qty}
              </div>

              <button
                onClick={() =>
                  onUpdateQuantity(
                    item.id,
                    item.qty + 1
                  )
                }
                className="w-12 h-12 hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
              >
                <AddRounded />
              </button>
            </div>

            <button
              onClick={() => onRemove(item.id)}
              className="h-12 px-5 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
            >
              <DeleteOutlineRounded />

              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;