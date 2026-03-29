"use client";

import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </AuthProvider>
    </LanguageProvider>
  );
}
