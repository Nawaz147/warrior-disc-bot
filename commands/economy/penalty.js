// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "penalty",
//   aliases: ["pen", "penalt", "fine"],
//   description: "To penalty money",
//   usage: "penalty",
//   category: "Economy",
//   run: async (client, message, args) => {
//     if (message.guild.id == "932204997502976021") {
//       if (message.member.roles.cache.find((r) => r.name === "🧙‍♂️ Staff  🧙‍♂️")) {
//         let user =
//           message.mentions.members.first() ||
//           client.message.member.cache.get(args[0]) ||
//           message.author;

//         let member = await client.db.fetch(`money_${message.author.id}.pocket`);

//         let embed1 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Mention someone to penalty`);

//         if (!message.member) {
//           return message.channel.send(embed1);
//         }
//         let embed2 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ Usage : may i penalty @username {amount}`);

//         if (!parseInt(args[1])) {
//           return message.channel.send(embed2);
//         }
//         let embed3 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You can't penalty someone negative money`);

//         if (message.content.includes("-")) {
//           return message.channel.send(embed3);
//         }
//         let embed4 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(`❌ You don't have that much money`);

//         if (member < parseInt(args[1])) {
//           return message.channel.send(embed4);
//         }

//         let embed5 = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `✅ You have penaltied  ${message.mentions.members.first()} of ${parseInt(
//               args[1]
//             )} __**oyons**__ <:Oyon:949194574344114196> ,

//       `
//           );

//         await client.db.subtract(`money_${message.member.id}.pocket`, member);
//         await client.db.add(`money_${message.author.id}.pocket`, member);
//         message.channel.send(embed5);
//       } else {
//         message.channel.send(
//           message.member.user.username + " you cant use that !"
//         );
//       }
//     }
//   },
// };
