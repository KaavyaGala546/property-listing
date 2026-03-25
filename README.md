# Property Listing Platform

A full-stack web application for browsing, searching, and managing real estate listings, built with modern web technologies and a scalable architecture.

---

## 🚀 Live Demo

🔗 https://property-listing-amber.vercel.app/

---

## 📌 Overview

The Property Listing Platform is designed to provide users with a seamless experience for exploring real estate properties. It supports authentication, property browsing, filtering, and user-specific actions such as saving listings.

The system demonstrates end-to-end full-stack development, including frontend UI, backend APIs, database integration, and deployment.

---

## ✨ Key Features

- 🔐 User Authentication (Signup/Login with JWT)
- 🏠 Browse property listings
- 🔍 Search and filter properties
- ❤️ Save / manage favorite listings
- 👤 User profile management
- ⚡ Responsive and clean UI
- 🌐 Deployed frontend application

---

## 🛠️ Tech Stack

### Frontend

- React / Next.js
- HTML, CSS
- Tailwind CSS
- Context API

### Backend

- Node.js
- Express.js
- JWT Authentication

### Database

- MongoDB
- Mongoose

### Tools

- Git & GitHub
- VS Code

---

## ⚙️ System Architecture

```
Client (React / Next.js)
        ↓
API Layer (Express.js)
        ↓
Database (MongoDB)
```

- Frontend handles UI and user interaction
- Backend manages API routes, authentication, and business logic
- MongoDB stores user and property data

---

## 📁 Project Structure

```
property-listing/
│
├── client/        # Frontend application
├── server/        # Backend APIs
├── README.md      # Project documentation
└── docs/          # Supporting documentation
```

---

## ▶️ Getting Started

### 1. Setup Environment

Create a `.env` file in the root directory (using the provided `.env.example`):

```bash
# Backend
MONGO_URI=mongodb://localhost:27017/property-listing
JWT_SECRET=your_secret_key
PORT=5001

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 2. Consolidated Installation & Database Seed

You can install all dependencies and seed the database with sample properties in one command from the root:

```bash
npm run install:all && npm run seed
```

_This command installs dependencies for both `client` and `server`, then runs the database initialization and property generation scripts._

### 3. Run Development Servers

Start both the frontend and backend concurrently:

```bash
npm run dev
```

_The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5001`._

---

## 🔑 Sample Test Credentials

For demonstration purposes, you can use the following test account (after seeding):

- **Email:** `test@example.com`
- **Password:** `password123`

---

## ⚙️ Deployment Architecture

The Property Listing Platform follows a decoupled full-stack architecture:

### 🌐 Frontend (Client)

- **Framework**: Next.js (React)
- **Deployment**: Optimized for **Vercel**.
- **Communication**: Communicates with the backend via RESTful API calls. The API URL is configured via the `NEXT_PUBLIC_API_URL` environment variable.

### 🔌 Backend (Server)

- **Framework**: Node.js / Express
- **Deployment**: Can be deployed to **Render, Heroku, or DigitalOcean**.
- **Database**: Connects to **MongoDB Atlas** (Cloud) or a local MongoDB instance.

### 🗄️ Database (MongoDB)

- Data is persistent and managed through Mongoose models. Initial data can be generated using the built-in seeding scripts.

---

## 🛠️ Available Scripts (Server)

| Script                        | Description                                               |
| :---------------------------- | :-------------------------------------------------------- |
| `npm run seed`                | Initializes the database with base user and system data.  |
| `npm run generate-properties` | Generates 200+ sample property listings for the platform. |
| `npm start`                   | Starts the production server.                             |
| `npm run dev`                 | Starts the server with `nodemon` for auto-restart.        |

---

## 👤 Author

**Kaavya Gala**

---

## ⭐ Notes

This project demonstrates full-stack development capabilities, including API design, authentication, database management, and deployment of a production-ready web application.
