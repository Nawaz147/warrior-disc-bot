// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "withdraw",
//   aliases: ["with"],
//   description: "To withdraw money",
//   usage: "withdraw",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let member = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

//       let member2 = await db.fetch(`money_${user.id}.${tokenDB}.bank`);

//       if (args[0] == "max") {
//         let money = await db.fetch(`money_${user.id}.${tokenDB}.bank`);

//         await db.subtract(`money_${user.id}.${tokenDB}.bank`, money);
//         await db.add(`money_${user.id}.${tokenDB}.pocket`, money);

//         let embed5 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✔ You have withdrawn ${args[0]} your __**oyons**__ <:Oyon:949194574344114196> from your bank`
//           );
//         message.channel.send(embed5);
//       } else {
//         let embed2 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Specify an amount to withdraw`);

//         if (!args[0]) {
//           return message.channel.send(embed2);
//         }
//         let embed3 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You can't withdraw negative money`);

//         if (message.content.includes("-")) {
//           return message.channel.send(embed3);
//         }
//         let embed4 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You don't have that much money in the bank`);

//         if (member2 < args[0]) {
//           return message.channel.send(embed4);
//         }

//         let embed5 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✔ You have withdrawn ${args[0]} __**oyons**__ <:Oyon:949194574344114196> from your bank`
//           );

//         message.channel.send(embed5);
//         await db.subtract(
//           `money_${user.id}.${tokenDB}.bank`,
//           parseInt(args[0])
//         );
//         await db.add(`money_${user.id}.${tokenDB}.pocket`, parseInt(args[0]));
//       }
//     }
//   },
// };
