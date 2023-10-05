const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Emoji } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('sende eine statusmeldung'),
    async execute(interaction) {
        const online = new ButtonBuilder()
            .setCustomId("online")
            .setLabel("Online")
            .setStyle(ButtonStyle.Success);

        const offline = new ButtonBuilder()
            .setCustomId("offline")
            .setLabel("Offline")
            .setStyle(ButtonStyle.Secondary);

        const dnd = new ButtonBuilder()
            .setCustomId("DND")
            .setLabel("DND")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(online, offline, dnd);

        await interaction.reply({
            content: `**Bitte wähle hier deinen Status:**`,
            ephemeral: true,
            components: [row],
        });
    },
};