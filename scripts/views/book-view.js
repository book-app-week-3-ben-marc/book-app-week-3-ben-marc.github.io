'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  bookView.initIndexPage = () => {
    app.showOnly('.book-view');

    $('#book-list').empty();
    app.Book.getAll().forEach(book => $('#book-list').append(book.toHtml()));
  }

  module.bookView = bookView;
})(app)