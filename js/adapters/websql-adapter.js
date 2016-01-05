//Base de datos Fraseador

var WebSqlAdapter = function () {

    this.inicializar = function () {
        var deferred = $.Deferred();
        this.db = window.openDatabase("Fraseador", "1.0", "El Fraseador", 200000);
        //Database name, Version number, Text description, Estimated size of database
        this.db.transaction(
            function (tx) {
                crearTablaF(tx);
                insertarDatosF(tx);
                crearTablaS(tx);
                insertarDatosS(tx);
                crearTablaA(tx);
                insertarDatosA(tx);
                crearTablaC(tx);
                insertarDatosC(tx);
            },
            function (error) {
                console.log('Transacción Error: ' + error);
                deferred.reject('Transacción Error: ' + error);
            },
            function () {
                console.log('Transacción con éxito');
                deferred.resolve();
            }
        );
        //Los tres parámetros son la transacción en sí, la función de tratamiento de error, y la de todo OK.
        return deferred.promise();
    }   

    
    // encontrar frases para ordenar según el nivel
    this.encontrarFrasesOrdenar = function (niv,fra) {
        var deferred = $.Deferred();
        localStorage['nivel'] = niv;
        var idf = parseInt(fra);
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, texto, nivel FROM frases WHERE nivel=? ORDER BY id";
                tx.executeSql(sql, [niv], function (tx, results) {
                    var len = results.rows.length,
                        frases = [],
                        i = 0;
                    for (; i < len; i++) {
                        frases[i] = results.rows.item(i);
                        var palabras = frases[i].texto.split(' ');
                        for(j=0; j<palabras.length; j++) {
                            eval("frases[i].p" + j + " = palabras[j];");
                        }
                    }
                    
                    deferred.resolve(frases[idf]);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    // encontrar datos para inventar frases
    // encontrar sujetos
    this.encontrarSujetos = function () {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, tipo, picto FROM sujetos";
                
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                       sujetos = [],
                        i = 0;
                    for (; i < len; i++) {
                        sujetos[i] = results.rows.item(i);
                    } 
                    var Detalles = function(id, picto){
                        this.id = id;
                        this.picto = picto;
                    }
                    var Sujeto = function(tipo){
                        this.tipo = tipo;
                        this.detalles = new Array();
                    }
                    Sujeto.prototype.addDetalles = function(detalles){
                       this.detalles.push(detalles);
                    }
                    function getFormJson(tipo, lista){
                        var sujetoObj = new Sujeto(tipo);
                        var leng = lista.length,
                            i = 0;
                        for (; i < leng; i = i + 1) {
                           if(lista[i].tipo == tipo) {
                              sujetoObj.addDetalles(new Detalles(lista[i].id, lista[i].picto)); 
                           }
                        }               
                        return sujetoObj;
                    };
                    var suj = [];
                    var tipo = "articulo";
                    suj[0] = getFormJson(tipo, sujetos);
                    tipo = "persona";
                    suj[1] = getFormJson(tipo, sujetos);
                    tipo = "animal";
                    suj[2] = getFormJson(tipo, sujetos);
                    tipo = "cosa";
                    suj[3] = getFormJson(tipo, sujetos);                
                                        
                    deferred.resolve(suj);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    // encontrar datos para inventar frases
    // encontrar acciones
    this.encontrarAcciones = function (tipo) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
                
                if (tipo=='cosa') {
                   sql = "SELECT id, tipo, picto FROM acciones WHERE tipo=?"; 
                } else {
                    sql = "SELECT id, tipo, picto FROM acciones WHERE tipo=? OR tipo='ambos'";    
                }
                
                tx.executeSql(sql, [tipo], function (tx, results) {
                    var len = results.rows.length,
                       acciones = [],
                        i = 0;
                    for (; i < len; i++) {
                        acciones[i] = results.rows.item(i);
                        var palabras =  localStorage.getItem('palabras');
                        console.log("valor de palabras "+palabras);
                        
                        if (palabras == 2) {  // hay articulo y sujeto
                            acciones[i].arti = localStorage.getItem('articulo');
                        } else {              // solo hay sujeto
                           acciones[i].arti = '';
                        }
                        
                        acciones[i].suj = localStorage.getItem('sujeto');
                    }                
                                       
                    deferred.resolve(acciones);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
    // encontrar datos para inventar frases
    // encontrar complementos
    this.encontrarComplementos = function (tipoAc) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, tipo, picto FROM complementos";
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                       complementos = [],
                        i = 0;
                    for (; i < len; i++) {
                        complementos[i] = results.rows.item(i);
                    } 
                   
                    var Detalles = function(id, picto){
                        this.id = id;
                        this.picto = picto;
                    }
                    var Complemento = function(tipo, arti, suj, accion){
                        this.arti = arti;
                        this.suj = suj;
                        this.accion = accion;
                        this.tipo = tipo;
                        this.detalles = new Array();
                    }
                    Complemento.prototype.addDetalles = function(detalles){
                       this.detalles.push(detalles);
                    }
                    function getFormJson(tipo, lista){
                        var arti = '';
                        var palabras = localStorage.getItem('palabras');
                        if (palabras == 3) {  // hay articulo y sujeto y accion
                            arti = localStorage.getItem('articulo');
                        } else {              // solo hay sujeto y accion
                           arti = '';
                        }   
                        var suj = localStorage.getItem('sujeto');
                        var accion = localStorage.getItem('accion');
                        var compObj = new Complemento(tipo, arti, suj, accion);
                        var leng = lista.length,
                            i = 0;
                        console.log("longitud lista:"+leng);
                        for (; i < leng; i = i + 1) {
                           if(lista[i].tipo == tipo) {
                              compObj.addDetalles(new Detalles(lista[i].id, lista[i].picto)); 
                           }
                        }               
                        return compObj;
                    };
                    
                    var comp = [];
                    var accion = localStorage.getItem('accion');
                    var partes = accion.split('/');
                    var verbo = partes[3].split('.');
                    var tipo = "";
                    if (verbo[0]=='ser' || verbo[0]=='estar' ) {
                        console.log('verbo ser o estar:'+verbo[0]);
                        tipo = "adjetivo";
                        comp[0] = getFormJson(tipo, complementos);
                        if (tipoAc == 'cosa') {
                            tipo = "sustantivo";
                            comp[1] = getFormJson(tipo, complementos);
                            tipo = "nexo";
                            comp[2] = getFormJson(tipo, complementos); 
                        } else {
                            var palabras = localStorage.getItem('palabras');
                            if (palabras == 2) {
                                tipo = "nexo";
                                var nexo = complementos.slice(94);
                                comp[1] = getFormJson(tipo, nexo);  
                            }
                        }

                    } else {
                        tipo = "adjetivo";
                        comp[0] = getFormJson(tipo, complementos);
                        tipo = "sustantivo";
                        comp[1] = getFormJson(tipo, complementos);
                        tipo = "nexo";
                        comp[2] = getFormJson(tipo, complementos);                       
                    }            
                                        
                    deferred.resolve(comp);
                });
            },
            function (error) {
                deferred.reject("Transacción Error: " + error.message);
            }
        );
        return deferred.promise();
    };
    
        
    //crear tabla Frases
    var crearTablaF = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS frases');
        var sql = "CREATE TABLE IF NOT EXISTS frases ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "texto VARCHAR(80), "+
            "nivel INTEGER)";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla frases OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    
    //crear tabla Sujetos
    var crearTablaS = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS sujetos');
        var sql = "CREATE TABLE IF NOT EXISTS sujetos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "tipo VARCHAR(20), "+
            "picto VARCHAR(30))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla sujetos OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    
    //crear tabla Acciones
    var crearTablaA = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS acciones');
        var sql = "CREATE TABLE IF NOT EXISTS acciones ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "tipo VARCHAR(20), "+
            "picto VARCHAR(30))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla acciones OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    
    //crear tabla Complementos
    var crearTablaC = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS complementos');
        var sql = "CREATE TABLE IF NOT EXISTS complementos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "tipo VARCHAR(20), "+
            "picto VARCHAR(30))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla complementos OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
    
   
    //insertar datos de Frases
    var insertarDatosF = function (tx, frases) {

        var frases = [
        {"id": 1, "texto": "yo tengo frio", "nivel": 1},
        {"id": 2, "texto": "el perro corre", "nivel": 1},
        {"id": 3, "texto": "mama me besa", "nivel": 1},
        {"id": 4, "texto": "yo soy alta", "nivel": 1},
        {"id": 5, "texto": "tu comes fruta", "nivel": 1},
        {"id": 6, "texto": "papa es alto", "nivel": 1},
        {"id": 7, "texto": "hoy es lunes", "nivel": 1},
        {"id": 8, "texto": "el nino juega", "nivel": 1},
        {"id": 9, "texto": "yo tengo hambre", "nivel": 1},
        {"id": 10, "texto": "tengo un bocadillo", "nivel": 1},
        {"id": 11, "texto": "la nina llora", "nivel": 1},
        {"id": 12, "texto": "manana es viernes", "nivel": 1},
        {"id": 13, "texto": "el perro hace caca", "nivel": 2},
        {"id": 14, "texto": "el nino come verdura", "nivel": 2},
        {"id": 15, "texto": "mi hermano es alto", "nivel": 2},
        {"id": 16, "texto": "el gato tiene bigotes", "nivel": 2},
        {"id": 17, "texto": "el colegio es grande", "nivel": 2},
        {"id": 18, "texto": "la sopa esta caliente", "nivel": 2},
        {"id": 19, "texto": "la silla esta rota", "nivel": 2},
        {"id": 20, "texto": "mi hermana es delgada", "nivel": 2},
        {"id": 21, "texto": "el hielo es frio", "nivel": 2},
        {"id": 22, "texto": "tuu abuela es guapa", "nivel": 2},
        {"id": 23, "texto": "el mar es azul", "nivel": 2},
        {"id": 24, "texto": "mi amiga hace gimnasia", "nivel": 2},
        {"id": 25, "texto": "mi mama hace la comida", "nivel": 3},
        {"id": 26, "texto": "yo duermo en la cama", "nivel": 3},
        {"id": 27, "texto": "la mesa roja es cuadrada", "nivel": 3},
        {"id": 28, "texto": "ella juega bien al futbol", "nivel": 3},
        {"id": 29, "texto": "mi abuela come mucha verdura", "nivel": 3},
        {"id": 30, "texto": "mi colegio es muy grande", "nivel": 3},
        {"id": 31, "texto": "el bombero apaga el fuego", "nivel": 3},
        {"id": 32, "texto": "una nina bebe mucha agua", "nivel": 3},
        {"id": 33, "texto": "las ninas juegan y rien", "nivel": 3},
        {"id": 34, "texto": "el coche es de juguete", "nivel": 3},
        {"id": 35, "texto": "en el campo hay flores", "nivel": 3},
        {"id": 36, "texto": "hoy meriendo pan con mantequilla", "nivel": 3},
        {"id": 37, "texto": "el perro negro salta y corre", "nivel": 4},
        {"id": 38, "texto": "el nino alto juega al baloncesto", "nivel": 4},
        {"id": 39, "texto": "la nina lleva un vestido azul", "nivel": 4},
        {"id": 40, "texto": "la gallina pone huevos y cacarea", "nivel": 4},
        {"id": 41, "texto": "mi hermano desayuna leche y galletas", "nivel": 4},
        {"id": 42, "texto": "me gusta mucho jugar al futbol", "nivel": 4},
        {"id": 43, "texto": "la ventana de cristal esta rota", "nivel": 4},
        {"id": 44, "texto": "los viernes voy a la piscina", "nivel": 4},
        {"id": 45, "texto": "ayer bebi dos zumos de pina", "nivel": 4},
        {"id": 46, "texto": "el elefante tiene una trompa larga", "nivel": 4},
        {"id": 47, "texto": "voy a la playa en agosto", "nivel": 4},
        {"id": 48, "texto": "mi dibujo de estrellas esta roto", "nivel": 4}
    ];

        var l = frases.length;
        var sql = "INSERT OR REPLACE INTO frases " +
            "(id, texto, nivel) " +
            "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = frases[i];
            tx.executeSql(sql, [e.id, e.texto, e.nivel],
                function () {
                    console.log('INSERT frases OK');
                },
                function (tx, error) {
                    alert('INSERT frases error: ' + error.message);
                });
        }
    } // fin insertar frases
    
    //insertar datos de Sujetos
    var insertarDatosS = function (tx, sujetos) {

        var sujetos = [
        {"id": 1, "tipo": "articulo", "picto": "el.png"},
        {"id": 2, "tipo": "articulo", "picto": "la.png"},
        {"id": 3, "tipo": "articulo", "picto": "los.png"},
        {"id": 4, "tipo": "articulo", "picto": "las.png"},
        {"id": 5, "tipo": "articulo", "picto": "un.png"},
        {"id": 6, "tipo": "articulo", "picto": "una.png"},
        {"id": 7, "tipo": "articulo", "picto": "unos.png"},
        {"id": 8, "tipo": "articulo", "picto": "unas.png"},
        {"id": 9, "tipo": "persona", "picto": "yo.png"},
        {"id": 10, "tipo": "persona", "picto": "tu.png"},
        {"id": 11, "tipo": "persona", "picto": "eel.png"},
        {"id": 12, "tipo": "persona", "picto": "ella.png"},
        {"id": 13, "tipo": "persona", "picto": "nosotros.png"},
        {"id": 14, "tipo": "persona", "picto": "vosotros.png"},
        {"id": 15, "tipo": "persona", "picto": "ellos.png"},
        {"id": 16, "tipo": "persona", "picto": "ellas.png"},
        {"id": 17, "tipo": "persona", "picto": "nino.png"},
        {"id": 18, "tipo": "persona", "picto": "nina.png"},
        {"id": 19, "tipo": "persona", "picto": "abuela.png"},
        {"id": 20, "tipo": "persona", "picto": "abuelo.png"},
        {"id": 21, "tipo": "persona", "picto": "mama.png"},
        {"id": 22, "tipo": "persona", "picto": "papa.png"},
        {"id": 23, "tipo": "persona", "picto": "hermano.png"},
        {"id": 24, "tipo": "persona", "picto": "hermana.png"},
        {"id": 25, "tipo": "persona", "picto": "profesor.png"},
        {"id": 26, "tipo": "persona", "picto": "profesora.png"},
        {"id": 27, "tipo": "persona", "picto": "cocinero.png"},
        {"id": 28, "tipo": "persona", "picto": "cocinera.png"},
        {"id": 29, "tipo": "persona", "picto": "bombero.png"},
        {"id": 30, "tipo": "persona", "picto": "policia.png"},
        {"id": 31, "tipo": "persona", "picto": "conductor.png"},
        {"id": 32, "tipo": "persona", "picto": "conductora.png"},
        {"id": 33, "tipo": "persona", "picto": "medico.png"},
        {"id": 34, "tipo": "persona", "picto": "enfermero.png"},
        {"id": 35, "tipo": "persona", "picto": "enfermera.png"},
        {"id": 36, "tipo": "persona", "picto": "barrendero.png"},
        {"id": 37, "tipo": "animal", "picto": "perro.png"},
        {"id": 38, "tipo": "animal", "picto": "gato.png"},
        {"id": 39, "tipo": "animal", "picto": "paloma.png"},
        {"id": 40, "tipo": "animal", "picto": "mosca.png"},
        {"id": 41, "tipo": "animal", "picto": "mosquito.png"},
        {"id": 42, "tipo": "animal", "picto": "arana.png"},
        {"id": 43, "tipo": "animal", "picto": "gallina.png"},
        {"id": 44, "tipo": "animal", "picto": "gallo.png"},
        {"id": 45, "tipo": "animal", "picto": "pato.png"},
        {"id": 46, "tipo": "animal", "picto": "pata.png"},
        {"id": 47, "tipo": "animal", "picto": "cisne.png"},
        {"id": 48, "tipo": "animal", "picto": "vaca.png"},
        {"id": 49, "tipo": "animal", "picto": "toro.png"},
        {"id": 50, "tipo": "animal", "picto": "oveja.png"},
        {"id": 51, "tipo": "animal", "picto": "cordero.png"},
        {"id": 52, "tipo": "animal", "picto": "caballo.png"},
        {"id": 53, "tipo": "animal", "picto": "yegua.png"},
        {"id": 54, "tipo": "animal", "picto": "delfin.png"},
        {"id": 55, "tipo": "animal", "picto": "serpiente.png"},
        {"id": 56, "tipo": "animal", "picto": "rana.png"},
        {"id": 57, "tipo": "animal", "picto": "raton.png"},
        {"id": 58, "tipo": "animal", "picto": "rata.png"},
        {"id": 59, "tipo": "animal", "picto": "elefante.png"},
        {"id": 60, "tipo": "animal", "picto": "jirafa.png"},
        {"id": 61, "tipo": "animal", "picto": "leon.png"},
        {"id": 62, "tipo": "animal", "picto": "leona.png"},
        {"id": 63, "tipo": "animal", "picto": "tigre.png"},
        {"id": 64, "tipo": "cosa", "picto": "mesa.png"},    
        {"id": 65, "tipo": "cosa", "picto": "silla.png"}, 
        {"id": 66, "tipo": "cosa", "picto": "pizarra.png"}, 
        {"id": 67, "tipo": "cosa", "picto": "lapiz.png"}, 
        {"id": 68, "tipo": "cosa", "picto": "goma.png"}, 
        {"id": 69, "tipo": "cosa", "picto": "boli.png"}, 
        {"id": 70, "tipo": "cosa", "picto": "pintura.png"}, 
        {"id": 71, "tipo": "cosa", "picto": "mueble.png"}, 
        {"id": 72, "tipo": "cosa", "picto": "cama.png"}, 
        {"id": 73, "tipo": "cosa", "picto": "almohada.png"}, 
        {"id": 74, "tipo": "cosa", "picto": "cocina.png"}, 
        {"id": 75, "tipo": "cosa", "picto": "bano.png"}, 
        {"id": 76, "tipo": "cosa", "picto": "ducha.png"}, 
        {"id": 77, "tipo": "cosa", "picto": "comedor.png"}, 
        {"id": 78, "tipo": "cosa", "picto": "sofa.png"}, 
        {"id": 79, "tipo": "cosa", "picto": "dormitorio.png"}, 
        {"id": 80, "tipo": "cosa", "picto": "juguete.png"}, 
        {"id": 81, "tipo": "cosa", "picto": "muneca.png"}, 
        {"id": 82, "tipo": "cosa", "picto": "coche.png"}, 
        {"id": 83, "tipo": "cosa", "picto": "bici.png"}, 
        {"id": 84, "tipo": "cosa", "picto": "moto.png"}, 
        {"id": 85, "tipo": "cosa", "picto": "avion.png"}, 
        {"id": 86, "tipo": "cosa", "picto": "tren.png"}, 
        {"id": 87, "tipo": "cosa", "picto": "barco.png"}, 
        {"id": 88, "tipo": "cosa", "picto": "falda.png"}, 
        {"id": 89, "tipo": "cosa", "picto": "blusa.png"}, 
        {"id": 90, "tipo": "cosa", "picto": "pantalon.png"},
        {"id": 91, "tipo": "cosa", "picto": "zapatos.png"},
        {"id": 92, "tipo": "cosa", "picto": "jersey.png"},
        {"id": 93, "tipo": "cosa", "picto": "bufanda.png"},
        {"id": 94, "tipo": "cosa", "picto": "gorro.png"},
        {"id": 95, "tipo": "cosa", "picto": "chaqueta.png"},
        {"id": 96, "tipo": "cosa", "picto": "abrigo.png"},
        {"id": 97, "tipo": "cosa", "picto": "tele.png"},
        {"id": 98, "tipo": "cosa", "picto": "cielo.png"},
        {"id": 99, "tipo": "cosa", "picto": "mar.png"},
        {"id": 100, "tipo": "cosa", "picto": "luz.png"},
        {"id": 101, "tipo": "cosa", "picto": "fuego.png"},
        {"id": 102, "tipo": "cosa", "picto": "luna.png"},
        {"id": 103, "tipo": "cosa", "picto": "pinturas.png"}
    ];

        var l = sujetos.length;
        var sql = "INSERT OR REPLACE INTO sujetos " +
            "(id, tipo, picto) " +
            "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = sujetos[i];
            tx.executeSql(sql, [e.id, e.tipo, e.picto],
                function () {
                    console.log('INSERT sujetos OK');
                },
                function (tx, error) {
                    alert('INSERT sujetos error: ' + error.message);
                });
        }
    } // fin insertar sujetos
    
    //insertar datos de Acciones
    var insertarDatosA = function (tx, acciones) {

        var acciones = [
        {"id": 1, "tipo": "persona", "picto": "llorar.png"},
        {"id": 2, "tipo": "persona", "picto": "reir.png"},
        {"id": 3, "tipo": "persona", "picto": "cortar.png"},
        {"id": 4, "tipo": "persona", "picto": "escribir.png"},
        {"id": 5, "tipo": "persona", "picto": "leer.png"},
        {"id": 6, "tipo": "persona", "picto": "cocinar.png"},
        {"id": 7, "tipo": "persona", "picto": "besar.png"},
        {"id": 8, "tipo": "persona", "picto": "apagar.png"},
        {"id": 9, "tipo": "persona", "picto": "conducir.png"},
        {"id": 10, "tipo": "persona", "picto": "gritar.png"},
        {"id": 11, "tipo": "persona", "picto": "encender.png"},
        {"id": 12, "tipo": "persona", "picto": "limpiar.png"},
        {"id": 13, "tipo": "persona", "picto": "lavar.png"},
        {"id": 14, "tipo": "persona", "picto": "viajar.png"},
        {"id": 15, "tipo": "ambos", "picto": "comer.png"},
        {"id": 16, "tipo": "ambos", "picto": "correr.png"},
        {"id": 17, "tipo": "ambos", "picto": "saltar.png"},
        {"id": 18, "tipo": "ambos", "picto": "cantar.png"},
        {"id": 19, "tipo": "ambos", "picto": "morder.png"},
        {"id": 20, "tipo": "ambos", "picto": "chupar.png"},
        {"id": 21, "tipo": "ambos", "picto": "andar.png"},
        {"id": 22, "tipo": "ambos", "picto": "hacer.png"},
        {"id": 23, "tipo": "ambos", "picto": "parar.png"},
        {"id": 24, "tipo": "ambos", "picto": "chillar.png"},
        {"id": 25, "tipo": "ambos", "picto": "silbar.png"},
        {"id": 26, "tipo": "ambos", "picto": "ver.png"},
        {"id": 27, "tipo": "ambos", "picto": "dormir.png"},
        {"id": 28, "tipo": "ambos", "picto": "ir.png"},
        {"id": 29, "tipo": "ambos", "picto": "subir.png"},
        {"id": 30, "tipo": "ambos", "picto": "bajar.png"},
        {"id": 31, "tipo": "ambos", "picto": "ser.png"},    
        {"id": 32, "tipo": "ambos", "picto": "estar.png"},
        {"id": 33, "tipo": "animal", "picto": "balar.png"},
        {"id": 34, "tipo": "animal", "picto": "ladrar.png"},
        {"id": 35, "tipo": "animal", "picto": "maullar.png"},
        {"id": 36, "tipo": "animal", "picto": "volar.png"},
        {"id": 37, "tipo": "animal", "picto": "picar.png"},
        {"id": 38, "tipo": "animal", "picto": "croar.png"},
        {"id": 39, "tipo": "animal", "picto": "mugir.png"},
        {"id": 40, "tipo": "animal", "picto": "relinchar.png"},
        {"id": 41, "tipo": "animal", "picto": "rugir.png"},
        {"id": 42, "tipo": "cosa", "picto": "ser.png"},    
        {"id": 43, "tipo": "cosa", "picto": "estar.png"}
            
    ];

        var l = acciones.length;
        var sql = "INSERT OR REPLACE INTO acciones " +
            "(id, tipo, picto) " +
            "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = acciones[i];
            tx.executeSql(sql, [e.id, e.tipo, e.picto],
                function () {
                    console.log('INSERT acciones OK');
                },
                function (tx, error) {
                    alert('INSERT acciones error: ' + error.message);
                });
        }
    } // fin insertar acciones
    
    //insertar datos de Complementos
    var insertarDatosC = function (tx, complementos) {

        var complementos = [
        {"id": 1, "tipo": "adjetivo", "picto": "mucho.png"},
        {"id": 2, "tipo": "adjetivo", "picto": "poco.png"},
        {"id": 3, "tipo": "adjetivo", "picto": "grande.png"},
        {"id": 4, "tipo": "adjetivo", "picto": "pequeno.png"},
        {"id": 5, "tipo": "adjetivo", "picto": "blanco.png"},
        {"id": 6, "tipo": "adjetivo", "picto": "rojo.png"},
        {"id": 7, "tipo": "adjetivo", "picto": "amarillo.png"},
        {"id": 8, "tipo": "adjetivo", "picto": "verde.png"},
        {"id": 9, "tipo": "adjetivo", "picto": "azul.png"},
        {"id": 10, "tipo": "adjetivo", "picto": "marron.png"},
        {"id": 11, "tipo": "adjetivo", "picto": "gris.png"},
        {"id": 12, "tipo": "adjetivo", "picto": "negro.png"},
        {"id": 13, "tipo": "adjetivo", "picto": "rosa.png"},
        {"id": 14, "tipo": "adjetivo", "picto": "naranja.png"},
        {"id": 15, "tipo": "adjetivo", "picto": "violeta.png"},
        {"id": 16, "tipo": "adjetivo", "picto": "fuerte.png"},
        {"id": 17, "tipo": "adjetivo", "picto": "suave.png"},
        {"id": 18, "tipo": "adjetivo", "picto": "alto.png"},
        {"id": 19, "tipo": "adjetivo", "picto": "alta.png"},
        {"id": 20, "tipo": "adjetivo", "picto": "bajo.png"},
        {"id": 21, "tipo": "adjetivo", "picto": "baja.png"},
        {"id": 22, "tipo": "adjetivo", "picto": "ancho.png"},
        {"id": 23, "tipo": "adjetivo", "picto": "ancha.png"},
        {"id": 24, "tipo": "adjetivo", "picto": "estrecho.png"},
        {"id": 25, "tipo": "adjetivo", "picto": "estrecha.png"},
        {"id": 26, "tipo": "adjetivo", "picto": "largo.png"},
        {"id": 27, "tipo": "adjetivo", "picto": "larga.png"},
        {"id": 28, "tipo": "adjetivo", "picto": "corto.png"},
        {"id": 29, "tipo": "adjetivo", "picto": "corta.png"},
        {"id": 30, "tipo": "adjetivo", "picto": "cuadrado.png"},
        {"id": 31, "tipo": "adjetivo", "picto": "cuadrada.png"},
        {"id": 32, "tipo": "adjetivo", "picto": "redondo.png"},
        {"id": 33, "tipo": "adjetivo", "picto": "redonda.png"},
        {"id": 34, "tipo": "adjetivo", "picto": "sucio.png"},
        {"id": 35, "tipo": "adjetivo", "picto": "sucia.png"},
        {"id": 36, "tipo": "adjetivo", "picto": "limpio.png"},
        {"id": 37, "tipo": "adjetivo", "picto": "limpia.png"},
        {"id": 38, "tipo": "adjetivo", "picto": "delgado.png"},
        {"id": 39, "tipo": "adjetivo", "picto": "delgada.png"},
        {"id": 40, "tipo": "adjetivo", "picto": "sentado.png"},
        {"id": 41, "tipo": "adjetivo", "picto": "sentada.png"},
        {"id": 42, "tipo": "adjetivo", "picto": "salvaje.png"},
        {"id": 43, "tipo": "sustantivo", "picto": "fruta.png"},
        {"id": 44, "tipo": "sustantivo", "picto": "verdura.png"},
        {"id": 45, "tipo": "sustantivo", "picto": "carne.png"},
        {"id": 46, "tipo": "sustantivo", "picto": "pescado.png"},    
        {"id": 47, "tipo": "sustantivo", "picto": "leche.png"},
        {"id": 48, "tipo": "sustantivo", "picto": "agua.png"},
        {"id": 49, "tipo": "sustantivo", "picto": "zumo.png"},
        {"id": 50, "tipo": "sustantivo", "picto": "pan.png"},
        {"id": 51, "tipo": "sustantivo", "picto": "mantequilla.png"},
        {"id": 52, "tipo": "sustantivo", "picto": "vino.png"},
        {"id": 53, "tipo": "sustantivo", "picto": "cerveza.png"},
        {"id": 54, "tipo": "sustantivo", "picto": "refresco.png"},
        {"id": 55, "tipo": "sustantivo", "picto": "madera.png"},
        {"id": 56, "tipo": "sustantivo", "picto": "plastico.png"},
        {"id": 57, "tipo": "sustantivo", "picto": "tela.png"},
        {"id": 58, "tipo": "sustantivo", "picto": "ropa.png"},
        {"id": 59, "tipo": "sustantivo", "picto": "campo.png"},
        {"id": 60, "tipo": "sustantivo", "picto": "acera.png"},
        {"id": 61, "tipo": "sustantivo", "picto": "carretera.png"},
        {"id": 62, "tipo": "sustantivo", "picto": "playa.png"},
        {"id": 63, "tipo": "sustantivo", "picto": "mar.png"},
        {"id": 64, "tipo": "sustantivo", "picto": "cielo.png"},
        {"id": 65, "tipo": "sustantivo", "picto": "montana.png"},
        {"id": 66, "tipo": "sustantivo", "picto": "lunes.png"},
        {"id": 67, "tipo": "sustantivo", "picto": "martes.png"},
        {"id": 68, "tipo": "sustantivo", "picto": "miercoles.png"},
        {"id": 69, "tipo": "sustantivo", "picto": "jueves.png"},
        {"id": 70, "tipo": "sustantivo", "picto": "viernes.png"},
        {"id": 71, "tipo": "sustantivo", "picto": "sabado.png"},
        {"id": 72, "tipo": "sustantivo", "picto": "domingo.png"},
        {"id": 73, "tipo": "sustantivo", "picto": "dia.png"},
        {"id": 74, "tipo": "sustantivo", "picto": "semana.png"},
        {"id": 75, "tipo": "sustantivo", "picto": "mes.png"},
        {"id": 76, "tipo": "sustantivo", "picto": "ano.png"},
        {"id": 77, "tipo": "nexo", "picto": "el.png"},
        {"id": 78, "tipo": "nexo", "picto": "la.png"},
        {"id": 79, "tipo": "nexo", "picto": "los.png"},
        {"id": 80, "tipo": "nexo", "picto": "las.png"},
        {"id": 81, "tipo": "nexo", "picto": "un.png"},
        {"id": 82, "tipo": "nexo", "picto": "una.png"},
        {"id": 83, "tipo": "nexo", "picto": "unos.png"},
        {"id": 84, "tipo": "nexo", "picto": "unas.png"},
        {"id": 85, "tipo": "nexo", "picto": "en.png"},
        {"id": 86, "tipo": "nexo", "picto": "de.png"},
        {"id": 87, "tipo": "nexo", "picto": "a.png"},
        {"id": 88, "tipo": "nexo", "picto": "con.png"},
        {"id": 89, "tipo": "nexo", "picto": "del.png"},
        {"id": 90, "tipo": "nexo", "picto": "al.png"},
        {"id": 91, "tipo": "nexo", "picto": "por.png"},
        {"id": 92, "tipo": "nexo", "picto": "entre.png"},
        {"id": 93, "tipo": "nexo", "picto": "para.png"},
        {"id": 94, "tipo": "nexo", "picto": "sobre.png"},
        {"id": 95, "tipo": "nexo", "picto": "y.png"}   
    ];

        var l = complementos.length;
        var sql = "INSERT OR REPLACE INTO complementos " +
            "(id, tipo, picto) " +
            "VALUES (?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = complementos[i];
            tx.executeSql(sql, [e.id, e.tipo, e.picto],
                function () {
                    console.log('INSERT complementos OK');
                },
                function (tx, error) {
                    alert('INSERT complementos error: ' + error.message);
                });
        }
    } // fin insertar complementos
    
    
    
} // fin websql-adapter
