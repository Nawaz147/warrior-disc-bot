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
  name: "play",
  aliases: ["Play"],
  description: "To play the event",
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
        return message.channel.send(
          "Invalid command. To play the event, use: `+play hit`"
        );
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
          message.channel.send(
            "**You need to equip a weapon to play this event** , if you dont have one then **type +gw** to get your free weapon"
          );
        } else if (weaponEquipped == true) {
          timeout = 1000;
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
                message.channel.send(
                  `
${user}  You've been banned from Valorium bot for - Botting
Date : ${fullDate}
`
                );
                db.set(`antiBot_${tokenDB}`, 0);
                const bannedEmbed = new Discord.MessageEmbed()
                  .setTitle("ACCOUNT BANNED !!")
                  .setDescription(
                    `
You have been auto banned From Valorium bot |
Reason : Botting |
Banned by : <@934850905273159710> |
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

              // ... (remaining existing code)

              // ... (remaining existing code)
            } else {
              var ValoriumBossHealth = db.fetch(
                `ValoriumBossHealth_${tokenDB}`
              );
              if (
                ValoriumBossHealth == null ||
                ValoriumBossHealth == undefined
              ) {
                var ValoriumBossHealth = 1280986;
                db.set(`ValoriumBossHealth_${tokenDB}`, 1280986);
              }
              var ValoriumBoss = "Valorium Boss";
              let randomPoints = Math.floor(Math.random() * 34) + 1;
              let randomPlatinum = Math.floor(Math.random() * 25) + 1;
              var randomGoldCoins = Math.floor(Math.random() * 12432) + 12508;
              var goldLoot = db.fetch(`goldLoot_${tokenDB}`);
              if (goldLoot == undefined || goldLoot == null) {
                goldLoot = 0;
              }
              if (goldLoot == 0) {
                var finalCoins = randomGoldCoins;
              } else {
                var finalCoins = randomGoldCoins * goldLoot + 1;
              }
              if (ValoriumBossHealth < 0) {
                const ValoriumBossEmbed2 = new Discord.MessageEmbed()
                  .setTitle(`${ValoriumBoss}`)
                  .setDescription(`${user} you hit ${ValoriumBoss}`)
                  .addField(`Valorium boss`, `1280986`)
                  .addField(`Valorium Boss current health`, `0`)
                  .addField(`Your damage`, `${weaponDamage}`)
                  .setColor("#B59410");
                message.channel.send(ValoriumBossEmbed2);
                db.add(`antiBot_${tokenDB}`, 1);
              } else {
                db.subtract(`ValoriumBossHealth_${tokenDB}`, weaponDamage);
                const ValoriumBossEmbed = new Discord.MessageEmbed()
                  .setTitle(`${ValoriumBoss}`)
                  .setDescription(`${user} you hit ${ValoriumBoss}`)
                  .addField(`Valorium boss`, `1280986`)
                  .addField(
                    `Valorium Boss current health`,
                    `${ValoriumBossHealth}`
                  )
                  .addField(`Your damage`, `${weaponDamage}`)
                  .setColor("#B59410");
                message.channel.send(ValoriumBossEmbed);
                db.set(`cooldown_${tokenDB}`, Date.now());
              }

              if (ValoriumBossHealth == 0 || ValoriumBossHealth < 0) {
                const ValoriumBossDead = new Discord.MessageEmbed()
                  .setTitle(`${ValoriumBoss}`)
                  .setDescription(`${user} you killed ${ValoriumBoss}`)
                  .setColor("#B88419");
                message.channel.send(ValoriumBossDead);
                db.add(`bossesKilledTotal_${tokenDB}`, 1);
                var chance = Math.floor(Math.random() * 225);
                console.log(chance);
                var weaponName = db.fetch(`wepName_${tokenDB}`);
                if (weaponName == "daggerOfDeath") {
                  const daggerXP = Math.floor(Math.random() * 6) + 15;
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
                db.set(`ValoriumBossHealth_${tokenDB}`, 1280986);
                if (chance == 4) {
                  message.channel.send(
                    "```" +
                      `yaml
You received : Golden Ghost knight set
` +
                      "```"
                  );
                  db.add(`goldenGhostKnightSet_${tokenDB}`, 1);
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else if (chance == 1) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Valorium's Eclipsian Soul
` +
                      "```"
                  );
                  db.add(`valoriumsEclipsianSoul_${tokenDB}`, 1);
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else if (chance == 6) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Valorium's Tear
` +
                      "```"
                  );
                  db.add(`valoriumsTear_${tokenDB}`, 1);
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else if (chance > 7 && (chance < 30 || chance == 30)) {
                  db.add(`soldiers_${tokenDB}`, 1);
                  message.channel.send(
                    "```" + `diff\n🗡You received a Soldier🗡\n` + "```"
                  );
                } else if (chance == 3) {
                  db.add(`platinum_${tokenDB}`, 500);
                  message.channel.send(
                    "```" +
                      `diff
-You received : 500 platinum
` +
                      "```"
                  );
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else if (chance == 2) {
                  message.channel.send(
                    "```" +
                      `diff
-You received : Arcane Sensei Set
` +
                      "```"
                  );
                  db.add(`arcaneSenseiSet_${tokenDB}`, 1);
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else if (chance == 5) {
                  db.add(`platinum_${tokenDB}`, randomPlatinum);
                  message.channel.send(
                    "```" +
                      `css
-You received : ${randomPlatinum} platinum
` +
                      "```"
                  );
                  db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
                } else {
                  bal = db.fetch(`money_${tokenDB}.pocket`);
                  if (finalCoins + bal > moneyCap.moneyCap) {
                    message.channel.send("**You cannot exceed gold limit**");
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
                    db.add(`ValoriumEventPoints_${tokenDB}`, randomPoints);
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
  },
};
