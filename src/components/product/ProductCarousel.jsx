import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 justify-items-center sm:justify-items-start">
      {products.map((product) => (
        <div key={product.id} className="w-full flex justify-center sm:block">
           <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;