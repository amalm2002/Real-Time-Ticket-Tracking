## Tech Stack
- React + Vite
- Node.js + Express
- PostgreSQL
- TypeORM
- JWT Authentication
- WebSocket (Socket.IO)

---

## Backend Setup

1. Go to backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create .env file:
   PORT=3000
   SQL_HOST = localhost
   SQL_PORT = your_sql_PORT
   SQL_USER = your_sql_name
   SQL_PASSWORD = your_sql_password
   SQL_DB = your_sql_db_name
   ACCESS_TOKEN = your_secret
   REFRESH_TOKEN = your_secret
   JWT_SECRET = your_JWT_secret
   CORS_ORIGIN = http://localhost:5173

5. Start server:
   npm start

---

## Frontend Setup

1. Go to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Create .env file:
   VITE_BACKEND_URL = http://localhost:3000/api/
   VITE_SOCKET_URL = http://localhost:3000

5. Start:
   npm run dev
