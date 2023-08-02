const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const { Timestamp } = require("mongodb");
module.exports = {
  name: "ban",
  aliases: ["banUser", "ba", "Ban"],
  description: "To ban someone from Valorium economy",
  usage: "ban",
  category: "Economy",
  run: async (client, message, args) => {
    if (message.author.id == "768747976767832084") {
      let user =
        message.mentions.users.first() || client.users.cache.get(args[0]);
      const tokenDB = db.fetch(`${user.id}.valoriumToken`);
      const banned = db.fetch(`banned_${tokenDB}`);
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let fullDate = `${day}.${month}.${year}.`;
      if (!user) {
        return message.channel.send(
          "Please mention a user account to ban from Valorium economy"
        );
      }
      let reason = args.slice(1).join(" ");
      if (banned == true) {
        message.channel.send(`This user is already banned`);
      } else if (!reason) {
        message.channel.send("Please provide a reason");
      } else if (user && reason) {
        db.set(`reasonForBan_${tokenDB}`, reason);
        db.set(`banned_${tokenDB}`, true);
        db.set(`banDate_${tokenDB}`, fullDate);
        message.channel.send(
          `
You banned <@${user.id}>'s account from Valorium economy for - ${reason}
Date : ${fullDate} 
`
        );
        const bannedEmbed = new Discord.MessageEmbed()
          .setTitle("ACCOUNT BANNED !!")
          .setDescription(
            `
You have been banned From Valorium Economy |
Reason : ${reason} |
Banned by : <@${message.author.id}> |
`
          )
          .setTimestamp()
          .setColor("#FF0000");
        user.send(bannedEmbed);
      }
    } else {
      message.channel.send(
        "What the heck ? You cannot ban anyone from Valorium economy"
      );
    }
  },
};
