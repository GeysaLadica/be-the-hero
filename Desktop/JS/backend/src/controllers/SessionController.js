const connection = require('../database/connection'); //database connection

module.exports={
    async create(request, response){
        const{ id } = request.body;

        const ong = await connection('ongs')
        .where('id',id)
        .select('name')
        .first(); //return name and not return a array

        if(!ong){
            return response.status(400).json({ error: 'No ONG found with this ID'}); //if ong to exist
        }

        return response.json(ong);
    }
}