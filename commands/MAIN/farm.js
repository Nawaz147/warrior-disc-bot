const Discord = require("discord.js");
const db = require("quick.db");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarus = require("../../weaponStats/texarusStaff.json");
const ms = require("parse-ms");
const natureDaggerss = require("../../weaponStats/natureDaggers.json");
const ventorianBoww = require("../../weaponStats/ventorianBow.json");
const immortalGunn = require("../../weaponStats/immortalGun.json");
const startFunction = require("../../startCommandFunction.js");
var daggerOfDeathh = require("../../weaponStats/daggerOfDeath.json");

module.exports = {
  name: "farm",
  aliases: ["Farm"],
  description: "To farm",
  usage: "farm",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const raxfuryBoss = "Raxfury Boss";
      //   const raxfuryBossHealth = 50000;
      //   const raxfuryBossHealth = db.set(
      //     `raxfuryBossDamage_${tokenDB}`,
      //     106420
      //   );
      var items = ["Ice cube", "Leather", "Arcane Shard"];
      let chance = Math.floor(Math.random() * 100) + 0.5;
      var craftingItem = ["Silk", "Cotton", "Green rock"];
      const randomItems = items[Math.floor(Math.random() * items.length)];
      const craftingItems =
        craftingItem[Math.floor(Math.random() * items.length)];
      var randomGoldCoins = Math.floor(Math.random() * 34690) + 12000;
      var goldLoot = db.fetch(`goldLoot_${tokenDB}`);
      if (goldLoot == undefined || goldLoot == null) {
        goldLoot = 0;
      }
      var finalCoins = randomGoldCoins * goldLoot;
      finalCoins = Math.floor(finalCoins); // Round down to the nearest integer

      var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
      var natureDaggersEquipped = db.fetch(`equippedNatureDaggers_${tokenDB}`);
      var ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
      var ventorianBowEquipped = db.fetch(`equippedVentorianBow_${tokenDB}`);
      var texarus = db.fetch(`texarus_${tokenDB}`);
      var texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
      var waetra = db.fetch(`waetra_${tokenDB}`);
      var waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
      var rasheta = db.fetch(`rasheta_${tokenDB}`);
      var rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
      var immortal = db.fetch(`immortalGun_${tokenDB}`);
      var immortalEquipped = db.fetch(`equippedImmortalGun_${tokenDB}`);
      var daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
      var daggerOfDeathEquipped = db.fetch(`equippedDaggerOfDeath_${tokenDB}`);
      if (natureDaggersEquipped == "True") {
        var weaponDamage = natureDaggerss.Damage;
        var weaponEquipped = true;
      } else if (ventorianBowEquipped == "True") {
        var weaponDamage = ventorianBoww.Damage;
        var weaponEquipped = true;
      } else if (waetraEquipped == "True") {
        var weaponDamage = waetraDamage.Damage;
        var weaponEquipped = true;
      } else if (rashetaEquipped == "True") {
        var weaponDamage = rashetaDamage.Damage;
        var weaponEquipped = true;
      } else if (immortalEquipped == "True") {
        var weaponDamage = immortalGunn.Damage;
        var weaponEquipped = true;
      } else if (texarusEquipped == "True") {
        var weaponDamage = texarus.Damage;
        var weaponEquipped = true;
      } else if (daggerOfDeathEquipped == "True") {
        const daggerOfDeathLevel =
          db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
        if (daggerOfDeathLevel > 1 || daggerOfDeathLevel == 1) {
          const daggerOfDeathDamage = db.fetch(
            `daggerOfDeathDamage_${tokenDB}`
          );
          weaponDamage = daggerOfDeathDamage;
          weaponEquipped = true;
        } else {
          weaponDamage = daggerOfDeathh.Damage;
          weaponEquipped = true;
        }
      }

      if (args[0] === "hit") {
        if (weaponEquipped !== true) {
          message.channel.send(
            `You need to equip a weapon first , **eg : +equip bow ventorian**`
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          timeout = 1200;
          var cooldown = await db.fetch(`cooldown_${tokenDB}`);
          if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown));

            let timeEmbed = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setTitle(`Spamming isn't a good thing`)
              .setDescription(
                `You need to wait ${time.seconds}s ${time.milliseconds}ms `
              );
            message.channel.send(timeEmbed);
          } else {
            const antiBot = await db.fetch(`antiBot_${tokenDB}`);
            if (antiBot == 42) {
              // ... (existing code)
              db.set(`passedCaptchaVerification_${tokenDB}`, false);

              // Generate a random CAPTCHA challenge
              const characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let captcha = "";
              for (let i = 0; i < 6; i++) {
                captcha += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
              captcha = captcha.toLowerCase(); // Convert the CAPTCHA to lowercase

              const verificationEmbed = new Discord.MessageEmbed()
                .setTitle("Verification Required")
                .setDescription(
                  `Please solve the following CAPTCHA to proceed with the command:\n\n**${captcha}**`
                );
              const captchaMessage = await message.channel.send(
                verificationEmbed
              );
              db.add(`captchaAttemptAdd_${tokenDB}`, 1);
              var captchaAttempts = db.fetch(`captchaAttemptAdd_${tokenDB}`);
              if (captchaAttempts == 6 || captchaAttempts > 6) {
                let date = new Date();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                let fullDate = `${day}.${month}.${year}.`;
                db.set(`banned_${tokenDB}`, true);
                db.set(`reasonForBan_${tokenDB}`, "Botting");
                db.set(`banDate_${tokenDB}`, fullDate);
                const bannedUserEmbed = new Discord.MessageEmbed()
                  .setDescription(
                    `
${user} You've been banned from Valorium discord bot
      `
                  )
                  .setColor(`#8B0000`)
                  .setFooter(`Reason : Botting`);
                message.channel.send(bannedUserEmbed);
                db.set(`antiBot_${tokenDB}`, 0);
                var bannedEmbed = new Discord.MessageEmbed()
                  .setTitle("ACCOUNT BANNED !!")
                  .setDescription(
                    `
You have been banned From Valorium Discord bot |
Reason : ${reason} |
Banned by : <@934850905273159710>         
`
                  )
                  .setTimestamp()
                  .setColor("#FF0000");
                user.send(bannedEmbed);
                db.set(`captchaAttemptAdd_${tokenDB}`, 0);
              }
              const filter = (response) =>
                response.author.id === message.author.id;
              const collector = message.channel.createMessageCollector(filter, {
                time: 30000,
              });

              // ... (existing code)

              collector.on("collect", (response) => {
                const userResponse = response.content.trim().toLowerCase(); // Convert user response to lowercase

                if (userResponse === captcha) {
                  // Compare both strings in lowercase
                  // Proceed with the "hit" command logic here

                  // ... your existing "hit" command logic ...

                  const cooldownDuration = 1500;
                  db.set(`cooldown_${tokenDB}`, Date.now() + cooldownDuration);

                  // Reset the antiBot state
                  db.set(`passedCaptchaVerification_${tokenDB}`, true);
                  var passedCaptcha = db.fetch(
                    `passedCaptchaVerification_${tokenDB}`
                  );

                  if (passedCaptcha === true) {
                    db.set(`captchaAttemptAdd_${tokenDB}`, 0);
                    db.set(`antiBot_${tokenDB}`, 0);
                    message.channel.send(
                      "You passed captcha verification , continue!"
                    );
                  } else {
                    message.channel.send("retry");
                  }

                  // ... the rest of your "hit" command logic ...
                } else {
                }
              });
            } else {
              if (weaponEquipped !== true) {
                message.channel.send(
                  "**You need to equip a weapon to play this event** , if you dont have one then **type +gw** to get your free weapon"
                );
                db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
              } else {
                var raxfuryBossHealth = db.fetch(
                  `raxfuryBossHealth_${tokenDB}`
                );
                if (!raxfuryBossHealth) {
                  var raxfuryBossHealth = db.set(
                    `raxfuryBossHealth_${tokenDB}`,
                    1280986
                  );
                }
                if (weaponEquipped === true) {
                  db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                  if (raxfuryBossHealth < 0) {
                    const raxfuryBossEmbed2 = new Discord.MessageEmbed()
                      .setTitle(`${raxfuryBoss}`)
                      .setDescription(`${user} you hit ${raxfuryBoss}`)
                      .addField(`Raxfury Boss`, `1280986`)
                      .addField(`Raxfury Boss current health`, `0`)
                      .addField(`Your damage`, `${weaponDamage}`)
                      .setColor("#8F408F");
                    message.channel.send(raxfuryBossEmbed2);
                    db.add(`antiBot_${tokenDB}`, 1);
                  } else {
                    db.subtract(`raxfuryBossHealth_${tokenDB}`, weaponDamage);
                    const raxfuryBossEmbed = new Discord.MessageEmbed()
                      .setTitle(`${raxfuryBoss}`)
                      .setDescription(`${user} you hit ${raxfuryBoss}`)
                      .addField(`Raxfury Boss`, `1280986`)
                      .addField(
                        `Raxfury Boss current health`,
                        `${raxfuryBossHealth}`
                      )
                      .addField(`Your damage`, `${weaponDamage}`)
                      .setColor("#BF40BF");
                    message.channel.send(raxfuryBossEmbed);
                    db.set(`cooldown_${tokenDB}`, Date.now());
                  }

                  if (raxfuryBossHealth == 0 || raxfuryBossHealth < 0) {
                    const raxfuryBossDead = new Discord.MessageEmbed()
                      .setTitle(`${raxfuryBoss}`)
                      .setDescription(`${user} you killed ${raxfuryBoss}`)
                      .setColor("#9C162D");
                    message.channel.send(raxfuryBossDead);
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(`raxfuryBossHealth_${tokenDB}`, 1280986);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var weaponName = db.fetch(`wepName_${tokenDB}`);
                    if (weaponName == "daggerOfDeath") {
                      const daggerXP = Math.floor(Math.random() * 6) + 15;
                      db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);

                      // Retrieve the current XP and level of Dagger of Death
                      const currentXP =
                        db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                      var currentLevel = 1;

                      // Define the damage values for each level
                      const levelDamage = [
                        200301, 233406, 340221, 462059, 609231, 920132, 1306890,
                        1690530,
                      ];
                      const xpLevels = [
                        { threshold: 35, level: 2 },
                        { threshold: 70, level: 3 },
                        { threshold: 156, level: 4 },
                        { threshold: 360, level: 5 },
                        { threshold: 700, level: 6 },
                        { threshold: 1280, level: 7 },
                        { threshold: 1940, level: 8 },
                        { threshold: 2642, level: 9 },
                      ];
                      for (const levelData of xpLevels) {
                        if (currentXP >= levelData.threshold) {
                          currentLevel = levelData.level;
                        } else {
                          break;
                        }
                      }
                      let nextLevelXP;

                      // Check if the accumulated XP is enough for a level-up
                      var daggerOfDeathLevel = db.fetch(
                        `daggerOfDeathLevel_${tokenDB}`
                      );
                      for (let i = currentLevel; i < levelDamage.length; i++) {
                        if (
                          daggerOfDeathLevel == 9 &&
                          currentXP >= nextLevelXP
                        ) {
                          // Level up the weapon
                          db.set(`daggerOfDeathLevel_${tokenDB}`, i + 1);
                          // Reset XP to 0 for the next level
                          db.set(`daggerOfDeathXP_${tokenDB}`, 0);

                          // Set the new weapon damage based on the level
                          db.set(
                            `daggerOfDeathDamage_${tokenDB}`,
                            levelDamage[i]
                          );

                          message.channel.send(
                            `Congratulations! Your Dagger of Death has leveled up to level ${
                              i + 1
                            } and its damage has increased to ${
                              levelDamage[i]
                            }!`
                          );
                          break; // Exit the loop after leveling up
                        }
                      }
                    }
                    if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`APS COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#00FF00");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`APS COMPLETE - Decade of Annihilation`)
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#00FF00");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`APS COMPLETE - Half-century of Destruction`)
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#00FF00");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`APS COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#00FF00");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    if (chance <= 1.5) {
                      if (randomItems == "Ice cube") {
                        message.channel.send(
                          "```" +
                            `yaml
You received : Ice cube
` +
                            "```"
                        );
                        db.add(`iceCube_${tokenDB}`, 1);
                      }
                      if (randomItems == "Arcane Shard") {
                        message.channel.send(
                          "```" +
                            `fix
You received : Arcane Shard
` +
                            "```"
                        );
                        db.add(`arcaneShard_${tokenDB}`, 1);
                      }
                      if (randomItems == "Leather") {
                        message.channel.send(
                          "```" +
                            `fix
-You received : Leather
` +
                            "```"
                        );
                        db.add(`leather_${tokenDB}`, 1);
                      }
                    } else if (chance <= 2.5) {
                      message.channel.send(
                        "```" +
                          `diff
-You received : Super Gem
` +
                          "```"
                      );
                      db.add(`superGem_${tokenDB}`, 1);
                    } else {
                      if (craftingItems == "Cotton") {
                        message.channel.send(
                          "```" +
                            `diff
You received : Cotton
` +
                            "```"
                        );
                        db.add(`cotton_${tokenDB}`, 1);
                      } else if (craftingItems == "Green rock") {
                        message.channel.send(
                          "```" +
                            `diff
You received : Green rock
` +
                            "```"
                        );
                        db.add(`greenRock_${tokenDB}`, 1);
                      } else if (craftingItems == "Silk") {
                        message.channel.send(
                          "```" +
                            `diff
You received : Silk
` +
                            "```"
                        );
                        db.add(`silk_${tokenDB}`, 1);
                      } else {
                        db.add(`money_${tokenDB}.pocket`, finalCoins);
                        finalCoins = Math.floor(finalCoins)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        message.channel.send(
                          "```" +
                            `diff
You received : ${finalCoins} Gold Coins
` +
                            "```"
                        );
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
};
