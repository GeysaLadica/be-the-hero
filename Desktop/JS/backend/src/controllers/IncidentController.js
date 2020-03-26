const connection = require('../database/connection'); //import database connection


module.exports={
    //LIST INCIDENTS
    async index(request,response){
        const { page = 1 } = request.query; //creat page metod

        const [count] = await connection('incidents').count(); //return a array in zero position that contains count
        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //join data table "ongs" where ongs.id=incidentes.ongs_id
        .limit(5)               //limit 5 results
        .offset((page - 1)*5)   //jump 5 in 5 results
        .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
        ]); 

        response.header('X-Total-Count', count['count(*)']) //add in header response the value of count(*)

        return response.json(incidents);
    },
    //CREATE INCIDENTS
    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //request id in headers

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    //DELETE INCIDENTS
    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //Check if ong is owner this incident
        const incident = await connection('incidents')
        .where('id',id) //where 'id' equals id
        .select('ong_id')
        .first();

            if(incident.ong_id != ong_id){ //if not, change status 200 to 401
                return response.status(401).json({ error: 'Operation not permitted.'});
            }

            await connection('incidents').where('id',id).delete();

            return response.status(204).send(); // 204 = Sucess but, no content
    }
}