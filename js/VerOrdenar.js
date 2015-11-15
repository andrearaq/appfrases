var VerOrdenar= function (adapter, frases) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
       // n=1;
        this.el.html(Handlebars.templates.verOrdenar());
        return this.el;
    };
        
    this.exitFromApp = function() {
        console.log("pulsado boton salir");
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}