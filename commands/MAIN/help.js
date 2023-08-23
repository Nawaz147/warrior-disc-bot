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
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true && !message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`Your account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (banned == true && message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`That user's account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (update == true && message.author.id !== "768747976767832084") {
      const updateInProgressEmbed = new Discord.MessageEmbed()
        .setTitle(`Temporary Command Suspension`)
        .setDescription(
          `
Sorry ${currentUser.username} , commands are disabled at the moment.
The bot is currently undergoing an update. Please be patient!          
`
        )
        .setColor("#3498db")
        .setTimestamp();
      message.channel.send(updateInProgressEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && !message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
You need to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service.
Type **+tos accept** to accept the terms of service.
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
${user.username} has not yet accepted the terms of service
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else {
      const tosEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
          `For getting command list and promocodes , go on : https://valorium8.web.app`
        )
        .setColor("#ffff00");
      message.channel.send(tosEmbed);
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
    }
  },
};
