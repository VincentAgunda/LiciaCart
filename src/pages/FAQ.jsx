import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const FAQ = () => {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "We deliver within 3–5 business days in major cities and a little longer for remote areas.",
    },
    {
      q: "What payment methods do you accept?",
      a: "M-Pesa, Visa, Mastercard, and other secure mobile money options.",
    },
    {
      q: "Can I return an item?",
      a: "Yes. Returns are accepted within 14 days for unused items in original condition.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">
            Help Center
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-[1.5rem] p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{faq.q}</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;