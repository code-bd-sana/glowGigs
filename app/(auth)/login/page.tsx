"use client";
import { useChangePasswordWithOtpMutation, useLoginMutation, useSendOtpMutation } from "@/features/AuthApi";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Email from "next-auth/providers/email";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(0);
  
  // Fix: Make sure useSendOtpMutation is properly defined in your AuthApi
  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
  const [login, { isLoading, error }] = useLoginMutation();
  const [changePasswordWithOtp, {isLoading:forgetPasswordLoadng, error:forgotPasswordError}] = useChangePasswordWithOtpMutation()

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Login Form Data:", {
      email: formData.email,
      password: formData.password
    });

    try {
      const resp = await login(formData).unwrap();
      const loginData = resp?.data;
      console.log(loginData, "This is login data")

      toast.success("Login Success")

      const res = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        role: loginData.role,
        _id: loginData._id,
      });

      console.log(res, "this is res")

     
        window.location.href = "/dashboard";
      
      
    } catch (error) {

  const err = error as FetchBaseQueryError | SerializedError;

  // RTK query error হলে
  if ("data" in err && err.data && typeof err.data === "object") {
    const apiError = err.data as { message?: string };
    toast.error(apiError.message ?? "Something went wrong!");
    return;
  }



}
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setForgotPasswordEmail(formData.email);
    setOtpSent(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setTimer(0);
  };

  // FIXED: Removed duplicate function definition
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending OTP to:", forgotPasswordEmail);
    
    try {
      // Fix: Pass the email as an object, not as string directly
      await sendOtp( forgotPasswordEmail).unwrap();
      
      toast.success(`OTP sent to: ${forgotPasswordEmail}`);
      setOtpSent(true);
      setTimer(120); // 2 minutes timer
      
    } catch (error) {
  const err = error as FetchBaseQueryError | SerializedError;

  // RTK query error হলে
  if ("data" in err && err.data && typeof err.data === "object") {
    const apiError = err.data as { message?: string };
    toast.error(apiError.message ?? "Something went wrong!");
    return;
  }



}
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to:", forgotPasswordEmail);
    
    try {
      await sendOtp(forgotPasswordEmail ).unwrap();
      toast.success(`OTP resent to: ${forgotPasswordEmail}`);
      setTimer(120);
      setOtp("");
    } catch (error) {
  const err = error as FetchBaseQueryError | SerializedError;

  // RTK query error হলে
  if ("data" in err && err.data && typeof err.data === "object") {
    const apiError = err.data as { message?: string };
    toast.error(apiError.message ?? "Something went wrong!");
    return;
  }



}
  };

  const handleResetPassword = async(e: React.FormEvent) => {
    e.preventDefault();


    try {




       // Validate passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }


    
    const initialData = {
      email:forgotPasswordEmail,
      otp,
      newPassword,
      

    }
  

    const response = await changePasswordWithOtp(initialData).unwrap();
        toast.success("Password reset successfully!");
    
    // Close modal and reset states
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail("");
    setOtpSent(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setTimer(0);
    console.log(response)
    
      
    } catch (error) {
  const err = error as FetchBaseQueryError | SerializedError;

  // RTK query error হলে
  if ("data" in err && err.data && typeof err.data === "object") {
    const apiError = err.data as { message?: string };
    toast.error(apiError.message ?? "Something went wrong!");
    return;
  }



}
    
  

   

    // Here you would typically verify OTP and reset password via API

  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordEmail("");
    setOtpSent(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="bg-white py-24 relative">
      <ToastContainer />
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
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="block font-medium text-gray-900"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-sm text-gray-600 hover:text-black hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
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
            {`Don't have an account?`}{" "}
            <Link href="/register" className="text-black font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Your Password
              </h3>
              <p className="text-gray-600">
                {!otpSent 
                  ? "Enter your email address and we'll send you an OTP to reset your password."
                  : "Enter the OTP and your new password."
                }
              </p>
            </div>

            <form onSubmit={!otpSent ? handleSendOtp : handleResetPassword}>
              {/* Email Field (only show when OTP not sent) */}
              {!otpSent && (
                <div className="mb-6">
                  <label
                    htmlFor="forgotPasswordEmail"
                    className="block font-medium text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgotPasswordEmail"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    required
                  />
                </div>
              )}

              {/* OTP Field (only show when OTP sent) */}
              {otpSent && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="otp"
                      className="block font-medium text-gray-900"
                    >
                      OTP Code
                    </label>
                    <div className="flex items-center gap-2">
                      {timer > 0 ? (
                        <span className="text-sm text-red-600">
                          {formatTime(timer)}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    required
                    maxLength={6}
                  />
                </div>
              )}

              {/* New Password Field (only show when OTP sent) */}
              {otpSent && (
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block font-medium text-gray-900 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    required
                    minLength={6}
                  />
                </div>
              )}

              {/* Confirm Password Field (only show when OTP sent) */}
              {otpSent && (
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium text-gray-900 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    required
                    minLength={6}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={otpLoading}
                  className="flex-1 bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {otpLoading ? "Sending..." : !otpSent ? "Send OTP" : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginForm;