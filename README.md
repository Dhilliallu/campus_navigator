# PlantGuard AI - Plant Disease Detection

AI-Powered Plant Disease Detection web application designed for farmers. Upload plant leaf images to get instant disease identification, treatment recommendations, and expert care guidance.

## Features

- **AI Disease Detection** - Upload plant leaf images for instant disease identification
- **Smart Remedies** - Detailed treatment plans including organic and chemical options
- **Weather-Based Disease Prediction** - Predict disease risks based on weather conditions
- **AI Chatbot Assistant** - Get expert plant care guidance via chat
- **Community Section** - Connect with farmers, share solutions
- **Analytics Dashboard** - Track scans, monitor crop health trends
- **PDF Reports** - Download detailed disease reports
- **Multi-Language Support** - English, Telugu, Hindi
- **Camera Capture** - Use device camera for instant scanning
- **Firebase Auth** - User authentication with login/signup

## Tech Stack

### Frontend
- **Next.js** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for analytics charts
- **Firebase** for authentication
- **jsPDF** for PDF report generation

### Backend
- **FastAPI** (Python)
- **Pillow** for image processing
- **Disease database** with 8+ diseases across 6 crop types

## Supported Crops & Diseases

| Crop | Diseases |
|------|----------|
| Tomato | Late Blight, Early Blight, Leaf Mold |
| Potato | Late Blight |
| Rice | Rice Blast |
| Corn | Common Rust |
| Apple | Apple Scab |
| Grape | Black Rot |

## Getting Started

### Backend Setup

```bash
cd plant-disease-api
pip install poetry
poetry install
poetry run fastapi dev app/main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd plant-disease-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **Note:** The app works in demo mode without Firebase configuration.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/detect` | Upload image for disease detection |
| POST | `/api/weather-prediction` | Get weather-based disease predictions |
| POST | `/api/chat` | Chat with AI assistant |
| GET | `/api/diseases` | List all known diseases |
| GET | `/api/crop-care/{crop}` | Get crop care information |
| GET | `/healthz` | Health check |

## Deployment

- **Backend**: Deployed on Fly.io
- **Frontend**: Static export deployed via Devin Apps

## License

MIT
