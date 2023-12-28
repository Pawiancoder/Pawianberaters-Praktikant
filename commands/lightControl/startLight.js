const { SlashCommandBuilder } = require('discord.js');
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ligthoff')
        .setDescription('turn off the light'),
    async execute(interaction) {
        const { sendRequest } = require("../../utils/controlLights");
        await interaction.reply("Light is off!");
        sendRequest(process.env.BRIDGEIP, process.env.HUENAME, 1, false);
        // await interaction.reply('Pong!');
    },
};