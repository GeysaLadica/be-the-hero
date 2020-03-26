const knex = require('knex');
const configuration = require('../../knexfile'); //import database config

const connection = knex(configuration.development); //create database connection

module.exports = connection; //export database connection
