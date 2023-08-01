const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
module.exports = {
  name: "stopBot",
  aliases: ["sb"],
  description: "to stop bot",
  usage: "stopBot",
  category: "Economy",
  run: async (client, message, args) => {
    if (message.author.id == "768747976767832084") {
      console.log("Bot has stopped !");
      process.exit(1);
    }
  },
};
