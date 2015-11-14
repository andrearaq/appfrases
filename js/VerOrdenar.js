var VerOrdenar= function (adapter, frases) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
    };
    this.render = function() {
       // n=1;
        this.el.html(Handlebars.templates.verOrdenar());
        return this.el;
    };
    
    this.inicializar();
}