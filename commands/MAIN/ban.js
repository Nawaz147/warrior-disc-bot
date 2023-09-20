const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const { Timestamp } = require("mongodb");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "ban",
  aliases: ["banUser", "ba", "Ban"],
  description: "To ban someone from Rune warden Discord bot",
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
      let reason = args.slice(1).join(" ");
      if (!user) {
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        return message.channel.send(
          "Please mention a user account to ban from Rune warden Discord bot"
        );
      } else if (banned == true) {
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        message.channel.send(`This user is already banned`);
      } else if (!reason) {
        message.channel.send("Please provide a reason");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (user && reason) {
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        db.set(`reasonForBan_${tokenDB}`, reason);
        db.set(`banned_${tokenDB}`, true);
        db.set(`banDate_${tokenDB}`, fullDate);
        const bannedUserEmbed = new Discord.MessageEmbed()
          .setDescription(
            `
You banned ${user} from Rune warden discord bot
`
          )
          .setColor(`#8B0000`)
          .setFooter(`Reason : ${reason}`);
        message.channel.send(bannedUserEmbed);
        db.add(`bannedCount_${tokenDB}`, 1);
        const bannedEmbed = new Discord.MessageEmbed()
          .setTitle("ACCOUNT BANNED !!")
          .setDescription(
            `
You have been banned From Rune warden Discord bot |
Reason : ${reason} |
Banned by : <@${message.author.id}> |
`
          )
          .setTimestamp()
          .setColor("#8B0000");
        user.send(bannedEmbed);
      }
    } else {
      return;
    }
  },
};
