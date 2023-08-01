// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "weekly",
//   aliases: ["weekly"],
//   description: "To claim weekly",
//   usage: "weekly",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const money = db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else if (money > "999199999") {
//       message.channel.send(
//         `You can't collect your weekly reward , it will exceed money cap`
//       );
//     } else {
//       let timeout = 604800000;
//       let am = 200;
//       let multiplier = await db.fetch(`multiplier_${user.id}.${tokenDB}`);
//       if (!multiplier) multiplier = 1;
//       let amount = 500000 * multiplier;

//       let weekly = await db.fetch(`weekly_${user.id}.${tokenDB}`);

//       if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
//         let time = ms(timeout - (Date.now() - weekly));

//         let timeEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `❌ You have already collected your weekly reward collect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `
//           );
//         message.channel.send(timeEmbed);
//       } else {
//         let moneyEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✔ You've received your weekly reward of ${amount} __**oyons**__ <:Oyon:949194574344114196>          `
//           );
//         message.channel.send(moneyEmbed);

//         await db.add(`money_${user.id}.${tokenDB}.pocket`, amount);
//         await db.set(`weekly_${user.id}.${tokenDB}`, Date.now());
//       }
//     }
//   },
// };
