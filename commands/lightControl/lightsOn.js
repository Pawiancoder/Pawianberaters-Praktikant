const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lighton')
        .setDescription('turn the light on'),
    async execute(interaction) {
        const { sendRequest } = require("../../utils/controlLights");
        sendRequest(3, true);
        await interaction.reply("Light is **ON**");
        // await interaction.reply('Pong!');
    },
};