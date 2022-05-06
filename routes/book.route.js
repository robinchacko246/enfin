const route = require('express').Router();
const auth_middleware = require('../middlewares/auth.middleware');
const book_controller = require('../controllers/book.controller');


route.get('/books', auth_middleware.verifyToken,book_controller.getBooks);
route.post('/add-book', auth_middleware.verifyToken,book_controller.addBooks);
route.post('/edit-book/:book_id', auth_middleware.verifyToken,book_controller.editBooks);
module.exports = route;