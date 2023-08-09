const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "promocode",
  aliases: ["pc", "promoCode", "promo"],
  description: "To use promocode",
  usage: "promocode",
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
      const promoCodes = ["E9XPO3", "GZ3POV", "D4CO9E", "PXLTO8"];
      const code = args[0]?.trim();
      if (!code) {
        return message.channel.send("Please provide a promo code.");
      }

      if (promoCodes.includes(code)) {
        const usedCodes = db.fetch(`usedPromoCodes_${tokenDB}`) || [];

        if (usedCodes.includes(code)) {
          return message.channel.send("This promo code has already been used.");
        }

        // Add the code to the used codes list for this user
        usedCodes.push(code);
        db.set(`usedPromoCodes_${tokenDB}`, usedCodes);

        // Handle rewards based on the promo code
        switch (code) {
          case "E9XPO3":
            // Give 5 elite awakening gems to user
            db.add(`eliteAwakeningGem_${tokenDB}`, 5);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 5 elite awakening gems.`
            );
            break;
          case "GZ3POV":
            // Give 5 awakening gems to user
            db.add(`awakeningGem_${tokenDB}`, 5);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 5 awakening gems.`
            );
            break;
          case "D4CO9E":
            // Give 500,000 Gold Points to user
            db.add(`money_${tokenDB}.pocket`, 500000);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 500,000 Gold Points.`
            );
            break;
          case "PXLTO8":
            // Give 100 platinum to user
            db.add(`platinum_${tokenDB}`, 100);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 100 platinum.`
            );
            break;
          default:
            break;
        }
      } else {
        return message.channel.send("Invalid promo code.");
      }
    }
  },
};
