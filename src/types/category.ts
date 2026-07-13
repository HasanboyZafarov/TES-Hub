const CATEGORIES = [
  "Crop Production",
  "Livestock",
  "Irrigation",
  "Soil Health",
  "Agribusiness",
  "Organic Farming",
  "Pest Management",
  "Climate & Weather",
] as const;



export type Category = (typeof CATEGORIES)[number];

export default CATEGORIES;
