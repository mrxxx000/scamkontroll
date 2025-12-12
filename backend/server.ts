import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables FIRST, before importing supabase
dotenv.config();

import { testConnection } from './config/supabase';
import { createContact } from './api/contactsSupabase';
import {
  getReportsByPhoneNumber,
  getLatestReports,
  getTrendingPhoneNumbers,
  submitFraudReport,
  searchFraudReports,
  getAllPhoneNumbers,
  trackSearch,
  getMostSearched,
} from './api/fraudReports';
import { getFraudTypeCounts } from './api/fraudTypeCounts';
import { getReportsByType } from './api/fraudReports';

const app = express();
const PORT = process.env.PORT || 5000;

// Calculate risk level and percentage based on search count
function calculateRiskLevel(searchCount: number): { level: string; percentage: number } {
  // Risk percentage increases linearly with search count
  // 0 searches = 0% (LOW)
  // 5 searches = 25% (LOW-MEDIUM)
  // 10 searches = 50% (MEDIUM)
  // 15 searches = 75% (MEDIUM-HIGH)
  // 20 searches = 85% (HIGH)
  // Caps at 95% (never 100%)
  
  if (searchCount === 0) {
    return { level: 'LOW', percentage: 0 };
  }
  
  // Linear scaling: percentage = min(95, searchCount * 4.25)
  // At 20 searches: 20 * 4.25 = 85%
  // At 22 searches: 22 * 4.25 = 93.5% ≈ 94%
  // At 23+ searches: caps at 95%
  const percentage = Math.min(95, Math.round(searchCount * 4.25));
  
  let level = 'LOW';
  if (percentage >= 75) {
    level = 'HIGH';
  } else if (percentage >= 50) {
    level = 'MEDIUM';
  }
  
  return { level, percentage };
}

// Middleware
// Configure allowed origins for CORS. Set `CORS_ORIGINS` in the environment
// (comma-separated). Defaults to the Vercel frontend domain so the deployed
// frontend can call this API.
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
  : [
      'https://scamkontroll.vercel.app',
      'https://scamkontroll.xyz',
      'https://www.scamkontroll.xyz',
      'http://localhost:3000',
    ];

// Helper to check origin against configured patterns.
// Supports:
// - exact origins: https://example.com
// - host suffixes: .vercel.app or vercel.app
// - wildcard patterns: https://*.vercel.app or *.vercel.app
// - literal '*' to allow all
function isOriginAllowed(origin: string | undefined) {
  if (!origin) return true; // allow non-browser requests
  const o = origin.toLowerCase();

  for (const patternRaw of CORS_ORIGINS) {
    const pattern = patternRaw.toLowerCase();
    if (pattern === '*') return true;

    // If pattern contains a '*' treat as a simple glob
    if (pattern.includes('*')) {
      // Escape regex special chars except '*'
      const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*');
      const re = new RegExp('^' + escaped + '$');
      if (re.test(o)) return true;
      continue;
    }

    // If pattern is a bare host or starts with a dot, allow suffix matches
    if (!pattern.includes('://')) {
      // allow origins that end with the pattern, e.g. 'vercel.app' or '.vercel.app'
      if (o.endsWith(pattern)) return true;
      continue;
    }

    // Otherwise compare exact origin
    if (o === pattern) return true;
  }

  return false;
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Log origin and allowed patterns for debugging when running on Render
      console.debug('CORS check — origin:', origin, 'allowed:', CORS_ORIGINS);
      if (isOriginAllowed(origin)) return callback(null, true);
      return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Lightweight ping endpoint for uptime monitors (Uptime Robot) and external checks
app.get('/api/ping', (req: Request, res: Response) => {
  try {
    console.log('✅ /api/ping received');
    return res.json({ success: true, message: 'pong', timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Error handling /api/ping', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Numbers Routes - Define specific routes BEFORE generic :phone route
// Get latest reported scams (for homepage)
app.get('/api/numbers/reports/latest', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const reports = await getLatestReports(limit);
    res.json(reports);
  } catch (error) {
    console.error('Error fetching latest reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get trending numbers
app.get('/api/numbers/trending', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const trending = await getTrendingPhoneNumbers(limit);
    res.json(trending);
  } catch (error) {
    console.error('Error fetching trending numbers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get fraud type counts (counts per category from fraud_reports)
app.get('/api/fraud-type-counts', async (req: Request, res: Response) => {
  try {
    const counts = await getFraudTypeCounts();
    res.json(counts);
  } catch (error) {
    console.error('Error in /api/fraud-type-counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get reports for a specific fraud type/category
app.get('/api/fraud-type-reports', async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string | undefined;
    if (!type) return res.status(400).json({ error: 'Missing type query parameter' });

    const reports = await getReportsByType(type);
    res.json({ reports });
  } catch (error) {
    console.error('Error in /api/fraud-type-reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get most searched numbers
app.get('/api/numbers/most-searched', async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const mostSearched = await getMostSearched(limit);
    res.json(mostSearched);
  } catch (error) {
    console.error('Error fetching most searched numbers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search phone numbers
app.get('/api/numbers/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const results = await searchFraudReports(q);
    res.json(results);
  } catch (error) {
    console.error('Error searching numbers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generic phone number route - MUST be last
app.get('/api/numbers/:phone', async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;
    console.log(`📞 ROUTE: /api/numbers/:phone`);
    console.log(`📞 Fetching details for phone: "${phone}" (length: ${phone.length})`);

    console.log(`📞 Calling getReportsByPhoneNumber...`);
    const reports = await getReportsByPhoneNumber(phone);
    console.log(`📊 Found ${reports.length} reports for ${phone}`);
    if (reports.length > 0) {
      console.log(`📊 First report search_count: ${reports[0].search_count}`);
    }

    // Track the search and get total searches (this also inserts into number_searches)
    console.log(`📞 Before trackSearch: calling with phone "${phone}"`);
    const trackedSearchCount = await trackSearch(phone);
    console.log(`📞 After trackSearch, trackedSearchCount=${trackedSearchCount}`);

    // Prefer the tracked search count (from number_searches). If that is null, fall back to report's search_count
    const search_count = typeof trackedSearchCount === 'number' ? trackedSearchCount : (reports.length > 0 ? reports[0].search_count || 0 : 0);
    console.log(`📊 Using search_count: ${search_count}\n`);
    
    // Calculate risk based on search count
    const { level: risk_level, percentage: risk_percentage } = calculateRiskLevel(search_count);
    
    // Get last reported date from first report (most recent)
    const last_reported_at = reports.length > 0 ? reports[0].reported_at : null;

    res.json({
      phone_number: phone,
      total_reports: reports.length,
      search_count,
      risk_level,
      risk_percentage,
      last_reported_at,
      reports,
    });
  } catch (error) {
    console.error('Error fetching number details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit a report for a phone number
app.post('/api/numbers/:phone/report', async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;
    const { category, message } = req.body;

    console.log(`📝 Report submission for phone: "${phone}" (length: ${phone.length})`);

    if (!category || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const report = await submitFraudReport(phone, category, message);

    res.status(201).json(report);
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Routes
app.post('/api/contacts', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contact = await createContact({ name, email, subject, message });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const startServer = async () => {
  try {
    // Test Supabase connection
    const connected = await testConnection();
    
    app.listen(PORT, () => {
      console.log(`✓ Backend server running on http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      if (connected) console.log(`✓ Supabase connected and ready`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
