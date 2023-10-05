const { SlashCommandBuilder, GuildScheduledEventManager, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType } = require('discord.js');
require("dotenv").config();
//TODO: Channelauswahl bei Event

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createevent')
        .setDescription('create an event for the server!')
        .addStringOption(option =>
            option.setName("eventname").setDescription("der name vom event").setRequired(true)
        )
        .addStringOption(option =>
            option.setName('ort')
                .setDescription('Der Ort, an dem das Event stattfindet')
                .setRequired(true)
                .addChoices(
                    { name: "Stagechannel", value: "stage" },
                    { name: "Voicechannel", value: "voicechannel" }
                )
        )
        .addStringOption(option =>
            option.setName("description").setDescription("die beschreibung vom event").setRequired(false)),
    async execute(interaction) {
        //  const client = require("../../index");

        let eventname = "";
        let description = "";
        let locationA = interaction.options.getString("ort");

        description = interaction.options.getString("description");
        eventname = interaction.options.getString('eventname');

        const guildID = process.env.GUILDID;
        const guild = interaction.client.guilds.cache.find((guild) => guild.id === guildID);

        const event_manager = new GuildScheduledEventManager(guild);

        if (locationA == "stage") {
            event_manager.create({
                name: eventname,
                scheduledStartTime: new Date(1697505600000),
                privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly, //Privacy
                entityType: GuildScheduledEventEntityType.StageInstance, //Ort => Voice, Stage (Server) oder Extern
                description: description,
                channel: "1133134383545598033",
                image: null,
            });
        } else if (locationA == "voicechannel") {
            event_manager.create({
                name: eventname,
                scheduledStartTime: new Date(1697505600000),
                privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly, //Privacy
                entityType: GuildScheduledEventEntityType.Voice, //Ort => Voice, Stage (Server) oder Extern
                description: description,
                channel: "1022590362700746863",
                image: null,
            });
        }

        if (!guild) {
            console.log(`Guild with ID ${guildID} not found.`);
            return;
        }

        await interaction.reply(`Event **"${eventname}"** was created successfully!`);
    },
};
