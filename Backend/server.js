const express = require ('express');
var app = express();
const server =require('http').Server(app);
const config =require('./config');

const bodyparser = require('body-parser');
const db = require('./db');
const router =require('./network/routes')
const cors = require('cors')

db.connect(config.dbUrl);

require ('./auth/auth')

app.use(cors());
app.use(bodyparser.json());

router(app);


app.use(config.publicRoute,express.static('public'));
server.listen(config.port,function(){
    console.log(`La aplicacion está escuchando en ${config.host}:${config.port}${config.publicRoute}`);

});

