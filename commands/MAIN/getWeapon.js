const Discord = require("discord.js");
const db = require("quick.db");
const colors = require("../../colors.json");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "getWeapon",
  aliases: ["GW", "gw", "Gw", "gW"],
  description: "To get free weapon",
  usage: "getWeapon",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      if (db.fetch(`ventorianBow_${tokenDB}`)) {
        message.channel.send("You already have it !");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        db.add(`ventorianBow_${tokenDB}`, 1);
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setTitle("Your free weapon")
          .setDescription("You received : Ventorian bow of ventor !")
          .setColor("#00FF00");
        message.channel.send(ventorianBowEmbed);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      }
    }
  },
};
