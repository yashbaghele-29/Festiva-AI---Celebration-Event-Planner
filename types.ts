export interface ColorSwatch {
  name: string;
  hex: string;
  role?: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
  vendorInvolved?: string;
  proTip?: string;
  completed?: boolean;
}

export interface BudgetCategory {
  name: string;
  percentage: number;
  estimatedAmount: number;
  notes: string;
}

export interface BudgetPlan {
  totalEstimate: number;
  currency: string;
  perGuestEstimate: number;
  categories: BudgetCategory[];
  costSavingTips: string[];
}

export interface SignatureCocktail {
  name: string;
  ingredients: string[];
  garnish: string;
  mocktailAlternative: string;
}

export interface DinnerMenu {
  appetizers: string[];
  mains: string[];
  dessert: string[];
  dietaryInclusions: string;
}

export interface CateringPlan {
  cocktailHourDrinks: string[];
  signatureCocktail: SignatureCocktail;
  dinnerMenu: DinnerMenu;
  lateNightBite: string;
}

export interface DecorPlan {
  focalPoints: string[];
  tablescapes: string;
  lightingDesign: string;
}

export interface ChecklistPhase {
  phase: string;
  items: string[];
}

export interface InvitationWording {
  formal: string;
  casualChic: string;
  rsvpDateAdvice: string;
}

export interface CrisisScenario {
  scenario: string;
  solution: string;
}

export interface EventPlan {
  meta?: {
    generatedAt: string;
    source: string;
  };
  theme: {
    title: string;
    tagline: string;
    concept: string;
    colorPalette: ColorSwatch[];
    dressCode: string;
    musicalVibe: string;
    lightingMood: string;
  };
  timeline: TimelineItem[];
  budget: BudgetPlan;
  catering: CateringPlan;
  decorAndVisuals: DecorPlan;
  checklists: ChecklistPhase[];
  invitationWording: InvitationWording;
  crisisPlaybook: CrisisScenario[];
}

export interface CrisisSolution {
  triageLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  calmingMessage: string;
  immediateAction: {
    timeline: string;
    steps: string[];
  };
  mitigationTactic: {
    timeline: string;
    strategy: string;
    actions: string[];
  };
  guestExperienceCover: string;
  vendorNegotiationOrBackup: string;
  proTip: string;
}

export interface EventFormState {
  eventType: string;
  theme: string;
  guestCount: number;
  budget: number;
  currency: string;
  setting: string;
  vibe: string;
  notes: string;
}
