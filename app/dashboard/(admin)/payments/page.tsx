"use client";
import React from "react";
import { FiTrendingUp, FiDollarSign, FiUsers, FiCheckCircle, FiEye, FiDownload } from "react-icons/fi";

export default function PaymentsPage() {
  const transactions = [
    { id: "TXN-2024-001", user: "John Smith", company: "TechCorp Inc.", plan: "Premium", type: "Monthly", amount: "$99.00", date: "1/15/2024", status: "Successful" },
    { id: "TXN-2024-002", user: "Sarah Johnson", company: "StartupXYZ", plan: "Basic", type: "Monthly", amount: "$49.00", date: "1/14/2024", status: "Successful" },
    { id: "TXN-2024-003", user: "Mike Chen", company: "DesignStudio", plan: "Premium", type: "Monthly", amount: "$99.00", date: "1/13/2024", status: "Pending" },
    { id: "TXN-2024-004", user: "Emily Davis", company: "Enterprise Solutions", plan: "Premium", type: "Annual", amount: "$990.00", date: "1/12/2024", status: "Successful" },
    { id: "TXN-2024-005", user: "David Wilson", company: "CloudTech", plan: "Basic", type: "Monthly", amount: "$49.00", date: "1/11/2024", status: "Failed" },
    { id: "TXN-2024-006", user: "Lisa Anderson", company: "AppStudio", plan: "Premium", type: "Monthly", amount: "$99.00", date: "1/10/2024", status: "Successful" },
    { id: "TXN-2024-007", user: "John Smith", company: "TechCorp Inc.", plan: "Premium", type: "Monthly", amount: "$99.00", date: "1/9/2024", status: "Successful" },
    { id: "TXN-2024-008", user: "Sarah Johnson", company: "StartupXYZ", plan: "Basic", type: "Annual", amount: "$490.00", date: "1/8/2024", status: "Successful" },
  ];

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
              <h2 className="text-xl font-semibold">$45,750</h2>
              <p className="text-xs text-green-600 mt-1">+12.5% vs last month</p>
            </div>
            <div className="p-3 bg-rose-100 rounded-lg text-rose-600">
              <FiTrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">This Month’s Revenue</p>
              <h2 className="text-xl font-semibold">$8,950</h2>
              <p className="text-xs text-green-600 mt-1">+8.2% vs last month</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <FiDollarSign size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Subscriptions</p>
              <h2 className="text-xl font-semibold">127</h2>
              <p className="text-xs text-green-600 mt-1">+15.3% vs last month</p>
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
              <h2 className="text-xl font-semibold">93.0%</h2>
              <p className="text-xs text-green-600 mt-1">+2.1% vs last month</p>
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
              {transactions.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{t.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-800">{t.user}</p>
                    <p className="text-xs text-gray-500">{t.company}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.plan === "Premium"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.plan}
                    </span>
                    <p className="text-xs text-gray-500">{t.type}</p>
                  </td>
                  <td className="py-3 px-4">{t.amount}</td>
                  <td className="py-3 px-4">{t.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.status === "Successful"
                          ? "bg-green-100 text-green-700"
                          : t.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2 text-gray-500">
                    <FiEye className="cursor-pointer hover:text-gray-700" />
                    <FiDownload className="cursor-pointer hover:text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
