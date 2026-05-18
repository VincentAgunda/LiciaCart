import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import { shareOnInstagram, shareOnTwitter } from "../services/socialShare";

const Discover = () => {
  const brands = [
    {
      title: "Sifa Designs",
      description:
        "Handmade jewelry empowering Maasai women. Every purchase supports education and artisan livelihoods.",
    },
    {
      title: "Toto Knits",
      description:
        "Organic cotton childrenswear from Ghana, combining modern design with tradition and comfort.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 w-full">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Brand Stories
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Discover Emerging African Brands
          </h1>
          <p className="text-gray-500 mt-4 text-lg leading-relaxed">
            Unique stories, authentic craftsmanship, and products built with culture and intention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.title}
              className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                Featured Brand
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {brand.title}
              </h2>
              <p className="mt-3 text-gray-500 leading-relaxed">
                {brand.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="outline" onClick={shareOnInstagram}>
                  Follow on IG
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    shareOnTwitter(brand.title, "https://luciacart.com")
                  }
                >
                  Share Brand
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;