"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Thermometer, Droplets, AlertTriangle, MapPin } from "lucide-react";
import { getWeatherPrediction } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  climate_zone: string;
  disease_predictions: { disease: string; risk: string; plants: string[] }[];
  regional_diseases: { disease: string; plants: string[]; prevalence: string }[];
  recommendations: string[];
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState(30);
  const [humidity, setHumidity] = useState(75);
  const { t } = useLanguage();

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const data = await getWeatherPrediction({
        temperature: temp,
        humidity: humidity,
        latitude: 17.3850,
        longitude: 78.4867,
      });
      setWeather(data);
    } catch (err) {
      console.error("Weather prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Cloud className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-semibold text-lg text-gray-800">{t("weatherPrediction")}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Thermometer className="w-4 h-4" /> {t("temperature")} (°C)
          </label>
          <input
            type="range"
            min="5"
            max="45"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <span className="text-sm font-medium text-blue-700">{temp}°C</span>
        </div>
        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Droplets className="w-4 h-4" /> {t("humidity")} (%)
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <span className="text-sm font-medium text-blue-700">{humidity}%</span>
        </div>
      </div>

      <button
        onClick={fetchPrediction}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 mb-4"
      >
        {loading ? "Analyzing..." : "Check Disease Risk"}
      </button>

      {weather && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              Climate Zone: <span className="font-medium capitalize">{weather.climate_zone}</span>
            </span>
          </div>

          {weather.disease_predictions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Disease Risks
              </h4>
              <div className="space-y-2">
                {weather.disease_predictions.map((pred, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                      pred.risk === "High"
                        ? "bg-red-50 border border-red-100"
                        : "bg-yellow-50 border border-yellow-100"
                    }`}
                  >
                    <span className="font-medium">{pred.disease}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        pred.risk === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {pred.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
