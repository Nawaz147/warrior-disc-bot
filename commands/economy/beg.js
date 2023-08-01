// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const config = require("../../config.json");
// const moneyCap = config.moneyCap;

// module.exports = {
//   name: "beg",
//   aliases: ["beg"],
//   description: "To beg",
//   usage: "beg",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     let timeout = 30000;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const money = db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//     let multiplier = await db.fetch(`multiplier_${message.guild.id}`);
//     if (!multiplier) multiplier = 1;
//     let vip = await db.fetch(`premium_${user.id}`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       if (vip === true) amounta = Math.floor(Math.random() * 4200) + 1;
//       if (vip === null) amounta = Math.floor(Math.random() * 3750) + 1;
//       let amounts = amounta * multiplier;

//       let beg = await db.fetch(`beg_${user.id}.${tokenDB}`);

//       if (beg !== null && timeout - (Date.now() - beg) > 0) {
//         let time = ms(timeout - (Date.now() - beg));

//         let timeEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setDescription(
//             `❌ LOL , stop it , You've already begged recently\n\ Try again in ${time.minutes}m ${time.seconds}s `
//           );
//         message.channel.send(timeEmbed);
//       } else if (money > "25000000") {
//         message.channel.send(
//           `Have some shame begging , you have too much money`
//         );
//       } else {
//         db.add(`money_${user.id}.${tokenDB}.pocket`, amounts);
//         // db.set(`beg_${user.id}.${tokenDB}`, Date.now());
//         let begEmbed = new Discord.MessageEmbed().setImage(
//           "https://thumbs.gfycat.com/ShallowColossalBudgie-size_restricted.gif"
//         );
//         message.channel.send(begEmbed);
//         let embed = new Discord.MessageEmbed()
//           .setColor("YELLOW")
//           .setDescription(
//             `✔ You Poor begger you received ${amounts} __**oyons**__ <:Oyon:949194574344114196> `
//           );
//         message.channel.send(embed);
//       }
//     }
//   },
// };
