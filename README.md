# TaskTrack - Project & Task Management Application [MERN]

TaskTrack is a full-stack application that allows users to manage and track tasks. Built with React, Express, and MongoDB, this application provides a complete solution for personal task management.

## Features

- User authentication with JWT
- Task creation, reading, updating, and deletion
- Mode: User , Admin
- User(mode):  view and add new tasks
- Admin(mode): Update and Delete any task
- Task status tracking (not started, in-progress, completed) change by Admin

## Tech Stack

### Backend
- Express.js
- MongoDB for database
- JSON Web Tokens (JWT) for authentication
- Joi-validation for validate data fields
- bcrypt for password hashing
     
- Middleware:
  - authUser: to verify particular user token is valid or not
  - validator: to verify all data fields follow pre-defined rules

### Frontend
- React.js
- JavaScript
- TailwindCSS
- React Router DOM
- Axios (for API calls)



## Getting Started

### Setting Up the Environment

1. Clone the repository:
   ```
   git clone https://github.com/ParmodKumar-tech/Task-Tracking-App.git
   cd Task-Tracking-App
   ```

2. Install dependencies in frontend folder & setup .env:
   ```
   cd frontend
   npm install

   Create .env file:
    VITE_USER_API=ayourapi/api/v1/user
    VITE_TASK_API=yourapi/api/v1

   ## Run frontend:
   npm run dev
   ```

3. Install dependencies in backend folder & setup .env:
   ```
   cd backend
   npm install

   Create .env file:
    MONGO_URL=your db url
    CLIENT_URL=your frontend url
    PORT=your port
    JWT_SECRET=your jwt secrect key
    NODE_ENV=production

   ## Run Backend:
   npm start
   ```

## API Endpoints

### User Routes
  - GET        /api/v1/user/logout   -------        Logout current user
  - POST       /api/v1/user/register -------        Register new user
  - POST       /api/v1/user/login    -------        Login existing user
   - 
### Task Routes
   - GET        /api/v1/tasks       ------          Return all tasks (protected)
   - GET        /api/v1/task/:task_id ------        Return task based on task_id (protected)
   - POST       /api/v1/task        ------          Create new task (protected)
   - PUT        /api/v1/task_id     ------          Replace task based on task_id (protected)
   - Delete     /api/v1/task_id     ------          Delete task based on task_id (protected)
   
## License

This project is licensed under the MIT License.
