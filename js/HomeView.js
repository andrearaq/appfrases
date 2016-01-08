var HomeView = function (adapter) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '#help', this.mostrarAyuda);
        this.el.on('click', '.salir', this.exitFromApp);
        localStorage.setItem('articulo','');
        localStorage.setItem('sujeto','');
        localStorage.setItem('accion','');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.home());
        return this.el;
    };
    
    this.mostrarAyuda = function() {
         window.alert('El juego comienza al pulsar el botón de Ordenar Frase o Inventar Frase.','Ayuda');
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}