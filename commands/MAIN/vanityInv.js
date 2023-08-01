// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
// const waetraDamage = require("../../weaponStats/waetraBow.json");
// const texarusDamage = require("../../weaponStats/texarusStaff.json");

// module.exports = {
//   name: "vanityInv",
//   aliases: ["VanityInv", "VI", "vi"],
//   description: "To check recent update done",
//   usage: "vanityInv",
//   category: "vanityInv",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//     const banDate = db.fetch(`banDate_${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
//       );
//     } else if (banned == true) {
//       const banEmbed = new Discord.MessageEmbed()
//         .setTitle(user)
//         .setDescription(`This account is banned`)
//         .addField("Reason", `${banReason}`)
//         .addField("Date", `${banDate}`)
//         .setColor("#FFFF00");
//       message.channel.send(banEmbed);
//     } else if (update == true) {
//       message.channel.send(
//         `You cannot use any commands right now! Bot is updating`
//       );
//     } else {
//       var goldenGhostKnightSet = db.fetch(`goldenGhostKnightSet_${tokenDB}`);
//       if (goldenGhostKnightSet == null) {
//         goldenGhostKnightSet = "0";
//       }
//       var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
//       if (medusaSet == null) {
//         medusaSet = "0";
//       }
//       var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
//       if (intrepidSet == null) {
//         intrepidSet = "0";
//       }
//       var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
//       if (arcaneSenseiSet == null) {
//         arcaneSenseiSet = "0";
//       }
//       var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
//       if (frozenSet == null) {
//         frozenSet = "0";
//       }
//       var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
//       if (dawnfireSet == null) {
//         dawnfireSet = "0";
//       }
//       var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
//       if (supremeMagicalSet == null) {
//         supremeMagicalSet = "0";
//       }
//       const inventoryEmbed = new Discord.MessageEmbed()
//         .setTitle("Vanity Inventory")
//         .setDescription(
//           `
// ----------------------------------------------------------------------------
// **Golden ghost knight set** : (${goldenGhostKnightSet}) x pcs
// *rarity : Vanity* , *ID : goldenGhostKnight*
// ----------------------------------------------------------------------------
// **Medusa set** : (${medusaSet}) x pcs
// *rarity : Vanity* , *ID : medusa*
// ----------------------------------------------------------------------------
// **Intrepid set** : (${intrepidSet}) x pcs
// *rarity : Vanity* , *ID : intrepid*
// ----------------------------------------------------------------------------
// **Arcane Sensei set** : (${arcaneSenseiSet}) x pcs
// *rarity : Vanity* , *ID : arcaneSensei*
// ----------------------------------------------------------------------------
// **Frozen set** : (${frozenSet}) x pcs
// *rarity : Vanity* , *ID : frozen*
// ----------------------------------------------------------------------------
// **Dawnfire set** : (${dawnfireSet}) x pcs
// *rarity : Vanity* , *ID : dawnfire*
// ----------------------------------------------------------------------------
// **Supreme Magical set** : (${supremeMagicalSet}) x pcs
// *rarity : Vanity* , *ID : supremeMagical*
// ----------------------------------------------------------------------------
//         `
//         )
//         .setColor("#0096FF");
//       message.channel.send(inventoryEmbed);
//     }
//   },
// };
