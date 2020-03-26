const crypto = require ("crypto");

const connection = require('../database/connection'); //import database connection


module.exports ={   //export to routes.js
    
    //LIST ONGS 
    async index (request,response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //CREATE ONGS
    async create(request, response){    //async wait line containing "await" after execute: return line
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //generates 4 random bytes to use as id

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({
            id
         });
    }
};