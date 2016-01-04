var VerAcciones= function (adapter, acciones) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.pictoP', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verAcciones(acciones));
        return this.el;
    };
      
    this.mostrarPicto = function() {
         // comprobar tipo picto elegido
        var tipo =$(this).parent().attr('id');
        // picto elegido
        var src = $(this).attr('src');
        var imagen = '<img class="imgFrase3" src="'+src+'" />'; 
        localStorage.setItem('accion',src);
        $('#fraseIn').append('<div class="accion2">'+imagen+'</div>');
        localStorage['palabras'] =parseInt(localStorage['palabras'])+1;
        adapter.encontrarComplementos(tipo).done(function(datos) {
            $('body').html(new VerComplementos(adapter, datos).render());
        }); 
        
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}