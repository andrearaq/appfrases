(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"topcoat-navigation-bar\">\r\n    <div class=\"topcoat-navigation-bar__item center full\">\r\n        <h1 class=\"topcoat-navigation-bar__title\">El Fraseador</h1>\r\n    </div>\r\n</div>\r\n<div class=\"scroller\">\r\n  <div class=\"botones center\">\r\n    <a href='#ordenar'><button class=\"topcoat-button--cta\" ><img class=\"imgHome\" src=\"img/ordenarfrase_color.png\"/></button></a>  \r\n    <span>&nbsp;&nbsp;</span>\r\n    <a href='#inventar'><button class=\"topcoat-button--cta\" ><img class=\"imgHome\" src=\"img/inventarfrase_color.png\"/></button></a>\r\n  </div>\r\n    <footer>\r\n     <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n    </footer>\r\n</div>";
  });
templates['verDatosInventar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n             <li class=\"topcoat-list__item\">\r\n                 <p><span class=\"nomplato\">";
  if (helper = helpers.texto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.texto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span> </p>\r\n              </li>\r\n            ";
  return buffer;
  }

  buffer += "<div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n           \r\n                <h1 class=\"topcoat-navigation-bar__title\">Inventar Frases</h1>\r\n            \r\n        </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    \r\n    <div class=\"topcoat-list\">\r\n        <ul class=\"topcoat-list__container list\" >\r\n            ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n    \r\n    <footer>\r\n     <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verOrdenar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n           <h1 class=\"topcoat-navigation-bar__title\">Ordenar Frases</h1> \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\" >\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\r\n            </a>\r\n            \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n    </div>\r\n<div class=\"scroller\">\r\n    \r\n    </div>\r\n    <footer>\r\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n    </footer>\r\n</div>";
  });
})();