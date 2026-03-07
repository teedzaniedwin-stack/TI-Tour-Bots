-- Seed Data

-- Predefined Tourism Locations
INSERT INTO tourism_locations (name, description, latitude, longitude, image_url) VALUES
('Okavango Delta', 'A vast inland river delta in northern Botswana, known for its sprawling grassy plains and lush animal habitats.', -19.2833, 22.8833, 'https://picsum.photos/seed/okavango/800/600'),
('Chobe National Park', 'Famous for its large elephant herds and the Chobe River front, which supports a high density of wildlife.', -18.6667, 24.5000, 'https://picsum.photos/seed/chobe/800/600'),
('Makgadikgadi Pans', 'One of the largest salt flats in the world, situated in the middle of the dry savanna of north-eastern Botswana.', -20.5833, 25.4167, 'https://picsum.photos/seed/pans/800/600'),
('Tsodilo Hills', 'A UNESCO World Heritage site consisting of rock art, rock shelters, depressions and caves.', -18.7500, 21.7333, 'https://picsum.photos/seed/tsodilo/800/600');

-- Packages
INSERT INTO packages (name, price, duration_days) VALUES
('Basic Listing', 0.00, 365),
('Premium Safari Package', 1500.00, 30),
('Business Growth Pack', 2500.00, 90);
