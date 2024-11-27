const express = require('express');
const conexao = require('../config/conexao'); 
const router = express.Router();


router.post('/cadastrar', async (req, res) => {
    const { id_motorista, marca, modelo, consumo_cidade } = req.body;

    // Validar se todos os campos necessários foram enviados
    if (!id_motorista || !marca || !modelo || !consumo_cidade) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Inserir o veículo no banco de dados
        const [result] = await conexao.promise().query(
            'INSERT INTO veiculo (id_motorista, marca, modelo, consumo_cidade) VALUES (?, ?, ?, ?)',
            [id_motorista, marca, modelo, consumo_cidade]
        );

        // Retornar a resposta de sucesso
        res.status(201).json({
            mensagem: 'Veículo cadastrado com sucesso.',
            veiculo: {
                id_veiculo: result.insertId,
                id_motorista,
                marca,
                modelo,
                consumo_cidade
            }
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao cadastrar o veículo.' });
    }
});

module.exports = router;
