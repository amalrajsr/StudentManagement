
# Student Management System – Backend

Welcome to the **Student Management System** backend, built using **Node.js**, **Express**, and **MongoDB**. This API allows administrators to manage students, assign tasks, and supports secure login with JWT authentication.

## Getting Started

1. **Clone the Repository**  
   
```bash
git clone https://github.com/chris-121/Student-Management-System.git
cd Student-Management-System
npm install
```

## ⚙️ Environment Variables
Create a .env file in the project root:
```bash
MONGO_URI=<'your mongo atlas uri'>
PORT=<PORT>
JWT_SECRET=<JWT Secret key>
JWT_EXPIRE=<JWT Expiration time>
```

##  Start Server
Start the development server:
```bash
npm run dev
```
Server running on: http://localhost:<specified port>

## 🔐 Authentication
On successful login, you receive a JWT Bearer token.

Use it in the Authorization header for protected routes:
```bash
Authorization: Bearer <your_token>
```

## API Documentation
https://documenter.getpostman.com/view/25719261/2sAYkLkbnp