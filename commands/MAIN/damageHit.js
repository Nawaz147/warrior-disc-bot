const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarus = require("../../weaponStats/texarusStaff.json");
const natureDaggerss = require("../../weaponStats/natureDaggers.json");
const ventorianBoww = require("../../weaponStats/ventorianBow.json");
const immortalGunn = require("../../weaponStats/immortalGun.json");
const daggerOfDeathh = require("../../weaponStats/daggerOfDeath.json");
const moonsShineOfMetalSwordd = require("../../weaponStats/moonsShineOfMetalSword.json");
const moneyCap = require("../../config.json");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "damage",
  aliases: ["damage"],
  description: "To play premium zone with key",
  usage: "damage",
  category: "Economy",
  run: async (client, message, args) => {
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    const isPoisoned = db.fetch(`isPoisoned_${tokenDB}`) || false;
    if (startFunction) {
      await startFunction(message, args, client);
    }
    if (
      tokenDB &&
      acceptedTOS == true &&
      update == false &&
      banned == false &&
      isPoisoned == false
    ) {
      if (args[0] !== "hit") {
        return message.channel.send("Invalid command. Use: `damage hit.x`");
      } else if (args[0] == "hit") {
        const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        const natureDaggersEquipped = db.fetch(
          `equippedNatureDaggers_${tokenDB}`
        );
        const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
        const ventorianBowEquipped = db.fetch(
          `equippedVentorianBow_${tokenDB}`
        );
        const texarus = db.fetch(`texarus_${tokenDB}`);
        const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
        const waetra = db.fetch(`waetra_${tokenDB}`);
        const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
        const rasheta = db.fetch(`rasheta_${tokenDB}`);
        const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
        const immortal = db.fetch(`immortalGun_${tokenDB}`);
        const immortalEquipped = db.fetch(`equippedImmortalGun_${tokenDB}`);
        const daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
        const daggerOfDeathEquipped = db.fetch(
          `equippedDaggerOfDeath_${tokenDB}`
        );
        const moonsShineOfMetalSword = db.fetch(
          `moonsShineOfMetalSword_${tokenDB}`
        );
        const moonsShineOfMetalSwordEquipped = db.fetch(
          `equippedMoonsShineOfMetalSword_${tokenDB}`
        );
        if (natureDaggersEquipped == "True") {
          var weaponDamage = natureDaggerss.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (ventorianBowEquipped == "True") {
          var weaponDamage = ventorianBoww.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (waetraEquipped == "True") {
          var weaponDamage = waetraDamage.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (rashetaEquipped == "True") {
          var weaponDamage = rashetaDamage.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (immortalEquipped == "True") {
          var weaponDamage = immortalGunn.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (texarusEquipped == "True") {
          var weaponDamage = texarus.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (daggerOfDeathEquipped == "True") {
          var daggerOfDeathLevel =
            db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
          if (daggerOfDeathLevel > 1) {
            var daggerOfDeathDamage = db.fetch(
              `daggerOfDeathDamage_${tokenDB}`
            );
            weaponDamage = daggerOfDeathDamage;
            db.set(`weaponDamage_${tokenDB}`, daggerOfDeathDamage);
            weaponEquipped = true;
          } else {
            weaponDamage = daggerOfDeathh.Damage;
            db.set(`weaponDamage_${tokenDB}`, weaponDamage);
            weaponEquipped = true;
          }
        } else if (moonsShineOfMetalSwordEquipped == "True") {
          var weaponDamage = moonsShineOfMetalSwordd.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        }
        if (weaponEquipped !== true) {
          const weaponEmbed = new Discord.MessageEmbed()
            .setColor("#00A86B") // A lively green color
            .setTitle("🗡️ Gear Up for Battle 🗡️") // A title that invokes readiness
            .setDescription(
              "Prepare to confront the mighty boss by arming yourself with a weapon. If you lack one, type 'gw.x' to claim a complimentary weapon."
            );

          message.channel.send(weaponEmbed);
        } else if (weaponEquipped == true) {
          timeout = 1000;
          var cooldown = await db.fetch(`cooldown_${tokenDB}`);
          if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = ms(timeout - (Date.now() - cooldown));

            let timeEmbed = new Discord.MessageEmbed()
              .setColor("#FFFFFF") // A captivating orange color
              .setTitle("🌟 Face the Monstrous Foe 🌟") // An intense title
              .setDescription(
                `The monstrous foe is before you! Prepare for battle. Each strike has a cooldown of ${time.seconds} seconds and ${time.milliseconds} milliseconds. Remember, **do not spam** your attacks. Patience and strategy are your allies! ⚔️`
              )
              .setFooter("The fate of the realm hangs in the balance.");

            message.channel.send(timeEmbed);
          } else {
            function resetBossHealth() {
              db.set(
                `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                136905102
              );
              db.set(`didntHitCooldown_${tokenDB}`, Date.now());

              // Notify that the boss ran away
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: "The boss ran away!",
                  footer: "Be quick to hit next time",
                },
              });
              db.set(`eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`, false);
            }

            var eldrazurTheAbyssalTyrantBossHealth =
              db.fetch(`eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`) ||
              136905102;
            function createHealthBar(health, maxHealth, barLength = 20) {
              // Ensure health and maxHealth are non-negative
              health = Math.max(0, health);
              maxHealth = Math.max(0, maxHealth);

              const percentage = Math.min(100, (health / maxHealth) * 100);
              const progressBlocks = Math.floor((barLength * percentage) / 100);
              const remainingBlocks = barLength - progressBlocks;

              const filledEmoji = "<:purpleBar:1153319630350327919>"; // Replace with your custom emoji syntax
              const emptyEmoji = "<:lightPurpleBar:1153319663070089296>"; // Replace with your custom emoji syntax

              // Use Discord Markdown syntax to display custom emojis without spacing issues
              const narrowFilled = filledEmoji + ""; // Zero-width joiner to reduce spacing
              const narrowEmpty = emptyEmoji + "‌"; // Zero-width joiner to reduce spacing

              let progressBar = "";
              for (let i = 0; i < progressBlocks; i++) {
                progressBar += narrowFilled;
              }

              for (let i = 0; i < remainingBlocks; i++) {
                progressBar += narrowEmpty;
              }
              return progressBar;
            }
            var eldrazurTheAbyssalTyrantBossHealth =
              db.fetch(`eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`) ||
              136905102;
            const bossHealthBar = createHealthBar(
              eldrazurTheAbyssalTyrantBossHealth,
              136905102,
              20
            );

            var currentBossHealth =
              db.fetch(`eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`) ||
              136905102;

            if (currentBossHealth > "0") {
              currentBossHealth = currentBossHealth
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              var bossHealthProgress = `${currentBossHealth} / 136,905,102`;
            } else {
              var bossHealthProgress = `0 / 136,905,102`;
            }
            if (
              eldrazurTheAbyssalTyrantBossHealth == null ||
              eldrazurTheAbyssalTyrantBossHealth == undefined
            ) {
              db.set(
                `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                136905102
              );
            }

            var eldrazurTheAbyssalTyrantBoss = "Eldra'zur , the abyssal tyrant";
            var randomGoldCoins = Math.floor(Math.random() * 1670291) + 850190;
            var goldLoot = db.fetch(`goldLoot_${tokenDB}`) || 0;
            if (goldLoot == undefined || goldLoot == null) {
              goldLoot = 0;
            }
            if (goldLoot == 0) {
              var finalCoins = randomGoldCoins;
            } else {
              var finalCoins = randomGoldCoins * goldLoot + 1;
            }
            const bossSpawned = db.fetch(
              `eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`
            );
            var lastHitTime = db.fetch(`lastHitTime_${tokenDB}`);
            if (Date.now - lastHitTime >= 180000) {
              resetBossHealth();
            }
            if (bossSpawned == true) {
              const bossHealthBar = createHealthBar(
                eldrazurTheAbyssalTyrantBossHealth,
                136905102,
                20
              );
              const eldrazurTheAbyssalTyrantBossEmbed =
                new Discord.MessageEmbed()
                  .setColor("#6A0DAD") // Deep purple color
                  .setAuthor(`${eldrazurTheAbyssalTyrantBoss}`) // Add an image of Eldra'zur as the author
                  .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                  .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif") // You can use another image to show the boss
                  .setFooter(
                    "May your courage and strength guide you to victory!"
                  );
              db.set(`eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                eldrazurTheAbyssalTyrantBossEmbed
              );
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var waterSkill = "<a:waterElement:1152278341181767821";
              var orbSkill = "<a:orbSkill:1153322063306686604>";
              await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(waterSkill);
              if (
                Date.now - db.fetch(`orbReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(orbSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "waterElement", "orbSkill"].includes(
                    reaction.emoji.name
                  ) && user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "orbSkill") {
                  var mysterionixProActivated =
                    db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
                  if (mysterionixProActivated == true) {
                    const weaponDamage =
                      db.fetch(`weaponDamage_${tokenDB}`) || 0;
                    db.subtract(
                      `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                      weaponDamage / 1.54
                    );
                    reaction.remove(user).catch(console.error);
                    var eldrazurTheAbyssalTyrantBossHealth =
                      db.fetch(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                      ) || 136905102;
                    function addOrbSkillReaction() {
                      if (
                        !collector.ended &&
                        eldrazurTheAbyssalTyrantBossHealth > 0 &&
                        eldrazurTheAbyssalTyrantBossHealth !== 136905102
                      ) {
                        if (!reactedUsers.has(message.author.id)) {
                          reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                          const reactionInterval = 7500;
                          db.set(`orbReactionInterval_${tokenDB}`, 7500);
                          // Use setInterval to repeatedly call the function
                          const intervalId = setInterval(() => {
                            if (eldrazurTheAbyssalTyrantBossHealth <= 0) {
                              // If boss health is zero or below, clear the interval and exit
                              db.set(`orbReactionInterval_${tokenDB}`, 7500);
                              clearInterval(intervalId);
                              return;
                            } else {
                              var orbReactionInterval = db.fetch(
                                `orbReactionInterval_${tokenDB}`
                              );
                              var eldrazurTheAbyssalTyrantBossHealth =
                                db.fetch(
                                  `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                                ) || 136905102;
                              if (
                                eldrazurTheAbyssalTyrantBossHealth <
                                  136905102 &&
                                eldrazurTheAbyssalTyrantBossHealth > 0
                              ) {
                                db.set(`orbReactionInterval_${tokenDB}`, 0);
                              }
                              if (orbReactionInterval == 0) {
                                bossMessage
                                  .react(orbSkill)
                                  .catch(console.error);
                                db.set(`orbReactionInterval_${tokenDB}`, 7500);
                                return;
                              }
                              // db.set(`orbReactionInterval_${tokenDB}`, 0);
                            }
                          }, reactionInterval);
                        }
                      } else {
                        db.set(`orbReactionInterval_${tokenDB}`, "x");
                        return; // No need to continue if the boss health is zero or below
                      }
                    }

                    addOrbSkillReaction();
                    if (
                      eldrazurTheAbyssalTyrantBossHealth < 0 ||
                      eldrazurTheAbyssalTyrantBossHealth == 0
                    ) {
                      // Boss defeated
                      eldrazurTheAbyssalTyrantBossHealth = 0;

                      bossMessage.reactions.removeAll();
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      db.set(
                        `eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`,
                        false
                      );
                      eldrazurTheAbyssalTyrantBossHealth =
                        eldrazurTheAbyssalTyrantBossHealth
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                      const eldrazurTheAbyssalTyrantBossDeadEmbed =
                        new Discord.MessageEmbed()
                          .setColor("#42096b") // Gold color for celebration
                          .setTitle(`**Victory achieved**`)
                          .setDescription(
                            `${eldrazurTheAbyssalTyrantBoss} has been defeated!`
                          )
                          .addField("Defeated by", `${user}`, true)
                          .setImage("https://i.ibb.co/rHc7Xjj/IMG-0347.gif")
                          .setFooter(
                            "A legendary victory that will be told for ages!"
                          );
                      message.channel.send(
                        eldrazurTheAbyssalTyrantBossDeadEmbed
                      );
                      db.add(`bossesKilledTotal_${tokenDB}`, 1);
                      var chance = Math.floor(Math.random() * 125) + 1;
                      var moonsShineOfMetalSwordChance =
                        Math.floor(Math.random() * 800) + 1;
                      var weaponName = db.fetch(`wepName_${tokenDB}`);
                      if (weaponName == "daggerOfDeath") {
                        const daggerXP = Math.floor(Math.random() * 210) + 120;
                        if (daggerOfDeathLevel !== 10) {
                          db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);
                        }
                        // Retrieve the current XP and level of Dagger of Death
                        const currentXP =
                          db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                        var currentLevel =
                          db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

                        // Define the damage values for each level
                        const levelDamage = [
                          1200301, 2233406, 2740221, 3462059, 5109231, 6920132,
                          7306890, 8690530, 10049141,
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
                          { threshold: 16950, level: 10 },
                        ];

                        for (const levelData of xpLevels) {
                          if (currentXP >= levelData.threshold) {
                            currentLevel = levelData.level;
                          } else {
                            break;
                          }
                        }
                        for (
                          let i = daggerOfDeathLevel - 1;
                          i < xpLevels.length;
                          i++
                        ) {
                          const nextLevelXP = xpLevels[i].threshold;
                          if (
                            currentXP >= nextLevelXP &&
                            daggerOfDeathLevel !== 10
                          ) {
                            // Level up the weapon
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            db.set(
                              `daggerOfDeathDamage_${tokenDB}`,
                              levelDamage[i]
                            );

                            var daggerLevelupEmbed = new Discord.MessageEmbed()
                              .setTitle("Level up!")
                              .setDescription(
                                `Your weapon leveled up to level ${
                                  daggerOfDeathLevel + 1
                                }`
                              )
                              // .addField(`New damage`, `${levelDamage[i]}`)
                              .setColor(`#013220`);

                            message.channel.send(daggerLevelupEmbed);
                            db.set(
                              `daggerOfDeathLevel_${tokenDB}`,
                              daggerOfDeathLevel + 1
                            );
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            break; // Exit the loop after leveling up
                          }
                        }
                      }
                      if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                        const SingleBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                            .setDescription(`${user} You gained 500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`firstBlood_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 500);
                        message.channel.send(SingleBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 10
                      ) {
                        const TenBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                          )
                          .setDescription(`${user} You gained 300 aps`)
                          .setColor("#6A0DAD");
                        db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 300);
                        message.channel.send(TenBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 50
                      ) {
                        const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                          )
                          .setDescription(`${user} You gained 800 aps`)
                          .setColor("#6A0DAD");
                        db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 800);
                        message.channel.send(FiftyBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                      ) {
                        const HundredBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(
                              `ACHIEVEMENT COMPLETE - Century of Slaughter`
                            )
                            .setDescription(`${user} You gained 1500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`centuryOfSlaughter_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 1500);
                        message.channel.send(HundredBossKillApsEmbed);
                      }
                      db.set(`cooldown_${tokenDB}`, Date.now());
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      if (moonsShineOfMetalSwordChance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Moons shine of metal sword"
` +
                            "```"
                        );
                        db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                      }
                      if (chance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Mystic rune of resilience"
` +
                            "```"
                        );
                        db.add(`mysticRuneOfResilience_${tokenDB}`, 1);
                        if (mysticRuneOfResilience == 1) {
                          db.set(
                            `power_${tokenDB}`,
                            soldiers * 0.08 + bullet * 0.48 * 2
                          );
                        }
                      } else if (chance == 2) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Aurora gaze"
` +
                            "```"
                        );
                        db.add(`auroraGaze_${tokenDB}`, 1);
                      } else if (chance == 3) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Abyssal Crown of Dominance"
` +
                            "```"
                        );
                        db.add(`abyssalCrownOfDominance_${tokenDB}`, 1);
                      } else if (chance == 5) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Starcrystal
` +
                            "```"
                        );
                        db.add(`abyssalStarcrystal_${tokenDB}`, 1);
                      } else if (chance == 6) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Eldra'zur's Grimoire of Ruin
` +
                            "```"
                        );
                        db.add(`eldrazursGrimoireOfRuin_${tokenDB}`, 1);
                      } else if (chance == 4) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Scepter of Oblivion
` +
                            "```"
                        );
                        db.add(`abyssalScepterOfOblivion_${tokenDB}`, 1);
                      } else if (chance == 7) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Monarch slayer [title]
` +
                            "```"
                        );
                        db.add(`monarchSlayerTitle_${tokenDB}`, 1);
                      } else {
                        bal = db.fetch(`money_${tokenDB}.pocket`);
                        if (finalCoins + bal > moneyCap.moneyCap) {
                          message.channel.send(
                            "**You cannot exceed gold limit"
                          );
                        } else {
                          db.add(
                            `money_${tokenDB}.pocket`,
                            Math.floor(finalCoins)
                          );
                          db.add(
                            `lootedGold_${tokenDB}`,
                            Math.floor(finalCoins)
                          ); // Use Math.floor() to remove decimals
                          // Use Math.floor() to remove decimals
                          const lootedGold =
                            db.fetch(`lootedGold_${tokenDB}`) || 0;
                          const apsData = [
                            {
                              amount: 100000,
                              aps: 100,
                              key: "acquiredAHeftySumOf100k",
                              title:
                                "ACHIEVEMENT COMPLETE - Acquired a hefty sum of 100k",
                            },
                            {
                              amount: 500000,
                              aps: 200,
                              key: "amassedAnImpressiveHaulOf500k",
                              title:
                                "ACHIEVEMENT COMPLETE - Amassed an impressive haul of 500k",
                            },
                            {
                              amount: 1000000,
                              aps: 500,
                              key: "reachedAmillionInRiches",
                              title:
                                "ACHIEVEMENT COMPLETE - Reached a million in riches",
                            },
                            {
                              amount: 10000000,
                              aps: 1000,
                              key: "glorious10mPlunder",
                              title:
                                "ACHIEVEMENT COMPLETE - Glorious 10-Million Plunder",
                            },
                            {
                              amount: 100000000,
                              aps: 1700,
                              key: "wealthConqueror",
                              title: "ACHIEVEMENT COMPLETE - Wealth Conqueror",
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
                                .setColor("#6A0DAD");
                              db.set(achievementKey, true);
                              db.add(
                                `achievementPoints_${tokenDB}`,
                                achievement.aps
                              );
                              message.channel.send(apsEmbed);
                            }
                          }
                          finalCoins = Math.floor(finalCoins)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          message.channel.send(
                            "```" +
                              `diff
+You acquired : ${finalCoins} Gold Coins
` +
                              "```"
                          );
                        }
                      }
                    }
                    // Update boss health and cooldown
                    const currentTime = Date.now();
                    db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                    const bossHealthBar = createHealthBar(
                      eldrazurTheAbyssalTyrantBossHealth,
                      136905102,
                      20
                    );
                    eldrazurTheAbyssalTyrantBossHealth =
                      eldrazurTheAbyssalTyrantBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eldrazurTheAbyssalTyrantBossEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#6A0DAD")
                        .setAuthor("Eldra'zur , the abyssal tyrant")
                        .addField(
                          `${eldrazurTheAbyssalTyrantBossHealth} / 136,905,102`,
                          `${bossHealthBar}`,
                          true
                        )
                        .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif")
                        .setFooter(
                          "May your courage and strength guide you to victory!"
                        );
                    await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);
                  }
                }
                if (reaction.emoji.name == "hit") {
                  var mysterionixProActivated =
                    db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
                  if (mysterionixProActivated == true) {
                    const currentTime = Date.now();
                    const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                    // const bossHealthBar = createHealthBar(
                    //   eldrazurTheAbyssalTyrantBossHealth,
                    //   136905102,
                    //   20
                    // );
                    // It's not on cooldown, proceed to deal damage
                    const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                    db.subtract(
                      `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                      weaponDamage / 4
                    );
                    var eldrazurTheAbyssalTyrantBossHealth =
                      db.fetch(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                      ) || 136905102;

                    if (
                      eldrazurTheAbyssalTyrantBossHealth < 0 ||
                      eldrazurTheAbyssalTyrantBossHealth == 0
                    ) {
                      // Boss defeated
                      eldrazurTheAbyssalTyrantBossHealth = 0;

                      bossMessage.reactions.removeAll();
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      db.set(
                        `eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`,
                        false
                      );
                      eldrazurTheAbyssalTyrantBossHealth =
                        eldrazurTheAbyssalTyrantBossHealth
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                      const eldrazurTheAbyssalTyrantBossDeadEmbed =
                        new Discord.MessageEmbed()
                          .setColor("#42096b") // Gold color for celebration
                          .setTitle(`**Victory achieved**`)
                          .setDescription(
                            `${eldrazurTheAbyssalTyrantBoss} has been defeated!`
                          )
                          .addField("Defeated by", `${user}`, true)
                          .setImage("https://i.ibb.co/rHc7Xjj/IMG-0347.gif")
                          .setFooter(
                            "A legendary victory that will be told for ages!"
                          );
                      message.channel.send(
                        eldrazurTheAbyssalTyrantBossDeadEmbed
                      );
                      db.add(`bossesKilledTotal_${tokenDB}`, 1);
                      var chance = Math.floor(Math.random() * 125) + 1;
                      var moonsShineOfMetalSwordChance =
                        Math.floor(Math.random() * 800) + 1;
                      var weaponName = db.fetch(`wepName_${tokenDB}`);
                      if (weaponName == "daggerOfDeath") {
                        const daggerXP = Math.floor(Math.random() * 210) + 120;
                        if (daggerOfDeathLevel !== 10) {
                          db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);
                        }
                        // Retrieve the current XP and level of Dagger of Death
                        const currentXP =
                          db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                        var currentLevel =
                          db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

                        // Define the damage values for each level
                        const levelDamage = [
                          1200301, 2233406, 2740221, 3462059, 5109231, 6920132,
                          7306890, 8690530, 10049141,
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
                          { threshold: 16950, level: 10 },
                        ];

                        for (const levelData of xpLevels) {
                          if (currentXP >= levelData.threshold) {
                            currentLevel = levelData.level;
                          } else {
                            break;
                          }
                        }
                        for (
                          let i = daggerOfDeathLevel - 1;
                          i < xpLevels.length;
                          i++
                        ) {
                          const nextLevelXP = xpLevels[i].threshold;
                          if (
                            currentXP >= nextLevelXP &&
                            daggerOfDeathLevel !== 10
                          ) {
                            // Level up the weapon
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            db.set(
                              `daggerOfDeathDamage_${tokenDB}`,
                              levelDamage[i]
                            );

                            var daggerLevelupEmbed = new Discord.MessageEmbed()
                              .setTitle("Level up!")
                              .setDescription(
                                `Your weapon leveled up to level ${
                                  daggerOfDeathLevel + 1
                                }`
                              )
                              // .addField(`New damage`, `${levelDamage[i]}`)
                              .setColor(`#013220`);

                            message.channel.send(daggerLevelupEmbed);
                            db.set(
                              `daggerOfDeathLevel_${tokenDB}`,
                              daggerOfDeathLevel + 1
                            );
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            break; // Exit the loop after leveling up
                          }
                        }
                      }
                      if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                        const SingleBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                            .setDescription(`${user} You gained 500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`firstBlood_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 500);
                        message.channel.send(SingleBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 10
                      ) {
                        const TenBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                          )
                          .setDescription(`${user} You gained 300 aps`)
                          .setColor("#6A0DAD");
                        db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 300);
                        message.channel.send(TenBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 50
                      ) {
                        const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                          )
                          .setDescription(`${user} You gained 800 aps`)
                          .setColor("#6A0DAD");
                        db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 800);
                        message.channel.send(FiftyBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                      ) {
                        const HundredBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(
                              `ACHIEVEMENT COMPLETE - Century of Slaughter`
                            )
                            .setDescription(`${user} You gained 1500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`centuryOfSlaughter_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 1500);
                        message.channel.send(HundredBossKillApsEmbed);
                      }
                      db.set(`cooldown_${tokenDB}`, Date.now());
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      if (moonsShineOfMetalSwordChance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Moons shine of metal sword"
` +
                            "```"
                        );
                        db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                      }
                      if (chance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Mystic rune of resilience"
` +
                            "```"
                        );
                        db.add(`mysticRuneOfResilience_${tokenDB}`, 1);
                        if (mysticRuneOfResilience == 1) {
                          db.set(
                            `power_${tokenDB}`,
                            soldiers * 0.08 + bullet * 0.48 * 2
                          );
                        }
                      } else if (chance == 2) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Aurora gaze"
` +
                            "```"
                        );
                        db.add(`auroraGaze_${tokenDB}`, 1);
                      } else if (chance == 3) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Abyssal Crown of Dominance"
` +
                            "```"
                        );
                        db.add(`abyssalCrownOfDominance_${tokenDB}`, 1);
                      } else if (chance == 5) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Starcrystal
` +
                            "```"
                        );
                        db.add(`abyssalStarcrystal_${tokenDB}`, 1);
                      } else if (chance == 6) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Eldra'zur's Grimoire of Ruin
` +
                            "```"
                        );
                        db.add(`eldrazursGrimoireOfRuin_${tokenDB}`, 1);
                      } else if (chance == 4) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Scepter of Oblivion
` +
                            "```"
                        );
                        db.add(`abyssalScepterOfOblivion_${tokenDB}`, 1);
                      } else if (chance == 7) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Monarch slayer [title]
` +
                            "```"
                        );
                        db.add(`monarchSlayerTitle_${tokenDB}`, 1);
                      } else {
                        bal = db.fetch(`money_${tokenDB}.pocket`);
                        if (finalCoins + bal > moneyCap.moneyCap) {
                          message.channel.send(
                            "**You cannot exceed gold limit"
                          );
                        } else {
                          db.add(
                            `money_${tokenDB}.pocket`,
                            Math.floor(finalCoins)
                          );
                          db.add(
                            `lootedGold_${tokenDB}`,
                            Math.floor(finalCoins)
                          ); // Use Math.floor() to remove decimals
                          // Use Math.floor() to remove decimals
                          const lootedGold =
                            db.fetch(`lootedGold_${tokenDB}`) || 0;
                          const apsData = [
                            {
                              amount: 100000,
                              aps: 100,
                              key: "acquiredAHeftySumOf100k",
                              title:
                                "ACHIEVEMENT COMPLETE - Acquired a hefty sum of 100k",
                            },
                            {
                              amount: 500000,
                              aps: 200,
                              key: "amassedAnImpressiveHaulOf500k",
                              title:
                                "ACHIEVEMENT COMPLETE - Amassed an impressive haul of 500k",
                            },
                            {
                              amount: 1000000,
                              aps: 500,
                              key: "reachedAmillionInRiches",
                              title:
                                "ACHIEVEMENT COMPLETE - Reached a million in riches",
                            },
                            {
                              amount: 10000000,
                              aps: 1000,
                              key: "glorious10mPlunder",
                              title:
                                "ACHIEVEMENT COMPLETE - Glorious 10-Million Plunder",
                            },
                            {
                              amount: 100000000,
                              aps: 1700,
                              key: "wealthConqueror",
                              title: "ACHIEVEMENT COMPLETE - Wealth Conqueror",
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
                                .setColor("#6A0DAD");
                              db.set(achievementKey, true);
                              db.add(
                                `achievementPoints_${tokenDB}`,
                                achievement.aps
                              );
                              message.channel.send(apsEmbed);
                            }
                          }
                          finalCoins = Math.floor(finalCoins)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          message.channel.send(
                            "```" +
                              `diff
+You acquired : ${finalCoins} Gold Coins
` +
                              "```"
                          );
                        }
                      }
                    }
                  } else {
                    const premiumUserEmbed = new Discord.MessageEmbed()
                      .setTitle("Premium Command")
                      .setDescription(
                        `This command is only for premium users. Upgrade to Mysterionix Pro for exclusive benefits!`
                      )
                      .setColor("#ffd700")
                      .setThumbnail(
                        "https://i.ibb.co/SwtWtK5/mysterionix-pro-final.gif"
                      );
                    message.channel.send(premiumUserEmbed);
                  }
                  // Handle hitting the boss here

                  // Update boss health and cooldown
                  const currentTime = Date.now();
                  db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                  // Send an updated boss message
                  const bossHealthBar = createHealthBar(
                    eldrazurTheAbyssalTyrantBossHealth,
                    136905102,
                    20
                  );
                  eldrazurTheAbyssalTyrantBossHealth =
                    eldrazurTheAbyssalTyrantBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const eldrazurTheAbyssalTyrantBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#6A0DAD")
                      .setAuthor("Eldra'zur , the abyssal tyrant")
                      .addField(
                        `${eldrazurTheAbyssalTyrantBossHealth} / 136,905,102`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif")
                      .setFooter(
                        "May your courage and strength guide you to victory!"
                      );
                  await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);

                  // Remove the user's reaction
                  reaction.users.remove(user);
                }
              });

              collector.on("end", () => {
                // Remove all reactions when the collector ends
                bossMessage.reactions.removeAll();
              });
            } else {
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var waterSkill = "<a:waterElement:1152278341181767821";
              var orbSkill = "<a:orbSkill:1153322063306686604>";
              const bossHealthBar = createHealthBar(
                eldrazurTheAbyssalTyrantBossHealth,
                136905102,
                20
              );
              const eldrazurTheAbyssalTyrantBossEmbed =
                new Discord.MessageEmbed()
                  .setColor("#6A0DAD") // Deep purple color
                  .setAuthor(`${eldrazurTheAbyssalTyrantBoss}`) // Add an image of Eldra'zur as the author
                  .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                  .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif") // You can use another image to show the boss
                  .setFooter(
                    "May your courage and strength guide you to victory!"
                  );
              db.set(`eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                eldrazurTheAbyssalTyrantBossEmbed
              );
              await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(waterSkill);
              if (
                Date.now - db.fetch(`orbReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(orbSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "waterElement", "orbSkill"].includes(
                    reaction.emoji.name
                  ) && user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "orbSkill") {
                  var mysterionixProActivated =
                    db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
                  if (mysterionixProActivated == true) {
                    const weaponDamage =
                      db.fetch(`weaponDamage_${tokenDB}`) || 0;
                    db.subtract(
                      `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                      weaponDamage / 1.54
                    );
                    reaction.remove(user).catch(console.error);
                    var eldrazurTheAbyssalTyrantBossHealth =
                      db.fetch(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                      ) || 136905102;
                    function addOrbSkillReaction() {
                      if (
                        !collector.ended &&
                        eldrazurTheAbyssalTyrantBossHealth > 0 &&
                        eldrazurTheAbyssalTyrantBossHealth !== 136905102
                      ) {
                        if (!reactedUsers.has(message.author.id)) {
                          reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                          const reactionInterval = 7500;
                          db.set(`orbReactionInterval_${tokenDB}`, 7500);
                          // Use setInterval to repeatedly call the function
                          const intervalId = setInterval(() => {
                            if (eldrazurTheAbyssalTyrantBossHealth <= 0) {
                              // If boss health is zero or below, clear the interval and exit
                              db.set(`orbReactionInterval_${tokenDB}`, 7500);
                              clearInterval(intervalId);
                              return;
                            } else {
                              var orbReactionInterval = db.fetch(
                                `orbReactionInterval_${tokenDB}`
                              );
                              var eldrazurTheAbyssalTyrantBossHealth =
                                db.fetch(
                                  `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                                ) || 136905102;
                              if (
                                eldrazurTheAbyssalTyrantBossHealth <
                                  136905102 &&
                                eldrazurTheAbyssalTyrantBossHealth > 0
                              ) {
                                db.set(`orbReactionInterval_${tokenDB}`, 0);
                              }
                              if (orbReactionInterval == 0) {
                                bossMessage
                                  .react(orbSkill)
                                  .catch(console.error);
                                db.set(`orbReactionInterval_${tokenDB}`, 7500);
                                return;
                              }
                              // db.set(`orbReactionInterval_${tokenDB}`, 0);
                            }
                          }, reactionInterval);
                        }
                      } else {
                        db.set(`orbReactionInterval_${tokenDB}`, "x");
                        return; // No need to continue if the boss health is zero or below
                      }
                    }

                    addOrbSkillReaction();
                    if (
                      eldrazurTheAbyssalTyrantBossHealth < 0 ||
                      eldrazurTheAbyssalTyrantBossHealth == 0
                    ) {
                      // Boss defeated
                      eldrazurTheAbyssalTyrantBossHealth = 0;

                      bossMessage.reactions.removeAll();
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      db.set(
                        `eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`,
                        false
                      );
                      eldrazurTheAbyssalTyrantBossHealth =
                        eldrazurTheAbyssalTyrantBossHealth
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                      const eldrazurTheAbyssalTyrantBossDeadEmbed =
                        new Discord.MessageEmbed()
                          .setColor("#42096b") // Gold color for celebration
                          .setTitle(`**Victory achieved**`)
                          .setDescription(
                            `${eldrazurTheAbyssalTyrantBoss} has been defeated!`
                          )
                          .addField("Defeated by", `${user}`, true)
                          .setImage("https://i.ibb.co/rHc7Xjj/IMG-0347.gif")
                          .setFooter(
                            "A legendary victory that will be told for ages!"
                          );
                      message.channel.send(
                        eldrazurTheAbyssalTyrantBossDeadEmbed
                      );
                      db.add(`bossesKilledTotal_${tokenDB}`, 1);
                      var chance = Math.floor(Math.random() * 125) + 1;
                      var moonsShineOfMetalSwordChance =
                        Math.floor(Math.random() * 500) + 1;
                      var weaponName = db.fetch(`wepName_${tokenDB}`);
                      if (weaponName == "daggerOfDeath") {
                        const daggerXP = Math.floor(Math.random() * 210) + 120;
                        if (daggerOfDeathLevel !== 10) {
                          db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);
                        }
                        // Retrieve the current XP and level of Dagger of Death
                        const currentXP =
                          db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                        var currentLevel =
                          db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

                        // Define the damage values for each level
                        const levelDamage = [
                          1200301, 2233406, 2740221, 3462059, 5109231, 6920132,
                          7306890, 8690530, 10049141,
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
                          { threshold: 16950, level: 10 },
                        ];

                        for (const levelData of xpLevels) {
                          if (currentXP >= levelData.threshold) {
                            currentLevel = levelData.level;
                          } else {
                            break;
                          }
                        }
                        for (
                          let i = daggerOfDeathLevel - 1;
                          i < xpLevels.length;
                          i++
                        ) {
                          const nextLevelXP = xpLevels[i].threshold;
                          if (
                            currentXP >= nextLevelXP &&
                            daggerOfDeathLevel !== 10
                          ) {
                            // Level up the weapon
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            db.set(
                              `daggerOfDeathDamage_${tokenDB}`,
                              levelDamage[i]
                            );

                            var daggerLevelupEmbed = new Discord.MessageEmbed()
                              .setTitle("Level up!")
                              .setDescription(
                                `Your weapon leveled up to level ${
                                  daggerOfDeathLevel + 1
                                }`
                              )
                              // .addField(`New damage`, `${levelDamage[i]}`)
                              .setColor(`#013220`);

                            message.channel.send(daggerLevelupEmbed);
                            db.set(
                              `daggerOfDeathLevel_${tokenDB}`,
                              daggerOfDeathLevel + 1
                            );
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            break; // Exit the loop after leveling up
                          }
                        }
                      }
                      if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                        const SingleBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                            .setDescription(`${user} You gained 500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`firstBlood_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 500);
                        message.channel.send(SingleBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 10
                      ) {
                        const TenBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                          )
                          .setDescription(`${user} You gained 300 aps`)
                          .setColor("#6A0DAD");
                        db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 300);
                        message.channel.send(TenBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 50
                      ) {
                        const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                          )
                          .setDescription(`${user} You gained 800 aps`)
                          .setColor("#6A0DAD");
                        db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 800);
                        message.channel.send(FiftyBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                      ) {
                        const HundredBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(
                              `ACHIEVEMENT COMPLETE - Century of Slaughter`
                            )
                            .setDescription(`${user} You gained 1500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`centuryOfSlaughter_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 1500);
                        message.channel.send(HundredBossKillApsEmbed);
                      }
                      db.set(`cooldown_${tokenDB}`, Date.now());
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      if (moonsShineOfMetalSwordChance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Moons shine of metal sword"
` +
                            "```"
                        );
                        db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                      }
                      if (chance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Mystic rune of resilience"
` +
                            "```"
                        );
                        db.add(`mysticRuneOfResilience_${tokenDB}`, 1);
                        if (mysticRuneOfResilience == 1) {
                          db.set(
                            `power_${tokenDB}`,
                            soldiers * 0.08 + bullet * 0.48 * 2
                          );
                        }
                      } else if (chance == 2) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Aurora gaze"
` +
                            "```"
                        );
                        db.add(`auroraGaze_${tokenDB}`, 1);
                      } else if (chance == 3) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Abyssal Crown of Dominance"
` +
                            "```"
                        );
                        db.add(`abyssalCrownOfDominance_${tokenDB}`, 1);
                      } else if (chance == 5) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Starcrystal
` +
                            "```"
                        );
                        db.add(`abyssalStarcrystal_${tokenDB}`, 1);
                      } else if (chance == 6) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Eldra'zur's Grimoire of Ruin
` +
                            "```"
                        );
                        db.add(`eldrazursGrimoireOfRuin_${tokenDB}`, 1);
                      } else if (chance == 4) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Scepter of Oblivion
` +
                            "```"
                        );
                        db.add(`abyssalScepterOfOblivion_${tokenDB}`, 1);
                      } else if (chance == 7) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Monarch slayer [title]
` +
                            "```"
                        );
                        db.add(`monarchSlayerTitle_${tokenDB}`, 1);
                      } else {
                        bal = db.fetch(`money_${tokenDB}.pocket`);
                        if (finalCoins + bal > moneyCap.moneyCap) {
                          message.channel.send(
                            "**You cannot exceed gold limit"
                          );
                        } else {
                          db.add(
                            `money_${tokenDB}.pocket`,
                            Math.floor(finalCoins)
                          );
                          db.add(
                            `lootedGold_${tokenDB}`,
                            Math.floor(finalCoins)
                          ); // Use Math.floor() to remove decimals
                          // Use Math.floor() to remove decimals
                          const lootedGold =
                            db.fetch(`lootedGold_${tokenDB}`) || 0;
                          const apsData = [
                            {
                              amount: 100000,
                              aps: 100,
                              key: "acquiredAHeftySumOf100k",
                              title:
                                "ACHIEVEMENT COMPLETE - Acquired a hefty sum of 100k",
                            },
                            {
                              amount: 500000,
                              aps: 200,
                              key: "amassedAnImpressiveHaulOf500k",
                              title:
                                "ACHIEVEMENT COMPLETE - Amassed an impressive haul of 500k",
                            },
                            {
                              amount: 1000000,
                              aps: 500,
                              key: "reachedAmillionInRiches",
                              title:
                                "ACHIEVEMENT COMPLETE - Reached a million in riches",
                            },
                            {
                              amount: 10000000,
                              aps: 1000,
                              key: "glorious10mPlunder",
                              title:
                                "ACHIEVEMENT COMPLETE - Glorious 10-Million Plunder",
                            },
                            {
                              amount: 100000000,
                              aps: 1700,
                              key: "wealthConqueror",
                              title: "ACHIEVEMENT COMPLETE - Wealth Conqueror",
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
                                .setColor("#6A0DAD");
                              db.set(achievementKey, true);
                              db.add(
                                `achievementPoints_${tokenDB}`,
                                achievement.aps
                              );
                              message.channel.send(apsEmbed);
                            }
                          }
                          finalCoins = Math.floor(finalCoins)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          message.channel.send(
                            "```" +
                              `diff
+You acquired : ${finalCoins} Gold Coins
` +
                              "```"
                          );
                        }
                      }
                    }

                    // Update boss health and cooldown
                    const currentTime = Date.now();
                    db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                    const bossHealthBar = createHealthBar(
                      eldrazurTheAbyssalTyrantBossHealth,
                      136905102,
                      20
                    );
                    eldrazurTheAbyssalTyrantBossHealth =
                      eldrazurTheAbyssalTyrantBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eldrazurTheAbyssalTyrantBossEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#6A0DAD")
                        .setAuthor("Eldra'zur , the abyssal tyrant")
                        .addField(
                          `${eldrazurTheAbyssalTyrantBossHealth} / 136,905,102`,
                          `${bossHealthBar}`,
                          true
                        )
                        .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif")
                        .setFooter(
                          "May your courage and strength guide you to victory!"
                        );
                    await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);
                  }
                }
                if (reaction.emoji.name == "hit") {
                  var mysterionixProActivated =
                    db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
                  if (mysterionixProActivated == true) {
                    // Handle hitting the boss here
                    const currentTime = Date.now();
                    const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                    // const bossHealthBar = createHealthBar(
                    //   eldrazurTheAbyssalTyrantBossHealth,
                    //   136905102,
                    //   20
                    // );
                    // It's not on cooldown, proceed to deal damage
                    const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                    db.subtract(
                      `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                      weaponDamage / 4
                    );
                    var eldrazurTheAbyssalTyrantBossHealth =
                      db.fetch(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`
                      ) || 136905102;

                    if (
                      eldrazurTheAbyssalTyrantBossHealth < 0 ||
                      eldrazurTheAbyssalTyrantBossHealth == 0
                    ) {
                      // Boss defeated
                      eldrazurTheAbyssalTyrantBossHealth = 0;

                      bossMessage.reactions.removeAll();
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      db.set(
                        `eldrazurTheAbyssalTyrantBossSpawned_${tokenDB}`,
                        false
                      );
                      eldrazurTheAbyssalTyrantBossHealth =
                        eldrazurTheAbyssalTyrantBossHealth
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                      const eldrazurTheAbyssalTyrantBossDeadEmbed =
                        new Discord.MessageEmbed()
                          .setColor("#42096b") // Gold color for celebration
                          .setTitle(`**Victory achieved**`)
                          .setDescription(
                            `${eldrazurTheAbyssalTyrantBoss} has been defeated!`
                          )
                          .addField("Defeated by", `${user}`, true)
                          .setImage("https://i.ibb.co/rHc7Xjj/IMG-0347.gif")
                          .setFooter(
                            "A legendary victory that will be told for ages!"
                          );
                      message.channel.send(
                        eldrazurTheAbyssalTyrantBossDeadEmbed
                      );
                      db.add(`bossesKilledTotal_${tokenDB}`, 1);
                      var chance = Math.floor(Math.random() * 125) + 1;
                      var moonsShineOfMetalSwordChance =
                        Math.floor(Math.random() * 800) + 1;
                      var weaponName = db.fetch(`wepName_${tokenDB}`);
                      if (weaponName == "daggerOfDeath") {
                        const daggerXP = Math.floor(Math.random() * 210) + 120;
                        if (daggerOfDeathLevel !== 10) {
                          db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);
                        }
                        // Retrieve the current XP and level of Dagger of Death
                        const currentXP =
                          db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                        var currentLevel =
                          db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

                        // Define the damage values for each level
                        const levelDamage = [
                          1200301, 2233406, 2740221, 3462059, 5109231, 6920132,
                          7306890, 8690530, 10049141,
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
                          { threshold: 16950, level: 10 },
                        ];

                        for (const levelData of xpLevels) {
                          if (currentXP >= levelData.threshold) {
                            currentLevel = levelData.level;
                          } else {
                            break;
                          }
                        }
                        for (
                          let i = daggerOfDeathLevel - 1;
                          i < xpLevels.length;
                          i++
                        ) {
                          const nextLevelXP = xpLevels[i].threshold;
                          if (
                            currentXP >= nextLevelXP &&
                            daggerOfDeathLevel !== 10
                          ) {
                            // Level up the weapon
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            db.set(
                              `daggerOfDeathDamage_${tokenDB}`,
                              levelDamage[i]
                            );

                            var daggerLevelupEmbed = new Discord.MessageEmbed()
                              .setTitle("Level up!")
                              .setDescription(
                                `Your weapon leveled up to level ${
                                  daggerOfDeathLevel + 1
                                }`
                              )
                              // .addField(`New damage`, `${levelDamage[i]}`)
                              .setColor(`#013220`);

                            message.channel.send(daggerLevelupEmbed);
                            db.set(
                              `daggerOfDeathLevel_${tokenDB}`,
                              daggerOfDeathLevel + 1
                            );
                            db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                            break; // Exit the loop after leveling up
                          }
                        }
                      }
                      if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 1) {
                        const SingleBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                            .setDescription(`${user} You gained 500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`firstBlood_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 500);
                        message.channel.send(SingleBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 10
                      ) {
                        const TenBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                          )
                          .setDescription(`${user} You gained 300 aps`)
                          .setColor("#6A0DAD");
                        db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 300);
                        message.channel.send(TenBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 50
                      ) {
                        const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                          .setTitle(
                            `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                          )
                          .setDescription(`${user} You gained 800 aps`)
                          .setColor("#6A0DAD");
                        db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 800);
                        message.channel.send(FiftyBossKillApsEmbed);
                      } else if (
                        db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                      ) {
                        const HundredBossKillApsEmbed =
                          new Discord.MessageEmbed()
                            .setTitle(
                              `ACHIEVEMENT COMPLETE - Century of Slaughter`
                            )
                            .setDescription(`${user} You gained 1500 aps`)
                            .setColor("#6A0DAD");
                        db.set(`centuryOfSlaughter_${tokenDB}`, true);
                        db.add(`achievementPoints_${tokenDB}`, 1500);
                        message.channel.send(HundredBossKillApsEmbed);
                      }
                      db.set(`cooldown_${tokenDB}`, Date.now());
                      db.set(
                        `eldrazurTheAbyssalTyrantBossHealth_${tokenDB}`,
                        136905102
                      );
                      if (moonsShineOfMetalSwordChance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Moons shine of metal sword"
` +
                            "```"
                        );
                        db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                      }
                      if (chance == 1) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Mystic rune of resilience"
` +
                            "```"
                        );
                        db.add(`mysticRuneOfResilience_${tokenDB}`, 1);
                        if (mysticRuneOfResilience == 1) {
                          db.set(
                            `power_${tokenDB}`,
                            soldiers * 0.08 + bullet * 0.48 * 2
                          );
                        }
                      } else if (chance == 2) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Aurora gaze"
` +
                            "```"
                        );
                        db.add(`auroraGaze_${tokenDB}`, 1);
                      } else if (chance == 3) {
                        message.channel.send(
                          "```" +
                            `json
"You acquired : Abyssal Crown of Dominance"
` +
                            "```"
                        );
                        db.add(`abyssalCrownOfDominance_${tokenDB}`, 1);
                      } else if (chance == 5) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Starcrystal
` +
                            "```"
                        );
                        db.add(`abyssalStarcrystal_${tokenDB}`, 1);
                      } else if (chance == 6) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Eldra'zur's Grimoire of Ruin
` +
                            "```"
                        );
                        db.add(`eldrazursGrimoireOfRuin_${tokenDB}`, 1);
                      } else if (chance == 4) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Abyssal Scepter of Oblivion
` +
                            "```"
                        );
                        db.add(`abyssalScepterOfOblivion_${tokenDB}`, 1);
                      } else if (chance == 7) {
                        message.channel.send(
                          "```" +
                            `diff
-You acquired : Monarch slayer [title]
` +
                            "```"
                        );
                        db.add(`monarchSlayerTitle_${tokenDB}`, 1);
                      } else {
                        bal = db.fetch(`money_${tokenDB}.pocket`);
                        if (finalCoins + bal > moneyCap.moneyCap) {
                          message.channel.send(
                            "**You cannot exceed gold limit"
                          );
                        } else {
                          db.add(
                            `money_${tokenDB}.pocket`,
                            Math.floor(finalCoins)
                          );
                          db.add(
                            `lootedGold_${tokenDB}`,
                            Math.floor(finalCoins)
                          ); // Use Math.floor() to remove decimals
                          // Use Math.floor() to remove decimals
                          const lootedGold =
                            db.fetch(`lootedGold_${tokenDB}`) || 0;
                          const apsData = [
                            {
                              amount: 100000,
                              aps: 100,
                              key: "acquiredAHeftySumOf100k",
                              title:
                                "ACHIEVEMENT COMPLETE - Acquired a hefty sum of 100k",
                            },
                            {
                              amount: 500000,
                              aps: 200,
                              key: "amassedAnImpressiveHaulOf500k",
                              title:
                                "ACHIEVEMENT COMPLETE - Amassed an impressive haul of 500k",
                            },
                            {
                              amount: 1000000,
                              aps: 500,
                              key: "reachedAmillionInRiches",
                              title:
                                "ACHIEVEMENT COMPLETE - Reached a million in riches",
                            },
                            {
                              amount: 10000000,
                              aps: 1000,
                              key: "glorious10mPlunder",
                              title:
                                "ACHIEVEMENT COMPLETE - Glorious 10-Million Plunder",
                            },
                            {
                              amount: 100000000,
                              aps: 1700,
                              key: "wealthConqueror",
                              title: "ACHIEVEMENT COMPLETE - Wealth Conqueror",
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
                                .setColor("#6A0DAD");
                              db.set(achievementKey, true);
                              db.add(
                                `achievementPoints_${tokenDB}`,
                                achievement.aps
                              );
                              message.channel.send(apsEmbed);
                            }
                          }
                          finalCoins = Math.floor(finalCoins)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          message.channel.send(
                            "```" +
                              `diff
+You acquired : ${finalCoins} Gold Coins
` +
                              "```"
                          );
                        }
                      }
                    }

                    // Update boss health and cooldown
                    db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                    // Send an updated boss message
                    const bossHealthBar = createHealthBar(
                      eldrazurTheAbyssalTyrantBossHealth,
                      136905102,
                      20
                    );
                    eldrazurTheAbyssalTyrantBossHealth =
                      eldrazurTheAbyssalTyrantBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eldrazurTheAbyssalTyrantBossEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#6A0DAD")
                        .setAuthor("Eldra'zur , the abyssal tyrant")
                        .addField(
                          `${eldrazurTheAbyssalTyrantBossHealth} / 136,905,102`,
                          `${bossHealthBar}`,
                          true
                        )
                        .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif")
                        .setFooter(
                          "May your courage and strength guide you to victory!"
                        );
                    await bossMessage.edit(eldrazurTheAbyssalTyrantBossEmbed);

                    // Remove the user's reaction
                    reaction.users.remove(user);
                  }
                }
              });

              collector.on("end", () => {
                bossMessage.reactions.removeAll();
              });
            }
          }
        }
      }
    }
  },
};
