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
**CONTENT UPDATE (14 AUG 2023)**  
**+** New weapon added 'Dagger of death' (can be levelled up)
**+** Bug fixes
**+** Chances increased of getting good items in event
**+** Dagger of death added to loot table in event and locked crate of energy
-------------------------------------------
**CONTENT UPDATE (6 AUG 2023)**  
**+** Sell option added [+sell (itemID) (Number of pieces to sell)]
**+** Attack option added [+shoot (user)]
-------------------------------------------
**CONTENT UPDATE (5 AUG 2023)**  
**+** Inventory bug fixed
-------------------------------------------
**CONTENT UPDATE (4 AUG 2023)**  
**+** Normal inventory sections added (react to go next page)
-------------------------------------------
**CONTENT UPDATE (3 AUG 2023)**  
**+** Added new store in which only platinum purchases (+store)
**+** Added new crate "Locked crate of energy" to the store
**+** Bug fixes
-------------------------------------------
**CONTENT UPDATE (2 AUG 2023)**  
**+** Nerfed Ventorian Bow of ventor
**+** Nerfed Texarus the demonished staff
**+** Nerfed Waetra the freezed bow
**+** Nerfed Rasheta the furious axe
**+** Nerfed Nature daggers of superpower
**+** Nerfed Immortal gun of energy
**+** Spam cooldown reduced to 1.2 seconds from 1.5 seconds
**+** Bot logo changed
**+** Bot name changed
**+** Promo codes added (check our website : https://valorium8.web.app)
-------------------------------------------
**CONTENT UPDATE (1 AUG 2023)**  
**+** User info option added (+info)
**+** New achievements added (+aps)
**+** Bug fixes
-------------------------------------------
**CONTENT UPDATE (31 JULY 2023)**
**+** Inventory added
**+** New mode added (+farm hit)
**+** You can now craft vanities (+craft) for more info
**+** Crafting inventory added (+inv craft)
-------------------------------------------
**CONTENT UPDATE (30 JULY 2023)**
**+** Bot logo changed
**+** Bot name changed
**+** Design changes
**+** Gold loot awakening option added (+awake / +awake elite)
**+** Bug fixes
**+** Added captcha verification to stop botting
-------------------------------------------
        `
        )
        .setColor("#ffffff")
        .setTimestamp();
      message.channel.send(updatesEmbed);
    }
  },
};
