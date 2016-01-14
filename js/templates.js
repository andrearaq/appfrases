(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"topcoat-navigation-bar\">\r\n   <div class=\"topcoat-navigation-bar__item center half-quarter\">\r\n        <img class=\"logo\" src=\"img/logoFGris.png\"/>\r\n    </div>\r\n    <div class=\"topcoat-navigation-bar__item center less-three-quarters\">\r\n        <h1 class=\"topcoat-navigation-bar__title\">El Fraseador</h1>\r\n    </div>\r\n     <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\r\n            </buton>\r\n       </div>\r\n      <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n</div>\r\n<div class=\"scroller\">\r\n  <div class=\"botones center\">\r\n    <a href='#ordenar'><button class=\"topcoat-button--cta\" ><img class=\"imgHome\" src=\"img/ordenarfrase_color.png\"/></button></a>  \r\n    <span>&nbsp;&nbsp;</span>\r\n    <a href='#sujetos'><button class=\"topcoat-button--cta\" ><img class=\"imgHome\" src=\"img/inventarfrase_color.png\"/></button></a>\r\n  </div>\r\n    <footer>\r\n     <h2>Copyright @Andrea Gutiérrez Muñoz 2015 - Proyecto DAW</h2>\r\n     <h4><em>Autor pictogramas:</em> <span>Sergio Palao.</span> <em>Procedencia:</em> <span>ARASAAC http://catedu.es/arasaac/</span>  <em>Licencia:</em> <span><strong>CC (BY-NC-SA).</strong></span> </h4>\r\n    </footer>\r\n</div>";
  });
templates['verAcciones'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <div class=\"clearfix\" id=\"fraseIn\">\n              <div class=\"sujeto\">\n                 ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.arti), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                   <img class=\"imgFrase3\" src=\"";
  if (helper = helpers.suj) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.suj); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.suj) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.suj); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" /> \n              </div>\n              \n            </div>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                   <img class=\"imgFrase3\" src=\"";
  if (helper = helpers.arti) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.arti); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.arti) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.arti); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n                 ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n           <div class=\"accion pictosAccion\" id=\"";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n              <img class=\"pictoP\" src=\"img/pictos/acciones/";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" /> \n           </div>\n         ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\n            </a>\n        </div>\n        <div class=\"topcoat-navigation-bar__item center half\">\n           <h1 class=\"topcoat-navigation-bar__title\">Inventar Frases - Acción</h1>\n        </div>\n        <div class=\"topcoat-navigation-bar__item right half-quarter\">\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\n            </buton>\n       </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\" >\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\n            </a>\n            \n        </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\n            </buton>\n       </div>\n       <div class=\"topcoat-navigation-bar__item center quarter\">\n            <img class=\"logo\" src=\"img/logoFGris.png\"/>\n        </div>\n  </div>\n  <div class=\"fraseOrden\">\n       <div class=\"fraseordenada2\">\n          ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n       </div>\n  </div>\n  \n<div class=\"scroller2\">\n  <div class=\"cajaInventar\">\n       <div class=\"listapictos\">\n         ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n    </div>    \n    <footer>\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\n        <h4><em>Autor pictogramas:</em> <span>Sergio Palao.</span> <em>Procedencia:</em> <span>ARASAAC http://catedu.es/arasaac/</span>  <em>Licencia:</em> <span><strong>CC (BY-NC-SA).</strong></span> </h4>\n    </footer>\n</div>";
  return buffer;
  });
templates['verComplementos'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"clearfix\" id=\"fraseInv\">\r\n               <div class=\"sujeto\">\r\n                 ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.arti), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                   <img class=\"imgFrase3\" src=\"";
  if (helper = helpers.suj) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.suj); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.suj) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.suj); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" /> \r\n              </div>\r\n              <div class=\"accion2\">\r\n                   <img class=\"imgFrase3\" src=\"";
  if (helper = helpers.accion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.accion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.accion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.accion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                   <p><span class=\"tiempoV\">";
  if (helper = helpers.tiempoV) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tiempoV); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></p>\r\n              </div>\r\n              <div class=\"comple\" id=\"complemen\">\r\n              </div>\r\n            </div>\r\n           ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                   <img class=\"imgFrase3\" src=\"";
  if (helper = helpers.arti) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.arti); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.arti) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.arti); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                 ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                 <li class=\"topcoat-list__item\">\r\n                    <div class=\"tipoPicto ";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                        <div class=\"texto\"><img src=\"img/";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" /></div>\r\n                        ";
  options={hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}
  if (helper = helpers.detalles) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.detalles); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.detalles) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n                       </div> \r\n                  </li>\r\n                ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                          <div class=\"picto2\">\r\n                              <img class=\"pictoP\" src=\"img/pictos/";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                          </div>\r\n                        ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n           <h1 class=\"topcoat-navigation-bar__title tituloC\">Inventar Frases - Complementos</h1>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\r\n            </buton>\r\n       </div>\r\n        <div class=\"topcoat-navigation-bar__item right half-quarter\" >\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\r\n            </a>\r\n            \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n       <div class=\"topcoat-navigation-bar__item center quarter\">\r\n            <img class=\"logo\" src=\"img/logoFGris.png\"/>\r\n        </div>\r\n  </div>\r\n  \r\n  <div class=\"fraseOrden\">\r\n       <div class=\"fraseordenada2\">\r\n          <div class=\"clearfix new\">\r\n              <button class=\"topcoat-icon-button--quiet new-button\" href=\"\">\r\n                    <span class=\"topcoat-icon topcoat-icon--new\"></span>\r\n              </button>\r\n           </div>\r\n           ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n       </div>\r\n  </div>\r\n<div class=\"scroller2\">\r\n  <div class=\"cajaInventar\">\r\n       \r\n       <div class=\"listapictos\">\r\n           <div class=\"topcoat-list\">\r\n            <ul class=\"topcoat-list__container list\" >\r\n                ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div> \r\n    <footer>\r\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n      <h4><em>Autor pictogramas:</em> <span>Sergio Palao.</span> <em>Procedencia:</em> <span>ARASAAC http://catedu.es/arasaac/</span>  <em>Licencia:</em> <span><strong>CC (BY-NC-SA).</strong></span> </h4>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verNivelesOrden'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"topcoat-navigation-bar\">\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\n            </a>\n        </div>\n        <div class=\"topcoat-navigation-bar__item center more-half\">\n           <h1 class=\"topcoat-navigation-bar__title\">Ordenar Frases</h1> \n        </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\n            </buton>\n       </div>\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\n            </buton>\n       </div>\n       <div class=\"topcoat-navigation-bar__item center quarter\">\n        <img class=\"logo\" src=\"img/logoFGris.png\"/>\n    </div>\n</div>\n<div class=\"scroller\">\n  <div class=\"fondo\">\n    <div class=\"topcoat-button-bar nivelesB\">\n       <div class=\"topcoat-button--large clearfix n1\">\n         <a href='#nivelorden/1'><span id=\"1\">Nivel 1</span></a>\n       </div>\n       <div class=\"topcoat-button--large clearfix n2\">\n         <a href='#nivelorden/2'><span id=\"2\">Nivel 2</span></a>\n       </div>\n       <div class=\"topcoat-button--large clearfix n3\">\n         <a href='#nivelorden/3'><span id=\"3\">Nivel 3</span></a>\n       </div> \n        <div class=\"topcoat-button--large clearfix n4\">\n          <a href='#nivelorden/4'><span id=\"4\">Nivel 4</span></a>\n       </div>\n    </div>\n  </div> \n    <footer>\n      <h2>Copyright @Andrea Gutiérrez Muñoz 2015</h2>\n    </footer>\n</div>\n\n";
  });
templates['verOrdenar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n           <h1 class=\"topcoat-navigation-bar__title\" id=\"";
  if (helper = helpers.nivel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nivel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Ordenar Frases  -  Nivel ";
  if (helper = helpers.nivel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nivel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\r\n           ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n   <div class=\"nivel";
  if (helper = helpers.nivel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nivel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"cajaNivel\">\r\n       <div class=\"fraseordenada\">\r\n          ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n       </div>\r\n       <div class=\"listapalabras\" id=\"pictos\">\r\n        ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        \r\n    </div>\r\n    <div class=\"clearfix next nivel";
  if (helper = helpers.nivel) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.nivel); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        <button class=\"topcoat-icon-button--quiet next-button\" href=\"\">\r\n                <span class=\"topcoat-icon topcoat-icon--next\"></span>\r\n            </button>\r\n    </div>\r\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <div class=\"clearfix\" id=\"fraseC\">\r\n               <img  class=\"imgFrase2\" src=\"img/frases/";
  if (helper = helpers.p0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.p0) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.p0); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"0\"/>\r\n            </div>\r\n          ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n            ";
  options={hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}
  if (helper = helpers.palabras) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.palabras); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.palabras) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n         ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                    <img class=\"imgFrase\" src=\"img/frases/";
  if (helper = helpers.texto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.texto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" alt=\"";
  if (helper = helpers.texto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.texto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (helper = helpers.idp) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.idp); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n            ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center half\">\r\n          ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\r\n            </buton>\r\n       </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\" >\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.go(-2);\">\r\n                <span class=\"topcoat-icon topcoat-icon--home\"></span>\r\n            </a>\r\n            \r\n        </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n       <div class=\"topcoat-navigation-bar__item center quarter\">\r\n            <img class=\"logo\" src=\"img/logoFGris.png\"/>\r\n        </div>\r\n  </div>\r\n<div class=\"scroller\">\r\n  ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <footer>\r\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n      <h4><em>Autor pictogramas:</em> <span>Sergio Palao.</span> <em>Procedencia:</em> <span>ARASAAC http://catedu.es/arasaac/</span>  <em>Licencia:</em> <span><strong>CC (BY-NC-SA).</strong></span> </h4>\r\n    </footer>\r\n</div>";
  return buffer;
  });
templates['verSujetos'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\r\n                 <li class=\"topcoat-list__item\">\r\n                    <div class=\"tipoPicto ";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\r\n                        <div class=\"texto\"><img src=\"img/";
  if (helper = helpers.tipo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.tipo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\" /></div>\r\n                        ";
  options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}
  if (helper = helpers.detalles) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.detalles); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.detalles) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                    </div>\r\n                  </li>\r\n                ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "                         \r\n                          <div class=\"picto2\">\r\n                              <img class=\"pictoP\" src=\"img/pictos/";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.picto) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.picto); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n                          </div>\r\n                        ";
  return buffer;
  }

  buffer += "   <div class=\"topcoat-navigation-bar\">\r\n        <div class=\"topcoat-navigation-bar__item left half-quarter\">\r\n            <a class=\"topcoat-icon-button--quiet back-button\" href=\"javascript:window.history.back();\">\r\n                <span class=\"topcoat-icon topcoat-icon--back\"></span>\r\n            </a>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item center more-half\">\r\n           <h1 class=\"topcoat-navigation-bar__title\">Inventar Frases - Sujeto</h1>\r\n        </div>\r\n        <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--help\" id=\"help\"></span>\r\n            </buton>\r\n       </div>\r\n       <div class=\"topcoat-navigation-bar__item right half-quarter\">\r\n           <button class=\"topcoat-icon-button--quiet back-button salir\"  >\r\n                <span class=\"topcoat-icon topcoat-icon--exit\"></span>\r\n            </buton>\r\n       </div>\r\n       <div class=\"topcoat-navigation-bar__item center quarter\">\r\n            <img class=\"logo\" src=\"img/logoFGris.png\"/>\r\n        </div>\r\n  </div>\r\n  <div class=\"fraseOrden\">\r\n       <div class=\"fraseordenada2\">\r\n            <div class=\"clearfix\" id=\"fraseI\">\r\n               \r\n            </div>\r\n       </div>\r\n  </div>\r\n<div class=\"scroller2\">\r\n     <div class=\"cajaInventar\">\r\n      \r\n       <div class=\"listapictos\">\r\n           <div class=\"topcoat-list\">\r\n            <ul class=\"topcoat-list__container list\" >\r\n                ";
  stack1 = ((stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </ul>\r\n        </div>\r\n     </div>  \r\n    </div>    \r\n    <footer>\r\n      <h3>Copyright @Andrea Gutiérrez Muñoz 2015</h3>\r\n      <h4><em>Autor pictogramas:</em> <span>Sergio Palao.</span> <em>Procedencia:</em> <span>ARASAAC http://catedu.es/arasaac/</span>  <em>Licencia:</em> <span><strong>CC (BY-NC-SA).</strong></span> </h4>\r\n    </footer>\r\n</div>";
  return buffer;
  });
})();