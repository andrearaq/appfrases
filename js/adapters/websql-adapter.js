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
                crearTablaV(tx);
                insertarDatosV(tx);
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
                    }
                    
                    // codigo para crear el objeto Frase
                    var Palabras = function(idp, texto){
                        this.idp = idp;
                        this.texto = texto;
                    }
                    var Frase = function(id, nivel, p0){
                        this.id = id;
                        this.nivel = nivel;
                        this.p0 = p0;
                        this.palabras = new Array();
                    }
                    Frase.prototype.addPalabras = function(palabras){
                       this.palabras.push(palabras);
                    }
                    function getFormJson2(id, nivel, frases){
                        var palabras = frases[id].texto.split(' ');
                        var pal = new Array();  // array asociativo pNº y palabra
                        
                        for(j=0; j<palabras.length; j++) {
                            eval("pal['p"+j+"'] = palabras[j];");
                        }
                        
                        var fraseObj = new Frase(id, nivel, pal.p0);  // crear objeto frase
                        var leng = palabras.length,
                            i = 1;                        
                        if (leng == 3){  // frase del nivel 1
                            fraseObj.addPalabras(new Palabras('p2',palabras[2]));
                            fraseObj.addPalabras(new Palabras('p1',palabras[1])); 
                        } else { // frase del resto de niveles 
                           var alea = '';
                           for (; i < leng; i = i + 1) {
                               alea = Math.floor(Math.random()*(palabras.length-1)+1);
                               var idp = '';
                               for (index in pal) {     // buscar la palabra para saber su pNº correspondiente
                                  if (pal[index] == palabras[alea]){
                                      idp = index;
                                  }   
                                }
                               fraseObj.addPalabras(new Palabras(idp,palabras[alea])); 
                               palabras.splice(alea, 1);
                            }  
                        }
                                      
                        return fraseObj;
                    }; // fin funcion getFormJson2        
                    var fra = [];
                    fra [0] = getFormJson2(idf, frases[idf].nivel, frases); 
                    
                    deferred.resolve(fra);
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
                    var actor = "";
                    for (; i < len; i++) {
                        acciones[i] = results.rows.item(i);
                        var palabras =  localStorage.getItem('palabras');
                        
                        if (palabras == 2) {  // hay articulo y sujeto
                            acciones[i].arti = localStorage.getItem('articulo');
                            actor = localStorage.getItem('articulo');                            
                        } else {              // solo hay sujeto
                           acciones[i].arti = '';;
                           actor = localStorage.getItem('sujeto'); 
                        }
                        
                        acciones[i].suj = localStorage.getItem('sujeto');
                    } 
                     var partes = actor.split('/');
                     actor = partes[2].split('.');
                    localStorage.setItem('actor',actor[0]);
                    if (actor[0] == 'los' || actor[0] == 'unos'){
                        localStorage.setItem('actor', 'ellos'); 
                    }
                    if (actor[0] == 'las' || actor[0] == 'unas'){
                        localStorage.setItem('actor', 'ellas'); 
                    }          
                    if (actor[0] == 'la' || actor[0] == 'una' || actor[0]=='mama'){
                        localStorage.setItem('actor', 'ella'); 
                    } 
                    if (actor[0] == 'un' || actor[0]=='papa'){
                        localStorage.setItem('actor', 'el');
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
                    var Complemento = function(tipo, arti, suj, accion, tiempoV){
                        this.arti = arti;
                        this.suj = suj;
                        this.accion = accion;
                        this.tiempoV = tiempoV;
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
                        var compObj = new Complemento(tipo, arti, suj, accion, tiempoV);
                        var leng = lista.length,
                            i = 0;
                        for (; i < leng; i = i + 1) {
                           if(lista[i].tipo == tipo) {
                              compObj.addDetalles(new Detalles(lista[i].id, lista[i].picto)); 
                           }
                        }               
                        return compObj;
                    };
                    
                    var comp = [];
                    var accion = localStorage.getItem('accion');
                    var tiempoV = localStorage.getItem('tiempoV');
                    var partes = accion.split('/');
                    var verbo = partes[3].split('.');
                    var tipo = "";
                    if (verbo[0]=='ser' || verbo[0]=='estar' ) {
                        tipo = "adjetivo";
                        comp[0] = getFormJson(tipo, complementos);
                        if (tipoAc == 'cosa') {
                            tipo = "sustantivo";
                            comp[1] = getFormJson(tipo, complementos);
                            tipo = "nexo";
                            comp[2] = getFormJson(tipo, complementos); 
                        } else {
                            var palabras = localStorage.getItem('palabras');
                            tipo = "nexo";
                            var nexo = complementos.slice(len-1);
                            comp[1] = getFormJson(tipo, nexo); 
                         /*   if (palabras == 2) {
                                tipo = "nexo";
                                console.log("valor len: "+len);
                                var nexo = complementos.slice(len-1);
                                console.log("nexo longitud: "+nexo.length);
                                comp[1] = getFormJson(tipo, nexo);  
                            }*/
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
    
    // encontrar verbo de una accion
    this.encontrarVerbo = function (verbo, actor) {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, "+ actor + " as tiempoV FROM verbos WHERE verbo=?";
                tx.executeSql(sql, [verbo], function (tx, results) {
                    var len = results.rows.length,
                        accion = [],
                        i = 0;
                    for (; i < len; i++) {
                        accion[i] = results.rows.item(i);
                    }
                    
                    deferred.resolve(accion);
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
    
    //crear tabla Verbos
    var crearTablaV = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS verbos');
        var sql = "CREATE TABLE IF NOT EXISTS verbos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "verbo VARCHAR(20), "+
            "yo VARCHAR(20), "+
            "tu VARCHAR(20), "+
            "el VARCHAR(20), "+
            "ella VARCHAR(20), "+
            "nosotros VARCHAR(20), "+
            "vosotros VARCHAR(20), "+
            "ellos VARCHAR(20), "+
            "ellas VARCHAR(30))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla verbos OK');
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
        {"id": 44, "texto": "los vierness voy a la piscina", "nivel": 4},
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
        {"id": 64, "tipo": "animal", "picto": "cerdo.png"},
        {"id": 65, "tipo": "animal", "picto": "cebra.png"},           
        {"id": 66, "tipo": "cosa", "picto": "mesa.png"},    
        {"id": 67, "tipo": "cosa", "picto": "silla.png"}, 
        {"id": 68, "tipo": "cosa", "picto": "pizarra.png"}, 
        {"id": 69, "tipo": "cosa", "picto": "lapiz.png"}, 
        {"id": 70, "tipo": "cosa", "picto": "goma.png"}, 
        {"id": 71, "tipo": "cosa", "picto": "boli.png"}, 
        {"id": 72, "tipo": "cosa", "picto": "pintura.png"},
        {"id": 73, "tipo": "cosa", "picto": "pinturas.png"},
        {"id": 74, "tipo": "cosa", "picto": "casa.png"},
        {"id": 75, "tipo": "cosa", "picto": "casas.png"}, 
        {"id": 76, "tipo": "cosa", "picto": "mueble.png"}, 
        {"id": 77, "tipo": "cosa", "picto": "cama.png"}, 
        {"id": 78, "tipo": "cosa", "picto": "almohada.png"}, 
        {"id": 79, "tipo": "cosa", "picto": "cocina.png"}, 
        {"id": 80, "tipo": "cosa", "picto": "bano.png"}, 
        {"id": 81, "tipo": "cosa", "picto": "ducha.png"}, 
        {"id": 82, "tipo": "cosa", "picto": "comedor.png"}, 
        {"id": 83, "tipo": "cosa", "picto": "sofa.png"}, 
        {"id": 84, "tipo": "cosa", "picto": "dormitorio.png"}, 
        {"id": 85, "tipo": "cosa", "picto": "juguete.png"}, 
        {"id": 86, "tipo": "cosa", "picto": "muneca.png"}, 
        {"id": 87, "tipo": "cosa", "picto": "balon.png"},
        {"id": 88, "tipo": "cosa", "picto": "coche.png"}, 
        {"id": 89, "tipo": "cosa", "picto": "bici.png"}, 
        {"id": 90, "tipo": "cosa", "picto": "moto.png"}, 
        {"id": 91, "tipo": "cosa", "picto": "avion.png"}, 
        {"id": 92, "tipo": "cosa", "picto": "tren.png"}, 
        {"id": 93, "tipo": "cosa", "picto": "barco.png"}, 
        {"id": 94, "tipo": "cosa", "picto": "falda.png"}, 
        {"id": 95, "tipo": "cosa", "picto": "blusa.png"}, 
        {"id": 96, "tipo": "cosa", "picto": "pantalon.png"},
        {"id": 97, "tipo": "cosa", "picto": "chandal.png"}, 
        {"id": 98, "tipo": "cosa", "picto": "zapatos.png"},
        {"id": 99, "tipo": "cosa", "picto": "jersey.png"},
        {"id": 100, "tipo": "cosa", "picto": "bufanda.png"},
        {"id": 101, "tipo": "cosa", "picto": "gorro.png"},
        {"id": 102, "tipo": "cosa", "picto": "chaqueta.png"},
        {"id": 103, "tipo": "cosa", "picto": "abrigo.png"},
        {"id": 104, "tipo": "cosa", "picto": "botas.png"},    
        {"id": 105, "tipo": "cosa", "picto": "tele.png"},
        {"id": 106, "tipo": "cosa", "picto": "cielo.png"},
        {"id": 107, "tipo": "cosa", "picto": "mar.png"},
        {"id": 108, "tipo": "cosa", "picto": "playa.png"},
        {"id": 109, "tipo": "cosa", "picto": "piscina.png"},
        {"id": 110, "tipo": "cosa", "picto": "montana.png"},
        {"id": 111, "tipo": "cosa", "picto": "campo.png"},
        {"id": 112, "tipo": "cosa", "picto": "luz.png"},
        {"id": 113, "tipo": "cosa", "picto": "fuego.png"},
        {"id": 114, "tipo": "cosa", "picto": "luna.png"},
        {"id": 115, "tipo": "cosa", "picto": "estrellas.png"}, 
        {"id": 116, "tipo": "cosa", "picto": "colegio.png"}  
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
        {"id": 15, "tipo": "persona", "picto": "apagar fuego.png"},   
        {"id": 16, "tipo": "ambos", "picto": "comer.png"},
        {"id": 17, "tipo": "ambos", "picto": "beber.png"},
        {"id": 18, "tipo": "ambos", "picto": "correr.png"},
        {"id": 19, "tipo": "ambos", "picto": "saltar.png"},
        {"id": 20, "tipo": "ambos", "picto": "cantar.png"},
        {"id": 21, "tipo": "ambos", "picto": "morder.png"},
        {"id": 22, "tipo": "ambos", "picto": "chupar.png"},
        {"id": 23, "tipo": "ambos", "picto": "andar.png"},
        {"id": 24, "tipo": "ambos", "picto": "hacer.png"},
        {"id": 25, "tipo": "ambos", "picto": "parar.png"},
        {"id": 26, "tipo": "ambos", "picto": "tener.png"},
        {"id": 27, "tipo": "ambos", "picto": "chillar.png"},
        {"id": 28, "tipo": "ambos", "picto": "silbar.png"},
        {"id": 29, "tipo": "ambos", "picto": "ver.png"},
        {"id": 30, "tipo": "ambos", "picto": "dormir.png"},
        {"id": 31, "tipo": "ambos", "picto": "ir.png"},
        {"id": 32, "tipo": "ambos", "picto": "subir.png"},
        {"id": 33, "tipo": "ambos", "picto": "bajar.png"},
        {"id": 34, "tipo": "ambos", "picto": "ser.png"},    
        {"id": 35, "tipo": "ambos", "picto": "estar.png"},
        {"id": 36, "tipo": "animal", "picto": "balar.png"},
        {"id": 37, "tipo": "animal", "picto": "ladrar.png"},
        {"id": 38, "tipo": "animal", "picto": "maullar.png"},
        {"id": 39, "tipo": "animal", "picto": "volar.png"},
        {"id": 40, "tipo": "animal", "picto": "picar.png"},
        {"id": 41, "tipo": "animal", "picto": "croar.png"},
        {"id": 42, "tipo": "animal", "picto": "mugir.png"},
        {"id": 43, "tipo": "animal", "picto": "relinchar.png"},
        {"id": 44, "tipo": "animal", "picto": "rugir.png"},
        {"id": 45, "tipo": "animal", "picto": "cacarear.png"},   
        {"id": 46, "tipo": "cosa", "picto": "ser.png"},    
        {"id": 47, "tipo": "cosa", "picto": "estar.png"},
        {"id": 48, "tipo": "cosa", "picto": "tener.png"}
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
        {"id": 2, "tipo": "adjetivo", "picto": "mucha.png"},    
        {"id": 3, "tipo": "adjetivo", "picto": "poco.png"},
        {"id": 4, "tipo": "adjetivo", "picto": "poca.png"},
        {"id": 6, "tipo": "adjetivo", "picto": "grande.png"},
        {"id": 7, "tipo": "adjetivo", "picto": "pequeno.png"},
        {"id": 8, "tipo": "adjetivo", "picto": "pequena.png"},
        {"id": 9, "tipo": "adjetivo", "picto": "blanco.png"},
        {"id": 10, "tipo": "adjetivo", "picto": "blanca.png"},
        {"id": 11, "tipo": "adjetivo", "picto": "rojo.png"},
        {"id": 12, "tipo": "adjetivo", "picto": "roja.png"},
        {"id": 13, "tipo": "adjetivo", "picto": "amarillo.png"},
        {"id": 14, "tipo": "adjetivo", "picto": "amarilla.png"},
        {"id": 15, "tipo": "adjetivo", "picto": "verde.png"},
        {"id": 16, "tipo": "adjetivo", "picto": "azul.png"},
        {"id": 17, "tipo": "adjetivo", "picto": "marron.png"},
        {"id": 18, "tipo": "adjetivo", "picto": "gris.png"},
        {"id": 19, "tipo": "adjetivo", "picto": "negro.png"},
        {"id": 20, "tipo": "adjetivo", "picto": "negra.png"},
        {"id": 21, "tipo": "adjetivo", "picto": "rosa.png"},
        {"id": 22, "tipo": "adjetivo", "picto": "naranja.png"},
        {"id": 23, "tipo": "adjetivo", "picto": "violeta.png"},
        {"id": 24, "tipo": "adjetivo", "picto": "fuerte.png"},
        {"id": 25, "tipo": "adjetivo", "picto": "suave.png"},
        {"id": 26, "tipo": "adjetivo", "picto": "alto.png"},
        {"id": 27, "tipo": "adjetivo", "picto": "alta.png"},
        {"id": 28, "tipo": "adjetivo", "picto": "bajo.png"},
        {"id": 29, "tipo": "adjetivo", "picto": "baja.png"},
        {"id": 30, "tipo": "adjetivo", "picto": "ancho.png"},
        {"id": 31, "tipo": "adjetivo", "picto": "ancha.png"},
        {"id": 32, "tipo": "adjetivo", "picto": "estrecho.png"},
        {"id": 33, "tipo": "adjetivo", "picto": "estrecha.png"},
        {"id": 34, "tipo": "adjetivo", "picto": "largo.png"},
        {"id": 35, "tipo": "adjetivo", "picto": "larga.png"},
        {"id": 36, "tipo": "adjetivo", "picto": "corto.png"},
        {"id": 37, "tipo": "adjetivo", "picto": "corta.png"},
        {"id": 38, "tipo": "adjetivo", "picto": "cuadrado.png"},
        {"id": 39, "tipo": "adjetivo", "picto": "cuadrada.png"},
        {"id": 40, "tipo": "adjetivo", "picto": "redondo.png"},
        {"id": 41, "tipo": "adjetivo", "picto": "redonda.png"},
        {"id": 42, "tipo": "adjetivo", "picto": "sucio.png"},
        {"id": 43, "tipo": "adjetivo", "picto": "sucia.png"},
        {"id": 44, "tipo": "adjetivo", "picto": "limpio.png"},
        {"id": 45, "tipo": "adjetivo", "picto": "limpia.png"},
        {"id": 46, "tipo": "adjetivo", "picto": "delgado.png"},
        {"id": 47, "tipo": "adjetivo", "picto": "delgada.png"},
        {"id": 48, "tipo": "adjetivo", "picto": "sentado.png"},
        {"id": 49, "tipo": "adjetivo", "picto": "sentada.png"},
        {"id": 50, "tipo": "adjetivo", "picto": "de-pie.png"},
        {"id": 51, "tipo": "adjetivo", "picto": "abierto.png"},
        {"id": 52, "tipo": "adjetivo", "picto": "abierta.png"},
        {"id": 53, "tipo": "adjetivo", "picto": "cerrado.png"},
        {"id": 54, "tipo": "adjetivo", "picto": "cerrada.png"},
        {"id": 55, "tipo": "adjetivo", "picto": "bueno.png"},
        {"id": 56, "tipo": "adjetivo", "picto": "buena.png"},
        {"id": 57, "tipo": "adjetivo", "picto": "salvaje.png"},
        {"id": 58, "tipo": "adjetivo", "picto": "aburrido.png"},
        {"id": 59, "tipo": "adjetivo", "picto": "aburrida.png"},
        {"id": 60, "tipo": "adjetivo", "picto": "alegre.png"},
        {"id": 61, "tipo": "adjetivo", "picto": "contento.png"},
        {"id": 62, "tipo": "adjetivo", "picto": "contenta.png"},
        {"id": 63, "tipo": "adjetivo", "picto": "enfadado.png"},
        {"id": 64, "tipo": "adjetivo", "picto": "enfadada.png"},
        {"id": 65, "tipo": "adjetivo", "picto": "feliz.png"},
        {"id": 66, "tipo": "adjetivo", "picto": "caliente.png"},
        {"id": 67, "tipo": "adjetivo", "picto": "frio.png"},
        {"id": 68, "tipo": "adjetivo", "picto": "bien.png"},
        {"id": 69, "tipo": "adjetivo", "picto": "muy.png"},   
        {"id": 70, "tipo": "sustantivo", "picto": "fruta.png"},
        {"id": 71, "tipo": "sustantivo", "picto": "verdura.png"},
        {"id": 72, "tipo": "sustantivo", "picto": "carne.png"},
        {"id": 73, "tipo": "sustantivo", "picto": "pescado.png"},    
        {"id": 74, "tipo": "sustantivo", "picto": "leche.png"},
        {"id": 75, "tipo": "sustantivo", "picto": "agua.png"},
        {"id": 76, "tipo": "sustantivo", "picto": "zumo.png"},
        {"id": 77, "tipo": "sustantivo", "picto": "pan.png"},
        {"id": 78, "tipo": "sustantivo", "picto": "mantequilla.png"},
        {"id": 79, "tipo": "sustantivo", "picto": "vino.png"},
        {"id": 80, "tipo": "sustantivo", "picto": "cerveza.png"},
        {"id": 81, "tipo": "sustantivo", "picto": "refresco.png"},
        {"id": 82, "tipo": "sustantivo", "picto": "frutos-secos.png"},
        {"id": 83, "tipo": "sustantivo", "picto": "madera.png"},
        {"id": 84, "tipo": "sustantivo", "picto": "plastico.png"},
        {"id": 85, "tipo": "sustantivo", "picto": "tela.png"},
        {"id": 86, "tipo": "sustantivo", "picto": "ropa.png"},
        {"id": 87, "tipo": "sustantivo", "picto": "campo.png"},
        {"id": 88, "tipo": "sustantivo", "picto": "acera.png"},
        {"id": 89, "tipo": "sustantivo", "picto": "carretera.png"},
        {"id": 90, "tipo": "sustantivo", "picto": "playa.png"},
        {"id": 91, "tipo": "sustantivo", "picto": "mar.png"},
        {"id": 92, "tipo": "sustantivo", "picto": "cielo.png"},
        {"id": 93, "tipo": "sustantivo", "picto": "montana.png"},
        {"id": 94, "tipo": "sustantivo", "picto": "lunes.png"},
        {"id": 95, "tipo": "sustantivo", "picto": "martes.png"},
        {"id": 96, "tipo": "sustantivo", "picto": "miercoles.png"},
        {"id": 97, "tipo": "sustantivo", "picto": "jueves.png"},
        {"id": 98, "tipo": "sustantivo", "picto": "viernes.png"},
        {"id": 99, "tipo": "sustantivo", "picto": "sabado.png"},
        {"id": 100, "tipo": "sustantivo", "picto": "domingo.png"},
        {"id": 101, "tipo": "sustantivo", "picto": "dia.png"},
        {"id": 102, "tipo": "sustantivo", "picto": "semana.png"},
        {"id": 103, "tipo": "sustantivo", "picto": "mes.png"},
        {"id": 104, "tipo": "sustantivo", "picto": "ano.png"},
        {"id": 105, "tipo": "sustantivo", "picto": "anos.png"},   
        {"id": 106, "tipo": "sustantivo", "picto": "fuego.png"},
        {"id": 107, "tipo": "sustantivo", "picto": "mesa.png"},
        {"id": 108, "tipo": "sustantivo", "picto": "silla.png"},
        {"id": 109, "tipo": "sustantivo", "picto": "ventana.png"},
        {"id": 110, "tipo": "sustantivo", "picto": "coche.png"}, 
        {"id": 111, "tipo": "sustantivo", "picto": "bici.png"}, 
        {"id": 112, "tipo": "sustantivo", "picto": "moto.png"}, 
        {"id": 113, "tipo": "sustantivo", "picto": "avion.png"}, 
        {"id": 114, "tipo": "sustantivo", "picto": "tren.png"}, 
        {"id": 115, "tipo": "sustantivo", "picto": "barco.png"},
        {"id": 116, "tipo": "sustantivo", "picto": "camion.png"},
        {"id": 117, "tipo": "sustantivo", "picto": "futbol.png"},
        {"id": 118, "tipo": "sustantivo", "picto": "baloncesto.png"},
        {"id": 119, "tipo": "nexo", "picto": "el.png"},
        {"id": 120, "tipo": "nexo", "picto": "la.png"},
        {"id": 121, "tipo": "nexo", "picto": "los.png"},
        {"id": 122, "tipo": "nexo", "picto": "las.png"},
        {"id": 123, "tipo": "nexo", "picto": "un.png"},
        {"id": 124, "tipo": "nexo", "picto": "una.png"},
        {"id": 125, "tipo": "nexo", "picto": "unos.png"},
        {"id": 126, "tipo": "nexo", "picto": "unas.png"},
        {"id": 127, "tipo": "nexo", "picto": "en.png"},
        {"id": 128, "tipo": "nexo", "picto": "de.png"},
        {"id": 129, "tipo": "nexo", "picto": "a.png"},
        {"id": 130, "tipo": "nexo", "picto": "con.png"},
        {"id": 131, "tipo": "nexo", "picto": "del.png"},
        {"id": 132, "tipo": "nexo", "picto": "al.png"},
        {"id": 133, "tipo": "nexo", "picto": "por.png"},
        {"id": 134, "tipo": "nexo", "picto": "entre.png"},
        {"id": 135, "tipo": "nexo", "picto": "para.png"},
        {"id": 136, "tipo": "nexo", "picto": "sobre.png"},
        {"id": 137, "tipo": "nexo", "picto": "y.png"}   
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
    
    //insertar datos de Verbos
    var insertarDatosV = function (tx, verbos) {

        var verbos = [
        {"id": 1, "verbo": "llorar", "yo": "lloro", "tu": "lloras", "el": "llora", "ella": "llora", "nosotros": "lloramos", "vosotros": "lloráis", "ellos": "lloran", "ellas": "lloran"},
        {"id": 2, "verbo": "reir", "yo": "rio", "tu": "ries", "el": "ríe", "ella": "ríe", "nosotros": "reimos", "vosotros": "reis", "ellos": "rien", "ellas": "rien"},
        {"id": 3, "verbo": "cortar", "yo": "corto", "tu": "cortas", "el": "corta", "ella": "corta", "nosotros": "cortamos", "vosotros": "cortáis", "ellos": "cortan", "ellas": "cortan"},
        {"id": 4, "verbo": "escribir", "yo": "escribo", "tu": "escribes", "el": "escribe", "ella": "escribe", "nosotros": "escribimos", "vosotros": "escribis", "ellos": "escriben", "ellas": "escriben" },
        {"id": 5, "verbo": "leer", "yo": "leo", "tu": "lees", "el": "lee", "ella": "lee", "nosotros": "leemos", "vosotros": "leéis", "ellos": "leen", "ellas": "leen"},
        {"id": 6, "verbo": "cocinar", "yo": "cocino", "tu": "cocinas", "el": "cocina", "ella": "cocina", "nosotros": "cocinamos", "vosotros": "cocináis", "ellos": "cocinan", "ellas": "cocinan"},
        {"id": 7, "verbo": "besar", "yo": "beso", "tu": "besas", "el": "besaa", "ella": "besa", "nosotros": "besamos", "vosotros": "besáis", "ellos": "besan", "ellas": "besan"},
        {"id": 8, "verbo": "apagar", "yo": "apago", "tu": "apagas", "el": "apaga", "ella": "apaga", "nosotros": "apagamos", "vosotros": "apagáis", "ellos": "apagan", "ellas": "apagan"},
        {"id": 9, "verbo": "conducir", "yo": "conduzco", "tu": "conduces", "el": "conduce", "ella": "conduce", "nosotros": "conducimos", "vosotros": "conducis", "ellos": "conducen", "ellas": "conducen"},
        {"id": 10, "verbo": "gritar", "yo": "grito", "tu": "gritas", "el": "grita", "ella": "grita", "nosotros": "gritamos", "vosotros": "gritáis", "ellos": "gritan", "ellas": "gritan"},
        {"id": 11, "verbo": "encender", "yo": "enciendo", "tu": "enciendes", "el": "enciende", "ella": "enciende", "nosotros": "encendemos", "vosotros": "encendéis", "ellos": "encienden", "ellas": "encienden"},
        {"id": 12, "verbo": "limpiar", "yo": "limpio", "tu": "limpias", "el": "limpia", "ella": "limpia", "nosotros": "limpiamos", "vosotros": "limpiáis", "ellos": "limpian", "ellas": "limpian"},
        {"id": 13, "verbo": "lavar", "yo": "lavo", "tu": "lavas", "el": "lavaa", "ella": "lava", "nosotros": "lavamos", "vosotros": "laváis", "ellos": "lavan", "ellas": "lavan"},
        {"id": 14, "verbo": "viajar", "yo": "viajo", "tu": "viajas", "el": "viaja", "ella": "viaja", "nosotros": "viajamos", "vosotros": "viajáis", "ellos": "viajan", "ellas": "viajan"},
        {"id": 15, "verbo": "apagar fuego", "yo": "apago", "tu": "apagas", "el": "apaga", "ella": "apaga", "nosotros": "apagamos", "vosotros": "apagáis", "ellos": "apagan", "ellas": "apagan"},   
        {"id": 16, "verbo": "comer", "yo": "como", "tu": "comes", "el": "come", "ella": "come", "nosotros": "comemos", "vosotros": "coméis", "ellos": "comen", "ellas": "comen"},
        {"id": 17, "verbo": "beber", "yo": "bebo", "tu": "bebes", "el": "bebe", "ella": "bebe", "nosotros": "bebemos", "vosotros": "bebéis", "ellos": "beben", "ellas": "beben"},
        {"id": 18, "verbo": "correr", "yo": "corre", "tu": "corres", "el": "corre", "ella": "corre", "nosotros": "corremos", "vosotros": "correis", "ellos": "corren", "ellas": "corren"},
        {"id": 19, "verbo": "saltar", "yo": "salto", "tu": "saltas", "el": "salta", "ella": "salta", "nosotros": "saltamos", "vosotros": "saltáis", "ellos": "saltan", "ellas": "saltan"},
        {"id": 20, "verbo": "cantar", "yo": "canto", "tu": "cantas", "el": "canta", "ella": "canta", "nosotros": "cantamos", "vosotros": "cantáis", "ellos": "cantan", "ellas": "cantan"},
        {"id": 21, "verbo": "morder", "yo": "muerdo", "tu": "muerdes", "el": "muerde", "ella": "muerde", "nosotros": "mordemos", "vosotros": "mordéis", "ellos": "muerden", "ellas": "muerden"},
        {"id": 22, "verbo": "chupar", "yo": "chupo", "tu": "chupas", "el": "chupa", "ella": "chupa", "nosotros": "chupamos", "vosotros": "chupáis", "ellos": "chupan", "ellas": "chupan"},
        {"id": 23, "verbo": "andar", "yo": "ando", "tu": "andaas", "el": "anda", "ella": "anda", "nosotros": "andamos", "vosotros": "andáis", "ellos": "andan", "ellas": "andan"},
        {"id": 24, "verbo": "hacer", "yo": "hago", "tu": "haces", "el": "hace", "ella": "hace", "nosotros": "hacemos", "vosotros": "hacéis", "ellos": "hacen", "ellas": "hacen"},
        {"id": 25, "verbo": "parar", "yo": "lloro", "tu": "lloras", "el": "llora", "ella": "llora", "nosotros": "lloramos", "vosotros": "lloráis", "ellos": "lloran", "ellas": "lloran"},
        {"id": 26, "verbo": "tener", "yo": "tengo", "tu": "tienes", "el": "tiene", "ella": "tiene", "nosotros": "tenemos", "vosotros": "tenéis", "ellos": "tienen", "ellas": "tienen"},
        {"id": 27, "verbo": "chillar", "yo": "chillo", "tu": "chillas", "el": "chilla", "ella": "chilla", "nosotros": "chillamos", "vosotros": "chilláis", "ellos": "chillan", "ellas": "chillan"},
        {"id": 28, "verbo": "silbar", "yo": "silbo", "tu": "silbas", "el": "silba", "ella": "silba", "nosotros": "silbamos", "vosotros": "silbáis", "ellos": "silban", "ellas": "silban"},
        {"id": 29, "verbo": "ver", "yo": "veo", "tu": "ves", "el": "ve", "ella": "ve", "nosotros": "vemos", "vosotros": "veis", "ellos": "ven", "ellas": "ven"},
        {"id": 30, "verbo": "dormir", "yo": "duermo", "tu": "duermes", "el": "duerme", "ella": "duerme", "nosotros": "dormimos", "vosotros": "dormis", "ellos": "duermen", "ellas": "duermen"},
        {"id": 31, "verbo": "ir", "yo": "voy", "tu": "vas", "el": "va", "ella": "va", "nosotros": "vamos", "vosotros": "vais", "ellos": "van", "ellas": "van"},
        {"id": 32, "verbo": "subir", "yo": "subo", "tu": "subes", "el": "sube", "ella": "sube", "nosotros": "subimos", "vosotros": "subis", "ellos": "suben", "ellas": "suben"},
        {"id": 33, "verbo": "bajar", "yo": "bajo", "tu": "bajas", "el": "baja", "ella": "baja", "nosotros": "bajamos", "vosotros": "bajáis", "ellos": "bajan", "ellas": "bajan"},
        {"id": 34, "verbo": "ser", "yo": "soy", "tu": "eres", "el": "es", "ella": "es", "nosotros": "somos", "vosotros": "sois", "ellos": "son", "ellas": "son"},    
        {"id": 35, "verbo": "estar", "yo": "estoy", "tu": "estás", "el": "está", "ella": "está", "nosotros": "estamos", "vosotros": "estáis", "ellos": "están", "ellas": "están"},
        {"id": 36, "verbo": "balar", "yo": "balo", "tu": "balas", "el": "bala", "ella": "bala", "nosotros": "balamos", "vosotros": "baláis", "ellos": "balan", "ellas": "balan"},
        {"id": 37, "verbo": "ladrar", "yo": "ladro", "tu": "ladras", "el": "ladra", "ella": "ladra", "nosotros": "ladramos", "vosotros": "ladráis", "ellos": "ladran", "ellas": "ladran"},
        {"id": 38, "verbo": "maullar", "yo": "maullo", "tu": "maullas", "el": "maulla", "ella": "maulla", "nosotros": "maullamos", "vosotros": "maulláis", "ellos": "maullan", "ellas": "maullan"},
        {"id": 39, "verbo": "volar", "yo": "vuelo", "tu": "vuelas", "el": "vuela", "ella": "vuela", "nosotros": "volamos", "vosotros": "voláis", "ellos": "vuelan", "ellas": "vuelan"},
        {"id": 40, "verbo": "picar", "yo": "pico", "tu": "picas", "el": "pica", "ella": "pica", "nosotros": "picamos", "vosotros": "picáis", "ellos": "pican", "ellas": "pican"},
        {"id": 41, "verbo": "croar", "yo": "croo", "tu": "croas", "el": "croa", "ella": "croa", "nosotros": "croamos", "vosotros": "croáis", "ellos": "croan", "ellas": "croan"},
        {"id": 42, "verbo": "mugir", "yo": "mujo", "tu": "muges", "el": "muge", "ella": "muge", "nosotros": "mugimos", "vosotros": "mugis", "ellos": "mugen", "ellas": "mugen"},
        {"id": 43, "verbo": "relinchar", "yo": "relincho", "tu": "relinchas", "el": "relincha", "ella": "relincha", "nosotros": "relinchamos", "vosotros": "relincháis", "ellos": "relinchan", "ellas": "relinchan"},
        {"id": 44, "verbo": "rugir", "yo": "rujo", "tu": "ruges", "el": "ruge", "ella": "ruge", "nosotros": "rugimos", "vosotros": "rugis", "ellos": "rugen", "ellas": "rugen"},
        {"id": 45, "verbo": "cacarear", "yo": "cacareo", "tu": "cacareas", "el": "cacarea", "ella": "cacarea", "nosotros": "cacareamos", "vosotros": "cacareáis", "ellos": "cacarean", "ellas": "cacarean"}  
        
    ];

        var l = verbos.length;
        var sql = "INSERT OR REPLACE INTO verbos " +
            "(id, verbo, yo, tu, el, ella, nosotros, vosotros, ellos, ellas) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = verbos[i];
            tx.executeSql(sql, [e.id, e.verbo, e.yo, e.tu, e.el, e.ella, e.nosotros, e.vosotros, e.ellos, e.ellas],
                function () {
                    console.log('INSERT verbos OK');
                },
                function (tx, error) {
                    alert('INSERT verbos error: ' + error.message);
                });
        }
    } // fin insertar verbos
    
} // fin websql-adapter
