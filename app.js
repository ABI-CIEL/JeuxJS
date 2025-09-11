/*  *********************** Serveur Web ***************************   */
'use strict';

var express = require('express');
var exp = express();
var expressWs = require('express-ws')(exp); // <-- ajout pour WebSocket
var port = 80;

exp.use(express.static(__dirname + '/www'));
exp.get('/', function (req, res) {
    console.log('Reponse a un client');
    res.sendFile(__dirname + '/www/index.html');
});

exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
});

exp.ws('/echo', function (ws, req) {
    console.log('Connexion WebSocket %s:%s',
        req.connection.remoteAddress, req.connection.remotePort);

    ws.on('message', function (message) {
        console.log('Message reçu : ' + message);
        ws.send(message); 
    });

    ws.on('close', function () {
        console.log('Déconnexion WebSocket %s:%s',
            req.connection.remoteAddress, req.connection.remotePort);
    });
});

/*  ****** Serveur web et WebSocket en ecoute sur le port 80  ********   */
//  
var portServ = 80;
exp.listen(portServ, function () {
    console.log('Serveur en ecoute');
}); 