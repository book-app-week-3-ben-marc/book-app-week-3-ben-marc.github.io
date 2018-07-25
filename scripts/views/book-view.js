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

  bookView.initFormPage = book => {
    app.showOnly('.book-add');
    $('#book-form').empty().append(book.formToHtml());
  };

  $('#add-form').on('submit', function(event) {
    event.preventDefault();
    let book = {
      title: this.title.value,
      author: this.author.value,
      isbn: this.isbn.value,
      image_url: this.image_url.value,
      description: this.description.value
    }
    app.Book.createBook(book, () => page('/'));
  });

  bookView.initUpdatePage = book => {
    app.showOnly('.book-add');
  };

  module.bookView = bookView;
})(app)