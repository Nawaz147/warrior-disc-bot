const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");

module.exports = {
  name: "eventStart",
  aliases: ["es"],
  description: "To start an event",
  usage: "eventStart",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);

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
    } else {
      if (message.author.id == "768747976767832084") {
        var eventName = args[0];

        if (eventName == "valorium") {
          db.set(`valoriumEventStarted`, false);
          message.channel.send(`Valorium event is now started`);
        }
      }
    }
  },
};
