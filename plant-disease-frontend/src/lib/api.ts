const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function detectDisease(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/api/detect`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Detection failed");
  return res.json();
}

export async function getWeatherPrediction(data: {
  temperature: number;
  humidity: number;
  rainfall?: number;
  latitude?: number;
  longitude?: number;
}) {
  const res = await fetch(`${API_URL}/api/weather-prediction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Weather prediction failed");
  return res.json();
}

export async function chatWithBot(message: string, language: string = "en") {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language }),
  });
  if (!res.ok) throw new Error("Chat failed");
  return res.json();
}

export async function getDiseases() {
  const res = await fetch(`${API_URL}/api/diseases`);
  if (!res.ok) throw new Error("Failed to fetch diseases");
  return res.json();
}

export async function getCropCare(crop: string) {
  const res = await fetch(`${API_URL}/api/crop-care/${crop}`);
  if (!res.ok) throw new Error("Failed to fetch crop care");
  return res.json();
}
