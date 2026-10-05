export const images = {
  hero: "/assets/hero.jpg",
  style: "/assets/style.jpg",
  wedding: "/assets/wedding.jpg",
  salon: "/assets/salon.jpg",
  freelancer: "/assets/freelancer.jpg",
  home: "/assets/home.jpg",
  academy: "/assets/academy.jpg",
  lifestyle: "/assets/lifestyle.jpg",
};
export const pillars = [
  {
    id: "beauty",
    name: "Beauty & Grooming",
    icon: "cut-outline",
    color: "#EEE4DC",
    services: [
      "Salons",
      "Stylists",
      "Barbers",
      "Makeup artists",
      "Home grooming",
    ],
  },
  {
    id: "ai",
    name: "AI & Personal Style",
    icon: "sparkles-outline",
    color: "#E9E7F4",
    services: [
      "Hairstyle visualization",
      "Clothing visualization",
      "Eyewear visualization",
      "Complete look exploration",
    ],
  },
  {
    id: "health",
    name: "Health & Aesthetics",
    icon: "heart-outline",
    color: "#F3E0DC",
    services: [
      "Dermatology",
      "Dental",
      "Diagnostics",
      "Cosmetic surgery",
      "Hair restoration",
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Nutrition",
    icon: "barbell-outline",
    color: "#E5ECDD",
    services: [
      "Gyms",
      "Personal trainers",
      "Yoga",
      "Dietitians",
      "Healthy meal providers",
    ],
  },
  {
    id: "fashion",
    name: "Fashion & Image",
    icon: "shirt-outline",
    color: "#E9E6DE",
    services: [
      "Clothing",
      "Tailoring",
      "Personal styling",
      "Accessories",
      "Eyewear",
    ],
  },
  {
    id: "wellness",
    name: "Wellness & Mental Health",
    icon: "leaf-outline",
    color: "#E0EBE5",
    services: [
      "Recovery",
      "Sleep",
      "Massage",
      "Psychology",
      "Counseling",
      "Lifestyle support",
    ],
  },
];
export const fair = {
  id: "fair",
  name: "Candelia Salon Trivandrum",
  formalName: "Candelia Professional Salon Spa",
  category: "beauty",
  kind: "Partner location",
  image: "salon",
  subtitle: "Hair, beauty & personal care in Kannammoola",
  address:
    "Kumarapuram Kannanmoola Road, Kannammoola, Thiruvananthapuram, Kerala 695011, India",
  about:
    "Established in the mid-1990s, Candelia Professional Salon Spa offers makeup, hair treatments and styling, hair colouring, and facial and skin care. The official website identifies Vijaya Babu (Viji) as its owner.",
  phones: [
    ["For Her", "+91 471 2553405"],
    ["Mobile", "+91 94470 10003"],
    ["For Him", "+91 9947422220"],
  ],
  website: "https://www.fairhair.in/",
  hours: "Please call the salon to confirm current opening hours.",
  source:
    "Business details: fairhair.in and fairhair.in/about/. Checked 4 October 2026.",
  services: [
    { name: "Hair treatment & styling", price: 1200, duration: "60 min" },
    { name: "Hair colouring", price: 2500, duration: "90 min" },
    { name: "Facial & skin care", price: 1800, duration: "60 min" },
    { name: "Makeup consultation", price: 750, duration: "30 min" },
  ],
};
export const providers = [
  fair,
  {
    id: "fit",
    name: "Form Fitness Studio",
    category: "fitness",
    kind: "Partner location",
    image: "lifestyle",
    subtitle: "Training, yoga & nutrition · Demo provider",
    services: [
      { name: "Personal training", price: 900, duration: "60 min" },
      { name: "Nutrition consultation", price: 1100, duration: "45 min" },
    ],
  },
  {
    id: "skin",
    name: "Clarity Skin & Smile",
    category: "health",
    kind: "Partner location",
    image: "style",
    subtitle: "Dermatology & dental · Demo provider",
    services: [
      { name: "Professional consultation", price: 800, duration: "30 min" },
    ],
  },
  {
    id: "fashion",
    name: "The Style Edit",
    category: "fashion",
    kind: "Certified freelancer",
    image: "freelancer",
    subtitle: "Outfits, tailoring & eyewear · Demo provider",
    services: [{ name: "Personal styling", price: 1400, duration: "60 min" }],
  },
  {
    id: "well",
    name: "Still Wellness",
    category: "wellness",
    kind: "Home service",
    image: "home",
    subtitle: "Recovery, massage & lifestyle · Demo provider",
    services: [
      { name: "Wellness consultation", price: 900, duration: "45 min" },
      { name: "Home yoga", price: 1000, duration: "60 min" },
    ],
  },
  {
    id: "freelance",
    name: "Maya · Beauty Professional",
    category: "beauty",
    kind: "Certified freelancer",
    image: "freelancer",
    subtitle: "Grooming & event makeup · Demo provider",
    services: [{ name: "Event makeup", price: 2200, duration: "90 min" }],
  },
];
export const programs = [
  {
    name: "Wedding Transformation",
    duration: "6 months",
    icon: "flower-outline",
    desc: "Your hair, skin, fitness, nutrition, smile and style, coordinated for your big day.",
    focus: ["Fitness", "Nutrition", "Skin", "Hair", "Dental", "Personal style"],
  },
  {
    name: "Weight Management",
    duration: "12 weeks · demo",
    icon: "body-outline",
    desc: "A coordinated approach to fitness, nutrition and sustainable habits.",
    focus: ["Trainer", "Dietitian", "Healthy meals", "Lifestyle support"],
  },
  {
    name: "Muscle Development",
    duration: "16 weeks · demo",
    icon: "barbell-outline",
    desc: "Build your strength with qualified training and nutrition support.",
    focus: ["Training", "Nutrition", "Recovery"],
  },
  {
    name: "Skin Improvement",
    duration: "12 weeks · demo",
    icon: "sunny-outline",
    desc: "Professional-led skin consultations and a considered care routine.",
    focus: ["Dermatology", "Skincare", "Grooming"],
  },
  {
    name: "Smile Transformation",
    duration: "12 weeks · demo",
    icon: "happy-outline",
    desc: "Explore your goals with qualified dental professionals.",
    focus: ["Dental consultation", "Professional plan", "Maintenance"],
  },
  {
    name: "Complete Personal Transformation",
    duration: "6 months · demo",
    icon: "sparkles-outline",
    desc: "A connected journey across appearance, wellbeing and lifestyle.",
    focus: ["Hair", "Grooming", "Skin", "Clothing", "Eyewear", "Wellness"],
  },
];
export const weddingStages = [
  [
    "01",
    "Initial Assessment",
    "Month 1",
    "Fitness, nutrition, skin, hair, dental and style consultations.",
  ],
  [
    "02",
    "Personalized Plan",
    "Months 1–2",
    "Coordinated hair, skin, fitness, nutrition, dental and AI styling.",
  ],
  [
    "03",
    "Final Months",
    "Months 3–5",
    "Treatments, grooming, outfit finalization and styling.",
  ],
  [
    "04",
    "Event Day",
    "Month 6",
    "At-home makeup, hairstyling and grooming services.",
  ],
];
export const products = [
  {
    id: "p1",
    name: "Daily hair ritual",
    category: "Haircare",
    price: 850,
    icon: "water-outline",
  },
  {
    id: "p2",
    name: "Skin essentials",
    category: "Skincare",
    price: 1250,
    icon: "sunny-outline",
  },
  {
    id: "p3",
    name: "Strength starter kit",
    category: "Fitness equipment",
    price: 1800,
    icon: "barbell-outline",
  },
  {
    id: "p4",
    name: "Everyday eyewear",
    category: "Fashion",
    price: 2400,
    icon: "glasses-outline",
  },
  {
    id: "p5",
    name: "Rest & recovery kit",
    category: "Wellness",
    price: 990,
    icon: "leaf-outline",
  },
];
export const courses = [
  {
    name: "Hairstyling Foundations",
    duration: "4 weeks",
    desc: "Cuts, styling concepts, client consultations and practical skills.",
  },
  {
    name: "Grooming & Beauty",
    duration: "3 weeks",
    desc: "Grooming, makeup and beauty service foundations.",
  },
  {
    name: "Hygiene & Service Standards",
    duration: "1 week",
    desc: "Hygiene practices, professional conduct and consistent service quality.",
  },
];
export const revenue = [
  "Service commissions",
  "Customer subscriptions (grooming, fitness & wellness memberships)",
  "Transformation packages",
  "Product commerce",
  "Fashion commerce",
  "Corporate programs",
  "Training & certification",
  "Franchise expansion",
];
