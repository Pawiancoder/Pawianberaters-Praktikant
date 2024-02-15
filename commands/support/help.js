const { SlashCommandBuilder } = require('discord.js');
//!const { setUpCommandDescription } = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hilfe')
        .setDescription('hilfe zu commands'),
    async execute(interaction) {
        const { commandHelp } = require("../../index");
        let msg = "";
        commandHelp.forEach(command => {
            msg += `Command: ${command.commandName} | Beschreibung: ${command.commandDescription}`
        })
        await interaction.reply(msg);
    },
};