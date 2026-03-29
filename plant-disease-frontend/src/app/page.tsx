"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ScanLine,
  Shield,
  Cloud,
  Bot,
  Users,
  BarChart3,
  FileText,
  Globe,
  Bell,
  Camera,
  ArrowRight,
  Leaf,
  Zap,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const features = [
  { icon: ScanLine, title: "AI Disease Detection", desc: "Upload plant leaf images for instant AI-powered disease identification", color: "green" },
  { icon: Shield, title: "Smart Remedies", desc: "Get detailed treatment plans including organic and chemical options", color: "blue" },
  { icon: Cloud, title: "Weather Alerts", desc: "Predict disease risks based on real-time weather conditions", color: "cyan" },
  { icon: Bot, title: "AI Assistant", desc: "Chat with our AI bot for expert plant care guidance", color: "purple" },
  { icon: Users, title: "Community", desc: "Connect with farmers, share solutions and experiences", color: "orange" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track your scans, monitor crop health trends", color: "indigo" },
  { icon: FileText, title: "PDF Reports", desc: "Download detailed disease reports with remedies", color: "red" },
  { icon: Globe, title: "Multi-Language", desc: "Available in English, Telugu, and Hindi", color: "teal" },
  { icon: Bell, title: "Smart Alerts", desc: "Get notified about seasonal disease risks", color: "amber" },
  { icon: Camera, title: "Camera Capture", desc: "Use your device camera for instant scanning", color: "pink" },
];

const colorClasses: Record<string, string> = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  cyan: "bg-cyan-100 text-cyan-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  indigo: "bg-indigo-100 text-indigo-600",
  red: "bg-red-100 text-red-600",
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600",
  pink: "bg-pink-100 text-pink-600",
};

export default function HomePage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                AI-Powered Plant Protection
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {t("heroTitle")}
                <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  PlantGuard AI
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("heroDesc")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/detect"
                  className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium text-lg shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all"
                >
                  <ScanLine className="w-5 h-5" />
                  {t("scanNow")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                {!user && (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="flex items-center gap-2 px-8 py-4 border-2 border-green-200 text-green-700 rounded-2xl font-medium text-lg hover:bg-green-50 transition-all"
                  >
                    {t("getStarted")}
                  </button>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { label: "Diseases Detected", value: "50+" },
                { label: "Crops Supported", value: "15+" },
                { label: "Languages", value: "3" },
                { label: "Accuracy", value: "94%" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-green-700">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("features")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to protect your crops, all in one powerful platform.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses[feature.color]}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Image", desc: "Take a photo of your plant leaf or upload from gallery", icon: Camera, color: "from-green-500 to-emerald-500" },
              { step: "02", title: "AI Analysis", desc: "Our AI analyzes the image and identifies diseases in seconds", icon: Zap, color: "from-blue-500 to-cyan-500" },
              { step: "03", title: "Get Results", desc: "Receive detailed diagnosis, remedies, and care recommendations", icon: Heart, color: "from-purple-500 to-pink-500" },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-5xl font-bold text-gray-100 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">{item.step}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Leaf className="w-12 h-12 text-green-200 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to protect your crops?</h2>
            <p className="text-green-100 text-lg mb-8">Start scanning your plants today and get instant AI-powered disease detection.</p>
            <Link href="/detect" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transition-all">
              <ScanLine className="w-5 h-5" />
              {t("scanNow")}
            </Link>
          </motion.div>
        </div>
      </section>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
