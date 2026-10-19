CREATE DATABASE IF NOT EXISTS voluntariado;

USE voluntariado;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(200) NOT NULL,
    maximo_voluntarios INT NOT NULL
);

CREATE TABLE IF NOT EXISTS voluntarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    celular VARCHAR(20) NULL
);

CREATE TABLE IF NOT EXISTS eventos_voluntarios (
    evento_id INT NOT NULL,
    voluntario_id INT NOT NULL,
    PRIMARY KEY (evento_id, voluntario_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (voluntario_id) REFERENCES voluntarios(id) ON DELETE CASCADE
);
