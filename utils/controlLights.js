const axios = require("axios");

function sendRequest(ip, username, number, state) {
    //https://192.168.2.202/api/1028d66426293e821ecfd9ef1a0731df/lights/1/state
    let url = `https://${ip}/api/${username}/lights/${number}/state`;

    const data = {
        "on": state
    }

    const config = {
        method: 'put', // Axios verwendet lowercase für HTTP-Methoden
        url: url,
        headers: {
            'Content-Type': 'application/json', // Der Inhaltstyp muss auf JSON gesetzt sein, wenn Sie JSON senden
            // Weitere Header können je nach Bedarf hinzugefügt werden
            // 'Authorization': 'Bearer YourAccessToken'
        },
        data: data // Daten im Request-Body
    };

    axios(config)
        .then(response => {
            console.log("PUT-Request erfolgreich: ", response.data);
        })
        .catch(error => {
            console.log("Ein Fehler ist aufgetreten (HUE_CONTROL): ", error);
        })
}


module.exports = { sendRequest }