import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

const nodeEnv = process.env.NODE_ENV || 'development';

const envFileMap: Record<string, string> = {
  development: '.env',
  test: '.env.test',
  production: '.env.production',
};

const envFile = envFileMap[nodeEnv] ?? '.env';
const envPath = path.resolve(process.cwd(), envFile);

if (!fs.existsSync(envPath)) {
  console.error(`❌ Required environment file "${envFile}" not found`);
  process.exit(1);
}

dotenv.config({ path: envPath, override: true });
console.log(`✅ Loaded environment variables from ${envFile}`);

// Validate environmanr variables
const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:\n', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
