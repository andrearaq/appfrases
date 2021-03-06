// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. 
(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
    var adapter = new WebSqlAdapter();
    var ordenarURL = /^#ordenar/;
    var inventarURL = /^#inventar/;
    var ordenarNivelURL = /^#nivelorden\/(\d{1,})/;
    var sujetoURL = /^#sujetos/;
    var accionURL = /^#acciones/;
    var complementoURL = /^#complementos/;
        
    adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
    route();
    });
    
    /* --------------------------------- Registro de eventos -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        if (navigator.notification) { // Si disponemos de notificaciones nativas, sobreescribimos el alert del navegador:
            window.alert = function (message, titulo) {
                    navigator.notification.alert(
                    message,    // mensaje
                    null,       // función de callback
                    titulo, // título
                    'OK'        // Nombre botón
            );
          };
        }
    }, false);
        
    $(window).on('hashchange', route);
    /* ---------------------------------- Funciones locales ---------------------------------- */    
      function route() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(adapter).render());
            return;
        }
          
        // comprobar si queremos ir a ordenar frases
        var match = hash.match(ordenarURL);
        if (match) {
            $('body').html(new VerNivelesOrden(adapter).render());
            return;
        }
        // comprobar si queremos ir a ordenar frases elegido ya el nivel
        var match = hash.match(ordenarNivelURL);
        var nivel = null;
        var frase = null;
        if (match) {
            localStorage['frase']="0";
            frase = localStorage['frase'];
            nivel = match[1];
            localStorage['nivel']=nivel;
            console.log('nivel'+nivel);
            console.log("frase: "+frase);
            adapter.encontrarFrasesOrdenar(nivel,frase).done(function(datos) {
                $('body').html(new VerOrdenar(adapter, datos).render());
            });
        } 
        
          // comprobar si queremos ir a inventar
        var match = hash.match(inventarURL); 
        if (match) {
                $('body').html(new VerDatosInventar(adapter).render());           
        }          
         
          // comprobar si queremos ir a sujetos
        var match = hash.match(sujetoURL); 
        if (match) {
                adapter.encontrarSujetos().done(function(datos) {
                    $('body').html(new VerSujetos(adapter, datos).render());
                });            
        }
                  
      }
                                                
}());
