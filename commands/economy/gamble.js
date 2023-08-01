// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// const slotItems = [
//   "🍇:",
//   "🍉",
//   "🍊",
//   "🍎",
//   "🦥",
//   "🍓",
//   "🍒",
//   "🍌",
//   "🥝",
//   "🍏",
//   "🥭",
// ];

// module.exports = {
//   name: "gamble",
//   aliases: ["gamb"],
//   description: "To gamble",
//   usage: "gamble",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       let moneydb = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

//       let money = parseInt(args[0]);

//       let win = false;

//       let moneymore = new Discord.MessageEmbed()
//         .setColor("#FFFFFF")
//         .setDescription(`❌ You are trying to bet more than you have`);

//       let moneyhelp = new Discord.MessageEmbed()
//         .setColor("#FFFFFF")
//         .setDescription(`❌ Specify an amount`);

//       if (!money) return message.channel.send(moneyhelp);
//       if (money > moneydb) return message.channel.send(moneymore);

//       let number = [];
//       for (i = 0; i < 3; i++) {
//         number[i] = Math.floor(Math.random() * slotItems.length);
//       }

//       if (number[0] == number[1] && number[1] == number[2]) {
//         money *= 9;
//         win = true;
//       } else if (
//         number[0] == number[1] ||
//         number[0] == number[2] ||
//         number[1] == number[2]
//       ) {
//         money *= 2;
//         win = true;
//       }
//       if (win) {
//         let slotsEmbed1 = new Discord.MessageEmbed()
//           .setDescription(
//             `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
//               slotItems[number[2]]
//             } GG ${
//               message.member.user.username
//             } ! , You won ${money} __**oyons**__ <:Oyon:949194574344114196>`
//           )
//           .setColor("#FFFFFF");
//         message.channel.send(slotsEmbed1);
//         await db.add(`money_${user.id}.${tokenDB}.pocket`, money);
//       } else {
//         let slotsEmbed = new Discord.MessageEmbed()
//           .setDescription(
//             `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
//               slotItems[number[2]]
//             } Sadly 😔 , You lost ${money} __**oyons**__ <:Oyon:949194574344114196>`
//           )
//           .setColor("#FFFFFF");
//         message.channel.send(slotsEmbed);
//         await db.subtract(`money_${user.id}.${tokenDB}.pocket`, money);
//       }
//     }
//   },
// };
