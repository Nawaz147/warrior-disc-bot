// // const Discord = require("discord.js");
// // const ms = require("parse-ms");
// // const db = require("quick.db");
// // const Canvas = require("canvas");
// // module.exports = {
// //   name: "cheque",
// //   aliases: ["cheque"],
// //   description: "To create a oyons cheque",
// //   usage: "cheque",
// //   category: "Economy",
// //   run: async (client, message, args) => {
// //     // if amount is not specified

// <<<<<<< HEAD
// //     let code = Math.floor(Math.random() * 1000000);
// //     let user = message.author;
// //     let targetUser = message.mentions.users.first();
// //     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
// //     if (!tokenDB) {
// //       message.channel.send(
// //         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
// //       );
// //     } else {
// //       if (args[0] === "create") {
// //         // if amount greater than usermoney then return
// //         let amount = args[1];
// //         let usermoney = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
// //         if (usermoney === null) usermoney = 0;
// //         if (amount === null) amount = 0;

// //         if (amount < 0) {
// //           message.channel.send(
// //             `<@${user.id}> You can't make a cheque with negative amount`
// //           );
// //           return;
// //         }
// //         if (!targetUser) {
// //           message.channel.send(
// //             `<@${user.id}> Please mention a user to give the cheque`
// //           );
// //           return;
// //         }
// //         // if amount * 15% is greater than usermoney then return

// //         if (amount * 1.5 > usermoney) {
// //           message.channel.send(
// //             `<@${user.id}> You don't have enough money to make a cheque`
// //           );
// //         }
// //         if (targetUser === "@everyone") {
// //           message.channel.send("Idiot you can't mention everyone");
// //         } else {
// //           let embed = new Discord.MessageEmbed()
// //             .setColor("GREEN")
// //             .setTitle("Cheque")
// //             .setDescription(
// //               `**${user}**, you have made a cheque for **${amount}** , you have paid around 15% tax on it`
// //             );
// //           targetUser.send(`You received a cheque from ${user}`);
// //           message.channel.send(embed);
// //           let canvas = Canvas.createCanvas(500, 250);
// //           let ctx = canvas.getContext("2d");
// //           ctx.fillStyle = "#ffffff";
// //           ctx.fillRect(0, 0, canvas.width, canvas.height);
// //           ctx.fillStyle = "#000000";
// //           ctx.font = "20px Arial";
// //           ctx.fillText(
// //             `Cheque by : ${message.member.displayName}#${message.member.user.discriminator},
// //          amount : ${amount}
// //       code : ${code},
// //         `,
// //             canvas.width / 4,
// //             canvas.height / 2
// //           );
// //           ctx.beginPath();
// //           ctx.moveTo(0, 0);
// //           ctx.lineTo(canvas.width, canvas.height);
// //           ctx.beginPath();
// //           ctx.moveTo(canvas.width, 0);
// //           ctx.lineTo(0, canvas.height);
// //           // send the canvas
// //           targetUser.send(
// //             new Discord.MessageAttachment(canvas.toBuffer(), "cheque.png")
// //           );
// //           let cheque = await db.fetch(`cheque_${code}`);
// //           if (cheque === null) {
// //             db.set(`cheque_${code}`, {
// //               user: user.id,
// //               amount: amount,
// //               time: Date.now(),
// //             });
// =======
//     let code = Math.floor(Math.random() * 1000000);
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       if (args[0] === "create") {
//         // if amount greater than usermoney then return
//         let amount = args[1];
//         let usermoney = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//         if (usermoney === null) usermoney = 0;
//         if (amount === null) amount = 0;

//         if (amount < 0) {
//           message.channel.send(
//             `<@${user.id}> You can't make a cheque with negative amount`
//           );
//           return;
//         }
//         // if amount * 15% is greater than usermoney then return

//         if (amount * 1.5 > usermoney) {
//           message.channel.send(
//             `<@${user.id}> You don't have enough money to make a cheque`
//           );
//         } else {
//           let embed = new Discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Cheque")
//             .setDescription(
//               `**${user}**, you have made a cheque for **${amount}** , you have paid around 15% tax on it`
//             );
//           user.send("Your Cheque is ready  : ");
//           message.channel.send(embed);
//           let canvas = Canvas.createCanvas(500, 250);
//           let ctx = canvas.getContext("2d");
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, canvas.width, canvas.height);
//           ctx.fillStyle = "#000000";
//           ctx.font = "20px Arial";
//           ctx.fillText(
//             `Cheque by : ${message.member.displayName}#${message.member.user.discriminator},
//          amount : ${amount}
//       code : ${code},
//         `,
//             canvas.width / 4,
//             canvas.height / 2
//           );
//           ctx.beginPath();
//           ctx.moveTo(0, 0);
//           ctx.lineTo(canvas.width, canvas.height);
//           ctx.beginPath();
//           ctx.moveTo(canvas.width, 0);
//           ctx.lineTo(0, canvas.height);
//           // send the canvas
//           user.send(
//             new Discord.MessageAttachment(canvas.toBuffer(), "cheque.png")
//           );
//           let cheque = await db.fetch(`cheque_${code}`);
//           if (cheque === null) {
//             db.set(`cheque_${code}`, {
//               user: user.id,
//               amount: amount,
//               time: Date.now(),
//             });
// >>>>>>> parent of 2dfb571 (added every description needed for all items !!)

// //             // subtract amount from user
// //             // db.subtract(`money_${user.id}.pocket`, amount);
// //             // db.subtract amount + 15% from user
// //             db.subtract(`money_${user.id}.${tokenDB}.pocket`, amount * 1.5);
// //           }
// //         }
// //       }

// <<<<<<< HEAD
// //       // if args[1] = redeem
// //       if (args[0] === "redeem") {
// //         // if args[2] = code
// //         let code = args[1];
// //         let cheque = await db.fetch(`cheque_${code}`);
// //         if (cheque === null) {
// //           message.channel.send(`<@${user.id}> This cheque does not exist`);
// //           return;
// //         }
// //         if (code) {
// //           let redeemed = await db.fetch(`redeemed_${code}`);
// //           if (redeemed === true) {
// //             message.channel.send(
// //               `<@${user.id}> This cheque is already redeemed by someone`
// //             );
// //             return;
// //           }
// //           // if cheque has expired
// //           if (Date.now() - cheque.time > 259200000) {
// //             message.channel.send(
// //               `<@${user.id}> This cheque has expired, you can't redeem it anymore`
// //             );
// //             return;
// //           }
// //           let amount = cheque.amount;
// //           let usermoney = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
// //           if (usermoney === null) usermoney = 0;
// //           if (amount === null) amount = 0;
// //           // add amount to user
// //           db.add(`money_${user.id}.${tokenDB}.pocket`, amount);
// //           // send message to check owner
// //           let embed3 = new Discord.MessageEmbed()
// //             .setColor("GREEN")
// //             .setTitle("Cheque")
// //             .setDescription(
// //               `**${user}** you redeemed a cheque for **${amount}** which was sent by **${cheque.user}**`
// //             );
// //           user.send(embed3);

// //           // set redeemed to true
// //           db.set(`redeemed_${code}`, true);
// //           let embed2 = new Discord.MessageEmbed()
// //             .setColor("GREEN")
// //             .setTitle("Cheque")
// //             .setDescription(
// //               `**${user}**, you have redeemed a cheque for ,  __**${amount} oyons**__`
// //             );
// //           message.channel.send(embed2);
// //         }
// //       }
// //       if (!args[0]) {
// //         message.channel.send(
// //           `<@${user.id}>
// //         **TO CREATE** A Cheque and send - Oyo cheque create <amount> <@user>
// //         **TO REDEEM** A Cheque - Oyo cheque redeem <code>
// //         `
// //         );
// //       }
// //     }
// //   },
// // };
// =======
//       // if args[1] = redeem
//       if (args[0] === "redeem") {
//         // if args[2] = code
//         let code = args[1];
//         let cheque = await db.fetch(`cheque_${code}`);
//         if (cheque === null) {
//           message.channel.send(`<@${user.id}> This cheque does not exist`);
//           return;
//         }
//         if (code) {
//           let redeemed = await db.fetch(`redeemed_${code}`);
//           if (redeemed === true) {
//             message.channel.send(
//               `<@${user.id}> This cheque is already redeemed by someone`
//             );
//             return;
//           }
//           // if cheque has expired
//           if (Date.now() - cheque.time > 259200000) {
//             message.channel.send(
//               `<@${user.id}> This cheque has expired, you can't redeem it anymore`
//             );
//             return;
//           }
//           let amount = cheque.amount;
//           let usermoney = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//           if (usermoney === null) usermoney = 0;
//           if (amount === null) amount = 0;
//           // add amount to user
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount);
//           // send message to check owner
//           let embed3 = new Discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Cheque")
//             .setDescription(
//               `**${user}**, you just redeemed a cheque of __**${amount} oyons**__`
//             );
//           // send embed 3 to check owner dm
//           user.send(embed3);

//           // set redeemed to true
//           db.set(`redeemed_${code}`, true);
//           let embed2 = new Discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Cheque")
//             .setDescription(
//               `**${user}**, you have redeemed a cheque for ,  __**${amount} oyons**__`
//             );
//           message.channel.send(embed2);
//         }
//       }
//       if (!args[0]) {
//         message.channel.send(
//           `<@${user.id}>
//         TO CREATE A Cheque - Oyo cheque create <amount>
//         TO REDEEM A Cheque - Oyo cheque redeem <code>
//         `
//         );
//       }
//     }
//   },
// };
// >>>>>>> parent of 2dfb571 (added every description needed for all items !!)
