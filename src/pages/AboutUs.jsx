import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">About AfriCart</h1>
        <p className="text-gray-text leading-relaxed">
          We connect discerning shoppers with Africa’s most exquisite luxury and emerging local brands.
          Our mission is to celebrate craftsmanship, empower creators, and deliver a seamless shopping experience
          across the continent and beyond.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;