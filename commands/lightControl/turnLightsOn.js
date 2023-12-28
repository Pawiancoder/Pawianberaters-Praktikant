const { SlashCommandBuilder } = require('discord.js');
const { sendRequest } = require("../../utils/controlLights")
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('turnlighton')
        .setDescription('description')
        .addStringOption(option =>
            option.setName('optname').setDescription('optdescription').setRequired(true)),
    async execute(interaction) {
        sendRequest(process.env.BRIDGEIP, process.env.HUENAME, 1, false);
        await interaction.reply("TEST");
        // await interaction.reply('Pong!');
    },
};