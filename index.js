const express = require('express');
const app = express();
const dotnenv = require('dotenv');
const mongoose = require('mongoose');
// import routes
const authRoute = require('./routes/auth');
const petRoutes = require('./routes/petRoutes');

dotnenv.config();

// Connect to db
mongoose.connect(process.env.DB_CONNECT, 
{useNewUrlParser: true},
() => console.log('connected to db'));

// Middleware
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoute);
app.use('/api/pet', petRoutes);


app.listen(3000, () => console.log('Server listening port 3000'));
