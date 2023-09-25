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
  name: "farm",
  aliases: ["farm"],
  description: "To farm items / ruix / gold",
  usage: "farm",
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
        return message.channel.send("Invalid command. Use: `farm hit.x`");
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
              db.set(`vorgraxTheCinderspineBossHealth_${tokenDB}`, 46210921);
              db.set(`didntHitCooldown_${tokenDB}`, Date.now());

              // Notify that the boss ran away
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: "The boss ran away!",
                  footer: "Be quick to hit next time",
                },
              });
              db.set(`vorgraxTheCinderspineBossSpawned_${tokenDB}`, false);
            }

            var vorgraxTheCinderspineBossHealth =
              db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
              46210921;
            function createHealthBar(health, maxHealth, barLength = 18) {
              // Ensure health and maxHealth are non-negative
              health = Math.max(0, health);
              maxHealth = Math.max(0, maxHealth);

              const percentage = Math.min(100, (health / maxHealth) * 100);
              const progressBlocks = Math.floor((barLength * percentage) / 100);
              const remainingBlocks = barLength - progressBlocks;

              const filledEmoji = "<:darkPinkHealthBar:1155521854174416957>";
              const emptyEmoji = "<:lightPinkRedBar:1155521869223571466>";
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
            var vorgraxTheCinderspineBossHealth =
              db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
              46210921;
            const bossHealthBar = createHealthBar(
              vorgraxTheCinderspineBossHealth,
              46210921,
              18
            );

            var currentBossHealth =
              db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
              46210921;

            if (currentBossHealth > "0") {
              currentBossHealth = currentBossHealth
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              var bossHealthProgress = `${currentBossHealth} / 46,210,921`;
            } else {
              var bossHealthProgress = `0 / 46,210,921`;
            }
            if (
              vorgraxTheCinderspineBossHealth == null ||
              vorgraxTheCinderspineBossHealth == undefined
            ) {
              db.set(`vorgraxTheCinderspineBossHealth_${tokenDB}`, 46210921);
            }

            var vorgraxTheCinderspineBoss = "Vorgrax the Cinderspine";
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
            var randomGoldCoins = Math.floor(Math.random() * 42150) + 28109;
            var randomRuix = Math.floor(Math.random() * 42) + 1;
            var highRuixRandom = Math.floor(Math.random() * 120) + 1;

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
              `vorgraxTheCinderspineBossSpawned_${tokenDB}`
            );
            var lastHitTime = db.fetch(`lastHitTime_${tokenDB}`);
            if (Date.now - lastHitTime >= 180000) {
              resetBossHealth();
            }
            if (bossSpawned == true) {
              const bossHealthBar = createHealthBar(
                vorgraxTheCinderspineBossHealth,
                46210921,
                18
              );
              const vorgraxTheCinderspineBossEmbed = new Discord.MessageEmbed()
                .setColor("#953553") // Deep purple color
                .setAuthor(`${vorgraxTheCinderspineBoss}`) // Add an image of Eldra'zur as the author
                .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                .setImage("https://i.ibb.co/869gdz2/gif-monster.gif") // You can use another image to show the boss
                .setFooter(
                  "Forge ahead with your unyielding resolve and indomitable spirit!"
                );
              db.set(`vorgraxTheCinderspineBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                vorgraxTheCinderspineBossEmbed
              );
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var driltex = "<a:driltex:1155827244816662558";
              await bossMessage.edit(vorgraxTheCinderspineBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(driltex);
              if (
                Date.now - db.fetch(`driltexReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(driltex);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "driltex"].includes(reaction.emoji.name) &&
                  user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "driltex") {
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                    weaponDamage / 0.54
                  );
                  reaction.remove(user).catch(console.error);
                  var vorgraxTheCinderspineBossHealth =
                    db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
                    46210921;
                  function addDriltexReaction() {
                    if (
                      !collector.ended &&
                      vorgraxTheCinderspineBossHealth > 0 &&
                      vorgraxTheCinderspineBossHealth !== 46210921
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`driltexReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (vorgraxTheCinderspineBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`driltexReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var driltexReactionInterval = db.fetch(
                              `driltexReactionInterval_${tokenDB}`
                            );
                            var vorgraxTheCinderspineBossHealth =
                              db.fetch(
                                `vorgraxTheCinderspineBossHealth_${tokenDB}`
                              ) || 46210921;
                            if (
                              vorgraxTheCinderspineBossHealth < 46210921 &&
                              vorgraxTheCinderspineBossHealth > 0
                            ) {
                              db.set(`driltexReactionInterval_${tokenDB}`, 0);
                            }
                            if (driltexReactionInterval == 0) {
                              bossMessage.react(driltex).catch(console.error);
                              db.set(
                                `driltexReactionInterval_${tokenDB}`,
                                7500
                              );
                              return;
                            }
                            // db.set(`driltexReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`driltexReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addDriltexReaction();
                  if (
                    vorgraxTheCinderspineBossHealth < 0 ||
                    vorgraxTheCinderspineBossHealth == 0
                  ) {
                    // Boss defeated
                    vorgraxTheCinderspineBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    db.set(
                      `vorgraxTheCinderspineBossSpawned_${tokenDB}`,
                      false
                    );
                    vorgraxTheCinderspineBossHealth =
                      vorgraxTheCinderspineBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const vorgraxTheCinderspineBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#712940") // Gold color for celebration
                        .setTitle(`**Vorgrax the Cinderspine Killed!**`)
                        .setDescription(
                          `${vorgraxTheCinderspineBoss}'s fiery reign has met its final ember!`
                        )
                        .addField("Killed by", `${user}`, true)
                        .setImage("https://i.ibb.co/CbQfdXk/blood-drops.gif")
                        .setFooter(
                          "A collective breath of relief washes over the land."
                        );

                    message.channel.send(vorgraxTheCinderspineBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 175) + 1;
                    console.log(chance);
                    var moonsShineOfMetalSwordChance =
                      Math.floor(Math.random() * 1000) + 1;
                    console.log(moonsShineOfMetalSwordChance);
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#00FF00");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#00FF00");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#00FF00");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#00FF00");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    if (moonsShineOfMetalSwordChance == 1) {
                      message.channel.send(
                        "```" +
                          `json
"${user.username} acquired : Moons shine of metal sword"
` +
                          "```"
                      );
                      db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                    }
                    if (chance > 0 && (chance < 8 || chance == 8)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${highRuixRandom} ruix 
` +
                          "```"
                      );
                    }
                    if (chance > 15 && (chance < 30 || chance == 30)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${randomRuix} ruix 
` +
                          "```"
                      );
                      db.add(`ruix_${tokenDB}`, randomRuix);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
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
                              .setColor("#00FF00");
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
${user.username} acquired : ${finalCoins} Gold Coins
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
                    vorgraxTheCinderspineBossHealth,
                    46210921,
                    18
                  );
                  vorgraxTheCinderspineBossHealth =
                    vorgraxTheCinderspineBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const vorgraxTheCinderspineBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#953553")
                      .setAuthor("Vorgrax the Cinderspine")
                      .addField(
                        `${vorgraxTheCinderspineBossHealth} / 46,210,921`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage("https://i.ibb.co/869gdz2/gif-monster.gif")
                      .setFooter(
                        "Forge ahead with your unyielding resolve and indomitable spirit!"
                      );
                  await bossMessage.edit(vorgraxTheCinderspineBossEmbed);
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   vorgraxTheCinderspineBossHealth,
                  //   46210921,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                  db.subtract(
                    `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                    weaponDamage / 1.56
                  );
                  var vorgraxTheCinderspineBossHealth =
                    db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
                    46210921;

                  if (
                    vorgraxTheCinderspineBossHealth < 0 ||
                    vorgraxTheCinderspineBossHealth == 0
                  ) {
                    // Boss defeated
                    vorgraxTheCinderspineBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    db.set(
                      `vorgraxTheCinderspineBossSpawned_${tokenDB}`,
                      false
                    );
                    vorgraxTheCinderspineBossHealth =
                      vorgraxTheCinderspineBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const vorgraxTheCinderspineBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#712940") // Gold color for celebration
                        .setTitle(`**Vorgrax the Cinderspine Killed!**`)
                        .setDescription(
                          `${vorgraxTheCinderspineBoss}'s fiery reign has met its final ember!`
                        )
                        .addField("Killed by", `${user}`, true)
                        .setImage("https://i.ibb.co/CbQfdXk/blood-drops.gif")
                        .setFooter(
                          "A collective breath of relief washes over the land."
                        );

                    message.channel.send(vorgraxTheCinderspineBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 175) + 1;
                    console.log(chance);
                    var moonsShineOfMetalSwordChance =
                      Math.floor(Math.random() * 1000) + 1;
                    console.log(moonsShineOfMetalSwordChance);
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#00FF00");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#00FF00");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#00FF00");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#00FF00");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    if (moonsShineOfMetalSwordChance == 1) {
                      message.channel.send(
                        "```" +
                          `json
"${user.username} acquired : Moons shine of metal sword"
` +
                          "```"
                      );
                      db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                    }
                    if (chance > 0 && (chance < 8 || chance == 8)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${highRuixRandom} ruix 
` +
                          "```"
                      );
                    }
                    if (chance > 15 && (chance < 30 || chance == 30)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${randomRuix} ruix 
` +
                          "```"
                      );
                      db.add(`ruix_${tokenDB}`, randomRuix);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
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
                              .setColor("#00FF00");
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
${user.username} acquired : ${finalCoins} Gold Coins
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
                    vorgraxTheCinderspineBossHealth,
                    46210921,
                    18
                  );
                  vorgraxTheCinderspineBossHealth =
                    vorgraxTheCinderspineBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const vorgraxTheCinderspineBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#953553")
                      .setAuthor("Vorgrax the Cinderspine")
                      .addField(
                        `${vorgraxTheCinderspineBossHealth} / 46,210,921`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage("https://i.ibb.co/869gdz2/gif-monster.gif")
                      .setFooter(
                        "Forge ahead with your unyielding resolve and indomitable spirit!"
                      );
                  await bossMessage.edit(vorgraxTheCinderspineBossEmbed);

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
              var driltex = "<a:driltex:1155827244816662558";
              const bossHealthBar = createHealthBar(
                vorgraxTheCinderspineBossHealth,
                46210921,
                18
              );
              const vorgraxTheCinderspineBossEmbed = new Discord.MessageEmbed()
                .setColor("#953553") // Deep purple color
                .setAuthor(`${vorgraxTheCinderspineBoss}`) // Add an image of Eldra'zur as the author
                .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                .setImage("https://i.ibb.co/869gdz2/gif-monster.gif") // You can use another image to show the boss
                .setFooter(
                  "Forge ahead with your unyielding resolve and indomitable spirit!"
                );
              db.set(`vorgraxTheCinderspineBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                vorgraxTheCinderspineBossEmbed
              );
              await bossMessage.edit(vorgraxTheCinderspineBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(driltex);
              if (
                Date.now - db.fetch(`driltexReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(driltex);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                return (
                  ["hit", "driltex"].includes(reaction.emoji.name) &&
                  user.id === message.author.id
                );
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "driltex") {
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                    weaponDamage / 0.54
                  );
                  reaction.remove(user).catch(console.error);
                  var vorgraxTheCinderspineBossHealth =
                    db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
                    46210921;
                  function addDriltexReaction() {
                    if (
                      !collector.ended &&
                      vorgraxTheCinderspineBossHealth > 0 &&
                      vorgraxTheCinderspineBossHealth !== 46210921
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`driltexReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (vorgraxTheCinderspineBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`driltexReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var driltexReactionInterval = db.fetch(
                              `driltexReactionInterval_${tokenDB}`
                            );
                            var vorgraxTheCinderspineBossHealth =
                              db.fetch(
                                `vorgraxTheCinderspineBossHealth_${tokenDB}`
                              ) || 46210921;
                            if (
                              vorgraxTheCinderspineBossHealth < 46210921 &&
                              vorgraxTheCinderspineBossHealth > 0
                            ) {
                              db.set(`driltexReactionInterval_${tokenDB}`, 0);
                            }
                            if (driltexReactionInterval == 0) {
                              bossMessage.react(driltex).catch(console.error);
                              db.set(
                                `driltexReactionInterval_${tokenDB}`,
                                7500
                              );
                              return;
                            }
                            // db.set(`driltexReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`driltexReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addDriltexReaction();
                  if (
                    vorgraxTheCinderspineBossHealth < 0 ||
                    vorgraxTheCinderspineBossHealth == 0
                  ) {
                    // Boss defeated
                    vorgraxTheCinderspineBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    db.set(
                      `vorgraxTheCinderspineBossSpawned_${tokenDB}`,
                      false
                    );
                    vorgraxTheCinderspineBossHealth =
                      vorgraxTheCinderspineBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const vorgraxTheCinderspineBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#712940") // Gold color for celebration
                        .setTitle(`**Vorgrax the Cinderspine Killed!**`)
                        .setDescription(
                          `${vorgraxTheCinderspineBoss}'s fiery reign has met its final ember!`
                        )
                        .addField("Killed by", `${user}`, true)
                        .setImage("https://i.ibb.co/CbQfdXk/blood-drops.gif")
                        .setFooter(
                          "A collective breath of relief washes over the land."
                        );

                    message.channel.send(vorgraxTheCinderspineBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 175) + 1;
                    console.log(chance);
                    var moonsShineOfMetalSwordChance =
                      Math.floor(Math.random() * 1000) + 1;
                    console.log(moonsShineOfMetalSwordChance);
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#00FF00");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#00FF00");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#00FF00");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#00FF00");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    if (moonsShineOfMetalSwordChance == 1) {
                      message.channel.send(
                        "```" +
                          `json
"${user.username} acquired : Moons shine of metal sword"
` +
                          "```"
                      );
                      db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                    }
                    if (chance > 0 && (chance < 8 || chance == 8)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${highRuixRandom} ruix 
` +
                          "```"
                      );
                    }
                    if (chance > 15 && (chance < 30 || chance == 30)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${randomRuix} ruix 
` +
                          "```"
                      );
                      db.add(`ruix_${tokenDB}`, randomRuix);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
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
                              .setColor("#00FF00");
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
${user.username} acquired : ${finalCoins} Gold Coins
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
                    vorgraxTheCinderspineBossHealth,
                    46210921,
                    18
                  );
                  vorgraxTheCinderspineBossHealth =
                    vorgraxTheCinderspineBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const vorgraxTheCinderspineBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#953553")
                      .setAuthor("Vorgrax the Cinderspine")
                      .addField(
                        `${vorgraxTheCinderspineBossHealth} / 46,210,921`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage("https://i.ibb.co/869gdz2/gif-monster.gif")
                      .setFooter(
                        "Forge ahead with your unyielding resolve and indomitable spirit!"
                      );
                  await bossMessage.edit(vorgraxTheCinderspineBossEmbed);
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   vorgraxTheCinderspineBossHealth,
                  //   46210921,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                  db.subtract(
                    `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                    weaponDamage / 1.56
                  );
                  var vorgraxTheCinderspineBossHealth =
                    db.fetch(`vorgraxTheCinderspineBossHealth_${tokenDB}`) ||
                    46210921;

                  if (
                    vorgraxTheCinderspineBossHealth < 0 ||
                    vorgraxTheCinderspineBossHealth == 0
                  ) {
                    // Boss defeated
                    vorgraxTheCinderspineBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    db.set(
                      `vorgraxTheCinderspineBossSpawned_${tokenDB}`,
                      false
                    );
                    vorgraxTheCinderspineBossHealth =
                      vorgraxTheCinderspineBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const vorgraxTheCinderspineBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#712940") // Gold color for celebration
                        .setTitle(`**Vorgrax the Cinderspine Killed!**`)
                        .setDescription(
                          `${vorgraxTheCinderspineBoss}'s fiery reign has met its final ember!`
                        )
                        .addField("Killed by", `${user}`, true)
                        .setImage("https://i.ibb.co/CbQfdXk/blood-drops.gif")
                        .setFooter(
                          "A collective breath of relief washes over the land."
                        );

                    message.channel.send(vorgraxTheCinderspineBossDeadEmbed);
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 175) + 1;
                    console.log(chance);
                    var moonsShineOfMetalSwordChance =
                      Math.floor(Math.random() * 1000) + 1;
                    console.log(moonsShineOfMetalSwordChance);
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
                      const SingleBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - First Blood`)
                        .setDescription(`${user} You gained 500 aps`)
                        .setColor("#00FF00");
                      db.set(`firstBlood_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 500);
                      message.channel.send(SingleBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 10) {
                      const TenBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Decade of Annihilation`
                        )
                        .setDescription(`${user} You gained 300 aps`)
                        .setColor("#00FF00");
                      db.set(`decadeOfAnnihilation_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 300);
                      message.channel.send(TenBossKillApsEmbed);
                    } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 50) {
                      const FiftyBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(
                          `ACHIEVEMENT COMPLETE - Half-century of Destruction`
                        )
                        .setDescription(`${user} You gained 800 aps`)
                        .setColor("#00FF00");
                      db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 800);
                      message.channel.send(FiftyBossKillApsEmbed);
                    } else if (
                      db.fetch(`bossesKilledTotal_${tokenDB}`) == 100
                    ) {
                      const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                        .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                        .setDescription(`${user} You gained 1500 aps`)
                        .setColor("#00FF00");
                      db.set(`centuryOfSlaughter_${tokenDB}`, true);
                      db.add(`achievementPoints_${tokenDB}`, 1500);
                      message.channel.send(HundredBossKillApsEmbed);
                    }
                    db.set(`cooldown_${tokenDB}`, Date.now());
                    db.set(
                      `vorgraxTheCinderspineBossHealth_${tokenDB}`,
                      46210921
                    );
                    if (moonsShineOfMetalSwordChance == 1) {
                      message.channel.send(
                        "```" +
                          `json
"${user.username} acquired : Moons shine of metal sword"
` +
                          "```"
                      );
                      db.add(`moonsShineOfMetalSword_${tokenDB}`, 1);
                    }
                    if (chance > 0 && (chance < 8 || chance == 8)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${highRuixRandom} ruix 
` +
                          "```"
                      );
                    }
                    if (chance > 15 && (chance < 30 || chance == 30)) {
                      message.channel.send(
                        "```" +
                          `diff
+${user.username} acquired : ${randomRuix} ruix 
` +
                          "```"
                      );
                      db.add(`ruix_${tokenDB}`, randomRuix);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
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
                              .setColor("#00FF00");
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
${user.username} acquired : ${finalCoins} Gold Coins
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
                    vorgraxTheCinderspineBossHealth,
                    46210921,
                    18
                  );
                  vorgraxTheCinderspineBossHealth =
                    vorgraxTheCinderspineBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const vorgraxTheCinderspineBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#953553")
                      .setAuthor("Vorgrax the Cinderspine")
                      .addField(
                        `${vorgraxTheCinderspineBossHealth} / 46,210,921`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage("https://i.ibb.co/869gdz2/gif-monster.gif")
                      .setFooter(
                        "Forge ahead with your unyielding resolve and indomitable spirit!"
                      );
                  await bossMessage.edit(vorgraxTheCinderspineBossEmbed);

                  // Remove the user's reaction
                  reaction.users.remove(user);
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
