import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LocalOfferRounded, CloseRounded } from "@mui/icons-material";

const SignUpSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
      {/* Main Banner */}
      <div className="bg-[#D2D6DF] rounded-[32px] py-20 px-6 flex flex-col items-center text-center">
        <div className="text-[#1a73e8] mb-6 transform -rotate-45">
          <LocalOfferRounded sx={{ fontSize: 48 }} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1d1d1f] max-w-3xl leading-tight mb-8">
          Get news, offers, cart reminders, personalized emails, and surveys from the Store.
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-[#1d1d1f] text-[#1d1d1f] px-8 py-2.5 rounded-full font-medium hover:bg-[#f1f3f4] transition-colors"
        >
          Sign up
        </button>
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-md rounded-[24px] p-8 z-50 shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                <CloseRounded />
              </button>

              <div className="mb-6">
                <div className="text-[#1a73e8] mb-4 transform -rotate-45 inline-block">
                  <LocalOfferRounded sx={{ fontSize: 32 }} />
                </div>
                <h3 className="text-2xl font-semibold text-[#1d1d1f]">Stay in the loop</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Sign up to get the latest updates and exclusive offers.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#e4ebd3] text-[#3d5a42] p-4 rounded-xl text-center font-medium"
                >
                  Thanks for signing up!
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full h-14 px-5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all duration-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-14 rounded-xl bg-[#1a73e8] text-white font-medium hover:bg-[#1557b0] transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SignUpSection;