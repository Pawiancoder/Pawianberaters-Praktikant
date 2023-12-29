async function getRequest(light, system) {
    try {
        const axios = require("axios");
        require("dotenv").config();
        let url = `http://${process.env.BRIDGEIP}/api/${process.env.HUENAME}/lights/${light}/`;
        return axios.get(url, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.data && response.data[0] && response.data[0].error) {
                    return `Die Lampe ${light} wurde ist nicht auffindbar. Versuche es erneut`;
                } else {
                    if (!system) {
                        return response.data.state.on
                            ? `Die Lampe ${light} ist **AN**`
                            : `Die Lampe ${light} wurde **AUS KEK**`
                    } else {
                        return response.data.state.on;
                    }
                }
            })
    } catch (e) {
        console.log("Fehler (API-GET-REQUEST): ", e);
        throw error;
    }
}

async function sendRequest(number, state) { //!get request
    try {
        if ((await getRequest(number, true)) && state) {
            console.log("1: ", await getRequest(number, true));
            console.log("2: ", state);
            return `Die Lampe ${number} ist bereits an!`;
        } else if (!(await getRequest(number, true)) && !state) {
            console.log("1: ", await getRequest(number, true));
            console.log("2: ", state);
            return `Die Lampe ${number} ist bereits aus!`;

        } else {
            const axios = require("axios");
            require("dotenv").config();

            //https://192.168.2.103/api/1028d66426293e821ecfd9ef1a0731df/lights/1/state
            let url = `http://${process.env.BRIDGEIP}/api/${process.env.HUENAME}/lights/${number}/state`;
            console.log("URL: ", url);

            const URLdata = {
                "on": true, "sat": 254, "bri": 254, "hue": 10000  //!State = Status (an oder aus)
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
        }
    } catch (e) {
        console.log("Fehler (HUE API): ", e);
        throw error;
    }
}
module.exports = { sendRequest, getRequest }