'use strict';

var app = app || {};

(function (module) {
  let productionApiUrl = 'https://bv-mh-booklist.herokuapp.com';
  let developmentApiUrl = 'http://localhost:3000';

  module.isProduction = /^(?!localhost|127)/.test(window.location.hostname);

  module.ENVIRONMENT = {
    apiUrl: module.isProduction ? productionApiUrl : developmentApiUrl,
  };

  console.log(module.ENVIRONMENT);

  $.getJSON(module.ENVIRONMENT.apiUrl + '/tasks')
    .then(result => console.log(result))
    .catch(err => console.error(err));
})(app);