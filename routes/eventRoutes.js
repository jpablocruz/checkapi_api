'use strict';

const express = require('express'),jwt = require('jsonwebtoken');
const eventControll = require('../controllers/eventController');
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
router.get('/apis', eventControll.getAllApis);
router.get('/event/:id', eventControll.getEvent);
router.post('/event', eventControll.addEvent);
router.put('/event/:id', eventControll.updatEvent);
router.delete('/event/:id', eventControll.deleteEvent);

//RUTAS API

//RUTAS ENDPOINTS ETC...


module.exports = {
    routes: router
}