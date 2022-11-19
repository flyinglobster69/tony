// TonyAI#8903
// 1.0: November 18, 2022
// Author: FlyingLobster69#1861 (LooOOooL YT)


// Tony is an AI quote generator. It reads the chat and learns English
// using an algorithm which logically sorts words into categories. The
// quote generation function uses the collected data to generate quotes.

// In the beginning, the generator would generate quotes randomly, but
// it is planned to be able to generate quotes within parameters.


// Import statements
const { Client, Events, GatewayIntentBits, MessageEmbed } = require('discord.js')
const fs = require('fs')
const { exitCode } = require('process')


// Connect configuration files
const config = require('./config.json')
const version = require('./version.json')


// Connect client
const client = new Client({ intents: [GatewayIntentBits.Guilds]})


// Gets called when our bot is successfully logged in and connected
client.on('ready', () => {
    console.log(`${client.user.tag} is connected on Version ${version.version}`)

    client.user.setActivity('yaHOOO') // Activity status on Discord
})


// Commands
client.on(Events.InteractionCreate, interaction => {
	console.log(interaction)
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(config.token)