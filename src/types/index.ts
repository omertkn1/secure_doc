// ─── Shared TypeScript Types ─────────────────────────────────────
// Central type definitions used across the application.
// Types will grow as features are added in later phases.

/** Classification of stored sensitive data */
export type DataType = "TURKISH_ID" | "CREDIT_CARD" | "EMAIL" | "IBAN" | "PHONE";

/** Cipher parameters stored alongside encrypted data */
export interface CipherParams {
  iv: string;       // Base64-encoded initialization vector
  authTag: string;  // Base64-encoded GCM authentication tag
}
