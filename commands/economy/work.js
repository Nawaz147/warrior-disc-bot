// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "work",
//   aliases: ["work"],
//   description: "To work",
//   usage: "work",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let author = await db.fetch(`work_${user.id}.${tokenDB}`);

//       let timeout = 3600000;

//       if (author !== null && timeout - (Date.now() - author) > 0) {
//         let time = ms(timeout - (Date.now() - author));

//         let timeEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `❌ You have already worked recently , You can Work again in ${time.minutes}m ${time.seconds}s `
//           );
//         message.channel.send(timeEmbed);
//       } else {
//         let replies = [
//           "Programmer",
//           "Builder",
//           "Waiter",
//           "Busboy",
//           "Chief",
//           "Mechanic",
//         ];

//         let result = Math.floor(Math.random() * replies.length);
//         let amounta = Math.floor(Math.random() * 50000) + 1;
//         let multiplier = await db.fetch(`multiplier_${user.id}.${tokenDB}`);
//         if (!multiplier) multiplier = 1;
//         let amount = amounta * multiplier;

//         let embed1 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✔ You worked as a ${replies[result]} and earned ${amount} __**oyons**__ <:Oyon:949194574344114196>`
//           );
//         message.channel.send(embed1);

//         await db.add(`money_${user.id}.${tokenDB}.pocket`, amount);
//         await db.set(`work_${user.id}.${tokenDB}`, Date.now());
//       }
//     }
//   },
// };
