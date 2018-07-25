/* globals: page */
'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));

// This MUST come before /books/:id otherwise :id is set to 'add'
page('/books/add', ctx => app.bookView.initFormPage(ctx));

page('/books/:id', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});

page();