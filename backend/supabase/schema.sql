-- Botswana Tourism Hub Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Safely Create Custom Types/Enums
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('tourist', 'business', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'business_status') THEN
        CREATE TYPE business_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'package_type') THEN
        CREATE TYPE package_type AS ENUM ('basic', 'standard', 'premium');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'media_type') THEN
        CREATE TYPE media_type AS ENUM ('image', 'video');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_type') THEN
        CREATE TYPE activity_type AS ENUM ('view', 'contact_whatsapp', 'contact_call', 'contact_email', 'bookmark');
    END IF;
END $$;

-- 2. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role user_role DEFAULT 'tourist',
  country_code TEXT,
  continent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Businesses Table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  location_district TEXT NOT NULL,
  location_place TEXT NOT NULL,
  phone_whatsapp TEXT,
  phone_office TEXT,
  email TEXT NOT NULL,
  website TEXT,
  status business_status DEFAULT 'pending',
  package_type package_type DEFAULT 'basic',
  price_range TEXT,
  image_url TEXT,
  certificate_url TEXT,
  payment_proof_url TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tourist Activity Table
CREATE TABLE IF NOT EXISTS tourist_activity (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  activity_type activity_type NOT NULL,
  visitor_continent TEXT NOT NULL,
  visitor_country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Business Media Gallery
CREATE TABLE IF NOT EXISTS business_media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  media_url TEXT NOT NULL,
  media_type media_type DEFAULT 'image',
  subheading TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- 8. Tourism Locations (Predefined Destinations)
CREATE TABLE IF NOT EXISTS tourism_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Packages Table
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_days INTEGER NOT NULL
);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourist_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourism_locations ENABLE ROW LEVEL SECURITY;

-- 11. Policies
DO $$ BEGIN
    -- Profiles
    DROP POLICY IF EXISTS "Public profiles viewable" ON profiles;
    CREATE POLICY "Public profiles viewable" ON profiles FOR SELECT USING (true);
    
    -- Businesses
    DROP POLICY IF EXISTS "Business visibility" ON businesses;
    CREATE POLICY "Business visibility" ON businesses FOR SELECT 
      USING (status = 'approved' OR auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

    -- Activity
    DROP POLICY IF EXISTS "Anyone can log activity" ON tourist_activity;
    CREATE POLICY "Anyone can log activity" ON tourist_activity FOR INSERT WITH CHECK (true);
    
    -- Tourism Locations
    DROP POLICY IF EXISTS "Tourism locations are viewable by everyone" ON tourism_locations;
    CREATE POLICY "Tourism locations are viewable by everyone" ON tourism_locations FOR SELECT USING (true);
END $$;

-- 12. Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
