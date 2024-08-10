const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
    } else {
    }
  } 
  return res.status(404).json({message: "Customer successfully registred. Now you can login."});
});



// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  res.status(300).json({message: "Yet to be implemented"});
});
const getBooks = () => {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
    let listofbooks = getBooks ((resolve,reject) => {
        setTimeout(() => {
          resolve(" listofbooks resolved")
        },6000)})
          myPromise1.then((successMessage) => {
        console.log("ListofBooks " + successMessage)
        
      })
};



// Get book details based on ISBN
const getByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        let isbnNum = num(isbn);
        if (books[isbnNum]) {
            resolve(books[isbnNum]);
        } else {
            reject({ status: 402, message: `ISBN ${isbn} not found` });
        }
    });
};
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
        const author = req.params.author;
      let filtered_books = Object.keys(books)
      .filter(key => books[key].author === author)
      .reduce((obj, key) => {
        obj[key] = books[key];
        return obj;
      }, {});
      const booksByAuthor = Object.entries(filtered_books).map(([isbn, book]) => ({
          title: book.title,
      }));
      res.json({ booksbyauthor: booksByAuthor });
      return res.status(300).json({message: "Yet to be implemented"});
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
      let filtered_books = Object.keys(books)
      .filter(key => books[key].title === title)
      .reduce((obj, key) => {
        obj[key] = books[key];
        return obj;
      }, {});
      const booksByTitle = Object.entries(filtered_books).map(([isbn, book]) => ({
          title: book.title,
      }));
      res.json({ booksbytitle: booksByTitle });
      return res.status(300).json({message: "Yet to be implemented"});
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const reviewsByIsbn = books[isbn].reviews;
  res.send(reviewsByIsbn);
});

//Add book review


module.exports.general = public_users;
