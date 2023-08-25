const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const { Timestamp } = require("mongodb");
module.exports = {
  name: "unban",
  aliases: ["UnbanUser", "ub", "Unban", "liftBan"],
  description: "To unban someone from Valorium economy",
  usage: "unban",
  category: "Economy",
  run: async (client, message, args) => {
    if (message.author.id == "768747976767832084") {
      let user =
        message.mentions.users.first() || client.users.cache.get(args[0]);
      if (!user) {
        return message.channel.send(
          "Please mention a user account to unban from Valorium economy"
        );
      }
      const tokenDB = db.fetch(`${user.id}.valoriumToken`);

      if (user) {
        if (db.fetch(`banned_${tokenDB}`) == false) {
          message.channel.send(`This user is not banned !`);
        } else {
          var banReason = db.fetch(`reasonForBan_${tokenDB}`);
          var banDate = db.fetch(`banDate_${tokenDB}`);
          var currentUserToken = db.fetch(`${user.id}.valoriumToken`);
          db.set(`banned_${tokenDB}`, false);
          const unbannedEmbed = new Discord.MessageEmbed()
            .setTitle("Revoked Ban")
            .setDescription(`${user.username}'s account has been unbanned`)
            .addField("Reason", `${banReason}`)
            .addField("Date", `${banDate}`)
            .setColor("#00FF00");
          message.channel.send(unbannedEmbed);
          db.add(`usefulUsageOfCommand_${currentUserToken}`, 1);
          const bannedEmbed = new Discord.MessageEmbed()
            .setTitle("ACCOUNT UNBANNED !!")
            .setDescription(
              `
🔓 Unbanned: Back to Valorium Economy
👤 Unbanned by: <@${message.author.id}>
              `
            )
            .setTimestamp()
            .setColor("#00FF00");
          user.send(bannedEmbed);
        }
      }
    } else {
      return;
    }
  },
};
