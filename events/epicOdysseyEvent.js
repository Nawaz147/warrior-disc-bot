// function epicOdysseyEvent(message, args, client) {
//   const Discord = require("discord.js");
//   const db = require("quick.db");
//   const { MessageEmbed } = require("discord.js");
//   const rashetaDamage = require("../weaponStats/rashetaAxe.json");
//   const waetraDamage = require("../weaponStats/waetraBow.json");
//   const texarus = require("../weaponStats/texarusStaff.json");
//   const natureDaggerss = require("../weaponStats/natureDaggers.json");
//   const ventorianBoww = require("../weaponStats/ventorianBow.json");
//   const immortalGunn = require("../weaponStats/immortalGun.json");
//   const daggerOfDeathh = require("../weaponStats/daggerOfDeath.json");
//   const moneyCap = require("../config.json");
//   const startFunction = require("../startCommandFunction");
//   let user =
//     message.mentions.users.first() ||
//     client.users.cache.get(args[0]) ||
//     message.author;
//   const tokenDB = db.fetch(`${user.id}.valoriumToken`);
//   const banned = db.fetch(`banned_${tokenDB}`);
//   const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//   const banDate = db.fetch(`banDate_${tokenDB}`);
//   const update = db.fetch(`updateInProgress`);
//   var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
//   var currentUser = message.author;
//   var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
//   if (!tokenDB) {
//     if (user == currentUser) {
//       const tokenEmbed = new Discord.MessageEmbed()
//         .setTitle(`🔑 Time to Unlock Adventure: Register Your Token!`)
//         .setDescription(
//           `
// Ready to jump into the exciting world of Valorium? Hang on a moment – it appears your Valorium token hasn't been registered just yet.
// Don't worry, setting things up is a breeze! Just type +token me and unlock the gates to amazing adventures in no time. If you're curious why things seem restricted, it's all due to that token magic. Once you enter +token me, those doors will swing wide open, and your Valorium journey will begin!
// No time to waste! Type +token me like a pro and let's kickstart your adventure. See you on the heroic side! 🚀🗡️`
//         )
//         .setColor(`#6A1B9A`);
//       message.channel.send(tokenEmbed);
//     } else {
//       const otherTokenEmbed = new Discord.MessageEmbed()
//         .setTitle(
//           `Adventure Awaits: ${user.username}'s Token is Not Yet Registered`
//         )
//         .setDescription(
//           `
// Attention, noble traveler!
// While your intentions are valiant, it appears that the Valorium token for this user has not yet been registered. The path to adventure remains sealed until they personally type +token me to activate their entry into the world of Valorium.
// Feel free to share this guidance with them, so they can step into their destined role as a hero and unlock the realms of possibility that await.
// Safe travels, and may the winds of fortune guide your way!
// `
//         )
//         .setColor(`#8A2BE2`);
//       message.channel.send(otherTokenEmbed);
//     }
//   } else if (banned == true && user == currentUser) {
//     const banEmbed = new Discord.MessageEmbed()
//       .setTitle("Failed to access")
//       .setDescription(`Your account has been banned`)
//       .addField("Reason", `${banReason}`)
//       .addField("Date", `${banDate}`)
//       .setColor("#8B0000");
//     message.channel.send(banEmbed);
//     db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
//   } else if (banned == true && user !== currentUser) {
//     const banEmbed = new Discord.MessageEmbed()
//       .setTitle("Failed to access")
//       .setDescription(`${user.username}'s account has been banned`)
//       .addField("Reason", `${banReason}`)
//       .addField("Date", `${banDate}`)
//       .setColor("#8B0000");
//     message.channel.send(banEmbed);
//     db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
//   } else if (update == true) {
//     const updateInProgressEmbed = new Discord.MessageEmbed()
//       .setTitle(`Temporary Command Suspension`)
//       .setDescription(
//         `
// Sorry ${currentUser.username} , commands are disabled at the moment.
// The bot is currently undergoing an update. Please be patient!
// `
//       )
//       .setColor("#3498db")
//       .setTimestamp();
//     message.channel.send(updateInProgressEmbed);
//     db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
//   } else if (acceptedTOS == false && user == currentUser) {
//     const acceptTOSembed = new Discord.MessageEmbed()
//       .setTitle(`Failed to proceed`)
//       .setDescription(
//         `
// You need to accept the terms of service for using this discord bot!
// To review the terms of service, simply type **+tos**
// To accept the terms of service, use the command **+tos accept**
// `
//       )
//       .setColor("#808080");
//     message.channel.send(acceptTOSembed);
//     db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
//   } else if (acceptedTOS == false && user !== currentUser) {
//     const acceptTOSembed = new Discord.MessageEmbed()
//       .setTitle(`Failed to proceed`)
//       .setDescription(
//         `
// ${user.username} has not yet accepted the terms of service
// `
//       )
//       .setColor("#808080");
//     message.channel.send(acceptTOSembed);
//     db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
//   } else if (
//     tokenDB &&
//     acceptedTOS == true &&
//     update == false &&
//     banned == false
//   ) {
//     if (args[0] !== "hit") {
//       return message.channel.send("Invalid command. Use: `+play hit`");
//     } else if (args[0] == "hit") {
//       const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
//       const natureDaggersEquipped = db.fetch(
//         `equippedNatureDaggers_${tokenDB}`
//       );
//       const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
//       const ventorianBowEquipped = db.fetch(`equippedVentorianBow_${tokenDB}`);
//       const texarus = db.fetch(`texarus_${tokenDB}`);
//       const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
//       const waetra = db.fetch(`waetra_${tokenDB}`);
//       const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
//       const rasheta = db.fetch(`rasheta_${tokenDB}`);
//       const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
//       const immortal = db.fetch(`immortalGun_${tokenDB}`);
//       const immortalEquipped = db.fetch(`equippedImmortalGun_${tokenDB}`);
//       const daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
//       const daggerOfDeathEquipped = db.fetch(
//         `equippedDaggerOfDeath_${tokenDB}`
//       );
//       if (natureDaggersEquipped == "True") {
//         var weaponDamage = natureDaggerss.Damage;
//         var weaponEquipped = true;
//       } else if (ventorianBowEquipped == "True") {
//         var weaponDamage = ventorianBoww.Damage;
//         var weaponEquipped = true;
//       } else if (waetraEquipped == "True") {
//         var weaponDamage = waetraDamage.Damage;
//         var weaponEquipped = true;
//       } else if (rashetaEquipped == "True") {
//         var weaponDamage = rashetaDamage.Damage;
//         var weaponEquipped = true;
//       } else if (immortalEquipped == "True") {
//         var weaponDamage = immortalGunn.Damage;
//         var weaponEquipped = true;
//       } else if (texarusEquipped == "True") {
//         var weaponDamage = texarus.Damage;
//         var weaponEquipped = true;
//       } else if (daggerOfDeathEquipped == "True") {
//         var daggerOfDeathLevel = db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
//         if (daggerOfDeathLevel > 1) {
//           var daggerOfDeathDamage = db.fetch(`daggerOfDeathDamage_${tokenDB}`);
//           weaponDamage = daggerOfDeathDamage;
//           weaponEquipped = true;
//         } else {
//           weaponDamage = daggerOfDeathh.Damage;
//           weaponEquipped = true;
//         }
//       }
//       if (weaponEquipped !== true) {
//         const weaponEmbed = new Discord.MessageEmbed()
//           .setColor("#00A86B") // A lively green color
//           .setTitle("🗡️ Gear Up for Battle 🗡️") // A title that invokes readiness
//           .setDescription(
//             "Prepare to confront the mighty boss by arming yourself with a weapon. If you lack one, type '+gw' to claim a complimentary weapon."
//           );

//         message.channel.send(weaponEmbed);
//       } else if (weaponEquipped == true) {
//         timeout = 1000;
//         var cooldown = db.fetch(`cooldown_${tokenDB}`);
//         if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
//           let time = ms(timeout - (Date.now() - cooldown));

//           let timeEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF") // A captivating orange color
//             .setTitle("🌟 Face the Monstrous Foe 🌟") // An intense title
//             .setDescription(
//               `The monstrous foe is before you! Prepare for battle. Each strike has a cooldown of ${time.seconds} seconds and ${time.milliseconds} milliseconds. Remember, **do not spam** your attacks. Patience and strategy are your allies! ⚔️`
//             )
//             .setFooter("The fate of the realm hangs in the balance.");

//           message.channel.send(timeEmbed);
//         } else {
//           // Modify the boss hitting logic

//           function resetBossHealth() {
//             db.set(`phoenixKingPyroclastorBossHealth_${tokenDB}`, 1850960);
//             db.set(`didntHitCooldown_${tokenDB}`, Date.now());

//             // Notify that the boss ran away
//             message.channel.send({
//               embed: {
//                 color: 0xff0000,
//                 title: "The boss flied away!",
//                 footer: "Be quick to hit next time",
//               },
//             });
//           }

//           var PhoenixKingPyroclastorBossHealth = db.fetch(
//             `phoenixKingPyroclastorBossHealth_${tokenDB}`
//           );
//           if (PhoenixKingPyroclastorBossHealth > 0) {
//             const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
//             if (
//               lastHitTime &&
//               Date.now() - lastHitTime >= 120000 &&
//               PhoenixKingPyroclastorBossHealth < 1850960
//             ) {
//               resetBossHealth();
//             }
//           }
//           function createHealthBar(health, maxHealth, barLength = 20) {
//             // Ensure health and maxHealth are non-negative
//             health = Math.max(0, health);
//             maxHealth = Math.max(0, maxHealth);

//             const percentage = Math.min(100, (health / maxHealth) * 100);
//             const progressBlocks = Math.floor((barLength * percentage) / 100);
//             const remainingBlocks = barLength - progressBlocks;

//             const progressBar =
//               "█".repeat(progressBlocks) + "░".repeat(remainingBlocks);

//             const formattedHealth = `${health.toLocaleString()} / ${maxHealth.toLocaleString()}`;

//             return `${progressBar}`;
//           }

//           var PhoenixKingPyroclastorBossHealth = db.fetch(
//             `phoenixKingPyroclastorBossHealth_${tokenDB}`
//           );
//           const bossHealthBar = createHealthBar(
//             PhoenixKingPyroclastorBossHealth,
//             1850960,
//             20 // This should match the fixed boss health value
//           );
//           var currentBossHealth =
//             db.fetch(`phoenixKingPyroclastorBossHealth_${tokenDB}`) || 0;
//           currentBossHealth = currentBossHealth
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//           if (currentBossHealth > "0") {
//             var bossHealthProgress = `${currentBossHealth} / 1,850,960`;
//           } else {
//             var bossHealthProgress = `0 / 1,850,960`;
//           }
//           if (
//             PhoenixKingPyroclastorBossHealth == null ||
//             PhoenixKingPyroclastorBossHealth == undefined
//           ) {
//             var PhoenixKingPyroclastorBossHealth = 1850960;
//             db.set(`phoenixKingPyroclastorBossHealth_${tokenDB}`, 1850960);
//           }
//           var phoenixKingPyroclastorBoss = "Phoenix King Pyroclastor";
//           var randomGoldCoins = Math.floor(Math.random() * 10294) + 2035;
//           var goldLoot = db.fetch(`goldLoot_${tokenDB}`);
//           if (goldLoot == undefined || goldLoot == null) {
//             goldLoot = 0;
//           }
//           if (goldLoot == 0) {
//             var finalCoins = randomGoldCoins;
//           } else {
//             var finalCoins = randomGoldCoins * goldLoot + 1;
//           }
//           if (PhoenixKingPyroclastorBossHealth < 0) {
//             const phoenixKingPyroclastorBossEmbed2 = new Discord.MessageEmbed()
//               .setColor("#00FF00") // Deep purple color
//               .setAuthor(`${phoenixKingPyroclastorBoss}`) // Add an image of Eldra'zur as the author
//               .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
//               .setImage("https://i.ibb.co/QrK36pf/gif.gif") // You can use another image to show the boss
//               .setFooter(
//                 "May your unwavering valor and indomitable might lead you to triumph!"
//               );
//             message.channel.send(phoenixKingPyroclastorBossEmbed2);
//           } else {
//             db.subtract(
//               `phoenixKingPyroclastorBossHealth_${tokenDB}`,
//               weaponDamage
//             );
//             db.set(`didntHitCooldown_${tokenDB}`, Date.now());
//             weaponDamage = weaponDamage
//               .toString()
//               .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//             PhoenixKingPyroclastorBossHealth =
//               PhoenixKingPyroclastorBossHealth.toString().replace(
//                 /\B(?=(\d{3})+(?!\d))/g,
//                 ","
//               );
//             const phoenixKingPyroclastorBossEmbed = new Discord.MessageEmbed()
//               .setColor("#00FF00") // Deep purple color
//               .setAuthor(`${phoenixKingPyroclastorBoss}`) // Add an image of Eldra'zur as the author
//               .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
//               .setImage("https://i.ibb.co/QrK36pf/gif.gif") // You can use another image to show the boss
//               .setFooter(
//                 "May your unwavering valor and indomitable might lead you to triumph!"
//               );
//             message.channel.send(phoenixKingPyroclastorBossEmbed);
//             db.set(`cooldown_${tokenDB}`, Date.now());
//           }

//           if (
//             PhoenixKingPyroclastorBossHealth == 0 ||
//             PhoenixKingPyroclastorBossHealth < 0
//           ) {
//             PhoenixKingPyroclastorBossHealth == 0;
//             const phoenixKingPyroclastorBossDeadEmbed =
//               new Discord.MessageEmbed()
//                 .setColor("#008000") // Gold color for celebration
//                 .setTitle(`**Triumph Achieved!**`)
//                 .setDescription(
//                   `${phoenixKingPyroclastorBoss} has met its end!`
//                 )
//                 .addField("Defeated by", `${user}`, true)
//                 .setImage("https://i.ibb.co/D4sg80T/fire-gif.gif")
//                 .setFooter("A memorable victory worth sharing with friends!");

//             message.channel.send(phoenixKingPyroclastorBossDeadEmbed);
//             db.add(`bossesKilledTotal_${tokenDB}`, 1);
//             var chance = Math.floor(Math.random() * 175) + 1;
//             console.log(chance);
//             var weaponName = db.fetch(`wepName_${tokenDB}`);
//             if (weaponName == "daggerOfDeath") {
//               const daggerXP = Math.floor(Math.random() * 15) + 7;
//               if (daggerOfDeathLevel !== 10) {
//                 db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);
//               }
//               // Retrieve the current XP and level of Dagger of Death
//               const currentXP = db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
//               var currentLevel = db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

//               // Define the damage values for each level
//               const levelDamage = [
//                 200301, 233406, 340221, 462059, 609231, 920132, 1306890,
//                 1690530, 2049141,
//               ];
//               const xpLevels = [
//                 { threshold: 35, level: 2 },
//                 { threshold: 70, level: 3 },
//                 { threshold: 156, level: 4 },
//                 { threshold: 360, level: 5 },
//                 { threshold: 700, level: 6 },
//                 { threshold: 1280, level: 7 },
//                 { threshold: 1940, level: 8 },
//                 { threshold: 2642, level: 9 },
//                 { threshold: 16950, level: 10 },
//               ];

//               for (const levelData of xpLevels) {
//                 if (currentXP >= levelData.threshold) {
//                   currentLevel = levelData.level;
//                 } else {
//                   break;
//                 }
//               }
//               for (let i = daggerOfDeathLevel - 1; i < xpLevels.length; i++) {
//                 const nextLevelXP = xpLevels[i].threshold;
//                 if (currentXP >= nextLevelXP && daggerOfDeathLevel !== 10) {
//                   // Level up the weapon
//                   db.set(`daggerOfDeathXP_${tokenDB}`, 0);
//                   db.set(`daggerOfDeathDamage_${tokenDB}`, levelDamage[i]);

//                   var daggerLevelupEmbed = new Discord.MessageEmbed()
//                     .setTitle("Level up!")
//                     .setDescription(
//                       `Your weapon leveled up to level ${
//                         daggerOfDeathLevel + 1
//                       }`
//                     )
//                     .addField(`New damage`, `${levelDamage[i]}`)
//                     .setColor(`#013220`);

//                   message.channel.send(daggerLevelupEmbed);
//                   db.set(
//                     `daggerOfDeathLevel_${tokenDB}`,
//                     daggerOfDeathLevel + 1
//                   );
//                   db.set(`daggerOfDeathXP_${tokenDB}`, 0);
//                   break; // Exit the loop after leveling up
//                 }
//               }
//             }
//             if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
//               const SingleBossKillApsEmbed = new Discord.MessageEmbed()
//                 .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
//                 .setDescription(`${user} You gained 500 aps`)
//                 .setColor("#00FF00");
//               db.set(`firstBlood_${tokenDB}`, true);
//               db.add(`achievementPoints_${tokenDB}`, 500);
//               message.channel.send(SingleBossKillApsEmbed);
//             } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
//               const TenBossKillApsEmbed = new Discord.MessageEmbed()
//                 .setTitle(`ACHIEVEMENT COMPLETE - Decade of Annihilation`)
//                 .setDescription(`${user} You gained 300 aps`)
//                 .setColor("#00FF00");
//               db.set(`decadeOfAnnihilation_${tokenDB}`, true);
//               db.add(`achievementPoints_${tokenDB}`, 300);
//               message.channel.send(TenBossKillApsEmbed);
//             } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
//               const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
//                 .setTitle(`ACHIEVEMENT COMPLETE - Half-century of Destruction`)
//                 .setDescription(`${user} You gained 800 aps`)
//                 .setColor("#00FF00");
//               db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
//               db.add(`achievementPoints_${tokenDB}`, 800);
//               message.channel.send(FiftyBossKillApsEmbed);
//             } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 100) {
//               const HundredBossKillApsEmbed = new Discord.MessageEmbed()
//                 .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
//                 .setDescription(`${user} You gained 1500 aps`)
//                 .setColor("#00FF00");
//               db.set(`centuryOfSlaughter_${tokenDB}`, true);
//               db.add(`achievementPoints_${tokenDB}`, 1500);
//               message.channel.send(HundredBossKillApsEmbed);
//             }
//             db.set(`cooldown_${tokenDB}`, Date.now());
//             db.set(`phoenixKingPyroclastorBossHealth_${tokenDB}`, 1850960);
//             if (chance == 1) {
//               message.channel.send(
//                 "```" +
//                   `diff
// -You received : Orb of Elemental Mastery
// ` +
//                   "```"
//               );
//               db.add(`orbOfElementalMastery_${tokenDB}`, 1);
//             } else if (chance == 2) {
//               message.channel.send(
//                 "```" +
//                   `fix
// You received : Shield of the Earthshaker
// ` +
//                   "```"
//               );
//               db.add(`shieldOfTheEarthshaker_${tokenDB}`, 1);
//             } else if (chance == 3) {
//               message.channel.send(
//                 "```" +
//                   `fix
// You received : Timekeeper's Chronometer
// ` +
//                   "```"
//               );
//               db.add(`timekeepersChronometer_${tokenDB}`, 1);
//             } else if (chance == 4) {
//               message.channel.send(
//                 "```" +
//                   `fix
// You received : Key
// ` +
//                   "```"
//               );
//               db.add(`key_${tokenDB}`, 1);
//             } else if (chance > 7 && (chance < 30 || chance == 30)) {
//               db.add(`soldiers_${tokenDB}`, 1);
//               message.channel.send(
//                 "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
//               );
//               db.add(`power.${tokenDB}`, 0.08);
//             } else if (chance > 30 && (chance < 40 || chance == 40)) {
//               db.add(`eliteAwakeningGem_${tokenDB}`, 1);
//               message.channel.send(
//                 "```" +
//                   `css
// [You received : Elite awakening gem]
// ` +
//                   "```"
//               );
//             } else if (chance > 40 && (chance < 60 || chance == 60)) {
//               db.add(`awakeningGem_${tokenDB}`, 1);
//               message.channel.send(
//                 "```" +
//                   `
// You received : Awakening gem
// ` +
//                   "```"
//               );
//             } else {
//               bal = db.fetch(`money_${tokenDB}.pocket`);
//               if (finalCoins + bal > moneyCap.moneyCap) {
//                 message.channel.send(
//                   "**You cannot exceed gold limit , you've been given a key**"
//                 );
//               } else {
//                 db.add(`money_${tokenDB}.pocket`, Math.floor(finalCoins));
//                 db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
//                 // Use Math.floor() to remove decimals
//                 const lootedGold = db.fetch(`lootedGold_${tokenDB}`) || 0;
//                 const apsData = [
//                   {
//                     amount: 100000,
//                     aps: 100,
//                     key: "acquiredAHeftySumOf100k",
//                     title:
//                       "ACHIEVEMENT COMPLETE - Acquired a hefty sum of 100k",
//                   },
//                   {
//                     amount: 500000,
//                     aps: 200,
//                     key: "amassedAnImpressiveHaulOf500k",
//                     title:
//                       "ACHIEVEMENT COMPLETE - Amassed an impressive haul of 500k",
//                   },
//                   {
//                     amount: 1000000,
//                     aps: 500,
//                     key: "reachedAmillionInRiches",
//                     title: "ACHIEVEMENT COMPLETE - Reached a million in riches",
//                   },
//                   {
//                     amount: 10000000,
//                     aps: 1000,
//                     key: "glorious10mPlunder",
//                     title: "ACHIEVEMENT COMPLETE - Glorious 10-Million Plunder",
//                   },
//                   {
//                     amount: 100000000,
//                     aps: 1700,
//                     key: "wealthConqueror",
//                     title: "ACHIEVEMENT COMPLETE - Wealth Conqueror",
//                   },
//                 ];

//                 for (const achievement of apsData) {
//                   const achievementKey = `${achievement.key}_${tokenDB}`;
//                   if (
//                     lootedGold >= achievement.amount &&
//                     !db.fetch(achievementKey)
//                   ) {
//                     const apsEmbed = new Discord.MessageEmbed()
//                       .setTitle(achievement.title)
//                       .setDescription(
//                         `${user} You gained ${achievement.aps} aps`
//                       )
//                       .setColor("#00FF00");
//                     db.set(achievementKey, true);
//                     db.add(`achievementPoints_${tokenDB}`, achievement.aps);
//                     message.channel.send(apsEmbed);
//                   }
//                 }
//                 finalCoins = Math.floor(finalCoins)
//                   .toString()
//                   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//                 message.channel.send(
//                   "```" +
//                     `diff
// You received : ${finalCoins} Gold Coins
// ` +
//                     "```"
//                 );
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// module.exports = epicOdysseyEvent;
