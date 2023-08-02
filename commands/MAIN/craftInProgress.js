const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "craftInProgress",
  aliases: ["craftinprogress", "cip", "CIP"],
  description: "To check craft in progress",
  usage: "craftInProgress",
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
    const now = Date.now();

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
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      const craftingTime = db.fetch(`crafting_${tokenDB}`);
      const craftingItem = db.fetch(`craftingItem_${tokenDB}`);
      if (!craftingTime || !craftingItem) {
        message.channel.send(`You don't have any craft in progress.`);
      } else {
        const timeLeft = ms(craftingTime - now);
        const timeLeftFormatted = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;

        const inProgressEmbed = new Discord.MessageEmbed()
          .setTitle(`Craft in Progress`)
          .setDescription(`You are currently crafting the ${craftingItem} set.`)
          .addField("Time Left", timeLeftFormatted, true)
          .setColor("#ffffff");

        message.channel.send(inProgressEmbed);
      }
    }
  },
};
