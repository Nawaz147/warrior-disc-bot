// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "search",
//   aliases: ["search"],
//   description: "To search",
//   usage: "search",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${message.author.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let cooldown = 15000;
//       if (
//         cooldown - (Date.now() - db.fetch(`${user.id}.${tokenDB}.search`)) >
//         0
//       ) {
//         let time = ms(
//           cooldown - (Date.now() - db.fetch(`${user.id}.${tokenDB}.search`))
//         );
//         let timeEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Try again ! ${time.minutes}m ${time.seconds}s `);
//         message.channel.send(timeEmbed);
//       } else {
//         let chance = Math.floor(Math.random() * 100) + 1;
//         let chanceKey = Math.floor(Math.random() * 100) + 1;
//         let items = ["car", "mansion"];
//         let Key = ["Key", "3 Keys"];
//         let keyRandom = Key[Math.floor(Math.random() * Key.length)];

//         let superItem = [
//           "brencyTepta",
//           "fluffyTemcha",
//           "chepCrown",
//           "chepMedal",
//           "chepTrophy",
//           "goldCoin",
//         ];
//         let item = items[Math.floor(Math.random() * items.length)];
//         // set 3% chance of getting a super item
//         let superItems =
//           superItem[Math.floor(Math.random() * superItem.length)];

//         if (chance <= 1) {
//           if (keyRandom === "Key") {
//             const keyEmbed = new Discord.MessageEmbed()
//               .setTitle("Key")
//               .setDescription("You found a Key 🔑")
//               .setColor("PURPLE");
//             db.fetch(`key_${user.id}.${tokenDB}`);
//             db.add(`key_${user.id}.${tokenDB}`, 1);
//             message.channel.send(keyEmbed);
//           }
//           if (keyRandom === "3 Keys") {
//             const keyEmbed2 = new Discord.MessageEmbed()
//               .setTitle("3 Keys")
//               .setDescription("You found 3 Keys 🔑")
//               .setColor("PURPLE");
//             db.fetch(`key_${user.id}.${tokenDB}`);
//             db.add(`key_${user.id}.${tokenDB}`, 3);
//             message.channel.send(keyEmbed2);
//           }
//         }

//         if (chance <= 0.05) {
//           if (superItems === "brencyTepta") {
//             const brencyTeptaEmbed = new Discord.MessageEmbed()
//               .setTitle("Brency Tepta")
//               .setDescription("You found Brency Tepta !")
//               .setColor("PURPLE");
//             message.channel.send(brencyTeptaEmbed);
//             db.fetch(`brency tepta_${user.id}.${tokenDB}`);
//             db.add(`brency tepta_${user.id}.${tokenDB}`, 1);
//           } else if (superItems === "fluffyTemcha") {
//             const fluffyTemchaEmbed = new Discord.MessageEmbed()
//               .setTitle("Fluffy Temcha")
//               .setDescription("You found Fluffy Temcha !")
//               .setColor("GREEN");
//             message.channel.send(fluffyTemchaEmbed);
//             db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//             db.add(`fluffyTemcha_${user.id}.${tokenDB}`, 1);
//           } else if (superItems === "chepCrown") {
//             const chepCrownEmbed = new Discord.MessageEmbed()
//               .setTitle("Chep Crown")
//               .setDescription("You found Chep Crown !")
//               .setColor("GOLD");
//             message.channel.send(chepCrownEmbed);
//             db.fetch(`chep_crown${user.id}.${tokenDB}`);
//             db.add(`chep_crown${user.id}.${tokenDB}`, 1);
//           } else if (superItems === "chepTrophy") {
//             const chepTrophyEmbed = new Discord.MessageEmbed()
//               .setTitle("Chep Trophy")
//               .setDescription("You found Chep Trophy !")
//               .setColor("GOLD");
//             message.channel.send(chepTrophyEmbed);
//             db.fetch(`chep_trophy${user.id}.${tokenDB}`);
//             db.add(`chepTrophy${user.id}.${tokenDB}`, 1);
//           }
//         }

//         if (item === "car") {
//           const carEmbed = new Discord.MessageEmbed()
//             .setTitle("Car")
//             .setDescription("You found a car !")
//             .setColor("RED");
//           message.channel.send(carEmbed);
//           db.fetch(`car_${user.id}.${tokenDB}`);
//           db.add(`car_${user.id}.${tokenDB}`, 1);
//         } else if (item === "mansion") {
//           const mansionEmbed = new Discord.MessageEmbed()
//             .setTitle("Mansion")
//             .setDescription("You found a mansion !")
//             .setColor("WHITE");
//           message.channel.send(mansionEmbed);
//           db.fetch(`house_${user.id}.${tokenDB}`);
//           db.add(`house_${user.id}.${tokenDB}`, 1);
//           // if super item
//         }
//       }
//     }
//   },
// };
