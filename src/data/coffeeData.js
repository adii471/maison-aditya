/**
 * ═══════════════════════════════════════════════════════════════════
 *  MAISON ADITYA / ADITYA RESERVE — Haute Roastery & Terroir
 *  Awwwards-Caliber Luxury Editorial Coffee Experience
 * ═══════════════════════════════════════════════════════════════════
 */

export const brand = {
  name: "MAISON ADITYA",
  founder: "Aditya",
  tagline: "Grand Cru Terroir & Reserve",
  subtitle: "Artisanal High-Altitude Micro-Lot Roasters · Est. 2018",
  monogram: "AD",
  crest: "ADITYA",
  year: "Est. 2018",
  location: "Lake Kivu Volcanic Basin · 2,150 MASL",
  heroQuote: "The Alchemy of Volcanic Fire, Refined in Every Drop.",
  heroSubquote: "Where ancient basaltic earth, equatorial mist, and disciplined fire converge into liquid velvet.",
  preloaderQuote:
    '"To roast is not to transform the bean, but to awaken the memory of the soil, the mountain rain, and the hands that gathered it."',
};

export const palette = {
  espressoBlack: "#080604",
  deepCharcoal: "#120E0A",
  warmRoast: "#22160F",
  burntOrange: "#D85820",
  ember: "#C04A15",
  warmOrange: "#F27A3D",
  richBrown: "#3B2416",
  caramel: "#593622",
  cream: "#F7F2EB",
  alabaster: "#EBE2D5",
  sandstone: "#D3C5B4",
  accentGold: "#E2B868",
  platinumGold: "#F5E2B3",
};

export const navLinks = [
  { label: "Extraction", href: "#pour" },
  { label: "Alchemy", href: "#roasting" },
  { label: "Terroir", href: "#origin" },
  { label: "Grand Cru", href: "#collection" },
  { label: "Manifesto", href: "#story" },
];

export const heroMetrics = [
  { label: "Terroir Elevation", value: "2,150m", unit: "masl", note: "Peak Basin" },
  { label: "Heritage Varietal", value: "Gesha / SL28", unit: "Grand Cru", note: "Single-Plot" },
  { label: "Natural Sweetness", value: "23.4°", unit: "Brix", note: "Hand-Sorted" },
  { label: "Q-Grade Rating", value: "96.4", unit: "Pts", note: "SCA Certified" },
];

export const originStages = [
  {
    id: "volcanic-crater",
    title: "Basaltic Terroir & Volcanic Ash",
    subtitle: "Virunga Volcanic Range · Plot No. 07",
    coordinates: "1°31'22.4\"S 29°15'04.8\"E",
    description:
      "Perched on the nutrient-dense slopes above Lake Kivu, the soil is composed of pure decomposed basalt from historical Virunga eruptions. Rich in potassium, iron, and ancient volcanic silicates, this mineral bedrock yields extraordinary cup vibrancy, deep fruit resonance, and an unmistakable volcanic minerality.",
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1600&q=90&auto=format",
    stat: { value: "2,150m", label: "Peak Basin Elevation" },
    tag: "Volcanic Mineral Matrix",
  },
  {
    id: "microclimate-mist",
    title: "Equatorial Mist & Thermal Shift",
    subtitle: "Cloud Canopy · Diurnal Range 18°C",
    coordinates: "1°28'45.1\"S 29°12'19.3\"E",
    description:
      "At extreme elevation, equatorial sunshine gives way to dense afternoon cloud mists that blanket the coffee trees. Night temperatures plummet to 9°C, stalling bean respiration and extending maturation to 14 months. This slow metabolic pace supercharges natural sugar synthesis inside each seed.",
    image:
      "https://images.unsplash.com/photo-1524350876685-274059332603?w=1600&q=90&auto=format",
    stat: { value: "14 Mo.", label: "Tree Maturation Cycle" },
    tag: "Slow-Growth Density",
  },
  {
    id: "direct-heritage",
    title: "Generational Direct-Trade Families",
    subtitle: "Aditya Foundation · 127 Micro-Lot Guardians",
    coordinates: "1°34'02.9\"S 29°17'38.6\"E",
    description:
      "Maison Aditya works in direct partnership with 127 indigenous farming families across the Kivu ridge. We bypass commodity brokers entirely, paying 68% above Fair Trade benchmarks. In return, every cherry is picked at peak Brix, float-tested three times, and hand-sorted bean by bean under natural sunlight.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=90&auto=format",
    stat: { value: "+68%", label: "Direct-Trade Premium" },
    tag: "100% Traceable Single-Estate",
  },
];

export const roastStages = [
  {
    id: "green",
    name: "Living Green Cherry",
    phase: "Phase 01 · Raw Terroir",
    temp: "22°C",
    time: "00:00",
    color: "#6D8F5C",
    density: "730 g/L",
    description:
      "Dense, jade-colored seed containing 11.2% residual moisture. Tightly packed cellular structure holding organic chlorogenic acids, unfermented sugars, and the pure DNA of volcanic soil.",
    aromaNotes: ["Crushed Pine", "Fresh Straw", "Raw Sugar Cane", "Crisp Apple"],
    acousticFreq: "Silent · Absorption",
  },
  {
    id: "first-crack",
    name: "The First Crack",
    phase: "Phase 02 · Exothermic Pop",
    temp: "196°C",
    time: "08:45",
    color: "#A97A48",
    density: "610 g/L",
    description:
      "Steam pressure breaches the cell walls with an audible percussive snap. Starches caramelize into complex disaccharides; explosive jasmine florals and volatile fruit ethers are released.",
    aromaNotes: ["Wild Jasmine", "Blood Orange", "Marmalade", "Toasted Brioche"],
    acousticFreq: "3.4 kHz Auditory Crack",
  },
  {
    id: "golden",
    name: "Aditya Golden Roast",
    phase: "Phase 03 · Maison Signature",
    temp: "212°C",
    time: "11:15",
    color: "#C2893F",
    density: "540 g/L",
    description:
      "The zenith of equilibrium. Acidity is bright and crystalline; caramel sweetness is peaked before carbonization begins. Our master roaster drops the batch into the cooling tray to freeze the aromatic profile.",
    aromaNotes: ["Candied Bergamot", "Raw Acacia Honey", "Madagascar Vanilla", "Dark Cacao"],
    acousticFreq: "Drop Temperature Window",
  },
  {
    id: "dark",
    name: "Obsidian Reserve",
    phase: "Phase 04 · Noir Expression",
    temp: "228°C",
    time: "13:40",
    color: "#281710",
    density: "470 g/L",
    description:
      "Entering second crack, aromatic essential oils emerge to coat the surface with a glossy sheen. Bittersweet intensity, charred oak woodiness, and a velvety molasses resonance that lingers for minutes.",
    aromaNotes: ["Smoked Cacao Nibs", "Burnt Demerara", "Black Fig", "Spanish Cedar"],
    acousticFreq: "Second Micro-Crack",
  },
];

export const pourData = {
  title: "The Golden Pour",
  subtitle: "Symmetry of 9-Bar Hydrostatic Pressure",
  description:
    "We calibrate extraction down to the tenth of a second: 18.5 grams of ground volcanic bean saturated under 9 bars of hydrostatic pressure at precisely 93.5°C. The result is a tiger-striped crema bloom with microscopic lipid emulsions that coat the palate in liquid silk.",
  stats: [
    { value: "9.0", unit: "BAR", label: "Rotary Pump Pressure", detail: "Constant Hydro-Flow" },
    { value: "26.5", unit: "SEC", label: "Golden Extraction Window", detail: "Pre-infusion 4s" },
    { value: "93.5", unit: "°C", label: "Thermal Stability", detail: "PID Dual-Boiler" },
    { value: "1:2.1", unit: "RATIO", label: "Yield Target", detail: "18.5g in → 39g out" },
  ],
};

export const products = [
  {
    id: 1,
    name: "Aditya Reserve No. 1",
    subtitle: "Grand Cru Single-Plot · Lake Kivu",
    price: 48,
    weight: "250g",
    qScore: 96.4,
    roastLevel: "Signature Golden",
    process: "21-Day African Bed Natural",
    elevation: "2,150 MASL",
    lotNumber: "LOT AD-01",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1000&q=90&auto=format",
    tastingNotes: ["Wild Acacia Honey", "Blood Orange", "Bergamot", "Dark Cacao Nibs"],
    flavorTags: ["Complex", "Floral", "Velvety"],
    description:
      "Our crowning jewel. Hand-gathered from Plot No. 07 atop the Virunga ridge, dried on raised woven beds for 21 days with manual hourly turning. Notes of rare wild honey cascade into crystalline citrus vibrancy with an enduring dark chocolate finish.",
    grinds: ["Whole Bean (Recommended)", "Fine Espresso", "Chemex Filter", "French Press", "Cold Bloom"],
    radar: {
      fragrance: 9.8,
      sweetness: 9.7,
      acidity: 9.4,
      body: 9.6,
      balance: 9.7,
      cleanCup: 9.9,
    },
    recipe: {
      dose: "18.5g",
      water: "300g",
      temp: "93.5°C",
      grindSize: "Medium-Fine",
      time: "3m 15s",
    },
  },
  {
    id: 2,
    name: "Obsidian Noir",
    subtitle: "Volcanic Basalt Blend · Dark Reserve",
    price: 44,
    weight: "250g",
    qScore: 94.2,
    roastLevel: "Obsidian Dark",
    process: "Extended Washed & Cedar Cured",
    elevation: "1,980 MASL",
    lotNumber: "LOT AD-02",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=1000&q=90&auto=format",
    tastingNotes: ["Smoked Cacao", "Black Mission Fig", "Burnt Toffee", "Cuban Tobacco"],
    flavorTags: ["Bold", "Smoky", "Viscous"],
    description:
      "Named for the glassy volcanic stone forged in Virunga magma. Roasted past first crack until aromatic oils bead upon the surface. Unapologetically dense, opulent, and satisfying with an espresso crema that holds a sugar cube for 12 seconds.",
    grinds: ["Whole Bean (Recommended)", "Fine Espresso", "Moka Pot", "French Press"],
    radar: {
      fragrance: 9.3,
      sweetness: 9.1,
      acidity: 8.2,
      body: 9.9,
      balance: 9.4,
      cleanCup: 9.5,
    },
    recipe: {
      dose: "19.0g",
      water: "280g",
      temp: "92.0°C",
      grindSize: "Fine",
      time: "2m 50s",
    },
  },
  {
    id: 3,
    name: "Sun Mist Gesha",
    subtitle: "Cloud Forest Rare Varietal · Light Terroir",
    price: 58,
    weight: "200g",
    qScore: 97.2,
    roastLevel: "Ultra-Light Terroir",
    process: "Anaerobic Honey Ferment",
    elevation: "2,280 MASL",
    lotNumber: "LOT AD-03",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1000&q=90&auto=format",
    tastingNotes: ["White Nectarine", "Star Jasmine", "Meyer Lemon", "Lemongrass"],
    flavorTags: ["Ethereal", "Tea-Like", "Floral"],
    description:
      "From our highest and steepest micro-climate pocket where morning mist lingers past noon. Fermented in sealed stainless tanks under inert gas for 96 hours. Ultra-lightly roasted to let the ethereal Gesha florals shine through with pure tea-like delicacy.",
    grinds: ["Whole Bean (Recommended)", "Pour Over V60", "Chemex Filter", "Aeropress"],
    radar: {
      fragrance: 9.9,
      sweetness: 9.6,
      acidity: 9.8,
      body: 8.9,
      balance: 9.8,
      cleanCup: 10.0,
    },
    recipe: {
      dose: "15.0g",
      water: "250g",
      temp: "94.0°C",
      grindSize: "Medium",
      time: "3m 00s",
    },
  },
  {
    id: 4,
    name: "Cold Bloom Kyōto",
    subtitle: "18-Hour Slow Cold Dripped Elixir",
    price: 42,
    weight: "350ml",
    qScore: 94.8,
    roastLevel: "Special Kyōto Roast",
    process: "Ice-Drop Gravity Immersion",
    elevation: "2,050 MASL",
    lotNumber: "LOT AD-04",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1000&q=90&auto=format",
    tastingNotes: ["Cognac Truffle", "Madagascar Bourbon Vanilla", "Molasses", "Candied Walnut"],
    flavorTags: ["Silken", "Chilled", "Intoxicating"],
    description:
      "Extracted drop by single drop over 18 hours using ice-cold mountain spring water in handcrafted Japanese glass towers. Pure, viscous coffee liquor with zero perceived bitterness, delivering a rich chocolate liqueur mouthfeel.",
    grinds: ["Ready to Pour / Over Hand-Carved Ice"],
    radar: {
      fragrance: 9.2,
      sweetness: 9.8,
      acidity: 7.9,
      body: 9.8,
      balance: 9.6,
      cleanCup: 9.8,
    },
    recipe: {
      dose: "Ready to Drink",
      water: "Best served over a single clear ice sphere with 10ml cream",
      temp: "4.0°C",
      grindSize: "Pre-extracted",
      time: "Instant",
    },
  },
];

export const impactStats = [
  { value: 127, suffix: "", label: "Direct-Trade Partner Families", detail: "Equitable Long-Term Contracts" },
  { value: 68, suffix: "%", label: "Above Fair-Trade Pricing", detail: "Reinvested in Education & Health" },
  { value: 96.4, suffix: " Q", label: "Average Lot Cupping Score", detail: "Top 0.01% Global Production" },
  { value: 14, suffix: " Mo.", label: "Slow Maturation Cycle", detail: "High-Altitude Diurnal Shift" },
  { value: 4800, suffix: "+", label: "Native Canopy Trees Planted", detail: "Reforestation & Carbon Sink" },
  { value: 100, suffix: "%", label: "Traceable Single-Plot Lots", detail: "Farm-to-Cup Transparency" },
];

export const manifesto = {
  title: "The Aditya Manifesto",
  founder: "Aditya",
  role: "Founder & Master Roaster",
  quote:
    "We don't impose fire onto coffee. We calibrate heat as a conduit to unmask what the volcanic earth spent fourteen months composing.",
  body: `Coffee at this altitude is not an agricultural commodity; it is high-altitude viticulture. Each lot that arrives at our roastery represents thousands of hours of quiet devotion: volcanic soils shaped by ancient eruptions, generational families whose fingers know the exact day a cherry reaches its sugar peak, and nights cold enough to crystallize dew on emerald leaves.

At Maison Aditya, our philosophy is anchored in reverence. We never rush the Maillard curve. We listen for the percussive poetry of the first crack. And we drop each batch the second its origin character achieves harmonic balance.

Every cup you pour is a direct sensory tether to the high slopes of Lake Kivu. Welcome to the reserve.`,
  image:
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&q=90&auto=format",
};

export const footer = {
  tagline: "Roasted with Reverence. Brewed with Intention.",
  roasteries: [
    { city: "Geneva", country: "Switzerland", address: "Rue de la Corraterie 14" },
    { city: "Tokyo", country: "Japan", address: "Ginza 6-Chome 10-1" },
    { city: "New York", country: "United States", address: "540 W 25th St, Chelsea" },
    { city: "Goma & Kivu", country: "DR Congo", address: "Virunga Highland Mill" },
    { city: "London", country: "United Kingdom", address: "Burlington Arcade 22" },
  ],
  newsletter: {
    title: "The Aditya Roaster's Guild",
    badge: "Private Allocation",
    description:
      "By invitation only. Receive quarterly first-access cupping allocations, confidential lot harvest reports, and private cupping invitations with Founder Aditya.",
  },
  copyright: `© ${new Date().getFullYear()} MAISON ADITYA · All Rights Reserved. Grand Cru Coffee Roasters.`,
  socialLinks: [
    { label: "Instagram", href: "#" },
    { label: "Journal", href: "#" },
    { label: "Cupping Lab", href: "#" },
    { label: "Private Client Desk", href: "#" },
  ],
};
