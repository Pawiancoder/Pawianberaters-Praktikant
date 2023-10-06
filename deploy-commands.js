const { REST, Routes } = require('discord.js');                                                                                                                                                                                                                                                                                                                                                                             //01001101 01100001 01100100 01100101 00100000 01110111 01101001 01110100 01101000 00100000 01001010 01010011 00100000 01100001 01101110 01100100 00100000 01001100 01101111 01110110 01100101 00100000 01100010 01111001 00100000 01001101 01100001 01101011 01110011 01111001 01101101 01101001 01101100 01101001 01100001 01101110 01001111 01000101 00100000 01100001 01101110 01100100 00100000 01010000 01100001 01110111 01101001 01100001 01101110 01100011 01101111 01100100 01100101 01110010 00100000 00111010 01000100
require("dotenv").config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOTTOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();



































//01001101 01100001 01100100 01100101 00100000 01110111 01101001 01110100 01101000 00100000 01001010 01010011 00100000 01100001 01101110 01100100 00100000 01001100 01101111 01110110 01100101 00100000 01100010 01111001 00100000 01001101 01100001 01101011 01110011 01111001 01101101 01101001 01101100 01101001 01100001 01101110 01001111 01000101 00100000 01100001 01101110 01100100 00100000 01010000 01100001 01110111 01101001 01100001 01101110 01100011 01101111 01100100 01100101 01110010 00100000 00111010 01000100