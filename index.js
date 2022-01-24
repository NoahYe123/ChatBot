// Import statements
import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from 'url';
import got from 'got'
import fetch from 'node-fetch'

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Discord variables
const Discord = require("discord.js") // import discord.js dependency
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice') // import voice channel dependency
const { addSpeechEvent } = require('discord-speech-recognition') // import speech recognition dependency
const discordTTS = require("discord-tts") // discord text to speech
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }) // create new client

// Variables
const currentDate = new Date()

//Array of negative words to be encouraged
const sad = ["sad", "depressed", "unhappy", "angry", "miserable", "anxious", "nervous", "broken", "bad", "cry", "tired"]

//Array of swear words to be censored
const swear = ["arse", "ass", "asshole", "bastard", "bitch", "bollocks", "brotherfucker", "bugger", "bullshit", "child-fucker", "cocksucker", "crap", "cunt", "damn", "effing", "fatherfucker", "frigger", "fuck", "goddam", "godsdamn", "hell", "holy shit", "horseshit", "Jesus fuck", "Jesus Christ", "motherfucker", "nigga", "nigger", "prick", "shit", "shit ass", "sisterfucker", "slut", "son of a bitch", "son of a whore", "twat"]

// Array of encouragements
const encouragements = ["Cheer up!:slight_smile:", "Hang in there:slight_smile:", "Come on! You can do it!:slight_smile:", "Keep fighting!:slight_smile:", "Don't give up:slight_smile:", "That's rough buddy:slight_smile:"]

client.on("guildCreate", guild => {
  guild.owner.send("Hello. Welcome!")
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

// gives a sweer good morening text @ 8am

// Crontab tasks for spam + morning/evening messages
const cron = require('node-cron');

var morining = cron.schedule(" 0 8 * * *", () => {
  let channel = client.channels.cache.get("934293745187315715");
  channel.send("Good Morning! Hope You Have A Great Day");
}, {
  scheduled: true,
  timezone: "EST"
});
// Gives you a sweet goodnight text @ 8 am
var morining = cron.schedule(" * * * * * *", () => {
  let channel = client.channels.cache.get("934293745187315715");
  channel.send("Go to sleep! It's Getting Late!");
}, {
  scheduled: true,
  timezone: "EST"
});

// for spamming function
var task = cron.schedule("* * * * * *", () => {
  let channel = client.channels.cache.get("934293745187315715");
  channel.send("spam");
}, {
  scheduled: true,
  timezone: "EST"
});


// Create an audio player for tts
const player = createAudioPlayer(); // create audio player for new options
addSpeechEvent(client); // set up speech recognition

// Random sound array
var sounds = ['\\Onii_Chan_-_Sound_Effect.mp3',
  '\\UwU_-_SOUND_EFFECT.mp3',
  '\\Fortnite_Death_-_Sound_Effect_HD.mp3',
  '\\Fortnite_default_dance_sound.mp3',
  '\\Fortnite_Shield_Potion_Fortnite_Battle_Royale_-_Gaming_Sound_Effect_HD_-_Sound_Effects.mp3',
  '\\Roblox_Death_Sound_-_Sound_Effect_HD.mp3']

// Arrays of jokes
var jokes = ["I'm afraid for the calendar. Its days are numbered.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "I don't trust those trees. They seem kind of shady.",
  "How do you get a squirrel to like you? Act like a nut.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I don't trust stairs. They're always up to something."
]

// Variables for voice and channel ids of bot
var voiceId = undefined;
var chanId = undefined

//words of encouragement function
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

// Message commands
client.on("messageCreate", async msg => {
  if (msg.author.bot) return

  if (msg.content.includes("test")) {
    msg.reply("ya :slight_smile:");
  }

  if (msg.content.includes("daddy")) {
    msg.reply("bruh");
  }

  //swear words censored
  if (swear.some(word => msg.content.includes(word))) {
    msg.delete();
    msg.channel.send("##CENSORED##");
  }

  // inspirational quote
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  // check if sad phrase added and respond
  if (sad.some(word => msg.content.includes(word))) {
    const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
    msg.reply(encouragement)
  }

  // React command
  if (msg.content.startsWith('!react')) {
    msg.channel.send('How You Feeling?').then((question) => {
      question.react('😀');
      question.react('😎');
      question.react('😭');
      question.react('😴');
      question.react('😡');
      question.react('😈');
    });
  }

  // Spam messages
  // start spam
  if (msg.content == "!spam") {

    console.log("going here")
    task.start();
  }
  // stop the spam
  if (msg.content == "!stop") {
    task.stop();
  }

  // Meme commands
  //sends a request to the meme reddit server to output a random meme on the discord server
  if (msg.content === "!meme") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
      console.log(JSON.parse(response.body))
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;

      //styles and sends the display of the meme on the chat (works only for pictures and gifs) and shows the upvotes on the post

      embedMeme.setTitle(`${memeTitle}`)
      embedMeme.setURL(`${memeUrl}`)
      embedMeme.setImage(memeImage)
      embedMeme.setColor('RED')
      embedMeme.setFooter(`UPVOTES ⬆️: ${memeUpvotes}`)

      msg.channel.send({ embeds: [embedMeme] })
    })
  }

  //sends a request to the wholesomememes reddit server to output a random wholesome meme on the discord server
  if (msg.content === "!wholesome") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/wholesomememes/random/.json').then(response => {
      console.log(JSON.parse(response.body))
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;

      embedMeme.setTitle(`${memeTitle}`)
      embedMeme.setURL(`${memeUrl}`)
      embedMeme.setImage(memeImage)
      embedMeme.setColor('RED')
      embedMeme.setFooter(`UPVOTES ⬆️: ${memeUpvotes}`)

      msg.channel.send({ embeds: [embedMeme] })
    })
  }

  //sends a request to the me_irl reddit server to output a random me_irl meme on the discord server
  if (msg.content === "!me_irl") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/me_irl/random/.json').then(response => {
      console.log(JSON.parse(response.body))
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;

      embedMeme.setTitle(`${memeTitle}`)
      embedMeme.setURL(`${memeUrl}`)
      embedMeme.setImage(memeImage)
      embedMeme.setColor('RED')
      embedMeme.setFooter(`UPVOTES ⬆️: ${memeUpvotes}`)

      msg.channel.send({ embeds: [embedMeme] })
    })
  }

  //sends a request to the gifs reddit server to output a random gif on the discord server
  if (msg.content === "!gifs") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/gifs/random/.json').then(response => {
      console.log(JSON.parse(response.body))
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;

      embedMeme.setTitle(`${memeTitle}`)
      embedMeme.setURL(`${memeUrl}`)
      embedMeme.setImage(memeImage)
      embedMeme.setColor('RED')
      embedMeme.setFooter(`UPVOTES ⬆️: ${memeUpvotes}`)

      msg.channel.send({ embeds: [embedMeme] })
    })
  }

  //sends a request to the itookapicture reddit server to output a random cool picture on the discord server
  if (msg.content === "!coolpics") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/itookapicture/random/.json').then(response => {
      console.log(JSON.parse(response.body))
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;

      embedMeme.setTitle(`${memeTitle}`)
      embedMeme.setURL(`${memeUrl}`)
      embedMeme.setImage(memeImage)
      embedMeme.setColor('RED')
      embedMeme.setFooter(`UPVOTES ⬆️: ${memeUpvotes}`)

      msg.channel.send({ embeds: [embedMeme] })
    })
  }

  // Summon bot into voice channel
  // Summon allows bot to join voice channel and play a greeting
  if (msg.content === "!summon") {
    voiceId = msg.guild.id // assigns voice channel ids for later use
    chanId = msg.member.voice.channel.id
    // join voice channel
    joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
      selfDeaf: false
    }).subscribe(player)

    let newGreeting = createAudioResource(__dirname + '\\audio_files' + '\\ohayo_noahahahaha.mp3');
    player.play(newGreeting)
  }

  // Hi response
  if (msg.content === "!hi") {
    msg.reply("How are you?");
  }

  // Tells current date
  if (msg.content === "!date") {
    msg.reply(currentDate.toLocaleString());

  }
})

// Speech commands
client.on("speech", (msg) => {
  console.log(msg.content)
  var newCmd = msg.content

  // Tell user a joke
  if (newCmd === "tell me a joke" || newCmd === "joke") {
    let stream = discordTTS.getVoiceStream("Ok." + jokes[Math.floor(Math.random() * jokes.length)]);
    let newJoke = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true })
    player.play(newJoke)
  }

  // Choose a random sound from array and play it
  if (newCmd === "make a sound" || newCmd === "sound") {
    let newSound = createAudioResource(__dirname + '\\audio_files' + sounds[Math.floor(Math.random() * sounds.length)]); // create an audio resource
    player.play(newSound) // use audio player to play it
  }

  // Leave voice channel
  if (newCmd === "goodbye" || newCmd === "leave") {
    let stream = discordTTS.getVoiceStream("Goodbye!");
    let newExit = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true })
    player.play(newExit)
    getVoiceConnection(voiceId).disconnect()
  }

  // Sends message to author of message (testing purposes)
  // // verify so no error is caused
  // if (newCmd !== undefined && newCmd !== "") {
  //   msg.author.send(newCmd);
  // }
});

// Logs client in (turn bot on)
client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");
