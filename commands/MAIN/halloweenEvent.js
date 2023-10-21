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
  name: "play",
  aliases: ["Play"],
  description: "To play halloween event",
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
        return message.channel.send("Invalid command. Use: `play hit.x`");
      } else if (args[0] == "hit") {
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
          message.channel.send(
            "I need manage messages permission to function this command properly"
          );
          return;
        }
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
        const waetra = db.fetch(`darkElixir_${tokenDB}`);
        const waetraEquipped = db.fetch(`equippeddarkElixir_${tokenDB}`);
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
                `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                21498102
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
              db.set(`eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`, false);
            }

            var eclipsebaneTheSoulDevourerBossHealth =
              db.fetch(`eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`) ||
              21498102;
            function createHealthBar(health, maxHealth, barLength = 20) {
              // Ensure health and maxHealth are non-negative
              health = Math.max(0, health);
              maxHealth = Math.max(0, maxHealth);

              const percentage = Math.min(100, (health / maxHealth) * 100);
              const progressBlocks = Math.floor((barLength * percentage) / 100);
              const remainingBlocks = barLength - progressBlocks;

              const filledEmoji = "<:darkGreenHealthBar:1164779241058082868>";
              const emptyEmoji = "<:lightGreenHealthBar:1164779256350511144>";
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
            var eclipsebaneTheSoulDevourerBossHealth =
              db.fetch(`eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`) ||
              21498102;
            const bossHealthBar = createHealthBar(
              eclipsebaneTheSoulDevourerBossHealth,
              21498102,
              20
            );

            var currentBossHealth =
              db.fetch(`eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`) ||
              21498102;

            if (currentBossHealth > "0") {
              currentBossHealth = currentBossHealth
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              var bossHealthProgress = `${currentBossHealth} / 21,498,102`;
            } else {
              var bossHealthProgress = `0 / 21,498,102`;
            }
            if (
              eclipsebaneTheSoulDevourerBossHealth == null ||
              eclipsebaneTheSoulDevourerBossHealth == undefined
            ) {
              db.set(
                `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                21498102
              );
            }

            var eclipsebaneTheSoulDevourerBoss =
              "Eclipsebane, the Soul Devourer";
            scrapItems = [
              "Candy",
              "Poison",
              "Chocolate bar",
              "Spoiled pumpkin",
              "Black rock",
              "Wraith Scraps",
              "Awakening gem",
            ];
            var shuffledItems = scrapItems
              .slice()
              .sort(() => Math.random() - 0.5);
            var randomScrap = shuffledItems[0];
            var randomGoldCoins = Math.floor(Math.random() * 20012) + 6779;
            var hallowcharmToken = Math.floor(Math.random() * 18) + 1;

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
              `eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`
            );
            var lastHitTime = db.fetch(`lastHitTime_${tokenDB}`);
            if (Date.now - lastHitTime >= 180000) {
              resetBossHealth();
            }
            if (bossSpawned == true) {
              db.set(
                `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                21498102
              );
              const bossHealthBar = createHealthBar(
                eclipsebaneTheSoulDevourerBossHealth,
                21498102,
                20
              );
              const eclipsebaneTheSoulDevourerBossEmbed =
                new Discord.MessageEmbed()
                  .setColor("#2B2D31") // Deep purple color
                  .setAuthor(`${eclipsebaneTheSoulDevourerBoss}`) // Add an image of Eldra'zur as the author
                  .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                  .setImage(
                    "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                  ) // You can use another image to show the boss
                  .setFooter("Brave the shadows, conquer Halloween's night!");
              db.set(`eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                eclipsebaneTheSoulDevourerBossEmbed
              );
              var hitBossEmoji = "<a:hit:1152285216665247844";
              var pumpkinSkill = "<a:pumpkinSkill:1164777310814228520";
              await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(pumpkinSkill);
              if (
                Date.now - db.fetch(`pumpkinReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(pumpkinSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                if (user.id === message.author.id) {
                  return ["hit", "pumpkinSkill"].includes(reaction.emoji.name);
                }
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted
              var userId = message.author.id;
              var userTokenDB = new db.table(`tokenDB_${userId}`);
              // Schedule the next addition in 3 seconds
              // var partyData = userTokenDB.get(`party`) || {
              //   leader: null,
              //   members: [],
              //   membersData: [], // Initialize an empty array for member data
              // };

              // Check if there's a party and if the user is in a party

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "pumpkinSkill") {
                  // const partyData = userTokenDB.get(`party`) || {
                  //   leader: null,
                  //   members: [],
                  //   membersData: [],
                  // };

                  // // Find the index of the user in the party members array
                  // const partyUserIndex = partyData.members.findIndex(
                  //   (member) => member.userId === userId
                  // );

                  // if (partyUserIndex !== -1) {
                  //   // User is in the party, you can access their data
                  //   equippedWeapon =
                  //     partyData.membersData[partyUserIndex].equippedWeapon;
                  //   const weaponDamage =
                  //     partyData.membersData[partyUserIndex].weaponDamage;

                  //   db.subtract(
                  //     `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                  //     weaponDamage / 1.42
                  //   );
                  //   reaction.remove(user).catch(console.error);
                  // } else {
                  var weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                    weaponDamage / 1.42
                  );
                  reaction.remove(user).catch(console.error);
                  // }
                  var eclipsebaneTheSoulDevourerBossHealth =
                    db.fetch(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                    ) || 21498102;
                  function addpumpkinSkillReaction() {
                    if (
                      !collector.ended &&
                      eclipsebaneTheSoulDevourerBossHealth > 0 &&
                      eclipsebaneTheSoulDevourerBossHealth !== 21498102
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`pumpkinReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (eclipsebaneTheSoulDevourerBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`pumpkinReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var pumpkinReactionInterval = db.fetch(
                              `pumpkinReactionInterval_${tokenDB}`
                            );
                            var eclipsebaneTheSoulDevourerBossHealth =
                              db.fetch(
                                `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                              ) || 21498102;
                            if (
                              eclipsebaneTheSoulDevourerBossHealth < 21498102 &&
                              eclipsebaneTheSoulDevourerBossHealth > 0
                            ) {
                              db.set(`pumpkinReactionInterval_${tokenDB}`, 0);
                            }
                            if (pumpkinReactionInterval == 0) {
                              bossMessage
                                .react(pumpkinSkill)
                                .catch(console.error);
                              db.set(
                                `pumpkinReactionInterval_${tokenDB}`,
                                7500
                              );
                              return;
                            }
                            // db.set(`pumpkinReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`pumpkinReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addpumpkinSkillReaction();
                  if (
                    eclipsebaneTheSoulDevourerBossHealth < 0 ||
                    eclipsebaneTheSoulDevourerBossHealth == 0
                  ) {
                    // Boss defeated
                    eclipsebaneTheSoulDevourerBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );
                    db.set(
                      `eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`,
                      false
                    );
                    eclipsebaneTheSoulDevourerBossHealth =
                      eclipsebaneTheSoulDevourerBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eclipsebaneTheSoulDevourerBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#2B2D31") // Gold color for celebration
                        .setTitle(
                          `**Eclipsebane, the Soul Devourer Vanquished!**`
                        )
                        .setDescription(
                          `The haunting rule of ${eclipsebaneTheSoulDevourerBoss} has met its demise!`
                        )
                        .addField("Vanquished by", `${user}`, true)
                        .setImage(
                          "https://i.ibb.co/xg2Jfc2/monster-dead-gif.gif"
                        )
                        .setFooter(
                          "The realm of All Hallows can now exhale in relief."
                        );

                    message.channel.send(
                      eclipsebaneTheSoulDevourerBossDeadEmbed
                    );
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
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
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );
                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-${user.username} acquired : The cursed pumpkin
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`theCursedPumpkin_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `diff
${user.username} acquired : Witch's Brew Cauldron
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`witchsBrewCauldron_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Ebonrose Perfume
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`ebonrosePerfume_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Dark elixir
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`darkElixir_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Shadowveil Reflectoscope
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`shadowveilReflectoscope${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 15 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `diff\n🗡${user.username} acquired a Soldier🗡\n` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`power.${tokenDB}`, 0.08);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance >= 50 && chance < 130) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      if (randomScrap == "Candy") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Candy\n` +
                            "```"
                        );
                        db.add(`candy_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Poison") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Poison\n` +
                            "```"
                        );
                        db.add(`poison_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Chocolate bar") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Chocolate bar\n` +
                            "```"
                        );
                        db.add(`chocolateBar_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Spoiled pumpkin") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Spoiled pumpkin\n` +
                            "```"
                        );
                        db.add(`spoiledPumpkin_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Black rock") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Black rock\n` +
                            "```"
                        );
                        db.add(`blackRock_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Wraith Scraps") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Wraith Scraps\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`wraithScraps_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      } else if (randomScrap == "Awakening gem") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Awakening gem\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`awakeningGem_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
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
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    }
                    db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                  }

                  // Update boss health and cooldown
                  const currentTime = Date.now();
                  db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                  const bossHealthBar = createHealthBar(
                    eclipsebaneTheSoulDevourerBossHealth,
                    21498102,
                    20
                  );
                  eclipsebaneTheSoulDevourerBossHealth =
                    eclipsebaneTheSoulDevourerBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const eclipsebaneTheSoulDevourerBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#2B2D31")
                      .setAuthor("Eclipsebane, the Soul Devourer")
                      .addField(
                        `${eclipsebaneTheSoulDevourerBossHealth} / 21,498,102`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage(
                        "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                      )
                      .setFooter(
                        "Brave the shadows, conquer Halloween's night!"
                      );
                  await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   eclipsebaneTheSoulDevourerBossHealth,
                  //   21498102,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                  db.subtract(
                    `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                    weaponDamage / 4
                  );
                  var eclipsebaneTheSoulDevourerBossHealth =
                    db.fetch(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                    ) || 21498102;

                  if (
                    eclipsebaneTheSoulDevourerBossHealth < 0 ||
                    eclipsebaneTheSoulDevourerBossHealth == 0
                  ) {
                    // Boss defeated
                    eclipsebaneTheSoulDevourerBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );
                    db.set(
                      `eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`,
                      false
                    );
                    eclipsebaneTheSoulDevourerBossHealth =
                      eclipsebaneTheSoulDevourerBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eclipsebaneTheSoulDevourerBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#2B2D31") // Gold color for celebration
                        .setTitle(
                          `**Eclipsebane, the Soul Devourer Vanquished!**`
                        )
                        .setDescription(
                          `The haunting rule of ${eclipsebaneTheSoulDevourerBoss} has met its demise!`
                        )
                        .addField("Vanquished by", `${user}`, true)
                        .setImage(
                          "https://i.ibb.co/xg2Jfc2/monster-dead-gif.gif"
                        )
                        .setFooter(
                          "The realm of All Hallows can now exhale in relief."
                        );

                    message.channel.send(
                      eclipsebaneTheSoulDevourerBossDeadEmbed
                    );
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
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
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );

                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-${user.username} acquired : The cursed pumpkin
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`theCursedPumpkin_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `diff
${user.username} acquired : Witch's Brew Cauldron
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`witchsBrewCauldron_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Ebonrose Perfume
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`ebonrosePerfume_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Dark elixir
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`darkElixir_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Shadowveil Reflectoscope
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`shadowveilReflectoscope${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 15 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `diff\n🗡${user.username} acquired a Soldier🗡\n` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`power.${tokenDB}`, 0.08);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance >= 50 && chance < 130) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      if (randomScrap == "Candy") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Candy\n` +
                            "```"
                        );
                        db.add(`candy_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Poison") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Poison\n` +
                            "```"
                        );
                        db.add(`poison_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Chocolate bar") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Chocolate bar\n` +
                            "```"
                        );
                        db.add(`chocolateBar_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Spoiled pumpkin") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Spoiled pumpkin\n` +
                            "```"
                        );
                        db.add(`spoiledPumpkin_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Black rock") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Black rock\n` +
                            "```"
                        );
                        db.add(`blackRock_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Wraith Scraps") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Wraith Scraps\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`wraithScraps_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      } else if (randomScrap == "Awakening gem") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Awakening gem\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`awakeningGem_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
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
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    }
                    db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                  }

                  // Update boss health and cooldown
                  db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                  // Send an updated boss message
                  const bossHealthBar = createHealthBar(
                    eclipsebaneTheSoulDevourerBossHealth,
                    21498102,
                    20
                  );
                  eclipsebaneTheSoulDevourerBossHealth =
                    eclipsebaneTheSoulDevourerBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const eclipsebaneTheSoulDevourerBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#2B2D31")
                      .setAuthor("Eclipsebane, the Soul Devourer")
                      .addField(
                        `${eclipsebaneTheSoulDevourerBossHealth} / 21,498,102`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage(
                        "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                      )
                      .setFooter(
                        "Brave the shadows, conquer Halloween's night!"
                      );
                  await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);

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
              var pumpkinSkill = "<a:pumpkinSkill:1164777310814228520";
              const bossHealthBar = createHealthBar(
                eclipsebaneTheSoulDevourerBossHealth,
                21498102,
                20
              );
              const eclipsebaneTheSoulDevourerBossEmbed =
                new Discord.MessageEmbed()
                  .setColor("#2B2D31") // Deep purple color
                  .setAuthor(`${eclipsebaneTheSoulDevourerBoss}`) // Add an image of Eldra'zur as the author
                  .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
                  .setImage(
                    "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                  ) // You can use another image to show the boss
                  .setFooter("Brave the shadows, conquer Halloween's night!");
              db.set(`eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`, true);
              const bossMessage = await message.channel.send(
                eclipsebaneTheSoulDevourerBossEmbed
              );
              await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);
              await bossMessage.react(hitBossEmoji);
              // await bossMessage.react(pumpkinSkill);
              if (
                Date.now - db.fetch(`pumpkinReactionInterval_${tokenDB}`) ||
                0 == 0
              ) {
                await bossMessage.react(pumpkinSkill);
              }
              db.set(`cooldown_${tokenDB}`, Date.now());
              const filter = (reaction, user) => {
                if (user.id === message.author.id) {
                  return ["hit", "pumpkinSkill"].includes(reaction.emoji.name);
                }
              };

              const collector = bossMessage.createReactionCollector(filter, {
                time: 500000000,
              });
              const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

              // Schedule the next addition in 3 seconds

              collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "pumpkinSkill") {
                  // const partyData = userTokenDB.get(`party`) || {
                  //   leader: null,
                  //   members: [],
                  //   membersData: [],
                  // };

                  // // Find the index of the user in the party members array
                  // const partyUserIndex = partyData.members.findIndex(
                  //   (member) => member.userId === userId
                  // );

                  // if (partyUserIndex !== -1) {
                  //   // User is in the party, you can access their data
                  //   equippedWeapon =
                  //     partyData.membersData[partyUserIndex].equippedWeapon;
                  //   const weaponDamage =
                  //     partyData.membersData[partyUserIndex].weaponDamage;

                  //   db.subtract(
                  //     `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                  //     weaponDamage / 1.42
                  //   );
                  //   reaction.remove(user).catch(console.error);
                  // } else {
                  var weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || 0;
                  db.subtract(
                    `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                    weaponDamage / 1.42
                  );
                  reaction.remove(user).catch(console.error);
                  // }
                  var eclipsebaneTheSoulDevourerBossHealth =
                    db.fetch(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                    ) || 21498102;
                  function addpumpkinSkillReaction() {
                    if (
                      !collector.ended &&
                      eclipsebaneTheSoulDevourerBossHealth > 0 &&
                      eclipsebaneTheSoulDevourerBossHealth !== 21498102
                    ) {
                      if (!reactedUsers.has(message.author.id)) {
                        reactedUsers.add(message.author.id); // Add the user to the set to track their reaction
                        const reactionInterval = 7500;
                        db.set(`pumpkinReactionInterval_${tokenDB}`, 7500);
                        // Use setInterval to repeatedly call the function
                        const intervalId = setInterval(() => {
                          if (eclipsebaneTheSoulDevourerBossHealth <= 0) {
                            // If boss health is zero or below, clear the interval and exit
                            db.set(`pumpkinReactionInterval_${tokenDB}`, 7500);
                            clearInterval(intervalId);
                            return;
                          } else {
                            var pumpkinReactionInterval = db.fetch(
                              `pumpkinReactionInterval_${tokenDB}`
                            );
                            var eclipsebaneTheSoulDevourerBossHealth =
                              db.fetch(
                                `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                              ) || 21498102;
                            if (
                              eclipsebaneTheSoulDevourerBossHealth < 21498102 &&
                              eclipsebaneTheSoulDevourerBossHealth > 0
                            ) {
                              db.set(`pumpkinReactionInterval_${tokenDB}`, 0);
                            }
                            if (pumpkinReactionInterval == 0) {
                              bossMessage
                                .react(pumpkinSkill)
                                .catch(console.error);
                              db.set(
                                `pumpkinReactionInterval_${tokenDB}`,
                                7500
                              );
                              return;
                            }
                            // db.set(`pumpkinReactionInterval_${tokenDB}`, 0);
                          }
                        }, reactionInterval);
                      }
                    } else {
                      db.set(`pumpkinReactionInterval_${tokenDB}`, "x");
                      return; // No need to continue if the boss health is zero or below
                    }
                  }

                  addpumpkinSkillReaction();
                  if (
                    eclipsebaneTheSoulDevourerBossHealth < 0 ||
                    eclipsebaneTheSoulDevourerBossHealth == 0
                  ) {
                    // Boss defeated
                    eclipsebaneTheSoulDevourerBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );
                    db.set(
                      `eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`,
                      false
                    );
                    eclipsebaneTheSoulDevourerBossHealth =
                      eclipsebaneTheSoulDevourerBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eclipsebaneTheSoulDevourerBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#2B2D31") // Gold color for celebration
                        .setTitle(
                          `**Eclipsebane, the Soul Devourer Vanquished!**`
                        )
                        .setDescription(
                          `The haunting rule of ${eclipsebaneTheSoulDevourerBoss} has met its demise!`
                        )
                        .addField("Vanquished by", `${user}`, true)
                        .setImage(
                          "https://i.ibb.co/xg2Jfc2/monster-dead-gif.gif"
                        )
                        .setFooter(
                          "The realm of All Hallows can now exhale in relief."
                        );

                    message.channel.send(
                      eclipsebaneTheSoulDevourerBossDeadEmbed
                    );
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
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
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );

                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-${user.username} acquired : The cursed pumpkin
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`theCursedPumpkin_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `diff
${user.username} acquired : Witch's Brew Cauldron
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`witchsBrewCauldron_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Ebonrose Perfume
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`ebonrosePerfume_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Dark elixir
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`darkElixir_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Shadowveil Reflectoscope
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`shadowveilReflectoscope${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 15 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `diff\n🗡${user.username} acquired a Soldier🗡\n` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`power.${tokenDB}`, 0.08);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance >= 50 && chance < 130) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      if (randomScrap == "Candy") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Candy\n` +
                            "```"
                        );
                        db.add(`candy_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Poison") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Poison\n` +
                            "```"
                        );
                        db.add(`poison_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Chocolate bar") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Chocolate bar\n` +
                            "```"
                        );
                        db.add(`chocolateBar_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Spoiled pumpkin") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Spoiled pumpkin\n` +
                            "```"
                        );
                        db.add(`spoiledPumpkin_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Black rock") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Black rock\n` +
                            "```"
                        );
                        db.add(`blackRock_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Wraith Scraps") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Wraith Scraps\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`wraithScraps_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      } else if (randomScrap == "Awakening gem") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Awakening gem\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`awakeningGem_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
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
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    }
                    db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                  }

                  // Update boss health and cooldown
                  const currentTime = Date.now();
                  db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                  const bossHealthBar = createHealthBar(
                    eclipsebaneTheSoulDevourerBossHealth,
                    21498102,
                    20
                  );
                  eclipsebaneTheSoulDevourerBossHealth =
                    eclipsebaneTheSoulDevourerBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const eclipsebaneTheSoulDevourerBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#2B2D31")
                      .setAuthor("Eclipsebane, the Soul Devourer")
                      .addField(
                        `${eclipsebaneTheSoulDevourerBossHealth} / 21,498,102`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage(
                        "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                      )
                      .setFooter(
                        "Brave the shadows, conquer Halloween's night!"
                      );
                  await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);
                }
                if (reaction.emoji.name == "hit") {
                  // Handle hitting the boss here
                  const currentTime = Date.now();
                  const lastHitTime = db.fetch(`didntHitCooldown_${tokenDB}`);
                  // const bossHealthBar = createHealthBar(
                  //   eclipsebaneTheSoulDevourerBossHealth,
                  //   21498102,
                  //   20
                  // );
                  // It's not on cooldown, proceed to deal damage
                  const weaponDamage = db.fetch(`weaponDamage_${tokenDB}`);
                  db.subtract(
                    `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                    weaponDamage / 4
                  );
                  var eclipsebaneTheSoulDevourerBossHealth =
                    db.fetch(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`
                    ) || 21498102;

                  if (
                    eclipsebaneTheSoulDevourerBossHealth < 0 ||
                    eclipsebaneTheSoulDevourerBossHealth == 0
                  ) {
                    // Boss defeated
                    eclipsebaneTheSoulDevourerBossHealth = 0;

                    bossMessage.reactions.removeAll();
                    db.set(
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );
                    db.set(
                      `eclipsebaneTheSoulDevourerBossSpawned_${tokenDB}`,
                      false
                    );
                    eclipsebaneTheSoulDevourerBossHealth =
                      eclipsebaneTheSoulDevourerBossHealth
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const eclipsebaneTheSoulDevourerBossDeadEmbed =
                      new Discord.MessageEmbed()
                        .setColor("#2B2D31") // Gold color for celebration
                        .setTitle(
                          `**Eclipsebane, the Soul Devourer Vanquished!**`
                        )
                        .setDescription(
                          `The haunting rule of ${eclipsebaneTheSoulDevourerBoss} has met its demise!`
                        )
                        .addField("Vanquished by", `${user}`, true)
                        .setImage(
                          "https://i.ibb.co/xg2Jfc2/monster-dead-gif.gif"
                        )
                        .setFooter(
                          "The realm of All Hallows can now exhale in relief."
                        );

                    message.channel.send(
                      eclipsebaneTheSoulDevourerBossDeadEmbed
                    );
                    db.add(`bossesKilledTotal_${tokenDB}`, 1);
                    var chance = Math.floor(Math.random() * 225) + 1;
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
                      `eclipsebaneTheSoulDevourerBossHealth_${tokenDB}`,
                      21498102
                    );

                    if (chance == 1) {
                      message.channel.send(
                        "```" +
                          `diff
-${user.username} acquired : The cursed pumpkin
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`theCursedPumpkin_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 2) {
                      message.channel.send(
                        "```" +
                          `diff
${user.username} acquired : Witch's Brew Cauldron
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`witchsBrewCauldron_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 3) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Ebonrose Perfume
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`ebonrosePerfume_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 4) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Dark elixir
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`darkElixir_${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance == 5) {
                      message.channel.send(
                        "```" +
                          `fix
${user.username} acquired : Shadowveil Reflectoscope
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`shadowveilReflectoscope${tokenDB}`, 1);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 15 && (chance < 30 || chance == 30)) {
                      db.add(`soldiers_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `diff\n🗡${user.username} acquired a Soldier🗡\n` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                      db.add(`power.${tokenDB}`, 0.08);
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                    } else if (chance > 30 && (chance < 40 || chance == 40)) {
                      db.add(`eliteAwakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `css
[${user.username} acquired : Elite awakening gem]
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance > 40 && (chance < 60 || chance == 60)) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      db.add(`awakeningGem_${tokenDB}`, 1);
                      message.channel.send(
                        "```" +
                          `
${user.username} acquired : Awakening gem
` +
                          "```"
                      );
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    } else if (chance >= 50 && chance < 130) {
                      db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      if (randomScrap == "Candy") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Candy\n` +
                            "```"
                        );
                        db.add(`candy_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Poison") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Poison\n` +
                            "```"
                        );
                        db.add(`poison_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Chocolate bar") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Chocolate bar\n` +
                            "```"
                        );
                        db.add(`chocolateBar_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Spoiled pumpkin") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Spoiled pumpkin\n` +
                            "```"
                        );
                        db.add(`spoiledPumpkin_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Black rock") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Black rock\n` +
                            "```"
                        );
                        db.add(`blackRock_${tokenDB}`, 1);
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                      } else if (randomScrap == "Wraith Scraps") {
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Wraith Scraps\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`wraithScraps_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                      } else if (randomScrap == "Awakening gem") {
                        message.channel.send(
                          "```" +
                            `diff\n${user.username} acquired : Awakening gem\n` +
                            "```"
                        );
                        const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                          .setDescription(
                            `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                          )
                          .setColor(`#2B2D31`);
                        message.channel.send(hallowcharmTokenEmbed);
                        db.add(`awakeningGem_${tokenDB}`, 1);
                        db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
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
                      const hallowcharmTokenEmbed = new Discord.MessageEmbed()
                        .setDescription(
                          `
${user.username} acquired : <a:hallowcharmToken:1164785382517395547> ${hallowcharmToken} Hallowcharm token
`
                        )
                        .setColor(`#2B2D31`);
                      message.channel.send(hallowcharmTokenEmbed);
                    }
                    db.add(`hallowcharmToken_${tokenDB}`, hallowcharmToken);
                  }
                  // Update boss health and cooldown
                  db.set(`didntHitCooldown_${tokenDB}`, currentTime);
                  // Send an updated boss message
                  const bossHealthBar = createHealthBar(
                    eclipsebaneTheSoulDevourerBossHealth,
                    21498102,
                    20
                  );
                  eclipsebaneTheSoulDevourerBossHealth =
                    eclipsebaneTheSoulDevourerBossHealth
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  const eclipsebaneTheSoulDevourerBossEmbed =
                    new Discord.MessageEmbed()
                      .setColor("#2B2D31")
                      .setAuthor("Eclipsebane, the Soul Devourer")
                      .addField(
                        `${eclipsebaneTheSoulDevourerBossHealth} / 21,498,102`,
                        `${bossHealthBar}`,
                        true
                      )
                      .setImage(
                        "https://i.ibb.co/DwqjDJr/Shadowfang-the-grim-specter.gif"
                      )
                      .setFooter(
                        "Brave the shadows, conquer Halloween's night!"
                      );
                  await bossMessage.edit(eclipsebaneTheSoulDevourerBossEmbed);

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
