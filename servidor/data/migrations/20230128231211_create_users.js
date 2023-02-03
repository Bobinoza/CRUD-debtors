/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("nome", 60).notNullable();
    table.string("sobreNome", 60).notNullable();
    table.integer("ano", 4).notNullable();
    table.decimal("valor", 9.2).notNullable();
    table.string("foto", 100).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
