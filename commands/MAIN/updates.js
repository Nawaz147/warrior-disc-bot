const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarusDamage = require("../../weaponStats/texarusStaff.json");

module.exports = {
  name: "updates",
  aliases: [],
  description: "To check recent update done",
  usage: "updates",
  category: "updates",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
    const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Techz token is not registered yet , type .t token me to set your Techz token`
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
      const updatesEmbed = new Discord.MessageEmbed()
        .setTitle("Updates")
        .setDescription(
          `
-------------------------------------------
**CONTENT UPDAATE (1 AUG 2023)**  
**+** User info option added (+info)
**+** New achievements added (+aps)
**+** Bug fixes
-------------------------------------------
**CONTENT UPDAATE (31 JULY 2023)**
**+** Inventory added
**+** New mode added (+farm hit)
**+** You can now craft vanities (+craft) for more info
**+** Crafting inventory added (+inv craft)
-------------------------------------------
**CONTENT UPDAATE (30 JULY 2023)**
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
