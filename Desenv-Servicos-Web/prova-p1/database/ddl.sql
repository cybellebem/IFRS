CREATE DATABASE prova_p1;

USE prova_p1;

CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    plataforma VARCHAR(100),
    ano_lancamento INT
);

CREATE TABLE jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE pontuacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogo_id INT NOT NULL,
    jogador_id INT NOT NULL,
    pontuacao INT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

     CONSTRAINT fk_pontuacoes_jogos
        FOREIGN KEY (jogo_id)
        REFERENCES jogos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pontuacoes_jogadores
        FOREIGN KEY (jogador_id)
        REFERENCES jogadores(id)
        ON DELETE CASCADE
);