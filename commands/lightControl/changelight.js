const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcolor')
        .setDescription('set the color of the light')
        .addStringOption(option =>
            option.setName('optname').setDescription('optdescription').setRequired(true)),
    async execute(interaction) {
        let text = interaction.options.getString('text');
        await interaction.reply(text);
        // await interaction.reply('Pong!');
    },
};