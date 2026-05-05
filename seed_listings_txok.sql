-- seed_listings_txok.sql
-- 60 listings: 10 studios · 25 one-bedrooms · 25 two-bedrooms
-- 30 Texas · 30 Oklahoma
--
-- Run in your Supabase SQL Editor.
-- This script DELETES all existing data (listings, favorites, inquiries,
-- property_images) and inserts 60 new TX/OK listings.
--
-- The image_group column is preserved from the original 60 listings so
-- the existing property_images rows can be reassigned to new listing IDs.

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 0 — Clean slate: delete all dependent rows, then listings
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM property_images;
DELETE FROM favorites;
DELETE FROM inquiries;
TRUNCATE TABLE listings RESTART IDENTITY CASCADE;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1 — Insert 60 new listings (30 TX + 30 OK)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO listings (
  title, description, address, city, state, zip,
  price, bedrooms, bathrooms, sqft,
  latitude, longitude, image_url, amenities, image_group
) VALUES

-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDIOS (10) — 5 TX · 5 OK
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1 · Houston Downtown · TX
('Skyhouse Houston Studio',
 'Modern studio in the heart of downtown Houston with floor-to-ceiling windows and city skyline views. Steps from Discovery Green, Toyota Center, and the METRORail. Building features a sky lounge, resort-style pool, and 24-hour fitness center.',
 '1625 Main St', 'Houston', 'Texas', '77002',
 1300, 0, 1, 480, 29.7560, -95.3680, '',
 ARRAY['Pool','Gym','Concierge','Elevator','Central AC','Rooftop Deck'],
 'Studio 144-50 25th Rd'),

-- 2 · Dallas Uptown · TX
('Uptown Dallas Studio',
 'Stylish studio just off McKinney Avenue in Uptown Dallas, walking distance to Klyde Warren Park and the Dallas Arts District. Bright open layout with quartz countertops and stainless appliances. Building has a saltwater pool and 24-hour gym.',
 '2950 McKinney Ave', 'Dallas', 'Texas', '75204',
 1250, 0, 1, 460, 32.7975, -96.8005, '',
 ARRAY['Pool','Gym','Elevator','Central AC','In-Unit Laundry'],
 'Brownsville Transit Village V'),

-- 3 · Austin Downtown · TX
('Rainey Street Studio',
 'Designer studio on Rainey Street in downtown Austin, steps from Lady Bird Lake and the bar district. Floor-to-ceiling windows with downtown views. Building amenities include a rooftop pool, dog park, and co-working lounge.',
 '70 Rainey St', 'Austin', 'Texas', '78701',
 1450, 0, 1, 500, 30.2585, -97.7395, '',
 ARRAY['Pool','Gym','Concierge','Rooftop Deck','Pet Friendly','Central AC'],
 'Studio 275 Fontaine Parc'),

-- 4 · San Antonio Pearl · TX
('Pearl District Studio',
 'Boutique studio in the Pearl District, San Antonio''s most walkable neighborhood. Steps from the Pearl Brewery, San Antonio Museum of Art, and the Riverwalk extension. Polished concrete floors and exposed-brick accents.',
 '320 E Grayson St', 'San Antonio', 'Texas', '78215',
 1100, 0, 1, 470, 29.4435, -98.4810, '',
 ARRAY['Gym','Elevator','Central AC','In-Unit Laundry'],
 'Studio 1318 E 58th St #1'),

-- 5 · Fort Worth Downtown · TX
('Sundance Square Studio',
 'Compact studio steps from Sundance Square in downtown Fort Worth. Walk to Bass Performance Hall, the Modern Art Museum shuttle, and dozens of restaurants. Secure entry with key-fob access and on-site fitness center.',
 '425 Houston St', 'Fort Worth', 'Texas', '76102',
 1000, 0, 1, 440, 32.7530, -97.3320, '',
 ARRAY['Gym','Elevator','Central AC','Doorman'],
 'Ardmore-Ca'),

-- 6 · Oklahoma City Midtown · OK
('Midtown OKC Studio',
 'Bright studio in OKC''s Midtown district, blocks from the Plaza District nightlife and Scissortail Park. Open kitchen with quartz counters, refinished hardwood floors, and oversized windows. Pet-friendly with on-site dog wash.',
 '1010 NW 10th St', 'Oklahoma City', 'Oklahoma', '73106',
 850, 0, 1, 460, 35.4810, -97.5150, '',
 ARRAY['Pet Friendly','Gym','Central AC','In-Unit Laundry'],
 'Studio The Halldale'),

-- 7 · Tulsa Brady Arts · OK
('Brady Arts District Studio',
 'Loft-style studio in Tulsa''s Brady Arts District with exposed-brick walls and 12-foot ceilings. Steps from Cain''s Ballroom, Guthrie Green, and dozens of galleries. Restored historic building with modern interior finishes.',
 '301 N Main St', 'Tulsa', 'Oklahoma', '74103',
 800, 0, 1, 480, 36.1640, -95.9950, '',
 ARRAY['Elevator','Central AC','Hardwood Floors'],
 'Studio Seven Lions Apartments'),

-- 8 · Norman Campus · OK
('Campus Corner Studio',
 'Cozy studio steps from Campus Corner and the University of Oklahoma. Updated kitchen, in-unit laundry, and a private balcony overlooking the leafy oak-lined streets. Walking distance to the OU football stadium and Lloyd Noble Center.',
 '755 Asp Ave', 'Norman', 'Oklahoma', '73069',
 750, 0, 1, 430, 35.2105, -97.4445, '',
 ARRAY['In-Unit Laundry','Balcony','Central AC','Pet Friendly'],
 'CONDO HOLDINGS'),

-- 9 · Edmond Downtown · OK
('Downtown Edmond Studio',
 'Modern studio in downtown Edmond with quick access to UCO and the Edmond Festival Marketplace. Building includes a community courtyard, fitness center, and covered parking. Wood-look flooring throughout.',
 '14 N Broadway', 'Edmond', 'Oklahoma', '73034',
 820, 0, 1, 450, 35.6540, -97.4790, '',
 ARRAY['Gym','Covered Parking','Central AC','Elevator'],
 'Studio Countyline Apartments'),

-- 10 · Stillwater Campus · OK
('Stillwater University Studio',
 'Affordable studio just two blocks from the Oklahoma State University campus. Newly renovated with stainless appliances and luxury vinyl plank flooring. On-site laundry, fitness center, and resident lounge.',
 '624 W University Ave', 'Stillwater', 'Oklahoma', '74074',
 700, 0, 1, 420, 36.1180, -97.0610, '',
 ARRAY['Gym','Laundry On-Site','Central AC','Near Transit'],
 '461 Dean'),

-- ═══════════════════════════════════════════════════════════════════════════════
-- ONE-BEDROOMS (25) — 13 TX · 12 OK
-- ═══════════════════════════════════════════════════════════════════════════════

-- 11 · Houston Montrose · TX
('Montrose 1BR Loft',
 'Spacious one-bedroom in Montrose, Houston''s most eclectic neighborhood. Open floor plan with concrete floors, large windows, and an updated kitchen. Walking distance to the Menil Collection, Rothko Chapel, and Westheimer Road.',
 '1715 Westheimer Rd', 'Houston', 'Texas', '77006',
 1700, 1, 1, 720, 29.7430, -95.3920, '',
 ARRAY['Pool','Gym','Pet Friendly','Central AC','In-Unit Laundry'],
 '1031 Clinton St #5B'),

-- 12 · Dallas Deep Ellum · TX
('Deep Ellum 1BR',
 'Industrial-chic one-bedroom in Deep Ellum, the heart of Dallas nightlife and live music. Polished concrete floors, exposed ductwork, and a private balcony. Steps from the Bomb Factory, Trees, and dozens of murals.',
 '2828 Main St', 'Dallas', 'Texas', '75226',
 1650, 1, 1, 700, 32.7843, -96.7780, '',
 ARRAY['Gym','Balcony','Pet Friendly','Central AC','Rooftop Deck'],
 'Artem'),

-- 13 · Austin South Congress · TX
('SoCo 1BR with Hill Views',
 'Stylish one-bedroom on South Congress with hill country views from the private balcony. Walk to South Congress Hotel, Home Slice Pizza, and Continental Club. Building features a pool deck and EV charging stations.',
 '1717 S Congress Ave', 'Austin', 'Texas', '78704',
 2100, 1, 1, 740, 30.2470, -97.7510, '',
 ARRAY['Pool','Gym','Balcony','EV Charging','Central AC','Pet Friendly'],
 '111 Lincoln St unit 3rd Fl'),

-- 14 · San Antonio Southtown · TX
('Southtown Arts District 1BR',
 'Modern one-bedroom in San Antonio''s Southtown Arts District, known for First Friday gallery walks and Blue Star Contemporary. Stainless appliances, quartz counters, and large walk-in closet. Easy walk to the Riverwalk.',
 '1414 S Alamo St', 'San Antonio', 'Texas', '78210',
 1500, 1, 1, 760, 29.4090, -98.4905, '',
 ARRAY['Gym','Pool','Central AC','Walk-In Closet'],
 'Bay Pointe Apartments'),

-- 15 · Fort Worth Cultural District · TX
('Cultural District 1BR',
 'Bright one-bedroom in Fort Worth''s Cultural District, walking distance to the Kimbell Art Museum and the Modern. Updated kitchen, in-unit laundry, and dedicated workspace nook. Quiet tree-lined street with covered parking.',
 '3200 W 7th St', 'Fort Worth', 'Texas', '76107',
 1400, 1, 1, 720, 32.7470, -97.3635, '',
 ARRAY['Covered Parking','In-Unit Laundry','Central AC','Pet Friendly'],
 'Central Apartments'),

-- 16 · El Paso West · TX
('Mesa Hills 1BR',
 'Comfortable one-bedroom near UTEP and the Franklin Mountains, with mountain views from the patio. Recently renovated with new flooring, lighting, and appliances. Community pool, gym, and gated access.',
 '6800 N Mesa St', 'El Paso', 'Texas', '79912',
 1100, 1, 1, 700, 31.8170, -106.5360, '',
 ARRAY['Pool','Gym','Gated Access','Central AC','Mountain View'],
 'Chesapeake Apartments'),

-- 17 · Arlington Entertainment District · TX
('Stadium District 1BR',
 'Modern one-bedroom near AT&T Stadium, Globe Life Field, and Six Flags. Walking distance to game-day restaurants and the Texas Live! entertainment complex. Building includes a resort-style pool and outdoor grill stations.',
 '1100 Ballpark Way', 'Arlington', 'Texas', '76011',
 1450, 1, 1, 740, 32.7510, -97.0820, '',
 ARRAY['Pool','Gym','Grill Stations','Central AC','Pet Friendly'],
 'Country Creek'),

-- 18 · Plano Legacy West · TX
('Legacy West 1BR',
 'Upscale one-bedroom at Legacy West with floor-to-ceiling windows and chef''s kitchen. Steps from the Shops at Legacy, Toyota North America HQ, and dozens of restaurants. Resort-style amenities including dog spa and rooftop pool.',
 '7300 Bishop Rd', 'Plano', 'Texas', '75024',
 1700, 1, 1, 760, 33.0790, -96.8270, '',
 ARRAY['Pool','Gym','Dog Spa','Rooftop Deck','Concierge','Central AC'],
 'Liberty Station Apartments'),

-- 19 · Frisco The Star · TX
('The Star 1BR',
 'Luxury one-bedroom near The Star, the Dallas Cowboys'' world headquarters and entertainment district. Quartz counters, smart-home thermostat, and a balcony with view of the practice fields. Resort pool and 24-hour fitness center.',
 '6750 Winning Dr', 'Frisco', 'Texas', '75034',
 1850, 1, 1, 780, 33.0985, -96.8345, '',
 ARRAY['Pool','Gym','Smart Home','Balcony','Central AC','Concierge'],
 'Executive House Apartments'),

-- 20 · McKinney Historic Square · TX
('Historic McKinney 1BR',
 'Charming one-bedroom in a historic building one block from McKinney''s town square. Original hardwood floors, exposed brick, and 10-foot ceilings. Walk to local coffee shops, antiques stores, and weekend farmers market.',
 '110 W Louisiana St', 'McKinney', 'Texas', '75069',
 1500, 1, 1, 740, 33.1980, -96.6155, '',
 ARRAY['Hardwood Floors','Central AC','Near Transit','Pet Friendly'],
 'Chateaugay Apartments'),

-- 21 · Irving Las Colinas · TX
('Las Colinas Canal 1BR',
 'Waterfront one-bedroom on the Las Colinas canal with views of the iconic Mustangs sculpture. Walking distance to Toyota Music Factory and the DART Orange Line. Building has a marina-side pool and outdoor lounge.',
 '500 W Las Colinas Blvd', 'Irving', 'Texas', '75039',
 1550, 1, 1, 740, 32.8770, -96.9430, '',
 ARRAY['Pool','Gym','Water View','Near Transit','Central AC'],
 'Park Vanowen Apartments'),

-- 22 · Lubbock Tech Terrace · TX
('Tech Terrace 1BR',
 'Quiet one-bedroom in the Tech Terrace neighborhood, a short bike ride to Texas Tech University. Updated kitchen with shaker cabinets and granite counters. Covered parking, on-site laundry, and a fenced backyard area.',
 '2415 21st St', 'Lubbock', 'Texas', '79411',
 1100, 1, 1, 720, 33.5730, -101.8830, '',
 ARRAY['Covered Parking','Laundry On-Site','Central AC','Pet Friendly'],
 'Telegraph Hill'),

-- 23 · Corpus Christi Bayfront · TX
('Bayfront 1BR with Gulf Views',
 'One-bedroom with sweeping Corpus Christi Bay views from the private balcony. Walk to the USS Lexington, the Texas State Aquarium, and Mirador overlook. Pool, fitness center, and direct beach access via the seawall path.',
 '600 Shoreline Blvd', 'Corpus Christi', 'Texas', '78401',
 1250, 1, 1, 740, 27.8000, -97.3915, '',
 ARRAY['Pool','Gym','Water View','Balcony','Central AC'],
 '105 Elmont St unit 1'),

-- 24 · Oklahoma City Bricktown · OK
('Bricktown Canal 1BR',
 'Renovated one-bedroom along the Bricktown canal in downtown OKC. Steps from the Bricktown Ballpark, Chickasaw Bricktown Theatre, and the Oklahoma River trails. Exposed-brick walls and a chef''s kitchen with island seating.',
 '125 E Sheridan Ave', 'Oklahoma City', 'Oklahoma', '73104',
 1100, 1, 1, 720, 35.4660, -97.5085, '',
 ARRAY['Gym','Elevator','Central AC','In-Unit Laundry'],
 'Lebanon Vue'),

-- 25 · Tulsa Cherry Street · OK
('Cherry Street 1BR',
 'Cozy one-bedroom on Cherry Street, Tulsa''s premier dining and entertainment corridor. Walk to dozens of independent restaurants, boutiques, and the weekly farmers market. Refurbished hardwood floors and modern appliances.',
 '1325 E 15th St', 'Tulsa', 'Oklahoma', '74120',
 1000, 1, 1, 700, 36.1395, -95.9755, '',
 ARRAY['Hardwood Floors','In-Unit Laundry','Central AC','Pet Friendly'],
 'Greenway Flats Apartments'),

-- 26 · Norman East Side · OK
('East Norman 1BR',
 'Updated one-bedroom in a quiet residential pocket of east Norman, minutes from Lake Thunderbird and the OU campus. Spacious living area, walk-in closet, and private patio. Community pool and gated entry.',
 '1820 24th Ave SE', 'Norman', 'Oklahoma', '73071',
 900, 1, 1, 720, 35.1955, -97.4115, '',
 ARRAY['Pool','Gated Access','Walk-In Closet','Central AC','Pet Friendly'],
 'Green Meadows'),

-- 27 · Broken Arrow Rose District · OK
('Rose District 1BR',
 'Bright one-bedroom in the heart of Broken Arrow''s Rose District. Walk to local breweries, the Performing Arts Center, and weekend events on Main Street. Modern kitchen, in-unit laundry, and a covered parking spot.',
 '110 S Main St', 'Broken Arrow', 'Oklahoma', '74012',
 950, 1, 1, 720, 36.0530, -95.7900, '',
 ARRAY['Covered Parking','In-Unit Laundry','Central AC','Elevator'],
 'Legacy at 19th'),

-- 28 · Edmond UCO · OK
('UCO Campus 1BR',
 'One-bedroom across the street from the University of Central Oklahoma campus. Newly remodeled with stainless appliances, quartz counters, and luxury vinyl plank flooring. Pet-friendly with on-site dog park.',
 '405 E 2nd St', 'Edmond', 'Oklahoma', '73034',
 1100, 1, 1, 720, 35.6520, -97.4720, '',
 ARRAY['Pet Friendly','Gym','Central AC','In-Unit Laundry'],
 'Lupton Flats'),

-- 29 · Lawton South · OK
('South Lawton 1BR',
 'Affordable one-bedroom in south Lawton, a short drive from Fort Sill and the Wichita Mountains Wildlife Refuge. Updated kitchen, ceiling fans throughout, and a private balcony overlooking the courtyard pool.',
 '2520 SW 11th St', 'Lawton', 'Oklahoma', '73501',
 800, 1, 1, 720, 34.5905, -98.4060, '',
 ARRAY['Pool','Balcony','Central AC','Covered Parking'],
 'Tennis Villas Apartments'),

-- 30 · Moore Central · OK
('Central Moore 1BR',
 'Comfortable one-bedroom in central Moore, a quick I-35 commute to either downtown OKC or Norman. Updated kitchen with breakfast bar, walk-in closet, and reserved parking. Community storm shelter on-site.',
 '1820 N Eastern Ave', 'Moore', 'Oklahoma', '73160',
 900, 1, 1, 720, 35.3470, -97.4715, '',
 ARRAY['Storm Shelter','Walk-In Closet','Central AC','Reserved Parking'],
 'Riverside'),

-- 31 · Midwest City North · OK
('Midwest City 1BR Near Tinker',
 'Convenient one-bedroom minutes from Tinker Air Force Base and Rose State College. Renovated kitchen, refinished hardwood floors, and a screened porch. Quiet community with pool and on-site management.',
 '1500 N Air Depot Blvd', 'Midwest City', 'Oklahoma', '73110',
 850, 1, 1, 720, 35.4640, -97.3895, '',
 ARRAY['Pool','Hardwood Floors','Central AC','Pet Friendly'],
 'Villas Havana'),

-- 32 · Stillwater West · OK
('West Stillwater 1BR',
 'One-bedroom in west Stillwater near Boomer Lake Park, a peaceful spot for evening walks and weekend kayaking. Open kitchen, large bedroom with walk-in closet, and a private patio. Pet-friendly with fenced dog run.',
 '1024 N Country Club Rd', 'Stillwater', 'Oklahoma', '74075',
 900, 1, 1, 720, 36.1265, -97.0710, '',
 ARRAY['Pet Friendly','Walk-In Closet','Central AC','Patio'],
 'Oxford III'),

-- 33 · Enid Downtown · OK
('Downtown Enid 1BR',
 'Restored one-bedroom in downtown Enid with original tin ceilings and hardwood floors. Walk to the Garfield County courthouse square, local cafes, and the Stride Bank Center. Secure entry and on-site laundry.',
 '120 W Randolph Ave', 'Enid', 'Oklahoma', '73701',
 750, 1, 1, 720, 36.3960, -97.8770, '',
 ARRAY['Hardwood Floors','Laundry On-Site','Central AC','Elevator'],
 'Westside Terrace Apartments'),

-- 34 · Muskogee Central · OK
('Muskogee 1BR',
 'Updated one-bedroom near Honor Heights Park, famous for its azalea festival each spring. Quiet residential street, covered parking, and a community garden plot. Walking distance to the Three Rivers Museum.',
 '2410 W Okmulgee Ave', 'Muskogee', 'Oklahoma', '74401',
 770, 1, 1, 720, 35.7475, -95.3905, '',
 ARRAY['Covered Parking','Central AC','Pet Friendly','Patio'],
 'The Brooklyner'),

-- 35 · Bartlesville Downtown · OK
('Bartlesville Tower View 1BR',
 'Charming one-bedroom in downtown Bartlesville with views of Frank Lloyd Wright''s Price Tower. Walking distance to the Bartlesville Community Center and the Phillips Petroleum Co. Museum. Recently updated kitchen and bath.',
 '525 SE Frank Phillips Blvd', 'Bartlesville', 'Oklahoma', '74003',
 820, 1, 1, 720, 36.7470, -95.9785, '',
 ARRAY['Elevator','Central AC','In-Unit Laundry','Hardwood Floors'],
 'Talavera'),

-- ═══════════════════════════════════════════════════════════════════════════════
-- TWO-BEDROOMS (25) — 12 TX · 13 OK
-- ═══════════════════════════════════════════════════════════════════════════════

-- 36 · Houston Heights · TX
('Houston Heights 2BR',
 'Spacious two-bedroom in the Heights, one of Houston''s most charming historic neighborhoods. Wood floors, plantation shutters, and a fenced backyard. Walk to White Oak Music Hall, 19th Street boutiques, and the Heights Hike-and-Bike Trail.',
 '845 Heights Blvd', 'Houston', 'Texas', '77007',
 2500, 2, 2, 1100, 29.7920, -95.4000, '',
 ARRAY['Hardwood Floors','Pet Friendly','Central AC','Backyard','In-Unit Laundry'],
 'AERIE Apartments'),

-- 37 · Dallas Bishop Arts · TX
('Bishop Arts 2BR Loft',
 'Loft-style two-bedroom in Bishop Arts, Dallas''s most vibrant neighborhood for indie restaurants and shops. Polished concrete floors, exposed-brick accents, and a private rooftop terrace with skyline views. Steps from the streetcar.',
 '417 N Bishop Ave', 'Dallas', 'Texas', '75208',
 2400, 2, 2, 1100, 32.7480, -96.8285, '',
 ARRAY['Rooftop Deck','Gym','Concierge','Central AC','Pet Friendly'],
 'Canoga Park, CA'),

-- 38 · Austin Domain · TX
('The Domain 2BR',
 'Modern two-bedroom in The Domain, Austin''s second downtown for shopping, dining, and tech offices. Open-concept kitchen with chef''s island, smart-home features, and a balcony. Resort-style amenities including pool and pet park.',
 '11410 Domain Dr', 'Austin', 'Texas', '78758',
 2700, 2, 2, 1150, 30.4015, -97.7250, '',
 ARRAY['Pool','Gym','Smart Home','Pet Park','Concierge','Central AC'],
 'Azure'),

-- 39 · San Antonio Stone Oak · TX
('Stone Oak 2BR',
 'Two-bedroom in Stone Oak, north San Antonio''s premier residential corridor. Open layout with two-toned cabinetry, kitchen island, and oversized patio. Community amenities include resort pool, pet park, and clubhouse.',
 '20803 Stone Oak Pkwy', 'San Antonio', 'Texas', '78258',
 2050, 2, 2, 1100, 29.6240, -98.4675, '',
 ARRAY['Pool','Gym','Pet Park','Central AC','Patio'],
 '3167 Market'),

-- 40 · Fort Worth West 7th · TX
('West 7th 2BR',
 'Two-bedroom in the West 7th entertainment district. Walk to Crockett Row, Movie Tavern, and dozens of restaurants. Floor-to-ceiling windows, gourmet kitchen, and a rooftop pool with downtown skyline views.',
 '850 Foch St', 'Fort Worth', 'Texas', '76107',
 1950, 2, 2, 1080, 32.7475, -97.3565, '',
 ARRAY['Pool','Gym','Rooftop Deck','Concierge','Central AC'],
 '226 East End Avenue'),

-- 41 · El Paso Mission Valley · TX
('Mission Valley 2BR',
 'Two-bedroom in El Paso''s Mission Valley with views of the Franklin Mountains. Updated kitchen, large primary suite with walk-in closet, and a covered patio. Community pool and BBQ area.',
 '8800 Viscount Blvd', 'El Paso', 'Texas', '79925',
 1700, 2, 2, 1080, 31.7585, -106.3380, '',
 ARRAY['Pool','Mountain View','Walk-In Closet','Central AC','Patio'],
 '172 Mallory Ave unit 2'),

-- 42 · Arlington Central · TX
('Central Arlington 2BR',
 'Two-bedroom near UTA campus, Levitt Pavilion, and the Arlington Museum of Art. Renovated kitchen with quartz counters, both bedrooms with walk-in closets, and in-unit laundry. Resort pool and 24-hour fitness center.',
 '1505 W Park Row Dr', 'Arlington', 'Texas', '76013',
 2000, 2, 2, 1080, 32.7320, -97.1295, '',
 ARRAY['Pool','Gym','In-Unit Laundry','Walk-In Closet','Central AC'],
 'Verde Jersey City'),

-- 43 · Plano Shops at Legacy · TX
('Shops at Legacy 2BR',
 'Two-bedroom steps from the Shops at Legacy, Plano''s premier walkable lifestyle center. Designer finishes, oversized walk-in shower in the primary bath, and a balcony. Building includes a sky lounge and EV charging.',
 '5760 Legacy Dr', 'Plano', 'Texas', '75024',
 2400, 2, 2, 1140, 33.0750, -96.8345, '',
 ARRAY['Pool','Gym','EV Charging','Balcony','Concierge','Central AC'],
 'Gorman Crossings'),

-- 44 · Frisco Stonebriar · TX
('Stonebriar 2BR',
 'Family-friendly two-bedroom near Stonebriar Centre and the Dr Pepper Ballpark. Open-concept layout, walk-in pantry, and a fenced patio. Community amenities include resort pool, splash pad, and 24-hour fitness center.',
 '5800 Legacy Dr', 'Frisco', 'Texas', '75034',
 2550, 2, 2, 1180, 33.1080, -96.8190, '',
 ARRAY['Pool','Gym','Splash Pad','Pet Friendly','Central AC','Patio'],
 'The Grove'),

-- 45 · Laredo North · TX
('North Laredo 2BR',
 'Two-bedroom in north Laredo near the Mall del Norte and Texas A&M International University. Open kitchen with breakfast bar, large primary suite, and a private patio overlooking landscaped courtyard. Pool and fitness center.',
 '7402 McPherson Rd', 'Laredo', 'Texas', '78045',
 1500, 2, 2, 1080, 27.5805, -99.4640, '',
 ARRAY['Pool','Gym','Patio','Central AC','Covered Parking'],
 'Blackwolf Run at Hedingham'),

-- 46 · Amarillo Wolflin · TX
('Wolflin 2BR',
 'Two-bedroom in the historic Wolflin neighborhood of Amarillo, known for its tree-lined streets and Tudor-style homes. Updated kitchen, hardwood floors, and a sunroom converted to a home office. Detached garage included.',
 '2810 S Bowie St', 'Amarillo', 'Texas', '79109',
 1600, 2, 2, 1100, 35.1810, -101.8395, '',
 ARRAY['Hardwood Floors','Garage','Central AC','Pet Friendly'],
 'Marcom St Apartments'),

-- 47 · Houston Medical Center · TX
('Medical Center 2BR',
 'Two-bedroom near the Texas Medical Center, the world''s largest medical complex. Floor-to-ceiling windows, both bedrooms with en-suite baths, and a private balcony. Building features a sky pool and rooftop terrace.',
 '6720 Bertner Ave', 'Houston', 'Texas', '77030',
 2300, 2, 2, 1120, 29.7080, -95.3990, '',
 ARRAY['Pool','Gym','Concierge','Balcony','Rooftop Deck','Central AC'],
 'Skylar Lofts JC'),

-- 48 · Oklahoma City Midtown · OK
('Midtown OKC 2BR',
 'Two-bedroom in OKC''s Midtown district, walking distance to the Plaza District and Scissortail Park. Polished concrete floors, kitchen island, and a balcony with downtown skyline views. Building has a rooftop pool and dog park.',
 '1100 N Walker Ave', 'Oklahoma City', 'Oklahoma', '73103',
 1700, 2, 2, 1100, 35.4815, -97.5215, '',
 ARRAY['Pool','Gym','Pet Park','Rooftop Deck','Central AC','Balcony'],
 'The Constantine'),

-- 49 · Tulsa Brookside · OK
('Brookside 2BR',
 'Two-bedroom in Tulsa''s Brookside neighborhood, lined with restaurants, boutiques, and Riverparks Trail access. Granite counters, hardwood floors, and a private patio. Community pool, gym, and reserved covered parking.',
 '3520 S Peoria Ave', 'Tulsa', 'Oklahoma', '74105',
 1550, 2, 2, 1080, 36.1145, -95.9785, '',
 ARRAY['Pool','Gym','Hardwood Floors','Covered Parking','Central AC'],
 'Friendship Court'),

-- 50 · Norman Campus · OK
('Campus 2BR Near OU',
 'Two-bedroom four blocks from the OU campus and Memorial Stadium. Both bedrooms with walk-in closets, in-unit laundry, and a screened patio. Perfect for graduate students or young professionals working at OU Medical.',
 '1410 Stinson St', 'Norman', 'Oklahoma', '73072',
 1350, 2, 2, 1080, 35.2080, -97.4480, '',
 ARRAY['In-Unit Laundry','Walk-In Closet','Central AC','Patio'],
 '46 Carlton Ave unit 2'),

-- 51 · Broken Arrow South · OK
('South Broken Arrow 2BR',
 'Two-bedroom in a peaceful south Broken Arrow neighborhood near Liberty Park and Battle Creek Golf Club. Open-concept layout, kitchen island with seating, and a fenced backyard. Two-car garage included.',
 '4310 S Aspen Ave', 'Broken Arrow', 'Oklahoma', '74011',
 1450, 2, 2, 1100, 36.0220, -95.7920, '',
 ARRAY['Garage','Pet Friendly','Central AC','Backyard'],
 '403 West'),

-- 52 · Edmond North · OK
('North Edmond 2BR',
 'Two-bedroom in north Edmond near Mitch Park and the Pelican Bay Aquatic Center. Updated kitchen with shaker cabinets, walk-in pantry, and a covered patio. Community pool, dog park, and 24-hour fitness center.',
 '2710 W Covell Rd', 'Edmond', 'Oklahoma', '73003',
 1700, 2, 2, 1120, 35.6790, -97.5230, '',
 ARRAY['Pool','Gym','Pet Park','Patio','Central AC','Walk-In Closet'],
 '5522 Baum Blvd unit 705'),

-- 53 · Lawton North · OK
('North Lawton 2BR',
 'Two-bedroom in north Lawton convenient to Cameron University and Comanche County Memorial Hospital. Open layout, both bedrooms with en-suite baths, and a private patio. Community pool and reserved parking.',
 '4501 NW Cache Rd', 'Lawton', 'Oklahoma', '73505',
 1100, 2, 2, 1080, 34.6220, -98.4385, '',
 ARRAY['Pool','Reserved Parking','Central AC','Patio'],
 '15 Dorothy St unit 15A'),

-- 54 · Moore South · OK
('South Moore 2BR',
 'Spacious two-bedroom in south Moore near Brand Senior High School and Kelley Park. Recently renovated kitchen with stainless appliances, walk-in closets in both bedrooms, and a screened porch. Community storm shelter on-site.',
 '2210 S Eastern Ave', 'Moore', 'Oklahoma', '73160',
 1300, 2, 2, 1080, 35.3265, -97.4715, '',
 ARRAY['Storm Shelter','Walk-In Closet','Central AC','In-Unit Laundry'],
 '150 West Side Ave unit 1'),

-- 55 · Midwest City Heritage Park · OK
('Heritage Park 2BR',
 'Two-bedroom near Heritage Park Mall and Reed Center. Updated kitchen with breakfast bar, large primary suite, and a private balcony. Community amenities include pool, fitness center, and on-site management.',
 '5712 SE 15th St', 'Midwest City', 'Oklahoma', '73110',
 1200, 2, 2, 1080, 35.4290, -97.4180, '',
 ARRAY['Pool','Gym','Balcony','Central AC','Pet Friendly'],
 '845 S. Kingsley'),

-- 56 · Stillwater South · OK
('South Stillwater 2BR',
 'Two-bedroom in south Stillwater near McElroy Road shops and a quick drive to OSU stadium. Both bedrooms with walk-in closets, kitchen with granite counters, and a fenced patio. Pet-friendly with on-site dog park.',
 '2410 S Western Rd', 'Stillwater', 'Oklahoma', '74074',
 1300, 2, 2, 1100, 36.1015, -97.0680, '',
 ARRAY['Pet Park','Walk-In Closet','Central AC','In-Unit Laundry'],
 'Coronado St. Residences'),

-- 57 · Owasso Central · OK
('Owasso 2BR',
 'Two-bedroom in central Owasso near Smith Farm Marketplace and the Tulsa Tech campus. Open-concept layout, kitchen with island and pendant lighting, and a covered patio. Community pool, gym, and gated entry.',
 '11200 N Garnett Rd', 'Owasso', 'Oklahoma', '74055',
 1400, 2, 2, 1080, 36.2750, -95.8590, '',
 ARRAY['Pool','Gym','Gated Access','Patio','Central AC'],
 '736 E 83rd St #2'),

-- 58 · Bixby Central · OK
('Bixby 2BR Near Memorial Park',
 'Two-bedroom near Bixby Memorial Park and the Arkansas River trails. Modern kitchen with quartz counters, walk-in shower in primary bath, and a fenced backyard. Two-car garage and storm shelter included.',
 '11410 S Memorial Dr', 'Bixby', 'Oklahoma', '74008',
 1500, 2, 2, 1120, 35.9445, -95.8855, '',
 ARRAY['Garage','Storm Shelter','Backyard','Central AC','Pet Friendly'],
 '17 6th St unit 2'),

-- 59 · Yukon Central · OK
('Central Yukon 2BR',
 'Two-bedroom near Chisholm Trail Park and the Yukon Czech Hall. Updated kitchen with subway-tile backsplash, both bedrooms with walk-in closets, and a screened patio. Community pool, fitness center, and on-site laundry.',
 '825 N Mustang Rd', 'Yukon', 'Oklahoma', '73099',
 1250, 2, 2, 1080, 35.5070, -97.7665, '',
 ARRAY['Pool','Gym','Walk-In Closet','Central AC','Pet Friendly'],
 '77 Vinton St unit 1'),

-- 60 · Tulsa Riverside · OK
('Tulsa Riverside 2BR',
 'Two-bedroom along the Arkansas River with views of the Gathering Place from the balcony. Floor-to-ceiling windows, gourmet kitchen with island, and a primary suite with spa bath. Building includes resort pool, sky lounge, and 24-hour concierge.',
 '2424 S Riverside Dr', 'Tulsa', 'Oklahoma', '74114',
 1750, 2, 2, 1140, 36.1265, -95.9890, '',
 ARRAY['Pool','Gym','Concierge','Water View','Balcony','Central AC','Rooftop Deck'],
 '218 Grandview Terrace');


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2 — Reassign property_images to new listing IDs via image_group
-- ─────────────────────────────────────────────────────────────────────────────
-- Each new listing reuses the image_group from the original 60 listings.
-- TRUNCATE CASCADE on listings will have deleted property_images rows via the
-- FK CASCADE, so after running this seed re-run update_listing_images.sql
-- (skip Step 1, run Steps 2 & 3) to repopulate property_images linked to the
-- new listing IDs. The hero-image UPDATE statements below match on image_group
-- and run independently:

UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-01/listing-01-1.webp'
  WHERE image_group = 'Studio 144-50 25th Rd';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-02/listing-02-1.webp'
  WHERE image_group = 'Brownsville Transit Village V';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-03/listing-03-1.webp'
  WHERE image_group = 'Studio 275 Fontaine Parc';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-04/listing-04-1.webp'
  WHERE image_group = 'Studio 1318 E 58th St #1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-05/listing-05-1.webp'
  WHERE image_group = 'Ardmore-Ca';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-06/listing-06-1.webp'
  WHERE image_group = 'Studio The Halldale';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-07/listing-07-1.webp'
  WHERE image_group = 'Studio Seven Lions Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-08/listing-08-1.webp'
  WHERE image_group = 'CONDO HOLDINGS';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-09/listing-09-1.webp'
  WHERE image_group = 'Studio Countyline Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-10/listing-10-1.webp'
  WHERE image_group = '461 Dean';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-11/listing-11-1.webp'
  WHERE image_group = '1031 Clinton St #5B';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-12/listing-12-1.webp'
  WHERE image_group = 'Artem';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-13/listing-13-1.webp'
  WHERE image_group = '111 Lincoln St unit 3rd Fl';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-14/listing-14-1.webp'
  WHERE image_group = 'Bay Pointe Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-15/listing-15-1.webp'
  WHERE image_group = 'Central Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-16/listing-16-1.webp'
  WHERE image_group = 'Chesapeake Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-17/listing-17-1.webp'
  WHERE image_group = 'Country Creek';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-18/listing-18-1.webp'
  WHERE image_group = 'Liberty Station Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-19/listing-19-1.webp'
  WHERE image_group = 'Executive House Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-20/listing-20-1.webp'
  WHERE image_group = 'Chateaugay Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-21/listing-21-1.webp'
  WHERE image_group = 'Park Vanowen Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-22/listing-22-1.webp'
  WHERE image_group = 'Telegraph Hill';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-23/listing-23-1.webp'
  WHERE image_group = '105 Elmont St unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-24/listing-24-1.webp'
  WHERE image_group = 'Lebanon Vue';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-25/listing-25-1.webp'
  WHERE image_group = 'Greenway Flats Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-26/listing-26-1.webp'
  WHERE image_group = 'Green Meadows';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-27/listing-27-1.webp'
  WHERE image_group = 'Legacy at 19th';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-28/listing-28-1.webp'
  WHERE image_group = 'Lupton Flats';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-29/listing-29-1.webp'
  WHERE image_group = 'Tennis Villas Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-30/listing-30-1.webp'
  WHERE image_group = 'Riverside';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-31/listing-31-1.webp'
  WHERE image_group = 'Villas Havana';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-32/listing-32-1.webp'
  WHERE image_group = 'Oxford III';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-33/listing-33-1.webp'
  WHERE image_group = 'Westside Terrace Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-34/listing-34-1.webp'
  WHERE image_group = 'The Brooklyner';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-35/listing-35-1.webp'
  WHERE image_group = 'Talavera';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-36/listing-36-1.webp'
  WHERE image_group = 'AERIE Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-37/listing-37-1.webp'
  WHERE image_group = 'Canoga Park, CA';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-38/listing-38-1.webp'
  WHERE image_group = 'Azure';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-39/listing-39-1.webp'
  WHERE image_group = '3167 Market';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-40/listing-40-1.webp'
  WHERE image_group = '226 East End Avenue';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-41/listing-41-1.webp'
  WHERE image_group = '172 Mallory Ave unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-42/listing-42-1.webp'
  WHERE image_group = 'Verde Jersey City';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-43/listing-43-1.webp'
  WHERE image_group = 'Gorman Crossings';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-44/listing-44-1.webp'
  WHERE image_group = 'The Grove';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-45/listing-45-1.webp'
  WHERE image_group = 'Blackwolf Run at Hedingham';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-46/listing-46-1.webp'
  WHERE image_group = 'Marcom St Apartments';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-47/listing-47-1.webp'
  WHERE image_group = 'Skylar Lofts JC';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-48/listing-48-1.webp'
  WHERE image_group = 'The Constantine';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-49/listing-49-1.webp'
  WHERE image_group = 'Friendship Court';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-50/listing-50-1.webp'
  WHERE image_group = '46 Carlton Ave unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-51/listing-51-1.webp'
  WHERE image_group = '403 West';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-52/listing-52-1.webp'
  WHERE image_group = '5522 Baum Blvd unit 705';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-53/listing-53-1.webp'
  WHERE image_group = '15 Dorothy St unit 15A';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-54/listing-54-1.webp'
  WHERE image_group = '150 West Side Ave unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-55/listing-55-1.webp'
  WHERE image_group = '845 S. Kingsley';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-56/listing-56-1.webp'
  WHERE image_group = 'Coronado St. Residences';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-57/listing-57-1.webp'
  WHERE image_group = '736 E 83rd St #2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-58/listing-58-1.webp'
  WHERE image_group = '17 6th St unit 2';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-59/listing-59-1.webp'
  WHERE image_group = '77 Vinton St unit 1';
UPDATE listings SET image_url = 'https://xnabwbnpqoqkdjlpsriw.supabase.co/storage/v1/object/public/property-images/listing-60/listing-60-1.webp'
  WHERE image_group = '218 Grandview Terrace';


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3 — After running this script, re-run update_listing_images.sql
--          (skip Step 1, run Steps 2 & 3) to re-insert gallery images
--          into property_images linked to the new listing IDs.
-- ─────────────────────────────────────────────────────────────────────────────

-- Done! 60 listings: 10 studios, 25 one-bedrooms, 25 two-bedrooms
-- 30 Texas (Houston, Dallas, Austin, San Antonio, Fort Worth, El Paso,
--           Arlington, Plano, Frisco, McKinney, Irving, Lubbock,
--           Corpus Christi, Laredo, Amarillo)
-- 30 Oklahoma (Oklahoma City, Tulsa, Norman, Broken Arrow, Edmond, Lawton,
--              Moore, Midwest City, Stillwater, Enid, Muskogee, Bartlesville,
--              Owasso, Bixby, Yukon)
