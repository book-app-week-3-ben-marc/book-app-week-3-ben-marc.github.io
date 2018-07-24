/* globals: page */
'use-strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));


page();