const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "scan",
  aliases: ["Scan", "scan", "SCAN"],
  description: "To use scan",
  usage: "scan",
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
    const update = db.fetch(`updateInProgress`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet, type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else {
      if (message.author.id == "768747976767832084" && user) {
        const uselessUsageOfCommand =
          db.fetch(`uselessUsageOfCommand_${tokenDB}`) || 0;
        const usefulUsageOfCommand =
          db.fetch(`usefulUsageOfCommand_${tokenDB}`) || 0;
        const scanUserEmbed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s COMPLETE DETAILS`)
          .setDescription(
            `
User id : ${user.id}
Username : ${user.username}
Token : ${tokenDB}
Useless command usage : ${uselessUsageOfCommand}
Useful command usage :  ${usefulUsageOfCommand}
Banned? : ${banned}
`
          );
        message.channel.send("User scan embed sent to your dms");
        message.author.send(scanUserEmbed);
      }
    }
  },
};
