const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const fetch = require("node-fetch")


//Array of negative words to be encouraged
const sad =["sad", "depressed", "unhappy", "angry", "miserable","anxious","nervous", "broken","bad", "cry","tired"]


//Array of swear words to be censored
const swear = ["arse", "ass", "asshole", "bastard", "bitch", "bollocks","brotherfucker","bugger","bullshit","child-fucker","cocksucker","crap","cunt","damn","effing","fatherfucker","frigger","fuck","goddam","godsdamn","hell","holy shit","horseshit","Jesus fuck","Jesus Christ","motherfucker","nigga","nigger","prick","shit","shit ass","sisterfucker","slut","son of a bitch","son of a whore","twat"]


encouragements = ["Cheer up!:slight_smile:","Hang in there:slight_smile:", "Come on! You can do it!:slight_smile:", "Keep fighting!:slight_smile:", "Don't give up:slight_smile:", "That's rough buddy:slight_smile:"]




client.on("guildCreate", guild => {
  guild.owner.send("Hello. Welcome!")
});







//emojis
client.on("message", msg => {


  if(msg.content.includes("test")) {
    msg.reply("ya :slight_smile:");
  }

  if(msg.content.includes("daddy")) {
    msg.reply("bruh");
  }

  //swear words censored

  if (swear.some(word => msg.content.includes(word))){
    
    msg.delete();
    msg.channel.send("##CENSORED##");
  }

})

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

client.on("message", msg => {
  if (msg.author.bot) return
    
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  if (sad.some(word => msg.content.includes(word))){
    const encouragement = encouragements[Math.floor(Math.random()*encouragements.length)]
    msg.reply(encouragement)

  }


})

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");