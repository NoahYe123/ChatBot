const Discord = require("discord.js") // import discord.js dependency
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice') // import voice channel dependency

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }) // create a new discord server/bot client
//adding comement
//danny comments

// Print message when bot is ready
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Voice channel commands
const player = createAudioPlayer(); // create audio player for new options
client.on("messageCreate", msg => {
  if (msg.content === "!joinChannel") {
    // join voice channel
    joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator
    }).subscribe(player)
  }
  
  // random sound commands
  var sounds = ['\\Onii_Chan_-_Sound_Effect.mp3', '\\UwU_-_SOUND_EFFECT.mp3', '\\Fortnite_Death_-_Sound_Effect_HD.mp3', '\\Fortnite_default_dance_sound.mp3', '\\Fortnite_Shield_Potion_Fortnite_Battle_Royale_-_Gaming_Sound_Effect_HD_-_Sound_Effects.mp3']
  if (msg.content === "!randomSound") {
    let newSound = createAudioResource(__dirname + '\\audio_files' + sounds[Math.floor(Math.random() * sounds.length)]);
    player.play(newSound)
  }

})

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");