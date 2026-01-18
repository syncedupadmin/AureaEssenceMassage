import { kv } from '@vercel/kv';
import { NextRequest } from 'next/server';

interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of remaining requests in current window */
  remaining: number;
  /** Unix timestamp when the rate limit resets */
  resetAt: number;
}

/**
 * Check if KV is configured for rate limiting
 */
function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Get client identifier from request
 * Uses X-Forwarded-For header (Vercel) or falls back to a default
 */
function getClientId(request: NextRequest): string {
  // Vercel provides the client IP in X-Forwarded-For
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take the first IP (client's real IP)
    return forwarded.split(',')[0].trim();
  }

  // Fallback for local development
  return 'localhost';
}

/**
 * Rate limit a request using sliding window counter
 *
 * @param request - The incoming request
 * @param identifier - Unique identifier for the rate limit bucket (e.g., "bookings:create")
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export async function rateLimit(
  request: NextRequest,
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  // If KV is not configured, allow all requests (local development)
  if (!isKVConfigured()) {
    return {
      allowed: true,
      remaining: config.limit,
      resetAt: Date.now() + config.windowSeconds * 1000,
    };
  }

  const clientId = getClientId(request);
  const key = `ratelimit:${identifier}:${clientId}`;
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const windowStart = now - windowMs;

  try {
    // Use a pipeline for atomic operations
    const pipe = kv.pipeline();

    // Remove old entries outside the window
    pipe.zremrangebyscore(key, 0, windowStart);

    // Count current requests in window
    pipe.zcard(key);

    // Add current request with timestamp as score
    pipe.zadd(key, { score: now, member: `${now}:${Math.random()}` });

    // Set expiry on the key
    pipe.expire(key, config.windowSeconds);

    const results = await pipe.exec();

    // results[1] is the count before adding current request
    const currentCount = (results[1] as number) || 0;
    const allowed = currentCount < config.limit;
    const remaining = Math.max(0, config.limit - currentCount - 1);
    const resetAt = now + windowMs;

    return { allowed, remaining, resetAt };
  } catch (error) {
    console.error('Rate limit error:', error);
    // On error, allow the request (fail open)
    return {
      allowed: true,
      remaining: config.limit,
      resetAt: now + windowMs,
    };
  }
}

// Pre-configured rate limiters for different endpoints

/**
 * Rate limit for booking creation (5 requests per minute)
 */
export async function rateLimitBookingCreate(request: NextRequest): Promise<RateLimitResult> {
  return rateLimit(request, 'bookings:create', { limit: 5, windowSeconds: 60 });
}

/**
 * Rate limit for booking status lookup (10 requests per minute)
 */
export async function rateLimitBookingStatus(request: NextRequest): Promise<RateLimitResult> {
  return rateLimit(request, 'bookings:status', { limit: 10, windowSeconds: 60 });
}

/**
 * Rate limit for booking cancellation (3 requests per minute)
 */
export async function rateLimitBookingCancel(request: NextRequest): Promise<RateLimitResult> {
  return rateLimit(request, 'bookings:cancel', { limit: 3, windowSeconds: 60 });
}

/**
 * Add rate limit headers to response
 */
export function addRateLimitHeaders(
  headers: Headers,
  result: RateLimitResult,
  config: RateLimitConfig
): void {
  headers.set('X-RateLimit-Limit', config.limit.toString());
  headers.set('X-RateLimit-Remaining', result.remaining.toString());
  headers.set('X-RateLimit-Reset', result.resetAt.toString());
}
