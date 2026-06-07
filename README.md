# Inventory & Order Management System

Full-stack app: FastAPI + PostgreSQL backend, React frontend, Docker Compose orchestration.

---

## ⚡ Quick Start (Local)

```bash
# 1. Clone / copy this folder, then:
cd inventory-system
docker-compose up --build
```

| Service       | URL                              |
|---------------|----------------------------------|
| Frontend      | http://localhost:3000            |
| Backend API   | http://localhost:8000            |
| API Docs      | http://localhost:8000/docs       |
| Health Check  | http://localhost:8000/health     |

---

## 📋 Submission Form Answers

Fill your Google Form with these values:

| Field                         | Value                                              |
|-------------------------------|----------------------------------------------------|
| GitHub Repository Link        | https://github.com/YOUR_USERNAME/inventory-system  |
| Backend Docker Hub Image Link | https://hub.docker.com/r/YOUR_USERNAME/inventory-backend |
| Frontend Hosted URL           | http://localhost:3000  (or your deployed URL)      |
| Backend API Hosted URL        | http://localhost:8000  (or your deployed URL)      |

---

## 🚀 Push to GitHub

```bash
cd inventory-system
git init
git add .
git commit -m "Initial commit: Inventory Management System"
git remote add origin https://github.com/YOUR_USERNAME/inventory-system.git
git push -u origin main
```

## 🐳 Push Backend to Docker Hub

```bash
cd backend
docker build -t YOUR_USERNAME/inventory-backend:latest .
docker login
docker push YOUR_USERNAME/inventory-backend:latest
```

Docker Hub image URL will be:
`https://hub.docker.com/r/YOUR_USERNAME/inventory-backend`

## 🌐 Deploy Frontend (Render / Vercel / Railway)

**Render (free):**
1. Go to https://render.com → New → Static Site or Web Service
2. Connect your GitHub repo
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `build`

**Railway (full stack, recommended):**
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. It auto-detects docker-compose.yml and deploys all 3 services

---

## 🔑 API Endpoints

| Method | Endpoint       | Description          |
|--------|---------------|----------------------|
| GET    | /products/    | List all products    |
| POST   | /products/    | Add a product        |
| GET    | /customers/   | List all customers   |
| POST   | /customers/   | Register a customer  |
| GET    | /orders/      | List all orders      |
| POST   | /orders/      | Place an order       |
| GET    | /health       | Health check         |
| GET    | /docs         | Swagger UI           |

---

## 📁 Project Structure

```
inventory-system/
├── docker-compose.yml
├── backend/
│   ├── .env
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── database.py
│   ├── models.py
│   └── main.py
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── index.js
        └── App.js
```
