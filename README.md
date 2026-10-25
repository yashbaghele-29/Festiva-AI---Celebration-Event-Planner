Festiva AI — Celebration & Event Planner
An intelligent, full-stack Generative AI application designed to architect flawless celebrations, craft minute-by-minute run-of-shows, calculate detailed budgets, design custom menus & cocktails, and resolve live planning emergencies in minutes.
🌟 Overview
Festiva AI combines modern celebration design with Google's Gemini 3.8 Flash model to provide end-to-end event planning intelligence. Whether organizing an intimate milestone birthday, an enchanted botanical wedding, or a 200-guest corporate tech launch gala, Festiva synthesizes complete operational and aesthetic blueprints in seconds.
Additionally, Festiva features a dedicated Event Crisis Doctor, built specifically to handle last-minute disasters (vendor delays, severe weather, guest overflows, equipment blowouts) with immediate 5-minute tactical action steps, 15-minute strategic recovery pivots, and guest-facing scripts.
✨ Key Features
1. 📋 Master Celebration Blueprint Studio
Event Customization: Select celebration type (Milestone Birthday, Wedding & Reception, Corporate Gala, Anniversary, Cocktail Soirée, Dinner Party, Baby Shower, Festival).
Interactive Controls:
Headcount slider (10 to 500+ guests).
Planned budget with multi-currency selector ($, €, £, ₹, A$, C$).
Venue setting selector (Rooftop, Botanical Garden, Industrial Loft, Ballroom, Beachside, Historic Estate).
Atmosphere keywords & interactive vibe tags (Golden Hour Glamour, Velvet Amber, Tuscan Rustic, Cyber-Luxe, etc.).
Special dietary accommodations and must-have constraints.
Instant Fast-Start Presets: Pre-configured templates with high-resolution celebration imagery.
2. 🚨 Crisis Doctor (Real-Time Problem Solver)
Triage Priority Levels: Instant assessment (CRITICAL, HIGH, MODERATE).
5-Minute Immediate Action Checklist: Clear, numbered steps to stabilize the event immediately without public commotion.
15–30 Minute Strategic Recovery Plan: Practical pivots to re-sequence schedules and activate backups.
Guest-Facing Cover Script: Word-for-word talking points to reassure guests so they perceive changes as exclusive enhancements.
Vendor Negotiation & Pro Tips: Rapid replacement scripts and coordinator secrets.
3. 🎨 Color Harmony & Sensory Directives
Palette Swatches: 5-color aesthetic palette with 1-click HEX clipboard copy.
Dress Code Directives: Specific guest attire styling guidelines for photo cohesion.
Musical Arc & Soundscape: Planned acoustic and DJ genres from welcome cocktails to late-night revelry.
Lighting Design: Ambiance directives (2700K warm incandescent, pinspots, candle arrays).
4. ⏱️ Run of Show (Minute-by-Minute Schedule)
Interactive timeline cards with timestamps.
Vendor coordination labels and insider pro-tips.
Interactive checkboxes to mark milestones as completed.
1-click "Copy Schedule" button for team distribution.
5. 💰 Dynamic Budget Allocator & Cost Simulator
Itemized department breakdown:
Catering & Bar (30–35%)
Venue & Facilities (25–30%)
Decor, Floral & Ambiance (15%)
Entertainment & AV (10–12%)
Photo & Video Storytelling (8%)
Contingency Fund (5%)
Interactive Budget Slider: Dynamically scale budgets from 50% to 200% to simulate lean vs. luxury scenarios in real time.
Cost-Saving Strategies: Expert hacks to cut costs without compromising guest experience.
6. 🍸 Bespoke Catering, Cocktail & Dietary Suite
Custom Signature Cocktail: Full recipe, measurements, garnish, and non-alcoholic mocktail alternative.
Passed Cocktail Hour Drinks: Welcome drinks and aperitifs.
3-Course Dinner Menu: Appetizers, main entrées (including vegan/vegetarian), and desserts.
Late-Night Energy Bites: Midnight sliders, street-food cones, or dessert tables.
7. ✉️ Luxury Digital & Print Invitation Suite
Realistic invitation card preview with decorative foil styling.
Toggle between Formal & Classic vs. Playful & Casual-Chic wording.
Custom RSVP deadline calculation advice.
1-click clipboard copy.
8. ✅ Phased Countdown Checklist
Action items split into milestones:
8–12 Weeks Prior
4 Weeks Prior
1 Week Prior
Day of Celebration
Checkbox tracking with interactive progress percentage bar.
9. 🖼️ Visual Inspiration Library & Saved Events
Gallery of celebration themes with photography.
Filter by category: Birthday, Wedding, Corporate, Anniversary, Party, Dinner.
Personal blueprint library stored in browser localStorage.
Print-friendly PDF export (window.print) with print stylesheets.
🛠️ Technology Stack
Layer	Technology
Frontend Framework	React 19 (TypeScript)
Styling & Design	Tailwind CSS v4, Lucide Icons, Google Fonts (Plus Jakarta Sans, Cormorant Garamond)
Backend Server	Node.js / Express with Vite middleware integration
Generative AI SDK	@google/genai (Model: gemini-3.8-flash)
Build & Tooling	Vite 8, tsx, TypeScript
📂 Project Structure
code
Text
├── index.html                   # HTML entry point with metadata & Google Fonts
├── metadata.json                # AI Studio capabilities & permissions configuration
├── package.json                 # Project dependencies & npm scripts
├── server.ts                    # Full-stack Express server with Gemini API routes
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler & Tailwind configuration
│
└── src/
    ├── main.tsx                 # React application mounting point
    ├── App.tsx                  # Primary layout, state management & tab navigation
    ├── index.css                # Global styles, font definitions & print media rules
    ├── types.ts                 # TypeScript interfaces for blueprints, crises, and forms
    │
    ├── components/
    │   ├── Header.tsx           # Responsive header with mobile drawer & quick actions
    │   ├── EventForm.tsx        # Event inputs, presets carousel & AI trigger button
    │   ├── BlueprintView.tsx    # Multi-tab celebration output viewer & simulators
    │   ├── CrisisDoctorView.tsx # Real-time emergency problem resolution center
    │   ├── InspirationGallery.tsx # Visual gallery with celebration themes & photos
    │   └── SavedEventsView.tsx  # Saved blueprints library with deletion & restore
    │
    └── data/
        └── eventThemes.ts       # Curated event presets and common crisis scenarios
📡 API Endpoints
1. POST /api/plan-event
Generates a comprehensive event blueprint based on user specifications.
Request Body:
code
JSON
{
  "eventType": "Milestone Birthday",
  "theme": "Gilded 30th Glow",
  "guestCount": 65,
  "budget": 7500,
  "currency": "$",
  "setting": "Rooftop Terrace",
  "vibe": "Velvet & Gold, House & Nu-Disco",
  "notes": "Include mezcal cocktails and saxophone player."
}
Response: Full structured JSON conforming to the EventPlan schema (theme, timeline, budget, catering, decor, checklists, invitation wording, crisis playbook).
2. POST /api/solve-crisis
Deploys real-time incident resolution for event planning emergencies.
Request Body:
code
JSON
{
  "crisisDescription": "Caterer van broke down 1 hour before 120 guests arrive.",
  "eventType": "Wedding",
  "guestCount": 120,
  "currentPhase": "HAPPENING RIGHT NOW"
}
Response: Structured CrisisSolution containing triage level, calming assurance, 5-minute action steps, 15-minute mitigation strategy, guest cover script, and vendor backup plan.
3. GET /api/health
Checks server status, timestamp, and verification of the Gemini API configuration.
🚀 Getting Started
1. Prerequisites
Node.js v20+
NPM or Bun
2. Setup Environment
Ensure your .env contains your Gemini API key:
code
Env
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
3. Install Dependencies
code
Bash
npm install
4. Run Development Server
code
Bash
npm run dev
Open http://localhost:3000 in your browser.
5. Production Build
code
Bash
npm run build
npm start
📱 Mobile Responsiveness & Print Export
Mobile First: Built with responsive containers, accessible touch targets (
), and a sliding mobile drawer menu.
Print / PDF: Click "Print PDF" or "Export PDF" to trigger formatted document output with unnecessary UI controls automatically suppressed via @media print.
📄 License
Apache-2.0
