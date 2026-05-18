import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  EmailOutlined,
  LockOutlined,
  ArrowForwardRounded,
} from "@mui/icons-material";

import { useAuth } from "../hooks/useAuth";

import Button from "../components/common/Button";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-[32px] border border-gray-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)] p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-black to-gray-700 mx-auto mb-5 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          <h1 className="text-4xl font-black text-[#0f172a]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Sign in to continue shopping premium brands.
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-500 rounded-2xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <EmailOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-14 rounded-2xl border border-gray-200 bg-[#f8fafc] pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              className="w-full h-14 rounded-2xl border border-gray-200 bg-[#f8fafc] pl-12 pr-4 outline-none focus:ring-2 focus:ring-black/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            className="w-full h-14"
            type="submit"
          >
            <span className="flex items-center justify-center gap-2">
              Sign In
              <ArrowForwardRounded />
            </span>
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;