CREATE DATABASE restartocean;

\c restartocean;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(25),
  apellido VARCHAR(25),
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL );

SELECT * FROM usuarios;
