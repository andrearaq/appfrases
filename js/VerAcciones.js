var VerAcciones= function (adapter, acciones) {
    this.inicializar = function () {
        
        // Definimos un div para la vista. Lo usaremos para añadir eventos.
        this.el = $('<div/>');
        this.el.on('click', '#help', this.mostrarAyuda);
        this.el.on('click', '.pictoP', this.mostrarPicto);
        this.el.on('click', '.salir', this.exitFromApp);
    };
    this.render = function() {
        this.el.html(Handlebars.templates.verAcciones(acciones));
        return this.el;
    };
    this.mostrarAyuda = function() {
         window.alert('Elige, de la parte inferior, el pictograma que desees para obtener la acción que realiza el sujeto de la frase inventada. Solo se permite elegir una acción.','Ayuda');
    };   
    this.mostrarPicto = function() {
         // comprobar tipo picto elegido
        var tipo =$(this).parent().attr('id');
        // picto elegido
        var src = $(this).attr('src');
        var imagen = '<img class="imgFrase3" src="'+src+'" />'; 
        localStorage.setItem('accion',src);
        $('#fraseIn').append('<div class="accion2">'+imagen+'</div>');
       
        var partes = src.split('/');
        var verbo = partes[3].split('.');
        console.log("verbo de la accion: "+ verbo[0]);
        var actor = localStorage.getItem('actor');
        console.log("actor: "+actor);
        // buscar el tiempo verbal correcto de la acción
        adapter.encontrarVerbo(verbo[0], actor).done(function(dato){
            console.log("tiempo verbal correcto: "+dato[0].tiempoV);
            localStorage.setItem('tiempoV',dato[0].tiempoV);
        });
        
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