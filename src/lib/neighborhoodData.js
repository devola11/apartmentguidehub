// src/lib/neighborhoodData.js
// Realistic neighborhood data keyed by city.
// Walk scores are higher for dense/downtown areas, lower for suburban areas.
// Texas/Oklahoma metros generally have lower walk scores than dense NE cities.

const CITY_DATA = {
  // ── Texas ────────────────────────────────────────────────────────────────
  "Houston": {
    walkScore: 72, walkLabel: "Very Walkable",
    schools: ["Lamar High School", "Travis Elementary", "St. John's School"],
    transit: ["METRORail Red Line (0.2 mi)", "Route 82 Bus (0.1 mi)"],
    dining: ["Tex-Mex Cantinas", "Vietnamese Pho Houses", "Smoked BBQ Pits"],
  },
  "Texas": {
    walkScore: 70, walkLabel: "Very Walkable",
    schools: ["Lamar High School", "Travis Elementary", "St. John's School"],
    transit: ["METRORail Red Line (0.2 mi)", "Route 82 Bus (0.1 mi)"],
    dining: ["Tex-Mex Cantinas", "Smoked BBQ Pits", "Gulf Coast Seafood"],
  },
  "Dallas": {
    walkScore: 75, walkLabel: "Very Walkable",
    schools: ["Booker T. Washington HSPVA", "William B. Travis Academy", "Hockaday School"],
    transit: ["DART Light Rail (0.2 mi)", "Route 36 Bus (0.1 mi)"],
    dining: ["Uptown Steakhouses", "Korean BBQ Joints", "Deep Ellum Gastropubs"],
  },
  "Austin": {
    walkScore: 78, walkLabel: "Very Walkable",
    schools: ["Austin High School", "Bryker Woods Elementary", "St. Stephen's Episcopal"],
    transit: ["MetroRail Red Line (0.3 mi)", "Route 803 Rapid Bus (0.1 mi)"],
    dining: ["South Congress Food Trucks", "Craft Breweries", "Breakfast Taco Trailers"],
  },
  "San Antonio": {
    walkScore: 68, walkLabel: "Somewhat Walkable",
    schools: ["Brackenridge High School", "Bonham Academy", "Saint Mary's Hall"],
    transit: ["VIA Primo Bus (0.2 mi)", "Route 3 Bus (0.1 mi)"],
    dining: ["River Walk Restaurants", "Authentic Mexican Cocinas", "Pearl District Eateries"],
  },
  "Fort Worth": {
    walkScore: 65, walkLabel: "Somewhat Walkable",
    schools: ["Paschal High School", "Tanglewood Elementary", "All Saints' Episcopal"],
    transit: ["TRE Commuter Rail (0.3 mi)", "Trinity Metro Route 2 (0.1 mi)"],
    dining: ["Stockyards Steakhouses", "Magnolia Ave Bistros", "Tex-Mex Patios"],
  },
  "El Paso": {
    walkScore: 62, walkLabel: "Somewhat Walkable",
    schools: ["Coronado High School", "Mesita Elementary", "Cathedral High School"],
    transit: ["Sun Metro Brio (0.2 mi)", "Route 8 Bus (0.1 mi)"],
    dining: ["Mexican Mole Restaurants", "Border Sonoran Hot Dogs", "Mission Trail Cafés"],
  },
  "Arlington": {
    walkScore: 55, walkLabel: "Somewhat Walkable",
    schools: ["Martin High School", "Lamar High School", "Oakridge School"],
    transit: ["VIA On-Demand Rideshare (0.2 mi)", "Route 1 Bus (0.3 mi)"],
    dining: ["Stadium District Sports Bars", "Vietnamese Bánh Mì Shops", "Chain Steakhouses"],
  },
  "Plano": {
    walkScore: 50, walkLabel: "Car-Dependent",
    schools: ["Plano Senior High", "Shepton High School", "Prince of Peace Catholic"],
    transit: ["DART Red Line (0.4 mi)", "Route 347 Bus (0.2 mi)"],
    dining: ["Legacy West Restaurants", "Asian Fusion Bistros", "Suburban Brunch Spots"],
  },
  "Frisco": {
    walkScore: 48, walkLabel: "Car-Dependent",
    schools: ["Frisco High School", "Wakeland High School", "Legacy Christian Academy"],
    transit: ["DART Bus 360 (0.4 mi)", "Frisco Connect Shuttle (0.2 mi)"],
    dining: ["The Star District Eateries", "Sushi Bars", "Sports Bar Chains"],
  },
  "Irving": {
    walkScore: 58, walkLabel: "Somewhat Walkable",
    schools: ["Irving High School", "MacArthur High School", "Cistercian Preparatory"],
    transit: ["DART Orange Line (0.3 mi)", "Route 229 Bus (0.1 mi)"],
    dining: ["Las Colinas Restaurants", "Indian Tandoor Houses", "Tex-Mex Cantinas"],
  },
  "McKinney": {
    walkScore: 52, walkLabel: "Somewhat Walkable",
    schools: ["McKinney High School", "Boyd High School", "Imagine International Academy"],
    transit: ["DART Bus 208 (0.4 mi)", "McKinney Avenue Trolley (0.2 mi)"],
    dining: ["Historic Downtown Square Cafés", "Texas BBQ Smokers", "Boutique Wine Bars"],
  },
  "Corpus Christi": {
    walkScore: 48, walkLabel: "Car-Dependent",
    schools: ["Carroll High School", "King High School", "Incarnate Word Academy"],
    transit: ["CCRTA Route 5 Bus (0.2 mi)", "Harbor Ferry (0.5 mi)"],
    dining: ["Bayfront Seafood Grills", "Tex-Mex Mariscos", "Beach Bars"],
  },
  "Lubbock": {
    walkScore: 45, walkLabel: "Car-Dependent",
    schools: ["Lubbock High School", "Coronado High School", "Trinity Christian School"],
    transit: ["Citibus Route 4 (0.2 mi)", "Texas Tech Shuttle (0.1 mi)"],
    dining: ["West Texas Steakhouses", "Tex-Mex Enchiladas", "College Bars"],
  },

  // ── Oklahoma ─────────────────────────────────────────────────────────────
  "Oklahoma City": {
    walkScore: 60, walkLabel: "Somewhat Walkable",
    schools: ["Classen School of Advanced Studies", "Wilson Elementary", "Casady School"],
    transit: ["OKC Streetcar (0.2 mi)", "EMBARK Route 5 Bus (0.1 mi)"],
    dining: ["Bricktown Steakhouses", "Vietnamese District Pho", "BBQ Joints"],
  },
  "Oklahoma": {
    walkScore: 58, walkLabel: "Somewhat Walkable",
    schools: ["Classen School of Advanced Studies", "Wilson Elementary", "Casady School"],
    transit: ["OKC Streetcar (0.2 mi)", "EMBARK Route 5 Bus (0.1 mi)"],
    dining: ["Bricktown Steakhouses", "BBQ Joints", "Native Fry Bread Stands"],
  },
  "Tulsa": {
    walkScore: 62, walkLabel: "Somewhat Walkable",
    schools: ["Booker T. Washington HS", "Edison Preparatory", "Holland Hall School"],
    transit: ["Tulsa Transit Route 100 (0.2 mi)", "BRT Aero Line (0.1 mi)"],
    dining: ["Cherry Street Bistros", "Brady Arts District Pubs", "Soul Food Diners"],
  },
  "Norman": {
    walkScore: 55, walkLabel: "Somewhat Walkable",
    schools: ["Norman High School", "Norman North High", "Community Christian School"],
    transit: ["CART Route 11 (0.2 mi)", "OU Crimson Cruiser (0.1 mi)"],
    dining: ["Campus Corner Restaurants", "Craft Breweries", "OK Steakhouses"],
  },
  "Edmond": {
    walkScore: 50, walkLabel: "Car-Dependent",
    schools: ["Edmond Memorial HS", "Edmond North HS", "Oklahoma Christian School"],
    transit: ["Citylink Edmond Route A (0.3 mi)", "EMBARK 023 Bus (0.4 mi)"],
    dining: ["Downtown Edmond Eateries", "Italian Trattorias", "Suburban Coffee Shops"],
  },
  "Broken Arrow": {
    walkScore: 45, walkLabel: "Car-Dependent",
    schools: ["Broken Arrow Senior High", "Oneta Ridge Middle", "Lincoln Christian School"],
    transit: ["Tulsa Transit Route 219 (0.4 mi)", "Rose District Trolley (0.3 mi)"],
    dining: ["Rose District Cafés", "Family Steakhouses", "BBQ Smokehouses"],
  },
  "Lawton": {
    walkScore: 42, walkLabel: "Car-Dependent",
    schools: ["Lawton High School", "Eisenhower High School", "St. Mary's Catholic School"],
    transit: ["LATS Route 4 Bus (0.3 mi)", "Fort Sill Shuttle (0.5 mi)"],
    dining: ["Cattlemen's Steakhouses", "Korean BBQ", "Fort Sill Diners"],
  },
  "Stillwater": {
    walkScore: 58, walkLabel: "Somewhat Walkable",
    schools: ["Stillwater High School", "Stillwater Junior High", "Sangre Ridge Elementary"],
    transit: ["Stillwater Transit Route 1 (0.2 mi)", "OSU Orange Line (0.1 mi)"],
    dining: ["The Strip Bars", "Eskimo Joe's", "Campus Coffee Shops"],
  },
  "Moore": {
    walkScore: 46, walkLabel: "Car-Dependent",
    schools: ["Moore High School", "Westmoore High School", "Southlake Christian Academy"],
    transit: ["EMBARK Route 24 Bus (0.4 mi)", "I-35 Park & Ride (0.5 mi)"],
    dining: ["Suburban Tex-Mex", "Chain Steakhouses", "Family Diners"],
  },
  "Enid": {
    walkScore: 44, walkLabel: "Car-Dependent",
    schools: ["Enid High School", "Chisholm High School", "Oklahoma Bible Academy"],
    transit: ["Enid Transit (0.4 mi)", "Vance AFB Shuttle (0.5 mi)"],
    dining: ["Downtown Square Diners", "Mexican Cantinas", "Wheat Country Cafés"],
  },
  "Bartlesville": {
    walkScore: 48, walkLabel: "Car-Dependent",
    schools: ["Bartlesville High School", "Central Middle School", "Wesleyan Christian School"],
    transit: ["Bartlesville Public Transit (0.4 mi)", "Phillips 66 Shuttle (0.3 mi)"],
    dining: ["Frank Phillips Boulevard Eateries", "Frontier Steakhouses", "Local Coffee Shops"],
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
