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

  module.showOnly = (selector) => {
    $('.container').hide();
    $(selector).show();
  };

  const templateCache = {};
  module.render = (templateId, dataToRender) => {
    let template = templateCache[templateId];

    if(!template) {
      console.log(`Compiling template ${templateId}`);
      template = Handlebars.compile(document.getElementById(templateId).innerText);
    }

    return template(dataToRender);
  };

  $.getJSON(module.ENVIRONMENT.apiUrl + '/api/v1/books')
    .then(result => console.log(result))
    .catch(err => console.error(err));
})(app);