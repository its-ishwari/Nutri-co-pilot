# 🥗 NutriCoPilot – AI Food Label Reasoning Engine

NutriCoPilot is an AI-native web application that transforms complex food ingredient labels into meaningful health insights.  
Unlike traditional OCR tools, NutriCoPilot acts as a **decision-support system**, analyzing ingredient synergy, inferring user intent, and highlighting real health trade-offs in real time.

---

## 🚀 Features

- 📸 **Multimodal Analysis** – Accepts both food label images and raw ingredient text.
- 🧠 **Reasoning Engine** – Goes beyond extraction to explain *why* ingredients matter together.
- 🎯 **Intent Detection** – Infers whether the user is a weight-loss seeker, parent, fitness enthusiast, etc.
- 📊 **Health Score Dashboard** – Visual radial gauge with verdicts like *Excellent*, *Good*, or *Avoid*.
- 🪟 **AI-Native UI** – Glassmorphism, bento-grid layouts, and psychologically optimized loading states.
- 🧩 **Schema-Enforced AI Output** – Predictable JSON responses with zero frontend breakage.

---

## 🏗️ Tech Stack

### Frontend
- React 19 (ES Modules)
- TypeScript (Strict typing)
- Tailwind CSS
- Recharts
- No-bundler setup using `esm.sh`

### AI Engine
- Google Gemini API – `gemini-flash-latest`
- Multimodal reasoning (Image + Text)
- Controlled JSON generation with schema validation

---

## 🧠 Architecture Overview

