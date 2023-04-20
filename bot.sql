create database bot
use bot

create table usuario (
numero varchar(30) primary key,
idUsuario varchar(30) not null,
nombre varchar(50) not null, 
fVinculacion varchar(30) not null,
ocupacion varchar(30) not null,
tipoContrato varchar(30) not null,
salario varchar(50) not null,
correo varchar(30) not null, 
)

create table gestion (
id int identity(1,1) primary key,
idUsuario varchar(30) not null,
tipoGestion varchar(30) not null
)

INSERT INTO usuario (numero, idUsuario, nombre, fVinculacion, ocupacion, tipoContrato, salario, correo) VALUES
('573224043294', '1040741258', 'james', '2022-10-30', 'admin', 'fijo', '1392000', 'jc@cesde.edu.co')

update usuario 
set numero = '573016529176' where idUsuario = '1111111111'

update usuario 
set correo = '573504979100' where idUsuario = '1036654185'

update usuario 
set correo = 'jcastrillon@cesde.edu.co' where idUsuario = '1040741258'

select * from usuario
select * from gestion