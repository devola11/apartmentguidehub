// src/lib/neighborhoodData.js
// Realistic neighborhood data keyed by city.
// Walk scores are higher for dense/downtown areas, lower for suburban areas.
// NYC areas have very high walk scores (85-98).

const CITY_DATA = {
  // ── New York ──────────────────────────────────────────────────────────────
  "Manhattan": {
    walkScore: 97, walkLabel: "Walker's Paradise",
    schools: ["Stuyvesant High School", "PS 6 Lillie D. Blake", "Trinity School"],
    transit: ["Subway 4/5/6 (0.1 mi)", "Crosstown M86 Bus (0.1 mi)"],
    dining: ["Upscale Steakhouses", "Pizza by the Slice", "Dim Sum Parlors"],
  },
  "New York": {
    walkScore: 97, walkLabel: "Walker's Paradise",
    schools: ["Stuyvesant High School", "PS 6 Lillie D. Blake", "Trinity School"],
    transit: ["Subway 4/5/6 (0.1 mi)", "Crosstown M86 Bus (0.1 mi)"],
    dining: ["Upscale Steakhouses", "Pizza by the Slice", "Dim Sum Parlors"],
  },
  "Brooklyn": {
    walkScore: 91, walkLabel: "Walker's Paradise",
    schools: ["Brooklyn Tech High", "PS 321 William Penn", "Saint Ann's School"],
    transit: ["Subway F/G (0.2 mi)", "B41 Bus (0.1 mi)"],
    dining: ["Farm-to-Table Bistros", "Artisan Pizza", "Caribbean Jerk Spots"],
  },
  "Queens": {
    walkScore: 86, walkLabel: "Very Walkable",
    schools: ["Townsend Harris High", "PS 122 Mamie Fay", "The Scholar's Academy"],
    transit: ["Subway N/W (0.2 mi)", "Q69 Bus (0.1 mi)"],
    dining: ["Greek Tavernas", "Colombian Bakeries", "Thai Street Food"],
  },
  "Astoria": {
    walkScore: 90, walkLabel: "Walker's Paradise",
    schools: ["Frank Sinatra School of the Arts", "PS 122 Mamie Fay", "Long Island City STEAM Academy"],
    transit: ["Subway N/W (0.2 mi)", "Q69 Bus (0.1 mi)"],
    dining: ["Greek Tavernas", "Egyptian Bakeries", "Craft Cocktail Bars"],
  },
  "Williamsburg": {
    walkScore: 93, walkLabel: "Walker's Paradise",
    schools: ["Brooklyn Latin School", "PS 84 José de Diego", "Williamsburg Prep"],
    transit: ["Subway L (0.1 mi)", "B62 Bus (0.1 mi)"],
    dining: ["Smoked Meat Spots", "Rooftop Bars", "Artisan Coffee Roasters"],
  },
  "Long Island City": {
    walkScore: 89, walkLabel: "Very Walkable",
    schools: ["Hunters Point Community MS", "PS 1 Alfred E. Smith", "WNYC Studios Academy"],
    transit: ["Subway 7 (0.2 mi)", "NYC Ferry (0.3 mi)"],
    dining: ["Waterfront Breweries", "Modern Korean", "Food Halls"],
  },
  "Park Slope": {
    walkScore: 95, walkLabel: "Walker's Paradise",
    schools: ["MS 51 William Alexander", "PS 321 William Penn", "Berkeley Carroll School"],
    transit: ["Subway F/G (0.2 mi)", "B67 Bus (0.1 mi)"],
    dining: ["5th Ave Brunch Spots", "Prospect Park Cafés", "Organic Juice Bars"],
  },
  "Bushwick": {
    walkScore: 88, walkLabel: "Very Walkable",
    schools: ["Bushwick School for Social Justice", "PS 123 Suydam", "Academy of Urban Planning"],
    transit: ["Subway M/L (0.2 mi)", "B60 Bus (0.1 mi)"],
    dining: ["Trendy Taco Spots", "Gallery Cafés", "Craft Breweries"],
  },
  "Harlem": {
    walkScore: 92, walkLabel: "Walker's Paradise",
    schools: ["Frederick Douglass Academy", "PS 185 John M. Langston", "Thurgood Marshall Academy"],
    transit: ["Subway A/B/C/D (0.2 mi)", "M7 Bus (0.1 mi)"],
    dining: ["Soul Food Restaurants", "West African Cuisine", "Jazz Club Lounges"],
  },
  "Upper East Side": {
    walkScore: 96, walkLabel: "Walker's Paradise",
    schools: ["Dalton School", "PS 6 Lillie D. Blake", "Chapin School"],
    transit: ["Subway 4/5/6 (0.1 mi)", "M79 Crosstown Bus (0.1 mi)"],
    dining: ["Madison Ave Cafés", "French Bistros", "Classic Delis"],
  },
  "Upper West Side": {
    walkScore: 96, walkLabel: "Walker's Paradise",
    schools: ["Trinity School", "PS 87 William Sherman", "Collegiate School"],
    transit: ["Subway 1/2/3 (0.1 mi)", "M104 Bus (0.1 mi)"],
    dining: ["Columbus Ave Brunch", "Zabar's Deli", "Lincoln Center Dining"],
  },
  "Bronx": {
    walkScore: 78, walkLabel: "Very Walkable",
    schools: ["Bronx Science High", "PS 75 School of Research", "Riverdale Country School"],
    transit: ["Subway 4/5/6 (0.3 mi)", "Bx1 Bus (0.1 mi)"],
    dining: ["Dominican Restaurants", "Italian Delis on Arthur Ave", "Jamaican Patty Shops"],
  },
  "Staten Island": {
    walkScore: 58, walkLabel: "Somewhat Walkable",
    schools: ["Tottenville High School", "PS 48 William G. Wilcox", "Staten Island Academy"],
    transit: ["Staten Island Ferry (0.5 mi)", "SIR Train (0.3 mi)"],
    dining: ["Waterfront Seafood", "Italian Red-Sauce Joints", "Sri Lankan Cuisine"],
  },

  // ── New Jersey ────────────────────────────────────────────────────────────
  "Jersey City": {
    walkScore: 87, walkLabel: "Very Walkable",
    schools: ["McNair Academic High", "PS 3 Dr. Ronald McNair", "Stevens Cooperative School"],
    transit: ["PATH Train (0.2 mi)", "Hudson-Bergen Light Rail (0.3 mi)"],
    dining: ["India Square Restaurants", "Waterfront Steakhouses", "Filipino Bakeries"],
  },
  "Hoboken": {
    walkScore: 94, walkLabel: "Walker's Paradise",
    schools: ["Hoboken High School", "All Saints Episcopal Day School", "Stevens Cooperative School"],
    transit: ["PATH Train (0.2 mi)", "NJ Transit Bus 126 (0.1 mi)"],
    dining: ["Washington St Restaurants", "Italian Delis", "Craft Beer Bars"],
  },
  "Newark": {
    walkScore: 80, walkLabel: "Very Walkable",
    schools: ["Science Park High School", "Robert Treat Academy", "Newark Academy"],
    transit: ["PATH Train (0.3 mi)", "NJ Transit (0.2 mi)"],
    dining: ["Ironbound Portuguese", "Brazilian Steakhouses", "Spanish Tapas Bars"],
  },
  "Paterson": {
    walkScore: 74, walkLabel: "Very Walkable",
    schools: ["Eastside High School", "Paterson Academy", "PANTHER Academy"],
    transit: ["NJ Transit Bus 161 (0.2 mi)", "Paterson Station (0.5 mi)"],
    dining: ["Turkish Kebab Houses", "Arabic Bakeries", "Peruvian Chicken Spots"],
  },
  "Elizabeth": {
    walkScore: 72, walkLabel: "Very Walkable",
    schools: ["Elizabeth High School", "Thomas Jefferson Arts Academy", "Elmora Hills Elementary"],
    transit: ["NJ Transit Elizabeth Station (0.3 mi)", "Bus 113 (0.1 mi)"],
    dining: ["Colombian Restaurants", "Portuguese Bakeries", "Cuban Sandwich Shops"],
  },
  "New Brunswick": {
    walkScore: 82, walkLabel: "Very Walkable",
    schools: ["New Brunswick High School", "Rutgers Preparatory School", "Christ the King Elementary"],
    transit: ["NJ Transit Train (0.2 mi)", "Rutgers Bus (0.1 mi)"],
    dining: ["George St Restaurants", "Pho Houses", "College Town Brewpubs"],
  },
  "Trenton": {
    walkScore: 68, walkLabel: "Somewhat Walkable",
    schools: ["Trenton Central High", "Foundation Collegiate Academy", "Trenton Catholic Academy"],
    transit: ["NJ Transit Trenton Station (0.3 mi)", "SEPTA R-Line (0.3 mi)"],
    dining: ["Italian Red-Sauce Joints", "Dominican Cafés", "State House District Pubs"],
  },
  "Princeton": {
    walkScore: 79, walkLabel: "Very Walkable",
    schools: ["Princeton High School", "Princeton Day School", "The Lawrenceville School"],
    transit: ["Princeton Dinky Train (0.3 mi)", "NJ Transit Bus 606 (0.2 mi)"],
    dining: ["Nassau St Bistros", "Farm-to-Table Restaurants", "Ivy League Coffee Shops"],
  },
  "Morristown": {
    walkScore: 76, walkLabel: "Very Walkable",
    schools: ["Morristown High School", "Morristown-Beard School", "Assumption School"],
    transit: ["NJ Transit Morristown Station (0.2 mi)", "Bus MCM1 (0.1 mi)"],
    dining: ["The Green Restaurants", "South St Gastropubs", "Artisan Bakeries"],
  },
  "Atlantic City": {
    walkScore: 70, walkLabel: "Very Walkable",
    schools: ["Atlantic City High School", "Sovereign Ave School", "Our Lady Star of the Sea"],
    transit: ["NJ Transit Atlantic City Line (0.3 mi)", "Jitney Bus (0.1 mi)"],
    dining: ["Boardwalk Seafood", "Casino Fine Dining", "Italian Trattorias"],
  },
};

// Deterministic fallback for any unlisted city
const DEFAULT = {
  walkScore: 65, walkLabel: "Somewhat Walkable",
  schools: ["Neighborhood Elementary", "City High School", "Regional Academy"],
  transit: ["Bus Stop (0.3 mi)", "Transit Center (0.8 mi)"],
  dining: ["Local Cafés", "Pizza & Pasta", "Fast Casual Grills"],
};

export function getNeighborhoodData(city) {
  return CITY_DATA[city] || DEFAULT;
}

export function getWalkScoreColor(score) {
  if (score >= 70) return { bg: "#E8F5E9", ring: "#4CAF50", text: "#2E7D32" };
  if (score >= 50) return { bg: "#FFF8E1", ring: "#FFC107", text: "#F57F17" };
  return { bg: "#FFEBEE", ring: "#F44336", text: "#C62828" };
}
