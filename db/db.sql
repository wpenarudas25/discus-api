create database if not exists company;
use company;

create table discos (
id int(11) not null auto_increment,
nombre varchar(45) default null,
tamaño int(11) default null,
diponibles int(11) default null,
primary key(id)
);

describe discos;