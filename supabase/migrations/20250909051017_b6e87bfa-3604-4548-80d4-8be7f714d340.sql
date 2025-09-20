-- Create ENUM types (skip if exists)
DO $$ BEGIN
    CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.product_category AS ENUM ('crop', 'fertilizer', 'seed', 'tool', 'biowaste');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.severity_level AS ENUM ('mild', 'moderate', 'severe');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.recycle_status AS ENUM ('available', 'sold', 'reserved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.notification_type AS ENUM ('weather', 'market', 'disease', 'govt');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.notification_status AS ENUM ('unread', 'read');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Users table - Link to auth.users via profiles pattern
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'farmer',
    location VARCHAR(255),
    language_pref VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. DiagnoseHistory table
CREATE TABLE public.diagnose_history (
    diagnosis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    image_url TEXT,
    disease_detected VARCHAR(255),
    severity severity_level,
    recommendations TEXT,
    fertilizers_suggested TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Fertilizers table
CREATE TABLE public.fertilizers (
    fertilizer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    disease_related VARCHAR(255),
    link VARCHAR(500),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Products table
CREATE TABLE public.products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    category product_category NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    location VARCHAR(255),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Orders table
CREATE TABLE public.orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(product_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. RecycleListings table
CREATE TABLE public.recycle_listings (
    recycle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    waste_type VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2),
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    status recycle_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. MarketPrices table
CREATE TABLE public.market_prices (
    market_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_name VARCHAR(100) NOT NULL,
    region VARCHAR(255) NOT NULL,
    price_per_kg DECIMAL(10,2) NOT NULL,
    date_recorded TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8. WeatherData table
CREATE TABLE public.weather_data (
    weather_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region VARCHAR(255) NOT NULL,
    forecast_date DATE NOT NULL,
    temperature DECIMAL(5,2),
    rainfall DECIMAL(8,2),
    suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. NewsBlogs table
CREATE TABLE public.news_blogs (
    blog_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. Notifications table
CREATE TABLE public.notifications (
    notif_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    status notification_status DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnose_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fertilizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycle_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for diagnose_history
CREATE POLICY "Users can view their own diagnose history" ON public.diagnose_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own diagnose records" ON public.diagnose_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for fertilizers (public read)
CREATE POLICY "Everyone can view fertilizers" ON public.fertilizers
    FOR SELECT USING (true);

-- RLS Policies for products
CREATE POLICY "Everyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Sellers can create products" ON public.products
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own products" ON public.products
    FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own products" ON public.products
    FOR DELETE USING (auth.uid() = seller_id);

-- RLS Policies for orders
CREATE POLICY "Users can view orders they're involved in" ON public.orders
    FOR SELECT USING (
        auth.uid() = buyer_id OR 
        auth.uid() = seller_id
    );

CREATE POLICY "Buyers can create orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Buyers and sellers can update order status" ON public.orders
    FOR UPDATE USING (
        auth.uid() = buyer_id OR 
        auth.uid() = seller_id
    );

-- RLS Policies for recycle_listings
CREATE POLICY "Everyone can view recycle listings" ON public.recycle_listings
    FOR SELECT USING (true);

CREATE POLICY "Farmers can create recycle listings" ON public.recycle_listings
    FOR INSERT WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own listings" ON public.recycle_listings
    FOR UPDATE USING (auth.uid() = farmer_id);

-- RLS Policies for market_prices (public read)
CREATE POLICY "Everyone can view market prices" ON public.market_prices
    FOR SELECT USING (true);

-- RLS Policies for weather_data (public read)
CREATE POLICY "Everyone can view weather data" ON public.weather_data
    FOR SELECT USING (true);

-- RLS Policies for news_blogs (public read)
CREATE POLICY "Everyone can view news blogs" ON public.news_blogs
    FOR SELECT USING (true);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_id ON public.profiles(id);
CREATE INDEX idx_diagnose_history_user_id ON public.diagnose_history(user_id);
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_orders_buyer_id ON public.orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON public.orders(seller_id);
CREATE INDEX idx_recycle_listings_farmer_id ON public.recycle_listings(farmer_id);
CREATE INDEX idx_market_prices_crop_region ON public.market_prices(crop_name, region);
CREATE INDEX idx_weather_data_region_date ON public.weather_data(region, forecast_date);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recycle_listings_updated_at BEFORE UPDATE ON public.recycle_listings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'farmer'::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();