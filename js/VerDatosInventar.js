var VerDatosInventar = function (adapter, datos) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verDatosInventar(datos));
        return this.el;
    };
    // mostrar platos segun el idioma indicado por la bandera pulsada
    
    this.inicializar();
}
