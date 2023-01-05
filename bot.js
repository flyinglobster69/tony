// TonyAI
// 1.0: November 18, 2022
// Author: Arthur Jin


// TonyAI is an AI quote generator. It reads the chat and learns English
// using a custom algorithm that logically sorts words into categories.
// The quote generation function uses the collected data to generate 
// quotes.

// In the beginning, the generator would generate quotes randomly, but 
// it is planned to be able to generate quotes within parameters. 
// (with certain targeted topics or emotions)


// Import statements
const { GatewayIntentBits } = require('discord.js')
const Discord = require('discord.js')
const fs = require('fs')
const { exitCode } = require('process')

// Connect Config file 
const config = require('./config.json')

//  -- Command list goes here later --



// Connect Client
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MEMBERS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES
]}
) // Specify intents

// Gets called when TonyAI is successfully logged on and connected
client.on('ready', () => {
    console.log(`${client.user.tag} is connected on Version ${config.version}`)

    client.user.setActivity('with English') // Activity status on Discord
})

client.on('messageCreate', message => {
    if (message.author = client.user) {
        return // prevent bot from responding to own messages
    }
    if (message.content.toLowerCase() == 'test') {
        console.log('command activated')
        message.channel.send('Passed')
    }
    
    else {
        null //
    }
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('no perms')
})

client.login(config.token)