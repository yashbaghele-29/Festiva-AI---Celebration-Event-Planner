import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client setup as required by skill guidelines
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Event plan generator fallback presets if offline or API key pending
const generateFallbackPlan = (params: {
  eventType: string;
  theme: string;
  guestCount: number;
  budget: number;
  currency: string;
  setting: string;
  vibe: string;
  notes: string;
}) => {
  const { eventType, theme, guestCount, budget, currency, setting, vibe, notes } = params;
  const curr = currency || '$';

  const venueCut = Math.round(budget * 0.28);
  const cateringCut = Math.round(budget * 0.32);
  const decorCut = Math.round(budget * 0.15);
  const entCut = Math.round(budget * 0.12);
  const photoCut = Math.round(budget * 0.08);
  const contingencyCut = Math.round(budget * 0.05);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'Festiva Intelligence Engine',
    },
    theme: {
      title: theme || `${vibe || 'Golden Elegance'} ${eventType}`,
      tagline: `An unforgettable celebration crafted for ${guestCount} guests in a ${setting.toLowerCase()} environment.`,
      concept: `A seamless fusion of ${vibe.toLowerCase() || 'modern celebration'} style, warm hospitality, and memorable sensory touches. Every interaction is curated to feel bespoke, fluid, and celebratory.`,
      colorPalette: [
        { name: 'Warm Champagne', hex: '#E7CFA4', role: 'Primary metallic accent' },
        { name: 'Midnight Velvet', hex: '#1E232A', role: 'Base contrast & depth' },
        { name: 'Terracotta Rust', hex: '#C86D51', role: 'Warm floral & linen highlight' },
        { name: 'Botanical Sage', hex: '#879782', role: 'Greenery & organic balance' },
        { name: 'Ivory Silk', hex: '#FAF7F2', role: 'Clean canvas & stationery' },
      ],
      dressCode: 'Cocktail Festive / Elegant Chic with a hint of warm earth tones',
      musicalVibe: 'Uptempo acoustic indie during cocktails, transitioning to smooth nu-disco and celebratory dance anthems later.',
      lightingMood: 'Dimmed amber wash (2700K), floating pillar candles, and soft warm string pinspots on floral centerpieces.',
    },
    timeline: [
      {
        time: '14:00',
        title: 'Vendor Load-In & Technical Walkthrough',
        description: 'Floral, audio/lighting, and catering team arrive. Sound check and power distribution verification across the venue.',
        vendorInvolved: 'Venue Manager, AV Tech, Florist',
        proTip: 'Keep a master printout of the floorplan taped near the loading bay to minimize vendor questions.',
      },
      {
        time: '17:30',
        title: 'Welcome Cocktail Hour & Ambient Beats',
        description: `Guests arrive to chilled welcome flute drinks, acoustic background music, and passed artisanal canapés.`,
        vendorInvolved: 'Catering Bar Staff, Acoustic Performer',
        proTip: 'Pre-pour 40 signature drinks before the first guest walks in to prevent bar bottlenecking.',
      },
      {
        time: '19:00',
        title: 'Dinner Seating & Host Welcoming Toast',
        description: `Transition into main dining area. The host delivers a 4-minute heartfelt welcome and initiates service.`,
        vendorInvolved: 'Host, MC, Catering Lead',
        proTip: 'Keep initial welcome speeches under 5 minutes while guests are hungry and settling.',
      },
      {
        time: '20:30',
        title: 'Celebration Highlight & Dessert Reveal',
        description: 'Special toast, ceremonial moment/cake cutting, and decadent dessert station reveal with espresso martinis.',
        vendorInvolved: 'Baker, Catering, Photographer',
        proTip: 'Give the photographer a 3-minute cue before lighting changes for the ceremonial moment.',
      },
      {
        time: '21:15',
        title: 'Dance Floor Ignition & Late Night Revelry',
        description: 'Lighting shifts to celebratory party wash; DJ kicks into dynamic playlist. Sparklers or light sticks handed out.',
        vendorInvolved: 'DJ / Band, Event Coordinator',
        proTip: 'Bring out late-night sliders or mini flatbreads at 22:30 to re-energize dancers.',
      },
      {
        time: '23:30',
        title: 'Grand Finale & Golden Farewell',
        description: 'Last call, final group anthem, and memorable sendoff with favors or warm cookie bags as guests depart.',
        vendorInvolved: 'Host, Coordinator, Valet/Shuttle',
        proTip: 'Confirm scheduled rideshare or shuttle pickup 30 minutes prior to prevent stragglers in the chill.',
      },
    ],
    budget: {
      totalEstimate: budget,
      currency: curr,
      perGuestEstimate: Math.round(budget / Math.max(1, guestCount)),
      categories: [
        { name: 'Catering & Beverages', percentage: 32, estimatedAmount: cateringCut, notes: `Full course dining + open signature cocktail bar for ${guestCount} guests.` },
        { name: 'Venue & Facilities', percentage: 28, estimatedAmount: venueCut, notes: 'Rental fee, site insurance, cleanup deposit, and primary access hours.' },
        { name: 'Decor, Floral & Ambience', percentage: 15, estimatedAmount: decorCut, notes: 'Focal arch, tablescapes, candles, custom linens, and signage.' },
        { name: 'Entertainment & AV', percentage: 12, estimatedAmount: entCut, notes: 'Live musician for cocktails + high-energy DJ and sound reinforcement.' },
        { name: 'Photo & Video Storytelling', percentage: 8, estimatedAmount: photoCut, notes: '6 hours of professional coverage, sneak peek edits within 48h.' },
        { name: 'Contingency & Incidentals', percentage: 5, estimatedAmount: contingencyCut, notes: 'Emergency fund for last-minute guest additions, overtime, or weather supplies.' },
      ],
      costSavingTips: [
        'Curate a 2-drink signature cocktail menu rather than a fully stocked top-shelf open bar to cut alcohol costs by up to 35%.',
        'Repurpose cocktail-hour floral arrangements into reception dessert and bar decor.',
        'Opt for family-style or luxury grazing boards rather than plated 4-course service to reduce staffing costs.',
      ],
    },
    catering: {
      cocktailHourDrinks: ['Crisp Prosecco with Rosemary Sprig', 'Smoked Citrus Mocktail', 'Blood Orange Spritz'],
      signatureCocktail: {
        name: 'The Golden Hour Ember',
        ingredients: ['Bourbon or Spiced Rum (2 oz)', 'Fresh Blood Orange Juice (1 oz)', 'Honey-Ginger Syrup (0.75 oz)', 'Aromatic Bitters (2 dashes)'],
        garnish: 'Dehydrated blood orange wheel & torched rosemary sprig',
        mocktailAlternative: 'Crafted with cold brew botanical tea, orange reduction, and ginger beer.',
      },
      dinnerMenu: {
        appetizers: ['Burrata with heirloom tomatoes, balsamic pearls, and basil crisps', 'Wild mushroom & truffle tartlets'],
        mains: ['Slow-braised short ribs with parsnip silk', 'Pan-roasted king salmon with lemon dill emulsion', 'Charred cauliflower steak with romesco & toasted almonds (Vegan)'],
        dessert: ['Mini chocolate molten pots with sea salt flakes', 'Champagne berry pavlovas'],
        dietaryInclusions: 'All menus labeled clearly with gluten-free, dairy-free, and nut-allergy identifiers.',
      },
      lateNightBite: 'Mini brioche sliders (truffle beef & crispy halloumi) with seasoned shoestring fries in paper cones.',
    },
    decorAndVisuals: {
      focalPoints: [
        'Dramatic Welcome Archway adorned with asymmetric greenery and warm warm-white pendant orbs.',
        'Photo-Ready Backdrop with layered textural linen, custom neon or brass typography, and velvet bench.',
        'Feature Bar Display with illuminated amber glass risers and fresh floral sprays.',
      ],
      tablescapes: 'Textured ivory stonewash runners, ribbed glass votives at varied heights, matte black flatware, and deckle-edged personalized menu cards.',
      lightingDesign: 'Warm low-level ambient glow with uplighting on architectural features and pinspots targeting key centerpieces.',
    },
    checklists: [
      {
        phase: '8-12 Weeks Before',
        items: [
          'Confirm venue contract & review weather contingency clause.',
          'Secure DJ/band, photographer, and catering partners with signed deposits.',
          'Send digital Save-the-Dates with hotel block recommendations.',
        ],
      },
      {
        phase: '4 Weeks Before',
        items: [
          'Finalize menu tasting, bar selections, and special dietary headcount.',
          'Collect outstanding RSVPs and lock in floorplan seating chart.',
          'Order custom signage, printed menus, and personalized favors.',
        ],
      },
      {
        phase: '1 Week Before',
        items: [
          'Send minute-by-minute run of show to all vendors with emergency contacts.',
          'Assemble the Day-Of Emergency Kit (tide pen, tape, ibuprofen, phone chargers, safety pins).',
          'Confirm final guest headcount with caterer and venue.',
        ],
      },
      {
        phase: 'Day of Celebration',
        items: [
          'Designate one trusted point person (other than the host) for vendor deliveries.',
          'Inspect audio levels and microphone batteries 45 minutes before start.',
          'Take a breath, relax, and savor your celebration!',
        ],
      },
    ],
    invitationWording: {
      formal: `Together with their closest family and friends, you are warmly invited to celebrate the momentous occasion of ${theme || eventType}. Join us for an evening of elevated dining, joyous music, and celebration.\nRSVP by three weeks prior.`,
      casualChic: `Let's make memories worth keeping! Come celebrate ${theme || eventType} with us—expect phenomenal drinks, delicious bites, and dancing under the stars.\nBring your celebration spirit!`,
      rsvpDateAdvice: 'Request RSVPs exactly 21 days before the event date to allow 7 days buffer before caterer deadlines.',
    },
    crisisPlaybook: [
      {
        scenario: 'Sudden Unpredicted Weather Shift (Rain / Gusty Winds)',
        solution: 'Activate 48-hour tent reservation hold with clear sidewalls; move cocktail hour indoors and use warm amber string lights to transform the mood into an intimate, cozy sanctuary.',
      },
      {
        scenario: 'Vendor Running 45 Minutes Behind Schedule',
        solution: 'Extend cocktail hour with an impromptu acoustic set and passed champagne. Guests will perceive it as generous hospitality rather than a delay.',
      },
      {
        scenario: 'Bar Queue Overcrowding During Peak Arrival',
        solution: 'Deploy 2 roaming servers with pre-poured trays of the signature cocktail and sparkling water to dilute bar foot traffic instantly.',
      },
    ],
  };
};

// API: Plan Event
app.post('/api/plan-event', async (req, res) => {
  try {
    const {
      eventType = 'Celebration',
      theme = '',
      guestCount = 50,
      budget = 5000,
      currency = '$',
      setting = 'Indoor & Outdoor',
      vibe = 'Celebratory & Elegant',
      notes = '',
    } = req.body;

    // If Gemini client is configured, prompt Gemini 3.8 Flash for a bespoke plan
    if (ai) {
      try {
        const prompt = `You are Festiva, an elite master celebration and event planner. 
Create an exhaustive, beautifully curated, operationally flawless event plan for:
- Event Type: ${eventType}
- Theme / Name: ${theme || 'Creative bespoke title'}
- Guest Count: ${guestCount} guests
- Total Budget: ${currency}${budget}
- Setting: ${setting}
- Vibe / Atmosphere: ${vibe}
- Special Notes / Dietary / Constraints: ${notes || 'None specified'}

Output ONLY valid JSON (no markdown formatting, no code fencing, pure JSON string) conforming to this exact structure:
{
  "theme": {
    "title": "Inspiring theme title",
    "tagline": "A punchy one-sentence summary",
    "concept": "2-3 sentences on the creative narrative",
    "colorPalette": [
      {"name": "Color name", "hex": "#HEXCODE", "role": "Usage description"}
    ],
    "dressCode": "Specific dress code guidance",
    "musicalVibe": "Music genre and playlist arc",
    "lightingMood": "Lighting design description"
  },
  "timeline": [
    {
      "time": "HH:MM",
      "title": "Activity name",
      "description": "What happens",
      "vendorInvolved": "Which vendors coordinate",
      "proTip": "Insider coordination tip"
    }
  ],
  "budget": {
    "totalEstimate": ${budget},
    "currency": "${currency}",
    "perGuestEstimate": ${Math.round(budget / Math.max(1, guestCount))},
    "categories": [
      {
        "name": "Category name",
        "percentage": 30,
        "estimatedAmount": 1500,
        "notes": "Specific itemization"
      }
    ],
    "costSavingTips": ["Tip 1", "Tip 2", "Tip 3"]
  },
  "catering": {
    "cocktailHourDrinks": ["Drink 1", "Drink 2"],
    "signatureCocktail": {
      "name": "Bespoke cocktail name",
      "ingredients": ["Ingredient 1", "Ingredient 2"],
      "garnish": "Garnish description",
      "mocktailAlternative": "Non-alcoholic version"
    },
    "dinnerMenu": {
      "appetizers": ["App 1", "App 2"],
      "mains": ["Main 1", "Main 2", "Vegetarian/Vegan main"],
      "dessert": ["Dessert 1", "Dessert 2"],
      "dietaryInclusions": "Dietary handling note"
    },
    "lateNightBite": "Late night treat description"
  },
  "decorAndVisuals": {
    "focalPoints": ["Focal element 1", "Focal element 2", "Focal element 3"],
    "tablescapes": "Detailed table decor description",
    "lightingDesign": "Detailed lighting setup"
  },
  "checklists": [
    {
      "phase": "8-12 Weeks Before",
      "items": ["Item 1", "Item 2", "Item 3"]
    },
    {
      "phase": "4 Weeks Before",
      "items": ["Item 1", "Item 2", "Item 3"]
    },
    {
      "phase": "1 Week Before",
      "items": ["Item 1", "Item 2", "Item 3"]
    },
    {
      "phase": "Day of Celebration",
      "items": ["Item 1", "Item 2", "Item 3"]
    }
  ],
  "invitationWording": {
    "formal": "Formal invitation text",
    "casualChic": "Playful and modern invitation text",
    "rsvpDateAdvice": "Guidance on RSVP deadline timing"
  },
  "crisisPlaybook": [
    {
      "scenario": "Specific worst-case scenario 1",
      "solution": "Actionable 2-3 sentence recovery tactic"
    },
    {
      "scenario": "Specific worst-case scenario 2",
      "solution": "Actionable 2-3 sentence recovery tactic"
    },
    {
      "scenario": "Specific worst-case scenario 3",
      "solution": "Actionable 2-3 sentence recovery tactic"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
            systemInstruction:
              'You are Festiva, the world leading luxury event producer and party architect. Return strictly valid JSON with realistic pricing, exquisite creative taste, and actionable operational details.',
          },
        });

        const rawText = response.text || '';
        const cleaned = rawText.replace(/^```json/i, '').replace(/```$/i, '').trim();
        const parsed = JSON.parse(cleaned);

        return res.json({
          success: true,
          data: {
            ...parsed,
            meta: {
              generatedAt: new Date().toISOString(),
              source: 'Gemini 3.8 Flash AI Engine',
            },
          },
        });
      } catch (geminiError: any) {
        console.error('Gemini generation error, utilizing algorithmic backup planner:', geminiError);
        // Fall through to algorithmic generator
      }
    }

    // High quality fallback
    const fallbackPlan = generateFallbackPlan({
      eventType,
      theme,
      guestCount: Number(guestCount) || 50,
      budget: Number(budget) || 5000,
      currency,
      setting,
      vibe,
      notes,
    });

    return res.json({
      success: true,
      data: fallbackPlan,
    });
  } catch (error: any) {
    console.error('Plan generation failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate event plan.',
    });
  }
});

// API: Solve Crisis ("Clear the problem in event planning time")
app.post('/api/solve-crisis', async (req, res) => {
  try {
    const { crisisDescription, eventType = 'Event', guestCount = 50, currentPhase = 'Planning' } = req.body;

    if (!crisisDescription || crisisDescription.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please specify the event planning problem or emergency.',
      });
    }

    if (ai) {
      try {
        const prompt = `An event host is facing an urgent event planning crisis right now!
Event Type: ${eventType}
Guest Count: ${guestCount}
Event Phase: ${currentPhase}
Crisis: "${crisisDescription}"

Act as a veteran master event crisis manager. Deliver an immediate, calm, high-impact tactical rescue blueprint.
Return ONLY valid JSON matching this schema:
{
  "triageLevel": "CRITICAL" | "HIGH" | "MODERATE",
  "calmingMessage": "A reassuring 1-2 sentence statement to stop panic",
  "immediateAction": {
    "timeline": "Next 5 Minutes",
    "steps": ["Step 1", "Step 2", "Step 3"]
  },
  "mitigationTactic": {
    "timeline": "Next 15 to 30 Minutes",
    "strategy": "Core strategic pivot to preserve the guest experience",
    "actions": ["Action 1", "Action 2", "Action 3"]
  },
  "guestExperienceCover": "What to tell or show guests so they never sense panic or failure",
  "vendorNegotiationOrBackup": "Practical script or resource to call/substitute immediately",
  "proTip": "Veteran coordinator trade secret for this exact mishap"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
            systemInstruction:
              'You are Festiva Emergency Incident Commander for high-stakes celebrations. Provide rapid, decisive, practical solutions to event disasters.',
          },
        });

        const rawText = response.text || '';
        const cleaned = rawText.replace(/^```json/i, '').replace(/```$/i, '').trim();
        const parsed = JSON.parse(cleaned);

        return res.json({
          success: true,
          solution: parsed,
        });
      } catch (geminiError: any) {
        console.error('Crisis solver Gemini error:', geminiError);
      }
    }

    // High quality algorithmic crisis mitigation fallback
    const fallbackSolution = {
      triageLevel: 'HIGH',
      calmingMessage: 'Take a deep breath. 90% of memorable events navigate unexpected hiccups; with this tactical pivot, your guests will think it was part of the plan.',
      immediateAction: {
        timeline: 'Next 5 Minutes',
        steps: [
          'Isolate the incident without public commotion: gather only key decision makers (host, lead coordinator, lead caterer/venue).',
          'Assess the non-negotiables: guest safety, food/drink availability, and comfort (temperature, shelter).',
          'Do NOT announce the problem to guests before you have the ready solution in hand.',
        ],
      },
      mitigationTactic: {
        timeline: 'Next 15 to 30 Minutes',
        strategy: 'Redirect guest attention with positive hospitality while activating alternative vendor or spatial pathways.',
        actions: [
          'Pour pre-stocked sparkling wine, craft cider, or chilled infused water to keep guests happily engaged.',
          'Re-sequence the event timeline: swap speeches, cocktail mixing, or photo sessions to buy 30 minutes of setup recovery time.',
          'Mobilize quick-delivery local on-demand backups (nearby bakeries, rideshare pickups, local party supply rentals).',
        ],
      },
      guestExperienceCover: 'Frame any change as an exclusive VIP upgrade: "To give everyone a more intimate perspective, we have moved the cocktail tasting into our candlelit gallery."',
      vendorNegotiationOrBackup: 'Call the venue on-duty director or local preferred supplier list. Venues keep secret backup lists of on-call DJs, bartenders, and rental companies.',
      proTip: 'Guests never remember what went slightly off schedule—they only remember how gracious, calm, and welcoming the host remained.',
    };

    return res.json({
      success: true,
      solution: fallbackSolution,
    });
  } catch (error: any) {
    console.error('Solve crisis failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to solve event crisis.',
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite middlewares in dev mode, or serve static dist in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Festiva Celebration & Event Planner Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
