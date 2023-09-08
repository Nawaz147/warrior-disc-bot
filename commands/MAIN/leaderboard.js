// const Discord = require("discord.js");
// const db = require("quick.db");

// module.exports = {
//   name: "leaderboard",
//   aliases: ["lb", "LB", "Leaderboard", "LeaderBoard"],
//   description: "To see leaderboard",
//   usage: "leaderboard",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;

//     const tokenDB = db.fetch(`${message.author.id}.valoriumToken`); // Use message.author.id here
//     const banned = db.fetch(`banned_${message.author.id}.${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${message.author.id}.${tokenDB}`);
//     const banDate = db.fetch(`banDate_${message.author.id}.${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

//     if (!tokenDB) {
//       return message.channel.send(
//         `${user} your Warrior token is not registered yet, type +token me to set your Warrior token`
//       );
//     } else if (banned == true) {
//       const banEmbed = new Discord.MessageEmbed()
//         .setTitle(user.username)
//         .setDescription(`This account is banned`)
//         .addField("Reason", `${banReason}`)
//         .addField("Date", `${banDate}`)
//         .setColor("#FFFF00");
//       return message.channel.send(banEmbed);
//     } else if (update == true) {
//       return message.channel.send(
//         `You cannot use any commands right now! Bot is updating`
//       );
//     } else {
//       const allUserIds = db
//         .all()
//         .map((data) => data.ID)
//         .filter((id) => id.startsWith("netWorth_"));

//       // Calculate net worth for each user and store it in an array
//       const netWorthData = allUserIds.map((userId) => {
//         const netWorth = db.fetch(userId);
//         const userTokenDB = db.fetch(`${userId}.valoriumToken`); // Use a different variable name
//         const userName = userTokenDB ? userTokenDB.name : "User Not Available"; // Use a placeholder if name is not found

//         return { userId, netWorth, userName };
//       });

//       // Sort the data by net worth in descending order
//       netWorthData.sort((a, b) => b.netWorth - a.netWorth);

//       // Limit the leaderboard to the top 10 users
//       const topUsers = netWorthData.slice(0, 5);

//       // Create a leaderboard embed
//       const leaderboardEmbed = new Discord.MessageEmbed()
//         .setColor("#6B4226")
//         .setTitle("Net Worth Leaderboard")
//         .setDescription("Top 5 Users by Net Worth");

//       // Add each user to the embed
//       for (let index = 0; index < topUsers.length; index++) {
//         const userData = topUsers[index];
//         const userName = userData.userName || "User Not Available"; // Use a placeholder if name is not found

//         leaderboardEmbed.addField(
//           `${index + 1}. ${userName}`,
//           `Net Worth: $${userData.netWorth.toLocaleString()}`
//         );
//       }

//       // Send the leaderboard embed to the channel
//       message.channel.send(leaderboardEmbed);
//     }
//   },
// };
