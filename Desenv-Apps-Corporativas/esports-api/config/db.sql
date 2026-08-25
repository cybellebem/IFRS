CREATE DATABASE IF NOT EXISTS esports_db;

USE esports_db;

CREATE TABLE times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    jogo VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    ano_fundacao INT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO times (nome, jogo, pais, ano_fundacao) VALUES
('Cyber Dragons', 'Valorant', 'Brasil', 2023),
('Storm Wolves', 'League of Legends', 'Brasil', 2020),
('Phoenix Squad', 'Counter-Strike 2', 'Estados Unidos', 2018),
('Iron Titans', 'Valorant', 'Argentina', 2021),
('Shadow Hunters', 'League of Legends', 'Coreia do Sul', 2016);