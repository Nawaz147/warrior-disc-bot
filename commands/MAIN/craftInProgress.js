const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "craftInProgress",
  aliases: ["craftinprogress", "cip", "CIP"],
  description: "To check craft in progress",
  usage: "craftInProgress",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const now = Date.now();
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
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
