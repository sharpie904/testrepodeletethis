# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm
ENV CI=true

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN pnpm install --frozen-lockfile

# ---- Backend build ----
FROM base AS backend-builder
# copy backend source first
COPY backend ./backend
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
WORKDIR /app/backend
# RUN ls -laR

RUN pnpm install --filter backend --frozen-lockfile

RUN pnpx prisma generate && pnpm build

# ---- Frontend build ----
FROM base AS frontend-builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY frontend ./frontend
COPY tsconfig.json ./
WORKDIR /app/frontend
RUN pnpm build

# ---- Backend production ----
FROM base AS backend
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/
RUN pnpm install --filter backend --prod --frozen-lockfile

COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/prisma ./backend/prisma
COPY --from=backend-builder /app/backend/node_modules/ ./backend/node_modules/
COPY --from=backend-builder /app/backend/node_modules/@prisma ./backend/node_modules/@prisma

WORKDIR /app/backend
EXPOSE 3000
CMD ["pnpm", "run", "start:migrate"]

# ---- Frontend production ----
FROM base AS frontend
WORKDIR /app
RUN npm install -g serve
COPY --from=frontend-builder /app/frontend/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]