# Using Real Data Instead of Hardcoded Data

Your application now fetches real data from the backend API instead of using hardcoded values.

## How It Works

### 1. Backend API (http://localhost:5000)
The backend provides REST API endpoints:
- `GET /api/fraud-types` - Get all fraud types
- `POST /api/contacts` - Submit contact form
- `GET /api/phone-numbers` - Search/get phone numbers

### 2. Frontend (http://localhost:3000)
The frontend fetches data using `fetch()` with the API URL from environment variables.

## Setup & Running

### Step 1: Start the Backend
```bash
cd backend
npm install
npm run dev
```
The backend will run on **http://localhost:5000**

### Step 2: Start the Frontend (in another terminal)
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on **http://localhost:3000**

## Key Changes Made

### Pages Updated to Use Real Data:

1. **`/bedrageri` (Fraud Types Page)**
   - Fetches fraud types from `/api/fraud-types`
   - Shows loading state while fetching
   - Displays error if API fails

2. **`/kontakt` (Contact Page)**
   - Contact form now submits to `/api/contacts`
   - Shows success/error messages
   - Loading state during submission

### Configuration Files:

1. **`frontend/.env.local`**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   - Controls where the frontend sends API requests
   - Can change to different URL (e.g., production API)

## How to Fetch Data in Your Components

### Example: Fetch Fraud Types
```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/fraud-types`);
      const data = await response.json();
      setFraudTypes(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  fetchData();
}, []);
```

### Example: Submit Form Data
```typescript
const response = await fetch(`${apiUrl}/api/contacts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    message: 'Hello'
  })
});
```

## Pages Still Using Hardcoded Data

These pages can be updated similarly:
- `/artiklar` - Articles page
- `/om-oss` - About page
- `/nummer/[number]` - Phone number detail page
- Homepage (`/`) - Latest scams section

## Backend Data Structure

### FraudType
```typescript
{
  id: string;
  title: string;
  description: string;
  reportCount: number;
  riskLevel: 'high' | 'medium' | 'low';
}
```

### Contact
```typescript
{
  name: string;
  email: string;
  message: string;
}
```

### PhoneNumber
```typescript
{
  id: string;
  number: string;
  reports: Array<{
    id: string;
    content: string;
    author?: string;
    date: string;
  }>;
}
```

## Troubleshooting

**Error: "Failed to fetch"**
- Make sure backend is running on port 5000
- Check that `NEXT_PUBLIC_API_URL` is correct
- Check browser console for CORS errors

**Error: "Connection refused"**
- Backend may not be running
- Try: `cd backend && npm run dev`

**Data not showing**
- Check Network tab in browser DevTools
- Verify API endpoint returns data at `http://localhost:5000/api/fraud-types`
