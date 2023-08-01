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

//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
//     const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);
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
//       // Retrieve all users from the database
//       const allUsers = db
//         .all()
//         .filter((data) => data.ID.includes(".oyOtoken"))
//         .map((data) => data.ID.split(".")[0]);

//       // Create an array to store the leaderboard data
//       const leaderboard = [];

//       // Loop through each user and extract the event points from tokenDB
//       for (const token of allUsers) {
//         const eventPoints = db.fetch(`${token}.warriorEventPoints`);
//         if (eventPoints !== null) {
//           leaderboard.push({ token, eventPoints });
//         }
//       }

//       // Sort the leaderboard array in descending order based on event points
//       leaderboard.sort((a, b) => b.eventPoints - a.eventPoints);

//       // Limit the number of users to display in the leaderboard (maximum 5)
//       const maxUsersToShow = Math.min(leaderboard.length, 5);
//       const topUsers = leaderboard.slice(0, maxUsersToShow);

//       // Create an embed to display the leaderboard
//       const leaderboardEmbed = new Discord.MessageEmbed()
//         .setTitle("Top Leaderboard based on Event Points")
//         .setColor("#E1B530");

//       // Add each user's data to the embed
//       for (let i = 0; i < topUsers.length; i++) {
//         const userData = topUsers[i];
//         const user = await client.users.fetch(userData.token);
//         leaderboardEmbed.addField(
//           `${i + 1}. ${user.username}`,
//           `Event Points: ${userData.eventPoints}`
//         );
//       }

//       // Send the embed to the channel
//       if (leaderboard.length === 0) {
//         return message.channel.send("No users found with event points.");
//       } else {
//         message.channel.send(leaderboardEmbed);
//       }
//     }
//   },
// };
