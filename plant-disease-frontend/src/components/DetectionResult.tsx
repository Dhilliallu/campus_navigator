"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Pill,
  Leaf,
  FileWarning,
  Beaker,
  Download,
  ImageOff,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import jsPDF from "jspdf";

interface PredictionEntry {
  disease_name: string;
  plant: string;
  confidence: number;
  severity: string;
}

interface DetectionResultData {
  disease_name: string;
  plant: string;
  confidence: number;
  severity: string;
  description: string;
  remedy: string[];
  organic_remedy: string[];
  precautions: string[];
  fertilizer_suggestions: string[];
  confidence_level: string;
  warning?: string;
  is_valid_leaf: boolean;
  top_predictions: PredictionEntry[];
}

interface DetectionResultProps {
  result: DetectionResultData;
}

export default function DetectionResult({ result }: DetectionResultProps) {
  const { t } = useLanguage();

  const severityColor = {
    Severe: "bg-red-100 text-red-700 border-red-200",
    Moderate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    None: "bg-green-100 text-green-700 border-green-200",
    Unknown: "bg-gray-100 text-gray-700 border-gray-200",
  }[result.severity] || "bg-gray-100 text-gray-700 border-gray-200";

  const confidencePercent = Math.round(result.confidence * 100);

  const confidenceLevelColor = {
    high: "text-green-600",
    low: "text-yellow-600",
    uncertain: "text-red-600",
  }[result.confidence_level] || "text-gray-600";

  const confidenceBarColor = {
    high: "bg-green-500",
    low: "bg-yellow-500",
    uncertain: "bg-red-500",
  }[result.confidence_level] || "bg-gray-500";

  // Handle invalid image case
  if (!result.is_valid_leaf) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-3">
              <ImageOff className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Invalid Image</h2>
                <p className="text-red-100 text-sm">Not a plant leaf image</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Invalid Image - Please upload a plant leaf image</p>
                <p className="text-red-600 text-sm mt-1">{result.description}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-700 mb-2">Tips for better results:</h4>
              <ul className="space-y-1.5">
                {result.remedy.map((tip, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    doc.setFontSize(22);
    doc.setTextColor(34, 139, 34);
    doc.text("PlantGuard AI - Disease Report", margin, y);
    y += 15;

    doc.setDrawColor(34, 139, 34);
    doc.line(margin, y, 190, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Plant: ${result.plant}`, margin, y);
    y += 8;
    doc.text(`Disease: ${result.disease_name}`, margin, y);
    y += 8;
    doc.text(`Confidence: ${confidencePercent}%`, margin, y);
    y += 8;
    doc.text(`Confidence Level: ${result.confidence_level.toUpperCase()}`, margin, y);
    y += 8;
    doc.text(`Severity: ${result.severity}`, margin, y);
    y += 12;

    if (result.warning) {
      doc.setTextColor(200, 100, 0);
      const warnLines = doc.splitTextToSize(`Warning: ${result.warning}`, 170);
      doc.text(warnLines, margin, y);
      y += warnLines.length * 6 + 4;
    }

    if (result.top_predictions.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(34, 139, 34);
      doc.text("Top Predictions:", margin, y);
      y += 7;
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      result.top_predictions.forEach((pred, i) => {
        doc.text(`${i + 1}. ${pred.disease_name} (${pred.plant}) - ${Math.round(pred.confidence * 100)}%`, margin + 5, y);
        y += 6;
      });
      y += 5;
    }

    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(result.description, 170);
    doc.text(descLines, margin, y);
    y += descLines.length * 6 + 8;

    const addSection = (title: string, items: string[]) => {
      if (items.length === 0) return;
      if (y > 260) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(13);
      doc.setTextColor(34, 139, 34);
      doc.text(title, margin, y);
      y += 7;
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      items.forEach((item) => {
        if (y > 275) {
          doc.addPage();
          y = margin;
        }
        const lines = doc.splitTextToSize(`• ${item}`, 165);
        doc.text(lines, margin + 5, y);
        y += lines.length * 5 + 2;
      });
      y += 5;
    };

    addSection("Remedies", result.remedy);
    addSection("Organic Remedies", result.organic_remedy);
    addSection("Precautions", result.precautions);
    addSection("Fertilizer Suggestions", result.fertilizer_suggestions);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated by PlantGuard AI on ${new Date().toLocaleDateString()}`,
      margin,
      285
    );

    doc.save(`PlantGuard_Report_${result.disease_name.replace(/\s+/g, "_")}.pdf`);
  };

  const sections = [
    { title: t("remedies"), items: result.remedy, icon: Pill, color: "blue" },
    { title: t("organicRemedies"), items: result.organic_remedy, icon: Leaf, color: "green" },
    { title: t("precautions"), items: result.precautions, icon: FileWarning, color: "amber" },
    { title: t("fertilizer"), items: result.fertilizer_suggestions, icon: Beaker, color: "purple" },
  ].filter((s) => s.items.length > 0);

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
    amber: "bg-amber-50 border-amber-100 text-amber-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };

  const iconColorMap: Record<string, string> = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    amber: "text-amber-600 bg-amber-100",
    purple: "text-purple-600 bg-purple-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Warning Banner */}
      {result.warning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-start gap-3 p-4 rounded-2xl border ${
            result.confidence_level === "uncertain"
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
            result.confidence_level === "uncertain" ? "text-red-600" : "text-yellow-600"
          }`} />
          <div>
            <p className={`font-medium ${
              result.confidence_level === "uncertain" ? "text-red-800" : "text-yellow-800"
            }`}>
              {result.confidence_level === "uncertain" ? "Uncertain Prediction" : "Low Confidence Warning"}
            </p>
            <p className={`text-sm mt-0.5 ${
              result.confidence_level === "uncertain" ? "text-red-600" : "text-yellow-600"
            }`}>
              {result.warning}
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Result Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">{t("results")}</h2>
                <p className="text-green-100 text-sm">{result.plant}</p>
              </div>
            </div>
            {result.confidence_level !== "uncertain" && (
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                {t("downloadPDF")}
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">{t("diseaseName")}</p>
              <p className="text-xl font-bold text-gray-800">{result.disease_name}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">{t("confidence")}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidencePercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full ${confidenceBarColor} rounded-full`}
                  />
                </div>
                <span className={`text-xl font-bold ${confidenceLevelColor}`}>{confidencePercent}%</span>
              </div>
              <p className={`text-xs mt-1 font-medium ${confidenceLevelColor}`}>
                {result.confidence_level === "high" && "High Confidence"}
                {result.confidence_level === "low" && "Low Confidence"}
                {result.confidence_level === "uncertain" && "Uncertain"}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">{t("severity")}</p>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${severityColor}`}>
                <AlertTriangle className="w-3.5 h-3.5" />
                {result.severity}
              </span>
            </div>
          </div>

          {/* Top 3 Predictions */}
          {result.top_predictions.length > 0 && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <h3 className="font-medium text-indigo-800 text-sm">Top 3 Predictions</h3>
              </div>
              <div className="space-y-2">
                {result.top_predictions.map((pred, i) => {
                  const predPercent = Math.round(pred.confidence * 100);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-indigo-400 w-4">#{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {pred.disease_name} <span className="text-gray-400">({pred.plant})</span>
                          </span>
                          <span className="text-sm font-bold text-indigo-700">{predPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${predPercent}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                            className={`h-full rounded-full ${i === 0 ? "bg-indigo-500" : i === 1 ? "bg-indigo-400" : "bg-indigo-300"}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-gray-700 mb-2">{t("description")}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{result.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className={`p-4 rounded-xl border ${colorMap[section.color]}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1.5 rounded-lg ${iconColorMap[section.color]}`}>
                    <section.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-medium text-sm">{section.title}</h4>
                </div>
                <ul className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-xs flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
