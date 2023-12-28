
async function sendRequest(number, state) {
    try {
        const axios = require("axios");
        require("dotenv").config();

        //https://192.168.2.103/api/1028d66426293e821ecfd9ef1a0731df/lights/1/state
        let url = `http://${process.env.BRIDGEIP}/api/${process.env.HUENAME}/lights/${number}/state`;

        const URLdata = {
            "on": state //!State = Status (an oder aus)
        }

        return axios.put(url, URLdata, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                //!console.log("RESPONSE: ", response.data[0]);
                if (response.data && response.data[0] && response.data[0].error) {
                    return `Die Lampe ${number} wurde nicht gefunden oder ist nicht verfügbar! Versuche es erneut oder öffne ein Ticket mit **/reporterror**!`;
                } else {
                    return state
                        ? `Die Lampe ${number} wurde **Eingeschalten**`
                        : `Die Lampe ${number} wurde **Ausgeschalten**`
                }
            })
    } catch (e) {
        console.log("Fehler (HUE API): ", e);
        throw error;
    }
}


module.exports = { sendRequest }