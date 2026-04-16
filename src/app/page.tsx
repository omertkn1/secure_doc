import "@/styles/landing.css";

export default function HomePage() {
  return (
    <main className="landing">
      {/* Shield Icon */}
      <div className="landing__icon" aria-hidden="true">
        🛡️
      </div>

      {/* Title */}
      <h1 className="landing__title">
        Secure<span>Doc</span>
      </h1>

      {/* Subtitle */}
      <p className="landing__subtitle">
        A secure personal vault for sensitive data and documents.
        Built with end-to-end encryption in mind.
      </p>

      {/* Feature Cards — presented as planned, not yet implemented */}
      <div className="landing__features">
        <div className="feature-card">
          <div className="feature-card__icon">🔐</div>
          <h2 className="feature-card__title">AES-256 Encryption</h2>
          <p className="feature-card__desc">
            Records will be encrypted with AES-256-GCM in the browser
            before reaching the server.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">🤝</div>
          <h2 className="feature-card__title">Secure Sharing</h2>
          <p className="feature-card__desc">
            Planned support for sharing documents via RSA-encrypted keys
            so only the intended recipient can decrypt.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-card__icon">✅</div>
          <h2 className="feature-card__title">Integrity Verification</h2>
          <p className="feature-card__desc">
            SHA-256 hashing and RSA-PSS signatures will verify that
            shared data has not been tampered with.
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="landing__status">
        <span className="landing__status-dot"></span>
        Phase 1 — Foundation Running
      </div>
    </main>
  );
}
