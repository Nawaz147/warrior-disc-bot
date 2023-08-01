// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");

// module.exports = {
//   name: "vendor",
//   aliases: ["Vendor"],
//   description: "To see event vendor",
//   usage: "vendor",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
//     const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);
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
//       var item = args[0];
//       if (!item) {
//         const vendorEmbed = new Discord.MessageEmbed()
//           .setTitle(`Vendor`)
//           .setDescription(
//             `
// 1. 100k oyons [id: 100k] (price : 35 tokens)
// 2. 500k oyons [id: 500k] (price : 130 tokens)
// 3. 1m oyons [id: 1m] (price : 220 tokens)
// 4. 5m oyons [id: 5m] (price : 1000 tokens)
// 5. 10m oyons [id: 10m] (price : 1900 tokens)
// 6. 50m oyons [id: 50m] (price : 3500 tokens)
//             `
//           )
//           .setColor(`#FFFFFF`);
//         message.channel.send(vendorEmbed);
//       } else {
//         if (item == "100k") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "35") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("100k oyons")
//               .setDescription(`You purchased 100k oyons for 35 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 100000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 35);
//           }
//         }
//         if (item == "500k") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "130") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("500k oyons")
//               .setDescription(`You purchased 500k oyons for 130 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 500000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 130);
//           }
//         }
//         if (item == "1m") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "220") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("1m oyons")
//               .setDescription(`You purchased 1m oyons for 220 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 1000000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 220);
//           }
//         }
//         if (item == "5m") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "1000") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("5m oyons")
//               .setDescription(`You purchased 5m oyons for 1000 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 5000000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 1000);
//           }
//         }
//         if (item == "10m") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "1900") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("10m oyons")
//               .setDescription(`You purchased 10m oyons for 1900 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 10000000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 1900);
//           }
//         }
//         if (item == "50m") {
//           const tokens = db.fetch(`goldenTokens_${user.id}.${tokenDB}`);
//           if (tokens < "3500") {
//             message.channel.send("You dont have enough tokens");
//           } else {
//             const purchasedEmbed = new Discord.MessageEmbed()
//               .setTitle("50m oyons")
//               .setDescription(`You purchased 50m oyons for 3500 tokens`)
//               .setColor(`#00FF00`);
//             message.channel.send(purchasedEmbed);
//             db.add(`money_${user.id}.${tokenDB}.pocket`, 50000000);
//             db.subtract(`goldenTokens_${user.id}.${tokenDB}`, 3500);
//           }
//         }
//       }
//     }
//   },
// };
