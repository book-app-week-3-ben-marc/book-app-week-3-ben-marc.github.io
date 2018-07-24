'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  bookView.initIndexPage = () => {
    app.showOnly('.book-view');
    
    $('#book-list').empty();
    console.log(app.Book.getAll());
    app.Book.getAll().forEach(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = book => {
    app.showOnly('.book-detail');

    $('#book-detail').empty().append(book.detailToHtml());
  };

  module.bookView = bookView;
})(app)