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
  


  return "<div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n           \r\n                <h1 class=\"topcoat-navigation-bar__title\">Inventar Frases</h1>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item right half-quarter\" >\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\r\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\r\n            </a>\r\n            \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n</div>\r\n<div class=\"scroller\">\r\n    \r\n    \r\n    \r\n    <footer>\r\n     <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n    </footer>\r\n</div>";
  });
templates['verNivelesOrden'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"topcoat-navigation-bar\">\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\n            </a>\n        </div>\n        <div class=\"topcoat-navigation-bar__item center less-half\">\n           <h1 class=\"topcoat-navigation-bar__title\">Ordenar Frases</h1> \n        </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\" >\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"#\">\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\n            </a>\n            \n        </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\n            </buton>\n       </div>\n</div>\n<div class=\"scroller\">\n  <div class=\"fondo\">\n    <div class=\"topcoat-button-bar nivelesB\">\n       <div class=\"topcoat-button--large clearfix n1\">\n         <a href='#nivelorden/1'><span id=\"1\">Nivel 1</span></a>\n       </div>\n       <div class=\"topcoat-button--large clearfix n2\">\n         <a href='#nivelorden/2'><span id=\"2\">Nivel 2</span></a>\n       </div>\n       <div class=\"topcoat-button--large clearfix n3\">\n         <a href='#nivelorden/3'><span id=\"3\">Nivel 3</span></a>\n       </div> \n        <div class=\"topcoat-button--large clearfix n4\">\n          <a href='#nivelorden/4'><span id=\"4\">Nivel 4</span></a>\n       </div>\n    </div>\n  </div> \n    <footer>\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\n    </footer>\n</div>\n\n";
  });
templates['verOrdenar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n        <div class=\"clearfix\" id=\"fraseC\">\r\n           <img  class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"0\"/>\r\n           \r\n        </div>\r\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <div class=\"pictos clearfix\" id=\"pictos\">\r\n              <img class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"p2\"/>\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.p3), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            \r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.p4), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <img class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p1) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p1); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p1) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p1); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"p1\" />\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.p5), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </div>\r\n          <div class=\"texto clearfix\">\r\n            <span class=\"\">";
  if (helper = helpers.p0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            <span class=\"\">";
  if (helper = helpers.p1) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p1); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            <span class=\"\">";
  if (helper = helpers.p2) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p2); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            <span class=\"\">";
  if (helper = helpers.p3) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p3); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            <span class=\"\">";
  if (helper = helpers.p4) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p4); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n            <span class=\"\">";
  if (helper = helpers.p5) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p5); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n         </div>\r\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n              <img class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p3) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p3); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p3) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p3); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"p3\"/>\r\n            ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n              <img class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p4) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p4); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p4) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p4); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"p4\"/>\r\n            ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n              <img class=\"imgFrase\" src=\"img/pictos/";
  if (helper = helpers.p5) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p5); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p5) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p5); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"p5\"/>\r\n            ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center less-half\">\r\n           <h1 class=\"topcoat-navigation-bar__title\">Ordenar Frases</h1> \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\" >\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\r\n            </a>\r\n            \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n    </div>\r\n<div class=\"scroller\">\r\n   <div class=\"fraseordenada\">\r\n      ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n   </div>\r\n   <div class=\"listapalabras\">\r\n        ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </div>\r\n    <div class=\"clearfix next\">\r\n        <button class=\"topcoat-icon-button--quiet next-button\" href=\"\">\r\n                <span class=\"topcoat-icon topcoat-icon--next\"></span>\r\n            </button>\r\n    </div>\r\n    <footer>\r\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n    </footer>\r\n</div>";
  return buffer;
  });
})();