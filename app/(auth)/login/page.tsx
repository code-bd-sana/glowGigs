"use client";
import { useLoginMutation } from "@/features/AuthApi";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [login, {isLoading, error}]  = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    // Console e email and password show korbe
    console.log("Login Form Data:", {
      email: formData.email,
      password: formData.password
    });

    try {


    const resp = await login(formData).unwrap();
const loginData = resp?.data;

toast.success("Login Success")

const res:any = await signIn("credentials", {
  redirect: false,
  email: loginData.email,
  role: loginData.role,
  _id: loginData._id,
});

console.log(res, "this is res")

        if (res.status === 200) {
           window.location.href = "/dashboard";
      }
      
    } catch (error:any) {
      toast.error(error?.data?.message || "Something went wrong!")
    }

    

    // Ekhane porer step hisebe API call korte parben
    // Example: 
    // loginUser(formData);
  };

  return (
    <section className="bg-white py-24">
      <ToastContainer/>
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-lg">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="text-left">
            <label
              htmlFor="email"
              className="block font-medium text-gray-900 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label
              htmlFor="password"
              className="block font-medium text-gray-900 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white font-medium text-lg px-12 py-4 rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
   {isLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-black font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>

    
      </div>
    </section>
  );
};

export default LoginForm;