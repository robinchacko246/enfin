require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONN_STRING,
    { useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log('connected to mongodb.')
);

// middileware
app.use(express.json());

// routes
const auth_routes = require('./routes/auth.route');
const book_routes = require('./routes/book.route');
app.use('/v1/auth', auth_routes);
app.use('/v1/book', book_routes);



app.listen(3000, () => console.log('server is running..'));