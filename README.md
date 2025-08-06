
# 🧠 Task Management App (MERN Stack)

A full-featured task management system built with the **MERN stack** (MongoDB, Express, React, Node.js). It supports role-based access for **Admin** and **Users**, file uploads, task filtering, and real-time updates with test coverage.

---

## 🎥 Demo

> 📽 **Click to watch demo:**  
[![Watch the demo](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://youtu.be/c9FklC5WhZM)



---

## 🚀 Features

- 🔐 **Authentication & Authorization** (JWT-based)
- 👥 **Role-based dashboard** for Admin and Users
- 📦 **File Uploads** (PDF attachments to tasks)
- 📊 **Task Filters** (by status, priority, date)
- 📜 **RESTful API**
- 🧪 **Jest Tests** with >80% coverage
- 🐳 **Dockerized** setup for backend, frontend, and MongoDB

---

## 📁 Project Structure

```
├── Backend/            # Express.js API with MongoDB
├── Frontend/           # React.js UI (Vite)
├── docker-compose.yml  # Dev container orchestration
├── README.md           # Project documentation
```

---

## 🛠 Setup Instructions

### 🔧 Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (if not using Docker)

### 📦 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

# 2. Start services
docker-compose up --build

# 3. Access app
Frontend: http://localhost:3000  
Backend:  http://localhost:5000/api  
MongoDB:  localhost:27017
```

---

## 🧪 Running Tests

```bash
# Inside Backend/
npm install
npm run test
```

Includes test suites for:
- ✅ Auth routes
- ✅ User management
- ✅ Task creation/update/delete

---

## 📄 API Documentation

You can explore the API using:

- 🔸 **Postman Collection**: [Download here](./docs/task-manager.postman_collection.json)
- 🔸 Or import the `docs/task-manager.postman_collection.json` into Postman

Each endpoint includes:
- Parameters
- Auth requirements
- Example requests & responses

---

## 📝 Tech Stack

| Layer       | Technology     |
|-------------|----------------|
| Frontend    | React + Vite   |
| Backend     | Node.js + Express |
| Database    | MongoDB        |
| Auth        | JWT            |
| Styling     | SCSS           |
| File Upload | Multer         |
| Testing     | Jest + Supertest |
| DevOps      | Docker         |

---

## 📦 Deliverables Checklist

✅ Public GitHub repository  
✅ Well-structured `README.md`  
✅ Automated test cases with >80% coverage  
✅ API documentation via Postman  
✅ Dockerfile & Docker Compose  

---


---

## 📧 Contact

Built by **[Hamza Mubin]** | [hamzamubeen182@gmail.com]  
For demo credentials or questions, feel free to reach out.

---

