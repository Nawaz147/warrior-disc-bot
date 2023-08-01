// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");

// module.exports = {
//   name: "rob",
//   aliases: ["rob"],
//   description: "To rob",
//   usage: "rob",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;

//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       let volta = await db.fetch(`voltaProtection_${user.id}.${tokenDB}`);
//       if (volta) {
//         message.channel.send(
//           `That user has volta with him , you can't rob him ⚡`
//         );
//       } else {
//         var result = ["WINWIN"];
//         let targetuser = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//         let author = await db.fetch(`rob_${message.author}.${tokenDB}`);
//         let author2 = await db.fetch(
//           `money_${message.author}.${tokenDB}.pocket`
//         );

//         let timeout = 300000;
//         if (author !== null && timeout - (Date.now() - author) > 0) {
//           let time = ms(timeout - (Date.now() - author));

//           let timeEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `❌ LOL ,  give it a break , wait atleast ${time.minutes}m ${time.seconds}s `
//             );
//           message.channel.send(timeEmbed);
//         } else {
//           var result = ["WINWIN", "LOOSELOOSE"];
//           let targetuser = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//           let author = await db.fetch(`rob_${message.author}`);
//           let author2 = await db.fetch(`money_${message.author}.pocket`);

//           let timeout = 300000;
//           if (author !== null && timeout - (Date.now() - author) > 0) {
//             let time = ms(timeout - (Date.now() - author));

//             let timeEmbed = new Discord.MessageEmbed()
//               .setColor("#FFFFFF")
//               .setDescription(
//                 `❌ LOL ,  give it a break , wait atleast ${time.minutes}m ${time.seconds}s `
//               );
//             message.channel.send(timeEmbed);
//           } else {
//             let moneyEmbed = new Discord.MessageEmbed()
//               .setColor("#FFFFFF")
//               .setDescription(
//                 `❌ You need at least 50 __**oyons**__ <:Oyon:949194574344114196> in your wallet to rob someone`
//               );

//             // if (author2 < "50") {
//             //   return message.channel.send(moneyEmbed);
//             // }

//             let moneyEmbed2 = new Discord.MessageEmbed()
//               .setColor("#FFFFFF")
//               .setDescription(
//                 `❌ ${user.username} does not have anything you can rob`
//               );

//             if (targetuser <= 0 || targetuser === null) {
//               return message.channel.send(moneyEmbed2);
//             }
//             // if targetuser is himself then return
//             if (user.id === message.author.id) {
//               return message.channel.send("IDIOT , You can't rob yourself");
//             }
//             // if targetuser is bot then return
//             if (user.bot) {
//               return message.channel.send(
//                 "~Ehh~ , are you a fool or what? , you seriously trying to rob a bot ?"
//               );
//             }

//             MONEYtoRescueRandom = Math.floor(Math.random() * 50021);
//             let answer = result[Math.floor(Math.random() * result.length)];
//             if (answer === "LOOSELOOSE") {
//               message.channel.send(
//                 "You were caught and you paid " +
//                   "``" +
//                   MONEYtoRescueRandom +
//                   " __**oyons**__``"
//               );
//               const SuccessEmbed = new Discord.MessageEmbed()
//                 .setTitle("💸 ROB FAILED 💸")
//                 .setDescription(
//                   `${message.author} was trying to rob you and was caught and he paid ${MONEYtoRescueRandom} __**oyons**__ to you !`
//                 )
//                 .setFooter(`You should keep your money in bank to keep it safe`)

//                 .setColor("GREEN");
//               user.send(SuccessEmbed);
//               await db.subtract(
//                 `money_${message.author.id}.${tokenDB}.pocket`,
//                 MONEYtoRescueRandom
//               );
//               await db.add(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 MONEYtoRescueRandom
//               );
//             } else if (targetuser < 50000) {
//               return message.channel.send(
//                 "Leave him LOL , he is too poor to get rob"
//               );
//             } else {
//               await db.set(`crime_${message.author.id}`, Date.now());
//               let authorembed = new Discord.MessageEmbed()
//                 .setColor("#FFFFFF")
//                 .setDescription(`❌ Are you dumb ? Mention a user to Rob`);

//               if (user.id === author) {
//                 return message.channel.send(authorembed);
//               }
//               var valueRANDOM = Math.floor(Math.random() * 1034012);
//               var vipValue = Math.floor(Math.random() * 2034012);
//               let vip = await db.fetch(`premium_${user.id}.${tokenDB}`);

//               if (vip === true)
//                 moneyRandom = Math.floor(Math.random() * vipValue) + 1;
//               if (vip === null)
//                 moneyRandom = Math.floor(Math.random() * valueRANDOM) + 1;
//               if (moneyRandom > targetuser) {
//                 message.channel.send(
//                   "User doesnt have anything much you can rob !"
//                 );
//               } else {
//                 let embed = new Discord.MessageEmbed()
//                   .setDescription(
//                     `You robbed ${user} and got away with 💸 ${random} Oyons 💸`
//                   )
//                   .setColor("#FFFFFF");
//                 const FailEmbed = new Discord.MessageEmbed()
//                   .setTitle("💸 You got robbed 💸")
//                   .setDescription(
//                     `${message.author} robbed you and got away with ${random} __**oyons**__ `
//                   )
//                   .setFooter(
//                     `You should keep your money in bank to keep it safe`
//                   )
//                   .setColor("RED");
//                 user.send(FailEmbed);
//                 message.channel.send(embed);

//                 await db.subtract(`money_${user.id}.${tokenDB}.pocket`, random);
//                 await db.add(
//                   `money_${message.author.id}.${tokenDB}.pocket`,
//                   random
//                 );
//                 await db.set(`rob_${message.author.id}.${tokenDB}`, Date.now());
//               }
//             }
//           }
//         }
//       }
//     }
//   },
// };
