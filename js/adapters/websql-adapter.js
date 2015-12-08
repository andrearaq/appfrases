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
   
    //insertar datos de Frases
    var insertarDatosF = function (tx, frases) {

        var frases = [
        {"id": 1, "texto": "Yo tengo frío", "nivel": 1},
        {"id": 2, "texto": "El perro corre", "nivel": 1},
        {"id": 3, "texto": "Mamá me besa", "nivel": 1},
        {"id": 4, "texto": "Yo soy alta", "nivel": 1},
        {"id": 5, "texto": "Yo como fruta", "nivel": 1},
        {"id": 6, "texto": "Papa es alto", "nivel": 1},
        {"id": 7, "texto": "El perro hace caca", "nivel": 2},
        {"id": 8, "texto": "El niño come verdura", "nivel": 2},
        {"id": 9, "texto": "Mi hermano es alto", "nivel": 2},
        {"id": 10, "texto": "El gato tiene bigotes", "nivel": 2},
        {"id": 11, "texto": "El colegio es grande", "nivel": 2},
        {"id": 12, "texto": "El perro hace caca", "nivel": 2},
        {"id": 13, "texto": "Mi mamá hace la comida", "nivel": 3},
        {"id": 14, "texto": "Yo duermo en la cama", "nivel": 3},
        {"id": 15, "texto": "La mesa roja es cuadrada", "nivel": 3},
        {"id": 16, "texto": "Yo duermo en la cama", "nivel": 3},
        {"id": 17, "texto": "Mi abuela come mucha verdura", "nivel": 3},
        {"id": 18, "texto": "Mi colegio es muy grande", "nivel": 3},
        {"id": 19, "texto": "El perro negro salta y corre", "nivel": 4},
        {"id": 20, "texto": "El niño alto juega al baloncesto", "nivel": 4},
        {"id": 21, "texto": "La niña lleva un vestido azul", "nivel": 4},
        {"id": 22, "texto": "La gallina pone huevos y cacarea", "nivel": 4},
        {"id": 23, "texto": "Mi hermano desayuna leche y galletas", "nivel": 4},
        {"id": 24, "texto": "Me gusta mucho jugar al fútbol", "nivel": 4}
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
    }
    
    
}
