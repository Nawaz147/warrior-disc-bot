const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

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
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const promoCodes = ["E9XPO3", "GZ3POV", "D4CO9E", "PXLTO8", "42X0ED"];
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
            var promocodeReedemedEmbed = new Discord.MessageEmbed()
              .setTitle("Promocode redeemed (E9XPO3)")
              .setDescription(`You received : 5 Eite awakening gems`)
              .setColor(`#00FF00`);
            message.channel.send(promocodeReedemedEmbed);
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "GZ3POV":
            // Give 5 awakening gems to user
            db.add(`awakeningGem_${tokenDB}`, 5);
            var promocodeReedemedEmbed = new Discord.MessageEmbed()
              .setTitle("Promocode redeemed (GZ3POV)")
              .setDescription(`You received : 5 Awakening gems`)
              .setColor(`#00FF00`);
            message.channel.send(promocodeReedemedEmbed);
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "D4CO9E":
            // Give 500,000 Gold Points to user
            db.add(`money_${tokenDB}.pocket`, 500000);
            var promocodeReedemedEmbed = new Discord.MessageEmbed()
              .setTitle("Promocode redeemed (D4CO9E)")
              .setDescription(`You received : 500,000 Gold coins`)
              .setColor(`#00FF00`);
            message.channel.send(promocodeReedemedEmbed);
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "42X0ED":
            // Give 500,000 Gold Points to user
            var promocodeReedemedEmbed = new Discord.MessageEmbed()
              .setTitle("Promocode redeemed (42X0ED)")
              .setDescription(`You received : 3 soldiers`)
              .setColor(`#00FF00`);
            message.channel.send(promocodeReedemedEmbed);
            db.add(`soldiers_${tokenDB}`, 3);
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          case "PXLTO8":
            // Give 100 ruix to user
            var promocodeReedemedEmbed = new Discord.MessageEmbed()
              .setTitle("Promocode redeemed (PXLTO8)")
              .setDescription(
                `You received : 100 ruix <a:ruix:1153892039742726246>`
              )
              .setColor(`#00FF00`);
            message.channel.send(promocodeReedemedEmbed);
            db.add(`ruix_${tokenDB}`, 100);
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            break;
          default:
            break;
        }
      } else {
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        var invalidEmbed = new Discord.MessageEmbed()
          .setDescription(`Invalid promo code`)
          .setColor(`#b10000`);
        message.channel.send(invalidEmbed);
      }
    }
  },
};
