// const Discord = require("discord.js");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const config = require("../../config.json");
// const wazBow = require("../../weaponStats/wazbow.json");
// const moneyCap = config.moneyCap;
// const mathjs = require("mathjs");

// module.exports = {
//   name: "play",
//   aliases: ["play"],
//   description: "To play event",
//   usage: "play",
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
//       const oyoEvent = db.fetch(`oyoEventActive`);
//       if (oyoEvent == true) {
//         let user = message.author;
//         const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//         const banned = db.fetch(`banned_${tokenDB}`);
//         const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//         const banDate = db.fetch(`banDate_${tokenDB}`);
//         const update = db.fetch(`updateInProgress`);

//         if (!tokenDB) {
//           message.channel.send(
//             `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
//           );
//         } else if (banned == true) {
//           const banEmbed = new Discord.MessageEmbed()
//             .setTitle(user)
//             .setDescription(`This account is banned`)
//             .addField("Reason", `${banReason}`)
//             .addField("Date", `${banDate}`)
//             .setColor("#FFFF00");
//           message.channel.send(banEmbed);
//         } else if (update == true) {
//           message.channel.send(
//             `You cannot use any commands right now! Bot is updating`
//           );
//         } else {
//           const texarus = db.fetch(`texarus_${tokenDB}`);
//           const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//           const natureDaggersEquipped = db.fetch(
//             `equippedNatureDaggers_${tokenDB}`
//           );
//           const immortalGun = db.fetch(`immortalGun_${tokenDB}`);
//           const immortalGunEquipped = db.fetch(
//             `equippedImmortalGun_${tokenDB}`
//           );
//           const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//           const ventorianBowEquipped = db.fetch(
//             `equippedVentorianBow_${tokenDB}`
//           );
//           const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//           const waetra = db.fetch(`waetra_${tokenDB}`);
//           const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//           const rasheta = db.fetch(`rasheta_${tokenDB}`);
//           const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//           const oyoBoss = "Synrillax the beast";
//           //   const oyoBossHealth = 50000;
//           //   const oyoBossHealth = db.set(
//           //     `oyoBossDamage_${tokenDB}`,
//           //     106420
//           //   );
//           const items = [""];
//           let chance = Math.floor(Math.random() * 100) + 0.5;
//           let randomPoints = Math.floor(Math.random() * 34) + 1;
//           const randomItems = items[Math.floor(Math.random() * items.length)];
//           var randomGoldCoins = Math.floor(Math.random() * 750000) + 150000;
//           if (args[0] === "hit") {
//             if (
//               !ventorianBow &&
//               !texarus &&
//               !waetra &&
//               !rasheta &&
//               !natureDaggers &&
//               !immortalGun
//             ) {
//               message.channel.send(
//                 `${user} you need a weapon first , type **+gw** for your free weapon`
//               );
//             } else if (
//               texarusEquipped === "False" &&
//               waetraEquipped === "False" &&
//               rashetaEquipped === "False" &&
//               natureDaggersEquipped === "False" &&
//               ventorianBowEquipped === "False" &&
//               immortalGunEquipped == "False"
//             ) {
//               message.channel.send(
//                 `You need to equip a weapon first , eg : +equip bow ventorian`
//               );
//             } else {
//               timeout = 1500;
//               var cooldown = db.fetch(`cooldown_${tokenDB}`);
//               if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
//                 let time = ms(timeout - (Date.now() - cooldown));

//                 let timeEmbed = new Discord.MessageEmbed()
//                   .setColor("#FFFFFF")
//                   .setTitle(`Spamming isn't a good thing`)
//                   .setDescription(
//                     `You need to wait ${time.seconds}s ${time.milliseconds}ms `
//                   );
//                 message.channel.send(timeEmbed);
//               } else {
//                 const antiBot = db.fetch(`antiBot_${tokenDB}`);
//                 if (antiBot == 42) {
//                   const botDetectionEnabled = new Discord.MessageEmbed()
//                     .setTitle(`Bot detection`)
//                     .setDescription(
//                       "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                     );
//                   db.add(`antiBot_${tokenDB}`, 1);
//                   console.log(antiBot);
//                   message.channel.send(botDetectionEnabled);
//                 } else if (antiBot == 43) {
//                   const botDetectionEnabled = new Discord.MessageEmbed()
//                     .setTitle(`Bot detection`)
//                     .setDescription(
//                       "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                     );
//                   db.add(`antiBot_${tokenDB}`, 1);
//                   console.log(antiBot);
//                   message.channel.send(botDetectionEnabled);
//                 } else if (antiBot == 44) {
//                   const botDetectionEnabled = new Discord.MessageEmbed()
//                     .setTitle(`Bot detection`)
//                     .setDescription(
//                       "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                     );
//                   db.add(`antiBot_${tokenDB}`, 1);
//                   console.log(antiBot);
//                   message.channel.send(botDetectionEnabled);
//                 } else if (antiBot == 45) {
//                   const botDetectionEnabled = new Discord.MessageEmbed()
//                     .setTitle(`Bot detection`)
//                     .setDescription(
//                       "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                     );
//                   db.add(`antiBot_${tokenDB}`, 1);
//                   console.log(antiBot);
//                   message.channel.send(botDetectionEnabled);
//                 } else if (antiBot == 46) {
//                   const botDetectionEnabled = new Discord.MessageEmbed()
//                     .setTitle(`Bot detection`)
//                     .setDescription(
//                       "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                     );
//                   db.add(`antiBot_${tokenDB}`, 1);
//                   console.log(antiBot);
//                   message.channel.send(botDetectionEnabled);
//                 } else if (antiBot == 47) {
//                   let date = new Date();
//                   let day = date.getDate();
//                   let month = date.getMonth() + 1;
//                   let year = date.getFullYear();

//                   let fullDate = `${day}.${month}.${year}.`;
//                   db.set(`banned_${tokenDB}`, true);
//                   db.set(`reasonForBan_${tokenDB}`, "Using auto clicker");
//                   db.set(`banDate_${tokenDB}`, fullDate);
//                   message.channel.send(
//                     `
// You've banned from Lustrozy economy for - Using auto clicker
// Date : ${fullDate}
// `
//                   );
//                   const bannedEmbed = new Discord.MessageEmbed()
//                     .setTitle("ACCOUNT BANNED !!")
//                     .setDescription(
//                       `
// You have been auto banned From Lustrozy Economy |
// Reason : Using auto clicker |
// Banned by : <@934850905273159710> |
// `
//                     )
//                     .setTimestamp()
//                     .setColor("#FF0000");
//                   user.send(bannedEmbed);
//                 } else {
//                   if (texarusEquipped === "True") {
//                     if (texarus == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedTexarus_${tokenDB}`, false);
//                     } else {
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy boss`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${texarusDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         db.subtract(
//                           `oyoBossHealth_${user.id}`,
//                           texarusDamage.Damage
//                         );
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy boss`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${texarusDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }

//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `diff
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (waetraEquipped === "True") {
//                     if (waetra == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedWaetra_${tokenDB}`, false);
//                     } else {
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${waetraDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         db.subtract(
//                           `oyoBossHealth_${user.id}`,
//                           waetraDamage.Damage
//                         );

//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${waetraDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }

//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (natureDaggersEquipped === "True") {
//                     if (natureDaggers == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                     } else {
//                       const oyoBossHealth = db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         natureDaggerss.Damage
//                       );
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }

//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (immortalGunEquipped === "True") {
//                     if (immortalGun == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedVentorianBow_${tokenDB}`, false);
//                     } else {
//                       const oyoBossHealth = db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         immortalGunn.Damage
//                       );
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${immortalGunn.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy boss`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${immortalGunn.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }
//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (natureDaggersEquipped === "True") {
//                     if (natureDaggers == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                     } else {
//                       const oyoBossHealth = db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         natureDaggerss.Damage
//                       );
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }

//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (ventorianBowEquipped === "True") {
//                     if (ventorianBow == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedVentorianBow_${tokenDB}`, false);
//                     } else {
//                       const oyoBossHealth = db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         ventorianBoww.Damage
//                       );
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy boss`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }
//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 2.5) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   } else if (rashetaEquipped === "True") {
//                     if (natureDaggers == 0) {
//                       message.channel.send(`You sold your weapon already`);
//                       db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                     } else {
//                       const oyoBossHealth = db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         rashetaDamage.Damage
//                       );
//                       if (oyoBossHealth < 0) {
//                         const oyoBossEmbed2 = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy Boss Total Health`, `1280986`)
//                           .addField(`Lustrozy Boss current health`, `0`)
//                           .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed2);
//                         db.add(`antiBot_${tokenDB}`, 1);
//                       } else {
//                         const oyoBossEmbed = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you hit ${oyoBoss}`)
//                           .addField(`Lustrozy boss`, `1280986`)
//                           .addField(
//                             `Lustrozy Boss current health`,
//                             `${oyoBossHealth}`
//                           )
//                           .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                           .setColor("#0096FF");
//                         message.channel.send(oyoBossEmbed);
//                         db.set(`cooldown_${tokenDB}`, Date.now());
//                       }
//                       if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                         const oyoBossDead = new Discord.MessageEmbed()
//                           .setTitle(`${oyoBoss}`)
//                           .setDescription(`${user} you killed ${oyoBoss}`)
//                           .setColor("#EE4B2B");
//                         message.channel.send(oyoBossDead);
//                         db.set(`oyoBossHealth_${user.id}`, 1280986);
//                         if (chance <= 1.5) {
//                           if (randomItems == "Oyo pack") {
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : Oyo pack
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoPack_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "Golden ghost knight set") {
//                             message.channel.send(
//                               "```" +
//                                 `yaml
// You received : Golden Ghost knight set
// ` +
//                                 "```"
//                             );
//                             db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                           if (randomItems == "3,250 platinum") {
//                             db.add(`orons_${tokenDB}`, 3250);
//                             message.channel.send(
//                               "```" +
//                                 `diff
// -You received : 3,250 platinum
// ` +
//                                 "```"
//                             );
//                             db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           }
//                         } else if (chance <= 1) {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo mask
// ` +
//                               "```"
//                           );
//                           db.add(`oyoMask_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         } else {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                           randomGoldCoins = randomGoldCoins
//                             .toString()
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                           message.channel.send(
//                             "```" +
//                               `
// You received ${randomGoldCoins} Gold Coins
// ` +
//                               "```"
//                           );
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   },
// };
