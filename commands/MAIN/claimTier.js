// const Discord = require("discord.js");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const config = require("../../config.json");
// const prices = require("../../prices.json");
// module.exports = {
//   name: "claimTier",
//   aliases: ["ClaimTier", "ct"],
//   description: "To claimTier",
//   usage: "claimTier",
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
//       var oyoEventPoints = db.fetch(`oyoEventPoints_${tokenDB}`);
//       var oyoEventTier = db.fetch(`oyoEventTier_${tokenDB}`);
//       if (oyoEventTier == null) {
//         if (oyoEventPoints > 750 || oyoEventPoints == 750) {
//           message.channel.send(
//             `You have been granted (BRONZE TIER REWARD) : 600 platinum`
//           );
//           db.set(`OyoEventBronzeTierRewardClaimed_${tokenDB}`, true);
//           db.set(`oyoEventTier_${tokenDB}`, "Bronze");
//           db.add(`orons_${tokenDB}`, 600);
//         } else {
//           message.channel.send(
//             `You need more ${750 - oyoEventPoints} points for Bronze tier`
//           );
//         }
//       }
//       var bronzeRewardClaimed = db.fetch(
//         `OyoEventBronzeTierRewardClaimed_${tokenDB}`
//       );
//       var silverRewardClaimed = db.fetch(
//         `OyoEventSilverTierRewardClaimed_${tokenDB}`
//       );
//       var GoldRewardClaimed = db.fetch(
//         `OyoEventGoldTierRewardClaimed_${tokenDB}`
//       );
//       var PlatinumRewardClaimed = db.fetch(
//         `OyoEventPlatinumTierRewardClaimed_${tokenDB}`
//       );
//       if (bronzeRewardClaimed == true) {
//         if (!silverRewardClaimed) {
//           if (oyoEventPoints > 3200 || oyoEventPoints == 3200) {
//             message.channel.send(
//               `You have been granted (SILVER TIER REWARD) : 250 platinum`
//             );
//             db.set(`OyoEventSilverTierRewardClaimed_${tokenDB}`, true);
//             db.set(`oyoEventTier_${tokenDB}`, "Silver");
//             db.add(`orons_${tokenDB}`, 250);
//           }
//         } else if (silverRewardClaimed == true) {
//           if (!GoldRewardClaimed) {
//             if (oyoEventPoints > 8960 || oyoEventPoints == 8960) {
//               message.channel.send(
//                 `You have been granted (GOLD TIER REWARD) : Intrepid Vanity Set`
//               );
//               db.set(`OyoEventGoldTierRewardClaimed_${tokenDB}`, true);
//               db.set(`oyoEventTier_${tokenDB}`, "Gold");
//               db.add(`intrepidSet_${tokenDB}`, 1);
//             } else {
//               message.channel.send(`You need more points`);
//             }
//           } else if (GoldRewardClaimed == true) {
//             if (!PlatinumRewardClaimed) {
//               if (oyoEventPoints > 17560 || oyoEventPoints == 17560) {
//                 message.channel.send(
//                   `You have been granted (PLATINUM TIER REWARD) : Medusa Vanity Set`
//                 );
//                 db.set(`OyoEventPlatinumTierRewardClaimed_${tokenDB}`, true);
//                 db.set(`oyoEventTier_${tokenDB}`, "Platinum");
//                 db.add(`medusaSet_${tokenDB}`, 1);
//               } else {
//                 message.channel.send(`You need more points`);
//               }
//             } else if (PlatinumRewardClaimed == true) {
//               message.channel.send(`You are Already in Platinum tier`);
//             }
//           }
//         }
//       }

//       //   } else if (
//       //     !bronzeRewardClaimed &&
//       //     !silverRewardClaimed &&
//       //     !GoldRewardClaimed &&
//       //     !PlatinumRewardClaimed
//       //   ) {
//       //     if (oyoEventPoints > 17560 || oyoEventPoints == 17560) {
//       //       message.channel.send(
//       //         `You have been granted (BRONZE TIER REWARD) : 600 platinum`
//       //       );
//       //       db.set(`OyoEventBronzeTierRewardClaimed_${user.id}.${tokenDB}`, true);
//       //       message.channel.send(
//       //         `You have been granted (SILVER TIER REWARD) : 250 platinum`
//       //       );
//       //       db.set(`OyoEventSilverTierRewardClaimed_${user.id}.${tokenDB}`, true);
//       //       message.channel.send(
//       //         `You have been granted (GOLD TIER REWARD) : Intrepid Vanity Set`
//       //       );
//       //       db.set(`OyoEventGoldTierRewardClaimed_${user.id}.${tokenDB}`, true);
//       //       message.channel.send(
//       //         `You have been granted (PLATINUM TIER REWARD) : Medusa Vanity Set`
//       //       );
//       //       db.set(
//       //         `OyoEventPlatinumTierRewardClaimed_${user.id}.${tokenDB}`,
//       //         true
//       //       );
//       //     }
//     }
//   },
// };
