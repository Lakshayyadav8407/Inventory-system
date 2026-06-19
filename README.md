# Inventory & Order Management System

Full-stack app: FastAPI + PostgreSQL backend, React frontend, Docker Compose orchestration.
 
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
