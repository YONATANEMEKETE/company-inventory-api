import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('PORT must be a valid number');
      }
      return parsed;
    }),
  DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid URL' }),
  SESSION_SECRET: z
    .string()
    .min(16, { message: 'SESSION_SECRET must be at least 16 characters long for security' }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// Validate process.env at startup
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Startup configuration validation failed:');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

// Export a read-only, fully typed configuration object
export const config = Object.freeze(parsedEnv.data);

// Export the Type representing the config shape
export type Config = typeof config;
