INSERT INTO jogos (nome, plataforma, ano_lancamento) VALUES
('Super Mario World', 'Super Nintendo', 1990),
('Sonic the Hedgehog', 'Mega Drive', 1991),
('Pac-Man', 'Arcade', 1980),
('Street Fighter II', 'Arcade', 1991),
('The Legend of Zelda', 'NES', 1986);


INSERT INTO jogadores (nome, nickname) VALUES
('Ana Silva', 'ana123'),
('Bruno Souza', 'brunao'),
('Carlos Lima', 'carlim'),
('Daniela Rocha', 'dani_r'),
('Eduardo Alves', 'eduzao');


INSERT INTO pontuacoes (jogo_id, jogador_id, pontuacao) VALUES
-- Super Mario
(1, 1, 5000),
(1, 2, 7000),
(1, 3, 6500),

-- Sonic
(2, 1, 8000),
(2, 4, 9000),
(2, 5, 8500),

-- Pac-Man
(3, 2, 12000),
(3, 3, 11000),
(3, 1, 13000),

-- Street Fighter
(4, 4, 4000),
(4, 5, 4500),

-- Zelda
(5, 1, 3000);