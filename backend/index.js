const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth');
const characterRoute = require('./routes/characters');
const factionsRoute = require('./routes/factions');
const classesRoute = require('./routes/classes');
const racesRoute = require('./routes/races');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => console.log(error));

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/characters', characterRoute);
app.use('/api/factions', factionsRoute);
app.use('/api/classes', classesRoute);
app.use('/api/races', racesRoute);
app.use(express.static('frontend'));

// Start server
app.listen(3000, () => console.log('Server is running on port 3000'));