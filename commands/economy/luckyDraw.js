// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "luckyDraw",
//   aliases: ["luckydraw"],
//   description: "luckyDraw command",
//   usage: "luckyDraw",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     let superItem = [
//       "brencyTepta",
//       "fluffyTemcha",
//       "chepCrown",
//       "chepMedal",
//       "chepTrophy",
//       "goldCoin",
//     ];
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let superItems = superItem[Math.floor(Math.random() * superItem.length)];
//       const Key = db.fetch(`key_${user.id}.${tokenDB}`);
//       // if dont have 3 keys
//       if (Key < 3) {
//         const keyEmbed = new Discord.MessageEmbed()
//           .setTitle("Key")
//           .setDescription("You need 3 Keys to use this command")
//           .setColor("#E10600")
//           .setFooter("You can get these keys by doing Oyo search");
//         message.channel.send(keyEmbed);
//       }
//       // if have 3 keys
//       if (Key >= 3) {
//         db.subtract(`key_${user.id}.${tokenDB}`, 3);
//         if (superItems === "brencyTepta") {
//           const brencyTeptaEmbed = new Discord.MessageEmbed()
//             .setTitle("Lucky Draw")
//             .setDescription("You got a Brency Tepta !")
//             .setColor("PURPLE");
//           message.channel.send(brencyTeptaEmbed);
//           db.fetch(`brency tepta_${user.id}.${tokenDB}`);
//           db.add(`brency tepta_${user.id}.${tokenDB}`, 1);
//         } else if (superItems === "fluffyTemcha") {
//           const fluffyTemchaEmbed = new Discord.MessageEmbed()
//             .setTitle("Lucky Draw")
//             .setDescription("You got a Fluffy Temcha !")
//             .setColor("GREEN");
//           message.channel.send(fluffyTemchaEmbed);
//           db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//           db.add(`fluffyTemcha_${user.id}.${tokenDB}`, 1);
//         } else if (superItems === "chepCrown") {
//           const chepCrownEmbed = new Discord.MessageEmbed()
//             .setTitle("Lucky Draw")
//             .setDescription("You got a Chep Crown !")
//             .setColor("GOLD");
//           message.channel.send(chepCrownEmbed);
//           db.fetch(`chep_crown_${user.id}.${tokenDB}`);
//           db.add(`chep_crown_${user.id}.${tokenDB}`, 1);
//         } else if (superItems === "chepTrophy") {
//           const chepTrophyEmbed = new Discord.MessageEmbed()
//             .setTitle("Lucky Draw")
//             .setDescription("You got a Chep Trophy !")
//             .setColor("GOLD");
//           message.channel.send(chepTrophyEmbed);
//           db.fetch(`chepTrophy_${user.id}.${tokenDB}`);
//           db.add(`chepTrophy_${user.id}.${tokenDB}`, 1);
//         }
//       }
//     }
//   },
// };
