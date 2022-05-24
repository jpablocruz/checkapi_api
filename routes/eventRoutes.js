'use strict';

const express = require('express'),jwt = require('jsonwebtoken');
const eventControll = require('../controllers/eventController');
const categoryController = require('../controllers/categoryController');
const groupController = require('../controllers/groupController');
const filteredAPIs = require('../controllers/filtered-apisController');
const config = require('../config');
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
router.delete('/endpoint/:id', eventControll.deleteEndpoint);
router.get('/categories', eventControll.getAllCategories);
router.get('/groups/:id', groupController.getEndpointGroups);
router.get('/categories/:id', filteredAPIs.getAPIsByCategories);
router.get('/api/:id',eventControll.getApi);
router.get('/endpoint/:id', groupController.getEndpoint);
router.get('/users', eventControll.getAllUsers);
router.put('/user/:id', eventControll.updateUserRole);
router.post('/favorite', eventControll.addFavorite); 
router.delete('/favorite', eventControll.deleteFavorite);
router.put('/userUpdate', eventControll.updateUserRole); 
//RUTAS API

//RUTAS ENDPOINTS ETC...


module.exports = {
    routes: router
}