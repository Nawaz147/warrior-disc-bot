const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarusDamage = require("../../weaponStats/texarusStaff.json");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "updates",
  aliases: [],
  description: "To check recent update done",
  usage: "updates",
  category: "updates",
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
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      const updatesEmbed = new Discord.MessageEmbed()
        .setTitle("Updates")
        .setDescription(
          `
-------------------------------------------
**CONTENT UPDATE (26 SEP 2023)**
**+** Trade command added (trade [itemID] [amountOfItem] [moneyRequested] [mentionUserToBeTradedWith].x)
-------------------------------------------
        `
        )
        .setColor("#ffffff")
        .setThumbnail(``);
      message.channel.send(updatesEmbed);
    }
  },
};
