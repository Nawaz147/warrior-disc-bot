// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
// const waetraDamage = require("../../weaponStats/waetraBow.json");
// const texarusDamage = require("../../weaponStats/texarusStaff.json");
// const natureDaggerss = require("../../weaponStats/natureDaggers.json");
// const ventorianBoww = require("../../weaponStats/ventorianBow.json");
// const immortalGunn = require("../../weaponStats/immortalGun.json");
// module.exports = {
//   name: "play",
//   aliases: ["Play", "PLAY", "pLaY", "PlAy"],
//   description: "To play the event",
//   usage: "play",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const goldRainEvent = db.fetch(`goldRainEventActive`);
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//     const banDate = db.fetch(`banDate_${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your warrior legends is not registered yet , type +token me to set your warrior legends`
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
//       if (goldRainEvent == true) {
//         const texarus = db.fetch(`texarus_${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${tokenDB}`
//         );
//         const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//         const waetra = db.fetch(`waetra_${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${tokenDB}`);
//         const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//         const goldMonsterBoss = "+Boss";
//         //   const goldMonsterBossHealth = 50000;
//         //   const goldMonsterBossHealth = db.set(
//         //     `goldMonsterBossDamage_${tokenDB}`,
//         //     106420
//         //   );
//         const tokens = ["25", "20", "5", "10"];
//         let chance = Math.floor(Math.random() * 100) + 0;
//         const randomTokens = tokens[Math.floor(Math.random() * tokens.length)];
//         var randomGoldCoins = Math.floor(Math.random() * 150000) + 0;
//         const title = ["<The Cure>"];
//         //   var randomGoldCoins = randomGoldCoins
//         //     .toString()
//         //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         const goldMonsterBossHealth = db.set(`goldMonsterBossHealth`, 106420);
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
//             const goldMonsterBossHealth = db.fetch(
//               `goldMonsterBossHealth_${user.id}`
//             );
//             if (texarusEquipped === "True") {
//               if (goldMonsterBossHealth < 0) {
//                 const goldMonsterBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(`Lustrozy Boss current health`, `0`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed2);
//               } else {
//                 const goldMonsterBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(
//                     `Lustrozy Boss current health`,
//                     `${goldMonsterBossHealth}`
//                   )
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed);
//               }
//               db.subtract(
//                 `goldMonsterBossHealth_${user.id}`,
//                 texarusDamage.Damage
//               );

//               if (goldMonsterBossHealth == 0 || goldMonsterBossHealth < 0) {
//                 const goldMonsterBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you killed ${goldMonsterBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(goldMonsterBossDead);
//                 db.set(`goldMonsterBossHealth_${user.id}`, 106420);
//                 if (chance <= 2) {
//                   message.channel.send(
//                     "```" +
//                       `diff
// -You received ${title} title
// ` +
//                       "```"
//                   );
//                   db.add(`theCureTitle_${tokenDB}`, 1);
//                   db.set(`theCureTitleName`, "<The Cure>");
//                 } else {
//                   message.channel.send(
//                     "```" +
//                       `diff
// +You received : ${randomGoldCoins}
// ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                   message.channel.send(
//                     "```" +
//                       `fix
// You received : ${randomTokens} Golden Tokens
// ` +
//                       "```"
//                   );
//                   db.add(`goldenTokens_${tokenDB}`, randomTokens);
//                 }
//               }
//             } else if (waetraEquipped === "True") {
//               if (goldMonsterBossHealth < 0) {
//                 const goldMonsterBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Royal Boss Total Health`, `106420`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${waetraDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed2);
//               } else {
//                 const goldMonsterBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Royal Boss Total Health`, `106420`)
//                   .addField(
//                     `Royal Boss current Health`,
//                     `${goldMonsterBossHealth}`
//                   )
//                   .addField(`Your damage`, `${waetraDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed);
//               }
//               db.subtract(
//                 `goldMonsterBossHealth_${user.id}`,
//                 waetraDamage.Damage
//               );

//               if (goldMonsterBossHealth == 0 || goldMonsterBossHealth < 0) {
//                 const goldMonsterBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you killed ${goldMonsterBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(goldMonsterBossDead);
//                 db.set(`goldMonsterBossHealth_${user.id}`, 106420);
//                 if (chance <= 2) {
//                   message.channel.send(
//                     "```" +
//                       `diff
// -You received ${title} title
// ` +
//                       "```"
//                   );
//                   db.add(`theCureTitle_${tokenDB}`, 1);
//                   db.set(`theCureTitleName`, "<The Cure>");
//                 } else {
//                   message.channel.send(
//                     "```" +
//                       `diff
// +You received : ${randomGoldCoins}
// ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                   message.channel.send(
//                     "```" +
//                       `fix
// You received : ${randomTokens} Golden Tokens
// ` +
//                       "```"
//                   );
//                   db.add(`goldenTokens_${tokenDB}`, randomTokens);
//                 }
//               }
//             } else if (natureDaggersEquipped === "True") {
//               if (goldMonsterBossHealth < 0) {
//                 const goldMonsterBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Royal Boss Total Health`, `106420`)
//                   .addField(`Royal Boss current Health`, `0`)
//                   .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed2);
//               } else {
//                 const goldMonsterBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Royal Boss Total Health`, `106420`)
//                   .addField(
//                     `Royal Boss current Health`,
//                     `${goldMonsterBossHealth}`
//                   )
//                   .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed);
//               }
//               db.subtract(
//                 `goldMonsterBossHealth_${user.id}`,
//                 natureDaggerss.Damage
//               );

//               if (goldMonsterBossHealth == 0 || goldMonsterBossHealth < 0) {
//                 const goldMonsterBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you killed ${goldMonsterBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(goldMonsterBossDead);
//                 db.set(`goldMonsterBossHealth_${user.id}`, 106420);
//                 if (chance <= 2) {
//                   message.channel.send(
//                     "```" +
//                       `diff
// -You received ${title} title
// ` +
//                       "```"
//                   );
//                   db.add(`theCureTitle_${tokenDB}`, 1);
//                   db.set(`theCureTitleName`, "<The Cure>");
//                 } else {
//                   message.channel.send(
//                     "```" +
//                       `diff
// +You received : ${randomGoldCoins}
// ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                   message.channel.send(
//                     "```" +
//                       `fix
// You received : ${randomTokens} Golden Tokens
// ` +
//                       "```"
//                   );
//                   db.add(`goldenTokens_${tokenDB}`, randomTokens);
//                 }
//               }
//             } else if (ventorianBowEquipped === "True") {
//               if (goldMonsterBossHealth < 0) {
//                 const goldMonsterBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(`Lustrozy Boss current health`, `0`)
//                   .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed2);
//               } else {
//                 const goldMonsterBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(
//                     `Lustrozy Boss current health`,
//                     `${goldMonsterBossHealth}`
//                   )
//                   .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed);
//               }
//               db.subtract(
//                 `goldMonsterBossHealth_${user.id}`,
//                 ventorianBoww.Damage
//               );

//               if (goldMonsterBossHealth == 0 || goldMonsterBossHealth < 0) {
//                 const goldMonsterBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you killed ${goldMonsterBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(goldMonsterBossDead);
//                 db.set(`goldMonsterBossHealth_${user.id}`, 106420);
//                 if (chance <= 2) {
//                   message.channel.send(
//                     "```" +
//                       `diff
// -You received ${title} title
// ` +
//                       "```"
//                   );
//                   db.add(`theCureTitle_${tokenDB}`, 1);
//                   db.set(`theCureTitleName`, "<The Cure>");
//                 } else {
//                   message.channel.send(
//                     "```" +
//                       `diff
// +You received : ${randomGoldCoins}
// ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                   message.channel.send(
//                     "```" +
//                       `fix
// You received : ${randomTokens} Golden Tokens
// ` +
//                       "```"
//                   );
//                   db.add(`goldenTokens_${tokenDB}`, randomTokens);
//                 }
//               }
//             } else if (rashetaEquipped === "True") {
//               if (goldMonsterBossHealth < 0) {
//                 const goldMonsterBossEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(`Lustrozy Boss current health`, `0`)
//                   .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed2);
//               } else {
//                 const goldMonsterBossEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you hit ${goldMonsterBoss}`)
//                   .addField(`Gold Monster boss`, `106420`)
//                   .addField(
//                     `Lustrozy Boss current health`,
//                     `${goldMonsterBossHealth}`
//                   )
//                   .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                   .setColor("#0096FF");
//                 message.channel.send(goldMonsterBossEmbed);
//               }
//               db.subtract(
//                 `goldMonsterBossHealth_${user.id}`,
//                 rashetaDamage.Damage
//               );

//               if (goldMonsterBossHealth == 0 || goldMonsterBossHealth < 0) {
//                 const goldMonsterBossDead = new Discord.MessageEmbed()
//                   .setTitle(`${goldMonsterBoss}`)
//                   .setDescription(`${user} you killed ${goldMonsterBoss}`)
//                   .setColor("#32CD32");
//                 message.channel.send(goldMonsterBossDead);
//                 db.set(`goldMonsterBossHealth_${user.id}`, 106420);
//                 if (chance <= 2) {
//                   message.channel.send(
//                     "```" +
//                       `diff
// -You received ${title} title
// ` +
//                       "```"
//                   );
//                   db.add(`theCureTitle_${tokenDB}`, 1);
//                   db.set(`theCureTitleName`, "<The Cure>");
//                 } else {
//                   message.channel.send(
//                     "```" +
//                       `diff
// +You received : ${randomGoldCoins}
// ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                   message.channel.send(
//                     "```" +
//                       `fix
// You received : ${randomTokens} Golden Tokens
// ` +
//                       "```"
//                   );
//                   db.add(`goldenTokens_${tokenDB}`, randomTokens);
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     const oyoEvent = db.fetch(`oyoEventActive`);
//     if (oyoEvent == true) {
//       let user = message.author;
//       const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//       const banned = db.fetch(`banned_${tokenDB}`);
//       const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//       const banDate = db.fetch(`banDate_${tokenDB}`);
//       const update = db.fetch(`updateInProgress`);

//       if (!tokenDB) {
//         message.channel.send(
//           `${user} your warrior legends is not registered yet , type +token me to set your warrior legends`
//         );
//       } else if (banned == true) {
//         const banEmbed = new Discord.MessageEmbed()
//           .setTitle(user)
//           .setDescription(`This account is banned`)
//           .addField("Reason", `${banReason}`)
//           .addField("Date", `${banDate}`)
//           .setColor("#FFFF00");
//         message.channel.send(banEmbed);
//       } else if (update == true) {
//         message.channel.send(
//           `You cannot use any commands right now! Bot is updating`
//         );
//       } else {
//         const texarus = db.fetch(`texarus_${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${tokenDB}`
//         );
//         const immortalGun = db.fetch(`immortalGun_${tokenDB}`);
//         const immortalGunEquipped = db.fetch(`equippedImmortalGun_${tokenDB}`);
//         const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//         const waetra = db.fetch(`waetra_${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${tokenDB}`);
//         const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//         const oyoBoss = "Lustrozy boss";
//         //   const oyoBossHealth = 50000;
//         //   const oyoBossHealth = db.set(
//         //     `oyoBossDamage_${tokenDB}`,
//         //     106420
//         //   );
//         const items = ["Oyo pack", "3,250 platinum", "Golden ghost knight set"];
//         let chance = Math.floor(Math.random() * 100) + 0.5;
//         let randomPoints = Math.floor(Math.random() * 34) + 1;
//         const randomItems = items[Math.floor(Math.random() * items.length)];
//         var randomGoldCoins = Math.floor(Math.random() * 750000) + 150000;
//         if (args[0] === "hit") {
//           if (
//             !ventorianBow &&
//             !texarus &&
//             !waetra &&
//             !rasheta &&
//             !natureDaggers &&
//             !immortalGun
//           ) {
//             message.channel.send(
//               `${user} you need a weapon first , type **+gw** for your free weapon`
//             );
//           } else if (
//             texarusEquipped === "False" &&
//             waetraEquipped === "False" &&
//             rashetaEquipped === "False" &&
//             natureDaggersEquipped === "False" &&
//             ventorianBowEquipped === "False" &&
//             immortalGunEquipped == "False"
//           ) {
//             message.channel.send(
//               `You need to equip a weapon first , eg : +equip bow ventorian`
//             );
//           } else {
//             timeout = 1500;
//             var cooldown = await db.fetch(`cooldown_${tokenDB}`);
//             if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
//               let time = ms(timeout - (Date.now() - cooldown));

//               let timeEmbed = new Discord.MessageEmbed()
//                 .setColor("#FFFFFF")
//                 .setTitle(`Spamming isn't a good thing`)
//                 .setDescription(
//                   `You need to wait ${time.seconds}s ${time.milliseconds}ms `
//                 );
//               message.channel.send(timeEmbed);
//             } else {
//               const antiBot = await db.fetch(`antiBot_${tokenDB}`);
//               if (antiBot == 42) {
//                 const botDetectionEnabled = new Discord.MessageEmbed()
//                   .setTitle(`Bot detection`)
//                   .setDescription(
//                     "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                   );
//                 await db.add(`antiBot_${tokenDB}`, 1);
//                 console.log(antiBot);
//                 message.channel.send(botDetectionEnabled);
//               } else if (antiBot == 43) {
//                 const botDetectionEnabled = new Discord.MessageEmbed()
//                   .setTitle(`Bot detection`)
//                   .setDescription(
//                     "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                   );
//                 await db.add(`antiBot_${tokenDB}`, 1);
//                 console.log(antiBot);
//                 message.channel.send(botDetectionEnabled);
//               } else if (antiBot == 44) {
//                 const botDetectionEnabled = new Discord.MessageEmbed()
//                   .setTitle(`Bot detection`)
//                   .setDescription(
//                     "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                   );
//                 await db.add(`antiBot_${tokenDB}`, 1);
//                 console.log(antiBot);
//                 message.channel.send(botDetectionEnabled);
//               } else if (antiBot == 45) {
//                 const botDetectionEnabled = new Discord.MessageEmbed()
//                   .setTitle(`Bot detection`)
//                   .setDescription(
//                     "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                   );
//                 await db.add(`antiBot_${tokenDB}`, 1);
//                 console.log(antiBot);
//                 message.channel.send(botDetectionEnabled);
//               } else if (antiBot == 46) {
//                 const botDetectionEnabled = new Discord.MessageEmbed()
//                   .setTitle(`Bot detection`)
//                   .setDescription(
//                     "Type +continue to proceed playing , if u keep playing without typing +continue , you will be banned in some attempts"
//                   );
//                 await db.add(`antiBot_${tokenDB}`, 1);
//                 console.log(antiBot);
//                 message.channel.send(botDetectionEnabled);
//               } else if (antiBot == 47) {
//                 let date = new Date();
//                 let day = date.getDate();
//                 let month = date.getMonth() + 1;
//                 let year = date.getFullYear();

//                 let fullDate = `${day}.${month}.${year}.`;
//                 db.set(`banned_${tokenDB}`, true);
//                 db.set(`reasonForBan_${tokenDB}`, "Using auto clicker");
//                 db.set(`banDate_${tokenDB}`, fullDate);
//                 message.channel.send(
//                   `
// You've banned from Lustrozy economy for - Using auto clicker
// Date : ${fullDate}
// `
//                 );
//                 const bannedEmbed = new Discord.MessageEmbed()
//                   .setTitle("ACCOUNT BANNED !!")
//                   .setDescription(
//                     `
// You have been auto banned From Lustrozy Economy |
// Reason : Using auto clicker |
// Banned by : <@934850905273159710> |
// `
//                   )
//                   .setTimestamp()
//                   .setColor("#FF0000");
//                 user.send(bannedEmbed);
//               } else {
//                 if (texarusEquipped === "True") {
//                   if (texarus == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedTexarus_${tokenDB}`, false);
//                   } else {
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy boss`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${texarusDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         texarusDamage.Damage
//                       );
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy boss`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${texarusDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }

//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         message.channel.send(
//                           "```" +
//                             `diff
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (waetraEquipped === "True") {
//                   if (waetra == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedWaetra_${tokenDB}`, false);
//                   } else {
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${waetraDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       db.subtract(
//                         `oyoBossHealth_${user.id}`,
//                         waetraDamage.Damage
//                       );

//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${waetraDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }

//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (natureDaggersEquipped === "True") {
//                   if (natureDaggers == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                   } else {
//                     const oyoBossHealth = db.subtract(
//                       `oyoBossHealth_${user.id}`,
//                       natureDaggerss.Damage
//                     );
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }

//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         var natureDaggersGoldLoot = db.fetch(
//                           `immortalAwakes_${tokenDB}`
//                         );
//                         db.add(
//                           `money_${tokenDB}.pocket`,
//                           randomGoldCoins * natureDaggersGoldLoot
//                         );
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins * natureDaggersGoldLoot} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (immortalGunEquipped === "True") {
//                   if (immortalGun == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedVentorianBow_${tokenDB}`, false);
//                   } else {
//                     const oyoBossHealth = db.subtract(
//                       `oyoBossHealth_${user.id}`,
//                       immortalGunn.Damage
//                     );
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${immortalGunn.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy boss`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${immortalGunn.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }
//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         var immortalGunGoldLoot = db.fetch(
//                           `immortalAwakes_${tokenDB}`
//                         );
//                         if (!immortalGunGoldLoot) {
//                           immortalGunGoldLoot = 0;
//                         } else {
//                           db.add(
//                             `money_${tokenDB}.pocket`,
//                             randomGoldCoins * immortalGunGoldLoot
//                           );
//                         }
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         // randomGoldCoins = randomGoldCoins
//                         //   .toString()
//                         //   .replace(/\B(?=(\fd{3})+(?!\d))/g, ",");
//                         console.log(randomGoldCoins);
//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins * immortalGunGoldLoot} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (natureDaggersEquipped === "True") {
//                   if (natureDaggers == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                   } else {
//                     const oyoBossHealth = db.subtract(
//                       `oyoBossHealth_${user.id}`,
//                       natureDaggerss.Damage
//                     );
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }

//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         var natureDaggersGoldLoot = db.fetch(
//                           `natureDaggerAwakes_${tokenDB}`
//                         );
//                         if (!natureDaggersGoldLoot) {
//                           db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                         } else {
//                           db.add(
//                             `money_${tokenDB}.pocket`,
//                             randomGoldCoins * natureDaggersGoldLoot
//                           );
//                         }
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (ventorianBowEquipped === "True") {
//                   if (ventorianBow == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedVentorianBow_${tokenDB}`, false);
//                   } else {
//                     const oyoBossHealth = db.subtract(
//                       `oyoBossHealth_${user.id}`,
//                       ventorianBoww.Damage
//                     );
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy boss`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }
//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 2.5) {
//                         message.channel.send(
//                           "```" +
//                             `diff
// -You received : Oyo mask
// ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                             "```"
//                         );
//                       }
//                     }
//                   }
//                 } else if (rashetaEquipped === "True") {
//                   if (natureDaggers == 0) {
//                     message.channel.send(`You sold your weapon already`);
//                     await db.set(`equippedNatureDaggers_${tokenDB}`, false);
//                   } else {
//                     const oyoBossHealth = db.subtract(
//                       `oyoBossHealth_${user.id}`,
//                       rashetaDamage.Damage
//                     );
//                     if (oyoBossHealth < 0) {
//                       const oyoBossEmbed2 = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy Boss Total Health`, `1280986`)
//                         .addField(`Lustrozy Boss current health`, `0`)
//                         .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed2);
//                       db.add(`antiBot_${tokenDB}`, 1);
//                     } else {
//                       const oyoBossEmbed = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you hit ${oyoBoss}`)
//                         .addField(`Lustrozy boss`, `1280986`)
//                         .addField(
//                           `Lustrozy Boss current health`,
//                           `${oyoBossHealth}`
//                         )
//                         .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                         .setColor("#0096FF");
//                       message.channel.send(oyoBossEmbed);
//                       db.set(`cooldown_${tokenDB}`, Date.now());
//                     }
//                     if (oyoBossHealth == 0 || oyoBossHealth < 0) {
//                       const oyoBossDead = new Discord.MessageEmbed()
//                         .setTitle(`${oyoBoss}`)
//                         .setDescription(`${user} you killed ${oyoBoss}`)
//                         .setColor("#EE4B2B");
//                       message.channel.send(oyoBossDead);
//                       db.set(`oyoBossHealth_${user.id}`, 1280986);
//                       if (chance <= 1.5) {
//                         if (randomItems == "Oyo pack") {
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : Oyo pack
// ` +
//                               "```"
//                           );
//                           db.add(`oyoPack_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "Golden ghost knight set") {
//                           message.channel.send(
//                             "```" +
//                               `yaml
// You received : Golden Ghost knight set
// ` +
//                               "```"
//                           );
//                           db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                         if (randomItems == "3,250 platinum") {
//                           db.add(`orons_${tokenDB}`, 3250);
//                           message.channel.send(
//                             "```" +
//                               `diff
// -You received : 3,250 platinum
// ` +
//                               "```"
//                           );
//                           db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         }
//                       } else if (chance <= 1) {
//                         message.channel.send(
//                           "```" +
//                             `diff
//   -You received : Oyo mask
//   ` +
//                             "```"
//                         );
//                         db.add(`oyoMask_${tokenDB}`, 1);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                       } else {
//                         db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                         db.add(`oyoEventPoints_${tokenDB}`, randomPoints);
//                         randomGoldCoins = randomGoldCoins
//                           .toString()
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                         message.channel.send(
//                           "```" +
//                             `
// You received : ${randomGoldCoins} Gold Coins
// ` +
//                             "```"
//                         );
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

//     const luxaryCollectorsEvent = db.fetch(`luxaryCollectorsEventActive`);
//     if (luxaryCollectorsEvent == true) {
//       let user = message.author;
//       const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//       const banned = db.fetch(`banned_${tokenDB}`);
//       const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//       const banDate = db.fetch(`banDate_${tokenDB}`);
//       const update = db.fetch(`updateInProgress`);

//       if (!tokenDB) {
//         message.channel.send(
//           `${user} your +token is not registered yet , type +token me to set your +token`
//         );
//       } else if (banned == true) {
//         const banEmbed = new Discord.MessageEmbed()
//           .setTitle(user)
//           .setDescription(`This account is banned`)
//           .addField("Reason", `${banReason}`)
//           .addField("Date", `${banDate}`)
//           .setColor("#FFFF00");
//         message.channel.send(banEmbed);
//       } else if (update == true) {
//         message.channel.send(
//           `You cannot use any commands right now! Bot is updating`
//         );
//       } else {
//         const texarus = db.fetch(`texarus_${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${tokenDB}`
//         );
//         const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//         const waetra = db.fetch(`waetra_${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${tokenDB}`);
//         const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//         const royalBoss = "Royal Boss";
//         //   const royalBossHealth = 50000;
//         //   const royalBossHealth = db.set(
//         //     `royalBossDamage_${tokenDB}`,
//         //     92750
//         //   );
//         const rubyOfRoyalty = ["Ruby of Royalty"];
//         const goldenGloryCard = ["Golden glory card"];
//         const royalStatueOfHonor = ["Royal staue of honor"];
//         const royaltyCoin = ["Royalty coin"];
//         let chance = Math.floor(Math.random() * 100) + 0;
//         var randomGoldCoins = Math.floor(Math.random() * 65000) + 0;
//         //   var randomGoldCoins = randomGoldCoins
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
//   -!!! You received : Ruby of Royalty !!!
//   ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Golden glory card !!!
//     ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Royal statue of honor !!!
//     ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//   !!! You received : Royalty coin !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//   You received : ${randomGoldCoins} Gold Coins
//    ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
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
//   -!!! You received : Ruby of Royalty !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Golden glory card !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `-!!! You received : Royal statue of honor !!!
//       ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//     !!! You received : Royalty coin !!!
//           ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//   You received : ${randomGoldCoins} Gold Coins
//      ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//   You received : ${randomGoldCoins} Gold Coins
//      ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
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
//   -!!! You received : Ruby of Royalty !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Golden glory card !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Royal statue of honor !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//   !!! You received : Royalty coin !!!
//             ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
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
//       -!!! You received : Ruby of Royalty !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Golden glory card !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Royal statue of honor !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//   !!! You received : Royalty coin !!!
//             ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                 }
//                 {
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
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
//       -!!! You received : Ruby of Royalty !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`rubyOfRoyalty_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 2) {
//                   if (goldenGloryCard == "Golden glory card") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Golden glory card !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`goldenGloryCard_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royalStatueOfHonor == "Royal staue of honor") {
//                     message.channel.send(
//                       "```diff" +
//                         `
//   -!!! You received : Royal statue of honor !!!
//         ` +
//                         "```"
//                     );
//                     db.add(`royalStatueOfHonor_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 3) {
//                   if (royaltyCoin == "Royalty coin") {
//                     message.channel.send(
//                       "```fix" +
//                         `
//   !!! You received : Royalty coin !!!
//             ` +
//                         "```"
//                     );
//                     db.add(`royaltyCoin_${tokenDB}`, 1);
//                   }
//                 } else if (chance <= 90) {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                 } else {
//                   message.channel.send(
//                     "```CSS" +
//                       `
//    You received : ${randomGoldCoins} Gold Coins
//        ` +
//                       "```"
//                   );
//                   db.add(`money_${tokenDB}.pocket`, randomGoldCoins);
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     const eggHuntEvent = db.fetch(`eggHuntEventActive`);
//     if (eggHuntEvent == true) {
//       let user = message.author;
//       const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//       const banned = db.fetch(`banned_${tokenDB}`);
//       const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//       const banDate = db.fetch(`banDate_${tokenDB}`);
//       const update = db.fetch(`updateInProgress`);

//       if (!tokenDB) {
//         message.channel.send(
//           `${user} your +token is not registered yet , type +token me to set your +token`
//         );
//       } else if (banned == true) {
//         const banEmbed = new Discord.MessageEmbed()
//           .setTitle(user)
//           .setDescription(`This account is banned`)
//           .addField("Reason", `${banReason}`)
//           .addField("Date", `${banDate}`)
//           .setColor("#FFFF00");
//         message.channel.send(banEmbed);
//       } else if (update == true) {
//         message.channel.send(
//           `You cannot use any commands right now! Bot is updating`
//         );
//       } else {
//         const texarus = db.fetch(`texarus_${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${tokenDB}`
//         );
//         const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//         const waetra = db.fetch(`waetra_${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${tokenDB}`);
//         const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//         const lesforesha = "Lesforesha";
//         // const lesforeshaHealth = 50000;
//         // const lesforeshaHealth = db.set(`LesforehaDamage`, 100000);
//         const eggs = [
//           "Golden ventorian egg 2022",
//           "Green ventorian egg 2022",
//           "Red ventorian egg 2022",
//           "Blue ventorian egg 2022",
//           "Platinum ventorian egg 2022",
//         ];
//         const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];

//         if (args[0] === "hit") {
//           if (
//             texarusEquipped === "False" &&
//             waetraEquipped === "False" &&
//             rashetaEquipped === "False" &&
//             natureDaggersEquipped === "False" &&
//             ventorianBowEquipped === "False"
//           ) {
//             message.channel.send(`${user} you need to equip a weapon first`);
//           } else {
//             const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//             if (texarusEquipped === "True") {
//               if (lesforeshaHealth < 0) {
//                 const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you hit ${lesforesha}`)
//                   .addField(`Lesforesha Total Health`, `100000`)
//                   .addField(`Lesforesha current Health`, `0`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#DE1738");
//                 message.channel.send(lesforeshaEmbed2);
//               } else {
//                 const lesforeshaEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you hit ${lesforesha}`)
//                   .addField(
//                     `Lesforesha Total Health`,
//                     `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                   )
//                   .addField(`Lesforesha current Health`, `${lesforeshaHealth}`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#DE1738");
//                 message.channel.send(lesforeshaEmbed);
//               }
//               db.subtract(`LesforehaHealth_${user.id}`, texarusDamage.Damage);

//               if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                 const lesforeshaDead = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you killed ${lesforesha}`)
//                   .setColor("#32CD32");
//                 message.channel.send(lesforeshaDead);
//                 db.set(`LesforehaHealth_${user.id}`, 100000);
//                 // drop 4 eggs
//                 const egg1 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg}`
//                 );

//                 if (randomEgg === "Golden ventorian egg 2022") {
//                   egg1.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg === "Platinum ventorian egg 2022") {
//                   egg1.setColor("#E5E4E2");
//                   db.fetch(`PlatinumVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`PlatinumVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg === "Green ventorian egg 2022") {
//                   egg1.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg === "Red ventorian egg 2022") {
//                   egg1.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg === "Blue ventorian egg 2022") {
//                   egg1.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }

//                 message.channel.send(egg1);

//                 const randomEgg2 =
//                   eggs[Math.floor(Math.random() * eggs.length)];

//                 const egg2 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg2}`
//                 );

//                 if (randomEgg2 === "Golden ventorian egg 2022") {
//                   egg2.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg2 === "Platinum ventorian egg 2022") {
//                   egg2.setColor("#E5E4E2");
//                   db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                   db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg2 === "Green ventorian egg 2022") {
//                   egg2.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg2 === "Red ventorian egg 2022") {
//                   egg2.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg2 === "Blue ventorian egg 2022") {
//                   egg2.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }
//                 message.channel.send(egg2);

//                 const randomEgg3 =
//                   eggs[Math.floor(Math.random() * eggs.length)];

//                 const egg3 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg3}`
//                 );
//                 if (randomEgg3 === "Golden ventorian egg 2022") {
//                   egg3.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg3 === "Platinum ventorian egg 2022") {
//                   egg3.setColor("#E5E4E2");
//                   db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                   db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg3 === "Green ventorian egg 2022") {
//                   egg3.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg3 === "Red ventorian egg 2022") {
//                   egg3.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg3 === "Blue ventorian egg 2022") {
//                   egg3.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }
//                 message.channel.send(egg3);

//                 const randomEgg4 =
//                   eggs[Math.floor(Math.random() * eggs.length)];
//                 const egg4 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg4}`
//                 );

//                 if (randomEgg4 === "Golden ventorian egg 2022") {
//                   egg4.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg4 === "Platinum ventorian egg 2022") {
//                   egg4.setColor("#E5E4E2");
//                   db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                   db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg4 === "Green ventorian egg 2022") {
//                   egg4.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg4 === "Red ventorian egg 2022") {
//                   egg4.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg4 === "Blue ventorian egg 2022") {
//                   egg4.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }

//                 message.channel.send(egg4);
//               }
//             } else if (waetraEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (waetraEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${waetraDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${waetraDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 // the lesforeshaEmbed is send save in db
//                 db.subtract(`LesforehaHealth_${user.id}`, waetraDamage.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Platinum ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Platinum ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Platinum ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Platinum ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (natureDaggersEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (natureDaggersEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(
//                   `LesforehaHealth_${user.id}`,
//                   natureDaggerss.Damage
//                 );

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Platinum ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Platinum ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Platinum ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Platinum ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (ventorianBowEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (ventorianBowEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(`LesforehaHealth_${user.id}`, ventorianBoww.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Platinum ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Platinum ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Platinum ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Platinum ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (rashetaEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (rashetaEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(`LesforehaHealth_${user.id}`, rashetaDamage.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Platinum ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Platinum ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Platinum ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Platinum ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`PlatinumVentorianEgg2022_${tokenDB}`);
//                     db.add(`PlatinumVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Platinum ventorian egg 2022 <:GoldCoinsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             }
//           }
//         }
//       }
//     } else if (!args[0]) {
//       message.channel.send(`Invalid Command Usage [type **+play hit**]`);
//     }
//   },
// };
