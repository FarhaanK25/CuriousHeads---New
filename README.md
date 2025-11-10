# CuriousHeads

CuriousHeads is a Q&A web platform built as a monorepo with a TypeScript-based frontend (Vite) and a Node.js backend. The goal is to let users ask questions, post answers, comment, vote and follow topics.

---

## Table of contents

* [Features](#features)
* [Tech stack](#tech-stack)
* [Repository structure](#repository-structure-inferred)
* [Prerequisites](#prerequisites)
* [Environment variables](#environment-variables)
* [Local setup & development](#local-setup--development)
* [Build & deploy](#build--deploy)
* [Contributing](#contributing)
* [Roadmap & TODOs](#roadmap--todos)
* [Contact](#contact)

---

## Features

* Ask and answer questions
* User authentication (JWT)
* MongoDB-backed persistence
* Client built with Vite + TypeScript
* Responsive UI (CSS)

---

## Tech stack

* Frontend: Vite + TypeScript + React (inferred from `vite.config.ts` and `.ts` files)
* Backend: Node.js + Express 
* Database: MongoDB 
* Authentication: JWT
* Build tools: npm  

---

## Repository structure (inferred)

```
/ (root)
├─ backend/              # Node/Express backend (API, routes, models, controllers)
├─ src/                  # Frontend source (Vite + TS)
├─ build/                # Production build output
├─ index.html            # Frontend entry
├─ vite.config.ts        # Vite configuration
├─ package.json          # Root scripts + dependencies (may run frontend)
├─ package-lock.json     # npm lockfile
├─ README.md             # (this file)
└─ .gitignore
```

---

## Prerequisites

* Node.js >= 18.x (recommended)
* npm (comes with Node) or your preferred package manager
* MongoDB (local or hosted MongoDB Atlas)

---

## Environment variables

Create a `.env` file in the `backend/` folder with at least these variables (example):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/curiousheads
JWT_SECRET=your_jwt_secret_here
# Add any other keys required by the backend, e.g. CLOUDINARY_URL, SMTP creds, etc.
```

---

## Local setup & development

1. Clone the repo:

```bash
git clone https://github.com/FarhaanK25/CuriousHeads---New.git
cd CuriousHeads---New
```

2. Install dependencies:

```bash
npm install
```

3. Separate frontend and backend commands

**Backend**

```bash
cd backend
npm install
npm run dev            # or `node index.js` / `nodemon src/index.js` depending on setup
```

**Frontend**

```bash
cd src                 # if frontend source lives in `src/` folder
npm install            # if dependencies live here (otherwise installed at root)
npm run dev
# open http://localhost:5173 (or port shown by Vite)
```

---

## Build & deploy

**Frontend (production build)**

```bash
cd src
npm run build
# deploy contents of the `dist/` or `build/` folder to static hosting (Netlify, Vercel, S3, etc.)
```

**Backend**

```bash
cd backend
NODE_ENV=production npm run start
# or use a process manager (pm2) and/or Dockerfile for production
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/short-description`
3. Make your changes and add tests
4. Open a pull request with a clear description

Please follow a consistent commit message style (e.g. Conventional Commits) and include code formatting (Prettier / ESLint) hooks if available.

---

## Roadmap & TODOs 

* AI Tutor chatbot
* Personalized learning paths
* Mobile app (React Native)
* Auto time-table generator
* Voice-based answering

---

## Contact

Maintainers: FarhaanK25 (Farhaan Khan), eshheet77 (Eshheet Raka), atulpandey5678 (Atul Pandey).
