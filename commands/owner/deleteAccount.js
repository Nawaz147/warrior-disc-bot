const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const { Timestamp } = require("mongodb");
module.exports = {
  name: "deleteAcc",
  aliases: ["da", "Da", "DA"],
  description: "To ban someone from Oyo economy",
  usage: "da",
  category: "Economy",
  run: async (client, message, args) => {
    if (message.author.id == "768747976767832084") {
      let user =
        message.mentions.users.first() || client.users.cache.get(args[0]);
      if (!user) {
        return message.channel.send(
          "Please mention a user account to delete from Oyo economy"
        );
      }
      const tokenDB = db.fetch(`${user.id}.oyOtoken`);
      const reason = args[1];
      if (!reason) {
        message.channel.send("Please provide a reason");
      }

      if (user && reason) {
        db.delete(`${user.id}.oyOtoken`);
        message.channel.send(
          `You deleted <@${user.id}>'s account from Valorium discord bot for - ${reason}`
        );
        const DeletedEmbed = new Discord.MessageEmbed()
          .setTitle("ACCOUNT DELETED !!")
          .setDescription(
            `| Your account has been deleted from Valorium discord bot |
             | Reason : ${reason} |
             | Deleted by : <@${message.author.id}> |
        `
          )
          .setTimestamp()
          .setColor("#FF0000")
          .setFooter("This is UNREVERSABLE");
        user.send(DeletedEmbed);
      }
    } else {
      return;
    }
  },
};
