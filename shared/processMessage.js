const whatsappModel = require("../shared/whatsappModels");
const whatsappService = require("../services/whatsappService");
const sql = require('mssql');
const { generarDocLaboral, generarDocNomina } = require('../services/docGenerator')
const usuarios = {}

//Configuración para conectarse a bd alojada en azure
// const config = {
//     user: 'laura',
//     password: 'Junio2405',
//     server: 'chatbotsv.database.windows.net',
//     database: 'bot',
//     options: {
//         trustedConnection: true
//     }
// }

//Configuración para conectarse a bd local
const config = {
    server: 'localhost',
    authentication: {
    type: 'default',
    options: {
    userName: 'lapova',
    password: 'Junio2405'
    }
},
    options: {
    database: 'bot',
    trustServerCertificate: true
    }
}

function consulta(number) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();

        //Consulta a la tabla usuario para validar el # documento y darle respuesta en el chat
        request.query(`select * from usuario where numero = ${number}`, function (err, recordSet) {
            if (err) {
                console.log(err)
            } else {
                console.log('Conexión correcta a la bd');
                if(recordSet.recordset.length != 0){
                    if(usuarios[number] == undefined || usuarios[number] == null){
                        usuarios[number] = recordSet.recordset[0]
                    }
                    console.log(usuarios)
                }
            }
        });
    });
}

function insert(parametros) {
    sql.connect(config, function(err){
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();

        //Insertar datos en la tabla gestión 
        request.query(`insert into gestion values ('${parametros.idUsuario}', '${parametros.tipoGestion}')`, function (err, recordSet) {
            if (err) {
                console.log(err)
            } else {
                console.log('Se ha creado el registro');
                console.log(recordSet)
            }
        });
    })
}

function Process(textUser, number) {
    consulta(number)
    textUser = textUser.toLowerCase();
    var models = [];

    //Palabras claves para un saludo
    if (textUser.includes("hola") ||
        textUser.includes("buenos dias") ||
        textUser.includes("buenas tardes") ||
        textUser.includes("holi")) {
        var model = whatsappModel.MessageText("Hola, estoy aquí para ayudarte. 😄\n\n\Por favor indica tu documento sin puntos, ni espacios.", number);
        models.push(model);
    } 
    //Validar cc de usuario
    else if (usuarios[number].idUsuario == textUser) {
        usuarios[number].cedulaIngresada = textUser
        var model = whatsappModel.MessageGestion(number);
        models.push(model);
    }
    //Interacción mediante botones para el tipo de gestión
    else if (textUser.includes('certificado laboral')) {
        opcion = 'certificado laboral'
        var model = whatsappModel.MessageText("Muy bien, la gestión te llegará a tu correo.", number);
        models.push(model);
        insert({ idUsuario: usuarios[number].cedulaIngresada, tipoGestion: opcion})

        setTimeout(() => {
            generarDocLaboral(usuarios[number].cedulaIngresada)
            model = whatsappModel.MessageResolver(number);
            whatsappService.sendMessageWhatsApp(model)
        }, 2000)
        
    }
    else if (textUser.includes('certificado nomina')) {
        opcion = 'certificado nomina'
        var model = whatsappModel.MessageText("Muy bien, la gestión te llegará a tu correo.", number);
        models.push(model);
        insert({ idUsuario: usuarios[number].cedulaIngresada, tipoGestion: opcion})

        setTimeout(() => {
            generarDocNomina(usuarios[number].cedulaIngresada)
            model = whatsappModel.MessageResolver(number);
            whatsappService.sendMessageWhatsApp(model)
        }, 2000)
    }
    //Interacción mediante botones para medio de envío
    // else if (textUser.includes('chat')) {
    //     var model = whatsappModel.MessageDoc(number);
    //     models.push(model);
    //     insert({ idUsuario: iden, tipoGestion: opcion, medio: 'Chat' })

    //     setTimeout(() => {
    //         model = whatsappModel.MessageResolver(number);
    //         whatsappService.sendMessageWhatsApp(model)
    //     }, 2000)
    // }
    //Palabras claves para agradecer/terminar conversación
    else if (textUser.includes('si')) {
        var model = whatsappModel.MessageText("Me alegra haberte podido ayudar, recuerda que estamos disponibles para ti, que estes muy bien.", number);
        models.push(model);
    }
    else if (textUser.includes('😄') ||
        textUser.includes('igualmente') ||
        textUser.includes('feliz dia') ||
        textUser.includes('gracias')) {
        var model = whatsappModel.MessageText("😄", number);
        models.push(model);
    }
    //No se reconocen palabras claves
    else {
        var model = whatsappModel.MessageText("En este caso para resolver tu inquietud por favor contacta al 5555 ext 554, gracias por utilizar este canal.", number);
        models.push(model);
    }
    models.forEach(model => {
        whatsappService.sendMessageWhatsApp(model);
    });
}

module.exports = {
    Process
};