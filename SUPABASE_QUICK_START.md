# Supabase Configuration Complete ✓

Successfully switched from MongoDB to **Supabase** (PostgreSQL)!

## What Changed

✅ **Removed**: MongoDB/Mongoose
✅ **Added**: Supabase PostgreSQL
✅ **Updated**: API functions to use Supabase queries
✅ **New**: Supabase configuration files

## Quick Setup (5 minutes)

### 1. Create Supabase Project
- Go to https://supabase.com
- Sign up and create a new project
- Copy your credentials:
  - **SUPABASE_URL** (from Settings > API)
  - **SUPABASE_SERVICE_KEY** (from Settings > API)

### 2. Update .env
Edit `backend/.env`:
```dotenv
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key-here
```

### 3. Create Database Tables
In Supabase dashboard → SQL Editor, copy and run the SQL from `SUPABASE_SETUP.md`

Tables to create:
- `fraud_types`
- `phone_numbers`
- `phone_reports`
- `contacts`

### 4. Enable RLS (Row Level Security)
For development, allow public access to read/write data (see SUPABASE_SETUP.md for SQL)

### 5. Start Backend
```bash
cd backend
npm install
npm run dev
```

## API Endpoints

Same endpoints, now using Supabase:

```
GET    /api/fraud-types                    → Read from fraud_types table
GET    /api/fraud-types?slug=...          → Single fraud type
GET    /api/phone-numbers?number=...      → Get phone number with reports
GET    /api/phone-numbers?search=...      → Search phone numbers
POST   /api/phone-numbers                 → Add new report
POST   /api/contacts                      → Submit contact form
```

## Files Created/Modified

### New Supabase Files
- `backend/config/supabase.ts` - Supabase client
- `backend/api/fraudTypesSupabase.ts` - Fraud type queries
- `backend/api/phoneNumbersSupabase.ts` - Phone number queries
- `backend/api/contactsSupabase.ts` - Contact queries

### Updated Files
- `backend/.env` - Supabase credentials
- `backend/package.json` - Removed mongoose, added @supabase/supabase-js
- `backend/server.ts` - Supabase imports instead of MongoDB

### Old MongoDB Files (Still Exist)
- `backend/config/database.ts`
- `backend/models/FraudTypeSchema.ts`
- `backend/models/PhoneNumberSchema.ts`
- `backend/models/ContactSchema.ts`
- `backend/api/fraudTypesDB.ts`
- `backend/api/phoneNumbersDB.ts`
- `backend/api/contactsDB.ts`

(You can delete these if you don't need them)

## Supabase Advantages

✨ PostgreSQL (vs MongoDB)
✨ Real-time subscriptions
✨ Built-in authentication
✨ Row-level security (RLS)
✨ Free tier includes 500MB database
✨ No setup required
✨ Automatic backups

## Connection Test

After setup, you should see:
```
✓ Supabase connected successfully
✓ Backend server running on http://localhost:5000
```

If you don't see "Supabase connected", check:
1. SUPABASE_URL and SUPABASE_SERVICE_KEY in .env
2. Tables exist in Supabase dashboard
3. RLS policies allow access

See `SUPABASE_SETUP.md` for complete documentation and SQL scripts.
