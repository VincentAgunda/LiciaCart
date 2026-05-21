import { useEffect, useState } from "react";
import { collection, query, limit, getDocs, where } from "firebase/firestore";
import { motion } from "framer-motion";

import { db } from "../services/firebase";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBar from "../components/common/SearchBar";
import ProductGrid from "../components/product/ProductGrid";
import SignUpSection from "../components/common/SignUpSection";
import PopularCategories from "../components/common/PopularCategories";

// Reusable Separator Card Component updated with Google Store button styling
const PromoBanner = ({ title, subtitle, bgClass, image, reverse }) => (
  <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
    <div className={`w-full rounded-[32px] overflow-hidden ${bgClass} flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center min-h-[400px]`}>
      <div className="flex-1 p-12 text-center md:text-left flex flex-col justify-center items-center md:items-start">
        <h2 className="text-4xl md:text-5xl font-medium tracking-normal text-[#202124] mb-4">
          {title}
        </h2>
        <p className="text-xl text-[#3c4043] mb-8 font-normal">
          {subtitle}
        </p>
        <button className="px-6 py-2.5 rounded-full bg-[#1a73e8] text-white font-medium hover:bg-[#1557b0] transition-colors duration-300 shadow-sm">
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
  const [showAllTrending, setShowAllTrending] = useState(false);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const productsRef = collection(db, "products");
        const [featuredSnap, limitedSnap, handpickedSnap, weeklySnap] =
          await Promise.all([
            getDocs(query(productsRef, limit(12))),
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

  const displayedTrending = showAllTrending ? featured : featured.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#202124] font-sans selection:bg-[#1a73e8] selection:text-white overflow-hidden">
      <Header />

      <main>
        {/* HERO SECTION - Styled to match Google Store mockup */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-[#f0f4f8]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-[68px] font-medium tracking-normal leading-[1.1] text-[#202124]">
                Store. <br className="hidden md:block" />
                <span className="text-[#3c4043] text-3xl md:text-4xl lg:text-5xl block mt-4 font-normal">
                  The best way to buy the products you love.
                </span>
              </h1>
              
              {/* Wrapper to enforce Google Blue button on the SearchBar without altering external files */}
              <div className="mt-12 flex justify-center max-w-2xl mx-auto search-bar-override">
                <style dangerouslySetInnerHTML={{__html: `
                  .search-bar-override button {
                    background-color: #1a73e8 !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 9999px !important;
                    transition: background-color 0.3s ease;
                  }
                  .search-bar-override button:hover {
                    background-color: #1557b0 !important;
                  }
                `}} />
                <SearchBar />
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMPONENT IMPORTED HERE */}
        <div className="pt-16">
          <PopularCategories />
        </div>

        {/* LIMITED-TIME OFFERS */}
        {limitedOffers.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-medium tracking-normal text-[#202124]">
                Limited-Time Offers. <span className="text-[#5f6368]">Catch them while they last.</span>
              </h2>
            </div>
            <ProductGrid products={limitedOffers} isCarousel={true} />
          </section>
        )}

        <PromoBanner 
          title="Elevate Your Space" 
          subtitle="Timeless home decor for a warm, modern living." 
          bgClass="bg-[#E4DFD8] border border-[#F2F2FC]"
          image="/category/mansweater.png"
        />

        {/* THIS WEEK'S PICKS */}
        {weeklyPicks.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-medium tracking-normal text-[#202124]">
                The latest. <span className="text-[#5f6368]">Take a look at what’s new.</span>
              </h2>
            </div>
            <ProductGrid products={weeklyPicks} isCarousel={true} />
          </section>
        )}

        {/* HANDPICKED FOR YOU */}
        {handpicked.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-medium tracking-normal text-[#202124]">
                Handpicked. <span className="text-[#5f6368]">Curated just for you.</span>
              </h2>
            </div>
            <ProductGrid products={handpicked} isCarousel={true} />
          </section>
        )}

        <PromoBanner 
          title="Fitbit Air" 
          subtitle="Lighter gets mightier." 
          bgClass="bg-[#E6D3D7]" 
          reverse={true}
          image="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
        />
        
        {/* ALL FEATURED / TRENDING */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-medium tracking-normal text-[#202124]">
              Trending. <span className="text-[#5f6368]">What everyone is talking about.</span>
            </h2>
          </div>

          {featured.length > 0 ? (
            <>
              <ProductGrid products={displayedTrending} isCarousel={false} />
              {featured.length > 6 && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowAllTrending(!showAllTrending)}
                    className="px-8 py-2.5 rounded-full border border-[#dadce0] text-[#1a73e8] font-medium hover:bg-[#f8f9fa] transition-colors duration-300"
                  >
                    {showAllTrending ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-[400px] rounded-[40px] bg-[#f8f9fa] border border-[#e8eaed] flex items-center justify-center">
              <p className="text-[#5f6368] text-lg font-medium">No products available yet.</p>
            </div>
          )}
        </section>

        <SignUpSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;