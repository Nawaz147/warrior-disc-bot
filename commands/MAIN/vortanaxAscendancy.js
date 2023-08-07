var Discord = require("discord.js");
var ms = require("parse-ms");
var db = require("quick.db");
var moneyCap = require("../../config.json");
var rashetaDamage = require("../../weaponStats/rashetaAxe.json");
var waetraDamage = require("../../weaponStats/waetraBow.json");
var texarus = require("../../weaponStats/texarusStaff.json");
var natureDaggerss = require("../../weaponStats/natureDaggers.json");
var ventorianBoww = require("../../weaponStats/ventorianBow.json");
var immortalGunn = require("../../weaponStats/immortalGun.json");
module.exports = {
  name: "play",
  aliases: ["Play"],
  description: "To play the event",
  usage: "play",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    var tokenDB = db.fetch(`${user.id}.valoriumToken`);
    var banned = db.fetch(`banned_${tokenDB}`);
    var banReason = db.fetch(`reasonForBan_${tokenDB}`);
    var banDate = db.fetch(`banDate_${tokenDB}`);
    var update = db.fetch(`updateInProgress`);
    scrapItems = [
      "Rusty gears",
      "Dustbin",
      "Newspaper",
      "Torn cloth",
      "Used tissue",
      "Broken stick",
      "Awakening gem",
    ];
    const soldierChance = 0.08;
    const eliteAwakeningGemChance = 0.02;
    const scrapChance = 0.3;
    const vortexOrbChance = 0.01;
    const verdantLeafChance = 0.002;
    const celestialMoonstoneChance = 0.003;
    const crystallineCorestoneChance = 0.015;
    const tomeOfEverlastingWisdomChance = 0.015;
    const unlockedCrateChance = 0.07;
    const goldCoinsChance =
      1 -
      (soldierChance +
        eliteAwakeningGemChance +
        scrapChance +
        vortexOrbChance +
        verdantLeafChance +
        celestialMoonstoneChance +
        crystallineCorestoneChance +
        tomeOfEverlastingWisdomChance +
        unlockedCrateChance);

    var shuffledItems = scrapItems.slice().sort(() => Math.random() - 0.5);
    var randomScrap = shuffledItems[0];
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet, type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      var banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      if (args[0] !== "hit") {
        return message.channel.send(
          "Invalid command. To play the event, use: `+play hit`"
        );
      } else if (args[0] == "hit") {
        var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        var natureDaggersEquipped = db.fetch(
          `equippedNatureDaggers_${tokenDB}`
        );
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

        let weaponDamage, weaponEquipped;

        if (natureDaggersEquipped == "True") {
          weaponDamage = natureDaggerss.Damage;
          weaponEquipped = true;
        } else if (ventorianBowEquipped == "True") {
          weaponDamage = ventorianBoww.Damage;
          weaponEquipped = true;
        } else if (waetraEquipped == "True") {
          weaponDamage = waetraDamage.Damage;
          weaponEquipped = true;
        } else if (rashetaEquipped == "True") {
          weaponDamage = rashetaDamage.Damage;
          weaponEquipped = true;
        } else if (immortalEquipped == "True") {
          weaponDamage = immortalGunn.Damage;
          weaponEquipped = true;
        } else if (texarusEquipped == "True") {
          weaponDamage = texarus.Damage;
          weaponEquipped = true;
        }

        if (weaponEquipped !== true) {
          message.channel.send(
            "**You need to equip a weapon to play this event**, if you don't have one then **type +gw** to get your free weapon"
          );
        } else {
          var cooldownDuration = 1500;
          var cooldown = db.fetch(`cooldown_${tokenDB}`) || 0; // Set default value to 0 if cooldown is not set in the database

          if (cooldown !== null && cooldown - Date.now() > 0) {
            var time = ms(cooldown - (Date.now() - cooldown));

            var timeEmbed = new Discord.MessageEmbed()
              .setColor("#FFFFFF")
              .setTitle("Spamming isn't a good thing")
              .setDescription(
                `You need to wait ${time.seconds}s ${time.milliseconds}ms`
              );
            message.channel.send(timeEmbed);
          } else {
            var antiBot = db.fetch(`antiBot_${tokenDB}`);

            if (antiBot == 45555) {
              db.set(`passedCaptchaVerification_${tokenDB}`, false);
              // ... CAPTCHA Verification logic (existing code) ...

              // Generate a random CAPTCHA challenge
              var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let captcha = "";
              for (let i = 0; i < 6; i++) {
                captcha += characters.charAt(
                  Math.floor(Math.random() * characters.length)
                );
              }
              captcha = captcha.toLowerCase(); // Convert the CAPTCHA to lowercase

              var verificationEmbed = new Discord.MessageEmbed()
                .setTitle("Verification Required")
                .setDescription(
                  `Please solve the following CAPTCHA to proceed with the command:\n\n**${captcha}**`
                );
              var captchaMessage = await message.channel.send(
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

                message.channel.send(
                  `${user}  You've been banned from Valorium bot for - Botting\nDate : ${fullDate}`
                );
                db.set(`antiBot_${tokenDB}`, 0);

                var bannedEmbed = new Discord.MessageEmbed()
                  .setTitle("ACCOUNT BANNED !!")
                  .setDescription(
                    `You have been auto-banned from Valorium bot\nReason: Botting\nBanned by: <@934850905273159710>`
                  )
                  .setTimestamp()
                  .setColor("#FF0000");
                user.send(bannedEmbed);
                db.set(`captchaAttemptAdd_${tokenDB}`, 0);
              }

              var filter = (response) =>
                response.author.id === message.author.id;
              var collector = message.channel.createMessageCollector(filter, {
                time: 30000,
              });

              // ... (CAPTCHA Verification existing code) ...

              collector.on("collect", (response) => {
                var userResponse = response.content.trim().toLowerCase(); // Convert user response to lowercase

                if (userResponse === captcha) {
                  // Compare both strings in lowercase
                  // Proceed with the "hit" command logic here

                  // ... your existing "hit" command logic ...

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
                      "You passed captcha verification, continue!"
                    );
                  } else {
                    message.channel.send("retry");
                  }

                  // ... the rest of your "hit" command logic ...
                }
              });

              // ... (remaining existing code) ...
            } else {
              var vortanaxBossHealth = db.fetch(
                `vortanaxBossHealth_${tokenDB}`
              );
              if (
                vortanaxBossHealth == null ||
                vortanaxBossHealth == undefined
              ) {
                vortanaxBossHealth = 1490826;
                db.set(`vortanaxBossHealth_${tokenDB}`, 1490826);
              }

              var vortanaxBoss = "Archon Vortanax";

              if (vortanaxBossHealth < 0) {
                var vortanaxBossEmbed2 = new Discord.MessageEmbed()
                  .setTitle(`${vortanaxBoss}`)
                  .setDescription(`${user} you hit ${vortanaxBoss}`)
                  .addField(`Archon Vortanax`, `1490826`)
                  .addField(`Archon Vortanax current health`, `0`)
                  .addField(`Your damage`, `${weaponDamage}`)
                  .setColor("#FF7F50");
                message.channel.send(vortanaxBossEmbed2);
                db.add(`antiBot_${tokenDB}`, 1);
              } else {
                db.subtract(`vortanaxBossHealth_${tokenDB}`, weaponDamage);
                var vortanaxBossEmbed = new Discord.MessageEmbed()
                  .setTitle(`${vortanaxBoss}`)
                  .setDescription(`${user} you hit ${vortanaxBoss}`)
                  .addField(`Archon Vortanax`, `1490826`)
                  .addField(
                    `Archon Vortanax current health`,
                    `${vortanaxBossHealth}`
                  )
                  .addField(`Your damage`, `${weaponDamage}`)
                  .setColor("#FF7F50");
                message.channel.send(vortanaxBossEmbed);
                db.set(`cooldown_${tokenDB}`, Date.now());
              }

              if (vortanaxBossHealth == 0 || vortanaxBossHealth < 0) {
                var vortanaxBossDead = new Discord.MessageEmbed()
                  .setTitle(`${vortanaxBoss}`)
                  .setDescription(`${user} you killed ${vortanaxBoss}`)
                  .setColor("#EE4B2B");
                message.channel.send(vortanaxBossDead);
                db.add(`bossesKilledTotal_${tokenDB}`, 1);

                let chance = Math.random();

                if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                  var SingleBossKillApsEmbed = new Discord.MessageEmbed()
                    .setTitle(`APS COMPLETE - First Blood`)
                    .setDescription(`${user} You gained 500 aps`)
                    .setColor("#00FF00");
                  db.set(`firstBlood_${tokenDB}`, true);
                  db.add(`achievementPoints_${tokenDB}`, 500);
                  message.channel.send(SingleBossKillApsEmbed);
                } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                  var TenBossKillApsEmbed = new Discord.MessageEmbed()
                    .setTitle(`APS COMPLETE - Decade of Annihilation`)
                    .setDescription(`${user} You gained 300 aps`)
                    .setColor("#00FF00");
                  db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                  db.add(`achievementPoints_${tokenDB}`, 300);
                  message.channel.send(TenBossKillApsEmbed);
                } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                  var FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                    .setTitle(`APS COMPLETE - Half-century of Destruction`)
                    .setDescription(`${user} You gained 800 aps`)
                    .setColor("#00FF00");
                  db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                  db.add(`achievementPoints_${tokenDB}`, 800);
                  message.channel.send(FiftyBossKillApsEmbed);
                } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 100) {
                  var HundredBossKillApsEmbed = new Discord.MessageEmbed()
                    .setTitle(`APS COMPLETE - Century of Slaughter`)
                    .setDescription(`${user} You gained 1500 aps`)
                    .setColor("#00FF00");
                  db.set(`centuryOfSlaughter_${tokenDB}`, true);
                  db.add(`achievementPoints_${tokenDB}`, 1500);
                  message.channel.send(HundredBossKillApsEmbed);
                }
                db.set(`cooldown_${tokenDB}`, Date.now());
                db.set(`vortanaxBossHealth_${tokenDB}`, 1490826);

                if (chance <= soldierChance) {
                  var soldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
                  db.set(`soldiers_${tokenDB}`, soldiers + 1);
                  message.channel.send(
                    "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                  );
                  console.log("You received a soldier");
                  // 8% chance to get Unlocked Crate of Energy
                } else if (chance <= eliteAwakeningGemChance) {
                  var eliteAwakeningGem =
                    db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0;
                  db.set(`eliteAwakeningGem_${tokenDB}`, eliteAwakeningGem + 1);
                  message.channel.send(
                    "```" + `yaml\nYou received : Elite awakening gem\n` + "```"
                  );
                } else if (chance <= scrapChance) {
                  if (randomScrap == "Rusty gears") {
                    message.channel.send(
                      "```" + `diff\nYou received : Rusty gears\n` + "```"
                    );
                    db.add(`rustyGears_${tokenDB}`, 1);
                  } else if (randomScrap == "Dustbin") {
                    message.channel.send(
                      "```" + `diff\nYou received : Dustbin\n` + "```"
                    );
                    db.add(`dustbin_${tokenDB}`, 1);
                  } else if (randomScrap == "Newspaper") {
                    message.channel.send(
                      "```" + `diff\nYou received : Newspaper\n` + "```"
                    );
                    db.add(`newspaper_${tokenDB}`, 1);
                  } else if (randomScrap == "Torn cloth") {
                    message.channel.send(
                      "```" + `diff\nYou received : Torn cloth\n` + "```"
                    );
                    db.add(`tornCloth_${tokenDB}`, 1);
                  } else if (randomScrap == "Used tissue") {
                    message.channel.send(
                      "```" + `diff\nYou received : Used tissue\n` + "```"
                    );
                    db.add(`usedTissue_${tokenDB}`, 1);
                  } else if (randomScrap == "Broken stick") {
                    message.channel.send(
                      "```" + `diff\nYou received : Broken stick\n` + "```"
                    );
                    db.add(`brokenStick_${tokenDB}`, 1);
                  } else if (randomScrap == "Awakening gem") {
                    message.channel.send(
                      "```" + `diff\nYou received : Awakening gem\n` + "```"
                    );
                    db.add(`awakeningGem_${tokenDB}`, 1);
                  }
                } else if (chance <= vortexOrbChance) {
                  var vortexOrbs = db.fetch(`vortexOrb_${tokenDB}`) || 0;
                  db.set(`vortexOrb_${tokenDB}`, vortexOrbs + 1);
                  message.channel.send(
                    "```" + `diff\n+You received : Vortex Orb\n` + "```"
                  );
                } else if (chance <= verdantLeafChance) {
                  var verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`) || 0;
                  db.set(`verdantLeaf_${tokenDB}`, verdantLeaf + 1);
                  message.channel.send(
                    "```" +
                      `diff\n+You received : Verdant Whisper Leaf\n` +
                      "```"
                  );
                } else if (chance <= celestialMoonstoneChance) {
                  var celestialMoonstone =
                    db.fetch(`celestialMoonstone_${tokenDB}`) || 0;
                  db.set(
                    `celestialMoonstone_${tokenDB}`,
                    celestialMoonstone + 1
                  );
                  message.channel.send(
                    "```" +
                      `diff\n+You received : Celestial Moonstone\n` +
                      "```"
                  );
                } else if (chance <= crystallineCorestoneChance) {
                  var crystallineCorestone =
                    db.fetch(`crystallineCorestone_${tokenDB}`) || 0;
                  db.set(
                    `crystallineCorestone_${tokenDB}`,
                    crystallineCorestone + 1
                  );
                  message.channel.send(
                    "```" +
                      `diff\n+You received : Crystalline Corestone\n` +
                      "```"
                  );
                } else if (chance <= tomeOfEverlastingWisdomChance) {
                  var tomes =
                    db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0;
                  db.set(`tomeOfEverlastingWisdom_${tokenDB}`, tomes + 1);
                  message.channel.send(
                    "```" +
                      `diff\n+You received : Tome of Everlasting Wisdom\n` +
                      "```"
                  );
                } else if (chance <= unlockedCrateChance) {
                  var unlockedCrate =
                    db.fetch(`unlockedCrateOfEnergy_${tokenDB}`) || 0;
                  db.set(`unlockedCrateOfEnergy_${tokenDB}`, unlockedCrate + 1);
                  message.channel.send(
                    "```" +
                      `yaml\nYou received : Unlocked Crate of Energy\n` +
                      "```"
                  );
                } else if (chance <= goldCoinsChance) {
                  bal = await db.fetch(`money_${tokenDB}.pocket`);

                  var randomGoldCoins = Math.floor(Math.random() * 2900) + 8209;
                  var goldLoot = db.fetch(`goldLoot_${tokenDB}`) || 0;
                  let finalCoins;
                  if (goldLoot == 0) {
                    finalCoins = randomGoldCoins;
                  } else {
                    finalCoins = randomGoldCoins * goldLoot + 1;
                  }
                  if (finalCoins + bal > moneyCap.moneyCap) {
                    message.channel.send(
                      "**You cannot exceed the gold limit**"
                    );
                  } else {
                    db.add(`money_${tokenDB}.pocket`, Math.floor(finalCoins));
                    db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
                    // Use Math.floor() to remove decimals
                    const lootedGold = db.fetch(`lootedGold_${tokenDB}`) || 0;
                    const apsData = [
                      {
                        amount: 100000,
                        aps: 100,
                        key: "acquiredAHeftySumOf100k",
                        title: "APS COMPLETE - Acquired a hefty sum of 100k",
                      },
                      {
                        amount: 500000,
                        aps: 200,
                        key: "amassedAnImpressiveHaulOf500k",
                        title:
                          "APS COMPLETE - Amassed an impressive haul of 500k",
                      },
                      {
                        amount: 1000000,
                        aps: 500,
                        key: "reachedAmillionInRiches",
                        title: "APS COMPLETE - Reached a million in riches",
                      },
                      {
                        amount: 10000000,
                        aps: 1000,
                        key: "glorious10mPlunder",
                        title: "APS COMPLETE - Glorious 10-Million Plunder",
                      },
                      {
                        amount: 100000000,
                        aps: 1700,
                        key: "wealthConqueror",
                        title: "APS COMPLETE - Wealth Conqueror",
                      },
                    ];

                    for (const achievement of apsData) {
                      const achievementKey = `${achievement.key}_${tokenDB}`;
                      if (
                        lootedGold >= achievement.amount &&
                        !db.fetch(achievementKey)
                      ) {
                        const apsEmbed = new Discord.MessageEmbed()
                          .setTitle(achievement.title)
                          .setDescription(
                            `${user} You gained ${achievement.aps} aps`
                          )
                          .setColor("#00FF00");
                        db.set(achievementKey, true);
                        db.add(`achievementPoints_${tokenDB}`, achievement.aps);
                        message.channel.send(apsEmbed);
                      }
                    }
                    // ... Check for achievement points (existing code) ...

                    finalCoins = Math.floor(finalCoins)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    message.channel.send(
                      "```" +
                        `diff\nYou received : ${finalCoins} Gold Coins\n` +
                        "```"
                    );
                  }
                } else {
                  bal = await db.fetch(`money_${tokenDB}.pocket`);

                  var randomGoldCoins = Math.floor(Math.random() * 2900) + 5202;
                  var goldLoot = db.fetch(`goldLoot_${tokenDB}`) || 0;
                  let finalCoins;
                  if (goldLoot == 0) {
                    finalCoins = randomGoldCoins;
                  } else {
                    finalCoins = randomGoldCoins * goldLoot + 1;
                  }
                  if (finalCoins + bal > moneyCap.moneyCap) {
                    message.channel.send(
                      "**You cannot exceed the gold limit**"
                    );
                  } else {
                    db.add(`money_${tokenDB}.pocket`, Math.floor(finalCoins));
                    db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
                    // Use Math.floor() to remove decimals
                    const lootedGold = db.fetch(`lootedGold_${tokenDB}`) || 0;
                    const apsData = [
                      {
                        amount: 100000,
                        aps: 100,
                        key: "acquiredAHeftySumOf100k",
                        title: "APS COMPLETE - Acquired a hefty sum of 100k",
                      },
                      {
                        amount: 500000,
                        aps: 200,
                        key: "amassedAnImpressiveHaulOf500k",
                        title:
                          "APS COMPLETE - Amassed an impressive haul of 500k",
                      },
                      {
                        amount: 1000000,
                        aps: 500,
                        key: "reachedAmillionInRiches",
                        title: "APS COMPLETE - Reached a million in riches",
                      },
                      {
                        amount: 10000000,
                        aps: 1000,
                        key: "glorious10mPlunder",
                        title: "APS COMPLETE - Glorious 10-Million Plunder",
                      },
                      {
                        amount: 100000000,
                        aps: 1700,
                        key: "wealthConqueror",
                        title: "APS COMPLETE - Wealth Conqueror",
                      },
                    ];

                    for (const achievement of apsData) {
                      const achievementKey = `${achievement.key}_${tokenDB}`;
                      if (
                        lootedGold >= achievement.amount &&
                        !db.fetch(achievementKey)
                      ) {
                        const apsEmbed = new Discord.MessageEmbed()
                          .setTitle(achievement.title)
                          .setDescription(
                            `${user} You gained ${achievement.aps} aps`
                          )
                          .setColor("#00FF00");
                        db.set(achievementKey, true);
                        db.add(`achievementPoints_${tokenDB}`, achievement.aps);
                        message.channel.send(apsEmbed);
                      }
                    }
                    // ... Check for achievement points (existing code) ...

                    finalCoins = Math.floor(finalCoins)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    message.channel.send(
                      "```" +
                        `diff\nYou received : ${finalCoins} Gold Coins\n` +
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
  },
};
