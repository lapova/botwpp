const docx = require('docxtemplater')
const PizZip = require('pizzip')
const sql = require('mssql')
const nodemailer = require('nodemailer')
const { PDFNet } = require("@pdftron/pdfnet-node")
const express = require('express')
const fs = require('fs')
const path = require('path')

async function generarDocLaboral(cedula) {

    await sql.connect('Server=localhost;Database=bot;User Id=lapova;Password=Junio2405;Encrypt=true')

    let datos = await sql.query`select * from usuario where idUsuario = ${cedula}`

    datos = datos.recordset[0]

    setTimeout(() => {
        let fechaActual = new Date()

        const contenido = fs.readFileSync(path.resolve(__dirname, "plantilla.docx"), 'binary')

        const zip = new PizZip(contenido)

        const doc = new docx(zip, { paragraphLoop: true, linebreaks: true })

        doc.render({
            fechaActual: (fechaActual.getDate() + '/' + parseInt(fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear()),
            nombre: datos.nombre,
            cedula: datos.idUsuario,
            antiguedad: datos.fVinculacion,
            cargo: datos.ocupacion,
            tipoContrato: datos.tipoContrato,
            salario: datos.salario
        })

        const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' })

        fs.writeFileSync(path.resolve(__dirname, `${cedula}.docx`), buf)

        PDFNet.initialize('demo:1676293504076:7d260d3d0300000000a827b8198328f6a150e32d0e79eb2a8747990507').then(() => {
            const filename = cedula
            const inputPath = path.resolve(__dirname, `${filename}.docx`)
            const outputPath = path.resolve(__dirname, `${filename}.pdf`)
            const convertToPdf = async () => {
                const pdfdoc = await PDFNet.PDFDoc.create()
                await pdfdoc.initSecurityHandler()
                await PDFNet.Convert.toPdf(pdfdoc, inputPath)
                pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized)
            }
            convertToPdf()
        }).catch(err => {
            res.statusCode = 500
            res.end(err)
        })

        setTimeout(() => {
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'lporras@cesde.edu.co',
                    pass: 'Cesde2022*'
                }
            })

            const mailOptions = {
                from: 'lporras@cesde.edu.co',
                to: datos.correo,
                subject: 'Certificado',
                text: 'Se adjunta el certificado que solicitaste.',
                attachments: [
                    {
                        filename: `${cedula}.pdf`,
                        path: path.resolve(__dirname, `${cedula}.pdf`)
                    }
                ]
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email enviado correctamente.')
                    fs.unlink(path.resolve(__dirname, `${cedula}.docx`), (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    fs.unlink(path.resolve(__dirname, `${cedula}.pdf`), (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        }, 5000);

    }, 3000);
}

async function generarDocNomina(cedula) {
    let fecha = new Date();
    let nombre;
    let ocupacion;
    var tSueldo;
    let fechaVin;
    let datos

    // const config = {
    //     user: "lapova",
    //     password: "Junio2405",
    //     server: "chatbotsv.database.windows.net",
    //     database: "bot",
    //     options: {
    //         trustedConnection: true
    //     }
    // };

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
    
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }

        var request = new sql.Request();

        request.query(`select * from usuario where idUsuario = ${cedula}`, function (err, recordSet) {
            if (err) {
                console.log(err);
            } else {
                console.log("Conexión correcta a la bd");
                console.log(recordSet);
                
                recordSet.recordset.forEach(dato => {
                    datos = dato
                    cedula = dato.idUsuario;
                    nombre = dato.nombre;
                    ocupacion = dato.ocupacion;
                    tSueldo = dato.salario;
                    fechaVin = dato.fVinculacion;
                });
            }
        });
    });

    const content = fs.readFileSync(
        path.resolve(__dirname, "desprendible_nomina.docx"),
        "binary"
    );
    const zip = new PizZip(content);
    const doc = new docx(zip, {
        paragraphLoop: true,
        linebreaks: true
    });

    setTimeout(() => {
        let sueldo = tSueldo / 2;
        let auxTrans = 140000 / 2;
        let salud = sueldo * 0.04;
        let pension = sueldo * 0.04;
        let asignaciones = sueldo + auxTrans;
        let deducciones = salud + pension;
        let saldo = asignaciones - deducciones;

        doc.render({
            Nombre: nombre,
            Cedula: cedula,
            Cargo: ocupacion,
            Salario: tSueldo,
            hoy:
                fecha.getFullYear() +
                "/" +
                parseInt(fecha.getUTCMonth() + 1) +
                "/" +
                fecha.getUTCDate(),
            Sueldo: sueldo,
            auxTrans: auxTrans,
            Salud: salud,
            Pension: pension,
            tAsignaciones: asignaciones,
            tDeduccion: deducciones,
            Saldo: saldo
        });

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE"
        });

        fs.writeFileSync(
            path.resolve(__dirname, `${cedula}.docx`), buf
        )

        PDFNet.initialize('demo:1676293504076:7d260d3d0300000000a827b8198328f6a150e32d0e79eb2a8747990507').then(() => {
            const filename = cedula
            const inputPath = path.resolve(__dirname, `${filename}.docx`)
            const outputPath = path.resolve(__dirname, `${filename}.pdf`)
            const convertToPdf = async () => {
                const pdfdoc = await PDFNet.PDFDoc.create()
                await pdfdoc.initSecurityHandler()
                await PDFNet.Convert.toPdf(pdfdoc, inputPath)
                pdfdoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized)
            }
            convertToPdf()
        }).catch(err => {
            res.statusCode = 500
            res.end(err)
        })


        setTimeout(() => {
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'lporras@cesde.edu.co',
                    pass: 'Cesde2022*'
                }
            })

            const mailOptions = {
                from: 'lporras@cesde.edu.co',
                to: datos.correo,
                subject: 'Certificado',
                text: 'Se te adjunta el certificado que solicitaste.',
                attachments: [
                    {
                        filename: `${cedula}.pdf`,
                        path: path.resolve(__dirname, `${cedula}.pdf`)
                    }
                ]
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email enviado correctamente')
                    fs.unlink(path.resolve(__dirname, `${cedula}.docx`), (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    fs.unlink(path.resolve(__dirname, `${cedula}.pdf`), (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        }, 5000);
    },
        3000)
}

module.exports = {
    generarDocLaboral,
    generarDocNomina
}