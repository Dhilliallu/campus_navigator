"use client";

import { Leaf, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-700 rounded-xl">
                <Leaf className="w-5 h-5 text-green-300" />
              </div>
              <span className="font-bold text-xl">{t("appName")}</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-green-200">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li><a href="/detect" className="hover:text-white transition-colors">Disease Detection</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="/chatbot" className="hover:text-white transition-colors">AI Assistant</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-green-200">Supported Crops</h3>
            <ul className="space-y-2 text-sm text-green-300">
              <li>Tomato, Potato, Rice</li>
              <li>Corn, Apple, Grape</li>
              <li>And more coming soon!</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-800 text-center text-sm text-green-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for farmers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
