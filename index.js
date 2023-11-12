#!/usr/bin/env node
const express = require('express');

const logger = require('./middleware/logger');     
const booksRouter = require('./routes/booksRouter');   
const error404 = require('./middleware/err-404');

const indexRouter = require('./routes/indexRouter');

const app = express();
app.use(express.json());

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use(logger);   
app.use('/', indexRouter);
app.use('/api/books', booksRouter); 
app.use(error404); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=== start server PORT ${PORT} ===`);
});

// POST  http://localhost:3000/api/books/api/user/login
// GET   http://localhost:3000/api/books
// GET   http://localhost:3000/api/books/:id       http://localhost:3000/api/books/a857c2b1-9826-48b1-ba8c-060ff3daf1b7
// POST  http://localhost:3000/api/books
// PUT   http://localhost:3000/api/books/:id       
// DELETE  http://localhost:3000/api/books/:id    
// GET http://localhost:3000/api/books/id/download


// books - В моём случае равносильно команде npm run start
// http://localhost:3000/api/books - В браузере запросы GET