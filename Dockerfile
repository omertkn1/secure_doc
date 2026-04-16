FROM node:20-slim

WORKDIR /app

# Install OpenSSL (required by Prisma on Debian slim)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Create data directory for SQLite
RUN mkdir -p /app/data

# Install dependencies from lockfile (package-lock.json must exist)
COPY package.json package-lock.json ./
RUN npm ci

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start dev server (migrations should be run manually per README)
CMD ["npm", "run", "dev"]
