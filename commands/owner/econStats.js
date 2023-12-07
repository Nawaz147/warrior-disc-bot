// const Discord = require("discord.js");
// const db = require("quick.db");
// const config = require("../../config.json");
// const prices = require("../../prices.json");
// const icons = require("../../itemIcons.json");
// const startFunction = require("../../startCommandFunction.js");
// const moneyCap = config.moneyCap;
// module.exports = {
//   name: "econStats",
//   aliases: ["es", "Economy"],
//   category: "owner",
//   description: "Generates an invitation to the server in question.",
//   usage: "gi",

//   run: async (bot, message, args) => {
//     const user = message.author;
//     const tokenDB = db.fetch(`${user.id}.valoriumToken`);

//     if (!args[0]) {
//       function createEconomyEmbed(title, description) {
//         return new Discord.MessageEmbed()
//           .setTitle("ECONOMY STATS")
//           .setDescription(description)
//           .setColor("#00ff00");
//       }
//       // Calculate average money per user
//       var averageMoneyPerUser = calculateAverageMoneyPerUser();
//       averageMoneyPerUser = averageMoneyPerUser
//         .toString()
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//       // Create and send the embed
//       const embed = createEconomyEmbed(
//         "Economy Stats - Average Money Per User (including goldBars)",
//         `Average Money Per User: ${averageMoneyPerUser}`
//       );

//       message.channel.send(embed);
//       return;
//     } else {
//       function calculateTotalItemPieces(itemName) {
//         const allUserTokens = db
//           .all()
//           .filter((entry) => entry.ID.startsWith(`${args[0]}_`))
//           .map((entry) => entry.ID.slice(6));

//         let totalItemPieces = 0;

//         for (const tokenDB of allUserTokens) {
//           const tokenDB = db.fetch(`${user.id}.valoriumToken`);
//           const userItemPieces = db.get(`${itemName}_${tokenDB}`) || 0;
//           totalItemPieces += userItemPieces;
//         }

//         return totalItemPieces;
//       }

//       // Assume args[1] contains the item name
//       itemName = args[0];
//       let fullNameItem = itemName.charAt(0).toUpperCase() + itemName.slice(1); // Capitalize the first letter
//       fullNameItem = fullNameItem.replace(/([A-Z])/g, " $1").trim(); // Formatting

//       // Calculate total item pieces in the economy
//       const totalItemPieces = calculateTotalItemPieces(itemName);

//       function createEconomyEmbed(title, description) {
//         return new Discord.MessageEmbed()
//           .setTitle("ECONOMY STATS - " + fullNameItem)
//           .setDescription(description)
//           .setColor("#00ff00");
//       }

//       const embed = createEconomyEmbed(
//         `Economy Stats - Total ${fullNameItem} Pieces in the Economy`,
//         `Total '${fullNameItem}' Pieces: ${totalItemPieces}`
//       );
//       message.channel.send(embed);
//       return;
//     }

//     function calculateAverageMoneyPerUser() {
//       const allUserTokens = db
//         .all()
//         .filter((entry) => entry.ID.startsWith("money_"))
//         .map((entry) => entry.ID.slice(6));

//       let totalMoney = 0;

//       for (const tokenDB of allUserTokens) {
//         const tokenDB = db.fetch(`${user.id}.valoriumToken`);
//         const userBalance = db.get(`money_${tokenDB}.pocket`) || 0;
//         const userGoldBars = db.get(`goldBar_${tokenDB}`) || 0;

//         // Each goldBar is worth 10,000,000
//         totalMoney += userBalance + userGoldBars * 10000000;
//       }

//       const totalUsers = allUserTokens.length;
//       return totalUsers === 0 ? 0 : totalMoney / totalUsers;
//     }
//   },
// };
