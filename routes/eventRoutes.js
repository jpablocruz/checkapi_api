'use strict';

const express = require('express'),jwt = require('jsonwebtoken');
const eventControll = require('../controllers/eventController');
const categoryController = require('../controllers/categoryController');
const groupController = require('../controllers/groupController');
const addApiController = require('../controllers/addApiController');
const filteredAPIs = require('../controllers/filtered-apisController');
const EndpointController = require('../controllers/endpointController');
const config = require('../config');
const toggleApiVisibilityController = require('../controllers/toggleApiVisibilityController');
const  deleteApiController = require('../controllers/deleteApiController');
const { createApi } = require('../data/apis');
const app = express();

app.set('llave', config.llave);

const router = express.Router(); 
//rutas publicas
router.post('/auth', eventControll.logUser);

//START TOKEN VALIDATOR
/* router.use((req, res, next) => {
    const token = req.headers['access-token'];    
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
}); */
//END TOKEN VALIDATOR

//rutas protegidas con el token validator
router.get('/events',eventControll.getAllEvents);
router.get('/apis/:id', eventControll.getAllApis); //added :id to filter by userID favs
router.get('/event/:id', eventControll.getEvent);
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updateEvent);
router.put('/api/:id', eventControll.updateApi);
router.delete('/event/:id', eventControll.deleteEvent);
router.get('/categories', eventControll.getAllCategories);
router.get('/groups/:id', groupController.getEndpointGroups);
router.get('/categories/:id/user/:user_id', filteredAPIs.getAPIsByCategories);
router.get('/api/:id',eventControll.getApi);
router.get('/endpoint/:id', groupController.getEndpoint);
router.get('/users', eventControll.getAllUsers);
router.put('/user/:id', eventControll.updateUserRole);
router.post('/favorite', eventControll.addFavorite); 
router.delete('/favorite', eventControll.deleteFavorite);
router.put('/userUpdate', eventControll.updateUserRole); 
router.get('/endpoint/params/:id',groupController.getEndpointParameters)
router.post('/api',addApiController.addApi)
router.post('/category_api',addApiController.addApiCatRel)
router.post('/endpoint',EndpointController.addEndpoint)
router.put('/api_visibility',toggleApiVisibilityController.updateApiVisibility)
router.delete('/delete_api/:id', deleteApiController.deleteApi)

//RUTAS API
router.put('/api-sla/:id', addApiController.updateAPIinfoSLA)

//RUTAS ENDPOINTS ETC...
router.get('/group/:id/endpoints', EndpointController.getEndpointsByGroupId);
router.post('/parameter',EndpointController.addParameter);
router.post('/paramEndpoint',EndpointController.addEndpointParamRel);
router.get('/respCodes',EndpointController.getAllRespCodes);
router.get('/endpoint/respCodes/:id',EndpointController.getRespCodesByEndpointID);
router.post('/endpoint/respCodes',EndpointController.addEndpointRespCodes);
router.put('/endpoint/:id',EndpointController.updateEndpointData);
router.delete('/parameter/:id',EndpointController.deleteParameter);
router.delete('/respCodes/:id',EndpointController.deleteResponseCodes);
router.delete('/endpoint/:id', EndpointController.deleteEndpoint);
router.put('/lastResp/:id', EndpointController.updateEndpointLastResp);

//RUTAS DE GROUPS 
router.get('/api_groups/:id', groupController.getGroupsbyId);
router.post('/group', groupController.addGroup);
router.delete('/group/:id',groupController.deleteGroup);


module.exports = {
    routes: router
}