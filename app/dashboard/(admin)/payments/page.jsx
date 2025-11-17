"use client";
import { useAllPaymentQuery } from "@/features/OverViewApi";
import React from "react";
import { FiTrendingUp, FiDollarSign, FiUsers, FiCheckCircle, FiEye, FiDownload } from "react-icons/fi";

export default function PaymentsPage() {
  const { data, isLoading, error } = useAllPaymentQuery();

  console.log(data?.data, "All payment");

  // Calculate summary statistics from actual data
  const calculateSummary = () => {
    if (!data?.data) return null;

    const payments = data.data;
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const successfulPayments = payments.filter(p => p.status === 'success').length;
    const successRate = payments.length > 0 ? (successfulPayments / payments.length) * 100 : 0;
    
    // This month's revenue (you might want to filter by current month)
    const thisMonthsRevenue = payments.reduce((sum, payment) => {
      const paymentDate = new Date(payment.createdAt);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      if (paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear) {
        return sum + payment.amount;
      }
      return sum;
    }, 0);

    return {
      totalRevenue,
      thisMonthsRevenue,
      activeSubscriptions: payments.length,
      successRate
    };
  };

  const summary = calculateSummary();
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return { bg: 'bg-green-100', text: 'text-green-700', display: 'Successful' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', display: 'Pending' };
      case 'failed':
        return { bg: 'bg-red-100', text: 'text-red-700', display: 'Failed' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', display: status };
    }
  };

  // Get plan color
  const getPlanColor = (plan) => {
    switch (plan) {
      case 'pro':
        return { bg: 'bg-purple-100', text: 'text-purple-700' };
      case 'premium':
        return { bg: 'bg-purple-100', text: 'text-purple-700' };
      case 'basic':
        return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'bronze':
        return { bg: 'bg-orange-100', text: 'text-orange-700' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading payments: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payments & Revenue</h1>
      <p className="text-sm text-gray-500 mb-6">Track subscription revenue, manage transactions, and monitor payment analytics.</p>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h2 className="text-xl font-semibold">${summary?.totalRevenue?.toLocaleString() || '0'}</h2>
              <p className="text-xs text-green-600 mt-1">All time revenue</p>
            </div>
            <div className="p-3 bg-rose-100 rounded-lg text-rose-600">
              <FiTrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">This Month's Revenue</p>
              <h2 className="text-xl font-semibold">${summary?.thisMonthsRevenue?.toLocaleString() || '0'}</h2>
              <p className="text-xs text-green-600 mt-1">Current month total</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <FiDollarSign size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Subscriptions</p>
              <h2 className="text-xl font-semibold">{summary?.activeSubscriptions || '0'}</h2>
              <p className="text-xs text-green-600 mt-1">All subscriptions</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <FiUsers size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Success Rate</p>
              <h2 className="text-xl font-semibold">{summary?.successRate?.toFixed(1) || '0'}%</h2>
              <p className="text-xs text-green-600 mt-1">Payment success rate</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <FiCheckCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-1.5 text-sm text-gray-600">
              <option>All Status</option>
              <option>Successful</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            <select className="border rounded-lg px-3 py-1.5 text-sm text-gray-600">
              <option>All Plans</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Pro</option>
              <option>Bronze</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full border rounded-lg px-4 py-2 text-sm text-gray-600 mb-4"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Plan Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((payment) => {
                const statusInfo = getStatusColor(payment.status);
                const planInfo = getPlanColor(payment.plan);
                
                return (
                  <tr key={payment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {payment.stripeInvoiceId || payment._id}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">
                        {payment.userId?.fullName || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.email}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${planInfo.bg} ${planInfo.text}`}
                      >
                        {payment.plan?.charAt(0).toUpperCase() + payment.plan?.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500">Subscription</p>
                    </td>
                    <td className="py-3 px-4">
                      ${payment.amount}
                    </td>
                    <td className="py-3 px-4">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}
                      >
                        {statusInfo.display}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2 text-gray-500">
                      <FiEye className="cursor-pointer hover:text-gray-700" />
                      <FiDownload className="cursor-pointer hover:text-gray-700" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {(!data?.data || data.data.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            No payment records found
          </div>
        )}
      </div>
    </div>
  );
}