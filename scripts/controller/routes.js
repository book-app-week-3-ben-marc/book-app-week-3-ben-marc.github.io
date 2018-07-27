'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));

// This MUST come before /books/:id otherwise :id is set to 'add'
page('/books/add', () => app.bookView.initFormPage());

page('/books/:id/update', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initUpdatePage);
});

// Put generic /books/:id routes at the end because the code below catches everything after /book/
page('/books/:id', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});

page('/books/:id/delete', ctx => {
  let redirectHomeOnDelete = () => page('/');
  app.Book.deleteOne(ctx.params.id, redirectHomeOnDelete);
});

// equivalent to app.listen(...), i.e. we're done setting up routes
page();