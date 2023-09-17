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
  name: "damage",
  aliases: ["damage"],
  description: "To kill the most powerful boss",
  usage: "damage",
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
      const key = db.fetch(`key_${tokenDB}`) || 0;
      if (key > 0) {
        if (args[0] !== "hit") {
          return message.channel.send("Invalid command. Use: `+damage hit`");
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
          const soldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
          const bullet = db.fetch(`bullet_${tokenDB}`) || 0;
          const mysticRuneOfResilience =
            db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0;
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
            var daggerOfDeathLevel =
              db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
            if (daggerOfDeathLevel > 1) {
              var daggerOfDeathDamage = db.fetch(
                `daggerOfDeathDamage_${tokenDB}`
              );
              weaponDamage = daggerOfDeathDamage;
              weaponEquipped = true;
            } else {
              weaponDamage = daggerOfDeathh.Damage;
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
              // Modify the boss hitting logic

              function resetBossHealth() {
                db.set(`eldrazurTheTyrantBossHealth_${tokenDB}`, 17809082);
                db.set(`didntHitCooldown_${tokenDB}`, Date.now());

                // Notify that the boss ran away
                message.channel.send({
                  embed: {
                    color: 0xff0000,
                    title: "The boss flied away!",
                    footer: "Be quick to hit next time",
                  },
                });
              }

              var eldraZurTheAbyssalTyrantBossHealth = db.fetch(
                `eldrazurTheTyrantBossHealth_${tokenDB}`
              );
              if (eldraZurTheAbyssalTyrantBossHealth > 0) {
                const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                if (
                  lastHitTime &&
                  Date.now() - lastHitTime >= 120000 &&
                  eldraZurTheAbyssalTyrantBossHealth < 17809080
                ) {
                  resetBossHealth();
                }
              }
              function createHealthBar(health, maxHealth, barLength = 20) {
                // Ensure health and maxHealth are non-negative
                health = Math.max(0, health);
                maxHealth = Math.max(0, maxHealth);

                const percentage = Math.min(100, (health / maxHealth) * 100);
                const progressBlocks = Math.floor(
                  (barLength * percentage) / 100
                );
                const remainingBlocks = barLength - progressBlocks;

                const progressBar =
                  "█".repeat(progressBlocks) + "░".repeat(remainingBlocks);

                const formattedHealth = `${health.toLocaleString()} / ${maxHealth.toLocaleString()}`;

                return `${progressBar}`;
              }

              var eldraZurTheAbyssalTyrantBossHealth = db.fetch(
                `eldrazurTheTyrantBossHealth_${tokenDB}`
              );
              const bossHealthBar = createHealthBar(
                eldraZurTheAbyssalTyrantBossHealth,
                17809082,
                20 // This should match the fixed boss health value
              );
              var currentBossHealth = db.fetch(
                `eldrazurTheTyrantBossHealth_${tokenDB}`
              );
              currentBossHealth = currentBossHealth
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if (currentBossHealth > "0") {
                var bossHealthProgress = `${currentBossHealth} / 17,809,082`;
              } else {
                var bossHealthProgress = `0 / 17,809,082`;
              }
              if (
                eldraZurTheAbyssalTyrantBossHealth == null ||
                eldraZurTheAbyssalTyrantBossHealth == undefined
              ) {
                var eldraZurTheAbyssalTyrantBossHealth = 17809082;
                db.set(`eldrazurTheTyrantBossHealth_${tokenDB}`, 17809082);
              }
              var eldraZurTheAbyssalTyrantBoss =
                "Eldra'zur, the Abyssal Tyrant";
              var randomGoldCoins =
                Math.floor(Math.random() * 3109821) + 2000000;
              var goldLoot = db.fetch(`goldLoot_${tokenDB}`);
              if (goldLoot == undefined || goldLoot == null) {
                goldLoot = 0;
              }
              if (goldLoot == 0) {
                var finalCoins = randomGoldCoins;
              } else {
                var finalCoins = randomGoldCoins * goldLoot + 1;
              }
              if (eldraZurTheAbyssalTyrantBossHealth < 0) {
                const eldraZurTheAbyssalTyrantBossEmbed2 =
                  new Discord.MessageEmbed()
                    .setColor("#6A0DAD") // Deep purple color
                    .setAuthor(`${eldraZurTheAbyssalTyrantBoss}`) // Add an image of Eldra'zur as the author
                    .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                    .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif") // You can use another image to show the boss
                    .setFooter(
                      "May your courage and strength guide you to victory!"
                    );
                message.channel.send(eldraZurTheAbyssalTyrantBossEmbed2);
              } else {
                db.subtract(
                  `eldrazurTheTyrantBossHealth_${tokenDB}`,
                  weaponDamage
                );
                db.set(`didntHitCooldown_${tokenDB}`, Date.now());
                weaponDamage = weaponDamage
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                eldraZurTheAbyssalTyrantBossHealth =
                  eldraZurTheAbyssalTyrantBossHealth
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const eldraZurTheAbyssalTyrantBossEmbed =
                  new Discord.MessageEmbed()
                    .setColor("#6A0DAD") // Deep purple color
                    .setAuthor(`${eldraZurTheAbyssalTyrantBoss}`) // Add an image of Eldra'zur as the author
                    .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                    .setImage("https://i.ibb.co/2vLMfcn/IMG-0345.gif") // You can use another image to show the boss
                    .setFooter(
                      "May your courage and strength guide you to victory!"
                    );
                message.channel.send(eldraZurTheAbyssalTyrantBossEmbed);
                db.set(`cooldown_${tokenDB}`, Date.now());
              }

              if (
                eldraZurTheAbyssalTyrantBossHealth == 0 ||
                eldraZurTheAbyssalTyrantBossHealth < 0
              ) {
                eldraZurTheAbyssalTyrantBossHealth == 0;
                db.subtract(`key_${tokenDB}`, 1);
                const eldraZurTheAbyssalTyrantBossDeadEmbed =
                  new Discord.MessageEmbed()
                    .setColor("#42096b") // Gold color for celebration
                    .setTitle(`**Victory Achieved!**`)
                    .setDescription(
                      `*${eldraZurTheAbyssalTyrantBoss}, has been vanquished!*`
                    )
                    .addField("Defeated by", `${user}`, true)
                    .setImage("https://i.ibb.co/rHc7Xjj/IMG-0347.gif")
                    .setFooter(
                      "A legendary victory that will be told for ages!"
                    );

                message.channel.send(eldraZurTheAbyssalTyrantBossDeadEmbed);
                db.add(`bossesKilledTotal_${tokenDB}`, 1);
                var chance = Math.floor(Math.random() * 35) + 1;
                console.log(chance);
                var weaponName = db.fetch(`wepName_${tokenDB}`);
                if (weaponName == "daggerOfDeath") {
                  const daggerXP = Math.floor(Math.random() * 210) + 15;
                  db.add(`daggerOfDeathXP_${tokenDB}`, daggerXP);

                  // Retrieve the current XP and level of Dagger of Death
                  const currentXP = db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
                  var currentLevel =
                    db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;

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
                  for (
                    let i = daggerOfDeathLevel - 1;
                    i < xpLevels.length;
                    i++
                  ) {
                    const nextLevelXP = xpLevels[i].threshold;
                    if (currentXP >= nextLevelXP && daggerOfDeathLevel !== 9) {
                      // Level up the weapon
                      db.set(`daggerOfDeathXP_${tokenDB}`, 0);
                      db.set(`daggerOfDeathDamage_${tokenDB}`, levelDamage[i]);

                      var daggerLevelupEmbed = new Discord.MessageEmbed()
                        .setTitle("Level up!")
                        .setDescription(
                          `Your weapon leveled up to level ${
                            daggerOfDeathLevel + 1
                          }`
                        )
                        .addField(`New damage`, `${levelDamage[i]}`)
                        .setColor(`#013220`);

                      message.channel.send(daggerLevelupEmbed);
                      db.set(
                        `daggerOfDeathLevel_${tokenDB}`,
                        daggerOfDeathLevel + 1
                      );
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
                    .setTitle(`ACHIEVEMENT COMPLETE - Decade of Annihilation`)
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
                } else if (db.fetch(`bossesKilledTotal_${tokenDB}`) == 100) {
                  const HundredBossKillApsEmbed = new Discord.MessageEmbed()
                    .setTitle(`ACHIEVEMENT COMPLETE - Century of Slaughter`)
                    .setDescription(`${user} You gained 1500 aps`)
                    .setColor("#00FF00");
                  db.set(`centuryOfSlaughter_${tokenDB}`, true);
                  db.add(`achievementPoints_${tokenDB}`, 1500);
                  message.channel.send(HundredBossKillApsEmbed);
                }
                db.set(`cooldown_${tokenDB}`, Date.now());
                db.set(`eldrazurTheTyrantBossHealth_${tokenDB}`, 17809082);
                if (chance == 1) {
                  message.channel.send(
                    "```" +
                      `json
"You received : Mystic rune of resilience"
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
"You received : Aurora gaze"
` +
                      "```"
                  );
                  db.add(`auroraGaze_${tokenDB}`, 1);
                } else if (chance == 3) {
                  message.channel.send(
                    "```" +
                      `json
"You received : Abyssal Crown of Dominance"
` +
                      "```"
                  );
                  db.add(`abyssalCrownOfDominance_${tokenDB}`, 1);
                } else if (chance == 5) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Abyssal Starcrystal
` +
                      "```"
                  );
                  db.add(`abyssalStarcrystal_${tokenDB}`, 1);
                } else if (chance == 6) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Eldra'zur's Grimoire of Ruin
` +
                      "```"
                  );
                  db.add(`eldrazursGrimoireOfRuin_${tokenDB}`, 1);
                } else if (chance == 4) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Abyssal Scepter of Oblivion
` +
                      "```"
                  );
                  db.add(`abyssalScepterOfOblivion_${tokenDB}`, 1);
                } else if (chance == 7) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Monarch slayer [title]
` +
                      "```"
                  );
                  db.add(`monarchSlayerTitle_${tokenDB}`, 1);
                } else {
                  bal = db.fetch(`money_${tokenDB}.pocket`);
                  if (finalCoins + bal > moneyCap.moneyCap) {
                    message.channel.send(
                      "**You cannot exceed gold limit , you've been given a key**"
                    );
                    db.add(`key_${tokenDB}`, 1);
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
                        db.add(`achievementPoints_${tokenDB}`, achievement.aps);
                        message.channel.send(apsEmbed);
                      }
                    }
                    finalCoins = Math.floor(finalCoins)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    message.channel.send(
                      "```" +
                        `diff
+You received : ${finalCoins} Gold Coins
` +
                        "```"
                    );
                  }
                }
              }
            }
          }
        }
      } else {
        const keyEmbed = new Discord.MessageEmbed()
          .setColor("#3498db")
          .setTitle("🔑 Access Required 🔑")
          .setDescription("You'll need a key to enter this exclusive zone.");

        message.channel.send(keyEmbed);
      }
    }
  },
};
