const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minigames')
        .setDescription('spiele tolle minispiele')
        .addSubcommand(subcommand =>
            subcommand.setName("kopfoderzahl").setNameLocalizations({
                "de": "kopfoderzahl",
                "en-GB": "headoratail",
            }).setDescription("wirf eine münze")).setDescriptionLocalizations({
                "de": "wirf eine münze!",
                "en-GB": "flip a coin",
            })
        .addSubcommand(subcommand =>
            subcommand.setName("zahlerraten").setDescription("errate eine zahl")
                .addIntegerOption(option =>
                    option.setName("endzahl").setDescription("endzahl des spiels").setRequired(true))
                .addIntegerOption(option =>
                    option.setName("startnummer").setDescription("die startzahl (leer => 0)").setRequired(false))
        ),
    async execute(interaction) {
        let subcommand = interaction.options.getSubcommand();

        if (subcommand === "kopfoderzahl") {
            //Kopf oder Zahl
            let number = Math.round(Math.random() * 1);

            if (number == 0) {
                //!Kopf
                await interaction.reply({
                    content: "Kopf",
                    ephemeral: true,
                });
            } else if (number == 1) {
                await interaction.reply({
                    content: "Zahl",
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "**[FEHLER]** Es gab einen unbekannten Fehler. Versuche es **erneut** und **kontaktiere** den **Entwickler des Bots**, falls das Problem erneut auftritt! **[FEHLER]**",
                    ephemeral: true,
                });
            }
        } else if (subcommand === "zahlerraten") {
            //zahlerraten
            let endnum = interaction.options.getInteger("endzahl");
            let startnum = interaction.options.getInteger("startnummer");
            if (startnum == undefined || startnum == null) {
                startnum = 0;
            }

            const getRndNum = (min, max) => {
                const diff = max - min;
                //zufällige Zahl erstellen
                return Math.round(Math.random() * diff);
            }

            await interaction.deferReply(); //nachdenken
            const pause = Math.round(Math.random() * 5001); //Random sekunden (0-5) zum nachdenken

            const sharedVariable = require("../../index");
            //Zugriff auf die zwei Variablen (gameState und Zahl)
            let numGame = sharedVariable.get("numGame");
            //! console.log("1 ", numGame);
            let num = getRndNum(startnum, endnum); //zufällige Zahl wird gesucht und gespeichert 
            //?  numGameNumber = num; //nummer wird ausgeloggt
            sharedVariable.set("numGameNumber", num);
            //!console.log(numGameNumber);
            sharedVariable.set("numGame", true); //variable wird auf true gesetzt (spielatart)
            //?  console.log("2 ", numGame);

            setTimeout(async () => { //Pause
                await interaction.editReply({
                    content: `Ich habe mir jetzt eine zufällige Zahl zwischen **${startnum}** und **${endnum}** ausgesucht! *Viel Spaß beim erraten*! **Schreibe die Zahl in den Chat (ohne Command nur als Zahl)**`,
                    ephemeral: true,
                })

            }, pause); //Pausenende
            //!Aktion :D
            console.log("numGame: ", numGame);



            //TODO: Spiel programmieren
            //TODO Spielchannel speichern und nur die nummern in diesem channel annehmen
        }
    },
};