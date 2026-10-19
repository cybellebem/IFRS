USE voluntariado;

-- =========================
-- USUÁRIOS (senha de ambos: 123456, armazenada com bcrypt)
-- =========================

INSERT INTO usuarios (email, senha, cargo)
VALUES
    ('admin@ifrs.edu.br', '$2b$10$G7VbHrvnpEmBEV9QP8mfD.k3IatbOxUvwPEQCvdFiyU6HRgpKcpL.', 'admin'),
    ('usuario@ifrs.edu.br', '$2b$10$G7VbHrvnpEmBEV9QP8mfD.k3IatbOxUvwPEQCvdFiyU6HRgpKcpL.', 'user');


-- =========================
-- EVENTOS
-- =========================

INSERT INTO eventos (
    nome,
    descricao,
    data,
    local,
    maximo_voluntarios
)
VALUES
(
    'Campanha de Doação de Sangue',
    'Ação de conscientização e doação de sangue para a comunidade.',
    '2026-11-10',
    'IFRS Campus Bento Gonçalves',
    30
),
(
    'Arrecadação de Alimentos',
    'Campanha para arrecadação de alimentos destinados a famílias em situação de vulnerabilidade.',
    '2026-11-15',
    'IFRS Campus Bento Gonçalves',
    20
),
(
    'Mutirão Ambiental',
    'Ação voluntária de limpeza e preservação de uma área ambiental.',
    '2026-11-20',
    'Parque da cidade',
    15
),
(
    'Campanha do Agasalho',
    'Arrecadação de roupas e agasalhos para pessoas em situação de vulnerabilidade.',
    '2026-11-25',
    'Centro Comunitário',
    25
);


-- =========================
-- VOLUNTÁRIOS
-- =========================

INSERT INTO voluntarios (
    nome,
    email,
    celular
)
VALUES
(
    'João da Silva',
    'joao.silva@email.com',
    '54999990001'
),
(
    'Maria Souza',
    'maria.souza@email.com',
    '54999990002'
),
(
    'Carlos Oliveira',
    'carlos.oliveira@email.com',
    '54999990003'
),
(
    'Ana Pereira',
    'ana.pereira@email.com',
    '54999990004'
),
(
    'Pedro Santos',
    'pedro.santos@email.com',
    '54999990005'
),
(
    'Juliana Costa',
    'juliana.costa@email.com',
    '54999990006'
);


-- =========================
-- RELAÇÃO EVENTOS/VOLUNTÁRIOS
-- =========================

INSERT INTO eventos_voluntarios (
    evento_id,
    voluntario_id
)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),

    (2, 1),
    (2, 4),
    (2, 5),

    (3, 2),
    (3, 3),
    (3, 6),

    (4, 1),
    (4, 5),
    (4, 6);