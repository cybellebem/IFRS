const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Array para armazenar os alunos
let alunos = [
    {id: 1, nome: 'KKKKKKK', curso: 'KKKKKK', idade: 12},
    {id: 2, nome: 'KKKKKKK', curso: 'KKKKKK', idade: 12},
    {id: 3, nome: 'KKKKKKK', curso: 'KKKKKK', idade: 12},
    {id: 4, nome: 'KKKKKKK', curso: 'KKKKKK', idade: 12},
    {id: 5, nome: 'KKKKKKK', curso: 'KKKKKK', idade: 12}
];
let idCounter = 1;

// Rota GET para listar alunos
app.get('/api/alunos', (req, res) => {
    res.status(200).json(alunos);
});

// Rota POST para adicionar um novo aluno
app.post('/api/alunos', (req, res) => {
    const { nome, curso, idade } = req.body;

    // Verificar se todos os dados foram fornecidos
    if (!nome || !curso || !idade) {
        return res.status(400).json({ error: 'Faltando dados no corpo da requisição' });
    }

    const aluno = {
        id: idCounter++,  // Gerar um ID único
        nome,
        curso,
        idade
    };

    alunos.push(aluno);

    res.status(201).json({
        message: 'Aluno cadastrado com sucesso',
        aluno
    });
});

// Rota PUT para atualizar um aluno pelo ID
app.put('/api/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, curso, idade } = req.body;

    // Verificar se o aluno com o ID existe
    const alunoIndex = alunos.findIndex(aluno => aluno.id == id);
    if (alunoIndex === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Verificar se todos os dados foram fornecidos
    if (!nome || !curso || !idade) {
        return res.status(400).json({ error: 'Faltando dados no corpo da requisição' });
    }

    // Atualizar os dados do aluno
    alunos[alunoIndex] = { id: parseInt(id), nome, curso, idade };

    res.status(200).json({
        message: 'Aluno atualizado com sucesso',
        aluno: alunos[alunoIndex]
    });
});

// Rota DELETE para remover um aluno pelo ID
app.delete('/api/alunos/:id', (req, res) => {
    const { id } = req.params;

    // Verificar se o aluno com o ID existe
    const alunoIndex = alunos.findIndex(aluno => aluno.id == id);
    if (alunoIndex === -1) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Remover o aluno
    alunos.splice(alunoIndex, 1);

    res.status(200).json({
        message: `Aluno com ID ${id} removido com sucesso`
    });
});

// Rota para lidar com URLs inválidas (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
