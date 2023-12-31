async function getRequest(light, system) { //System = Ausgabe Lampenstatus als boolischer Wert oder als Text (Nicht system => User)
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
                            : `Die Lampe ${light} wurde **AUS**`
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

async function sendRequest(number, state, changing, saturation, brightness, hue) { //!get request
    try {
        if ((await getRequest(number, true)) && state && !changing) {
            return `Die Lampe ${number} ist bereits an!`;
        } else if (!(await getRequest(number, true)) && !state && !changing) {
            return `Die Lampe ${number} ist bereits aus!`;
        } else {
            const axios = require("axios");
            require("dotenv").config();

            //https://192.168.2.103/api/1028d66426293e821ecfd9ef1a0731df/lights/1/state
            let url = `http://${process.env.BRIDGEIP}/api/${process.env.HUENAME}/lights/${number}/state`;
            console.log("URL: ", url);

            //!brightness = 254
            const URLdata = {
                "on": state, "sat": saturation, "bri": brightness, "hue": hue  //!State = Status (an oder aus)
            }

            return axios.put(url, URLdata, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    //!console.log("RESPONSE: ", response.data[0]);
                    if (response.data && response.data[0] && response.data[0].error) {
                        console.log(response.data[0].error.description);
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