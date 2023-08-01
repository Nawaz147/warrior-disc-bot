const Discord = require("discord.js");
const db = require("quick.db");
const colors = require("../../colors.json");
module.exports = {
  name: "getWeapon",
  aliases: ["GW", "gw", "Gw", "gW"],
  description: "To get free weapon",
  usage: "getWeapon",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Warrior Legends token is not registered yet , type +token me to set your Warrior Legends token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      if (db.fetch(`ventorianBow_${tokenDB}`)) {
        message.channel.send("You already have it !");
      } else {
        db.add(`ventorianBow_${tokenDB}`, 1);
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setTitle("Your free weapon")
          .setDescription("You received : Ventorian bow of ventor !")
          .setColor("#00FF00");
        message.channel.send(ventorianBowEmbed);
      }
    }
  },
};
