CREATE DATABASE camino;

CREATE TABLE poblaciones(
idPoblacion SMALLINT UNSIGNED PRIMARY KEY NOT NULL,
nombrePoblacion VARCHAR(80) NOT NULL,
imagenPoblacion VARCHAR(40) NOT NULL,
descripcion text

);

CREATE TABLE etapas(
idEtapa TINYINT UNSIGNED NOT NULL PRIMARY KEY,
duracion TIME NOT NULL,
kilometros DECIMAL NOT NULL,
imgEtapa VARCHAR(40) NOT NULL,
idPoblacionInicio SMALLINT UNSIGNED,
idPoblacionFin SMALLINT UNSIGNED,
CHECK (idPoblacionInicio!=idPoblacionFin),
CONSTRAINT FK_etapaInicio FOREIGN KEY (idPoblacionInicio) REFERENCES poblaciones(idPoblacion),
CONSTRAINT FK_etapaFin FOREIGN KEY (idPoblacionFin) REFERENCES poblaciones(idPoblacion)
);

CREATE TABLE poblacion_intermedia(
idPoblacion SMALLINT UNSIGNED NOT NULL,
idEtapa TINYINT UNSIGNED NOT NULL,
orden TINYINT UNSIGNED NOT NULL,
PRIMARY KEY(idPoblacion, idEtapa),
CONSTRAINT FK_poblaciones FOREIGN KEY (idPoblacion) REFERENCES poblaciones(idPoblacion),
CONSTRAINT FK_etapas FOREIGN KEY (idEtapa) REFERENCES etapas(idEtapa)
)
