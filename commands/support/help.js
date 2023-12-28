const { SlashCommandBuilder } = require('discord.js');
//!const { setUpCommandDescription } = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hilfe')
        .setDescription('hilfe zu commands'),
    async execute(interaction) {
        await interaction.reply("still under Development");
        // await interaction.reply('Pong!');
    },
};