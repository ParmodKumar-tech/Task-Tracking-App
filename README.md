# TaskTrack - Project & Task Management Application

TaskTrack is a full-stack application that allows users to manage projects and track tasks. Built with React, Express, and PostgreSQL, this application provides a complete solution for personal task management.

## Features

- User authentication with JWT
- Task creation, reading, updating, and deletion
- Task status tracking (not started, in-progress, completed)
- Responsive design for desktop and mobile

## Tech Stack

### Frontend
- React.js
- TypeScript
- TailwindCSS
- React Router DOM
- Axios (for API calls)

### Backend
- Express.js
- MongoDB for database
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database

## Getting Started

### Setting Up the Environment

1. Clone the repository:
   ```
   git clone git@github.com:ParmodKumar-tech/Task-Tracking-App.git
   cd tasktrack
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a MongoDB database named `tasktracker`.

4. Configure environment variables by renaming `.env.example` to `.env` and updating the values:
   ```
   # Frontend environment variables
   VITE_API_URL=http://localhost:5000/api

   # Backend environment variables
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   DB_NAME=tasktracker
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run dev:server
   ```

2. In a separate terminal, start the frontend development server:
   ```
   npm run dev
   ```

3. Or run both concurrently:
   ```
   npm start
   ```

4. Access the application at http://localhost:5173

## Project Structure

```
tasktrack/
├── server/                  # Backend code
│   ├── config/              # Database configuration
│   ├── controllers/         # API controllers
│   ├── middleware/          # Express middleware
│   ├── models/              # Sequelize models
│   ├── routes/              # API routes
│   └── index.js             # Server entry point
│
├── src/                     # Frontend code
│   ├── components/          # React components
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main App component
│   └── main.tsx             # React entry point
│
├── .env                     # Environment variables
└── README.md                # Project documentation
```

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login a user

### Task Routes
- `POST /api/v1/task/tasks` - Create a new task (protected)
- `GET /api/v1/task/tasks` - Get all tasks for a project (protected)
- `GET /api/v1/task/tasks/:task_id` - Get a task by ID (protected)
- `PUT /api/v1/tasks/tasks/:task_id` - Update a task (protected)
- `DELETE /api/v1/task/tasks/:task_id` - Delete a task (protected)

## License

This project is licensed under the MIT License.
