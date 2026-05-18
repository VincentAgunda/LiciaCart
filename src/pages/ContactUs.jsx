import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const ContactUs = () => {
  const inputStyle =
    "w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white focus:border-black outline-none transition-all duration-300";

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Support
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-3">
            Send us a message and we will get back to you.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6 md:p-8">
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className={inputStyle}
            />

            <input
              type="email"
              placeholder="Email"
              className={inputStyle}
            />

            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-white focus:border-black outline-none transition-all duration-300 resize-none"
            />

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;