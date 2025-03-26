
# Student Management System – Backend

Welcome to the **Student Management System** backend, built using **Node.js**, **Express**, and **MongoDB**. This API allows administrators to manage students, assign tasks, and supports secure login with JWT authentication.

## Getting Started

 **Clone the Repository and install dependencies**  

```bash
git clone https://github.com/amalrajsr/StudentManagement.git
cd Student-Management-System
npm install
```

##  Environment Variables
Create a .env file in the project root:
```bash
MONGO_URI=<MONGO ATALS URI>
PORT=<SPECIFY THE PORT TO RUN SERVER>
JWT_SECRET=<JWT Secret key>
JWT_EXPIRE=<JWT Expiration time>
```

##  Start Server
Start the development server:
```bash
npm run dev
```

##  Authentication
On successful login, you receive a JWT Bearer token.

Use it in the Authorization header for protected routes:
```bash
Authorization: Bearer <your_token>
```

## API Documentation
https://documenter.getpostman.com/view/25719261/2sAYkLkbnp