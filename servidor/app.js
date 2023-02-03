const express = require('express');
const app = express();
const port = 3001;

// para reconhecer os dados recebidos como sendo um objeto no formato JSON
app.use(express.json());

// ------------------------------ Arquivo com rotas para o cadastro de users
const users = require('./users');

app.use('/users', users); // identificação da rota e da const (require) associada

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})
