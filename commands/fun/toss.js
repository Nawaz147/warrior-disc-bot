// const { MessageEmbed } = require("discord.js");
// const db = require("quick.db");
// const ms = require("parse-ms"); // npm i parse-ms@2.1.0
// const { Capitalize } = require("tech-tip-cyber");
// module.exports = {
//   name: "toss",
//   run: async (client, message, args) => {
//     const user = message.member;
//     const ht = args[0];

//     if (!ht) return message.reply(`What You Chose? heads or tails?`); // If No heads Or tails Provided
//     const coin = ["heads", "tails"]; // Coin Options

//     const coinfliptime = db.fetch(`coinfliptime_${user.id}`);
//     const timeout = 1800000;
//     if (coinfliptime !== null && timeout - (Date.now() - coinfliptime) > 0) {
//       // CoolDown
//       const timeleft = ms(timeout - (Date.now() - coinfliptime));

//       const embed = new MessageEmbed()
//         .setAuthor(
//           `${user.user.username} Fliped Coin`,
//           user.user.displayAvatarURL({ dynamic: true })
//         )
//         .setTimestamp()
//         .setColor("RANDOM").setDescription(`
// Already Fliped, Flip Again In **${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
// Default CoolDown Is **30 Minutes**
//             `);
//       message.channel.send(embed);
//     } else {
//       if (!coin.includes(ht))
//         return message.reply(`It Should Be heads or tails Only`); // If Something Other Is Provided

//       const flip = coin[Math.floor(Math.random() * coin.length)];

//       const fliped = Capitalize({
//         // For Making heads To Heads And tails To Tails
//         Capital: flip,
//       });

//       if (flip === ht) {
//         // If Coin Fliped Is What User Provided
//         const subAdd = 100000;
//         const embed = new MessageEmbed()
//           .setAuthor(
//             `${user.user.username} Fliped Coin`,
//             user.user.displayAvatarURL({ dynamic: true })
//           )
//           .setTimestamp()
//           .setColor("RANDOM").setDescription(`
// <@${user.id}> Fliped Coin Which Landed On **${fliped}**
//                 `);
//         message.channel.send(embed);
//         await client.db.add(
//           `money_${message.guild.id}_${user.id}.pocket`,
//           subAdd
//         );
//         message.channel.send(
//           "You Won 250 __**oyons**__ <:ACETRON_DOLLAR:947081487071723581>"
//         );
//         db.set(`coinfliptime_${user.id}`, Date.now());
//       } else {
//         const subAdd = 100000;
//         // If Coin Fliped Is Not What User Provided
//         const embed = new MessageEmbed()
//           .setAuthor(
//             `${user.user.username} Fliped Coin`,
//             user.user.displayAvatarURL({ dynamic: true })
//           )
//           .setTimestamp()
//           .setColor("RANDOM").setDescription(`
// <@${user.id}> Fliped Coin Which Landed On **${fliped}**
//                 `);
//         message.channel.send(embed);
//         await client.db.subtract(
//           `money_${message.guild.id}_${message.author.id}.pocket`,
//           subAdd
//         );
//         message.channel.send(
//           "You lost 250 __**oyons**__ <:ACETRON_DOLLAR:947081487071723581>"
//         );
//       }
//       db.set(`coinfliptime_${user.id}`, Date.now());
//     }
//   },
// };
