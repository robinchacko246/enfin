const Book = require('../models/book');
const ObjectId = require('mongoose').Types.ObjectId;



async function getBooks(req, res){


    try {
        let page = parseInt(req.query.page) || 0; 
        let limit = parseInt(req.query.limit) || 10;
    
        const books = await Book.find( { $or:[ {published_date:req.query.published_date},{'book_name':new RegExp(req.query.search, 'i')}, {'author_name':new RegExp(req.query.search, 'i')} ]}).skip(page * limit).limit(limit).lean();;
        let count=await Book.countDocuments( { $or:[{published_date:req.query.published_date}, {'book_name':new RegExp(req.query.search, 'i')}, {'author_name':new RegExp(req.query.search, 'i')} ]});
        res.status(200).send({
            success: true,
            books: books ,
            totalBooks:count, 
            page: page,
            pageSize: books.length,
            total_pageCount: Math.ceil(count / limit)});
        
    } catch (error) {
        // do logging in DB or file.
        res.status(400).json({
            success: false,
            books: [] ,
            totalBooks:0
        });
    }
}

async function addBooks(req, res){


    try {
       let { published_date ,author_name,book_name} = req.body
        console.log(req.body);
        let books = new Book({
            published_date:published_date ,author_name:author_name,book_name:book_name}
            );
        books = await books.save();
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}

async function editBooks(req, res){


    try {
        let Id=req.params.book_id
        !Id ?res.status(400).json({ message:  "id issue" }):""

       let { published_date ,author_name,book_name,bookId} = req.body
      
       !bookId ?res.status(400).json({ message:  "please provide Book Id" }):"";

       
        console.log("book id===========",bookId)

        
        let books = await Book.findOneAndUpdate({ _id:ObjectId(bookId) },{ $set: {published_date:published_date,author_name:author_name,book_name:book_name} },{ new: true });
       /* Here as well a validation check not to execute further assuming your DB call will respond with empty object*/
      
      if (Object.entries(books).length !== 0 && books.constructor === Object) throw "";
     
        res.status(200).send({ success:true });
    } catch (error) {
        res.status(400).json({ success:  false });
    }
}


module.exports = {
    getBooks,
    addBooks,
    editBooks
}