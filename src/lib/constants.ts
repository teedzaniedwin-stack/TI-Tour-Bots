export const BOTSWANA_DISTRICTS = [
  "Central District",
  "Chobe District",
  "Ghanzi District",
  "Kgalagadi District",
  "Kgatleng District",
  "Kweneng District",
  "North-East District",
  "North-West District",
  "South-East District",
  "Southern District",
];

export const DISTRICT_PLACES: Record<string, string[]> = {
  "Central District": ["Serowe", "Palapye", "Mahalapye", "Bobonong", "Letlhakane"],
  "Chobe District": ["Kasane", "Kazungula", "Pandamatenga"],
  "Ghanzi District": ["Ghanzi", "Charles Hill"],
  "Kgalagadi District": ["Tsabong", "Hukuntsi", "Kang"],
  "Kgatleng District": ["Mochudi", "Oodi"],
  "Kweneng District": ["Molepolole", "Thamaga", "Mogoditshane"],
  "North-East District": ["Francistown", "Masunga"],
  "North-West District": ["Maun", "Shakawe", "Gumare"],
  "South-East District": ["Gaborone", "Ramotswa", "Tlokweng"],
  "Southern District": ["Kanye", "Lobatse", "Moshupa"],
};

export const BUSINESS_CATEGORIES = [
  "Safari Operator",
  "Hotel",
  "Lodge",
  "Guest House",
  "Restaurant",
  "Car Rental",
  "Aviation Tour Operator",
  "Tour Guide",
];

export const PACKAGES = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 0, 
    features: ['Business Listing', '1 Profile Photo', 'Contact Info'],
    limits: { photos: 1, videos: 0, videoSize: 0 }
  },
  { 
    id: 'standard', 
    name: 'Standard', 
    price: 1500, 
    features: ['Featured Listing', 'Up to 5 Photos', '1 Video (2.5MB)', 'Priority Support'],
    limits: { photos: 5, videos: 1, videoSize: 2.5 }
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 3500, 
    features: ['Top of Search', 'Up to 15 Photos', '3 Videos (4MB)', 'Analytics Dashboard', 'Verified Badge'],
    limits: { photos: 15, videos: 3, videoSize: 4.0 }
  }
];

export const COUNTRIES = [
  { name: "Botswana", code: "BW", continent: "Africa" },
  { name: "South Africa", code: "ZA", continent: "Africa" },
  { name: "United States", code: "US", continent: "North America" },
  { name: "United Kingdom", code: "GB", continent: "Europe" },
  { name: "Germany", code: "DE", continent: "Europe" },
  { name: "China", code: "CN", continent: "Asia" },
  { name: "Australia", code: "AU", continent: "Oceania" },
  { name: "Brazil", code: "BR", continent: "South America" },
  // ... more can be added
];

export const CONTINENTS = ["Africa", "Europe", "Asia", "North America", "South America", "Oceania", "Antarctica"];
