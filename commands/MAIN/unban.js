const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const { Timestamp } = require("mongodb");
module.exports = {
  name: "unban",
  aliases: ["UnbanUser", "ub", "Unban", "liftBan"],
  description: "To unban someone from Oyo economy",
  usage: "unban",
  category: "Economy",
  run: async (client, message, args) => {
    if (message.author.id == "768747976767832084") {
      let user =
        message.mentions.users.first() || client.users.cache.get(args[0]);
      if (!user) {
        return message.channel.send(
          "Please mention a user account to unban from Oyo economy"
        );
      }
      const tokenDB = db.fetch(`${user.id}.oyOtoken`);

      if (user) {
        if (db.fetch(`banned_${tokenDB}`) == false) {
          message.channel.send(`This user is not banned !`);
        } else {
          db.set(`banned_${tokenDB}`, false);
          message.channel.send(`You unbanned <@${user.id}>'s account `);
          const bannedEmbed = new Discord.MessageEmbed()
            .setTitle("ACCOUNT UNBANNED !!")
            .setDescription(
              `
| You have been unbanned From Oyo Economy |
| Unbanned by : <@${message.author.id}> |
        `
            )
            .setTimestamp()
            .setColor("#FF0000");
          user.send(bannedEmbed);
        }
      }
    } else {
      message.channel.send(
        "What the heck ? You cannot unban anyone from Oyo economy"
      );
    }
  },
};
