// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "share",
//   aliases: ["share", "give"],
//   description: "To give money",
//   usage: "give",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.mentions.members.first() || message.author;
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
//       if (parseInt(args[1]) > 25000000) {
//         message.channel.send(
//           `Whoa <@${message.author.id}> this is too kind but you can't give more than 25,000,000`
//         );
//       } else {
//         const tokenDB = db.fetch(`${user.id}.oyOtoken`);

//         let money = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

//         let embed1 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Mention someone to pay`);

//         if (!user) {
//           return message.channel.send(embed1);
//         }
//         let embed2 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Usage : Oyo share @username {amount}`);

//         if (!parseInt(args[1])) {
//           return message.channel.send(embed2);
//         }
//         let embed3 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You can't share someone negative money`);

//         if (message.content.includes("-")) {
//           return message.channel.send(embed3);
//         }
//         let embed4 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `❌ You don't have that much money or some error occured`
//           );

//         if (money > parseInt(args[1])) {
//           return message.channel.send(embed4);
//         }

//         let embed5 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `
// ✅ You have shared ${parseInt(args[1])} __**oyons**__ to ${user}
// You are too kind ! 💗
//       `
//           );
//         // if money is more than 5000000

//         await db.add(`money_${user.id}.${tokenDB}.pocket`, parseInt(args[1]));
//         await db.subtract(
//           `money_${message.author.id}.${tokenDB}.pocket`,
//           parseInt(args[1])
//         );

//         message.channel.send(embed5);
//       }
//     }
//   },
// };
