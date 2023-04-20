//Tipo de conexión a mysql 

const mysql = require('mysql');

//configuración bd
var conexion = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'bot', 
    options: {
        trustedConnection: true
    }
});

//conexión bd
conexion.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Conexión correcta con la bd");
    }
});

//consulta para extraer # documento de la tabla usuario
conexion.query('select idUsuario from usuario', function(err,recordSet){
    if(err){
        console.log(err)
    }else{
        console.log(recordSet)
    }
});


//insert en la tabla gestión  
// conexion.query('insert into gestion(idGestion,idUsuario,tipoGestion) values ('idUsuario', 'tipoGestion'), function(err,recordSet){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(recordSet)
//     }
// });

conexion.end();
