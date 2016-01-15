var VerSujetos= function (adapter, sujetos) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '#help', this.mostrarAyuda);
        this.el.on('click', '.pictoP', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
        localStorage.setItem('palabras','0');
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verSujetos(sujetos));
        return this.el;
    };
    this.mostrarAyuda = function() {
         window.alert('Elige, de la parte inferior, el pictograma que desees para obtener el sujeto de la frase inventada. El sujeto puede tener una palabra o dos palabras (articulo + sustantivo).','Ayuda');
    }; 
    this.mostrarPicto = function() {
        // comprobar tipo picto elegido
        var tipo =$(this).parent().parent().attr('id');
        // picto elegido
        var src = $(this).attr('src');
        var imagen = '<img class="imgFrase3" src="'+src+'" />'; 
        
        $('#fraseI').css('display','inline');
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