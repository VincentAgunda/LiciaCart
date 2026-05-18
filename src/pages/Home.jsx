import { useEffect, useState } from "react";
import { collection, query, limit, getDocs, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { db } from "../services/firebase";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/product/ProductGrid";
import SignUpSection from "../components/common/SignUpSection"; // Ensure the path is correct

// Updated Categories matching the FilterSidebar
const popularCategories = [
  { 
    name: "Luxury Collection", 
    path: "luxury", 
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=300&auto=format&fit=crop", 
    color: "bg-[#f1f3f4]" 
  },
  { 
    name: "Local Brands", 
    path: "local", 
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=300&auto=format&fit=crop", 
    color: "bg-[#f8f9fa]" 
  },
  { 
    name: "Home Decor", 
    path: "home-decor", 
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop", 
    color: "bg-[#fef7e0]" 
  },
  { 
    name: "Bags", 
    path: "bags", 
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop", 
    color: "bg-[#e8eaed]" 
  }
];

// Reusable Separator Card Component
const PromoBanner = ({ title, subtitle, bgClass, image, reverse }) => (
  <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
    <div className={`w-full rounded-[32px] overflow-hidden ${bgClass} flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center min-h-[400px]`}>
      <div className="flex-1 p-12 text-center md:text-left flex flex-col justify-center items-center md:items-start">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
          {title}
        </h2>
        <p className="text-xl text-[#505050] mb-8 font-medium">
          {subtitle}
        </p>
        <button className="px-6 py-3 rounded-full border border-[#1d1d1f] text-[#1d1d1f] font-medium hover:bg-[#1d1d1f] hover:text-white transition-colors duration-300">
          Learn more
        </button>
      </div>
      <div className="flex-1 w-full h-[300px] md:h-[400px] relative p-8">
        <img src={image} alt={title} className="w-full h-full object-contain drop-shadow-2xl" />
      </div>
    </div>
  </section>
);

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [limitedOffers, setLimitedOffers] = useState([]);
  const [handpicked, setHandpicked] = useState([]);
  const [weeklyPicks, setWeeklyPicks] = useState([]);
  
  // State for the "Trending" section Show More / Show Less toggle
  const [showAllTrending, setShowAllTrending] = useState(false);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const productsRef = collection(db, "products");

        const [featuredSnap, limitedSnap, handpickedSnap, weeklySnap] =
          await Promise.all([
            getDocs(query(productsRef, limit(12))), // Increased limit so 'Show More' reveals more items
            getDocs(query(productsRef, where("limitedTime", "==", true), limit(8))),
            getDocs(query(productsRef, where("handpicked", "==", true), limit(8))),
            getDocs(query(productsRef, where("weeklyPick", "==", true), limit(8))),
          ]);

        const mapDocs = (snap) => snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setFeatured(mapDocs(featuredSnap));
        setLimitedOffers(mapDocs(limitedSnap));
        setHandpicked(mapDocs(handpickedSnap));
        setWeeklyPicks(mapDocs(weeklySnap));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchHomepageData();
  }, []);

  // Determine how many items to show in the Trending section
  const displayedTrending = showAllTrending ? featured : featured.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-hidden">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05]">
                Store. <br className="hidden md:block" />
                <span className="text-[#86868b]">
                  The best way to buy the products you love.
                </span>
              </h1>

              <div className="mt-12 flex justify-center max-w-2xl mx-auto">
                <SearchBar />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SHOP POPULAR CATEGORIES */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f]">
              Shop popular categories.
            </h3>
          </div>
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {popularCategories.map((category, index) => (
              <Link key={index} to={`/category/${category.path}`} className="group flex flex-col items-center gap-3">
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${category.color} flex items-center justify-center p-4 overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full mix-blend-multiply" />
                </div>
                <span className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* LIMITED-TIME OFFERS - Carousel */}
        {limitedOffers.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Limited-Time Offers.{" "}
                <span className="text-[#86868b]">Catch them while they last.</span>
              </h2>
            </div>
            <ProductGrid products={limitedOffers} isCarousel={true} />
          </section>
        )}

        {/* SEPARATOR BOLD CARD 1 */}
        <PromoBanner 
          title="Pixel 10 Pro Fold" 
          subtitle="Epic display. Epic performance." 
          bgClass="bg-[#e4ece5]" // Soft Sage Green
          image="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop"
        />

        {/* THIS WEEK'S PICKS - Carousel */}
        {weeklyPicks.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                The latest.{" "}
                <span className="text-[#86868b]">Take a look at what’s new.</span>
              </h2>
            </div>
            <ProductGrid products={weeklyPicks} isCarousel={true} />
          </section>
        )}

       

        {/* HANDPICKED FOR YOU - Carousel */}
        {handpicked.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Handpicked.{" "}
                <span className="text-[#86868b]">Curated just for you.</span>
              </h2>
            </div>
            <ProductGrid products={handpicked} isCarousel={true} />
          </section>
        )}

 {/* SEPARATOR BOLD CARD 2 */}
        <PromoBanner 
          title="Fitbit Air" 
          subtitle="Lighter gets mightier." 
          bgClass="bg-[#e2edfa]" // Soft Light Blue
          reverse={true}
          image="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
        />
        
        {/* ALL FEATURED / TRENDING - Grid */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Trending.{" "}
              <span className="text-[#86868b]">What everyone is talking about.</span>
            </h2>
          </div>

          {featured.length > 0 ? (
            <>
              <ProductGrid products={displayedTrending} isCarousel={false} />
              
              {/* Show More / Show Less Button */}
              {featured.length > 6 && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowAllTrending(!showAllTrending)}
                    className="px-8 py-3 rounded-full border border-[#1d1d1f] text-[#1d1d1f] font-medium hover:bg-[#1d1d1f] hover:text-white transition-colors duration-300"
                  >
                    {showAllTrending ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-[400px] rounded-[40px] bg-[#f5f5f7] flex items-center justify-center">
              <p className="text-[#86868b] text-lg font-medium">No products available yet.</p>
            </div>
          )}
        </section>

        {/* SIGN UP SECTION EMBEDDED BEFORE FOOTER */}
        <SignUpSection />
        
      </main>

      <Footer />
    </div>
  );
};

export default Home;