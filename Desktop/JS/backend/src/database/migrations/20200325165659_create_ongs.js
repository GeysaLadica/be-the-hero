
//CREATE ONG SCHEMA
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable(); //2 represent word.leght
    })
  
};

exports.down = function(knex) { //what do if error == true
  return knex.schema.dropTable('ongs')
};
