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
        const alreadyHaveEmbed = new Discord.MessageEmbed()
          .setDescription(
            `
You already have it.
  `
          )
          .setColor("#b10000");
        message.channel.send(alreadyHaveEmbed);
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        db.add(`ventorianBow_${tokenDB}`, 1);
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setTitle("Your free weapon")
          .setDescription("You received : Ventorian bow of ventor !")
          .setColor("#00FF00");
        message.channel.send(ventorianBowEmbed);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        setTimeout(() => {
          const guide3Embed = new Discord.MessageEmbed()
            .setTitle("Guide")
            .setDescription(
              `
Type equip ventorianBow.v,
Type play hit.v to play event,
example : react down of the embed to hit boss after typing play hit.v
Every hit boss life decreases as per your weapon damage,
For commands list and promocodes go to our website : https://valorium8.web.app
`
            )
            .setFooter(`Good luck`)
            .setColor(`#0000FF`);
          message.channel.send(guide3Embed);
        }, 1500);
      }
    }
  },
};
