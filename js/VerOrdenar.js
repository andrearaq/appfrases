var VerOrdenar= function (adapter, frases) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '#help', this.mostrarAyuda);
        this.el.on('click', '.next', this.cambiarFrase);
        this.el.on('click', '.imgFrase', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
       // n=1;
        this.el.html(Handlebars.templates.verOrdenar(frases));
        return this.el;
    };
    this.mostrarAyuda = function() {
         window.alert('Elige, de la parte inferior, el pictograma correspondiente para obtener la frase ordenada. Luego pasa a la frase siguiente pulsando el botón inferior derecha.','Ayuda');
    };
    this.cambiarFrase = function() {
        var frase = parseInt(localStorage['frase'])+1;
        var nivel = localStorage['nivel'];
        localStorage['frase']=frase;
        if (frase<12) {
           adapter.encontrarFrasesOrdenar(nivel,frase).done(function(datos) {
                $('body').html(new VerOrdenar(adapter, datos).render());
            }); 
        } else {
            window.alert('NIVEL TERMINADO','Aviso');
            window.history.back();
        }
        
    };   
    this.mostrarPicto = function() {
        // comprobar cuantos pictos hay en la frase ordenada
        var cuantos = $('#fraseC').children('img').size();
        var id = $(this).attr('id');
        var numid = id.substr(1,1);
        if (numid == cuantos){
            var imagen = '<img class="imgFrase2" src="'+$(this).attr('src')+'" />';
            $('#fraseC').append(imagen);
            $('#'+id).remove();
            var c = $('#pictos').children('img').size();
            if (c==0){  // frase terminada correctamente
                var bien = '<div class="bien"><img src="img/pictos/bien.png" /></div>';
                $('#pictos').append(bien);
               
            }
        } else {
            navigator.notification.beep(1);
        }    
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}