# Intern - Developer - Basic Assessment Exam

'''
Hosted Project: [https://intern-exam-rose.vercel.app/login](https://intern-exam-rose.vercel.app/login)
'''

## Project Structure

```
Exam/
├── client/          
└── server/         
```

---

## Quick Start Guide

### Prerequisites

- Node.js v22.20.0 or higher
- npm

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/Ritsard404/Exam.git
cd Exam
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## Backend Setup (API)

### 1. Create Environment File

Create a `.env` file in the `server` directory:

```env
PORT=8000
JWT_SECRET=your_secret_key
```

> **Important:** Replace `your_secret_key` with a secure random string in production.

### 2. Start the API Server

```bash
cd server
npm start
```

The API will run at:

```
http://localhost:8000
```

You should see:

```
GeoIP Server Running
```

---

## Frontend Setup (Web)

### Start the Development Server

```bash
cd client
npm run dev
```

The web application will run at:

```
http://localhost:5173
```

---

## Default Login Credentials

Use these credentials to test the application:

```
Email: test@example.com
Password: password123
```

These credentials are also displayed on the login page for your convenience.

---

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS

### Backend (API)
- Node.js (v22.20.0)
- Express.js
- SQLite
- Sequelize ORM
- JSON Web Token (JWT)

---

## Features

- User authentication with JWT
- SQLite database with Sequelize ORM
- RESTful API
- React frontend with Vite
- Responsive UI with TailwindCSS
- Pre-seeded test user

---

## Running the Application

You will need **two terminal windows**:

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

Once both are running, open your browser and navigate to `http://localhost:5173` to access the application.

---

## Notes

- The database is automatically initialized with a test user on first run
- JWT tokens are used for authentication
- All API endpoints are prefixed with `/api`

---
