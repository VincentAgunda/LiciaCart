import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Instagram,
  Facebook,
  X,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  ArrowOutwardRounded,
} from "@mui/icons-material";

import logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Discover", path: "/discover" },
  ];

  const socialLinks = [
    {
      icon: <Instagram sx={{ fontSize: 20 }} />,
      href: "https://instagram.com",
    },
    {
      icon: <Facebook sx={{ fontSize: 20 }} />,
      href: "https://facebook.com",
    },
    {
      icon: <X sx={{ fontSize: 20 }} />,
      href: "https://x.com",
    },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden mt-24 border-t border-white/10">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="space-y-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="LucíaCart"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <div className="flex flex-col leading-none">
                <span className="text-xl font-semibold tracking-tight">
                  LucíaCart
                </span>

                <span className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mt-1">
                  Premium Marketplace
                </span>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              Discover curated African luxury, premium fashion,
              lifestyle essentials, and modern brands crafted for
              the next generation.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <ArrowOutwardRounded
                      sx={{ fontSize: 16 }}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />

                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Contact
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-400">
                <EmailOutlined sx={{ fontSize: 20 }} />
                <span className="text-sm">
                  support@luciacart.com
                </span>
              </div>

              <div className="flex items-start gap-3 text-gray-400">
                <PhoneOutlined sx={{ fontSize: 20 }} />
                <span className="text-sm">
                  +254 700 000 000
                </span>
              </div>

              <div className="flex items-start gap-3 text-gray-400">
                <LocationOnOutlined sx={{ fontSize: 20 }} />
                <span className="text-sm">
                  Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-5">
              Stay Updated
            </h4>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Get updates on new arrivals, exclusive offers, and
              premium collections.
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
              />

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-white text-black font-medium hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} LucíaCart. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;