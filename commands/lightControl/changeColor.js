const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecolor')
        .setDescription('set the color of the light')
        .addIntegerOption(option =>
            option.setName("lampe").setDescription("nummer der lampe").setRequired(true))
        .addIntegerOption(option =>
            option.setName("hue").setDescription("farbcode").setRequired(true))
        .addIntegerOption(option =>
            option.setName("brightness").setDescription("helligkeit").setRequired(true))
        .addIntegerOption(option =>
            option.setName("saturation").setDescription("sättigung").setRequired(true)),
    async execute(interaction) {
        const { sendRequest } = require("../../utils/controlLights")
        let lamp = interaction.options.getInteger("lampe");
        let hue = interaction.options.getInteger("hue");
        let bri = interaction.options.getInteger("brightness");
        let sat = interaction.options.getInteger("saturation");
        const answer = await sendRequest(lamp, true, true, sat, bri, hue);
        await interaction.reply(answer);
    },
};

/**
 * Licht
 * Hue
 * Bri
 * Sat
 *TODO: Hue (Hash in Hue?)
 */