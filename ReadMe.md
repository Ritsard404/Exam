# Node.js User Login Server

This is a simple **Node.js + Express** backend using **SQLite** and **Sequelize ORM**.  
It includes basic setup and a simple user login feature using **JWT (JSON Web Token)** for authentication.

---

## Setup Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a .env File

Create a `.env` file in the project root directory and add the following:

```env
PORT=8000
JWT_SECRET=your_secret_key
```

### 3. Run the Server

```bash
npm start
```

Once the server is running, open your browser or API testing tool (like Postman) and go to:

```
http://localhost:8000
```

You should see:

```
GeoIP Server Running
```

---

## Default Login Credentials

Use these sample credentials from the seeder to login:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Features

- User authentication with JWT
- SQLite database with Sequelize ORM
- Express.js REST API

## Tech Stack

- Node.js
- Express.js
- SQLite
- Sequelize ORM
- JSON Web Token (JWT)