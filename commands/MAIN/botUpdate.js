const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");

module.exports = {
  name: "update",
  aliases: ["Update"],
  description: "To start an update or stop an update",
  usage: "update",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type Valorium token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else {
      if (message.author.id == "768747976767832084") {
        var updateStart = "start";
        var updateEnd = "end";
        if (args[0] == updateStart) {
          db.set(`updateInProgress`, true);
          message.channel.send(`Bot Update started`);
        }
        if (args[0] == updateEnd) {
          db.set(`updateInProgress`, false);
          message.channel.send(`Bot Update ended`);
        }
      }
    }
  },
};
