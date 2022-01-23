const Discord = require("discord.js") // import discord.js dependency
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice') // import voice channel dependency
const { addSpeechEvent } = require('discord-speech-recognition') // import speech recognition dependency
const discordTTS = require("discord-tts") // discord text to speech

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }) // create a new discord server/bot client
//adding comement
//danny comments

// Print message when bot is ready
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const player = createAudioPlayer(); // create audio player for new options
addSpeechEvent(client); // set up speech recognition

// Random sound array
var sounds = ['\\Onii_Chan_-_Sound_Effect.mp3',
  '\\UwU_-_SOUND_EFFECT.mp3',
  '\\Fortnite_Death_-_Sound_Effect_HD.mp3',
  '\\Fortnite_default_dance_sound.mp3',
  '\\Fortnite_Shield_Potion_Fortnite_Battle_Royale_-_Gaming_Sound_Effect_HD_-_Sound_Effects.mp3',
  '\\Roblox_Death_Sound_-_Sound_Effect_HD.mp3']

var jokes = ["I'm afraid for the calendar. Its days are numbered.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "I don't trust those trees. They seem kind of shady.",
  "How do you get a squirrel to like you? Act like a nut.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "I don't trust stairs. They're always up to something."
]
// variable for voice id of bot
var voiceId = undefined;
var chanId = undefined

// Message commands
client.on("messageCreate", async msg => {
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


client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");
