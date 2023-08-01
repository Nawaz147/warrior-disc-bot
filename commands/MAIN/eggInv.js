// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const { off } = require("superagent");
// module.exports = {
//   name: "eggInv",
//   aliases: ["EggInv", "egginv", "eggInventory"],
//   description: "To check info of weapons",
//   usage: "eggInv",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//     const banDate = db.fetch(`banDate_${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your Oyo token is not registered yet , type Oyo token me to set your Oyo token`
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
//       var goldenVentorianEgg2022 = await db.fetch(
//         `goldenVentorianEgg2022_${tokenDB}`
//       );
//       if (goldenVentorianEgg2022 === undefined) {
//         var goldenVentorianEgg2022 = "0";
//       } else if (goldenVentorianEgg2022 === null) {
//         var goldenVentorianEgg2022 = "0";
//       }

//       var greenVentorianEgg2022 = await db.fetch(
//         `greenVentorianEgg2022_${tokenDB}`
//       );
//       if (greenVentorianEgg2022 === undefined) {
//         var greenVentorianEgg2022 = "0";
//       } else if (greenVentorianEgg2022 === null) {
//         var greenVentorianEgg2022 = "0";
//       }

//       var blueVentorianEgg2022 = await db.fetch(
//         `blueVentorianEgg2022_${tokenDB}`
//       );
//       if (blueVentorianEgg2022 === undefined) {
//         var blueVentorianEgg2022 = "0";
//       } else if (blueVentorianEgg2022 === null) {
//         var blueVentorianEgg2022 = "0";
//       }

//       var redVentorianEgg2022 = await db.fetch(
//         `redVentorianEgg2022_${tokenDB}`
//       );
//       if (redVentorianEgg2022 === undefined) {
//         var redVentorianEgg2022 = "0";
//       } else if (redVentorianEgg2022 === null) {
//         var redVentorianEgg2022 = "0";
//       }

//       var PlatinumVentorianEgg2022 = await db.fetch(
//         `PlatinumVentorianEgg2022_${tokenDB}`
//       );
//       if (PlatinumVentorianEgg2022 === undefined) {
//         var PlatinumVentorianEgg2022 = "0";
//       } else if (PlatinumVentorianEgg2022 === null) {
//         var PlatinumVentorianEgg2022 = "0";
//       }

//       const eggsEmbed = new Discord.MessageEmbed()
//         .setColor("#0099ff")
//         .setTitle(`${user}'s Egg Inventory`).setDescription(`
//         <:healarVentorianEgg:964896823678468167> | **Orons Ventorian Egg 2022** -- ${PlatinumVentorianEgg2022} x pcs

//         <:goldenVentorianEgg:964896403610546277> | **Golden Ventorian Egg 2022** -- ${goldenVentorianEgg2022} x pcs

//         <:greenVentorianEgg:964896380529311844> | **Green Ventorian Egg 2022** -- ${greenVentorianEgg2022} x pcs

//         <:blueVentorianEgg:964896436623904790> | **Blue Ventorian Egg 2022** -- ${blueVentorianEgg2022} x pcs

//         <:redVentorianEgg:964896421432152125> | **Red Ventorian Egg 2022** -- ${redVentorianEgg2022} x pcs

//         `);
//       message.channel.send(eggsEmbed);
//     }
//   },
// };
