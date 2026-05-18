import { Link } from "react-router-dom";

const Wishlist = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
          Saved Items
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Wishlist
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            to={`/product/${item.productId}`}
            key={item.id}
            className="group bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="p-4">
              <h3 className="font-medium truncate text-black">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View details
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;