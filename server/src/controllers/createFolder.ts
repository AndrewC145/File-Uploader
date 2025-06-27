import { createClient } from '@supabase/supabase-js';
import { Database } from '../db/supabase';
import { Request, Response, NextFunction } from 'express';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be provided');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function createBucket(bucketName: string): Promise<any> {
  const { data, error } = await supabase.storage.createBucket(bucketName, {
    public: false,
  });

  if (error) {
    throw new Error(`Error creating bucket: ${error}`);
  }

  console.log(data);
  return data;
}

export default createBucket;
