const mysql12 = require('mysql2');
require('dotenv').config();

const conexao = mysql12.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

conexao.connect(erro => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
        return;
    }
    console.log('Conexão ao banco de dados MySQL estabelecida');
});



module.exports = conexao
