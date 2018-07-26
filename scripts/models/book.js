'use strict';

var app = app || {};

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  Book.prototype.toHtml = function() {
    return app.render('book-list-template', this);
  }

  Book.prototype.detailToHtml = function() {
    return app.render('book-item-template', this);
  }

  Book.prototype.formToHtml = function() {
    return app.render('book-form-template', this);
  }

  const all = [];
  Book.getAll = () => all;

  const compareBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

  const loadAll = rows => {
    all.length = 0; // empty the array before we re-load
    // console.log('before load: ' + all);
    rows.sort(compareBy('title')).forEach(book => all.push(new Book(book)));
    // console.log('after load: ' + all);
  }

  Book.fetchAll = callback =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books`)
      .then(loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (bookId, callback) =>
    $.get(`${app.ENVIRONMENT.apiUrl}/api/v1/books/${bookId}`)
      .then(bookData => callback(new Book(bookData)))
      .catch(errorCallback);

  Book.createBook = (book, callback) =>
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/books/add`, book)
      .then(callback)
      .catch(errorCallback);

  Book.updateBook = (book, callback) => {
    console.log('hi');
    $.ajax({
      method: 'put',
      url: `${app.ENVIRONMENT.apiUrl}/api/v1/books/${book.book_id}`,
      data: book
    })
      .then(callback)
      .catch(errorCallback);
  
    Book.deleteOne = (bookId, callback) =>
      $.ajax({
        method: 'delete',
        url: `${app.ENVIRONMENT.apiUrl}/api/v1/books/${book.book_id}`,
    })
    .then(callback)
    .catch(errorCallback);
  }

  module.Book = Book;
})(app)