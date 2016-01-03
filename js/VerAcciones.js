var VerAcciones= function (adapter, acciones) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
      //  this.el.on('click', '.tipoPicto', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verAcciones(acciones));
        return this.el;
    };
      
  /*  this.mostrarPicto = function() {
        // comprobar tipo pictos elegido
        var tipo = $(this).attr('id');
        var elem = $(this).attr('class');
        var clase = elem.split(' ');
        var src = $("."+clase[1]+" .pictoP").attr('src');
        var imagen = '<img class="imgFrase" src="'+src+'" />'; 
        
        $('#fraseI').append(imagen);
        if (tipo=='articulo') {
            $('#persona').css('display', 'none');
            $('#articulo').css('display', 'none');
            localStorage['articulo']=src;
        }
        if (tipo=='persona' || tipo=='animal' || tipo=='cosa') {
            localStorage['sujeto']=src;
             adapter.encontrarComplementos(tipo).done(function(datos) {
                    $('body').html(new VerAcciones(adapter, datos).render());
                }); 
        }
    };*/
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}