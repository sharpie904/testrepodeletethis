# FamilyFolio

A modern family portfolio management application built with React, Vite, and HonoJS.

## Architecture

- **Frontend**: React + Vite + TanStack Router + TanStack Query
- **Backend**: HonoJS + Better Auth + Prisma
- **Database**: PostgreSQL
- **Authentication**: Better Auth (email/password)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Frontend  
   cp frontend/.env.example frontend/.env
   ```

4. Configure your database URL in `backend/.env`

5. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

6. Start the development servers:
   ```bash
   pnpm dev
   ```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:3000.

## Features

- User authentication (register/login)
- Family/Organization management
- Family member profiles
- Role-based access control
- Responsive design with Tailwind CSS

## Project Structure

```
├── backend/          # HonoJS backend
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── lib/      # Auth configuration
│   │   └── middleware/
│   └── prisma/       # Database schema and migrations
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── routes/   # TanStack Router routes
│   │   ├── hooks/    # Custom hooks
│   │   └── lib/      # Utilities and API client
└── shared/           # Shared types and utilities (future)
```

## Development

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both applications for production
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm lint` - Run ESLint on all files