FROM node:24-slim

# 1. System essentials
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

# 2. Setup pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 3. COPY THE CLEARANCE & MANIFESTS
# Since context is ".", we must point to the subfolders
COPY .npmrc ./
COPY frontend/package.json frontend/pnpm-lock.yaml* ./

# 4. ENVIRONMENT & INSTALL
ENV CI=true
RUN pnpm install --no-frozen-lockfile

# 5. FINISH - Copy the rest of the frontend code
COPY frontend/ .

EXPOSE 5173
CMD ["pnpm", "dev"]
