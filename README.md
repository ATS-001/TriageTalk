# 🚨 TriageTalk
### Zero-Friction Emergency AAC Board for Non-Verbal Medical Crises

> **TriageTalk** is a high-impact, lightning-fast web application designed for patients who suddenly find themselves completely unable to speak or move during a medical emergency (e.g., strokes, severe asthma attacks, ICU intubation, or traumatic shock). 

---

## 👥 Created By

* **Aaron Thalakkottor Sooraj**
* **Devika R**

---

## ⚡ The Problem: Critical Time Loss in Healthcare

When a stroke, severe asthma attack, ICU intubation, or traumatic shock strikes, patients frequently become conscious but **completely non-verbal and paralyzed**.

Existing Assistive and Augmentative Communication (AAC) tools fail under emergency pressure because:

* They are overly cluttered with general vocabulary (weather, hobbies, food).
* They require complex navigation, typing, or fine motor coordination.
* They rely on expensive eye-tracking hardware that fails in fast-paced ER environments.

> **Every second of delay during a medical emergency increases trauma risk. TriageTalk eliminates that delay entirely.**

---

## 💡 The Solution: Crisis-Only 4-Quadrant Architecture

TriageTalk strips away 99% of non-essential UI. Built around a **rapid 2-step elimination tree**, it maps entire medical emergencies into **only 4 massive choices at a time**.

Patients can navigate the interface instantly using touchscreens, mouse clicks, or physical keyboard keys (`1`, `2`, `3`, `4`) without needing to look at or type custom words.

```text
                                [ LEVEL 0: MAIN ROOT ]
 ┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
 │ [1] I NEED HELP      │ [2] PAIN / DISCOMFORT│ [3] SENSORY / ENV    │ [4] CRITICAL CRISIS  │
 └──────────┬───────────┴──────────┬───────────┴──────────┬───────────┴──────────┬───────────┘
            │                      │                      │                      │
            ▼                      ▼                      ▼                      ▼
    [ Nurse / Family ]     [ Chest / Head Pain ]  [ Temperature / Noise ] [ Cannot Breathe! ]
```

---

## 🔥 Core Innovations & Technical Stack

| Feature | Technology Used | Impact |
| --- | --- | --- |
| **🌐 Full Multilingual Engine** | Dynamic State Dictionaries (`EN`, `ES`, `HI`, `FR`) | Bridges language barriers between immigrant/tourist patients and medical staff instantly. |
| **🗣️ Human-Like Neural Speech** | `window.speechSynthesis` + Cadence Tuning | Filters for neural voices (`Natural`, `Enhanced`, `Google`) and injects punctuation pauses (`...`) to prevent robotic monotone. |
| **📳 Tactile Haptic Feedback** | Web Vibration API (`navigator.vibrate`) | Delivers distinct physical confirmation pulses and emergency SOS patterns (`[200, 100, 200, 100, 400]`) for tactile feedback. |
| **🔊 Zero-Dependency Chime** | Native Web Audio API (`AudioContext`) | Synthesizes a professional two-tone hospital paging chime instantly with zero external MP3 downloads. |
| **📱 Cross-Device Optimization** | Tailwind CSS Grid + Glassmorphism | Perfectly responsive across mobile phones, bedside medical tablets, and high-contrast ICU desktop monitors. |
| **🕒 Persistent Clinical Clock** | Reactive Locale Timer (`Intl.DateTimeFormat`) | Provides continuous date and time orientation for long-term and disoriented ICU/stroke patients. |
| **🛑 Disability-Grade Emergency Reset** | High-Contrast WCAG AAA Button (`[ESC]`) | Massive touch target with unmistakable emergency crimson styling for tremor and motor-impaired patients. |
| **⌨️ Hands-Free Accessibility** | Keyboard Listeners (`1`-`4`, Numpad, Esc) | Built for low-vision and low-mobility users with first-interaction autoplay bypass. |

---

## 🛠️ Quick Start Guide

Because TriageTalk is engineered as a zero-dependency, lightweight single-file prototype, setting it up takes seconds:

1. **Clone or Download the repository:**
```bash
git clone https://github.com/your-username/triagetalk.git
```

2. **Launch the application:**
- Double-click `public/triagetalk.html` or open it directly in any modern web browser (Chrome, Edge, Safari, Firefox).
- Or run the full Angular 21 progressive app with `npm run start` and visit `http://localhost:3000`.

3. **Test the Emergency Flow:**
* Press `4` then `1` on your keyboard (or tap Quadrant 4 ➔ Quadrant 1).
* Experience the hospital chime, haptic vibration pulse, human-like voice broadcast, persistent orientation clock, and full-screen visual triage alert!

---

## 🏆 Why TriageTalk Wins

1. **Extreme Focus:** Solves one specific, life-or-death problem with absolute perfection instead of trying to be a generic app.
2. **Zero-Hardware Dependency:** Runs instantly on any smartphone, tablet, or laptop already present in a hospital room.
3. **Radical Empathy & Inclusion:** Combines multilingual support, haptics, and neural text-to-speech to ensure accessibility for every type of physical and linguistic barrier.
