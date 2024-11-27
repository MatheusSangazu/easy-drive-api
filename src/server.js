const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(routes);

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
