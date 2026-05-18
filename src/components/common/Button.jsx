import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 h-12 rounded-2xl font-medium tracking-tight transition-all duration-300 active:scale-[0.98]";

  const variants = {
    // Apple-style blue
    primary:
      "bg-[#0071E3] text-white hover:bg-[#0077ED] hover:scale-[1.02] shadow-lg shadow-blue-500/20",

    secondary:
      "bg-gray-100 text-black hover:bg-gray-200",

    outline:
      "border border-[#0071E3]/20 bg-white text-[#0071E3] hover:bg-[#0071E3]/5",

    luxury:
      "bg-gradient-to-r from-[#0071E3] to-[#2997FF] text-white hover:opacity-95 shadow-xl shadow-blue-500/20",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;