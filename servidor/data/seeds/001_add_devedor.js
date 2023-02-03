/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = function (knex) {
  return knex("users").del()
    .then(function() {
      return knex("users").insert([
        {
          nome: "Mario",
          sobreNome: "Guerra",
          ano: 2017,
          valor: 130.00,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        },
        {
          nome: "Julio",
          sobreNome: "Henrique",
          ano: 2015,
          valor: 1200.00,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        },
        {
          nome: "Mariana",
          sobreNome: "Bart",
          ano: 2010,
          valor: 30.00,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        },
        {
          nome: "Antonio",
          sobreNome: "Pedreiro",
          ano: 2020,
          valor: 250.00,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        },
        {
          nome: "Polaca",
          sobreNome: "Manu",
          ano: 2023,
          valor: 340.00,
          foto: "https://s3.novatec.com.br/capas/9788575223925.jpg"
        }
      ]);
    })
}