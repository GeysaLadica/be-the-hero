const express = require("express"); //import express module

const OngController = require('./controllers/OngController'); //import Create and list Ongs logic
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //"build" express.Router with name "routes"

//CREATE SESSION
routes.post('/sessions', SessionController.create);

//LIST ONGS 
routes.get('/ongs', OngController.index);
//CREATE ONGS
routes.post('/ongs', OngController.create); 

//LIST SPECIFIC INCIDENT
routes.get('/profile', ProfileController.index);

//CREATE INCIDENTS
routes.post('/incidents', IncidentController.create);
//LIST INCIDENTS
routes.get('/incidents', IncidentController.index);
//DELETE INCIDENTS
routes.delete('/incidents/:id', IncidentController.delete);
    

module.exports = routes;