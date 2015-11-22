// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. 
(function () {
    /* ---------------------------------- Variables locales ---------------------------------- */
    var adapter = new WebSqlAdapter();
    var ordenarURL = /^#ordenar/;
    var inventarURL = /^#inventar/;
    var ordenarNivelURL = /^#ordenar\/(\d{1,})/;
        
    adapter.inicializar().done(function () {
        console.log("Inicializado: Adaptador de datos");
    route();
    });
    
    /* --------------------------------- Registro de eventos -------------------------------- */
    document.addEventListener('deviceready', function () {
        FastClick.attach(document.body);
        if (navigator.notification) { // Si disponemos de notificaciones nativas, sobreescribimos el alert del navegador:
            window.alert = function (message) {
                    navigator.notification.alert(
                    message,    // mensaje
                    null,       // función de callback
                    "Workshop", // título
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
        if (match) {
            nivel = match[1];
            console.log("elegido nivel "+nivel);
            adapter.encontrarFrasesOrdenar(nivel).done(function(datos) {
                $('body').html(new VerOrdenar(adapter, datos).render());
            });
        }
        // comprobar si queremos ir a inventar
        var match = hash.match(inventarURL); 
        if (match) {
                adapter.encontrarDatos().done(function(datos) {
                    $('body').html(new VerDatosInventar(adapter, datos).render());
                });            
        } 
      }
                                                
}());
