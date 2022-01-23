
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on("ready", () => {


  console.log(`Logged in as ${client.user.tag}!`)
});


const cron = require('node-cron');
var morining = cron.schedule(" 0 8 * * *", () => {
  channel = client.channels.cache.get("934293745187315715");
  channel.send("Good Morning! Hope You Have A Great Day");
}, {
  scheduled: true,
  timezone: "EST"
});

var morining = cron.schedule(" 15 0 * * *", () => {
  channel = client.channels.cache.get("934293745187315715");
  channel.send("Go to sleep! It's getting late!");
}, {
  scheduled: true,
  timezone: "EST"
});

// for spamming function
var task = cron.schedule("* * * * * *", () => {
  channel = client.channels.cache.get("934293745187315715");
  channel.send("spam");
}, {
  scheduled: false,
  timezone: "EST"
});


client.on("message", msg => {


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

  if (msg.content == "spam") {
    task.start();
  }

  if (msg.content == "stop") {
    task.stop();
  }

  if (msg.content === "ping") {
    msg.reply("pong");
  }
  if (msg.content === "hi") {
    msg.reply("How are you");
  }

  if (msg.content === "Date") {
    msg.reply(currentDate.toLocaleString());
  }

  if (msg.content === "p") {
    const botInfo = new Discord.MessageEmbed()
      .setDescription('[Click here!](https://support.discord.com/hc/en-us/community/posts/360038398572-Hyperlink-Markdown)')

    msg.channel.send(botInfo.description);
  }

})

client.login("OTM0MjkyODI0MzMyMDc1MDg4.Yet9_w.-tIhTkimADEwQLS6JIbLKyELnak");