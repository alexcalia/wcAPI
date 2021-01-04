const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Routes
const authRoute = require('./routes/auth');
const characterRoute = require('./routes/characters');
const factionsRoute = require('./routes/factions');
const classesRoute = require('./routes/classes');

dotenv.config();

// Connect to DB
mongoose.connect(`${process.env.DB_CONNECT}`, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Connected to DB'));

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/characters', characterRoute);
app.use('/api/factions', factionsRoute);
app.use('/api/classes', classesRoute);

// Start server
app.listen(3000, () => console.log('Server is running on port 3000'));