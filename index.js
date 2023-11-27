const { error, log } = require('console');
const { channel } = require('diagnostics_channel');
const { Client, GatewayIntentBits, Collection, Events, MessageComponentInteraction, ActivityType, Guild, Intents } = require('discord.js');
const fs = require("fs");
const path = require("path");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildScheduledEvents] });
require("dotenv").config();
//TODO log if event canceled
//Neuer toller Kommentar lol
//Viel coolerer Kommentar LOOOOOOOOOOOL!

const sharedVariable = new Map();

let commandHelp = [];

sharedVariable.set("numGame", false);
sharedVariable.set("numGameNumber", 0);

//!Description Constructer
class setDescription {
    commandName = this.name;
    CommandDescription = this.CommandDescription;
}

const setUpCommandDescription = (commandNameSet, description) => {
    let commandSetter = new setDescription();
    commandSetter.commandName = commandNameSet;
    commandSetter.CommandDescription = description;
    commandHelp.push(commandSetter);
}

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//!Eventlistener für guildScheduledEvents
client.on("guildScheduledEventCreate", (e) => {
    let channelID = process.env.logchannel;
    const logChannel = client.channels.cache.get(channelID);
    console.log(`Event ${e.name} ertellt!`);
    logChannel.send(`Event **${e.name}** wurde ertellt!`);
});

client.on("guildScheduledEventUserAdd", (e) => {
    console.log("User im Event: ", e.fetchSubscribers);
})

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton || interaction.isChatInputCommand) {
        if (interaction.isButton()) {
            let member = interaction.guild.members.cache.get(interaction.user.id);
            let onlineRole = interaction.guild.roles.cache.find(role => role.id == process.env.onlineRole);
            let offlineRole = interaction.guild.roles.cache.find(role => role.id == process.env.offlineRole);
            let dndRole = interaction.guild.roles.cache.find(role => role.id == process.env.dndRole);

            if (interaction.customId === "online") { //?onlinestatus
                member.roles.remove(dndRole);
                member.roles.remove(offlineRole);

                if (member.roles.cache.has(onlineRole.id)) {
                    await interaction.reply({
                        content: "Dein Status ist bereits auf **online** gestellt!",
                        ephemeral: true,
                    });
                    return;
                } else {
                    member.roles.add(onlineRole);
                    await interaction.reply(`**${interaction.user.tag}** hat seinen Status zu **"online"** geändert!`);
                }
            } else if (interaction.customId === "offline") { //?offlinestatus
                member.roles.remove(dndRole);
                member.roles.remove(onlineRole)

                if (member.roles.cache.has(offlineRole.id)) {
                    await interaction.reply({
                        content: "Dein Status ist bereits auf **offline** gestellt!",
                        ephemeral: true,
                    });
                    return;
                } else {
                    member.roles.add(offlineRole);
                    await interaction.reply(`**${interaction.user.tag}** hat seinen Status zu **"offline"** geändert!`);
                }
            } else if (interaction.customId === "DND") { //!DND
                member.roles.remove(offlineRole);
                member.roles.remove(onlineRole);

                if (member.roles.cache.has(dndRole.id)) {
                    await interaction.reply({
                        content: "Dein Status ist bereits auf **bitte nicht stören** gestellt!",
                        ephemeral: true,
                    });
                    return;
                } else {
                    member.roles.add(dndRole);
                    await interaction.reply(`**${interaction.user.tag}** hat seinen Status zu **"bitte nicht stören"** geändert!`);
                }
            }
        }

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
    } else {
        let content = interaction.options.data;
        console.log(content);
    }

});


client.on('ready', () => {

    client.user.setActivity({ //set an Activity for the Bot
        name: "/status",
        type: ActivityType.Listening
    })

    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildScheduledEventDelete", (e) => {
    let channelID = process.env.logchannel;
    const logChannel = client.channels.cache.get(channelID);
    console.log(`Event ${e.name} gelöscht!`);
    logChannel.send(`Event **${e.name}** wurde gelöscht!`);
})

client.on

client.on("messageCreate", async message => { //Fälle: Zahl ist größer; Zahl ist kleiner; Zahl wurde gefunden
    let number = sharedVariable.get("numGameNumber");
    //! console.log("numGameIndex: ", number);
    if (sharedVariable.get("numGame") && message.author.tag != client.user.tag) {
        if (isNaN(message.content)) {
            message.reply({
                content: `${message.content} ist keine Zahl! Bitte versuche es erneut`,
                ephemeral: true,
            }
            )
        } //isNaN = NaN = Not A Number => Wenn der content keine Nummer ist, bricht der Bot ab.
        console.log(message.content);
        if (message.content > number) {
            message.reply({
                content: "Die Zahl ist kleiner!",
                ephemeral: true,
            });
        } else if (message.content < number) {
            message.reply({
                content: "Die Zahl ist größer!",
                ephemeral: true,
            });
        } else if (message.content == number) {
            message.reply({
                content: `Richtig! Die gesuchte Zahl war **${number}**. Herzlichen Glückwunsch du hast sie gefunden!`,
                ephemeral: true,
            });
            sharedVariable.set("numGame", false);
        } else { return; }
    }

})

client.login(process.env.BOTTOKEN);

//Hier exportiere ich die Variable in der index.js datei
module.exports = { sharedVariable, client, setUpCommandDescription, commandHelp };

//TODO: channel merken und nur in diesem Channel die Antworten nehmen => Zahl erraten