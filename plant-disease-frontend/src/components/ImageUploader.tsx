"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { t } = useLanguage();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
        onImageSelect(file, url);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            setPreview(imageSrc);
            setShowCamera(false);
            onImageSelect(file, imageSrc);
          });
      }
    }
  }, [onImageSelect]);

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl overflow-hidden border-2 border-green-200 bg-green-50"
          >
            <img
              src={preview}
              alt="Plant leaf preview"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-green-600/90 backdrop-blur text-white rounded-full text-sm flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5" />
              Image ready for analysis
            </div>
          </motion.div>
        ) : showCamera ? (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl overflow-hidden border-2 border-blue-200"
          >
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-64 object-cover"
              videoConstraints={{ facingMode: "environment" }}
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              <button
                onClick={captureImage}
                className="px-6 py-2.5 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Capture
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="px-4 py-2.5 bg-white/80 text-gray-600 rounded-full shadow-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
              }`}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={{ y: isDragActive ? -5 : 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="p-4 bg-green-100 rounded-2xl">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {t("uploadTitle")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{t("uploadDesc")}</p>
                </div>
              </motion.div>
            </div>

            <button
              onClick={() => setShowCamera(true)}
              className="w-full mt-3 py-3 border-2 border-blue-200 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              {t("orCapture")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
