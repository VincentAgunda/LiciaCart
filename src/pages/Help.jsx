import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Help = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
        <p className="text-gray-text">Need assistance? Explore our guides or reach out to our team.</p>
        <ul className="mt-6 space-y-2 list-disc list-inside text-apple-blue">
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="#">Shipping Policy</a></li>
          <li><a href="#">Returns & Refunds</a></li>
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Help;