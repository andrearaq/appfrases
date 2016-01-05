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
         window.alert('El juego tiene dos partes: Ordenar Frase e Inventar Frase. En << Ordenar Frase >> hay 4 niveles de dificultad (elegir el deseado). Una vez terminado ese nivel se puede pasar al siguiente. En << Inventar Frase >> se puede crear una nueva frase a partir de un Sujeto (persona, animal o cosa), una Acción (verbo) y unos Complementos (adjetivos, artículos y sustantivos). La frase puede tener hasta un máximo de 5 palabras.','Ayuda');
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}