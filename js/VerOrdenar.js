var VerOrdenar= function (adapter, frases) {
    this.inicializar = function () {
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.next', this.cambiarFrase);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
       // n=1;
        this.el.html(Handlebars.templates.verOrdenar(frases));
        return this.el;
    };
    this.cambiarFrase = function() {
        var frase = parseInt(localStorage['frase'])+1;
        var nivel = localStorage['nivel'];
        console.log('siguiente frase: '+frase);
        adapter.encontrarFrasesOrdenar(nivel,frase).done(function(datos) {
                $('body').html(new VerOrdenar(adapter, datos).render());
            });
    };   
    this.exitFromApp = function() {
        console.log("pulsado boton salir");
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}