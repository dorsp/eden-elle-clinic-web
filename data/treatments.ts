export type VisualAsset = {
  label: string;
  tone: "facial" | "body" | "doctor" | "ritual" | "clinic";
  focalPoint?: string;
};

export type TreatmentCategory = {
  slug: string;
  label: string;
  description: string;
  image: VisualAsset;
};

export type TreatmentStep = {
  title: string;
  body: string;
};

export type TreatmentFaq = {
  question: string;
  answer: string;
};

export type Treatment = {
  slug: string;
  category: string;
  categoryLabel: string;
  name: string;
  tagline: string;
  summary: string;
  overview: string;
  duration: string;
  price: string;
  image: VisualAsset;
  imageAlt: string;
  concerns: string[];
  benefits: string[];
  idealFor: string[];
  results: string;
  aftercare: string[];
  timeline: TreatmentStep[];
  faqs: TreatmentFaq[];
  practitionerNote: string;
  whatsappMsg: string;
  whatsappUrl: string;
};

const whatsappNumber = "639452347667";

function wa(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const categories: TreatmentCategory[] = [
  {
    slug: "facials",
    label: "Facials",
    description: "Hydrating, brightening, and barrier-supporting rituals for luminous skin.",
    image: {
      label: "soft editorial facial treatment closeup",
      tone: "facial"
    }
  },
  {
    slug: "body-contouring",
    label: "Body Contouring",
    description: "Sculpting and smoothing treatments for a firmer, more refined silhouette.",
    image: {
      label: "warm clinical body contouring treatment room",
      tone: "body"
    }
  },
  {
    slug: "doctor-led",
    label: "Doctor's Procedures",
    description: "Consultation-led aesthetic procedures planned around natural-looking results.",
    image: {
      label: "doctor consultation in a calm aesthetic clinic",
      tone: "doctor"
    }
  },
  {
    slug: "body-rituals",
    label: "Body Rituals",
    description: "Tactile spa-clinic treatments that polish, soften, and restore.",
    image: {
      label: "aromatic oil and body ritual textures",
      tone: "ritual"
    }
  }
];

export const treatments: Treatment[] = [
  {
    slug: "luminous-glow-ritual",
    category: "facials",
    categoryLabel: "Signature Facial",
    name: "Luminous Glow Ritual",
    tagline: "A radiant reset for tired, uneven skin.",
    summary: "Deep cleanse, exfoliation, and hydration for a visibly radiant, firmer complexion.",
    overview:
      "A restorative facial built around gentle resurfacing, calming hydration, and a final glow finish. The protocol is designed for guests who want visible refinement without an aggressive recovery window.",
    duration: "75 min",
    price: "PHP 3,500",
    image: {
      label: "luminous facial treatment with soft towels and warm clinical light",
      tone: "facial"
    },
    imageAlt: "Luminous facial treatment image placeholder",
    concerns: ["Dullness", "Uneven tone", "Dehydration"],
    benefits: ["Brighter tone", "Smoother texture", "Plumper hydration"],
    idealFor: ["Dullness", "Dryness", "First-time clinic guests"],
    results: "Skin looks fresher immediately, with the best glow settling in over the next 24 hours.",
    aftercare: ["Use SPF daily", "Avoid actives for 24 hours", "Keep skin hydrated"],
    timeline: [
      {
        title: "Skin read",
        body: "Your provider checks sensitivity, dryness, and current product use before choosing intensity."
      },
      {
        title: "Cleanse and polish",
        body: "A gentle exfoliating phase clears surface buildup while keeping the barrier calm."
      },
      {
        title: "Hydration finish",
        body: "Cooling hydration and a final skin veil leave the complexion soft, calm, and luminous."
      }
    ],
    faqs: [
      {
        question: "Is there downtime?",
        answer: "Most guests return to the day immediately. Mild pinkness can happen and usually settles quickly."
      },
      {
        question: "Can I wear makeup after?",
        answer: "Light makeup is possible, but we recommend letting the skin breathe for the rest of the day."
      }
    ],
    practitionerNote:
      "Best booked before an event when the skin needs polish and hydration without a long recovery window.",
    whatsappMsg: "Hi Elle De Marrer, I would like to book the Luminous Glow Ritual.",
    whatsappUrl: wa("Hi Elle De Marrer, I would like to book the Luminous Glow Ritual.")
  },
  {
    slug: "super-model-booty-lift",
    category: "body-contouring",
    categoryLabel: "Body Contour",
    name: "Super Model Booty Lift",
    tagline: "Lift, firm, and smooth with a sculpted finish.",
    summary: "Lifting and firming treatment targeting cellulite for a sculpted, toned silhouette.",
    overview:
      "A body-focused protocol combining firming massage rhythms with contouring technologies. It is designed to support tone, smoothness, and a more lifted-looking contour over a considered treatment plan.",
    duration: "60 min",
    price: "PHP 4,200",
    image: {
      label: "body contouring suite with sculptural warm monochrome details",
      tone: "body"
    },
    imageAlt: "Body contouring treatment image placeholder",
    concerns: ["Loss of firmness", "Texture", "Contour refinement"],
    benefits: ["Firmer feel", "Smoother appearance", "More lifted contour"],
    idealFor: ["Loss of firmness", "Cellulite texture", "Event preparation"],
    results: "A temporary lifted feel may be noticeable after one session; best contour refinement is planned in a series.",
    aftercare: ["Hydrate well", "Light movement is encouraged", "Avoid heavy heat same day"],
    timeline: [
      {
        title: "Contour mapping",
        body: "The area is assessed so pressure, focus zones, and treatment pacing feel tailored."
      },
      {
        title: "Firming protocol",
        body: "The treatment combines targeted body work with smoothing and lifting techniques."
      },
      {
        title: "Series planning",
        body: "Your provider recommends cadence when the goal is sustained body refinement."
      }
    ],
    faqs: [
      {
        question: "How many sessions do I need?",
        answer: "A single visit can feel firming, but visible contour plans usually work best as a short series."
      },
      {
        question: "Is it painful?",
        answer: "The treatment should feel active, not harsh. Pressure can be adjusted throughout."
      }
    ],
    practitionerNote:
      "Pair with hydration and light movement after treatment for the most polished post-session feel.",
    whatsappMsg: "Hi Elle De Marrer, I would like to book the Super Model Booty Lift.",
    whatsappUrl: wa("Hi Elle De Marrer, I would like to book the Super Model Booty Lift.")
  },
  {
    slug: "aromatic-oil-scrub",
    category: "body-rituals",
    categoryLabel: "Body Ritual",
    name: "Aromatic Oil Scrub",
    tagline: "Softness that lingers after a quiet exfoliating ritual.",
    summary: "A soothing, aromatic exfoliation for all skin types, leaving skin polished and soft.",
    overview:
      "A tactile body ritual that buffs away dryness before sealing the skin in a veil of aromatic oil. It is restorative, sensory, and ideal when the body needs a reset.",
    duration: "50 min",
    price: "PHP 2,800",
    image: {
      label: "aromatic oil scrub textures with towels and warm stone",
      tone: "ritual"
    },
    imageAlt: "Body scrub treatment image placeholder",
    concerns: ["Dryness", "Rough texture", "Pre-event polish"],
    benefits: ["Silky softness", "Even-looking skin", "Relaxed body feel"],
    idealFor: ["Dry skin", "Pre-vacation prep", "Gentle body renewal"],
    results: "Skin feels smoother immediately and remains softer with daily body hydration.",
    aftercare: ["Avoid exfoliating for 48 hours", "Moisturize daily", "Use SPF on exposed skin"],
    timeline: [
      {
        title: "Scent selection",
        body: "The ritual begins with a calming aromatic direction matched to your desired mood."
      },
      {
        title: "Body polish",
        body: "A gentle scrub smooths dry surface texture without stripping the skin."
      },
      {
        title: "Oil veil",
        body: "A nourishing finish leaves the skin supple and lightly scented."
      }
    ],
    faqs: [
      {
        question: "Can I book this before travel?",
        answer: "Yes. It is a strong pre-vacation or pre-event polish when paired with SPF afterward."
      },
      {
        question: "Is it suitable for sensitive skin?",
        answer: "Tell your provider about sensitivity so the scrub pressure and product choice can be adjusted."
      }
    ],
    practitionerNote:
      "A quiet reset when the client wants softness, comfort, and a polished body feel in one visit.",
    whatsappMsg: "Hi Elle De Marrer, I would like to book the Aromatic Oil Scrub.",
    whatsappUrl: wa("Hi Elle De Marrer, I would like to book the Aromatic Oil Scrub.")
  },
  {
    slug: "glass-skin-infusion",
    category: "facials",
    categoryLabel: "Hydration Facial",
    name: "Glass Skin Infusion",
    tagline: "A dewy infusion for calm, reflective skin.",
    summary: "A hydration-focused facial for plump, glassy, event-ready skin.",
    overview:
      "A layered treatment using gentle exfoliation, serum infusion, and cooling masks to restore bounce. It is designed for skin that looks tired, tight, or makeup-resistant.",
    duration: "70 min",
    price: "PHP 3,900",
    image: {
      label: "hydrating facial serum and calm reflective skin closeup",
      tone: "facial"
    },
    imageAlt: "Hydrating facial image placeholder",
    concerns: ["Dryness", "Tightness", "Makeup texture"],
    benefits: ["Deep hydration", "Calmer look", "Soft reflective finish"],
    idealFor: ["Dryness", "Makeup preparation", "Redness-prone skin"],
    results: "The skin appears bouncier and more reflective immediately, with hydration improving through the day.",
    aftercare: ["Keep makeup light for 12 hours", "Use SPF", "Avoid exfoliation for 48 hours"],
    timeline: [
      {
        title: "Barrier check",
        body: "The treatment starts with a dryness and sensitivity read."
      },
      {
        title: "Serum infusion",
        body: "Hydrating layers are worked into the skin to soften tightness."
      },
      {
        title: "Cooling mask",
        body: "A calming finish helps reduce visible stress and leaves a glassy surface."
      }
    ],
    faqs: [
      {
        question: "Is this good before makeup?",
        answer: "Yes. It is designed to make makeup sit more smoothly when the skin feels dry or textured."
      },
      {
        question: "Can acne-prone skin book this?",
        answer: "Usually yes, but active inflammation should be discussed during consultation."
      }
    ],
    practitionerNote:
      "Choose this when the goal is calm hydration rather than strong exfoliation.",
    whatsappMsg: "Hi Elle De Marrer, I would like to book the Glass Skin Infusion.",
    whatsappUrl: wa("Hi Elle De Marrer, I would like to book the Glass Skin Infusion.")
  },
  {
    slug: "doctor-skin-consultation",
    category: "doctor-led",
    categoryLabel: "Doctor's Procedure",
    name: "Doctor Skin Consultation",
    tagline: "A considered plan for natural-looking aesthetic results.",
    summary: "A doctor-led consultation to map skin goals, options, timelines, and aftercare.",
    overview:
      "A structured consultation for guests considering injectables, resurfacing, or advanced protocols. The goal is clarity: what is suitable, what is not, and what cadence supports natural-looking results.",
    duration: "45 min",
    price: "PHP 1,500",
    image: {
      label: "doctor-led aesthetic consultation with warm clinical minimalism",
      tone: "doctor"
    },
    imageAlt: "Doctor consultation image placeholder",
    concerns: ["Treatment planning", "Skin goals", "Natural-looking results"],
    benefits: ["Personalized plan", "Clear treatment options", "Natural result mapping"],
    idealFor: ["First-time aesthetic guests", "Advanced treatment planning", "Skin concerns"],
    results: "Guests leave with a practical treatment plan, expected sequencing, and aftercare considerations.",
    aftercare: ["Bring treatment history", "Avoid same-day actives if advised", "Follow your plan"],
    timeline: [
      {
        title: "Goal mapping",
        body: "Your concerns, lifestyle, and comfort level are discussed before treatment options."
      },
      {
        title: "Suitability review",
        body: "The doctor explains what is appropriate, what to avoid, and what results are realistic."
      },
      {
        title: "Plan and cadence",
        body: "You receive a recommended order of treatments, timing, and aftercare notes."
      }
    ],
    faqs: [
      {
        question: "Do I need to book a procedure the same day?",
        answer: "No. The consultation can simply help you understand your best options."
      },
      {
        question: "Can I bring previous treatment history?",
        answer: "Yes. Photos, product lists, and previous procedure dates are helpful."
      }
    ],
    practitionerNote:
      "Best for clients who want thoughtful planning before choosing advanced aesthetic treatments.",
    whatsappMsg: "Hi Elle De Marrer, I would like to book a Doctor Skin Consultation.",
    whatsappUrl: wa("Hi Elle De Marrer, I would like to book a Doctor Skin Consultation.")
  }
];

export const featuredTreatments = treatments.slice(0, 3);
