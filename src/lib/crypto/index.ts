// ─── Crypto Module ───────────────────────────────────────────────
// This module will provide Web Crypto API helpers in Phase 2+.
//
// Planned exports:
// - generateAesKey()      → AES-256-GCM key generation
// - encryptAes()          → Encrypt plaintext with AES-256-GCM
// - decryptAes()          → Decrypt ciphertext with AES-256-GCM
// - generateRsaOaepKeys() → RSA-OAEP key pair generation
// - generateRsaPssKeys()  → RSA-PSS key pair generation
// - encryptRsa()          → Encrypt AES key with RSA-OAEP public key
// - decryptRsa()          → Decrypt AES key with RSA-OAEP private key
// - signData()            → Sign hash with RSA-PSS private key
// - verifySignature()     → Verify signature with RSA-PSS public key
// - hashSha256()          → SHA-256 hash of plaintext
// - deriveKeyPbkdf2()     → PBKDF2-derived AES key from password

export {};
