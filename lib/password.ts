/**
 * Password hashing utilities using Web Crypto API
 * Compatible with Edge runtime (no native node modules)
 */

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const ALGORITHM = 'PBKDF2';

/**
 * Generate a random salt
 */
function generateSalt(): string {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return Buffer.from(salt).toString('hex');
}

/**
 * Derive a key from password and salt using PBKDF2
 */
async function deriveKey(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = Buffer.from(salt, 'hex');

  const key = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    ALGORITHM,
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: ALGORITHM,
      salt: saltBuffer,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    KEY_LENGTH * 8
  );

  return Buffer.from(derivedBits).toString('hex');
}

/**
 * Hash a password
 * Returns format: iterations$salt$hash
 */
export async function hash(password: string): Promise<string> {
  const salt = generateSalt();
  const derivedKey = await deriveKey(password, salt);
  return `${ITERATIONS}$${salt}$${derivedKey}`;
}

/**
 * Compare a password against a hash
 */
export async function compare(password: string, storedHash: string): Promise<boolean> {
  try {
    const [iterationsStr, salt, hash] = storedHash.split('$');
    const iterations = parseInt(iterationsStr, 10);

    if (!iterations || !salt || !hash) {
      return false;
    }

    const derivedKey = await deriveKey(password, salt);
    return derivedKey === hash;
  } catch {
    return false;
  }
}
