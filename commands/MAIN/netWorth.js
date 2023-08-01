// const Discord = require("discord.js");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const config = require("../../config.json");
// const prices = require("../../prices.json");
// module.exports = {
//   name: "netWorth",
//   aliases: ["Net", "net", "NetWorth"],
//   description: "To see netWorth",
//   usage: "netWorth",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
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
//       var rubyOfRoyalty = db.fetch(`rubyOfRoyalty_${tokenDB}`);
//       var goldenGloryCard = db.fetch(`goldenGloryCard_${tokenDB}`);
//       var royalStatueOfHonor = db.fetch(`royalStatueOfHonor_${tokenDB}`);
//       var oyoMask = db.fetch(`oyoMask_${tokenDB}`);
//       var royaltyCoin = db.fetch(`royaltyCoin_${tokenDB}`);
//       var magnificentCarpetPieces = db.fetch(`magnificentCarpet_${tokenDB}`);
//       var magnificentPenPieces = db.fetch(`magnificentPen_${tokenDB}`);
//       var splendidTrophyPieces = db.fetch(`splendidTrophy_${tokenDB}`);
//       var arcaneSenseiPieces = db.fetch(`arcaneSenseiSet_${tokenDB}`);

//       balance = db.fetch(`money_${tokenDB}.pocket`);
//       ItemsNetWorth =
//         rubyOfRoyalty * prices.rubyOfRoyalty +
//         goldenGloryCard * prices.goldenGloryCard +
//         royalStatueOfHonor * prices.royalStatueOfHonor +
//         oyoMask * prices.oyoMask +
//         royaltyCoin * prices.royaltyCoin +
//         magnificentCarpetPieces * prices.magnificentCarpet +
//         magnificentPenPieces * prices.magnificentPen +
//         splendidTrophyPieces * prices.splendidTrophy +
//         arcaneSenseiPieces * prices.arcaneSenseiSet;
//       ItemsNetWorth = ItemsNetWorth.toString().replace(
//         /\B(?=(\d{3})+(?!\d))/g,
//         ","
//       );
//       netWorth =
//         rubyOfRoyalty * prices.rubyOfRoyalty +
//         goldenGloryCard * prices.goldenGloryCard +
//         royalStatueOfHonor * prices.royalStatueOfHonor +
//         oyoMask * prices.oyoMask +
//         royaltyCoin * prices.royaltyCoin +
//         magnificentCarpetPieces * prices.magnificentCarpet +
//         magnificentPenPieces * prices.magnificentPen +
//         splendidTrophyPieces * prices.splendidTrophy +
//         arcaneSenseiPieces * prices.arcaneSenseiSet +
//         balance;
//       netWorth = netWorth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//       balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//       const netWorthEmbed = new Discord.MessageEmbed()
//         .setTitle(`${user}'s Net Worth`)
//         .setDescription(
//           `
// Items net worth : ${ItemsNetWorth} Gold coins
// Money net worth : ${balance} Gold coins
// Total net worth : ${netWorth} Gold coins
// `
//         )
//         .setFooter(
//           "NOTE : weapons price doesnt count in total net worth and items net worth"
//         )
//         .setColor("#ffffff");
//       message.channel.send(netWorthEmbed);
//       bal = db.fetch(`money_${tokenDB}.pocket`);
//     }
//   },
// };
