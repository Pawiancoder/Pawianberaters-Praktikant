
function sendRequest(number, state) {
    const axios = require("axios");
    require("dotenv").config();

    //https://192.168.2.202/api/1028d66426293e821ecfd9ef1a0731df/lights/1/state
    let url = `http://${process.env.BRIDGEIP}/api/${process.env.HUENAME}/lights/${number}/state`;

    const URLdata = {
        "on": state //!State = Status (an oder aus)
    }

    axios.put(url, URLdata, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .catch(e => {
            console.log("Fehler (HUE API): ", e);
        })
}


module.exports = { sendRequest }