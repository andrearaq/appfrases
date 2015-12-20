var HomeView = function (adapter) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.home());
        return this.el;
    };
    
    this.inicializar();
}