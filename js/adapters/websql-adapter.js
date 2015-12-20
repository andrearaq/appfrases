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
        console.log("numero frase: "+idf);
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, texto FROM frases WHERE nivel=? ORDER BY id";
                tx.executeSql(sql, [niv], function (tx, results) {
                    var len = results.rows.length,
                        frases = [],
                        i = 0;
                    for (; i < len; i++) {
                        frases[i] = results.rows.item(i);
                        var palabras = frases[i].texto.split(' ');
                        console.log("palabras frase "+frases[i].id+" "+palabras);
                        console.log("primera palabra: "+palabras[0]);
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
    
    // encontrar datos para inventar
    this.encontrarDatos = function () {
        var deferred = $.Deferred();
        this.db.transaction(
            function (tx) {
                var sql="";
              //  sql = "SELECT id, texto FROM frases WHERE id=?";
                sql = "SELECT id, texto FROM frases";
                tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length,
                        frases = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        frases[i] = results.rows.item(i);
                    }                    
                    deferred.resolve(frases);
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
    
    //crear tabla Nexos
    var crearTablaN = function (tx) {
        tx.executeSql('DROP TABLE IF EXISTS nexos');
        var sql = "CREATE TABLE IF NOT EXISTS nexos ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +    
            "tipo VARCHAR(20), "+
            "picto VARCHAR(30))";
        tx.executeSql(sql, null,
            function () {
                console.log('Crear tabla nexos OK');
            },
            function (tx, error) {
                alert('Crear tabla error: ' + error.message);
            });
    }
   
    //insertar datos de Frases
    var insertarDatosF = function (tx, frases) {

        var frases = [
        {"id": 1, "texto": "Yo tengo frío", "nivel": 1},
        {"id": 2, "texto": "El perro corre", "nivel": 1},
        {"id": 3, "texto": "Mamá me besa", "nivel": 1},
        {"id": 4, "texto": "Yo soy alta", "nivel": 1},
        {"id": 5, "texto": "Tú comes fruta", "nivel": 1},
        {"id": 6, "texto": "Papá es alto", "nivel": 1},
        {"id": 7, "texto": "Yo tengo frío", "nivel": 1},
        {"id": 8, "texto": "El niño juega", "nivel": 1},
        {"id": 9, "texto": "Yo tengo hambre", "nivel": 1},
        {"id": 10, "texto": "Hoy es lunes", "nivel": 1},
        {"id": 11, "texto": "La niña llora", "nivel": 1},
        {"id": 12, "texto": "Mañana es viernes", "nivel": 1},
        {"id": 13, "texto": "El perro hace caca", "nivel": 2},
        {"id": 14, "texto": "El niño come verdura", "nivel": 2},
        {"id": 15, "texto": "Mi hermano es alto", "nivel": 2},
        {"id": 16, "texto": "El gato tiene bigotes", "nivel": 2},
        {"id": 17, "texto": "El colegio es grande", "nivel": 2},
        {"id": 18, "texto": "La sopa está caliente", "nivel": 2},
        {"id": 19, "texto": "La silla está rota", "nivel": 2},
        {"id": 20, "texto": "Mi hermana es delgada", "nivel": 2},
        {"id": 21, "texto": "El hielo es frío", "nivel": 2},
        {"id": 22, "texto": "Tu abuela es guapa", "nivel": 2},
        {"id": 23, "texto": "El mar es azul", "nivel": 2},
        {"id": 24, "texto": "Mi prima hace gimnasia", "nivel": 2},
        {"id": 25, "texto": "Mi mamá hace la comida", "nivel": 3},
        {"id": 26, "texto": "Yo duermo en la cama", "nivel": 3},
        {"id": 27, "texto": "La mesa roja es cuadrada", "nivel": 3},
        {"id": 28, "texto": "Ella juega bien al futbol", "nivel": 3},
        {"id": 29, "texto": "Mi abuela come mucha verdura", "nivel": 3},
        {"id": 30, "texto": "Mi colegio es muy grande", "nivel": 3},
        {"id": 31, "texto": "El bombero apaga el fuego", "nivel": 3},
        {"id": 32, "texto": "Una niña bebe mucha agua", "nivel": 3},
        {"id": 33, "texto": "Las niñas juegan y rien", "nivel": 3},
        {"id": 34, "texto": "El coche es de juguete", "nivel": 3},
        {"id": 35, "texto": "En el campo hay flores", "nivel": 3},
        {"id": 36, "texto": "Hoy meriendo pan con mantequilla", "nivel": 3},
        {"id": 37, "texto": "El perro negro salta y corre", "nivel": 4},
        {"id": 38, "texto": "El niño alto juega al baloncesto", "nivel": 4},
        {"id": 39, "texto": "La niña lleva un vestido azul", "nivel": 4},
        {"id": 40, "texto": "La gallina pone huevos y cacarea", "nivel": 4},
        {"id": 41, "texto": "Mi hermano desayuna leche y galletas", "nivel": 4},
        {"id": 42, "texto": "Me gusta mucho jugar al fútbol", "nivel": 4},
        {"id": 43, "texto": "La ventana de cristal está rota", "nivel": 4},
        {"id": 44, "texto": "Los viernes voy a la piscina", "nivel": 4},
        {"id": 45, "texto": "Ayer bebí dos zumos de piña", "nivel": 4},
        {"id": 46, "texto": "El elefante tiene una trompa larga", "nivel": 4},
        {"id": 47, "texto": "Voy a la playa en agosto", "nivel": 4},
        {"id": 48, "texto": "Mi dibujo de estrellas está roto", "nivel": 4}
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
        {"id": 1, "tipo": "persona", "picto": "yo.png"},
        {"id": 2, "tipo": "persona", "picto": "tú.png"},
        {"id": 3, "tipo": "persona", "picto": "él.png"},
        {"id": 4, "tipo": "persona", "picto": "ella.png"},
        {"id": 5, "tipo": "persona", "picto": "nosotros.png"},
        {"id": 6, "tipo": "persona", "picto": "vosotros.png"},
        {"id": 7, "tipo": "persona", "picto": "ellos.png"},
        {"id": 8, "tipo": "persona", "picto": "ellas.png"},
        {"id": 9, "tipo": "persona", "picto": "niño.png"},
        {"id": 10, "tipo": "persona", "picto": "niña.png"},
        {"id": 11, "tipo": "persona", "picto": "abuela.png"},
        {"id": 12, "tipo": "persona", "picto": "abuelo.png"},
        {"id": 13, "tipo": "persona", "picto": "tío.png"},
        {"id": 14, "tipo": "persona", "picto": "tía.png"},
        {"id": 15, "tipo": "persona", "picto": "mamá.png"},
        {"id": 16, "tipo": "persona", "picto": "papá.png"},
        {"id": 17, "tipo": "persona", "picto": "hermano.png"},
        {"id": 18, "tipo": "persona", "picto": "hermana.png"},
        {"id": 19, "tipo": "persona", "picto": "primo.png"},
        {"id": 20, "tipo": "persona", "picto": "prima.png"},
        {"id": 21, "tipo": "persona", "picto": "profesor.png"},
        {"id": 22, "tipo": "persona", "picto": "profesora.png"},
        {"id": 23, "tipo": "persona", "picto": "cocinero.png"},
        {"id": 24, "tipo": "persona", "picto": "cocinera.png"},
        {"id": 25, "tipo": "persona", "picto": "bombero.png"},
        {"id": 26, "tipo": "persona", "picto": "policía.png"},
        {"id": 27, "tipo": "persona", "picto": "conductor.png"},
        {"id": 28, "tipo": "persona", "picto": "conductora.png"},
        {"id": 29, "tipo": "animal", "picto": "perro.png"},
        {"id": 30, "tipo": "animal", "picto": "gato.png"},
        {"id": 31, "tipo": "animal", "picto": "paloma.png"},
        {"id": 32, "tipo": "animal", "picto": "mosca.png"},
        {"id": 33, "tipo": "animal", "picto": "mosquito.png"},
        {"id": 34, "tipo": "animal", "picto": "araña.png"},
        {"id": 35, "tipo": "animal", "picto": "gallina.png"},
        {"id": 36, "tipo": "animal", "picto": "gallo.png"},
        {"id": 37, "tipo": "animal", "picto": "pato.png"},
        {"id": 38, "tipo": "animal", "picto": "pata.png"},
        {"id": 39, "tipo": "animal", "picto": "cisne.png"},
        {"id": 40, "tipo": "animal", "picto": "vaca.png"},
        {"id": 41, "tipo": "animal", "picto": "toro.png"},
        {"id": 42, "tipo": "animal", "picto": "oveja.png"},
        {"id": 43, "tipo": "animal", "picto": "cordero.png"},
        {"id": 44, "tipo": "animal", "picto": "caballo.png"},
        {"id": 45, "tipo": "animal", "picto": "yegua.png"},
        {"id": 46, "tipo": "animal", "picto": "canguro.png"},
        {"id": 47, "tipo": "animal", "picto": "serpiente.png"},
        {"id": 48, "tipo": "animal", "picto": "rana.png"},
        {"id": 49, "tipo": "animal", "picto": "ratón.png"},
        {"id": 50, "tipo": "animal", "picto": "rata.png"},
        {"id": 51, "tipo": "animal", "picto": "elefante.png"},
        {"id": 52, "tipo": "animal", "picto": "jirafa.png"},
        {"id": 53, "tipo": "animal", "picto": "león.png"},
        {"id": 54, "tipo": "animal", "picto": "leona.png"},
        {"id": 55, "tipo": "animal", "picto": "tigre.png"},
        {"id": 56, "tipo": "cosa", "picto": "mesa.png"},    
        {"id": 57, "tipo": "cosa", "picto": "silla.png"}, 
        {"id": 58, "tipo": "cosa", "picto": "pizarra.png"}, 
        {"id": 59, "tipo": "cosa", "picto": "lapiz.png"}, 
        {"id": 60, "tipo": "cosa", "picto": "goma.png"}, 
        {"id": 61, "tipo": "cosa", "picto": "boligrafo.png"}, 
        {"id": 62, "tipo": "cosa", "picto": "pintura.png"}, 
        {"id": 63, "tipo": "cosa", "picto": "mueble.png"}, 
        {"id": 64, "tipo": "cosa", "picto": "cama.png"}, 
        {"id": 65, "tipo": "cosa", "picto": "almohada.png"}, 
        {"id": 66, "tipo": "cosa", "picto": "cocina.png"}, 
        {"id": 67, "tipo": "cosa", "picto": "baño.png"}, 
        {"id": 68, "tipo": "cosa", "picto": "ducha.png"}, 
        {"id": 69, "tipo": "cosa", "picto": "salón.png"}, 
        {"id": 70, "tipo": "cosa", "picto": "sofá.png"}, 
        {"id": 71, "tipo": "cosa", "picto": "dormitorio.png"}, 
        {"id": 72, "tipo": "cosa", "picto": "juguete.png"}, 
        {"id": 73, "tipo": "cosa", "picto": "muñeca.png"}, 
        {"id": 74, "tipo": "cosa", "picto": "coche.png"}, 
        {"id": 75, "tipo": "cosa", "picto": "bicicleta.png"}, 
        {"id": 76, "tipo": "cosa", "picto": "moto.png"}, 
        {"id": 77, "tipo": "cosa", "picto": "avión.png"}, 
        {"id": 78, "tipo": "cosa", "picto": "tren.png"}, 
        {"id": 79, "tipo": "cosa", "picto": "barco.png"}, 
        {"id": 80, "tipo": "cosa", "picto": "falda.png"}, 
        {"id": 81, "tipo": "cosa", "picto": "blusa.png"}, 
        {"id": 82, "tipo": "cosa", "picto": "pantalón.png"},
        {"id": 83, "tipo": "cosa", "picto": "zapatos.png"},
        {"id": 84, "tipo": "cosa", "picto": "jersey.png"},
        {"id": 85, "tipo": "cosa", "picto": "bufanda.png"},
        {"id": 86, "tipo": "cosa", "picto": "gorro.png"},
        {"id": 87, "tipo": "cosa", "picto": "chaqueta.png"},
        {"id": 88, "tipo": "cosa", "picto": "abrigo.png"},
        {"id": 89, "tipo": "cosa", "picto": "televisión.png"},
        {"id": 90, "tipo": "cosa", "picto": "cielo.png"},
        {"id": 91, "tipo": "cosa", "picto": "mar.png"},
        {"id": 92, "tipo": "cosa", "picto": "luz.png"},
        {"id": 93, "tipo": "cosa", "picto": "fuego.png"}
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
        {"id": 25, "tipo": "ambos", "picto": "manchar.png"},
        {"id": 26, "tipo": "ambos", "picto": "ver.png"},
        {"id": 27, "tipo": "ambos", "picto": "dormir.png"},
        {"id": 28, "tipo": "ambos", "picto": "ir.png"},
        {"id": 29, "tipo": "ambos", "picto": "subir.png"},
        {"id": 30, "tipo": "ambos", "picto": "bajar.png"},
        {"id": 31, "tipo": "animal", "picto": "trotar.png"},
        {"id": 32, "tipo": "animal", "picto": "ladrar.png"},
        {"id": 33, "tipo": "animal", "picto": "maullar.png"},
        {"id": 34, "tipo": "animal", "picto": "volar.png"},
        {"id": 35, "tipo": "animal", "picto": "picar.png"},
        {"id": 36, "tipo": "animal", "picto": "croar.png"},
        {"id": 37, "tipo": "animal", "picto": "mugir.png"},
        {"id": 38, "tipo": "animal", "picto": "relinchar.png"},
        {"id": 39, "tipo": "animal", "picto": "rugir.png"},
        {"id": 40, "tipo": "cosa", "picto": "ser.png"},    
        {"id": 41, "tipo": "cosa", "picto": "estar.png"}
            
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
}
