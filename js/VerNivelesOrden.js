var VerNivelesOrden= function (adapter) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '#help', this.mostrarAyuda);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verNivelesOrden());
        return this.el;
    };
    this.mostrarAyuda = function() {
         window.alert('Elige el nivel de dificultad para ordenar frases.','Ayuda');
    };
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}