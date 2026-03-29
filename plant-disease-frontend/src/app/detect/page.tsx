"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScanLine, Loader2 } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import DetectionResultComponent from "@/components/DetectionResult";
import WeatherWidget from "@/components/WeatherWidget";
import { detectDisease } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

interface DetectionData {
  disease_name: string;
  plant: string;
  confidence: number;
  severity: string;
  description: string;
  remedy: string[];
  organic_remedy: string[];
  precautions: string[];
  fertilizer_suggestions: string[];
}

export default function DetectPage() {
  const [result, setResult] = useState<DetectionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setImageUrl] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleImageSelect = async (file: File, preview: string) => {
    setImageUrl(preview);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await detectDisease(file);
      setResult(data);
    } catch {
      setError("Failed to analyze image. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <ScanLine className="w-4 h-4" />
            {t("detect")}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {t("uploadTitle")}
          </h1>
          <p className="text-gray-600">{t("uploadDesc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <ImageUploader onImageSelect={handleImageSelect} />
            </motion.div>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3 py-12 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
                <span className="text-gray-600 font-medium">{t("analyzing")}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <DetectionResultComponent result={result} />
            )}
          </div>

          <div className="space-y-6">
            <WeatherWidget />

            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white"
              >
                <h3 className="font-semibold text-lg mb-2">Save Your Results</h3>
                <p className="text-green-100 text-sm mb-4">
                  Sign in to save scan history, access your dashboard, and get personalized recommendations.
                </p>
                <button
                  onClick={() => setShowAuth(true)}
                  className="w-full py-2.5 bg-white text-green-700 rounded-xl font-medium hover:bg-green-50 transition-colors"
                >
                  {t("login")} / {t("signup")}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
