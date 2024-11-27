const express = require('express');
const bcrypt = require('bcrypt'); 
const conexao = require('../config/conexao');
const router = express.Router();


router.post('/cadastrar', async (req, res) => {
    const { nome, telefone, email, senha, meta_diaria_liquida } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha || !meta_diaria_liquida) {
        return res.status(400).json({ mensagem: 'Nome, email, senha e meta diária líquida são obrigatórios' });
    }

    try {
        // Verificar se o email já está cadastrado
        const [motoristaExistente] = await conexao.promise().query('SELECT * FROM motorista WHERE email = ?', [email]);

        if (motoristaExistente.length > 0) {
            return res.status(400).json({ mensagem: 'Motorista com este email já existe' });
        }

        // Criptografar a senha antes de salvar no banco de dados
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Inserir o novo motorista no banco de dados
        const [resultado] = await conexao.promise().query(
            'INSERT INTO motorista (nome, telefone, email, meta_diaria_liquida, senha) VALUES (?, ?, ?, ?, ?)',
            [nome, telefone, email, meta_diaria_liquida, senhaCriptografada] // Aqui estamos salvando a senha criptografada
        );

        // Retornar a resposta com o ID do novo motorista (não retornar a senha!)
        res.status(201).json({ 
            id_motorista: resultado.insertId, 
            nome, 
            email, 
            meta_diaria_liquida 
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao cadastrar motorista' });
    }
});

module.exports = router;
