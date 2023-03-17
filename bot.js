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
const pos = require('pos')

// Connect Config file 
const config = require('./config.json')

//  -- Command list goes here later --



// Connect Client
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MEMBERS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES]}
) // Specify intents

// Gets called when TonyAI is successfully logged on and connected
client.on('ready', () => {
    console.log(`${client.user.tag} is connected on Version ${config.version}`)

    client.user.setActivity('with English') // Activity status on Discord
})

client.on('messageCreate', message => {
    console.log('Message Detected')
    if (message.author == client.user) {
        return // prevent bot from responding to own messages
    }
    if (message.content.toLowerCase() == 'test') { // Test command to make sure the bot responds
        // console.log('Command Activated')
        message.channel.send('Passed')
    }

    
    else {
        // Tag parts of speech using POS-JS

        // Input message contents into lex, then tag each word with a part of speech
        let words = new pos.Lexer().lex(message.content.toLowerCase()) 
        let tagger = new pos.Tagger()
        let taggedWords = tagger.tag(words) 

        let len = message.content.split(' ').length
        // console.log(len)

        // For each tagged word, read the CSV for the tag, then add the word to the CSV if word isn't there already
        for (i = 0; i < len; i++) {
            let taggedWord = taggedWords[i]
            let word = taggedWord[0]
            let tag = taggedWord[1]
            // console.log(`${word} - ${tag}`)

            // Remember words that have been tagged
            fs.open(`./engcsv/${tag}.csv`, 'r+', function(error, fd) {
                // console.log('Open CSV')
                // console.log(word)

                if (error) {
                    // Create CSV if file not found
                    fs.writeFile(`./engcsv/${tag}.csv`, `${word},`, 'utf8', function(error, data) { // start file with word
                        null
                    })
                    // console.log(`${tag} CSV created.`)
                }
                else {
                    // Read data from CSV and then add new word to it if needed
                    fs.readFile(`./engcsv/${tag}.csv`, 'utf8', function(error, data) {
                        if (error) {
                            null
                            // No Read error should occur if file exists
                        }
                        else {
                            // console.log('Reading CSV')

                            // Split existing data into a list
                            let contents = data.split(',')
                            // console.log('Evaluating existing word list')
                            // console.log(contents)

                            let index = contents.indexOf('')
                            if (index > -1) {
                                contents.splice(index, 1)
                            }

                            let wc = 0
                            let sameword = false

                            // Compare each existing word with the word that was collected
                            for (wc = 0; wc < contents.length; wc++) {
                                let existword = contents[wc]
                                // console.log(contents.length)

                                if (existword == word) {
                                    // If word was found in the CSV, do not add word to CSV
                                    sameword = true
                                    // console.log('Found same word')
                                    break
                                }
                                else {
                                    null
                                    // Leave sameword = false if word not same
                                }
                            }

                            // If no same word in CSV, add word to the CSV
                            if (sameword == false) {
                                // console.log(word)

                                // Add word to the list of words already present in the CSV
                                if (word == '') {
                                    null
                                }
                                else {
                                    contents.push(word) // Push new word onto wordlist array
                                    // console.log(contents)
                                    let finalwordliststr = contents.toString() // Convert array to string


                                    // Overwrite the previous CSV with the updated list
                                    fs.write(fd, finalwordliststr, 0,'utf8', function(error, writtenbytes) {
                                        // console.log(`Write to CSV = ${finalwordliststr}`)
                                    }) 
                                }
                            }
                        }
                    })
                }
            })
        }
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


// When the bot is missing permissions 
process.on('unhandledRejection', (reason, promise) => {
    console.log('no perms')
})

client.login(config.token)