import React from "react";
import { Link } from "react-router-dom";

const popularCategories = [
  {
    name: "Men",
    path: "Men",
    image:
      "/category/mansweater.png",
    color: "bg-[#e8eaed]",
  },
  {
    name: "Women",
    path: "Women",
    image:
      "/category/women.png",
    color: "bg-[#e8eaed]",
  },
  {
    name: "Kids",
    path: "Kids",
    image:
      "/category/kidz.png",
    color: "bg-[#e8eaed]",
  },
  {
    name: "Kitchen Accessories",
    path: "Kitchen Accessories",
    image:
      "/kitchen/kitchen.png",
    color: "bg-[#e8eaed]",
  },
  {
    name: "Home Decor",
    path: "Home Decor",
    image:
      "/homedecor/decor.png",
    color: "bg-[#e8eaed]",
  },
];

const PopularCategories = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
      {/* Heading */}
      <div className="text-center mb-14">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Shop popular categories.
        </h3>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {popularCategories.map((category, index) => (
          <Link
            key={index}
            to={`/products?department=${encodeURIComponent(
              category.path
            )}`}
            className="group"
          >
            <div
              className={`relative h-[180px] md:h-[200px] rounded-3xl ${category.color} flex items-center justify-center overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1`}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-[70%] object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Label */}
            <p className="mt-4 text-center text-sm md:text-base font-medium text-[#1d1d1f]">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;