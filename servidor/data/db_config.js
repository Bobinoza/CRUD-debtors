const knex = require('knex');
const config = require('../knexfile.js');
const dbknex = knex(config.development);
module.exports = dbknex;

// detalhes de conexao com o banco de dados a serem utilizados pelo programa.