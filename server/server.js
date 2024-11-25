const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const cookieParser = require('cookie-parser');
const helmet =require('helmet')
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
    optionsSuccessStatus: 200,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes.",
    headers: true,
  });
  
  

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('short'));
app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});