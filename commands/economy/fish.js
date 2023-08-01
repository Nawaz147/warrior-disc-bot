// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "fish",
//   aliases: ["fish"],
//   description: "To do fishing",
//   usage: "fish",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const rand = (min, max) => {
//       return Math.floor(Math.random() * (max - min)) + min;
//     };
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       let user = message.author;
//       let timeout = 10000;
//       let fish = [
//         "Yellow Fish :tropical_fish:",
//         "Fat Fish :blowfish:",
//         "Blue Fish :fish:",
//         "Coconut :coconut:",
//         "Dolphin :dolphin:",
//         "Lobster :lobster:",
//         "Shark :shark:",
//         "Crab :crab:",
//         "Squid :squid:",
//         "Whale :whale2:",
//         "Shrimp :shrimp:",
//         "Octopus :octopus:",
//         "Duck :duck:",
//         "Diamond :gem:",
//       ];

//       let randn = rand(0, parseInt(fish.length));
//       let randrod = rand(15, 30);

//       let fishToWin = fish[randn];

//       let fishdb = await db.fetch(`fish_${user.id}.${tokenDB}`);
//       let rod = await db.get(`fish_${user.id}.${tokenDB}.rod`);
//       let rodusage = await db.get(`fish_${user.id}.${tokenDB}.rodusage`);
//       let wait = await db.fetch(`fish_${user.id}.${tokenDB}.wait`);

//       if (!rod) return message.channel.send(`You have to buy a fishing rod!`);

//       if (rodusage) {
//         if (fishdb.rodusage >= randrod) {
//           await db.delete(`fish_${user.id}.${tokenDB}.rod`);
//           return message.reply(
//             "Your fishing rod has broken! Go buy a new one!"
//           );
//         }
//       }

//       if (wait !== null && timeout - (Date.now() - wait) > 0) {
//         let time = ms(timeout - (Date.now() - wait));

//         message.channel.send(
//           `❌ You have already fished!\nFish it again in ${time.seconds}s`
//         );
//       } else {
//         let embed = new Discord.MessageEmbed()
//           .setColor("BLUE")
//           .setDescription(`You have fished and gotten a ${fishToWin}`);
//         message.channel.send(embed);
//         await db.push(`fish_${user.id}.${tokenDB}.fish`, fishToWin);
//         await db.set(`fish_${user.id}.${tokenDB}.wait`, Date.now());
//         await db.add(`fish_${user.id}.${tokenDB}.rodusage`, 1);
//       }
//     }
//   },
// };
