// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const moneyCap = require("../../config.json");
// module.exports = {
//   name: "deposit",
//   aliases: ["dep"],
//   description: "To deposit money",
//   usage: "deposit",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
//     let amount = args[0];
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your Oyo token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let money = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//       let moneyBank = await db.fetch(`money_${user.id}.${tokenDB}.bank`);
//       // put comma in numbers
//       if (amount == "max") {
//         if (money > moneyCap.moneyCap) {
//           message.channel.send(`${user} you cannot deposit that much !`);
//         } else {
//           money = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

//           let embedbank = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription("❌ You don't have any money to deposit");

//           if (money === 0 || money === null)
//             return message.channel.send(embedbank);

//           await db.add(`money_${user.id}.${tokenDB}.bank`, money);
//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, money);
//           let embed5 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `✔ You have deposited ${amount} __**oyons**__ <:Oyon:949194574344114196> into your bank`
//             );
//           message.channel.send(embed5);
//         }
//       } else if (moneyBank == moneyCap.moneyCap) {
//         message.channel.send(
//           `You cannot put more money in your bank more than the limit of 1,500,000,000`
//         );
//       } else if (moneyBank + amount > moneyCap.moneyCap) {
//         message.channel.send(
//           `You cannot put more money in your bank more than the limit of 1,500,000,000`
//         );
//       } else {
//         let embed2 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Specify an amount to deposit`);

//         if (!amount) {
//           return message.channel.send(embed2).catch((err) => console.log(err));
//         }
//         let embed3 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You can't deposit negative money`);

//         if (message.content.includes("-")) {
//           return message.channel.send(embed3);
//         }
//         let embed4 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You don't have that much money`);

//         if (money < amount) {
//           return message.channel.send(embed4);
//         }

//         let embed5 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✔ You have deposited ${parseInt(
//               amount
//             )} __**oyons**__ <:Oyon:949194574344114196> into your bank`
//           );

//         db.subtract(`money_${user.id}.${tokenDB}.pocket`, parseInt(amount));
//         db.add(`money_${user.id}.${tokenDB}.bank`, parseInt(amount));

//         message.channel.send(embed5);
//       }
//     }
//   },
// };
