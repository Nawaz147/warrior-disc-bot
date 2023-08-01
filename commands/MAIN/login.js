// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
// const waetraDamage = require("../../weaponStats/waetraBow.json");
// const texarusDamage = require("../../weaponStats/texarusStaff.json");
// const natureDaggerss = require("../../weaponStats/natureDaggers.json");
// const ventorianBoww = require("../../weaponStats/ventorianBow.json");
// module.exports = {
//   name: "login",
//   aliases: ["Login", "logIn"],
//   description: "To check login",
//   usage: "login",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
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
//       var token = args[0];
//       if (token == tokenDB) {
//         message.channel.send(`You are already logged in to this token `);
//       } else {
//         db.set(`${user.id}.oyOtoken`, token);
//         message.channel.send(`You logged in !`);
//       }
//     }
//   },
// };
