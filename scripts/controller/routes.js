'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));

// This MUST come before /books/:id otherwise :id is set to 'add'
page('/books/add', () => app.bookView.initFormPage());

// Put generic /books/:id routes at the end because the code below catches everything after /book/
page('/books/:id', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});

page('/books/:id/update', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initUpdatePage);
});

// equivalent to app.listen(...), i.e. we're done setting up routes
page();