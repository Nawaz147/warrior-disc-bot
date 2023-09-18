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
const moneyCap = require("../../config.json");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "newPlay",
  aliases: ["np"],
  description: "To play Rise of the infernoth event",
  usage: "play",
  category: "Economy",
  run: async (client, message, args) => {
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      if (args[0] !== "hit") {
        return message.channel.send("Invalid command. Use: `play hit.v`");
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
        if (natureDaggersEquipped == "True") {
          var weaponDamage = natureDaggerss.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          var weaponEquipped = true;
        } else if (ventorianBowEquipped == "True") {
          var weaponDamage = ventorianBoww.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
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
        }
        if (weaponEquipped !== true) {
          const weaponEmbed = new Discord.MessageEmbed()
            .setColor("#00A86B") // A lively green color
            .setTitle("🗡️ Gear Up for Battle 🗡️") // A title that invokes readiness
            .setDescription(
              "Prepare to confront the mighty boss by arming yourself with a weapon. If you lack one, type '+gw' to claim a complimentary weapon."
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
              db.set(`infernothTheEmberwingBossHealth_${tokenDB}`, 1019084);
              db.set(`didntHitCooldown_${tokenDB}`, Date.now());

              // Notify that the boss ran away
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: "The boss ran away!",
                  footer: "Be quick to hit next time",
                },
              });
              db.set(`infernothTheEmberwingBossSpawned_${tokenDB}`, false);
            }

            var infernothTheEmberwingBossHealth =
              db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) || 1019084;

            function createHealthBar(health, maxHealth, barLength = 20) {
              // Ensure health and maxHealth are non-negative
              health = Math.max(0, health);
              maxHealth = Math.max(0, maxHealth);

              const percentage = Math.min(100, (health / maxHealth) * 100);
              const progressBlocks = Math.floor((barLength * percentage) / 100);
              const remainingBlocks = barLength - progressBlocks;

              const progressBar =
                "<:darkRedBar:1152996193199202418>".repeat(progressBlocks) +
                "<:lightRedBar:1152996156067028994>".repeat(remainingBlocks);
              return `${progressBar}`;
            }
            var infernothTheEmberwingBossHealth =
              db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) || 1019084;
            const bossHealthBar = createHealthBar(
              infernothTheEmberwingBossHealth,
              1019084,
              20
            );

            var currentBossHealth =
              db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) || 1019084;

            if (currentBossHealth > "0") {
              currentBossHealth = currentBossHealth
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              var bossHealthProgress = `${currentBossHealth} / 1,019,084`;
            } else {
              var bossHealthProgress = `0 / 1,019,084`;
            }
            if (
              infernothTheEmberwingBossHealth == null ||
              infernothTheEmberwingBossHealth == undefined
            ) {
              db.set(`infernothTheEmberwingBossHealth_${tokenDB}`, 1019084);
            }

            var infernothTheEmberwingBoss = "Infernoth, the Emberwing";
            var randomGoldCoins = Math.floor(Math.random() * 38408) + 21092;
            scrapItems = [
              "Rusty gears",
              "Dustbin",
              "Newspaper",
              "Torn cloth",
              "Used tissue",
              "Broken stick",
              "Awakening gem",
            ];
            var shuffledItems = scrapItems
              .slice()
              .sort(() => Math.random() - 0.5);
            var randomScrap = shuffledItems[0];
            var goldLoot = db.fetch(`goldLoot_${tokenDB}`);
            if (goldLoot == undefined || goldLoot == null) {
              goldLoot = 0;
            }
            if (goldLoot == 0) {
              var finalCoins = randomGoldCoins;
            } else {
              var finalCoins = randomGoldCoins * goldLoot + 1;
            }
            const bossSpawned = db.fetch(
              `infernothTheEmberwingBossSpawned_${tokenDB}`
            );
            var lastHitTime = db.fetch(`lastHitTime_${tokenDB}`);
            if (Date.now - lastHitTime >= 180000) {
              resetBossHealth();
            }
            if (bossSpawned == true) {
              const bossHealthBar = createHealthBar(
                infernothTheEmberwingBossHealth,
                1019084,
                20
              );
              const infernothTheEmberwingBossEmbed = new Discord.MessageEmbed()
                .setColor("#8B0000") // Deep purple color
                .setAuthor(`${infernothTheEmberwingBoss}`) // Add an image of Eldra'zur as the author
                .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                .setImage(
                  "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                ) // You can use another image to show the boss
                .setFooter(
                  "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                );
              db.set(`infernothTheEmberwingBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                infernothTheEmberwingBossEmbed
              );
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var waterSkill = "<a:waterElement:1152278341181767821";
              await bossMessage.edit(infernothTheEmberwingBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(waterSkill);
              if (
                Date.now - db.fetch(`waterReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(waterSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "waterElement", "waterElement"].includes(
                    reaction.emoji.name
                  ) && user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 120000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "waterElement") {
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `infernothTheEmberwingBossHealth_${tokenDB}`,
                    weaponDamage / 1.54
                  );
                  reaction.remove(user).catch(console.error);
                  var infernothTheEmberwingBossHealth =
                    db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) ||
                    1019084;
                  function addWaterSkillReaction() {
                    if (
                      !collector.ended &&
                      infernothTheEmberwingBossHealth > 0 &&
                      infernothTheEmberwingBossHealth !== 1019084
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`waterReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (infernothTheEmberwingBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`waterReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var waterReactionInterval = db.fetch(
                              `waterReactionInterval_${tokenDB}`
                            );
                            var infernothTheEmberwingBossHealth =
                              db.fetch(
                                `infernothTheEmberwingBossHealth_${tokenDB}`
                              ) || 1019084;
                            if (
                              infernothTheEmberwingBossHealth < 1019084 &&
                              infernothTheEmberwingBossHealth > 0
                            ) {
                              db.set(`waterReactionInterval_${tokenDB}`, 0);
                            }
                            if (waterReactionInterval == 0) {
                              bossMessage
                                .react(waterSkill)
                                .catch(console.error);
                              db.set(`waterReactionInterval_${tokenDB}`, 7500);
                              return;
                            }
                            // db.set(`waterReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`waterReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addWaterSkillReaction();
                  if (infernothTheEmberwingBossHealth <= 0) {
                    // Boss defeated
                    infernothTheEmberwingBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    db.set(
                      `infernothTheEmberwingBossSpawned_${tokenDB}`,
                      false
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#FF4500") // Fiery orange-red color
                        .setTitle(`**Infernoth, the Emberwing Defeated!**`)
                        .setDescription(
                          `The fiery reign of ${infernothTheEmberwingBoss} has come to an end!`
                        )
                        .addField("Slayed by", `${user}`, true)
                        .setImage("https://i.ibb.co/Xp8bXrx/fire-bg.gif")
                        .setFooter(
                          "The land of Eldoria can breathe a sigh of relief."
                        );

                    message.channel.send(infernothTheEmberwingBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
                    var weaponName = db.fetch(`wepName_${tokenDB}`);
                    if (weaponName == "daggerOfDeath") {
                      const daggerXP = Math.floor(Math.random() * 15) + 7;
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
                        200301, 233406, 340221, 462059, 609231, 920132, 1306890,
                        1690530, 2049141,
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#8B0000");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#8B0000");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#8B0000");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#8B0000");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-You received : Eldritch flame scroll
` +
                          "```"
                      );
                      db.add(`eldritchFlameScroll_${tokenDB}`, 1);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Inernoth's wrathful eye
` +
                          "```"
                      );
                      db.add(`infernothsWrathfulEye_${tokenDB}`, 1);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic gem
` +
                          "```"
                      );
                      db.add(`pyroclasmicGem_${tokenDB}`, 1);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic essence
` +
                          "```"
                      );
                      db.add(`pyroclasmicEssence_${tokenDB}`, 1);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Magmatic torch
` +
                          "```"
                      );
                      db.add(`magmaticTorch_${tokenDB}`, 1);
                    } else if (chance == 6) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Eternal flame essence
` +
                          "```"
                      );
                      db.add(`eternalFlameEssence_${tokenDB}`, 1);
                    } else if (chance == 7) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Inernoth's ember essence
` +
                          "```"
                      );
                      db.add(`infernothsEmberEssence_${tokenDB}`, 1);
                    } else if (chance == 8) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Draconic fireheart essence
` +
                          "```"
                      );
                      db.add(`draconicFireheartEssence_${tokenDB}`, 1);
                    } else if (chance == 9) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Infernoth's death warrant
` +
                          "```"
                      );
                      db.add(`infernothsDeathWarrant_${tokenDB}`, 1);
                    } else if (chance == 10) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Black oil
` +
                          "```"
                      );
                      db.add(`blackOil_${tokenDB}`, 1);
                    } else if (chance == 11) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Transparent glass"
` +
                          "```"
                      );
                      db.add(`transparentGlass_${tokenDB}`, 1);
                    } else if (chance == 12) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Hot water"
` +
                          "```"
                      );
                      db.add(`hotWater_${tokenDB}`, 1);
                    } else if (chance > 13 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                      );
                      db.add(`power.${tokenDB}`, 0.08);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[You received : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
You received : Awakening gem
` +
                          "```"
                      );
                    } else if (chance >= 50 && chance < 130) {
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
                    } else {
                      bal = db.fetch(`money_${tokenDB}.pocket`);
                      if (finalCoins + bal > moneyCap.moneyCap) {
                        message.channel.send("**You cannot exceed gold limit");
                      } else {
                        db.add(
                          `money_${tokenDB}.pocket`,
                          Math.floor(finalCoins)
                        );
                        db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
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
                              .setColor("#8B0000");
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
You received : ${finalCoins} Gold Coins
` +
                            "```"
                        );
                      }
                    }

                    // Update boss health and cooldown
                    const currentTime = Date.now();
                    db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                    const bossHealthBar = createHealthBar(
                      infernothTheEmberwingBossHealth,
                      1019084,
                      20
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#8B0000")
                        .setAuthor("Infernoth, the Emberwing")
                        .addField(
                          `${infernothTheEmberwingBossHealth} / 1,019,084`,
                          `${bossHealthBar}`,
                          true
                        )
                        .setImage(
                          "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                        )
                        .setFooter(
                          "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                        );
                    await bossMessage.edit(infernothTheEmberwingBossEmbed);
                  }
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   infernothTheEmberwingBossHealth,
                  //   1019084,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  var infernothTheEmberwingBossHealth =
                    db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) ||
                    1019084;
                  db.subtract(
                    `infernothTheEmberwingBossHealth_${tokenDB}`,
                    weaponDamage / 4
                  );

                  if (
                    infernothTheEmberwingBossHealth < 0 ||
                    infernothTheEmberwingBossHealth == 0
                  ) {
                    // Boss defeated
                    infernothTheEmberwingBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    db.set(
                      `infernothTheEmberwingBossSpawned_${tokenDB}`,
                      false
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#FF4500") // Fiery orange-red color
                        .setTitle(`**Infernoth, the Emberwing Defeated!**`)
                        .setDescription(
                          `The fiery reign of ${infernothTheEmberwingBoss} has come to an end!`
                        )
                        .addField("Slayed by", `${user}`, true)
                        .setImage("https://i.ibb.co/Xp8bXrx/fire-bg.gif")
                        .setFooter(
                          "The land of Eldoria can breathe a sigh of relief."
                        );
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );

                    message.channel.send(infernothTheEmberwingBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
                    var weaponName = db.fetch(`wepName_${tokenDB}`);
                    if (weaponName == "daggerOfDeath") {
                      const daggerXP = Math.floor(Math.random() * 15) + 7;
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
                        200301, 233406, 340221, 462059, 609231, 920132, 1306890,
                        1690530, 2049141,
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#8B0000");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#8B0000");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#8B0000");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#8B0000");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-You received : Eldritch flamescroll
` +
                          "```"
                      );
                      db.add(`eldritchFlameScroll_${tokenDB}`, 1);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Inernoth's wrathful eye
` +
                          "```"
                      );
                      db.add(`infernothsWrathfulEye_${tokenDB}`, 1);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
  You received : Pyroclasmic gem
  ` +
                          "```"
                      );
                      db.add(`pyroclasmicGem_${tokenDB}`, 1);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
  You received : Pyroclasmic essence
  ` +
                          "```"
                      );
                      db.add(`pyroclasmicEssence_${tokenDB}`, 1);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
  You received : Magmatic torch
  ` +
                          "```"
                      );
                      db.add(`magmaticTorch_${tokenDB}`, 1);
                    } else if (chance == 6) {
                      message.channel.send(
                        "```" +
                          `tex
  $-You received : Eternal flame essence
  ` +
                          "```"
                      );
                      db.add(`eternalFlameEssence_${tokenDB}`, 1);
                    } else if (chance == 7) {
                      message.channel.send(
                        "```" +
                          `tex
  $-You received : Inernoth's ember essence
  ` +
                          "```"
                      );
                      db.add(`infernothsEmberEssence_${tokenDB}`, 1);
                    } else if (chance == 8) {
                      message.channel.send(
                        "```" +
                          `tex
  $-You received : Draconic fireheart essence
  ` +
                          "```"
                      );
                      db.add(`draconicFireheartEssence_${tokenDB}`, 1);
                    } else if (chance == 9) {
                      message.channel.send(
                        "```" +
                          `elm
  You received : Infernoth's death warrant
  ` +
                          "```"
                      );
                      db.add(`infernothsDeathWarrant_${tokenDB}`, 1);
                    } else if (chance == 10) {
                      message.channel.send(
                        "```" +
                          `elm
  You received : Black oil
  ` +
                          "```"
                      );
                      db.add(`blackOil_${tokenDB}`, 1);
                    } else if (chance == 11) {
                      message.channel.send(
                        "```" +
                          `css
  "You received : Transparent glass"
  ` +
                          "```"
                      );
                      db.add(`transparentGlass_${tokenDB}`, 1);
                    } else if (chance == 12) {
                      message.channel.send(
                        "```" +
                          `css
  "You received : Hot water"
  ` +
                          "```"
                      );
                      db.add(`hotWater_${tokenDB}`, 1);
                    } else if (chance > 7 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                      );
                      db.add(`power.${tokenDB}`, 0.08);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
  [You received : Elite awakening gem]
  ` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
  You received : Awakening gem
  ` +
                          "```"
                      );
                    } else if (chance >= 50 && chance < 130) {
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
                    } else {
                      bal = db.fetch(`money_${tokenDB}.pocket`);
                      if (finalCoins + bal > moneyCap.moneyCap) {
                        message.channel.send("**You cannot exceed gold limit");
                      } else {
                        db.add(
                          `money_${tokenDB}.pocket`,
                          Math.floor(finalCoins)
                        );
                        db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
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
                              .setColor("#8B0000");
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
You received : ${finalCoins} Gold Coins
` +
                            "```"
                        );
                      }
                    }
                  }
                }

                const currentTime = Date.now();
                db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                // Send an updated boss message
                const bossHealthBar = createHealthBar(
                  infernothTheEmberwingBossHealth,
                  1019084,
                  20
                );
                infernothTheEmberwingBossHealth =
                  infernothTheEmberwingBossHealth
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const infernothTheEmberwingBossEmbed =
                  new Discord.MessageEmbed()
                    .setColor("#8B0000")
                    .setAuthor("Infernoth, the Emberwing")
                    .addField(
                      `${infernothTheEmberwingBossHealth} / 1,019,084`,
                      `${bossHealthBar}`,
                      true
                    )
                    .setImage(
                      "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                    )
                    .setFooter(
                      "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                    );
                await bossMessage.edit(infernothTheEmberwingBossEmbed);

                // Remove the user's reaction
                reaction.users.remove(user);
              });

              collector.on("end", () => {
                // Remove all reactions when the collector ends
                bossMessage.reactions.removeAll();
              });
            } else {
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var waterSkill = "<a:waterElement:1152278341181767821";
              const bossHealthBar = createHealthBar(
                infernothTheEmberwingBossHealth,
                1019084,
                20
              );
              const infernothTheEmberwingBossEmbed = new Discord.MessageEmbed()
                .setColor("#8B0000") // Deep purple color
                .setAuthor(`${infernothTheEmberwingBoss}`) // Add an image of Eldra'zur as the author
                .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                .setImage(
                  "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                ) // You can use another image to show the boss
                .setFooter(
                  "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                );
              db.set(`infernothTheEmberwingBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                infernothTheEmberwingBossEmbed
              );
              await bossMessage.edit(infernothTheEmberwingBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(waterSkill);
              if (
                Date.now - db.fetch(`waterReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(waterSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "waterElement", "waterElement"].includes(
                    reaction.emoji.name
                  ) && user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 120000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "waterElement") {
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `infernothTheEmberwingBossHealth_${tokenDB}`,
                    weaponDamage / 1.54
                  );
                  reaction.remove(user).catch(console.error);
                  var infernothTheEmberwingBossHealth =
                    db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) ||
                    1019084;
                  function addWaterSkillReaction() {
                    if (
                      !collector.ended &&
                      infernothTheEmberwingBossHealth > 0 &&
                      infernothTheEmberwingBossHealth !== 1019084
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`waterReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (infernothTheEmberwingBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`waterReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var waterReactionInterval = db.fetch(
                              `waterReactionInterval_${tokenDB}`
                            );
                            var infernothTheEmberwingBossHealth =
                              db.fetch(
                                `infernothTheEmberwingBossHealth_${tokenDB}`
                              ) || 1019084;
                            if (
                              infernothTheEmberwingBossHealth < 1019084 &&
                              infernothTheEmberwingBossHealth > 0
                            ) {
                              db.set(`waterReactionInterval_${tokenDB}`, 0);
                            }
                            if (waterReactionInterval == 0) {
                              bossMessage
                                .react(waterSkill)
                                .catch(console.error);
                              db.set(`waterReactionInterval_${tokenDB}`, 7500);
                              return;
                            }
                            // db.set(`waterReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`waterReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addWaterSkillReaction();
                  if (infernothTheEmberwingBossHealth <= 0) {
                    // Boss defeated
                    infernothTheEmberwingBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    db.set(
                      `infernothTheEmberwingBossSpawned_${tokenDB}`,
                      false
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#FF4500") // Fiery orange-red color
                        .setTitle(`**Infernoth, the Emberwing Defeated!**`)
                        .setDescription(
                          `The fiery reign of ${infernothTheEmberwingBoss} has come to an end!`
                        )
                        .addField("Slayed by", `${user}`, true)
                        .setImage("https://i.ibb.co/Xp8bXrx/fire-bg.gif")
                        .setFooter(
                          "The land of Eldoria can breathe a sigh of relief."
                        );

                    message.channel.send(infernothTheEmberwingBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
                    var weaponName = db.fetch(`wepName_${tokenDB}`);
                    if (weaponName == "daggerOfDeath") {
                      const daggerXP = Math.floor(Math.random() * 15) + 7;
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
                        200301, 233406, 340221, 462059, 609231, 920132, 1306890,
                        1690530, 2049141,
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#8B0000");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#8B0000");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#8B0000");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#8B0000");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-You received : Eldritch flame scroll
` +
                          "```"
                      );
                      db.add(`eldritchFlameScroll_${tokenDB}`, 1);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Inernoth's wrathful eye
` +
                          "```"
                      );
                      db.add(`infernothsWrathfulEye_${tokenDB}`, 1);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic gem
` +
                          "```"
                      );
                      db.add(`pyroclasmicGem_${tokenDB}`, 1);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic essence
` +
                          "```"
                      );
                      db.add(`pyroclasmicEssence_${tokenDB}`, 1);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Magmatic torch
` +
                          "```"
                      );
                      db.add(`magmaticTorch_${tokenDB}`, 1);
                    } else if (chance == 6) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Eternal flame essence
` +
                          "```"
                      );
                      db.add(`eternalFlameEssence_${tokenDB}`, 1);
                    } else if (chance == 7) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Inernoth's ember essence
` +
                          "```"
                      );
                      db.add(`infernothsEmberEssence_${tokenDB}`, 1);
                    } else if (chance == 8) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Draconic fireheart essence
` +
                          "```"
                      );
                      db.add(`draconicFireheartEssence_${tokenDB}`, 1);
                    } else if (chance == 9) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Infernoth's death warrant
` +
                          "```"
                      );
                      db.add(`infernothsDeathWarrant_${tokenDB}`, 1);
                    } else if (chance == 10) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Black oil
` +
                          "```"
                      );
                      db.add(`blackOil_${tokenDB}`, 1);
                    } else if (chance == 11) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Transparent glass"
` +
                          "```"
                      );
                      db.add(`transparentGlass_${tokenDB}`, 1);
                    } else if (chance == 12) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Hot water"
` +
                          "```"
                      );
                      db.add(`hotWater_${tokenDB}`, 1);
                    } else if (chance > 7 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                      );
                      db.add(`power.${tokenDB}`, 0.08);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[You received : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
You received : Awakening gem
` +
                          "```"
                      );
                    } else if (chance >= 50 && chance < 130) {
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
                      } else {
                        bal = db.fetch(`money_${tokenDB}.pocket`);
                        if (finalCoins + bal > moneyCap.moneyCap) {
                          message.channel.send(
                            "**You cannot exceed gold limit"
                          );
                        } else {
                          var finalCoins = randomGoldCoins * goldLoot + 1;

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
                                .setColor("#8B0000");
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
You received : ${finalCoins} Gold Coins
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
                      infernothTheEmberwingBossHealth,
                      1019084,
                      20
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#8B0000")
                        .setAuthor("Infernoth, the Emberwing")
                        .addField(
                          `${infernothTheEmberwingBossHealth} / 1,019,084`,
                          `${bossHealthBar}`,
                          true
                        )
                        .setImage(
                          "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                        )
                        .setFooter(
                          "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                        );
                    await bossMessage.edit(infernothTheEmberwingBossEmbed);
                  }
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   infernothTheEmberwingBossHealth,
                  //   1019084,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  var infernothTheEmberwingBossHealth =
                    db.fetch(`infernothTheEmberwingBossHealth_${tokenDB}`) ||
                    1019084;
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `infernothTheEmberwingBossHealth_${tokenDB}`,
                    weaponDamage / 4
                  );
                  if (infernothTheEmberwingBossHealth <= 0) {
                    // Boss defeated
                    infernothTheEmberwingBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    db.set(
                      `infernothTheEmberwingBossSpawned_${tokenDB}`,
                      false
                    );
                    infernothTheEmberwingBossHealth =
                      infernothTheEmberwingBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const infernothTheEmberwingBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#FF4500") // Fiery orange-red color
                        .setTitle(`**Infernoth, the Emberwing Defeated!**`)
                        .setDescription(
                          `The fiery reign of ${infernothTheEmberwingBoss} has come to an end!`
                        )
                        .addField("Slayed by", `${user}`, true)
                        .setImage("https://i.ibb.co/Xp8bXrx/fire-bg.gif")
                        .setFooter(
                          "The land of Eldoria can breathe a sigh of relief."
                        );

                    message.channel.send(infernothTheEmberwingBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
                    var weaponName = db.fetch(`wepName_${tokenDB}`);
                    if (weaponName == "daggerOfDeath") {
                      const daggerXP = Math.floor(Math.random() * 15) + 7;
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
                        200301, 233406, 340221, 462059, 609231, 920132, 1306890,
                        1690530, 2049141,
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#8B0000");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#8B0000");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#8B0000");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#8B0000");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `infernothTheEmberwingBossHealth_${tokenDB}`,
                      1019084
                    );
                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-You received : Eldritch flame scroll
` +
                          "```"
                      );
                      db.add(`eldritchFlameScroll_${tokenDB}`, 1);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Inernoth's wrathful eye
` +
                          "```"
                      );
                      db.add(`infernothsWrathfulEye_${tokenDB}`, 1);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic gem
` +
                          "```"
                      );
                      db.add(`pyroclasmicGem_${tokenDB}`, 1);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Pyroclasmic essence
` +
                          "```"
                      );
                      db.add(`pyroclasmicEssence_${tokenDB}`, 1);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
You received : Magmatic torch
` +
                          "```"
                      );
                      db.add(`magmaticTorch_${tokenDB}`, 1);
                    } else if (chance == 6) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Eternal flame essence
` +
                          "```"
                      );
                      db.add(`eternalFlameEssence_${tokenDB}`, 1);
                    } else if (chance == 7) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Inernoth's ember essence
` +
                          "```"
                      );
                      db.add(`infernothsEmberEssence_${tokenDB}`, 1);
                    } else if (chance == 8) {
                      message.channel.send(
                        "```" +
                          `tex
$-You received : Draconic fireheart essence
` +
                          "```"
                      );
                      db.add(`draconicFireheartEssence_${tokenDB}`, 1);
                    } else if (chance == 9) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Infernoth's death warrant
` +
                          "```"
                      );
                      db.add(`infernothsDeathWarrant_${tokenDB}`, 1);
                    } else if (chance == 10) {
                      message.channel.send(
                        "```" +
                          `elm
You received : Black oil
` +
                          "```"
                      );
                      db.add(`blackOil_${tokenDB}`, 1);
                    } else if (chance == 11) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Transparent glass"
` +
                          "```"
                      );
                      db.add(`transparentGlass_${tokenDB}`, 1);
                    } else if (chance == 12) {
                      message.channel.send(
                        "```" +
                          `css
"You received : Hot water"
` +
                          "```"
                      );
                      db.add(`hotWater_${tokenDB}`, 1);
                    } else if (chance > 7 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                      );
                      db.add(`power.${tokenDB}`, 0.08);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[You received : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
You received : Awakening gem
` +
                          "```"
                      );
                    } else if (chance >= 50 && chance < 130) {
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
                    } else {
                      bal = db.fetch(`money_${tokenDB}.pocket`);
                      if (finalCoins + bal > moneyCap.moneyCap) {
                        message.channel.send(
                          "**You cannot exceed gold limit**"
                        );
                      } else {
                        var finalCoins = randomGoldCoins * goldLoot + 1;

                        db.add(
                          `money_${tokenDB}.pocket`,
                          Math.floor(finalCoins)
                        );
                        db.add(`lootedGold_${tokenDB}`, Math.floor(finalCoins)); // Use Math.floor() to remove decimals
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
                              .setColor("#8B0000");
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
You received : ${finalCoins} Gold Coins
` +
                            "```"
                        );
                      }
                    }
                  }
                }

                // Update boss health and cooldown
                const currentTime = Date.now();
                db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                // Send an updated boss message
                const bossHealthBar = createHealthBar(
                  infernothTheEmberwingBossHealth,
                  1019084,
                  20
                );
                infernothTheEmberwingBossHealth =
                  infernothTheEmberwingBossHealth
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const infernothTheEmberwingBossEmbed =
                  new Discord.MessageEmbed()
                    .setColor("#8B0000")
                    .setAuthor("Infernoth, the Emberwing")
                    .addField(
                      `${infernothTheEmberwingBossHealth} / 1,019,084`,
                      `${bossHealthBar}`,
                      true
                    )
                    .setImage(
                      "https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif"
                    )
                    .setFooter(
                      "May your unshakable resolve and boundless fortitude blaze a trail to triumphant heights!"
                    );
                await bossMessage.edit(infernothTheEmberwingBossEmbed);
                // Remove the user's reaction
                reaction.users.remove(user);
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
