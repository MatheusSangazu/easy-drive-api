const express = require('express');
const conexao = require('../config/conexao');
const router = express.Router();


router.get('/veiculos/:id_motorista', async (req, res) => {
    const { id_motorista } = req.params; // Pega o ID do motorista da URL

    // Verificar se o id_motorista é um número válido
    if (!id_motorista || isNaN(id_motorista)) {
        return res.status(400).json({ mensagem: 'ID do motorista inválido.' });
    }

    try {
        // Consultar os veículos associados ao id_motorista
        const [veiculos] = await conexao.promise().query(
            'SELECT * FROM veiculo WHERE id_motorista = ?',
            [id_motorista]
        );

        // Se não encontrar veículos para o motorista
        if (veiculos.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum veículo encontrado para esse motorista.' });
        }

        // Retornar os veículos encontrados
        res.status(200).json({
            mensagem: 'Veículos encontrados.',
            veiculos: veiculos
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao consultar os veículos.' });
    }
});

module.exports = router;
