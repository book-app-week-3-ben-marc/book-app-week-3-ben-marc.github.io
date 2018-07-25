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

  const all = [];
  Book.getAll = () => all;

  const compareBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

  const loadAll = rows => {
    rows.sort(compareBy('title')).forEach(book => all.push(new Book(book)));
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

  Book.createBook = book =>
    $.post(`${app.ENVIRONMENT.apiUrl}/api/v1/books/add`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  module.Book = Book;
})(app)