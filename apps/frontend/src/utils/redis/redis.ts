// lib/redis.ts
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_REDIS_HOST!,
  token: process.env.NEXT_PUBLIC_REDIS_TOKEN!,
});
