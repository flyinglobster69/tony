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
const Discord = require('discord.js')
const fs = require('fs')
const { exitCode } = require('process')

// Connect Config file 
const config = require('./config.json')

//  -- Command list goes here later --

// Parts of speech word lists
// const pronouns = ['i', 'you', 'he', 'she', 'him', 'her', 'it', 'them', 'ours']
// const conjunctions = ['and', 'but', 'or', 'so', 'yet', 'with']
// const articles = ['a', 'an', 'the']
// const interjections = ['ah', 'oop', 'oops', 'wow']

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
    console.log('Message Detected')
    if (message.author = client.user) {
        return // prevent bot from responding to own messages
    }
    if (message.content.toLowerCase() == 'test') {
        console.log('Command Activated')
        message.channel.send('Passed')
    }
    
    else {
        null //
    }
})

// Function for machine learning
// Parts of speech categories
// - Nouns          - person, place or thing                        - [object]
// - Pronouns       - stands for nouns                              - I, you, he, she, him, her, it, them, ours
// - Verbs          - action or state of being                      - [action]
// - Adjectives     - modifies noun                                 - [description]
// - Adverbs        - describes verbs, adjectives, other adverbs    - ends in -ly
// - Prepositions   - shows relationship between ideas/objects      - [location, direction, time]
// - Conjunctions   - joins words                                   - and, but, or, so, yet, with
// - Articles       - specify nouns                                 - a, an, the
// - Interjections  - expressions                                   - ah, oop, oops, wow

// Lists that can be created
// - Pronouns
// - Conjunctions
// - Articles
// - Interjections

// Parts that need to be learned (basic structures)
// - Nouns          - Comes before a verb; Comes after adjectives
// - Verbs          - Comes after a noun
// - Adjectives     - Comes before a Noun/Pronoun; Comes after a linking verb
// - Adverbs        - ends in -ly
// - Prepositions   - Comes before a Noun/Pronoun

// Basic sentence structure
// "The quick brown fox jumps over the lazy dog"
//  Art  Adj   Adj  Nou  Ver  Pre  Art Adj  Nou

// Fetch all learned parts of speech from csv files
// nouns.csv
// verbs.csv
// adjectives.csv
// adverbs.csv
// prepositions.csv

// Open and read/write to file fs
// fs.open('./engcsv/adjectives.csv', 'r+', function(error, data) {
//     if (error) {
//         console.log('Error opening adjectives.csv')
//         throw error
//     }
//     else {
//         fs.readFile('./engcsv/adjectives.csv', 'utf8', function(error, data) {
//             if (error) {
//                 console.log('Error reading adjectives.csv')
//                 throw error
//             }
//             else {
//                 // Write to file when learning english, read from file when generating quote
//             }
//         })
//     }
// })

process.on('unhandledRejection', (reason, promise) => {
    console.log('no perms')
})

client.login(config.token)