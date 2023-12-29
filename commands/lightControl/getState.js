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
        const response = await getRequest(lamp, false);
        console.log("RESPONSE: ", response);
        await interaction.reply({
            content: response,
            ephemeral: true,
        });
    },
};