const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const prices = require("../../prices.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "help",
  aliases: ["Help", "HELP"],
  description: "To get commands",
  usage: "help",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const tosEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setDescription(
          `For getting command list and promocodes , go on : https://mysterionix6.web.app`
        )
        .setColor("#ffff00");
      message.channel.send(tosEmbed);
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
    }
  },
};
