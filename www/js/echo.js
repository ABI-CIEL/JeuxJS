var ipServeur = location.hostname; // l'adresse du serveur
var ws;

window.onload = function () {
    if ('WebSocket' in window) {
        ws = new WebSocket('ws://' + ipServeur + '/echo');

        ws.onopen = function () {
            console.log('Connexion WebSocket ouverte');
        };

        ws.onmessage = function (evt) {
            document.getElementById('messageRecu').value = evt.data;
        };

        ws.onclose = function () {
            console.log('Connexion WebSocket fermée');
        };

        document.getElementById('Envoyer').onclick = function () {
            ws.send(document.getElementById('messageEnvoi').value);
        };
    } else {
        alert('WebSocket non supporté par ce navigateur !');
    }
};
