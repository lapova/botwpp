# Chatbot Gestión

El aplicativo tiene como finalidad realizar procesos automáticos de flujos de trabajo como: envío de certificados de nómina, laboral o cualquier tipo de documento desde que se tenga una plantilla en formato docx: dentro establecer los datos a reemplazar, se realiza una extracción de datos desde SQL y se modifica la plantilla, luego se convierte el archivo a pdf y por último se envía a un correo, todo esto a través de la plataforma de WhatsApp.

-Requisitos previos En esta sección se explican las herramientas empleadas para el desarrollo del proyecto:

1.Node js, la versión usada para el desarrollo es la 16.14.2 LTS.

2.Editor de código, se empleó Visual Studio Code

3.Base de datos, SQL Server

4.WhatsApp Cloud API para lograr la conexión a WhatsApp.

-Módulos de node implementados para realizar las automatizaciones

• Express: permite estructurar una aplicación de manera ágil, proporciona funcionalidades como el enrutamiento, opciones para gestionar sesiones y cookies, etc.

• Fs: permite interactuar con los archivos del sistema: procesar su creación, lectura, modificación, borrado etc. Toma como primer argumento la ruta relativa del fichero/directorio con el que se quiere interactuar.

• Mssql: permite conectarse a SQL Server y ejecutar operaciones sobre una base de datos.

• Path: permite trabajar con rutas de archivos y directorios.

• Pizzip: permite crear, leer y editar archivos .zip.

• Nodemailer: permite enviar correos electrónicos.

• Docxtemplater: permite generar documentos docx/pptx a partir de una plantilla docx/pptx.

• @pdftron/pdfnet-node: permite convertir un archivo docx a pdf.

-Descarga y configuración del chatbot

Clonar el repositorio en tu pc, instalar Visual Studio Code o el editor de código de tu preferencia, abrir visual studio code y arrastrar la carpeta donde está ubicado el proyecto que acabas de descargar, para poder visualizar los archivos que contiene.

Abrir la terminal desde Visual Studio Code mediante el comando ctrl + shift + ñ y ejecutar el siguiente comando para instalar los módulos correspondientes para el funcionamiento del proyecto:

npm install express fs mssql path pizzip @pdftron/pdfnet-node nodemailer docxtemplater
