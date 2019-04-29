var express = require('express');
var router = express.Router();
const Book = require('./../models/book'); // model

// GET ./books/add
router.get('/add', function(req, res, next) {
  res.render('book-add');
});

//Post '/books/add'
router.post('/add', function(req, res, next) {
  console.log('req.body',req.body); // because is post, stores into body. Post has body, GET query  
  // fetch the var 
  // const title = req.body.title;
  //or deconstruction
  const {title, author, description,rating} = req.body; //deconstruct from form action, body etc

  const newBook = new Book({title, author, description,rating});//instantiate the object
  newBook.save() // save it into db, this format is a thenable. 
  .then((book)=> res.redirect('/books'))
  .catch((err) => console.log(err));
  
});


//GET '/books'
router.get('/', (req,res,next) => {
  Book.find({})
  .then((allTheBooksFromDB)=> res.render('books',{allTheBooksFromDB}))
  .catch((err)=> console.log(err))
});


module.exports = router;
