const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lights')
        .setDescription('control the light')
        .addIntegerOption(option =>
            option.setName("lampe").setDescription("nummer der lampe").setRequired(true))
        .addBooleanOption(option =>
            option.setName("state").setDescription("status der lampe (an/aus / true/false)").setRequired(true)),
    async execute(interaction) {
        const { sendRequest } = require("../../utils/controlLights");
        let lamp = interaction.options.getInteger('lampe');
        let state = interaction.options.getBoolean('state');
        let response = await sendRequest(lamp, state);
        await interaction.reply({
            content: response,
            ephemeral: true,
        });
        // await interaction.reply('Pong!');
    },
};