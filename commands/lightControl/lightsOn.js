const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lighton')
        .setDescription('turn the light on'),
    async execute(interaction) {
        const { sendRequest } = require("../../utils/controlLights");
        const response = await sendRequest(3, true);
        await interaction.reply(response);
        // await interaction.reply('Pong!');
    },
};