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
//   name: "play",
//   aliases: ["Play", "PLAY", "pLaY", "PlAy"],
//   description: "To play the event",
//   usage: "play",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const luxaryCollectorsEvent = db.fetch(`luxaryCollectorsEventActive`);
//     if (luxaryCollectorsEvent == true) {
//       let user = message.author;
//       const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//       const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
//       const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
//       const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);

//       if (!tokenDB) {
//         message.channel.send(
//           `${user} your Oyo token is not registered yet , type Oyo token me to set your Oyo token`
//         );
//       } else if (banned == true) {
//         const banEmbed = new Discord.MessageEmbed()
//           .setTitle(user)
//           .setDescription(`This account is banned`)
//           .addField("Reason", `${banReason}`)
//           .addField("Date", `${banDate}`)
//           .setColor("#FFFF00");
//         message.channel.send(banEmbed);
//       } else {
//         const texarus = db.fetch(`texarus_${user.id}.${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${user.id}.${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${user.id}.${tokenDB}`
//         );
//         const ventorianBow = db.fetch(`ventorianBow_${user.id}.${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${user.id}.${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(
//           `equippedTexarus_${user.id}.${tokenDB}`
//         );
//         const waetra = db.fetch(`waetra_${user.id}.${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${user.id}.${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${user.id}.${tokenDB}`);
//         const rashetaEquipped = db.fetch(
//           `equippedRasheta_${user.id}.${tokenDB}`
//         );
//         const royalBoss = "Royal Boss";
//         //   const royalBossHealth = 50000;
//         //   const royalBossHealth = db.set(
//         //     `royalBossDamage_${user.id}.${tokenDB}`,
//         //     92750
//         //   );
//         const rubyOfRoyalty = ["Ruby of Royalty"];
//         const goldenGloryCard = ["Golden glory card"];
//         const royalStatueOfHonor = ["Royal staue of honor"];
//         const royaltyCoin = ["Royalty coin"];
//         let chance = Math.floor(Math.random() * 100) + 0;
//         var randomOyons = Math.floor(Math.random() * 65000) + 0;
//         //   var randomOyons = randomOyons
//         //     .toString()
//         //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         const royalBossHealth = db.set(`royalBossHealth`, 92750);
//         if (args[0] === "hit") {
//           if (
//             texarusEquipped === "False" &&
//             waetraEquipped === "False" &&
//             rashetaEquipped === "False" &&
//             natureDaggersEquipped === "False" &&
//             ventorianBowEquipped === "False"
//           ) {
//             message.channel.send(`${user} you need to equip a weapon first`);
//           } else if (
//             !ventorianBow &&
//             !texarus &&
//             !waetra &&
//             !rasheta &&
//             !natureDaggers
//           ) {
//             message.channel.send(`You need a weapon to play this event`);
//           } else {
//             const royalBossHealth = db.fetch(`royalBossHealth_${user.id}`);
//             if (texarusEquipped === "True") {
//               if (royalBossHealth < 0) {
//                 const royalBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed2);
//               } else {
//                 const royalBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `${royalBossHealth}`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed);
//               }
//               db.subtract(`royalBossHealth_${user.id}`, texarusDamage.Damage);

//               if (royalBossHealth == 0 || royalBossHealth < 0) {
//                 const royalBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you killed ${royalBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(royalBossDead);
//                 db.set(`royalBossHealth_${user.id}`, 92750);
//                 if (chance <= 1) {
//                   if (rubyOfRoyalty == "Ruby of Royalty") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Ruby of Royalty !!!
// ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Golden glory card !!!
//   ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Royal statue of honor !!!
//   ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 4) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
// !!! You received : Royalty coin !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
// You received : ${randomOyons} oyons
//  ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
// You received : ${randomOyons} oyons
//  ` +
//                       "```"
//                   );
//                   db.add(`money_${user.id}.${tokenDB}.pocket`, randomOyons);
//                 }
//               }
//             } else if (waetraEquipped === "True") {
//               if (royalBossHealth < 0) {
//                 const royalBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${waetraDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed2);
//               } else {
//                 const royalBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `${royalBossHealth}`)
//                   .addField(`Your damage`, `${waetraDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed);
//               }
//               db.subtract(`royalBossHealth_${user.id}`, waetraDamage.Damage);

//               if (royalBossHealth == 0 || royalBossHealth < 0) {
//                 const royalBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you killed ${royalBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(royalBossDead);
//                 db.set(`royalBossHealth_${user.id}`, 92750);
//                 if (chance <= 1) {
//                   if (rubyOfRoyalty == "Ruby of Royalty") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Ruby of Royalty !!!
//     ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Golden glory card !!!
//     ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Royal statue of honor !!!
//     ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 4) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//   !!! You received : Royalty coin !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
// You received : ${randomOyons} oyons
//    ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
// You received : ${randomOyons} oyons
//    ` +
//                       "```"
//                   );
//                   db.add(`money_${user.id}.${tokenDB}.pocket`, randomOyons);
//                 }
//               }
//             } else if (natureDaggersEquipped === "True") {
//               if (royalBossHealth < 0) {
//                 const royalBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed2);
//               } else {
//                 const royalBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `${royalBossHealth}`)
//                   .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed);
//               }
//               db.subtract(`royalBossHealth_${user.id}`, natureDaggerss.Damage);

//               if (royalBossHealth == 0 || royalBossHealth < 0) {
//                 const royalBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you killed ${royalBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(royalBossDead);
//                 db.set(`royalBossHealth_${user.id}`, 92750);
//                 if (chance <= 1) {
//                   if (rubyOfRoyalty == "Ruby of Royalty") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Ruby of Royalty !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Golden glory card !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Royal statue of honor !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 4) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
// !!! You received : Royalty coin !!!
//           ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                   db.add(`money_${user.id}.${tokenDB}.pocket`, randomOyons);
//                 }
//               }
//             } else if (ventorianBowEquipped === "True") {
//               if (royalBossHealth < 0) {
//                 const royalBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed2);
//               } else {
//                 const royalBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `${royalBossHealth}`)
//                   .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed);
//               }
//               db.subtract(`royalBossHealth_${user.id}`, ventorianBoww.Damage);

//               if (royalBossHealth == 0 || royalBossHealth < 0) {
//                 const royalBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you killed ${royalBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(royalBossDead);
//                 db.set(`royalBossHealth_${user.id}`, 92750);
//                 if (chance <= 1) {
//                   if (rubyOfRoyalty == "Ruby of Royalty") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//     -!!! You received : Ruby of Royalty !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Golden glory card !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Royal statue of honor !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 4) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
// !!! You received : Royalty coin !!!
//           ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                 }
//                 {
//                   db.add(`money_${user.id}.${tokenDB}.pocket`, randomOyons);
//                 }
//               }
//             } else if (rashetaEquipped === "True") {
//               if (royalBossHealth < 0) {
//                 const royalBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed2);
//               } else {
//                 const royalBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you hit ${royalBoss}`)
//                   .addField(`Royal Boss Total Health`, `92750`)
//                   .addField(`Royal Boss current Health`, `${royalBossHealth}`)
//                   .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                   .setColor("#FFD700");
//                 message.channel.send(royalBossEmbed);
//               }
//               db.subtract(`royalBossHealth_${user.id}`, rashetaDamage.Damage);

//               if (royalBossHealth == 0 || royalBossHealth < 0) {
//                 const royalBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${royalBoss}`)
//                   .setDescription(`${user} you killed ${royalBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(royalBossDead);
//                 db.set(`royalBossHealth_${user.id}`, 92750);
//                 if (chance <= 1) {
//                   if (rubyOfRoyalty == "Ruby of Royalty") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//     -!!! You received : Ruby of Royalty !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Golden glory card !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
// -!!! You received : Royal statue of honor !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 4) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
// !!! You received : Royalty coin !!!
//           ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//  You received : ${randomOyons} oyons
//      ` +
//                       "```"
//                   );
//                   db.add(`money_${user.id}.${tokenDB}.pocket`, randomOyons);
//                 }
//               }
//             }
//           }
//         }
//       }
//     } else {
//     }
//   },
// };
