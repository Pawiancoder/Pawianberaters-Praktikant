const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soundsystem')
        .setDescription('play sounds with the bot')
        .addSubcommand(subcommand =>
            subcommand.setName("joinvoice").setDescription("let the bot join a voicechannel")
                .addChannelOption(option =>
                    option.setName("channel").setDescription("pick the channel for the bot to join").addChannelTypes(ChannelType.GuildVoice).setRequired(true))) //!JOINVOICE
        .addSubcommand(subcommand =>
            subcommand.setName("leavevoice").setDescription("let the bot leave the voicechannel") //!LEAVEVOICE
        )
        .addSubcommand(subcommand =>
            subcommand.setName("playsound").setDescription("play a sound with the bot") //?PLAYSOUND
        ),
    async execute(interaction) {
        const botVoice = require("../../index");
        let status = botVoice.get("botVoiceVariable");
        let subcommand = interaction.options.getSubcommand();
        let channelToJoin = interaction.options.getChannel("channel");

        if (subcommand === "joinvoice") {
            if (status) {
                console.log(channelToJoin);
                await interaction.reply({
                    content: "Der Bot ist bereits in einem channel!",
                    ephemeral: true
                });
            } else {
                botVoice.set("botVoiceVariable", true);
                await interaction.reply({
                    content: "Bot ist dem Voicechannel beigetreten!", //!voicechannel beitreten
                    ephemeral: true
                });
            }
        }
    },
};

//TODO Voice beitreten: Voicechannel als StringOption übergeben lassen (Command) und dann in den channel joinen