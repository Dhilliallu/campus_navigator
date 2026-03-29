"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  ScanLine,
  Bug,
  TrendingUp,
  Calendar,
  Leaf,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const scanData = [
  { month: "Jan", scans: 45 },
  { month: "Feb", scans: 62 },
  { month: "Mar", scans: 58 },
  { month: "Apr", scans: 89 },
  { month: "May", scans: 120 },
  { month: "Jun", scans: 95 },
];

const diseaseData = [
  { name: "Late Blight", value: 35, color: "#ef4444" },
  { name: "Early Blight", value: 25, color: "#f59e0b" },
  { name: "Leaf Mold", value: 15, color: "#10b981" },
  { name: "Common Rust", value: 12, color: "#3b82f6" },
  { name: "Healthy", value: 13, color: "#22c55e" },
];

const trendData = [
  { week: "W1", healthy: 30, diseased: 15 },
  { week: "W2", healthy: 28, diseased: 22 },
  { week: "W3", healthy: 35, diseased: 18 },
  { week: "W4", healthy: 40, diseased: 12 },
  { week: "W5", healthy: 38, diseased: 14 },
  { week: "W6", healthy: 45, diseased: 8 },
];

const recentScans = [
  { id: 1, plant: "Tomato", disease: "Late Blight", severity: "Severe", date: "2 hours ago", confidence: 94 },
  { id: 2, plant: "Potato", disease: "Early Blight", severity: "Moderate", date: "5 hours ago", confidence: 88 },
  { id: 3, plant: "Rice", disease: "Healthy", severity: "None", date: "1 day ago", confidence: 96 },
  { id: 4, plant: "Corn", disease: "Common Rust", severity: "Moderate", date: "1 day ago", confidence: 87 },
  { id: 5, plant: "Apple", disease: "Apple Scab", severity: "Moderate", date: "2 days ago", confidence: 90 },
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const severityColor: Record<string, string> = {
    Severe: "bg-red-100 text-red-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    None: "bg-green-100 text-green-700",
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="p-4 bg-green-100 rounded-2xl w-fit mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("dashboard")}</h2>
          <p className="text-gray-600 mb-6">Sign in to view your analytics dashboard with scan history and disease trends.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            {t("login")} / {t("signup")}
          </button>
          <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("dashboard")}</h1>
          <p className="text-gray-600">Welcome back, {user.displayName || user.email}!</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t("totalScans"), value: "469", icon: ScanLine, change: "+12%", color: "green" },
            { label: "Diseases Found", value: "127", icon: Bug, change: "-8%", color: "red" },
            { label: "Healthy Plants", value: "342", icon: Leaf, change: "+15%", color: "emerald" },
            { label: "This Month", value: "95", icon: Calendar, change: "+23%", color: "blue" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"} flex items-center gap-0.5`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Monthly Scans</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="scans" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">{t("commonDiseases")}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Health Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="healthy" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="diseased" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">{t("recentActivity")}</h3>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{scan.plant}</p>
                    <p className="text-xs text-gray-500">{scan.disease} - {scan.date}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${severityColor[scan.severity] || "bg-gray-100 text-gray-700"}`}>
                    {scan.severity}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
