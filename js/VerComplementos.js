var VerComplementos= function (adapter, complementos) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.pictoP', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
        localStorage.setItem('palabras','0');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verSujetos(sujetos));
        return this.el;
    };
      
    this.mostrarPicto = function() {
        // comprobar tipo picto elegido
        var tipo =$(this).parent().parent().attr('id');
        // picto elegido
        var src = $(this).attr('src');
        var imagen = '<img class="imgFrase" src="'+src+'" />'; 
        
        $('#fraseI').append(imagen);
        if (tipo=='articulo') {
            $('#articulo').css('display', 'none');
            localStorage.setItem('articulo',src);
            localStorage['palabras'] =parseInt(localStorage['palabras'])+1;
        }
        if (tipo=='persona' || tipo=='animal' || tipo=='cosa') {
            localStorage['sujeto']=src;
            localStorage['palabras']=parseInt(localStorage['palabras'])+1;
             adapter.encontrarAcciones(tipo).done(function(datos) {
                    $('body').html(new VerAcciones(adapter, datos).render());
                }); 
        }
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}