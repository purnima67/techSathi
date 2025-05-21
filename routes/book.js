var express = require("express");

var router = express.Router()
var Book = require('../resources/book');


router.get('/', function(req, res) {
    res.render('book', {title: 'Book App Title', bookList: Book})
})

router.get('/add', function(req, res){
    res.render('addBook', {title: 'Add Book'})
})
router.post('/save', function(req, res){
    Book.push({
     ...req.body,
     _id:`00${Book.length+1}`
    })
    res.redirect("/book");
})
router.get("/edit/:_id", function (req, res, next) {
  console.log(req.params._id);
  const book = Book.find((book) => book._id === req.params._id);
  res.render("editBook", { title: "Edit Books", book });
});

router.post("/saveEdited/:_id", function (req, res, next) {
  const currIndex = Book.findIndex((book) => req.params._id === book._id);
  Book.splice(currIndex, 1, { ...req.body, _id: req.params._id });
  res.redirect("/book");
});
router.get("/delete/:_id", function (req, res) {
  const index = Book.findIndex(book => book._id === req.params._id);
  if (index !== -1) {
    Book.splice(index, 1);
  }
  res.redirect("/book");
});
module.exports = router;