/* globals: page */
'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:id', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});
page('/api/v1/books/add', ctx => app.bookView.initFormPage(ctx));

page();