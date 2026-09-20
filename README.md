# TechFinance

Personal finance web app built for **TechLab 2025 (Tech4Humans)** — 1st place. JWT auth, modular MSC-style backend, Redis-backed queues and AI-assisted insights.

## Problem

Managing money across multiple accounts and cards quickly becomes messy: pending transfers, category filters and insights live in separate tools. TechFinance consolidates accounts, cards, transactions, contacts and a dashboard in one full-stack app, with async processing so the API stays responsive under concurrent operations.

## Features

- User registration and login (bcrypt + JWT in secure cookies)
- Multiple checking/savings accounts and credit/debit cards
- Transactions with pending state resolved via Redis/Bull queues
- Categories, contacts, dynamic filters and dashboard charts
- AI chat popup for finance-related insights with conversation continuity
- Rate limiting and layered validation (frontend, Zod/class-validator, DB constraints)
- Unit tests with Jest

## Stack

| Layer | Technology |
| :--- | :--- |
| Frontend | React, React Router, TypeScript, Tailwind CSS, MUI, Flowbite |
| Backend | Node.js, Express, TypeScript, TypeORM |
| Database | PostgreSQL |
| Cache / queues | Redis, Bull |
| Auth | JWT, bcrypt, HttpOnly cookies |
| Tooling | pnpm, Docker Compose, Jest, ESLint, Prettier, Husky |

```
backend/     Modular features (controllers, services, DTOs), middlewares, TypeORM entities
frontend/    React Router app — screens, components, contexts, API services
```

## Architecture notes

Backend modules follow a NestJS-inspired style (decorators + `reflect-metadata`) with clear separation of routes, services and entities. Redis is used for queues so multi-step financial operations (e.g. pending debit/credit) do not block the request path. Ownership checks run in middleware so users only reach their own accounts and cards.

## Getting started

**Prerequisites:** Node.js (LTS), pnpm, Docker (recommended).

```bash
git clone https://github.com/BrunoBianchi/Tech4Humans-Webapp-Financa.git
cd Tech4Humans-Webapp-Financa
```

Create a root `.env` (used by Docker Compose), for example:

```dotenv
PORT=5000
NODE_ENV=development
FRONTEND_PORT=5173
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=tech4humans
POSTGRES_PASSWORD=tech4humans
POSTGRES_DB=webapp
REDIS_HOST=redis
REDIS_PORT=6379
UPDATE_KEY=change-me
```

```bash
docker compose build --no-cache
docker compose up
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Manual run (without Docker): start PostgreSQL and Redis locally, then `pnpm install` + start scripts inside `backend/` and `frontend/`.

## Author

**Bruno Bianchi** — Full-Stack Developer  
[github.com/BrunoBianchi](https://github.com/BrunoBianchi) · [brunobianchi.dev](https://brunobianchi.dev)
