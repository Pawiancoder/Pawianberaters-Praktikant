const { SlashCommandBuilder } = require('discord.js');
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lightoff')
        .setDescription('turns the light off'),
    async execute(interaction) {

        const { sendRequest } = require("../../utils/controlLights");
        let response = await sendRequest(3, false);
        //!console.log(response);
        await interaction.reply(response);
        // await interaction.reply('Pong!');
    },
};