import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/supabase';
import { getAllFraudTypes, getFraudType } from './api/fraudTypesSupabase';
import { getPhoneNumber, searchPhoneNumbers, addReport } from './api/phoneNumbersSupabase';
import { createContact } from './api/contactsSupabase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Fraud Types Routes
app.get('/api/fraud-types', async (req: Request, res: Response) => {
  try {
    const { slug } = req.query;

    if (slug && typeof slug === 'string') {
      const fraudType = await getFraudType(slug);
      if (!fraudType) {
        return res.status(404).json({ error: 'Fraud type not found' });
      }
      return res.json(fraudType);
    }

    const fraudTypes = await getAllFraudTypes();
    res.json(fraudTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Phone Numbers Routes
app.get('/api/phone-numbers', async (req: Request, res: Response) => {
  try {
    const { number, search } = req.query;

    if (number && typeof number === 'string') {
      const phoneNumber = await getPhoneNumber(number);
      if (!phoneNumber) {
        return res.status(404).json({ error: 'Phone number not found' });
      }
      return res.json(phoneNumber);
    }

    if (search && typeof search === 'string') {
      const results = await searchPhoneNumbers(search);
      return res.json(results);
    }

    res.status(400).json({ error: 'Missing query parameters' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/phone-numbers', async (req: Request, res: Response) => {
  try {
    const { number, content, author } = req.body;

    if (!number || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const report = await addReport(number, { content, author: author || 'Anonymous' });
    res.status(201).json(report);
  } catch (error) {
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
