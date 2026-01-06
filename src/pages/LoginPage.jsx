import { useState } from "react";
import Logo from "../components/Logo";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdPersonOutline, MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    console.log('login submit');
    e.preventDefault();
    
    try {
      const postData = {
        email: email,
        password: password
      };  
      const response = await axios.post('http://localhost:8080/auth/login', postData)
        
      // localStorage.setItem('megha','megha');
      localStorage.setItem('token', response.data); //this is okay for temporary basis
      console.log('Login successful:', response.data);
      toast.success("Login successful!");
      navigate('/discover');
    } catch (err) {
      setError(err.message);
      toast.error("Login failed. Please check your credentials.");
      console.error("Error making POST request:", err);
    }
  }

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SideBar />

      {/* Right content */}
      <div className="pl-70 flex-1 px-16 py-10 flex flex-col justify-center bg-orange-50/30">

        {/* Back */}
        <div
          className="flex items-center gap-2 text-gray-600 cursor-pointer w-fit mb-8 hover:text-orange-500"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          <span>Back to home</span>
        </div>

        {/* Logo */}
        <Logo />

        {/* Headings */}
        <h1 className="mt-10 text-4xl font-serif font-bold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 text-gray-500">
          Sign in to continue your adventures
        </p>

        {/* Form */}
        <form className="mt-10 max-w-md space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <MdOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-orange-400 to-blue-600 hover:opacity-90 transition"
          >
            Sign in
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 cursor-pointer font-medium hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
