# TaskTrack - Project & Task Management Application

TaskTrack is a full-stack application that allows users to manage and track tasks. Built with React, Express, and MongoDB, this application provides a complete solution for personal task management.

## Features

- User authentication with JWT
- Task creation, reading, updating, and deletion
- Task status tracking (not started, in-progress, completed)

## Tech Stack

### Backend
- Express.js
- MongoDB for database
- JSON Web Tokens (JWT) for authentication
- Joi validation for validate data fields
- bcrypt for password hashing

### Frontend
- React.js
- JavaScript
- TailwindCSS
- React Router DOM
- Axios (for API calls)

## Prerequisites

- Node.js
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
   VITE_USER_API= http://localhost:1000/api/v1/user(your userApi)
   VITE_TASK_API= http://localhost:1000/api/v1(your taskApi)

   # Backend environment variables
   MONGO_URL=your db url
   CLIENT_URL= http://localhost:5175
   PORT=1000 
   JWT_SECRET=Cool(your jwt_secret)

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
