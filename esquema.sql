create table equipos (
id bigint primary key generated always as identity,
nombre text not null,
tipo_equipo text not null,
n_equipo text not null
);


create table repuestos (
id bigint primary key generated always as identity,
id_equipo bigint not null,
repuesto text not null,
descripcion text,
foreign key (id_equipo) references equipos (id)
);


create table estado_equipos (
id bigint primary key generated always as identity,
id_equipo bigint not null,
nombre text not null,
fecha_inicio timestamp not null,
estado text not null,
falla text not null,
repuesto text,
seccion text not null,
fecha_fin_estado timestamp,
observaciones text,
foreign key (id_equipo) references equipos (id)
);


CREATE TABLE EstadoHistorial (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemId INTEGER NOT NULL,
    estado TEXT NOT NULL,
    fechaCambio TEXT NOT NULL,
    FOREIGN KEY (itemId) REFERENCES estado_equipos(id)
);


create table usuarios (
id bigint primary key generated always as identity,
nombre text not null,
password text not null,
codigo text not null,
rol text not null
);


create table turnos (
id bigint primary key generated always as identity,
dia date not null,
hora time not null,
validacion integer not null
);

create table turnos_emergencia (
    id bigint primary key generated always as identity,
    nombre text not null,
    codigo bigint not null,
    dia date not null,
    hora time not null
);

create table registro_turnos (
id bigint primary key generated always as identity,
codigo bigint not null, 
nombre text not null,
motivo text not null,
detalle text not null,
id_turno bigint not null,
dia date not null,
hora time not null,
n_cierre text,
fecha_registro timestamp,
observaciones text,
tiempo_cierrer text
);

create table historial_turnos (
    id bigint primary key generated always as identity,
    id_turno bigint not null,
    dia date not null,
    hora time not null,
    nombre text not null,
    motivo text not null,
    n_cierre text,
    fecha_registro timestamp not null
);