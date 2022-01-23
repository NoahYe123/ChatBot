import { createRequire } from "module";
const require = createRequire(import.meta.url);

const Discord = require("discord.js")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

import got from 'got'

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', message => {
  if (message.content === "!meme") {
    const embedMeme = new Discord.MessageEmbed()
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
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

      message.channel.send({ embeds: [embedMeme] })
    })
  }
})

client.on('messageCreate', message => {
  if (message.content === "!wholesome") {
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

      message.channel.send({ embeds: [embedMeme] })
    })
  }
})