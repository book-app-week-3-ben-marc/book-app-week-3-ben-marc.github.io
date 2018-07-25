/* globals: page */
'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));

// This MUST come before /books/:id otherwise :id is set to 'add'
page('/books/add', ctx => app.bookView.initFormPage(ctx));

// Put generic /books/:id routes at the end because the code below catches everything after /book/
page('/books/:id', ctx => {
  app.Book.fetchOne(ctx.params.id, app.bookView.initDetailPage);
});

// equivalent to app.listen(...), i.e. we're done setting up routes
page();