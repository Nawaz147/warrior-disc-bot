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
**CONTENT UPDATE (19 SEP 2023)**        
**+** The bot suffix changed to .x (eg : bal.x)
**+** Bot logo changed
-------------------------------------------
**CONTENT UPDATE (18 SEP 2023)**        
**+** Bug fixes
**+** Inventory reaction slight logic change
-------------------------------------------
**CONTENT UPDATE (17 SEP 2023)**        
**+** Bug fixes
**+** Preparing for new event
**+** Vanities can now be sold for full price without affecting networth
-------------------------------------------
**CONTENT UPDATE (16 SEP 2023)**        
**+** React to kill boss launched !!
-------------------------------------------
        `
        )
        .setColor("#ffffff")
        .setThumbnail(``);
      message.channel.send(updatesEmbed);
    }
  },
};
