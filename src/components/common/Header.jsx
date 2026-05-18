import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  ShoppingBagOutlined,
  ExploreOutlined,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
  AdminPanelSettingsOutlined,
  LogoutOutlined,
  LoginOutlined,
  MenuRounded,
  CloseRounded,
} from "@mui/icons-material";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

import logo from "../../assets/logo.png";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    {
      name: "Shop",
      path: "/products",
      icon: <ShoppingBagOutlined sx={{ fontSize: 20 }} />,
    },
    {
      name: "Discover",
      path: "/discover",
      icon: <ExploreOutlined sx={{ fontSize: 20 }} />,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <ShoppingCartOutlined sx={{ fontSize: 20 }} />,
      badge: cart.length,
    },
  ];

  const userLinks = user
    ? [
        {
          name: "Profile",
          path: "/profile",
          icon: <PersonOutlineOutlined sx={{ fontSize: 20 }} />,
        },
        ...(user.isAdmin
          ? [
              {
                name: "Admin",
                path: "/admin",
                icon: (
                  <AdminPanelSettingsOutlined sx={{ fontSize: 20 }} />
                ),
              },
            ]
          : []),
      ]
    : [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "bg-white/95 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-[78px] flex items-center justify-between">
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[1.05rem] font-semibold tracking-tight text-gray-900">
                  Lucía Store
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
                  Premium Experience
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                      active
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}

                    <span>{item.name}</span>

                    {item.badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full text-[11px] flex items-center justify-center font-semibold ${
                          active
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </Link>
                );
              })}

              <div className="w-px h-7 bg-gray-200 mx-2" />

              {user ? (
                <>
                  {userLinks.map((item) => {
                    const active = location.pathname === item.path;

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                          active
                            ? "bg-black text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    <LogoutOutlined sx={{ fontSize: 20 }} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-black text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <LoginOutlined sx={{ fontSize: 20 }} />
                  <span>Login</span>
                </Link>
              )}
            </nav>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
            >
              {mobileMenu ? (
                <CloseRounded sx={{ fontSize: 26 }} />
              ) : (
                <MenuRounded sx={{ fontSize: 26 }} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-5 space-y-2">
                {[...navLinks, ...userLinks].map((item) => {
                  const active = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenu(false)}
                      className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                        active
                          ? "bg-black text-white"
                          : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>

                      {item.badge > 0 && (
                        <span
                          className={`min-w-[24px] h-[24px] px-2 rounded-full text-xs flex items-center justify-center font-semibold ${
                            active
                              ? "bg-white text-black"
                              : "bg-black text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-300"
                  >
                    <LogoutOutlined sx={{ fontSize: 22 }} />
                    <span className="font-medium">Logout</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-black text-white hover:opacity-90 transition-all duration-300"
                  >
                    <LoginOutlined sx={{ fontSize: 22 }} />
                    <span className="font-medium">Login</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;