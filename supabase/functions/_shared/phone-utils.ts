/**
 * Normalize any phone number format to +91XXXXXXXXXX
 * Handles: "9989820222", "+919989820222", "+91 99898 20222", "919989820222"
 */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  const last10 = digits.slice(-10);
  return `+91${last10}`;
}

/**
 * Mask a phone number for display: +919989820222 → ****820222
 */
export function maskPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  return '****' + normalized.slice(-6);
}
