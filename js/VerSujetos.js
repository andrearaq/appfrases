var VerSujetos= function (adapter, sujetos) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
     //   this.el.on('click', '.imgFrase', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verSujetos(sujetos));
        return this.el;
    };
      
 /*   this.mostrarPicto = function() {
        // comprobar cuantos pictos hay en la frase ordenada
        var cuantos = $('#fraseC').children('img').size();
        console.log("cuantos hay:"+cuantos);
        var id = $(this).attr('id');
        var numid = id.substr(1,1);
        console.log("numero id:"+numid);
        if (numid == cuantos){
            var imagen = '<img class="imgFrase" src="'+$(this).attr('src')+'" />';
            $('#fraseC').append(imagen);
            $('#'+id).remove();
        } else {
            console.log("picto erroneo");
            navigator.notification.beep(20);
        }    
    };*/
    
    this.exitFromApp = function() {
        console.log("pulsado boton salir");
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}