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

  Book.all = [];

  const compareBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
  Book.loadAll = rows => {
    Book.all = rows.sort(compareBy('title')).map(book => new Book(book));
  }

  Book.fetchAll = callback =>
    //$.get(`${app.ENVIRONMENT.apiUrl/books`);
    $.get('GET: /api/v1/books')
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Book = Book;
})(app)