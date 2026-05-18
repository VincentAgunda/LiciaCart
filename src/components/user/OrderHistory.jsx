const OrderHistory = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6">
        <p className="text-gray-500">No orders yet.</p>
      </div>
    );
  }

  const fmt = (value) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(value);

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
          Purchase History
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Order History
        </h2>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-100 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-black">
                Order #{order.id}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleDateString()
                  : "Recently"}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="font-bold text-lg">
                {fmt(order.total)}
              </p>
              <p className="text-sm mt-1 inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderHistory;