#!/usr/bin/env node

/**
 * Quick test script to verify fraud_reports table setup
 * Run: npm run test:db
 */

import dotenv from 'dotenv';
dotenv.config();

import { supabase } from '../config/supabase';

async function testSetup() {
  console.log('🔍 Testing fraud_reports table setup...\n');

  try {
    // Test 1: Check if table exists
    console.log('✓ Test 1: Checking if fraud_reports table exists...');
    const { data: tables, error: tableError } = await supabase
      .from('fraud_reports')
      .select('*')
      .limit(1);

    if (tableError) {
      throw new Error(`Table not found: ${tableError.message}`);
    }
    console.log('  ✓ fraud_reports table exists\n');

    // Test 2: Count records
    console.log('✓ Test 2: Counting records...');
    const { count, error: countError } = await supabase
      .from('fraud_reports')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;
    console.log(`  ✓ Found ${count} records in fraud_reports\n`);

    // Test 3: Sample data
    console.log('✓ Test 3: Retrieving sample data...');
    const { data: samples, error: sampleError } = await supabase
      .from('fraud_reports')
      .select('phone_number, fraud_type')
      .limit(3);

    if (sampleError) throw sampleError;
    console.log('  Sample records:');
    samples?.forEach((s: any) => {
      console.log(`    • ${s.phone_number}: ${s.fraud_type}`);
    });
    console.log();

    // Test 4: Query by phone number
    console.log('✓ Test 4: Testing search by phone number...');
    const { data: phoneResults, error: phoneError } = await supabase
      .from('fraud_reports')
      .select('*')
      .eq('phone_number', '+46701234567');

    if (phoneError) throw phoneError;
    console.log(`  ✓ Found ${phoneResults?.length} reports for +46701234567\n`);

    // Test 5: Fraud type stats
    console.log('✓ Test 5: Getting fraud type statistics...');
    const { data: allData, error: statsError } = await supabase
      .from('fraud_reports')
      .select('fraud_type');

    if (statsError) throw statsError;

    const stats = new Map<string, number>();
    allData?.forEach((row: any) => {
      stats.set(row.fraud_type, (stats.get(row.fraud_type) || 0) + 1);
    });

    console.log('  Fraud types found:');
    Array.from(stats.entries())
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`    • ${type}: ${count} report(s)`);
      });
    console.log();

    console.log('✅ All tests passed! fraud_reports table is ready to use.\n');
    console.log('Next steps:');
    console.log('  1. npm run dev (start backend)');
    console.log('  2. In another terminal: cd src && npm run dev (start frontend)');
    console.log('  3. Visit http://localhost:3000 to test the app');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testSetup();
