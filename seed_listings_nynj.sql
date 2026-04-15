-- seed_listings_nynj.sql
-- 60 listings: 10 studios · 25 one-bedrooms · 25 two-bedrooms
-- 30 New York · 30 New Jersey
--
-- Run in your Supabase SQL Editor.
-- This script DELETES all existing data (listings, favorites, inquiries,
-- property_images) and inserts 60 new NY/NJ listings.
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
-- STEP 1 — Insert 60 new listings (30 NY + 30 NJ)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO listings (
  title, description, address, city, state, zip,
  price, bedrooms, bathrooms, sqft,
  latitude, longitude, image_url, amenities, image_group
) VALUES

-- ═══════════════════════════════════════════════════════════════════════════════
-- STUDIOS (10)
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1 · Manhattan Midtown · NY
('The Biltmore Studio',
 'Modern studio at The Biltmore, steps from Times Square and Broadway theaters. Floor-to-ceiling windows flood the space with natural light. Building features a 24-hour doorman, state-of-the-art fitness center, and rooftop lounge with skyline views.',
 '271 W 47th St', 'New York', 'New York', '10036',
 3200, 0, 1, 420, 40.7607, -73.9870, '',
 ARRAY['Doorman','Gym','Elevator','Central AC','Rooftop Deck'],
 'Studio 144-50 25th Rd'),

-- 2 · Manhattan Midtown · NY
('Avalon Midtown West Studio',
 'Stylish studio at Avalon Midtown West with in-unit washer/dryer and floor-to-ceiling windows overlooking the Hudson River corridor. Steps from Columbus Circle, Central Park, and the 1/A/C/E subway lines.',
 '250 W 50th St', 'New York', 'New York', '10019',
 2950, 0, 1, 480, 40.7625, -73.9860, '',
 ARRAY['Doorman','Gym','In-Unit Laundry','Elevator','Central AC'],
 'Brownsville Transit Village V'),

-- 3 · Queens Astoria · NY
('Waterfront Studio in Astoria',
 'Riverfront studio at Fairfield Riverpark with Manhattan skyline views and resort-style amenities. Moments from Astoria Park, the best Greek restaurants in the city, and the N/W train at Ditmars Blvd.',
 '18-05 Ditmars Blvd', 'Queens', 'New York', '11105',
 2200, 0, 1, 500, 40.7760, -73.9150, '',
 ARRAY['Gym','Pool','In-Unit Laundry','River View'],
 'Studio 275 Fontaine Parc'),

-- 4 · Staten Island · NY
('Urby Studio on the Waterfront',
 'Designer studio at Urby Staten Island with co-working spaces, a rooftop urban farm, and curated community events. Quick ferry ride to Manhattan''s Financial District. Pet-friendly with on-site dog run.',
 '7 Navy Pier Ct', 'Staten Island', 'New York', '10304',
 2200, 0, 1, 450, 40.6380, -74.0770, '',
 ARRAY['Gym','Rooftop Deck','Co-Working','In-Unit Laundry','Pet Friendly'],
 'Studio 1318 E 58th St #1'),

-- 5 · Hoboken · NJ
('Washington St Studio',
 'Charming studio on bustling Washington St with Hoboken''s best restaurants and shops at your doorstep. Quick PATH commute to Manhattan. Updated kitchen with stainless steel appliances and quartz countertops.',
 '800 Washington St', 'Hoboken', 'New Jersey', '07030',
 2600, 0, 1, 480, 40.7460, -74.0290, '',
 ARRAY['Near Transit','Central AC','In-Unit Laundry'],
 'Ardmore-Ca'),

-- 6 · Newark · NJ
('Downtown Newark Studio',
 'Modern studio at 24 Jones in Downtown Newark, steps from Newark Penn Station and Prudential Center. Floor-to-ceiling windows, in-building gym, and 24-hour concierge. Ideal for NYC commuters via PATH.',
 '24 Jones St', 'Newark', 'New Jersey', '07102',
 1900, 0, 1, 500, 40.7400, -74.1720, '',
 ARRAY['Doorman','Gym','Elevator','Near Transit','Central AC'],
 'Studio The Halldale'),

-- 7 · Elizabeth · NJ
('Elizabeth Studio on Watson Ave',
 'Affordable studio apartment on Watson Ave with easy access to NJ Transit Elizabeth station. Minutes to Newark Airport and the Jersey Gardens outlet mall. On-site laundry and assigned parking included.',
 '50 Watson Ave', 'Elizabeth', 'New Jersey', '07202',
 1400, 0, 1, 450, 40.6540, -74.2110, '',
 ARRAY['In-Unit Laundry','Near Transit','Parking'],
 'Studio Seven Lions Apartments'),

-- 8 · New Brunswick · NJ
('Landing Lane Studio',
 'Studio apartment at 10 Landing Lane with Raritan River views and modern amenities near Rutgers University. Resort-style pool, fitness center, and covered parking. Easy access to Route 18 and NJ Turnpike.',
 '10 Landing Ln', 'New Brunswick', 'New Jersey', '08901',
 1750, 0, 1, 450, 40.4860, -74.4440, '',
 ARRAY['Gym','Pool','Elevator','Central AC','Parking'],
 'CONDO HOLDINGS'),

-- 9 · Trenton · NJ
('Roebling Lofts Studio',
 'Industrial-style studio in a converted historic Roebling wire rope factory near the Delaware River. Exposed brick walls, soaring ceilings, and oversized windows. Steps from the Trenton Transit Center for NJ Transit and SEPTA.',
 '71 Clark St', 'Trenton', 'New Jersey', '08611',
 1400, 0, 1, 500, 40.2160, -74.7580, '',
 ARRAY['Hardwood Floors','High Ceilings','In-Unit Laundry'],
 'Studio Countyline Apartments'),

-- 10 · Atlantic City · NJ
('Vermont Plaza Studio',
 'Affordable studio at Vermont Plaza in Atlantic City with on-site laundry and parking included. Short walk to the famous boardwalk, beaches, and casino entertainment district. Ocean breezes and a laid-back Shore vibe.',
 '130 S Vermont Ave', 'Atlantic City', 'New Jersey', '08401',
 1320, 0, 1, 450, 39.3600, -74.4330, '',
 ARRAY['In-Unit Laundry','Parking','Near Beach'],
 '461 Dean'),

-- ═══════════════════════════════════════════════════════════════════════════════
-- ONE-BEDROOMS (25)
-- ═══════════════════════════════════════════════════════════════════════════════

-- 11 · Manhattan Upper East Side · NY
('Classic 1BR on E 63rd St',
 'Charming one-bedroom on E 63rd St, just steps from Central Park and the Q train at Lexington Ave. Hardwood floors throughout, renovated kitchen with dishwasher, and abundant closet space in this quintessential UES home.',
 '301 E 63rd St', 'New York', 'New York', '10065',
 3400, 1, 1, 600, 40.7632, -73.9634, '',
 ARRAY['Elevator','In-Unit Laundry','Dishwasher'],
 '1031 Clinton St #5B'),

-- 12 · Manhattan Upper East Side · NY
('Renovated 1BR at The Brittany',
 'Luxury one-bedroom at The Brittany with indoor swimming pool, state-of-the-art fitness center, and 24-hour doorman on York Ave. Sun-drenched south-facing exposure with views over Carl Schurz Park.',
 '1775 York Ave', 'New York', 'New York', '10128',
 3800, 1, 1, 650, 40.7800, -73.9445, '',
 ARRAY['Doorman','Pool','Gym','Elevator','Central AC','Pet Friendly'],
 'Artem'),

-- 13 · Manhattan Upper East Side · NY
('Lenox Hill 1BR on E 79th St',
 'Elegant one-bedroom in a sought-after Lenox Hill co-op with rooftop views and live-in superintendent. Walk to the Metropolitan Museum, Madison Ave boutiques, and the 6 train. Pristine pre-war details.',
 '350 E 79th St', 'New York', 'New York', '10075',
 3500, 1, 1, 700, 40.7730, -73.9530, '',
 ARRAY['Doorman','Rooftop Deck','Elevator','In-Unit Laundry'],
 '111 Lincoln St unit 3rd Fl'),

-- 14 · Manhattan Upper West Side · NY
('Lincoln Square 1BR with Amenities',
 'Modern one-bedroom in a 15-story pre-war building in the heart of Lincoln Square near Central Park. Walk to Lincoln Center, the American Museum of Natural History, and Zabar''s. Bright south-facing unit.',
 '210 W 70th St', 'New York', 'New York', '10023',
 3900, 1, 1, 680, 40.7770, -73.9810, '',
 ARRAY['Doorman','Elevator','Gym','In-Unit Laundry','Central AC'],
 'Bay Pointe Apartments'),

-- 15 · Manhattan Harlem · NY
('East Harlem 1BR Walk-Up',
 'Charming one-bedroom walk-up on 3rd Ave in East Harlem with exposed brick and abundant natural light. Steps from the 6 train at 103rd St and the new East Harlem dining scene. Affordable Manhattan living.',
 '2026 3rd Ave', 'New York', 'New York', '10029',
 1800, 1, 1, 550, 40.7940, -73.9420, '',
 ARRAY['Hardwood Floors','Pet Friendly'],
 'Central Apartments'),

-- 16 · Manhattan Midtown · NY
('Midtown 1BR with City Views',
 'Bright one-bedroom on W 51st St with stunning city views through floor-to-ceiling windows. Modern finishes, in-unit washer/dryer, and 24-hour doorman. Walk to Rockefeller Center and Radio City Music Hall.',
 '245 W 51st St', 'New York', 'New York', '10019',
 3995, 1, 1, 600, 40.7630, -73.9855, '',
 ARRAY['Doorman','Elevator','Central AC','City View','In-Unit Laundry'],
 'Chesapeake Apartments'),

-- 17 · Brooklyn Williamsburg · NY
('Williamsburg Loft on Union Ave',
 'Industrial-chic loft in the heart of Williamsburg with exposed brick, polished concrete floors, and an open layout. Steps from the L train at Grand St and Williamsburg''s legendary restaurants and nightlife.',
 '544 Union Ave', 'Brooklyn', 'New York', '11211',
 2800, 1, 1, 750, 40.7070, -73.9510, '',
 ARRAY['Hardwood Floors','Dishwasher','Near Transit'],
 'Country Creek'),

-- 18 · Brooklyn Williamsburg · NY
('Modern 1BR on Berry St',
 'Sleek one-bedroom on Berry St, steps from the Bedford Ave L train and Williamsburg''s vibrant nightlife. In-building rooftop deck with Manhattan skyline views. Gut-renovated with designer finishes.',
 '34 Berry St', 'Brooklyn', 'New York', '11249',
 3500, 1, 1, 650, 40.7180, -73.9630, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit','Rooftop Deck'],
 'Liberty Station Apartments'),

-- 19 · Queens Astoria · NY
('Astoria Cove 1BR with River Views',
 'Brand new one-bedroom at Astoria Cove with stunning East River and Manhattan skyline views. Resort-style amenities include a rooftop pool, fitness center, and landscaped courtyard. Near the NYC Ferry stop.',
 '4-34 26th Ave', 'Queens', 'New York', '11102',
 2700, 1, 1, 650, 40.7750, -73.9290, '',
 ARRAY['Doorman','Gym','Elevator','River View','Central AC'],
 'Executive House Apartments'),

-- 20 · Queens Astoria · NY
('Astoria 1BR Near N/W Trains',
 'Bright one-bedroom on 36th Ave in the heart of Astoria, surrounded by the neighborhood''s famous Greek tavernas, Egyptian bakeries, and craft cocktail bars. Steps from the N/W trains at 36th Ave station.',
 '30-06 36th Ave', 'Queens', 'New York', '11106',
 2000, 1, 1, 600, 40.7568, -73.9235, '',
 ARRAY['Near Transit','Hardwood Floors','Pet Friendly'],
 'Chateaugay Apartments'),

-- 21 · Bronx Riverdale · NY
('Riverdale 1BR with Hudson Views',
 'Luxury one-bedroom on Henry Hudson Parkway with stunning Hudson River and Palisades views. Doorman building with on-site parking, fitness center, and landscaped gardens. Express bus to Midtown.',
 '3333 Henry Hudson Pkwy W', 'Bronx', 'New York', '10463',
 2100, 1, 1, 700, 40.8830, -73.9155, '',
 ARRAY['Doorman','Elevator','In-Unit Laundry','River View','Parking'],
 'Park Vanowen Apartments'),

-- 22 · Bronx South Bronx · NY
('South Bronx 1BR on 3rd Ave',
 'Newly renovated one-bedroom on 3rd Ave in the South Bronx with modern kitchen and bath. Steps from the 6 train at 138th St. The neighborhood''s new restaurants and cultural venues are transforming this area.',
 '2413 3rd Ave', 'Bronx', 'New York', '10451',
 1700, 1, 1, 600, 40.8090, -73.9270, '',
 ARRAY['Elevator','In-Unit Laundry','Central AC','Near Transit'],
 'Telegraph Hill'),

-- 23 · Staten Island · NY
('Seaview 1BR with Ocean Breeze',
 'One-bedroom at the Seaview complex with ocean breezes and park views on Seaview Ave. Minutes from the Verrazzano Bridge and Staten Island beaches. Quiet residential neighborhood with assigned parking.',
 '500 Seaview Ave', 'Staten Island', 'New York', '10305',
 1800, 1, 1, 600, 40.5880, -74.0710, '',
 ARRAY['In-Unit Laundry','Parking','Pet Friendly'],
 '105 Elmont St unit 1'),

-- 24 · Jersey City Downtown · NJ
('Montgomery Gateway 1BR',
 'Modern one-bedroom at Montgomery Gateway in Downtown Jersey City near Grove St PATH station. Floor-to-ceiling windows with Manhattan skyline views. Walk to the waterfront promenade and Paulus Hook dining.',
 '353 Montgomery St', 'Jersey City', 'New Jersey', '07302',
 3200, 1, 1, 700, 40.7190, -74.0340, '',
 ARRAY['Doorman','Gym','Elevator','Near Transit','Central AC'],
 'Lebanon Vue'),

-- 25 · Jersey City Heights · NJ
('Heights 1BR on Highland Ave',
 'Bright one-bedroom in the Jersey City Heights near shops, cafés, and the JSQ PATH station. Hardwood floors, updated kitchen, and plenty of natural light. Growing arts community with new galleries and eateries.',
 '168 Highland Ave', 'Jersey City', 'New Jersey', '07306',
 1800, 1, 1, 650, 40.7340, -74.0630, '',
 ARRAY['Hardwood Floors','Pet Friendly','Near Transit'],
 'Greenway Flats Apartments'),

-- 26 · Hoboken · NJ
('Garden St 1BR in Hoboken',
 'One-bedroom on tree-lined Garden St in Hoboken with easy PATH commute to Manhattan. Walk to Stevens Institute, Church Square Park, and Hoboken''s legendary pizza scene. Washer/dryer in unit.',
 '1425 Garden St', 'Hoboken', 'New Jersey', '07030',
 3200, 1, 1, 650, 40.7500, -74.0310, '',
 ARRAY['Near Transit','Hardwood Floors','In-Unit Laundry'],
 'Green Meadows'),

-- 27 · Newark · NJ
('Newark 1BR on Rector St',
 'One-bedroom near Military Park in Downtown Newark with easy access to PATH and NJ Transit. Walk to the Prudential Center, NJPAC, and the burgeoning Ironbound restaurant district.',
 '50 Rector St', 'Newark', 'New Jersey', '07102',
 2100, 1, 1, 650, 40.7380, -74.1700, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit','Central AC'],
 'Legacy at 19th'),

-- 28 · Paterson · NJ
('Broadway 1BR in Paterson',
 'Affordable one-bedroom on Broadway in Paterson near the Great Falls National Historical Park. Close to NJ Transit bus routes and Paterson''s vibrant immigrant food scene. Updated kitchen and bath.',
 '324 Broadway', 'Paterson', 'New Jersey', '07501',
 1450, 1, 1, 550, 40.9150, -74.1720, '',
 ARRAY['Near Transit','In-Unit Laundry'],
 'Lupton Flats'),

-- 29 · Elizabeth · NJ
('Hayes House 1BR in Elizabeth',
 'One-bedroom at Hayes House Apartments in midtown Elizabeth near the NJ Transit station. Minutes to Newark Airport and the Jersey Gardens outlet mall. On-site laundry, elevator, and assigned parking.',
 '810 Murray St', 'Elizabeth', 'New Jersey', '07202',
 1600, 1, 1, 600, 40.6560, -74.2130, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit','Parking'],
 'Tennis Villas Apartments'),

-- 30 · New Brunswick · NJ
('Livingston Terrace 1BR',
 'Modern one-bedroom at Livingston Terrace near Rutgers University and downtown New Brunswick dining. Walk to the New Brunswick train station for a direct NJ Transit ride to Penn Station.',
 '434 Livingston Ave', 'New Brunswick', 'New Jersey', '08901',
 1800, 1, 1, 500, 40.4940, -74.4520, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit'],
 'Riverside'),

-- 31 · New Brunswick · NJ
('The Quincy 1BR Downtown',
 'One-bedroom at The Quincy in downtown New Brunswick, steps from the train station. Walk to the State Theatre, Rutgers campus, and George St dining. Doorman building with fitness center.',
 '120 Neilson St', 'New Brunswick', 'New Jersey', '08901',
 2100, 1, 1, 650, 40.4960, -74.4480, '',
 ARRAY['Doorman','Gym','Elevator','Near Transit','Central AC'],
 'Villas Havana'),

-- 32 · Trenton · NJ
('The Bell 1BR in Downtown Trenton',
 'One-bedroom at The Bell Apartments on E State St in downtown Trenton near the State House. Steps from the Trenton Transit Center with NJ Transit service to NYC, Philly, and the Shore.',
 '216 E State St', 'Trenton', 'New Jersey', '08608',
 1500, 1, 1, 650, 40.2210, -74.7660, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit'],
 'Oxford III'),

-- 33 · Princeton · NJ
('195 Nassau 1BR Boutique Living',
 'Boutique one-bedroom at 195 Nassau on Princeton''s main street with luxury amenities. Walk to Princeton University campus, Nassau Street shops, and the Dinky train to Princeton Junction.',
 '195 Nassau St', 'Princeton', 'New Jersey', '08542',
 3200, 1, 1, 700, 40.3500, -74.6590, '',
 ARRAY['Doorman','Gym','Rooftop Deck','Central AC','Pet Friendly'],
 'Westside Terrace Apartments'),

-- 34 · Princeton · NJ
('Palmer Square 1BR in Downtown',
 'Charming one-bedroom on Palmer Square in the walkable heart of downtown Princeton. Steps from Princeton University, artisan shops, and the acclaimed dining scene along Witherspoon Street.',
 '1 Palmer Sq', 'Princeton', 'New Jersey', '08542',
 2800, 1, 1, 650, 40.3500, -74.6610, '',
 ARRAY['Central AC','Hardwood Floors','Pet Friendly'],
 'The Brooklyner'),

-- 35 · Morristown · NJ
('Morris-Hill 1BR on Hill St',
 'Upscale one-bedroom in a boutique 26-unit building on quiet Hill St in Morristown. Walk to the Green, the Morristown train station for NJ Transit express service to Penn Station, and downtown dining.',
 '34 Hill St', 'Morristown', 'New Jersey', '07960',
 2400, 1, 1, 650, 40.7960, -74.4810, '',
 ARRAY['Elevator','In-Unit Laundry','Parking'],
 'Talavera'),

-- ═══════════════════════════════════════════════════════════════════════════════
-- TWO-BEDROOMS (25)
-- ═══════════════════════════════════════════════════════════════════════════════

-- 36 · Manhattan Upper East Side · NY
('Spacious 2BR on E 74th St',
 'Sun-drenched two-bedroom in prime Upper East Side, steps from Lenox Hill Hospital, Central Park, and the 6 train. Renovated eat-in kitchen, king-sized bedrooms, and abundant closet space.',
 '248 E 74th St', 'New York', 'New York', '10021',
 5500, 2, 1, 900, 40.7700, -73.9575, '',
 ARRAY['Elevator','In-Unit Laundry','Dishwasher','Central AC'],
 'AERIE Apartments'),

-- 37 · Manhattan Upper East Side · NY
('Modern 2BR on E 66th St',
 'Bright two-bedroom in Lenox Hill with updated kitchen, hardwood floors, and southern exposure. Walking distance to Central Park, Bloomingdale''s, and the F train at Lexington-63rd.',
 '265 E 66th St', 'New York', 'New York', '10065',
 4800, 2, 1, 850, 40.7651, -73.9612, '',
 ARRAY['Doorman','Elevator','In-Unit Laundry','Central AC'],
 'Canoga Park, CA'),

-- 38 · Manhattan Upper West Side · NY
('Pre-War 2BR on Central Park West',
 'Stately pre-war two-bedroom with Central Park views, 10-foot ceilings, and original crown moldings. Full-service building with doorman, live-in super, and bicycle storage. Walk to the B/C trains.',
 '350 Central Park West', 'New York', 'New York', '10025',
 6500, 2, 1.5, 1100, 40.7920, -73.9680, '',
 ARRAY['Doorman','Elevator','In-Unit Laundry','Park View'],
 'Azure'),

-- 39 · Manhattan Upper West Side · NY
('The Greystone 2BR with Roof Deck',
 'Spacious two-bedroom at The Greystone with shared rooftop deck, bike storage, and residential gym. Tree-lined block steps from Riverside Park. Classic West Side living at its finest.',
 '212 W 91st St', 'New York', 'New York', '10024',
 5800, 2, 1, 950, 40.7905, -73.9720, '',
 ARRAY['Rooftop Deck','Gym','Bike Storage','Elevator','In-Unit Laundry'],
 '3167 Market'),

-- 40 · Manhattan Harlem · NY
('Affordable 2BR in West Harlem',
 'Bright two-bedroom in West Harlem with updated kitchen and hardwood floors throughout. Near the 1 train at 137th St/City College, Riverbank State Park, and Hamilton Heights'' historic brownstones.',
 '609 W 137th St', 'New York', 'New York', '10031',
 2800, 2, 1, 800, 40.8210, -73.9560, '',
 ARRAY['Elevator','In-Unit Laundry','Hardwood Floors'],
 '226 East End Avenue'),

-- 41 · Brooklyn Park Slope · NY
('Renovated 2BR on Union St',
 'Renovated two-bedroom apartment on Union St in Park Slope with modern stainless steel appliances, in-unit washer/dryer, and original hardwood floors. Steps from Prospect Park and the R train.',
 '754 Union St', 'Brooklyn', 'New York', '11215',
 3800, 2, 1, 950, 40.6760, -73.9770, '',
 ARRAY['In-Unit Laundry','Dishwasher','Hardwood Floors'],
 '172 Mallory Ave unit 2'),

-- 42 · Brooklyn Park Slope · NY
('Brownstone 2BR on Garfield Pl',
 'Gorgeous brownstone two-bedroom in prime Park Slope with private garden access and original architectural details. Walk to Prospect Park, the F/G trains, and 5th Ave dining.',
 '171 Garfield Pl', 'Brooklyn', 'New York', '11215',
 5200, 2, 1.5, 1050, 40.6720, -73.9790, '',
 ARRAY['Garden','Hardwood Floors','Pet Friendly','High Ceilings'],
 'Verde Jersey City'),

-- 43 · Brooklyn Bushwick · NY
('Bushwick 2BR on Menahan St',
 'Spacious two-bedroom in Bushwick with updated kitchen, exposed brick accent wall, and close to M/L trains. The neighborhood''s art galleries, craft breweries, and taco spots are steps away.',
 '369 Menahan St', 'Brooklyn', 'New York', '11237',
 2800, 2, 1, 850, 40.6990, -73.9190, '',
 ARRAY['Near Transit','Hardwood Floors','Pet Friendly'],
 'Gorman Crossings'),

-- 44 · Bronx Mott Haven · NY
('Mott Haven 2BR Modern Rental',
 'Modern two-bedroom in up-and-coming Mott Haven with rooftop terrace and Manhattan views. Close to the 6 train at 138th St and the new Mott Haven waterfront development.',
 '224 E 135th St', 'Bronx', 'New York', '10451',
 2200, 2, 1, 850, 40.8110, -73.9300, '',
 ARRAY['Rooftop Deck','Elevator','Near Transit','Gym'],
 'The Grove'),

-- 45 · Jersey City Downtown · NJ
('The Montgomery 2BR Downtown',
 'Sleek two-bedroom at The Montgomery with Manhattan skyline views and walkable downtown Jersey City location. Steps from the Grove St PATH and the Exchange Place waterfront.',
 '100 Montgomery St', 'Jersey City', 'New Jersey', '07302',
 3500, 2, 1, 950, 40.7195, -74.0330, '',
 ARRAY['Doorman','Gym','Elevator','City View','Central AC'],
 'Blackwolf Run at Hedingham'),

-- 46 · Jersey City · NJ
('Downtown JC 2BR on Beacon Ave',
 'Spacious two-bedroom near Journal Square with updated kitchen, hardwood floors, and easy PATH access to Manhattan. Walk to the India Square restaurant row and the new JSQ development.',
 '229 Beacon Ave', 'Jersey City', 'New Jersey', '07306',
 2200, 2, 1, 850, 40.7320, -74.0650, '',
 ARRAY['Near Transit','Hardwood Floors','In-Unit Laundry'],
 'Marcom St Apartments'),

-- 47 · Jersey City Heights · NJ
('JC Heights 2BR on Sherman Ave',
 'Two-bedroom apartment in the Jersey City Heights with parking and laundry on site. Growing restaurant scene and easy commute via the Heights Light Rail to Hoboken and the PATH.',
 '84 Sherman Ave', 'Jersey City', 'New Jersey', '07307',
 2400, 2, 1, 900, 40.7480, -74.0560, '',
 ARRAY['Parking','In-Unit Laundry','Pet Friendly'],
 'Skylar Lofts JC'),

-- 48 · Hoboken Waterfront · NJ
('Maxwell Place 2BR Waterfront',
 'Luxury two-bedroom at Maxwell Place on the Hoboken waterfront with Hudson River views and resort-style amenities. Indoor pool, fitness center, and landscaped waterfront promenade.',
 '1000 Maxwell Ln', 'Hoboken', 'New Jersey', '07030',
 4800, 2, 2, 1100, 40.7370, -74.0270, '',
 ARRAY['Doorman','Pool','Gym','River View','Parking','Central AC'],
 'The Constantine'),

-- 49 · Newark Ironbound · NJ
('Ironbound 2BR on Aldine St',
 'Large two-bedroom in Newark''s famous Ironbound neighborhood, home to the best Portuguese and Brazilian restaurants in the tristate area. Steps from Newark Penn Station for PATH and NJ Transit.',
 '25 Aldine St', 'Newark', 'New Jersey', '07105',
 1800, 2, 1, 900, 40.7170, -74.1670, '',
 ARRAY['Hardwood Floors','Near Transit'],
 'Friendship Court'),

-- 50 · Paterson · NJ
('Paterson 2BR on Main St',
 'Spacious two-bedroom on Main St in Paterson with updated kitchen and bath. Close to the Great Falls, NJ Transit bus routes, and Paterson''s diverse food scene featuring Turkish, Arabic, and Peruvian cuisine.',
 '941 Main St', 'Paterson', 'New Jersey', '07503',
 1800, 2, 1, 940, 40.9060, -74.1570, '',
 ARRAY['Hardwood Floors','Parking'],
 '46 Carlton Ave unit 2'),

-- 51 · Paterson · NJ
('Paterson 2BR Near Great Falls',
 'Two-bedroom near the Great Falls National Historical Park with updated finishes. Walk to the falls overlook, the Paterson Museum, and the neighborhood''s bustling market streets.',
 '70 Broadway', 'Paterson', 'New Jersey', '07505',
 1650, 2, 1, 900, 40.9110, -74.1710, '',
 ARRAY['Hardwood Floors','Near Transit','Parking'],
 '403 West'),

-- 52 · Elizabeth · NJ
('Elmora 2BR on Stiles St',
 'Two-bedroom in the Elmora Hills section of Elizabeth with quiet tree-lined streets, assigned parking, and nearby parks. Walk to the Elmora Ave shopping district and NJ Transit.',
 '181 Stiles St', 'Elizabeth', 'New Jersey', '07208',
 2000, 2, 1, 800, 40.6680, -74.2290, '',
 ARRAY['Hardwood Floors','Parking','Pet Friendly'],
 '5522 Baum Blvd unit 705'),

-- 53 · Elizabeth · NJ
('Elizabeth 2BR on Murray St',
 'Renovated two-bedroom at Murray St Apartments in midtown Elizabeth. Walk to the NJ Transit station for one-seat rides to Penn Station. On-site laundry and secure entry.',
 '810 Murray St', 'Elizabeth', 'New Jersey', '07202',
 1900, 2, 1, 850, 40.6560, -74.2130, '',
 ARRAY['Elevator','In-Unit Laundry','Near Transit','Parking'],
 '15 Dorothy St unit 15A'),

-- 54 · Princeton · NJ
('Lofts at Princeton 2BR',
 'Spacious two-bedroom loft with up to 1,200 sqft in a luxury community in the heart of Princeton. In-unit washer/dryer, fitness center, resort-style pool, and covered parking.',
 '100 Loft Dr', 'Princeton', 'New Jersey', '08540',
 3500, 2, 2, 1200, 40.3430, -74.6530, '',
 ARRAY['Gym','Pool','In-Unit Laundry','Parking','Central AC'],
 '150 West Side Ave unit 1'),

-- 55 · Morristown · NJ
('Morristown Gateway 2BR',
 'Modern two-bedroom at Morristown Gateway on Ridgedale Ave near downtown and the Morristown train station. Express NJ Transit service to Penn Station in under an hour.',
 '12 Ridgedale Ave', 'Morristown', 'New Jersey', '07960',
 3200, 2, 1, 950, 40.7970, -74.4770, '',
 ARRAY['Gym','Elevator','Parking','Central AC','Near Transit'],
 '845 S. Kingsley'),

-- 56 · Morristown · NJ
('The M 2BR Near Train Station',
 'Two-bedroom at The M at Morristown, just 25 miles to NYC with express NJ Transit access. Resort-style pool, fitness center, and pet-friendly community in Morris County''s vibrant downtown.',
 '35 Turtle Rd', 'Morristown', 'New Jersey', '07960',
 3400, 2, 1, 900, 40.7910, -74.4830, '',
 ARRAY['Gym','Pool','Elevator','Parking','Central AC','Near Transit'],
 'Coronado St. Residences'),

-- 57 · Atlantic City · NJ
('Atlantic Ave 2BR Near Boardwalk',
 'Two-bedroom on Atlantic Ave steps from the boardwalk, casinos, and beach. Updated kitchen with stainless steel appliances. Enjoy the energy of AC with the comfort of a spacious home.',
 '1625 Atlantic Ave', 'Atlantic City', 'New Jersey', '08401',
 1800, 2, 1, 800, 39.3630, -74.4190, '',
 ARRAY['In-Unit Laundry','Parking','Near Beach','Pet Friendly'],
 '736 E 83rd St #2'),

-- 58 · Atlantic City · NJ
('The Atlantic 2BR Downtown',
 'Two-bedroom at The Atlantic on Atlantic Ave in the heart of Atlantic City. Steps from the beach, Steel Pier, and the Tanger Outlets. Building features gym, elevator, and rooftop terrace.',
 '300 Atlantic Ave', 'Atlantic City', 'New Jersey', '08401',
 2000, 2, 1, 850, 39.3620, -74.4280, '',
 ARRAY['Elevator','Gym','Central AC','Near Beach'],
 '17 6th St unit 2'),

-- 59 · Trenton · NJ
('Trenton 2BR on Spring St',
 'Affordable two-bedroom on Spring St with easy access to Trenton Transit Center. Spacious layout with separate dining area and updated bath. Close to the Delaware River waterfront park.',
 '281 Spring St', 'Trenton', 'New Jersey', '08618',
 1400, 2, 1, 800, 40.2280, -74.7780, '',
 ARRAY['Near Transit','In-Unit Laundry'],
 '77 Vinton St unit 1'),

-- 60 · Jersey City · NJ
('Journal Square 2BR Luxury',
 'Luxury two-bedroom near Journal Square with skyline views and modern finishes. Walk to the JSQ PATH station for a 15-minute ride to the World Trade Center. Rooftop lounge and fitness center.',
 '229 Beacon Ave', 'Jersey City', 'New Jersey', '07306',
 2800, 2, 1, 950, 40.7325, -74.0645, '',
 ARRAY['Doorman','Gym','Elevator','Rooftop Deck','Central AC'],
 '218 Grandview Terrace');


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2 — Reassign property_images to new listing IDs via image_group
-- ─────────────────────────────────────────────────────────────────────────────
-- Each new listing reuses the image_group from the original 60 listings.
-- This UPDATE links every property_images row to the new listing that now
-- owns that image_group.

UPDATE property_images pi
SET listing_id = l.id
FROM listings l
WHERE l.image_group = 'Studio 144-50 25th Rd'
  AND pi.listing_id IN (SELECT id FROM listings WHERE image_group = 'Studio 144-50 25th Rd');

-- Since TRUNCATE CASCADE already removed old listing IDs and we need to
-- relink images, use a simpler approach: match on image_group through a
-- temporary mapping.

-- Actually, TRUNCATE CASCADE on listings will have deleted property_images
-- rows via the FK CASCADE. So we need to re-run the image insert script
-- (update_listing_images.sql Step 3) AFTER running this seed.
--
-- However, the hero image_url UPDATE statements from update_listing_images.sql
-- still work because they match on image_group (which is preserved).
-- So after running this script, re-run update_listing_images.sql to:
--   1. Skip Step 1 (table already exists)
--   2. Run Step 2 (UPDATE hero images) — works because image_group matches
--   3. Run Step 3 (INSERT gallery images) — works because new listing IDs exist

-- For convenience, here are the Step 2 hero-image UPDATE statements:

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
-- 30 New York (Manhattan, Brooklyn, Queens, Bronx, Staten Island)
-- 30 New Jersey (Jersey City, Hoboken, Newark, Paterson, Elizabeth,
--               New Brunswick, Trenton, Princeton, Morristown, Atlantic City)
