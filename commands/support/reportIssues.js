const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reporterror')
        .setDescription('report a error to the developer'),
    async execute(interaction) {
        await interaction.reply({
            content: "Report the Error here: https://github.com/MaksymilianOE/Discord_PawianberatersPraktikant/issues: Open a Issue and tell me all about the error!",
            ephemeral: true,
        });
        // await interaction.reply('Pong!');
    },
};