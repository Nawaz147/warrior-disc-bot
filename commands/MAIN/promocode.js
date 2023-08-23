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
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true && !message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`Your account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (banned == true && message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`That user's account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (update == true && message.author.id !== "768747976767832084") {
      const updateInProgressEmbed = new Discord.MessageEmbed()
        .setTitle(`Temporary Command Suspension`)
        .setDescription(
          `
Sorry ${currentUser.username} , commands are disabled at the moment.
The bot is currently undergoing an update. Please be patient!          
`
        )
        .setColor("#3498db")
        .setTimestamp();
      message.channel.send(updateInProgressEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && !message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
You need to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service.
Type **+tos accept** to accept the terms of service.
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
${user.username} has not yet accepted the terms of service
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else {
      const promoCodes = ["E9XPO3", "GZ3POV", "D4CO9E", "PXLTO8"];
      const code = args[0]?.trim();
      if (!code) {
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        return message.channel.send("Please provide a promo code.");
      }

      if (promoCodes.includes(code)) {
        const usedCodes = db.fetch(`usedPromoCodes_${tokenDB}`) || [];

        if (usedCodes.includes(code)) {
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          return message.channel.send("You have already used this promo code");
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
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "GZ3POV":
            // Give 5 awakening gems to user
            db.add(`awakeningGem_${tokenDB}`, 5);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 5 awakening gems.`
            );
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "D4CO9E":
            // Give 500,000 Gold Points to user
            db.add(`money_${tokenDB}.pocket`, 500000);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 500,000 Gold Points.`
            );
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "PXLTO8":
            // Give 100 platinum to user
            db.add(`platinum_${tokenDB}`, 100);
            message.channel.send(
              `Congratulations! You have successfully redeemed the promo code and received 100 platinum.`
            );
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          default:
            break;
        }
      } else {
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        return message.channel.send("Invalid promo code.");
      }
    }
  },
};
