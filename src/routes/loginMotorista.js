const express = require('express');
const bcrypt = require('bcrypt');
const conexao = require('../config/conexao');
const router = express.Router();


router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Validar se os campos estão preenchidos
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    try {
        // Buscar o motorista no banco pelo email
        const [motorista] = await conexao.promise().query(
            'SELECT * FROM motorista WHERE email = ?',
            [email]
        );

        if (motorista.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const usuario = motorista[0];

        // Comparar a senha fornecida com a senha armazenada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Login bem-sucedido
        res.status(200).json({
            mensagem: 'Login bem-sucedido',
            motorista: {
                id_motorista: usuario.id_motorista,
                nome: usuario.nome,
                email: usuario.email,
                meta_diaria_liquida: usuario.meta_diaria_liquida
            }
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao realizar login' });
    }
});

module.exports = router;
