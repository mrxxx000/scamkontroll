# Supabase Setup Guide

Your backend is now configured to use **Supabase** instead of MongoDB. Supabase provides PostgreSQL database + authentication + real-time features.

## Prerequisites

1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Get your credentials from the Supabase dashboard

## Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com and sign in
2. Create a new project or use an existing one
3. Go to **Settings > API** (or Project Settings)
4. Copy these values:
   - **Project URL** - This is your `SUPABASE_URL`
   - **anon public key** - Paste somewhere temporarily
   - **service_role key** - This is your `SUPABASE_SERVICE_KEY`

## Step 2: Update .env File

Update `backend/.env` with your Supabase credentials:

```dotenv
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-key-here
```

Example (these are fake):
```dotenv
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Create Database Tables in Supabase

Go to Supabase dashboard → **SQL Editor** and run these queries:

### Create fraud_types table
```sql
CREATE TABLE fraud_types (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  severity VARCHAR(50) NOT NULL,
  icon VARCHAR(50),
  report_count INT DEFAULT 0,
  safety_tips TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Create phone_numbers table
```sql
CREATE TABLE phone_numbers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  number VARCHAR(20) NOT NULL UNIQUE,
  description TEXT,
  risk_level VARCHAR(50) DEFAULT 'medium',
  total_reports INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Create phone_reports table
```sql
CREATE TABLE phone_reports (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  phone_number_id BIGINT NOT NULL REFERENCES phone_numbers(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author VARCHAR(255),
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Create contacts table
```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  subject VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Step 4: Create RLS (Row Level Security) Policies

For development, you can disable RLS or set public access. In Supabase dashboard:

1. Go to **Authentication > Policies**
2. For each table (fraud_types, phone_numbers, contacts, phone_reports):
   - Click on the table
   - Click **Enable RLS**
   - Add policy: **SELECT** - Public (for reading data)
   - Add policy: **INSERT** - Public (for submitting reports/contacts)

Or run these SQL commands to allow public access:

```sql
-- fraud_types
ALTER TABLE fraud_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON fraud_types FOR SELECT USING (true);

-- phone_numbers
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON phone_numbers FOR SELECT USING (true);

-- phone_reports
ALTER TABLE phone_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON phone_reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON phone_reports FOR INSERT WITH CHECK (true);

-- contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON contacts FOR INSERT WITH CHECK (true);
```

## Step 5: Seed Sample Data (Optional)

Add sample data to your tables in Supabase SQL Editor:

```sql
-- Insert fraud types
INSERT INTO fraud_types (name, slug, description, severity, icon, report_count, safety_tips)
VALUES 
  ('PostNord Bluff', 'postnord-bluff', 'Scammers pretend to be PostNord delivery service', 'high', 'Package', 5420, ARRAY['Never click links from unknown SMS', 'Check PostNord directly']),
  ('BankID Bluff', 'bankid-bluff', 'Criminals pose as banks requesting BankID', 'critical', 'CreditCard', 8932, ARRAY['Banks never ask for BankID', 'Call your bank directly']),
  ('Skatteverket Bluff', 'skatteverket-bluff', 'Fake tax authority calls claiming money owed', 'high', 'Building2', 6750, ARRAY['Tax authority uses postal mail', 'Never pay over the phone']);

-- Insert phone numbers
INSERT INTO phone_numbers (number, description, risk_level, total_reports)
VALUES 
  ('0769452000', 'Known PostNord scam number', 'high', 145),
  ('0812345678', 'Suspected BankID scam', 'critical', 89);

-- Insert sample reports
INSERT INTO phone_reports (phone_number_id, content, author, upvotes)
VALUES 
  (1, 'Received SMS about undelivered package', 'User123', 45),
  (1, 'Called saying I had a package waiting', 'Anonym', 32),
  (2, 'Caller claimed to be from my bank', 'JohnDoe', 123);
```

## Step 6: Start Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✓ Backend server running on http://localhost:5000
✓ Health check: http://localhost:5000/health
✓ Supabase connected successfully
```

## API Endpoints (Using Supabase)

### Fraud Types
- `GET /api/fraud-types` - Get all fraud types from Supabase
- `GET /api/fraud-types?slug=postnord-bluff` - Get specific fraud type

### Phone Numbers
- `GET /api/phone-numbers?number=0769452000` - Get phone number with reports
- `GET /api/phone-numbers?search=0769` - Search phone numbers
- `POST /api/phone-numbers` - Add new report

### Contacts
- `POST /api/contacts` - Submit contact form (saved to Supabase)

## Test the Connection

```bash
# In backend directory
npm run dev
```

Then open http://localhost:5000/health in your browser.
You should see: `{"status":"OK","message":"Backend is running"}`

## Files Updated

### New Files
- `backend/config/supabase.ts` - Supabase client configuration
- `backend/api/fraudTypesSupabase.ts` - Fraud type queries
- `backend/api/phoneNumbersSupabase.ts` - Phone number queries
- `backend/api/contactsSupabase.ts` - Contact queries

### Modified Files
- `backend/.env` - Added Supabase credentials
- `backend/package.json` - Replaced mongoose with @supabase/supabase-js
- `backend/server.ts` - Updated to use Supabase imports

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure .env has SUPABASE_URL and SUPABASE_SERVICE_KEY
- No quotes around the values

**Error: "Supabase connection error"**
- Check your credentials are correct
- Verify tables exist in Supabase
- Check that RLS policies allow public access

**404 on API endpoints**
- Ensure tables are created with correct names (all lowercase with underscores)
- Check column names match the API code

**Data not appearing**
- Verify data was inserted in Supabase SQL Editor
- Check RLS policies allow SELECT

## Next Steps

1. ✅ Set up Supabase project and tables
2. ✅ Add credentials to .env
3. ✅ Start backend with `npm run dev`
4. ✅ Frontend will automatically fetch from Supabase via API
5. Create admin panel to manage data in Supabase
6. Add authentication for admin features
7. Set up email notifications for new contacts
