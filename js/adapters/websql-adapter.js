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
    this.encontrarFrasesOrdenar = function (niv) {
        var deferred = $.Deferred();
        localStorage['nivel'] = niv;
        this.db.transaction(
            function (tx) {
                var sql="";
                sql = "SELECT id, texto FROM frases WHERE nivel=? ORDER BY id";
                tx.executeSql(sql, [niv], function (tx, results) {
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
    // encontrar frases para ordenar
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
        {"id": 1, "texto": "El perro hace caca", "nivel": 2},
        {"id": 2, "texto": "El perro salta y corre", "nivel": 3},
        {"id": 3, "texto": "El perro negro salta y corre", "nivel": 4},
        {"id": 4, "texto": "Yo tengo frio", "nivel": 1},
        {"id": 5, "texto": "Yo duermo en la cama", "nivel": 3},
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
