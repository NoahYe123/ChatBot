const Discord = require("discord.js") // import discord.js dependency
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice') // import voice channel dependency
const { addSpeechEvent } = require('discord-speech-recognition') // import speech recognition dependency

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
              '\\Fortnite_Shield_Potion_Fortnite_Battle_Royale_-_Gaming_Sound_Effect_HD_-_Sound_Effects.mp3']

// variable for voice id of bot
var voiceId = undefined;

// Message commands
client.on("messageCreate", msg => {
  // Summon allows bot to join voice channel
  if (msg.content === "!summon") {
    voiceId = msg.guild.id // assigns guild id for later use
    // join voice channel
    joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
      selfDeaf: false
    }).subscribe(player)
  }
})

// Speech commands
client.on("speech", (msg) => {
  console.log(msg.content)
  var newCmd = msg.content

  // Greeting
  if (newCmd === "hello bot") {
    let newGreeting = createAudioResource(__dirname + '\\audio_files' + '\\ohayo_noahahahaha.mp3');
    player.play(newGreeting)
  }
  // Choose a random sound from array and play it
  if (newCmd === "play a random sound" || newCmd === "random sound") {
    let newSound = createAudioResource(__dirname + '\\audio_files' + sounds[Math.floor(Math.random() * sounds.length)]); // create an audio resource
    player.play(newSound) // use audio player to play it
  }

  // Leave voice channel
  if (newCmd === "leave channel" || newCmd === "goodbye") {
    getVoiceConnection(voiceId).disconnect()
  }

  // Sends message to author of message
  // // verify so no error is caused
  // if (newCmd !== undefined && newCmd !== "") {
  //   msg.author.send(newCmd);
  // }
});

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");