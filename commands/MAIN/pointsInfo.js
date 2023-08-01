// const Discord = require("discord.js");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const config = require("../../config.json");
// const prices = require("../../prices.json");
// module.exports = {
//   name: "points",
//   aliases: ["Points"],
//   description: "To see points",
//   usage: "points",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.author ||
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]);
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//     const banDate = db.fetch(`banDate_${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
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
//       var oyoEventPoints = db.fetch(`oyoEventPoints_${tokenDB}`);
//       var oyoEventTier = db.fetch(`oyoEventTier_${tokenDB}`);
//       if (oyoEventTier == null) {
//         var oyoEventTier = "None";
//       }
//       const pointsEmbed = new Discord.MessageEmbed()
//         .setTitle(`${user}'s POINTS`)
//         .addField(`Points`, `${oyoEventPoints}`)
//         .addField(`Tier`, `${oyoEventTier}`).setDescription(`
// **TIERS**
// **Bronze tier** - 750 points (Reward : 600 platinum)
// **Silver tier** - 3,200 points (Reward : 250 platinum)
// **Gold tier** - 8,960 points (Reward : Intrepid Vanity set)
// **Platinum tier** - 17,560 points (Reward : Medusa Vanity set)
//         `);
//       message.channel.send(pointsEmbed);
//     }
//   },
// };
