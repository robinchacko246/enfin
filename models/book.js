const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a schema
const bookSchema = new Schema({
    book_name: {
        type: String,
      
        required: true
    },
    author_name: {
        type: String,
      
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1,
        required: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
  
   
});



//create model
const Book = mongoose.model('book', bookSchema);

// export the model
module.exports = Book;