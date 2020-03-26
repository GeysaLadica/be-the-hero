
//CREAT INCIDENT SCHEMA
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments('id');

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //text field that will represent the relationship between tables

        table.foreign('ong_id').references('id').inTable('ongs') //create foreign Key   
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidentes');
  
};
