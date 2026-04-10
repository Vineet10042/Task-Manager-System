require('dotenv').config({ path: '../.env' }); // Load env variables from parent directory
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend to connect to our API

// Database Connection
mongoose.connect(process.env.DB_CONNECT_STRING)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Base route to check if API is running
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Server boot configuration ready

// Keep-alive ping to prevent Render free-tier from sleeping
const https = require('https');
const RENDER_URL = 'https://task-manager-system-st1q.onrender.com';

setInterval(() => {
  https.get(RENDER_URL, (res) => {
    console.log(`[Keep-Alive] Ping successful, status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[Keep-Alive] Ping failed: ${err.message}`);
  });
}, 3 * 60 * 1000); // 3 minutes in milliseconds
