const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

const fetch = require("node-fetch")

const sad =["sad", "depressed", "unhappy", "angry", "miserable"]


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//swear, inappropriate words to delete
client.on("message", msg => {


  if(msg.content.includes("test")) {
    msg.reply("ya");
  }

  if(msg.content.includes("daddy")) {
    msg.reply("bruh ;)");
  }

  if(msg.content.includes("fuck")) {
    msg.clear();
    msg.reply("No swear words allowed, sorry bruv!");
  }








})



function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return
    
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  







})

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");