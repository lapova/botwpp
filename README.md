# Chatbot Gestión.

El aplicativo tiene como finalidad realizar procesos automáticos de flujos de trabajo como: envío de certificados de nómina, laboral o cualquier tipo de documento desde que se tenga una plantilla en formato docx: dentro establecer los datos a reemplazar, se realiza una extracción de datos desde SQL y se modifica la plantilla, luego se convierte el archivo a pdf y por último se envía a un correo, todo esto a través de la plataforma de WhatsApp.

• Herramientas empleadas para el desarrollo del proyecto:

✔️Node js, la versión usada para el desarrollo es la 16.14.2 LTS.

✔️Editor de código, se empleó Visual Studio Code

✔️Base de datos, SQL Server

✔️WhatsApp Cloud API para lograr la conexión a WhatsApp.

• Módulos de node implementados para realizar las automatizaciones:

✔️Express
✔️Fs
✔️Mssql
✔️Path
✔️Pizzip
✔️Nodemailer
✔️Docxtemplater
✔️@pdftron/pdfnet-node

• Descarga y configuración del chatbot

✔️Clonar el repositorio en tu pc, instalar Visual Studio Code o el editor de código de tu preferencia, abrir visual studio code y arrastrar la carpeta donde está ubicado el proyecto que acabas de descargar para poder visualizar los archivos que contiene.

✔️Abrir la terminal desde Visual Studio Code mediante (ctrl + shift + ñ) y ejecutar el siguiente comando para instalar los módulos correspondientes para el funcionamiento del proyecto:

✔️npm install express fs mssql path pizzip @pdftron/pdfnet-node nodemailer docxtemplater
