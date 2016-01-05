var VerComplementos= function (adapter, complementos) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '.pictoP', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verComplementos(complementos));
        return this.el;
    };
      
    this.mostrarPicto = function() {
        // comprobar tipo picto elegido
        var tipo =$(this).parent().parent().attr('id');
        // picto elegido
        var src = $(this).attr('src');
        console.log("src imagen complementos:"+src);
        var imagen = '<img class="imgFrase3" src="'+src+'" />'; 
        
        $('#fraseInv').append('<div class="comple">'+imagen+'</div>');
        localStorage['palabras'] =parseInt(localStorage['palabras'])+1;
        var palabras = parseInt(localStorage['palabras']);
        if (palabras == 6) {
            window.alert('FRASE COMPLETA','Aviso');
            $('.listapictos').css('display', 'none');
        }
        
    };
    
    this.exitFromApp = function() {
	    navigator.app.exitApp();
    };
    
    this.inicializar();
}