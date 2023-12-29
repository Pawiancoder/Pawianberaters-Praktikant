const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getstate')
        .setDescription('description')
        .addIntegerOption(option =>
            option.setName("number").setDescription("lampe").setRequired(true)),
    async execute(interaction) {
        const { getRequest } = require("../../utils/controlLights");
        let lamp = interaction.options.getInteger("number");
        const response = await getRequest(lamp);
        console.log("RESPONSE: ", response);
        if (response) {
            await interaction.reply(`Lampe ${lamp} ist **Angeschalten**`);
        } else {
            await interaction.reply(`Lampe ${lamp} ist **Ausgeschalten**`);
        }
    },
};