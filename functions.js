/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
    // Your code goes here
    let filtered = books.filter(x => x.id == bookId);
    return filtered.length > 0 ? filtered[0] : undefined;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
    // Your code goes here
    let filtered = authors.filter(x => x['name'].toUpperCase() === authorName.toUpperCase());
    return filtered.length > 0 ? filtered[0] : undefined;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
    // Your code goes here
    return authors.map(x => {
        return {
            author: x['name'],
            bookCount: x['books'].length
        };
    });
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
    const colors = {};
    books.forEach(book => {
        if (!colors[book.color]) {
            colors[book.color] = [];
        }
        colors[book.color].push(book.title);
    })

    return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
    // Your code goes here
    let author = authors.filter(x => x.name.toUpperCase() == authorName.toUpperCase())[0]
    if (!author) { return [] }
    let author_books = author.books;
    let author_books_title = books.filter(x => author_books.includes(x.id));
    return author_books_title.map(x => x.title);
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
    // Your code goes here
    let bookCounts = bookCountsByAuthor(authors)
    let author = { 'bookCount': 0 };

    bookCounts.forEach(element => {
        if (element.bookCount > author.bookCount) {
            author = element
        }
    });
    return author.author
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
    // Your code goes here
    // let _titles = titlesByAuthorName(authors[0].name, authors, books)
    // console.log(_titles);
    // return
    let book = books.filter(x => x.id == bookId)[0]
    if (!book) { return }


    let book_authors_name = book.authors.map(x => x.name);

    let titles = []
    book_authors_name.forEach(authorName => {
        let _titles = titlesByAuthorName(authorName, authors, books)
        titles = titles.concat(_titles);
    });

    // console.log(titles);
    return titles
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
    // Your code goes here
    return mostProlificAuthor(authors)
}

module.exports = {
    getBookById,
    getAuthorByName,
    bookCountsByAuthor,
    booksByColor,
    titlesByAuthorName,
    mostProlificAuthor,
    relatedBooks,
    friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));