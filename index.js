'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
const app = express();

app.use("/", express.static("public"));
app.use(express.json());
app.use(cors());
//3 convierte el contenido en JSON
app.use(bodyParser.json());

app.use('/api', eventRoutes.routes);

//1 configuramos la llave
//2 es para que el body parsser nos convierta lo que viene del cliente
app.use(bodyParser.urlencoded({extended: true}));
//4 arranque del servidor
app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});
//5 damos un punto de inicio para el API
app.get('/', function(req,res){
  res.send('public route');
});
