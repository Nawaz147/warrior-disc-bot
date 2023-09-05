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
**CONTENT UPDATE (5 SEP 2023)**        
**+** Added comma values to valorium boss embed and Eldra'zur, the Abyssal Tyrant boss embed
**+** Monarch slayer title added to loot table in premium key zone
**+** Monarch slayer title can be opened by typing (+open monarchSlayerTitle)
**+** Monarch slayer title can be equipped by typing (+equip title monarchSlayer)
-------------------------------------------
**CONTENT UPDATE (4 SEP 2023)**        
**+** New zone added (+damage hit) , key required to enter
-------------------------------------------
**CONTENT UPDATE (3 SEP 2023)**        
**+** Added soldier to loot table
**+** Added event preview option (+event)
**+** Added new promocode (42XOED) [gives 3 soldiers]
-------------------------------------------
**CONTENT UPDATE (2 SEP 2023)**        
**+** Valorium event started
**+** Bug fixes
-------------------------------------------
**CONTENT UPDATE (1 SEP 2023)**        
**+** Added icons for each item 
**+** Added option to sell trash items by typing (+sell trashItems)
**+** Designed sell embed
**+** Made Dagger of death sellable
**+** Changed inventory reaction to icons
-------------------------------------------
        `
        )
        .setColor("#ffffff")
        .setTimestamp();
      message.channel.send(updatesEmbed);
    }
  },
};
