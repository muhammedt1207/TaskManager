# MERN Task Management Application

A full-stack task management application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. Features user authentication, task management, and a responsive interface.

## 🚀 Features

- **User Authentication**
  - JWT-based authentication
  - Secure password hashing
  - Protected routes
  - Persistent login with HTTP-only cookies

- **Task Management**
  - Create, read, update, and delete tasks
  - Task filtering and sorting
  - Task status tracking

- **Security Features**
  - Rate limiting
  - CORS protection
  - Helmet security headers
  - HTTP-only cookies
  - XSS protection

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Express Rate Limit
- Helmet
- Cookie Parser
- CORS

### Frontend
- React.js
- Redux Toolkit for state management
- Axios for API calls
- React Router for navigation

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muhammedt1207/TaskManager.git
   cd TaskManager
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both frontend and backend directories:

   Backend `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb_uri
   JWT_SECRET=your_jwt_secret
   
   ```

   Frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 📝 API Endpoints

### Authentication Routes
```
POST /api/auth/register - Register a new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
GET /api/auth/profile - Get user profile
```

### Task Routes
```
GET /api/tasks - Get all tasks
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
```

## 🔒 Security Measures

- Rate limiting to prevent brute force attacks
- CORS configuration for API security
- HTTP-only cookies for JWT storage
- Helmet for secure HTTP headers
- Password hashing using bcrypt
- Input validation and sanitization

## 🛡️ Error Handling

The application implements centralized error handling with:
- Custom error classes
- Validation error handling
- Async error wrapper
- Global error handling middleware


## 📦 Project Structure

```
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── common/
│   │   └── assets/
│   └── public/
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- Muhammed T- Initial work - [Github](https://github.com/muhammedt1207)

## 🙏 Acknowledgments

- Cookie-based JWT authentication implementation
- Express.js security best practices
- React Redux architecture patterns

## ⚠️ Important Notes

- This project uses HTTP-only cookies for JWT storage
- Configure your production environment variables accordingly
- Ensure MongoDB is running before starting the application
- For production deployment, update CORS settings and security configurations

## 📞 Support

For support, email muhammedt1207@email.com or create an issue in the repository.