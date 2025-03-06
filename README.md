# React.js, Node.js, and PostgreSQL Authentication System

This project provides a role-based authentication system with email verification using React.js (frontend) and Node.js with Express and PostgreSQL (backend).

## Features
- Customer and Admin Registration Pages
- Role-Based Authentication (Customer, Admin)
- Email Verification for Registration
- Admin Login Page with Access Restriction
- JWT-based Authentication

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo-url.git
cd react_node_postgres_auth
```

### 2. Backend Setup
#### Install Dependencies
```sh
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the backend directory with the following content:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/auth_db"
JWT_SECRET="your_token_here"
PORT=5000
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your_email_here"
EMAIL_PASS="your_password_here"
CLIENT_URL="http://localhost:5173"
```

#### Run Migrations and Start Server
```sh
npx prisma migrate dev --name init
npm start
```

### 3. Frontend Setup
#### Install Dependencies
```sh
cd frontend
npm install
```

#### Start the Frontend
```sh
npm run dev
```

## API Endpoints

### **Authentication Routes**
- `POST /register/customer` - Register a customer
- `POST /register/admin` - Register an admin
- `GET /verify/:token` - Verify user email
- `POST /login/admin` - Admin login

## Frontend Routes

The application uses `react-router-dom` for navigation with the following routes:
- `/register/customer` - Customer registration page
- `/register/admin` - Admin registration page
- `/` - Admin login page

## Notes
- Customers cannot log in from the admin login page.
- Ensure PostgreSQL is running before starting the backend.
- Use a valid SMTP configuration for email verification.

## License
This project is open-source and available under the MIT License.
