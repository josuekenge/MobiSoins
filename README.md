# MobiSoins Landing Page

Modern healthcare platform landing page built with React, TypeScript, Tailwind CSS 4, and Node.js.

## Project Structure

- `client/`: Frontend application (Vite + React)
- `server/`: Backend API (Node.js + Express + Prisma)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (for the backend database)

### Setup Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in `server/`
   - Add your database URL: `DATABASE_URL="postgresql://user:password@localhost:5432/mobisoins?schema=public"`

4. Initialize Database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### Setup Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Features

- Responsive Landing Page
- Waitlist Registration (connected to API)
- Service Showcase
- Interactive FAQ
- Tailwind CSS v4 styling
