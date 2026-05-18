import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const OrderManager = ({ orders, onRefresh }) => {
  const updateStatus = async (orderId, newStatus) => {
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    onRefresh();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customerName}</td>
              <td className="p-3">
                {new Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                }).format(order.total)}
              </td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManager;