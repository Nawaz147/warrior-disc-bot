const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const e = require("express");
const prices = require("../../prices.json");
const moneyCap = config.moneyCap;
module.exports = {
  name: "help",
  aliases: ["Help", "HELP"],
  description: "To get commands",
  usage: "help",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`update_${tokenDB}`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;

    if (!tokenDB) {
      message.channel.send(
        `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else if (acceptedTOS == false) {
      message.channel.send(
        `
${user.username} needs to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service 
Type **+tos accept** to accept the terms of service        
`
      );
    } else {
      const tosEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
          `For getting command list and promocodes , go on : https://valorium8.web.app`
        )
        .setColor("#ffff00");
      message.channel.send(tosEmbed);
    }
  },
};
