const { SlashCommandBuilder } = require('discord.js');
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lightoff')
        .setDescription('turns the light off'),
    async execute(interaction) {
        console.log("INTERACTION ADSADSAD");
        const { sendRequest } = require("../../utils/controlLights");
        await interaction.reply("Light is **OFF**");
        sendRequest(3, false);
        // await interaction.reply('Pong!');
    },
};