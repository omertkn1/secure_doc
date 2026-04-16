# SecureDoc

A secure digital vault for sensitive personal data and documents. Built as a university final project.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / macOS) or Docker Engine + Compose plugin (Linux)
- No host-side Node.js installation is required

## Quick Start

```bash
# 1. Clone the repository
git clone <repo-url>
cd SecureDoc

# 2. Copy environment file
cp .env.example .env

# 3. Generate package-lock.json (one-time, then commit it)
docker run --rm -v "${PWD}:/app" -w /app node:20-slim npm install --package-lock-only
git add package-lock.json && git commit -m "Add package-lock.json"

# 4. Build the container
docker compose build

# 5. Create the initial database migration (first time only)
docker compose run --rm app npx prisma migrate dev --name init

# 6. Start the development server
docker compose up
```

> **Note:** Step 3 only needs to run once. After `package-lock.json` is committed, teammates skip it.

The app will be available at [http://localhost:3000](http://localhost:3000).

## Rebuilding After Changes

```bash
# After pulling new code or editing package.json
docker compose down
docker compose up --build

# After schema changes
docker compose run --rm app npx prisma migrate dev --name describe_change
```

## Project Structure

```
SecureDoc/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   ├── lib/
│   │   ├── crypto/      # Web Crypto API helpers (Phase 2+)
│   │   ├── db/          # Prisma client singleton
│   │   └── validators/  # Regex validation (Phase 2+)
│   ├── styles/          # Vanilla CSS files
│   └── types/           # Shared TypeScript definitions
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** SQLite via Prisma ORM
- **Styling:** Vanilla CSS
- **Cryptography:** Web Crypto API (client-side, Phase 2+)
- **Containerization:** Docker + Docker Compose
