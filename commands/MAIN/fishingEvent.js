const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");
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
const { random } = require("mathjs");
module.exports = {
  name: "fish",
  aliases: ["Fishing"],
  description: "To play fishing event",
  usage: "fish",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
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
      const channel =
        message.guild && message.guild.available
          ? message.guild.channels.cache.get(message.channel.id)
          : null;
      if (channel) {
        const botPermissions = channel.permissionsFor(client.user);
        if (
          !botPermissions.has("ADD_REACTIONS") ||
          !botPermissions.has("READ_MESSAGE_HISTORY") ||
          !botPermissions.has("MANAGE_MESSAGES")
        ) {
          message.channel.send(
            `I dont have MANAGE MESSAGES PERMISSION / READ MESSAGE HISTORY PERMISSION / MANAGE MESSAGES PERMISSION`
          );
        }
      }
      // if (message.author.id !== "768747976767832084") {
      //   const buildInProgress = new Discord.MessageEmbed()
      //     .setDescription(`This command in under construction 🚧`)
      //     .setColor("#2B2D31");
      //   message.channel.send(buildInProgress);
      //   return;
      // }
      var fishzoneWeaponDamage = Math.floor(Math.random() * 1210921) + 810291;
      db.set(`fishzoneWeaponDamage_${tokenDB}`, fishzoneWeaponDamage);
      const noFishingRodMessages = [
        "Seems like you left your fishing rod at home. Oops!",
        "No fishing rod in sight! Did you forget it?",
        "Go get a fishing rod",
        "Fishing without a fishing rod?",
        "You're missing your fishing rod!",
        "Did a fish steal your fishing rod? It happens to the best of us.",
        "No fishing rod?.",
        "Can't find your fishing rod? Maybe the fish wanted to try it out.",
        "Your fishing rod must be on vacation. Fish responsibly!",
        "When life gives you no fishing rod, make fishy friends instead.",
        "Fishing without a rod is like sailing without a boat!",
        "If you catch a fish without a fishing rod, you're a true fish whisperer.",
        "No fishing rod? No worries! Fish have a soft spot for bare-handed anglers.",
        "You forgot your fishing rod, but you've got the heart of a fisherman!",
        "Fishing rod MIA? Time for some fishy meditation.",
        "Fishing without a rod? Get one lol",
      ];

      const randomMessage =
        noFishingRodMessages[
          Math.floor(Math.random() * noFishingRodMessages.length)
        ];
      const fishingRod = db.fetch(`fishingRod_${tokenDB}`) || 0;
      if (fishingRod < 1) {
        const weaponEmbed = new Discord.MessageEmbed()
          .setColor("#2B2D31") // A lively green color
          .setDescription(randomMessage);

        message.channel.send(weaponEmbed);
        return;
      }
      const cooldownKey = `fish_cooldown_${tokenDB}`;
      const currentTime = Date.now();
      const cooldownTime = 10000; // 10 seconds in milliseconds

      if (
        db.has(cooldownKey) &&
        currentTime - db.get(cooldownKey) < cooldownTime
      ) {
        const remainingTime =
          (db.get(cooldownKey) + cooldownTime - currentTime) / 1000;
        const waitMessages = [
          "Hold on, let the fishes run... 😅",
          "The fish are playing hide and seek 👀, don't give up...",
          "Fishing in progress... Please don't scare 👻 the fish away!",
          "Just keep swimming 💦... I mean, waiting...",
          "The fish are conspiring against you, but patience is your secret weapon 🏹...",
        ];
        const randomWaitMessage =
          waitMessages[Math.floor(Math.random() * waitMessages.length)];

        // Create an embed for the wait message
        const waitEmbed = new Discord.MessageEmbed()
          .setDescription(`${randomWaitMessage} `)
          .setFooter(
            `You can fish again in ${remainingTime.toFixed(1)} seconds.`
          )
          .setColor("#2B2D31");

        message.channel.send(waitEmbed);
        return;
      }

      if (fishingRod > 0) {
        timeout = 100;
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
          var thassormentorBossHealth =
            db.fetch(`thassormentorBossHealth_${tokenDB}`) || 1210901;
          function createHealthBar(health, maxHealth, barLength = 16) {
            // Ensure health and maxHealth are non-negative
            health = Math.max(0, health);
            maxHealth = Math.max(0, maxHealth);

            const percentage = Math.min(100, (health / maxHealth) * 100);
            const progressBlocks = Math.floor((barLength * percentage) / 100);
            const remainingBlocks = barLength - progressBlocks;

            const filledEmoji = "<:darkBlueBar:1157618092181049449>";
            const emptyEmoji = "<:lightBlueBar:1157618121788620862>";
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
          var thassormentorBossHealth =
            db.fetch(`thassormentorBossHealth_${tokenDB}`) || 1210901;
          const bossHealthBar = createHealthBar(
            thassormentorBossHealth,
            1210901,
            16
          );

          var currentBossHealth =
            db.fetch(`thassormentorBossHealth_${tokenDB}`) || 1210901;

          if (currentBossHealth > "0") {
            currentBossHealth = currentBossHealth
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var bossHealthProgress = `${currentBossHealth} / 1,210,901`;
          } else {
            var bossHealthProgress = `0 / 1,210,901`;
          }
          if (
            thassormentorBossHealth == null ||
            thassormentorBossHealth == undefined
          ) {
            db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);
          }

          var thassormentorBoss = "Thasormentor, the sea king";

          var goldLoot = db.fetch(`goldLoot_${tokenDB}`) || 0;
          if (goldLoot == undefined || goldLoot == null) {
            goldLoot = 0;
          }

          const bossSpawned = db.fetch(`thassormentorBossSpawned_${tokenDB}`);
          var lastfishingRodTime = db.fetch(`lastfishingRodTime_${tokenDB}`);

          if (bossSpawned == true) {
            db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);
            const bossHealthBar = createHealthBar(
              thassormentorBossHealth,
              1210901,
              16
            );
            const bossFooterTexts = [
              "May your fishing rod be the ultimate sea king conqueror!",
              "May the waves of fortune carry you to victory!",
              "Summon your inner fisherman and reel in victory!",
              "Conquer the sea king and make Neptune proud!",
              "May the sea king fear the might of your fishing rod!",
              "Hook, line, and sink that sea king to victory!",
              "Let's show that sea king who's the real catch!",
              "Reel in the sea king and make a splash in history!",
              "May your fishing skills be the stuff of legends!",
              "Fish on, and may the sea king be your greatest trophy!",
            ];

            const randomFooterText =
              bossFooterTexts[
                Math.floor(Math.random() * bossFooterTexts.length)
              ];
            const thassormentorBossEmbed = new Discord.MessageEmbed()
              .setColor("#2B2D31") // Deep purple color
              .setAuthor(`${thassormentorBoss}`) // Add an image of Eldra'zur as the author
              .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
              .setImage("https://i.ibb.co/CK1bcZv/thassormentor.gif") // You can use another image to show the boss
              .setFooter(randomFooterText);
            db.set(`thassormentorBossSpawned_${tokenDB}`, true);
            const bossMessage = await message.channel.send(
              thassormentorBossEmbed
            );
            var fishingRodBossEmoji = "<a:fishingRod:1156985653867839488>";
            await bossMessage.edit(thassormentorBossEmbed);
            await bossMessage.react(fishingRodBossEmoji);
            // await bossMessage.react(waterSkill);

            db.set(`cooldown_${tokenDB}`, Date.now());
            const filter = (reaction, user) => {
              if (user.id === message.author.id) {
                return ["fishingRod"].includes(reaction.emoji.name);
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
              if (reaction.emoji.name == "fishingRod") {
                // Handle fishingRodting the boss here
                const currentTime = Date.now();
                const lastfishingRodTime = db.fetch(
                  `didntfishingRodCooldown_${tokenDB}`
                );
                // const bossHealthBar = createHealthBar(
                //   thassormentorBossHealth,
                //   1210901,
                //   16
                // );
                // It's not on cooldown, proceed to deal damage
                const fishzoneWeaponDamage = db.fetch(
                  `fishzoneWeaponDamage_${tokenDB}`
                );
                db.subtract(
                  `thassormentorBossHealth_${tokenDB}`,
                  fishzoneWeaponDamage / 4
                );
                var thassormentorBossHealth =
                  db.fetch(`thassormentorBossHealth_${tokenDB}`) || 1210901;

                if (
                  thassormentorBossHealth < 0 ||
                  thassormentorBossHealth == 0
                ) {
                  // Boss defeated
                  thassormentorBossHealth = 0;

                  bossMessage.reactions.removeAll();
                  db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);
                  db.set(`thassormentorBossSpawned_${tokenDB}`, false);
                  thassormentorBossHealth = thassormentorBossHealth
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  db.add(`bossesKilledTotal_${tokenDB}`, 1);
                  var chance = Math.floor(Math.random() * 175) + 1;
                  console.log(chance);
                  var moonsShineOfMetalSwordChance =
                    Math.floor(Math.random() * 1000) + 1;
                  console.log(moonsShineOfMetalSwordChance);
                  var weaponName = db.fetch(`wepName_${tokenDB}`);
                  if (weaponName == "daggerOfDeath") {
                    var daggerOfDeathLevel =
                      db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 0;
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
                  db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);

                  const rareFishesToGet = [
                    {
                      name: "Lumina fin",
                      emoji: "<a:luminaFin:1158034789614497813>",
                      funnyTexts: [
                        "You caught a LuminaFin! It lights up your fishing rod with envy.",
                        "A LuminaFin emerges from the depths! It claims to have the brightest personality in the sea.",
                        "You reeled in a LuminaFin. It insists on being your personal fish-sized flashlight.",
                        "A LuminaFin is your catch! It challenges you to a glow-in-the-dark dance-off.",
                        "You found a LuminaFin. It wants to start an underwater light show for fish.",
                        "A LuminaFin appears! It claims to be the disco ball of the deep blue.",
                        "You pulled out a LuminaFin. It asks if you have any spare batteries for its fin.",
                        "You caught a LuminaFin. It insists on being the official mood lighting for your boat.",
                        "A LuminaFin is on your hook! It challenges you to a glow-off with other sea creatures.",
                        "You reeled in a LuminaFin. It wants to start a fishy constellation club.",
                        "A LuminaFin emerges from the water. It claims to be the lighthouse of the ocean floor.",
                        "You found a LuminaFin. It challenges you to a game of underwater flashlight tag.",
                        "A LuminaFin is your catch! It tells you that fish parties are better with a glowing guest.",
                        "You pulled out a LuminaFin. It insists on being the guiding light for lost fish.",
                        "You caught a LuminaFin. It asks if you have any fishy sunglasses for its dazzling glow.",
                      ],
                    },
                    {
                      name: "Bubblegum Blowfish",
                      emoji: "<a:bubblegumBlowfish:1158036690364010549>", // Replace with the actual emoji
                      funnyTexts: [
                        "You caught a Bubblegum Blowfish! It challenges you to a bubble-blowing contest.",
                        "A Bubblegum Blowfish emerges from the water. It insists on being called 'Bubble Buddy.'",
                        "You reeled in a Bubblegum Blowfish. It claims to have the stickiest bubblegum in the sea.",
                        "A Bubblegum Blowfish is your catch! It challenges you to a bubble-popping showdown.",
                        "You found a Bubblegum Blowfish. It wants to start a bubblegum bubblegum pop band.",
                        "You pulled out a Bubblegum Blowfish. It insists on being the bubblegum champion of the ocean.",
                        "You caught a Bubblegum Blowfish. It asks if you have any fish-flavored bubblegum.",
                        "A Bubblegum Blowfish is on your hook! It challenges you to a bubblegum art competition.",
                        "You reeled in a Bubblegum Blowfish. It insists on a bubblegum fashion show.",
                        "You caught a Bubblegum Blowfish. It wants to start a bubblegum academy underwater.",
                      ],
                    },
                    {
                      name: "Disguised Diverfish",
                      emoji: "<a:disguisedDiverfish:1158038321537241098>",
                      funnyTexts: [
                        "You caught a Disguised Diverfish! It claims to be the sneakiest fish in the sea.",
                        "A Disguised Diverfish emerges from the water. It insists on being called 'Master of Disguise.'",
                        "You reeled in a Disguised Diverfish. It challenges you to a fishy costume contest.",
                        "A Disguised Diverfish is your catch! It asks if you have any spare disguises.",
                        "You found a Disguised Diverfish. It wants to start a fishy spy agency.",
                        "You pulled out a Disguised Diverfish. It insists on being the undercover agent of the ocean.",
                        "You caught a Disguised Diverfish. It claims to have the best fish disguises in the sea.",
                        "A Disguised Diverfish is on your hook! It asks if you've seen any fishy mysteries to solve.",
                        "You reeled in a Disguised Diverfish. It insists on a fishy disguise fashion show.",
                        "You caught a Disguised Diverfish. It wants to start a fishy disguise party underwater.",
                      ],
                    },
                    // Add more rare fishes with funnyTexts here if needed
                  ];
                  const randomRareFishes =
                    rareFishesToGet[
                      Math.floor(Math.random() * rareFishesToGet.length)
                    ];

                  // Select a random funny text associated with the item
                  const rareFunnyText =
                    randomRareFishes.funnyTexts[
                      Math.floor(
                        Math.random() * randomRareFishes.funnyTexts.length
                      )
                    ];
                  const commonFishesToGet = [
                    {
                      name: "Sarcastic fringehead",
                      emoji: "<:sarcasticFringehead:1156929582335799388>",
                      funnyTexts: [
                        "You reeled in a Sarcastic fringehead. It sarcastically compliments your fishing skills.",
                        "A Sarcastic fringehead appeared! It's not very impressed with your fishing technique.",
                        "You caught a Sarcastic fringehead. It gives you a snarky fishy grin.",
                        "It's a Sarcastic fringehead! It starts a stand-up comedy routine about fishing.",
                        "A Sarcastic fringehead is your catch! It tells you a fishy joke.",
                        "You pulled out a Sarcastic fringehead. It claims to be the world champion in underwater chess.",
                        "You caught a Sarcastic fringehead. It challenges you to a fish-off!",
                        "A Sarcastic fringehead is on your hook! It asks if you can teach it to fish.",
                        "You caught a Sarcastic fringehead. It claims to be the fishiest stand-up comedian.",
                        "A Sarcastic fringehead is on your hook! It challenges you to a fishy debate.",
                        "You reeled in a Sarcastic fringehead. It offers you a snarky fishy critique of your fishing rod.",
                        "A Sarcastic fringehead appeared! It tells you the secret to catching the perfect fish: be more sarcastic.",
                        "You caught a Sarcastic fringehead. It asks if you have a fishy comeback for its sarcasm.",
                        "You pulled out a Sarcastic fringehead. It claims to be the CEO of Fishy Insults Inc.",
                        "A Sarcastic fringehead is your catch! It brags about being the snarkiest fish in the sea.",
                      ],
                    },
                    {
                      name: "Salmon",
                      emoji: "<:salmon:1156929627126771784>",
                      funnyTexts: [
                        "You pulled out a salmon! It's doing its best salmon impression.",
                        "It's a salmon! It does a little fishy dance for you.",
                        "You caught a salmon, and it asks if you have any lemon and butter.",
                        "A salmon is your catch! It says it was on its way to a sushi party.",
                        "You reeled in a salmon. It challenges you to a swimming race.",
                        "You caught a salmon. It claims to be the Michael Jordan of fish.",
                        "A salmon appears! It's practicing its synchronized swimming routine.",
                        "You found a salmon. It starts singing a fishy love song.",
                        "You reeled in a salmon. It starts a fishy dance party on your boat.",
                        "You caught a salmon. It challenges you to a game of underwater chess.",
                        "A salmon is your catch! It claims to be the world record holder in fish hurdling.",
                        "You found a salmon. It asks if you're up for a fishy game of hide and seek.",
                        "A salmon emerges from the water! It gives you a salmon-sized high-five.",
                        "You pulled out a salmon. It asks if you can teach it to fish for compliments.",
                        "You caught a salmon. It claims to be the fishy ambassador to Atlantis.",
                      ],
                    },
                    {
                      name: "Smelly fish",
                      emoji: "<:smellyFish:1156929529894424666>",
                      funnyTexts: [
                        "You found a smelly fish! It lives up to its name.",
                        "A smelly fish emerges from the water. You might need a nose plug.",
                        "You caught a smelly fish. It's not the catch of the day.",
                        "It's a smelly fish! It offers to give you fishy perfume tips.",
                        "A smelly fish is your catch! It blames a nearby fish for the smell.",
                        "You reeled in a smelly fish. It asks if you have any fish deodorant.",
                        "You caught a smelly fish. It challenges you to a fish-eating contest.",
                        "A smelly fish appears! It claims to be the official fish of bad smells.",
                        "You reeled in a smelly fish. It suggests opening a fishy perfume shop.",
                        "A smelly fish emerges from the water. It challenges you to a fishy eating contest.",
                        "You caught a smelly fish. It claims to have invented fishy deodorant.",
                        "It's a smelly fish! It starts a fishy yoga session to improve its scent.",
                        "A smelly fish is your catch! It offers you a smelly fish handshake.",
                        "You found a smelly fish. It claims to be the chief odor officer of the ocean.",
                        "You caught a smelly fish. It asks if you have any fishy air freshener.",
                      ],
                    },
                    {
                      name: "burned fish",
                      emoji: "<:burnedfish:1156939483267207220>",
                      funnyTexts: [
                        "You caught a burned fish. It looks like it had a rough time on the grill.",
                        "A charred fish appears! It's a bit crispy around the edges.",
                        "It's a burned fish! Someone left it on the barbecue for too long.",
                        "A burned fish is your catch! It says it's fire-resistant now.",
                        "You reeled in a burned fish. It asks for sunscreen.",
                        "You caught a burned fish. It's practicing its fire-breathing trick.",
                        "A burned fish emerges from the water. It wants to start a barbecue club.",
                        "You found a burned fish. It claims to be the secret ingredient for BBQ sauce.",
                        "You caught a burned fish. It claims to be the official mascot of BBQ parties.",
                        "A burned fish is your catch! It says it's fireproof now and ready for adventures.",
                        "You found a burned fish. It challenges you to a fishy barbecue cook-off.",
                        "A burned fish emerges from the water. It offers to toast marshmallows for you.",
                        "You reeled in a burned fish. It claims to have tanned to perfection on the grill.",
                        "You pulled out a burned fish. It asks if you have any fishy sunscreen.",
                        "You caught a burned fish. It insists on being called 'Crispy' from now on.",
                      ],
                    },
                    {
                      name: "Grumpy Catfish",
                      emoji: "<:grumpyCatfish:1156929452056522812>",
                      funnyTexts: [
                        "You caught a Grumpy Catfish. It looks like it didn't want to be caught.",
                        "A Grumpy Catfish is your catch! It claims to have a PhD in catfishology.",
                        "You reeled in a Grumpy Catfish. It insists on being called 'Professor Whiskers.'",
                        "A Grumpy Catfish emerges from the water. It's not a morning fish.",
                        "You found a Grumpy Catfish. It wants to start a grumpy fish support group.",
                        "You pulled out a Grumpy Catfish. It challenges you to a staring contest.",
                        "You caught a Grumpy Catfish. It claims to have the grumpiest meow in the sea.",
                        "A Grumpy Catfish is on your hook! It asks if you have any fishnip.",
                        "You reeled in a Grumpy Catfish. It insists on a grumpy fish selfie.",
                        "You caught a Grumpy Catfish. It wants to start a grumpy catfish meme page.",
                        "A Grumpy Catfish is your catch! It tells you that fishing is for amateurs.",
                        "You found a Grumpy Catfish. It challenges you to a grumpy-off.",
                        "A Grumpy Catfish emerges from the water. It insists on a grumpy fish philosophy debate.",
                        "You pulled out a Grumpy Catfish. It claims to be the grumpiest fish in the ocean.",
                        "You caught a Grumpy Catfish. It asks if you can teach it to smile.",
                        "A Grumpy Catfish is on your hook! It tells you that fish puns are beneath it.",
                        "You reeled in a Grumpy Catfish. It insists on a grumpy fish poetry contest.",
                        "You caught a Grumpy Catfish. It challenges you to a grumpy fish stare-down.",
                        "A Grumpy Catfish is your catch! It claims to be the grandmaster of grumpiness.",
                        "You found a Grumpy Catfish. It wants to start a grumpy fish revolution.",
                      ],
                    },
                    {
                      name: "Pancake Fish",
                      emoji: "<:pancakeFish:1156929418170744852>",
                      funnyTexts: [
                        "You caught a Pancake Fish! It's a bit flat, but it looks delicious.",
                        "A Pancake Fish is your catch! It insists on being called 'Flapjack Fin.'",
                        "You reeled in a Pancake Fish. It claims to have the world record for flips.",
                        "A Pancake Fish emerges from the water. It challenges you to a pancake-eating contest.",
                        "You found a Pancake Fish. It wants to start a pancake-themed fish cafe.",
                        "You pulled out a Pancake Fish. It challenges you to a syrup-drinking duel.",
                        "You caught a Pancake Fish. It claims to be the king of breakfast in the sea.",
                        "A Pancake Fish is on your hook! It asks if you have any butter.",
                        "You reeled in a Pancake Fish. It insists on a pancake flipping competition.",
                        "You caught a Pancake Fish. It wants to start a pancake party underwater.",
                        "A Pancake Fish is your catch! It tells you that fish like brunch too.",
                        "You found a Pancake Fish. It challenges you to a pancake stack-off.",
                        "A Pancake Fish emerges from the water. It insists on pancake poetry readings.",
                        "You pulled out a Pancake Fish. It claims to be the syrupy sultan of the sea.",
                        "You caught a Pancake Fish. It asks if you have any maple syrup.",
                      ],
                    },

                    {
                      name: "Disco Jellyfish",
                      emoji: "<:discoJellyfish:1156929355465900133>",
                      funnyTexts: [
                        "You caught a Disco Jellyfish! It's ready to dance the night away.",
                        "A Disco Jellyfish is your catch! It insists on being called 'Jelly Groove.'",
                        "You reeled in a Disco Jellyfish. It claims to have the best dance moves in the sea.",
                        "A Disco Jellyfish emerges from the water. It challenges you to a dance-off.",
                        "You found a Disco Jellyfish. It wants to start a dance club for sea creatures.",
                        "You pulled out a Disco Jellyfish. It challenges you to a disco ball spin-off.",
                        "You caught a Disco Jellyfish. It claims to be the disco king of the ocean.",
                        "A Disco Jellyfish is on your hook! It asks if you have any funky beats.",
                        "You reeled in a Disco Jellyfish. It insists on a dance floor showdown.",
                        "You caught a Disco Jellyfish. It wants to start a dance party on your boat.",
                        "A Disco Jellyfish is your catch! It tells you that underwater raves are the best.",
                        "You found a Disco Jellyfish. It challenges you to a disco dance battle.",
                        "A Disco Jellyfish emerges from the water. It insists on disco-themed karaoke.",
                        "You pulled out a Disco Jellyfish. It claims to be the grooviest fish in the sea.",
                        "You caught a Disco Jellyfish. It asks if you have any disco lights.",
                      ],
                    },
                    {
                      name: "Soda Canfish",
                      emoji: "<:sodaCanfish:1156929327817035788>",
                      funnyTexts: [
                        "You caught a Soda Canfish! It's a bit fizzy but surprisingly refreshing.",
                        "A Soda Canfish is your catch! It insists on being called 'Fizzmaster.'",
                        "You reeled in a Soda Canfish. It claims to have the secret to carbonation.",
                        "A Soda Canfish emerges from the water. It challenges you to a soda chugging contest.",
                        "You found a Soda Canfish. It wants to start a soda can recycling initiative.",
                        "You pulled out a Soda Canfish. It challenges you to a soda can crushing competition.",
                        "You caught a Soda Canfish. It claims to be the king of bubbly drinks in the sea.",
                        "A Soda Canfish is on your hook! It asks if you have any straws.",
                        "You reeled in a Soda Canfish. It insists on a fizzy drink taste test.",
                        "You caught a Soda Canfish. It wants to start a soda party underwater.",
                        "A Soda Canfish is your catch! It tells you that fish enjoy a good soda pop.",
                        "You found a Soda Canfish. It challenges you to a soda can balancing act.",
                        "A Soda Canfish emerges from the water. It insists on soda-themed trivia games.",
                        "You pulled out a Soda Canfish. It claims to be the most refreshing fish in the sea.",
                        "You caught a Soda Canfish. It asks if you have any ice cubes.",
                      ],
                    },
                    {
                      name: "Lava Lamp Eel",
                      emoji: "<:lavaLampEel:1156939953448681472>",
                      funnyTexts: [
                        "You caught a Lava Lamp Eel! It's groovy and glows in vibrant colors.",
                        "A Lava Lamp Eel is your catch! It insists on being called 'Lava Dancer.'",
                        "You reeled in a Lava Lamp Eel. It claims to have the best light show in the sea.",
                        "A Lava Lamp Eel emerges from the water. It challenges you to a dance-off under the lava lamp.",
                        "You found a Lava Lamp Eel. It wants to start an underwater discotheque.",
                        "You pulled out a Lava Lamp Eel. It challenges you to a lava lamp swirling contest.",
                        "You caught a Lava Lamp Eel. It claims to be the grooviest eel in the ocean.",
                        "A Lava Lamp Eel is on your hook! It asks if you have any glow sticks.",
                        "You reeled in a Lava Lamp Eel. It insists on a dance party under the lava lamp.",
                        "You caught a Lava Lamp Eel. It wants to start a psychedelic fish festival.",
                        "A Lava Lamp Eel is your catch! It tells you that fish have great taste in decor.",
                        "You found a Lava Lamp Eel. It challenges you to a lava lamp design competition.",
                        "A Lava Lamp Eel emerges from the water. It insists on lava lamp-themed karaoke.",
                        "You pulled out a Lava Lamp Eel. It claims to be the most illuminating fish in the sea.",
                        "You caught a Lava Lamp Eel. It asks if you have any disco balls.",
                      ],
                    },
                    {
                      name: "Rubber Duckyfish",
                      emoji: "<:rubberDuckyfish:1156938911004766240>",
                      funnyTexts: [
                        "You caught a Rubber Duckyfish! It squeaks when you squeeze it.",
                        "A Rubber Duckyfish is your catch! It insists on being called 'Ducky McFish.'",
                        "You reeled in a Rubber Duckyfish. It claims to be the world's favorite bath toy fish.",
                        "A Rubber Duckyfish emerges from the water. It challenges you to a rubber ducky race.",
                        "You found a Rubber Duckyfish. It wants to start a rubber ducky parade for fish.",
                        "You pulled out a Rubber Duckyfish. It challenges you to a rubber ducky squeaking contest.",
                        "You caught a Rubber Duckyfish. It claims to be the quackiest fish in the sea.",
                        "A Rubber Duckyfish is on your hook! It asks if you have any bubble bath.",
                        "You reeled in a Rubber Duckyfish. It insists on a rubber ducky fashion show.",
                        "You caught a Rubber Duckyfish. It wants to start a bath time party underwater.",
                        "A Rubber Duckyfish is your catch! It tells you that fish love a good soak.",
                        "You found a Rubber Duckyfish. It challenges you to a rubber ducky trivia quiz.",
                        "A Rubber Duckyfish emerges from the water. It insists on rubber ducky karaoke.",
                        "You pulled out a Rubber Duckyfish. It claims to be the squeakiest fish in the sea.",
                        "You caught a Rubber Duckyfish. It asks if you have any duck snacks.",
                      ],
                    },

                    {
                      name: "Ninja Starfish",
                      emoji: "<:ninjaStarfish:1156938871695757432>",
                      funnyTexts: [
                        "You caught a Ninja Starfish! It's a master of stealth and underwater combat.",
                        "A Ninja Starfish is your catch! It insists on being called 'Shuriken Shinobi.'",
                        "You reeled in a Ninja Starfish. It claims to have trained with fish ninjas.",
                        "A Ninja Starfish emerges from the water. It challenges you to a ninja duel.",
                        "You found a Ninja Starfish. It wants to start a secret fish ninja academy.",
                        "You pulled out a Ninja Starfish. It challenges you to a throwing star competition.",
                        "You caught a Ninja Starfish. It claims to be the stealthiest fish in the sea.",
                        "A Ninja Starfish is on your hook! It asks if you have any seaweed for camouflage.",
                        "You reeled in a Ninja Starfish. It insists on a ninja fish training session.",
                        "You caught a Ninja Starfish. It wants to start a fish ninja clan underwater.",
                        "A Ninja Starfish is your catch! It tells you that fish ninjas are always watching.",
                        "You found a Ninja Starfish. It challenges you to a ninja obstacle course.",
                        "A Ninja Starfish emerges from the water. It insists on ninja-themed riddles.",
                        "You pulled out a Ninja Starfish. It claims to be the sneakiest fish in the sea.",
                        "You caught a Ninja Starfish. It asks if you have any sushi recipes.",
                      ],
                    },
                    {
                      name: "Alien Anglerfish",
                      emoji: "<:alienAnglerfish:1156938740586000394>",
                      funnyTexts: [
                        "You caught an Alien Anglerfish! It's here to probe your fishing skills.",
                        "An Alien Anglerfish is your catch! It insists on being called 'Extraterrestrial Eel.'",
                        "You reeled in an Alien Anglerfish. It claims to have traveled from another galaxy for this fishing trip.",
                        "An Alien Anglerfish emerges from the water. It challenges you to a space-themed fish-off.",
                        "You found an Alien Anglerfish. It wants to start an interstellar fishing club.",
                        "You pulled out an Alien Anglerfish. It challenges you to a UFO-spotting contest.",
                        "You caught an Alien Anglerfish. It claims to be the most extraterrestrial fish in the sea.",
                        "An Alien Anglerfish is on your hook! It asks if you have any alien bait.",
                        "You reeled in an Alien Anglerfish. It insists on a cosmic fishing expedition.",
                        "You caught an Alien Anglerfish. It wants to start an intergalactic fish party underwater.",
                        "An Alien Anglerfish is your catch! It tells you that fish from other planets love fishing too.",
                        "You found an Alien Anglerfish. It challenges you to an alien trivia quiz.",
                        "An Alien Anglerfish emerges from the water. It insists on probing fishy mysteries.",
                        "You pulled out an Alien Anglerfish. It claims to have the most advanced fishing technology in the sea.",
                        "You caught an Alien Anglerfish. It asks if you have any space snacks.",
                      ],
                    },

                    {
                      name: "Pirate Parrotfish",
                      emoji: "<:pirateParrotfish:1156938717781573733>",
                      funnyTexts: [
                        "You caught a Pirate Parrotfish! It's ready to sail the seven seas with you.",
                        "A Pirate Parrotfish is your catch! It insists on being called 'Captain Squawks.'",
                        "You reeled in a Pirate Parrotfish. It claims to have buried treasure on a distant fish island.",
                        "A Pirate Parrotfish emerges from the water. It challenges you to a pirate-themed fish duel.",
                        "You found a Pirate Parrotfish. It wants to start a fish pirate crew on your boat.",
                        "You pulled out a Pirate Parrotfish. It challenges you to a plank-walking competition.",
                        "You caught a Pirate Parrotfish. It claims to be the most swashbuckling fish in the sea.",
                        "A Pirate Parrotfish is on your hook! It asks if you have any fishy grog.",
                        "You reeled in a Pirate Parrotfish. It insists on a pirate fish treasure hunt.",
                        "You caught a Pirate Parrotfish. It wants to start a fishy mutiny underwater.",
                        "A Pirate Parrotfish is your catch! It tells you that fish can be pirates too, arrr!",
                        "You found a Pirate Parrotfish. It challenges you to a pirate-themed sea shanty sing-off.",
                        "A Pirate Parrotfish emerges from the water. It insists on pirate-themed fishy riddles.",
                        "You pulled out a Pirate Parrotfish. It claims to have the deadliest beak in the sea.",
                        "You caught a Pirate Parrotfish. It asks if you have any pirate flags.",
                      ],
                    },
                    {
                      name: "Toilet Seat Lid",
                      emoji: "<:toiletSeatLid:1156938695635644506>",
                      funnyTexts: [
                        "You caught a Toilet Seat Lid. It asks if you're redecorating the ocean floor.",
                        "A Toilet Seat Lid is your catch! It insists on being called 'The Commode King.'",
                        "You reeled in a Toilet Seat Lid. It claims to be the official throne of the sea.",
                        "A Toilet Seat Lid emerges from the water. It challenges you to a toilet paper duel.",
                        "You found a Toilet Seat Lid. It wants to start a toilet seat museum.",
                        "You pulled out a Toilet Seat Lid. It challenges you to a flush-off.",
                        "You caught a Toilet Seat Lid. It claims to be the king of bathroom humor.",
                        "A Toilet Seat Lid is on your hook! It asks if you have any spare rolls.",
                        "You reeled in a Toilet Seat Lid. It insists on a toilet seat jousting tournament.",
                        "You caught a Toilet Seat Lid. It wants to start a toilet-themed fish party.",
                        "A Toilet Seat Lid is your catch! It tells you that the sea is its bathroom.",
                        "You found a Toilet Seat Lid. It challenges you to a toilet seat lid toss.",
                        "A Toilet Seat Lid emerges from the water. It insists on a toilet seat lid design contest.",
                        "You pulled out a Toilet Seat Lid. It claims to be the master of the porcelain throne.",
                        "You caught a Toilet Seat Lid. It asks if you have any plungers.",
                        "A Toilet Seat Lid is on your hook! It tells you that fish are the real bathroom invaders.",
                        "You reeled in a Toilet Seat Lid. It insists on a toilet seat lid pun battle.",
                        "You caught a Toilet Seat Lid. It challenges you to a toilet seat lid trivia quiz.",
                        "A Toilet Seat Lid is your catch! It claims to be the keeper of bathroom secrets.",
                        "You found a Toilet Seat Lid. It wants to start a toilet seat lid revolution.",
                      ],
                    },

                    {
                      name: "boot",
                      emoji: "<:boot:1156938677176520785>",
                      funnyTexts: [
                        "You reeled in a boot! Looks like you found some lost footwear.",
                        "A boot?! Did someone go swimming with their shoes on again?",
                        "You caught a boot! Maybe it's a rare designer fishing boot?",
                        "A boot is your catch! It asks if you've seen its pair.",
                        "You found a boot. It challenges you to a boot-wearing contest.",
                        "You pulled out a boot. It claims to be the latest fashion trend in the fish world.",
                        "A boot emerges from the water. It wants to start a fish shoe store.",
                        "You caught a boot. It claims to be the left boot from Atlantis.",
                        "You reeled in a boot. It challenges you to a fishy fashion show.",
                        "A boot is your catch! It asks if you've seen its missing sock.",
                        "You found a boot. It claims to have walked the underwater runway.",
                        "A boot emerges from the water. It wants to start a boot-wearing fish club.",
                        "You pulled out a boot. It insists on being called 'Booty' now.",
                        "You caught a boot. It offers you a boot-shaped fish cake recipe.",
                        "You reeled in a boot. It claims to be the most stylish fish in the ocean.",
                      ],
                    },
                    {
                      name: "bottle",
                      emoji: "<:bottle:1156938658667044934>",
                      funnyTexts: [
                        "You found a bottle! There's a message inside, but it's just a grocery list.",
                        "A mysterious bottle washes ashore. It contains a note that says, 'Buy more fish food.'",
                        "You caught a bottle! Maybe there's a genie inside... or just some seawater.",
                        "A bottle is your catch! It asks if you'll be its message in a bottle.",
                        "You reeled in a bottle. It claims to have traveled the seven seas.",
                        "You found a bottle. It wants to start a fishy recycling program.",
                        "A bottle emerges from the water. It challenges you to a message-writing contest.",
                        "You caught a bottle. It claims to be the most interesting bottle in the world.",
                        "You caught a bottle. It asks if you'll be its message in a bottle.",
                        "You reeled in a bottle. It insists on being called 'Bottley' now.",
                        "You found a bottle. It wants to start a message-writing fish club.",
                        "A bottle emerges from the water. It challenges you to a bottle-flipping contest.",
                        "You pulled out a bottle. It claims to be the most interesting bottle in the sea.",
                        "You found a bottle. It offers you a fishy riddle to solve.",
                        "A bottle is your catch! It tells you a fishy secret it heard from the depths.",
                      ],
                    },
                  ];
                  // Select a random item from the array
                  const randomItem =
                    commonFishesToGet[
                      Math.floor(Math.random() * commonFishesToGet.length)
                    ];

                  // Select a random funny text associated with the item
                  const randomFunnyText =
                    randomItem.funnyTexts[
                      Math.floor(Math.random() * randomItem.funnyTexts.length)
                    ];
                  function formatName(name) {
                    return name
                      .split(" ")
                      .map((word, index) =>
                        index === 0
                          ? word.toLowerCase()
                          : word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                      )
                      .join("");
                  }
                  const formattedItemName = formatName(randomItem.name);
                  console.log(formattedItemName);

                  const footerTexts = [
                    "May your net be ever full and your fish tales even taller!",
                    "Keep reeling in the fun!",
                    "Remember, even the smallest fish has a big story!",
                    "Fish on, fellow angler!",
                    "Don't forget to do your fishy victory dance!",
                    "Tight lines and good times!",
                    "Fishing is the reel deal!",
                    "Share your fishy adventures with your fellow sailors!",
                    "Catch a fish, and make a friend!",
                    "May your fishing trips be as deep as the ocean!",
                    "Here's to hooking the big one next time!",
                    "Reel in memories that will last a lifetime!",
                    "Fish, relax, repeat!",
                    "Keep calm and fish on!",
                    "The sea is full of surprises—what's your next catch?",
                    "Life's a beach, and then you fish!",
                    "In the game of fishing, you win or you reel!",
                    "Every fish is a new story to tell.",
                    "Dive into the world of fin-tastic adventures!",
                    "Reel life is the best life!",
                    "Hooked on fishing, addicted to fun!",
                    "May your hooks be sharp, and your fish be plentiful!",
                    "Fish 'til you drop, then fish some more!",
                    "Cast away your worries with every cast!",
                    "Keep your friends close and your fish closer!",
                    "The ocean is calling, and I must go fishing!",
                    "Anglers make the best fishy friends!",
                    "Fishing: the art of drowning worms and saving souls!",
                    "Catch and release—fish and friendships!",
                  ];

                  // Select a random footer text
                  const randomFooterText =
                    footerTexts[Math.floor(Math.random() * footerTexts.length)];
                  const formattedRareItemName = formatName(
                    randomRareFishes.name
                  );
                  // Create an embed to show the result
                  if (chance > 0 && chance < 5) {
                    const rareFishEmbed = new Discord.MessageEmbed()
                      .addField(
                        `${user.username} found a ${randomRareFishes.name} ${randomRareFishes.emoji}`,
                        `${rareFunnyText}`
                      )
                      .setColor("#2B2D31")
                      .setFooter(randomFooterText);
                    db.add(`${formattedRareItemName}_${tokenDB}`, 1);
                    message.channel.send(rareFishEmbed);
                    return;
                  } // Create an embed to show the result
                  const fishEmbed = new Discord.MessageEmbed()
                    .addField(
                      `${user.username} hooked a ${randomItem.name} ${randomItem.emoji}`,
                      `You've just reeled in a remarkable ${randomItem.name}! ${randomFunnyText}`
                    )
                    .setColor("#2B2D31")
                    .setFooter(randomFooterText);
                  db.add(`${formattedItemName}_${tokenDB}`, 1);
                  message.channel.send(fishEmbed);
                }

                // Update boss health and cooldown
                // Send an updated boss message
                const bossHealthBar = createHealthBar(
                  thassormentorBossHealth,
                  1210901,
                  16
                );
                thassormentorBossHealth = thassormentorBossHealth
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const thassormentorBossEmbed = new Discord.MessageEmbed()
                  .setColor("#2B2D31")
                  .setAuthor("Thasormentor, the sea king")
                  .addField(
                    `${thassormentorBossHealth} / 1,210,901`,
                    `${bossHealthBar}`,
                    true
                  )
                  .setImage("https://i.ibb.co/CK1bcZv/thassormentor.gif")
                  .setFooter(randomFooterText);
                await bossMessage.edit(thassormentorBossEmbed);

                // Remove the user's reaction
                reaction.users.remove(user);
              }
            });

            collector.on("end", () => {
              // Remove all reactions when the collector ends
              bossMessage.reactions.removeAll();
            });
          } else {
            var fishingRodBossEmoji = "<a:fishingRod:1156985653867839488>";
            const bossHealthBar = createHealthBar(
              thassormentorBossHealth,
              1210901,
              16
            );
            const bossFooterTexts = [
              "May your fishing rod be the ultimate sea king conqueror!",
              "May the waves of fortune carry you to victory!",
              "Summon your inner fisherman and reel in victory!",
              "Conquer the sea king and make Neptune proud!",
              "May the sea king fear the might of your fishing rod!",
              "Hook, line, and sink that sea king to victory!",
              "Let's show that sea king who's the real catch!",
              "Reel in the sea king and make a splash in history!",
              "May your fishing skills be the stuff of legends!",
              "Fish on, and may the sea king be your greatest trophy!",
            ];

            const randomFooterText =
              bossFooterTexts[
                Math.floor(Math.random() * bossFooterTexts.length)
              ];
            const thassormentorBossEmbed = new Discord.MessageEmbed()
              .setColor("#2B2D31") // Deep purple color
              .setAuthor(`${thassormentorBoss}`) // Add an image of Eldra'zur as the author
              .addField(`${bossHealthProgress}`, `${bossHealthBar}`, true)
              .setImage("https://i.ibb.co/CK1bcZv/thassormentor.gif") // You can use another image to show the boss
              .setFooter(randomFooterText);
            db.set(`thassormentorBossSpawned_${tokenDB}`, true);
            const bossMessage = await message.channel.send(
              thassormentorBossEmbed
            );
            await bossMessage.edit(thassormentorBossEmbed);
            await bossMessage.react(fishingRodBossEmoji);
            // await bossMessage.react(waterSkill);

            db.set(`cooldown_${tokenDB}`, Date.now());
            const filter = (reaction, user) => {
              if (user.id === message.author.id) {
                return ["fishingRod"].includes(reaction.emoji.name);
              }
            };

            const collector = bossMessage.createReactionCollector(filter, {
              time: 500000000,
            });
            const reactedUsers = new Set(); // Initialize an empty set to keep track of users who reacted

            // Schedule the next addition in 3 seconds

            collector.on("collect", async (reaction, user) => {
              if (reaction.emoji.name == "fishingRod") {
                // Handle fishingRodting the boss here
                const currentTime = Date.now();
                const lastfishingRodTime = db.fetch(
                  `didntfishingRodCooldown_${tokenDB}`
                );
                // const bossHealthBar = createHealthBar(
                //   thassormentorBossHealth,
                //   1210901,
                //   16
                // );
                // It's not on cooldown, proceed to deal damage
                const fishzoneWeaponDamage = db.fetch(
                  `fishzoneWeaponDamage_${tokenDB}`
                );
                db.subtract(
                  `thassormentorBossHealth_${tokenDB}`,
                  fishzoneWeaponDamage / 4
                );
                var thassormentorBossHealth =
                  db.fetch(`thassormentorBossHealth_${tokenDB}`) || 1210901;

                if (
                  thassormentorBossHealth < 0 ||
                  thassormentorBossHealth == 0
                ) {
                  // Boss defeated
                  thassormentorBossHealth = 0;

                  bossMessage.reactions.removeAll();
                  db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);
                  db.set(`thassormentorBossSpawned_${tokenDB}`, false);
                  thassormentorBossHealth = thassormentorBossHealth
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                  db.add(`bossesKilledTotal_${tokenDB}`, 1);
                  var chance = Math.floor(Math.random() * 175) + 1;
                  console.log(chance);
                  var moonsShineOfMetalSwordChance =
                    Math.floor(Math.random() * 1000) + 1;
                  console.log(moonsShineOfMetalSwordChance);
                  var weaponName = db.fetch(`wepName_${tokenDB}`);
                  if (weaponName == "daggerOfDeath") {
                    var daggerOfDeathLevel =
                      db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 0;
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
                  db.set(`thassormentorBossHealth_${tokenDB}`, 1210901);
                  const rareFishesToGet = [
                    {
                      name: "LuminaFin",
                      emoji: "<a:luminaFish:1158034789614497813>",
                      funnyTexts: [
                        "You caught a LuminaFin! It lights up your fishing rod with envy.",
                        "A LuminaFin emerges from the depths! It claims to have the brightest personality in the sea.",
                        "You reeled in a LuminaFin. It insists on being your personal fish-sized flashlight.",
                        "A LuminaFin is your catch! It challenges you to a glow-in-the-dark dance-off.",
                        "You found a LuminaFin. It wants to start an underwater light show for fish.",
                        "A LuminaFin appears! It claims to be the disco ball of the deep blue.",
                        "You pulled out a LuminaFin. It asks if you have any spare batteries for its fin.",
                        "You caught a LuminaFin. It insists on being the official mood lighting for your boat.",
                        "A LuminaFin is on your hook! It challenges you to a glow-off with other sea creatures.",
                        "You reeled in a LuminaFin. It wants to start a fishy constellation club.",
                        "A LuminaFin emerges from the water. It claims to be the lighthouse of the ocean floor.",
                        "You found a LuminaFin. It challenges you to a game of underwater flashlight tag.",
                        "A LuminaFin is your catch! It tells you that fish parties are better with a glowing guest.",
                        "You pulled out a LuminaFin. It insists on being the guiding light for lost fish.",
                        "You caught a LuminaFin. It asks if you have any fishy sunglasses for its dazzling glow.",
                      ],
                    },
                    {
                      name: "Bubblegum Blowfish",
                      emoji: "<a:bubblegumBlowfish:1158036690364010549>", // Replace with the actual emoji
                      funnyTexts: [
                        "You caught a Bubblegum Blowfish! It challenges you to a bubble-blowing contest.",
                        "A Bubblegum Blowfish emerges from the water. It insists on being called 'Bubble Buddy.'",
                        "You reeled in a Bubblegum Blowfish. It claims to have the stickiest bubblegum in the sea.",
                        "A Bubblegum Blowfish is your catch! It challenges you to a bubble-popping showdown.",
                        "You found a Bubblegum Blowfish. It wants to start a bubblegum bubblegum pop band.",
                        "You pulled out a Bubblegum Blowfish. It insists on being the bubblegum champion of the ocean.",
                        "You caught a Bubblegum Blowfish. It asks if you have any fish-flavored bubblegum.",
                        "A Bubblegum Blowfish is on your hook! It challenges you to a bubblegum art competition.",
                        "You reeled in a Bubblegum Blowfish. It insists on a bubblegum fashion show.",
                        "You caught a Bubblegum Blowfish. It wants to start a bubblegum academy underwater.",
                      ],
                    },
                    {
                      name: "Disguised Diverfish",
                      emoji: "<a:disguisedDiverfish:1158038321537241098>",
                      funnyTexts: [
                        "You caught a Disguised Diverfish! It claims to be the sneakiest fish in the sea.",
                        "A Disguised Diverfish emerges from the water. It insists on being called 'Master of Disguise.'",
                        "You reeled in a Disguised Diverfish. It challenges you to a fishy costume contest.",
                        "A Disguised Diverfish is your catch! It asks if you have any spare disguises.",
                        "You found a Disguised Diverfish. It wants to start a fishy spy agency.",
                        "You pulled out a Disguised Diverfish. It insists on being the undercover agent of the ocean.",
                        "You caught a Disguised Diverfish. It claims to have the best fish disguises in the sea.",
                        "A Disguised Diverfish is on your hook! It asks if you've seen any fishy mysteries to solve.",
                        "You reeled in a Disguised Diverfish. It insists on a fishy disguise fashion show.",
                        "You caught a Disguised Diverfish. It wants to start a fishy disguise party underwater.",
                      ],
                    },
                    // Add more rare fishes with funnyTexts here if needed
                  ];
                  const randomRareFishes =
                    rareFishesToGet[
                      Math.floor(Math.random() * rareFishesToGet.length)
                    ];

                  // Select a random funny text associated with the item
                  const rareFunnyText =
                    randomRareFishes.funnyTexts[
                      Math.floor(
                        Math.random() * randomRareFishes.funnyTexts.length
                      )
                    ];
                  const commonFishesToGet = [
                    {
                      name: "Sarcastic fringehead",
                      emoji: "<:sarcasticFringehead:1156929582335799388>",
                      funnyTexts: [
                        "You reeled in a Sarcastic fringehead. It sarcastically compliments your fishing skills.",
                        "A Sarcastic fringehead appeared! It's not very impressed with your fishing technique.",
                        "You caught a Sarcastic fringehead. It gives you a snarky fishy grin.",
                        "It's a Sarcastic fringehead! It starts a stand-up comedy routine about fishing.",
                        "A Sarcastic fringehead is your catch! It tells you a fishy joke.",
                        "You pulled out a Sarcastic fringehead. It claims to be the world champion in underwater chess.",
                        "You caught a Sarcastic fringehead. It challenges you to a fish-off!",
                        "A Sarcastic fringehead is on your hook! It asks if you can teach it to fish.",
                        "You caught a Sarcastic fringehead. It claims to be the fishiest stand-up comedian.",
                        "A Sarcastic fringehead is on your hook! It challenges you to a fishy debate.",
                        "You reeled in a Sarcastic fringehead. It offers you a snarky fishy critique of your fishing rod.",
                        "A Sarcastic fringehead appeared! It tells you the secret to catching the perfect fish: be more sarcastic.",
                        "You caught a Sarcastic fringehead. It asks if you have a fishy comeback for its sarcasm.",
                        "You pulled out a Sarcastic fringehead. It claims to be the CEO of Fishy Insults Inc.",
                        "A Sarcastic fringehead is your catch! It brags about being the snarkiest fish in the sea.",
                      ],
                    },
                    {
                      name: "Salmon",
                      emoji: "<:salmon:1156929627126771784>",
                      funnyTexts: [
                        "You pulled out a salmon! It's doing its best salmon impression.",
                        "It's a salmon! It does a little fishy dance for you.",
                        "You caught a salmon, and it asks if you have any lemon and butter.",
                        "A salmon is your catch! It says it was on its way to a sushi party.",
                        "You reeled in a salmon. It challenges you to a swimming race.",
                        "You caught a salmon. It claims to be the Michael Jordan of fish.",
                        "A salmon appears! It's practicing its synchronized swimming routine.",
                        "You found a salmon. It starts singing a fishy love song.",
                        "You reeled in a salmon. It starts a fishy dance party on your boat.",
                        "You caught a salmon. It challenges you to a game of underwater chess.",
                        "A salmon is your catch! It claims to be the world record holder in fish hurdling.",
                        "You found a salmon. It asks if you're up for a fishy game of hide and seek.",
                        "A salmon emerges from the water! It gives you a salmon-sized high-five.",
                        "You pulled out a salmon. It asks if you can teach it to fish for compliments.",
                        "You caught a salmon. It claims to be the fishy ambassador to Atlantis.",
                      ],
                    },
                    {
                      name: "Smelly fish",
                      emoji: "<:smellyFish:1156929529894424666>",
                      funnyTexts: [
                        "You found a smelly fish! It lives up to its name.",
                        "A smelly fish emerges from the water. You might need a nose plug.",
                        "You caught a smelly fish. It's not the catch of the day.",
                        "It's a smelly fish! It offers to give you fishy perfume tips.",
                        "A smelly fish is your catch! It blames a nearby fish for the smell.",
                        "You reeled in a smelly fish. It asks if you have any fish deodorant.",
                        "You caught a smelly fish. It challenges you to a fish-eating contest.",
                        "A smelly fish appears! It claims to be the official fish of bad smells.",
                        "You reeled in a smelly fish. It suggests opening a fishy perfume shop.",
                        "A smelly fish emerges from the water. It challenges you to a fishy eating contest.",
                        "You caught a smelly fish. It claims to have invented fishy deodorant.",
                        "It's a smelly fish! It starts a fishy yoga session to improve its scent.",
                        "A smelly fish is your catch! It offers you a smelly fish handshake.",
                        "You found a smelly fish. It claims to be the chief odor officer of the ocean.",
                        "You caught a smelly fish. It asks if you have any fishy air freshener.",
                      ],
                    },
                    {
                      name: "burned fish",
                      emoji: "<:burnedfish:1156939483267207220>",
                      funnyTexts: [
                        "You caught a burned fish. It looks like it had a rough time on the grill.",
                        "A charred fish appears! It's a bit crispy around the edges.",
                        "It's a burned fish! Someone left it on the barbecue for too long.",
                        "A burned fish is your catch! It says it's fire-resistant now.",
                        "You reeled in a burned fish. It asks for sunscreen.",
                        "You caught a burned fish. It's practicing its fire-breathing trick.",
                        "A burned fish emerges from the water. It wants to start a barbecue club.",
                        "You found a burned fish. It claims to be the secret ingredient for BBQ sauce.",
                        "You caught a burned fish. It claims to be the official mascot of BBQ parties.",
                        "A burned fish is your catch! It says it's fireproof now and ready for adventures.",
                        "You found a burned fish. It challenges you to a fishy barbecue cook-off.",
                        "A burned fish emerges from the water. It offers to toast marshmallows for you.",
                        "You reeled in a burned fish. It claims to have tanned to perfection on the grill.",
                        "You pulled out a burned fish. It asks if you have any fishy sunscreen.",
                        "You caught a burned fish. It insists on being called 'Crispy' from now on.",
                      ],
                    },
                    {
                      name: "Grumpy Catfish",
                      emoji: "<:grumpyCatfish:1156929452056522812>",
                      funnyTexts: [
                        "You caught a Grumpy Catfish. It looks like it didn't want to be caught.",
                        "A Grumpy Catfish is your catch! It claims to have a PhD in catfishology.",
                        "You reeled in a Grumpy Catfish. It insists on being called 'Professor Whiskers.'",
                        "A Grumpy Catfish emerges from the water. It's not a morning fish.",
                        "You found a Grumpy Catfish. It wants to start a grumpy fish support group.",
                        "You pulled out a Grumpy Catfish. It challenges you to a staring contest.",
                        "You caught a Grumpy Catfish. It claims to have the grumpiest meow in the sea.",
                        "A Grumpy Catfish is on your hook! It asks if you have any fishnip.",
                        "You reeled in a Grumpy Catfish. It insists on a grumpy fish selfie.",
                        "You caught a Grumpy Catfish. It wants to start a grumpy catfish meme page.",
                        "A Grumpy Catfish is your catch! It tells you that fishing is for amateurs.",
                        "You found a Grumpy Catfish. It challenges you to a grumpy-off.",
                        "A Grumpy Catfish emerges from the water. It insists on a grumpy fish philosophy debate.",
                        "You pulled out a Grumpy Catfish. It claims to be the grumpiest fish in the ocean.",
                        "You caught a Grumpy Catfish. It asks if you can teach it to smile.",
                        "A Grumpy Catfish is on your hook! It tells you that fish puns are beneath it.",
                        "You reeled in a Grumpy Catfish. It insists on a grumpy fish poetry contest.",
                        "You caught a Grumpy Catfish. It challenges you to a grumpy fish stare-down.",
                        "A Grumpy Catfish is your catch! It claims to be the grandmaster of grumpiness.",
                        "You found a Grumpy Catfish. It wants to start a grumpy fish revolution.",
                      ],
                    },
                    {
                      name: "Pancake Fish",
                      emoji: "<:pancakeFish:1156929418170744852>",
                      funnyTexts: [
                        "You caught a Pancake Fish! It's a bit flat, but it looks delicious.",
                        "A Pancake Fish is your catch! It insists on being called 'Flapjack Fin.'",
                        "You reeled in a Pancake Fish. It claims to have the world record for flips.",
                        "A Pancake Fish emerges from the water. It challenges you to a pancake-eating contest.",
                        "You found a Pancake Fish. It wants to start a pancake-themed fish cafe.",
                        "You pulled out a Pancake Fish. It challenges you to a syrup-drinking duel.",
                        "You caught a Pancake Fish. It claims to be the king of breakfast in the sea.",
                        "A Pancake Fish is on your hook! It asks if you have any butter.",
                        "You reeled in a Pancake Fish. It insists on a pancake flipping competition.",
                        "You caught a Pancake Fish. It wants to start a pancake party underwater.",
                        "A Pancake Fish is your catch! It tells you that fish like brunch too.",
                        "You found a Pancake Fish. It challenges you to a pancake stack-off.",
                        "A Pancake Fish emerges from the water. It insists on pancake poetry readings.",
                        "You pulled out a Pancake Fish. It claims to be the syrupy sultan of the sea.",
                        "You caught a Pancake Fish. It asks if you have any maple syrup.",
                      ],
                    },

                    {
                      name: "Disco Jellyfish",
                      emoji: "<:discoJellyfish:1156929355465900133>",
                      funnyTexts: [
                        "You caught a Disco Jellyfish! It's ready to dance the night away.",
                        "A Disco Jellyfish is your catch! It insists on being called 'Jelly Groove.'",
                        "You reeled in a Disco Jellyfish. It claims to have the best dance moves in the sea.",
                        "A Disco Jellyfish emerges from the water. It challenges you to a dance-off.",
                        "You found a Disco Jellyfish. It wants to start a dance club for sea creatures.",
                        "You pulled out a Disco Jellyfish. It challenges you to a disco ball spin-off.",
                        "You caught a Disco Jellyfish. It claims to be the disco king of the ocean.",
                        "A Disco Jellyfish is on your hook! It asks if you have any funky beats.",
                        "You reeled in a Disco Jellyfish. It insists on a dance floor showdown.",
                        "You caught a Disco Jellyfish. It wants to start a dance party on your boat.",
                        "A Disco Jellyfish is your catch! It tells you that underwater raves are the best.",
                        "You found a Disco Jellyfish. It challenges you to a disco dance battle.",
                        "A Disco Jellyfish emerges from the water. It insists on disco-themed karaoke.",
                        "You pulled out a Disco Jellyfish. It claims to be the grooviest fish in the sea.",
                        "You caught a Disco Jellyfish. It asks if you have any disco lights.",
                      ],
                    },
                    {
                      name: "Soda Canfish",
                      emoji: "<:sodaCanfish:1156929327817035788>",
                      funnyTexts: [
                        "You caught a Soda Canfish! It's a bit fizzy but surprisingly refreshing.",
                        "A Soda Canfish is your catch! It insists on being called 'Fizzmaster.'",
                        "You reeled in a Soda Canfish. It claims to have the secret to carbonation.",
                        "A Soda Canfish emerges from the water. It challenges you to a soda chugging contest.",
                        "You found a Soda Canfish. It wants to start a soda can recycling initiative.",
                        "You pulled out a Soda Canfish. It challenges you to a soda can crushing competition.",
                        "You caught a Soda Canfish. It claims to be the king of bubbly drinks in the sea.",
                        "A Soda Canfish is on your hook! It asks if you have any straws.",
                        "You reeled in a Soda Canfish. It insists on a fizzy drink taste test.",
                        "You caught a Soda Canfish. It wants to start a soda party underwater.",
                        "A Soda Canfish is your catch! It tells you that fish enjoy a good soda pop.",
                        "You found a Soda Canfish. It challenges you to a soda can balancing act.",
                        "A Soda Canfish emerges from the water. It insists on soda-themed trivia games.",
                        "You pulled out a Soda Canfish. It claims to be the most refreshing fish in the sea.",
                        "You caught a Soda Canfish. It asks if you have any ice cubes.",
                      ],
                    },
                    {
                      name: "Lava Lamp Eel",
                      emoji: "<:lavaLampEel:1156939953448681472>",
                      funnyTexts: [
                        "You caught a Lava Lamp Eel! It's groovy and glows in vibrant colors.",
                        "A Lava Lamp Eel is your catch! It insists on being called 'Lava Dancer.'",
                        "You reeled in a Lava Lamp Eel. It claims to have the best light show in the sea.",
                        "A Lava Lamp Eel emerges from the water. It challenges you to a dance-off under the lava lamp.",
                        "You found a Lava Lamp Eel. It wants to start an underwater discotheque.",
                        "You pulled out a Lava Lamp Eel. It challenges you to a lava lamp swirling contest.",
                        "You caught a Lava Lamp Eel. It claims to be the grooviest eel in the ocean.",
                        "A Lava Lamp Eel is on your hook! It asks if you have any glow sticks.",
                        "You reeled in a Lava Lamp Eel. It insists on a dance party under the lava lamp.",
                        "You caught a Lava Lamp Eel. It wants to start a psychedelic fish festival.",
                        "A Lava Lamp Eel is your catch! It tells you that fish have great taste in decor.",
                        "You found a Lava Lamp Eel. It challenges you to a lava lamp design competition.",
                        "A Lava Lamp Eel emerges from the water. It insists on lava lamp-themed karaoke.",
                        "You pulled out a Lava Lamp Eel. It claims to be the most illuminating fish in the sea.",
                        "You caught a Lava Lamp Eel. It asks if you have any disco balls.",
                      ],
                    },
                    {
                      name: "Rubber Duckyfish",
                      emoji: "<:rubberDuckyfish:1156938911004766240>",
                      funnyTexts: [
                        "You caught a Rubber Duckyfish! It squeaks when you squeeze it.",
                        "A Rubber Duckyfish is your catch! It insists on being called 'Ducky McFish.'",
                        "You reeled in a Rubber Duckyfish. It claims to be the world's favorite bath toy fish.",
                        "A Rubber Duckyfish emerges from the water. It challenges you to a rubber ducky race.",
                        "You found a Rubber Duckyfish. It wants to start a rubber ducky parade for fish.",
                        "You pulled out a Rubber Duckyfish. It challenges you to a rubber ducky squeaking contest.",
                        "You caught a Rubber Duckyfish. It claims to be the quackiest fish in the sea.",
                        "A Rubber Duckyfish is on your hook! It asks if you have any bubble bath.",
                        "You reeled in a Rubber Duckyfish. It insists on a rubber ducky fashion show.",
                        "You caught a Rubber Duckyfish. It wants to start a bath time party underwater.",
                        "A Rubber Duckyfish is your catch! It tells you that fish love a good soak.",
                        "You found a Rubber Duckyfish. It challenges you to a rubber ducky trivia quiz.",
                        "A Rubber Duckyfish emerges from the water. It insists on rubber ducky karaoke.",
                        "You pulled out a Rubber Duckyfish. It claims to be the squeakiest fish in the sea.",
                        "You caught a Rubber Duckyfish. It asks if you have any duck snacks.",
                      ],
                    },

                    {
                      name: "Ninja Starfish",
                      emoji: "<:ninjaStarfish:1156938871695757432>",
                      funnyTexts: [
                        "You caught a Ninja Starfish! It's a master of stealth and underwater combat.",
                        "A Ninja Starfish is your catch! It insists on being called 'Shuriken Shinobi.'",
                        "You reeled in a Ninja Starfish. It claims to have trained with fish ninjas.",
                        "A Ninja Starfish emerges from the water. It challenges you to a ninja duel.",
                        "You found a Ninja Starfish. It wants to start a secret fish ninja academy.",
                        "You pulled out a Ninja Starfish. It challenges you to a throwing star competition.",
                        "You caught a Ninja Starfish. It claims to be the stealthiest fish in the sea.",
                        "A Ninja Starfish is on your hook! It asks if you have any seaweed for camouflage.",
                        "You reeled in a Ninja Starfish. It insists on a ninja fish training session.",
                        "You caught a Ninja Starfish. It wants to start a fish ninja clan underwater.",
                        "A Ninja Starfish is your catch! It tells you that fish ninjas are always watching.",
                        "You found a Ninja Starfish. It challenges you to a ninja obstacle course.",
                        "A Ninja Starfish emerges from the water. It insists on ninja-themed riddles.",
                        "You pulled out a Ninja Starfish. It claims to be the sneakiest fish in the sea.",
                        "You caught a Ninja Starfish. It asks if you have any sushi recipes.",
                      ],
                    },
                    {
                      name: "Alien Anglerfish",
                      emoji: "<:alienAnglerfish:1156938740586000394>",
                      funnyTexts: [
                        "You caught an Alien Anglerfish! It's here to probe your fishing skills.",
                        "An Alien Anglerfish is your catch! It insists on being called 'Extraterrestrial Eel.'",
                        "You reeled in an Alien Anglerfish. It claims to have traveled from another galaxy for this fishing trip.",
                        "An Alien Anglerfish emerges from the water. It challenges you to a space-themed fish-off.",
                        "You found an Alien Anglerfish. It wants to start an interstellar fishing club.",
                        "You pulled out an Alien Anglerfish. It challenges you to a UFO-spotting contest.",
                        "You caught an Alien Anglerfish. It claims to be the most extraterrestrial fish in the sea.",
                        "An Alien Anglerfish is on your hook! It asks if you have any alien bait.",
                        "You reeled in an Alien Anglerfish. It insists on a cosmic fishing expedition.",
                        "You caught an Alien Anglerfish. It wants to start an intergalactic fish party underwater.",
                        "An Alien Anglerfish is your catch! It tells you that fish from other planets love fishing too.",
                        "You found an Alien Anglerfish. It challenges you to an alien trivia quiz.",
                        "An Alien Anglerfish emerges from the water. It insists on probing fishy mysteries.",
                        "You pulled out an Alien Anglerfish. It claims to have the most advanced fishing technology in the sea.",
                        "You caught an Alien Anglerfish. It asks if you have any space snacks.",
                      ],
                    },

                    {
                      name: "Pirate Parrotfish",
                      emoji: "<:pirateParrotfish:1156938717781573733>",
                      funnyTexts: [
                        "You caught a Pirate Parrotfish! It's ready to sail the seven seas with you.",
                        "A Pirate Parrotfish is your catch! It insists on being called 'Captain Squawks.'",
                        "You reeled in a Pirate Parrotfish. It claims to have buried treasure on a distant fish island.",
                        "A Pirate Parrotfish emerges from the water. It challenges you to a pirate-themed fish duel.",
                        "You found a Pirate Parrotfish. It wants to start a fish pirate crew on your boat.",
                        "You pulled out a Pirate Parrotfish. It challenges you to a plank-walking competition.",
                        "You caught a Pirate Parrotfish. It claims to be the most swashbuckling fish in the sea.",
                        "A Pirate Parrotfish is on your hook! It asks if you have any fishy grog.",
                        "You reeled in a Pirate Parrotfish. It insists on a pirate fish treasure hunt.",
                        "You caught a Pirate Parrotfish. It wants to start a fishy mutiny underwater.",
                        "A Pirate Parrotfish is your catch! It tells you that fish can be pirates too, arrr!",
                        "You found a Pirate Parrotfish. It challenges you to a pirate-themed sea shanty sing-off.",
                        "A Pirate Parrotfish emerges from the water. It insists on pirate-themed fishy riddles.",
                        "You pulled out a Pirate Parrotfish. It claims to have the deadliest beak in the sea.",
                        "You caught a Pirate Parrotfish. It asks if you have any pirate flags.",
                      ],
                    },
                    {
                      name: "Toilet Seat Lid",
                      emoji: "<:toiletSeatLid:1156938695635644506>",
                      funnyTexts: [
                        "You caught a Toilet Seat Lid. It asks if you're redecorating the ocean floor.",
                        "A Toilet Seat Lid is your catch! It insists on being called 'The Commode King.'",
                        "You reeled in a Toilet Seat Lid. It claims to be the official throne of the sea.",
                        "A Toilet Seat Lid emerges from the water. It challenges you to a toilet paper duel.",
                        "You found a Toilet Seat Lid. It wants to start a toilet seat museum.",
                        "You pulled out a Toilet Seat Lid. It challenges you to a flush-off.",
                        "You caught a Toilet Seat Lid. It claims to be the king of bathroom humor.",
                        "A Toilet Seat Lid is on your hook! It asks if you have any spare rolls.",
                        "You reeled in a Toilet Seat Lid. It insists on a toilet seat jousting tournament.",
                        "You caught a Toilet Seat Lid. It wants to start a toilet-themed fish party.",
                        "A Toilet Seat Lid is your catch! It tells you that the sea is its bathroom.",
                        "You found a Toilet Seat Lid. It challenges you to a toilet seat lid toss.",
                        "A Toilet Seat Lid emerges from the water. It insists on a toilet seat lid design contest.",
                        "You pulled out a Toilet Seat Lid. It claims to be the master of the porcelain throne.",
                        "You caught a Toilet Seat Lid. It asks if you have any plungers.",
                        "A Toilet Seat Lid is on your hook! It tells you that fish are the real bathroom invaders.",
                        "You reeled in a Toilet Seat Lid. It insists on a toilet seat lid pun battle.",
                        "You caught a Toilet Seat Lid. It challenges you to a toilet seat lid trivia quiz.",
                        "A Toilet Seat Lid is your catch! It claims to be the keeper of bathroom secrets.",
                        "You found a Toilet Seat Lid. It wants to start a toilet seat lid revolution.",
                      ],
                    },

                    {
                      name: "boot",
                      emoji: "<:boot:1156938677176520785>",
                      funnyTexts: [
                        "You reeled in a boot! Looks like you found some lost footwear.",
                        "A boot?! Did someone go swimming with their shoes on again?",
                        "You caught a boot! Maybe it's a rare designer fishing boot?",
                        "A boot is your catch! It asks if you've seen its pair.",
                        "You found a boot. It challenges you to a boot-wearing contest.",
                        "You pulled out a boot. It claims to be the latest fashion trend in the fish world.",
                        "A boot emerges from the water. It wants to start a fish shoe store.",
                        "You caught a boot. It claims to be the left boot from Atlantis.",
                        "You reeled in a boot. It challenges you to a fishy fashion show.",
                        "A boot is your catch! It asks if you've seen its missing sock.",
                        "You found a boot. It claims to have walked the underwater runway.",
                        "A boot emerges from the water. It wants to start a boot-wearing fish club.",
                        "You pulled out a boot. It insists on being called 'Booty' now.",
                        "You caught a boot. It offers you a boot-shaped fish cake recipe.",
                        "You reeled in a boot. It claims to be the most stylish fish in the ocean.",
                      ],
                    },
                    {
                      name: "bottle",
                      emoji: "<:bottle:1156938658667044934>",
                      funnyTexts: [
                        "You found a bottle! There's a message inside, but it's just a grocery list.",
                        "A mysterious bottle washes ashore. It contains a note that says, 'Buy more fish food.'",
                        "You caught a bottle! Maybe there's a genie inside... or just some seawater.",
                        "A bottle is your catch! It asks if you'll be its message in a bottle.",
                        "You reeled in a bottle. It claims to have traveled the seven seas.",
                        "You found a bottle. It wants to start a fishy recycling program.",
                        "A bottle emerges from the water. It challenges you to a message-writing contest.",
                        "You caught a bottle. It claims to be the most interesting bottle in the world.",
                        "You caught a bottle. It asks if you'll be its message in a bottle.",
                        "You reeled in a bottle. It insists on being called 'Bottley' now.",
                        "You found a bottle. It wants to start a message-writing fish club.",
                        "A bottle emerges from the water. It challenges you to a bottle-flipping contest.",
                        "You pulled out a bottle. It claims to be the most interesting bottle in the sea.",
                        "You found a bottle. It offers you a fishy riddle to solve.",
                        "A bottle is your catch! It tells you a fishy secret it heard from the depths.",
                      ],
                    },
                  ];
                  // Select a random item from the array
                  const randomItem =
                    commonFishesToGet[
                      Math.floor(Math.random() * commonFishesToGet.length)
                    ];

                  // Select a random funny text associated with the item
                  const randomFunnyText =
                    randomItem.funnyTexts[
                      Math.floor(Math.random() * randomItem.funnyTexts.length)
                    ];
                  function formatName(name) {
                    return name
                      .split(" ")
                      .map((word, index) =>
                        index === 0
                          ? word.toLowerCase()
                          : word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                      )
                      .join("");
                  }
                  const formattedItemName = formatName(randomItem.name);
                  const formattedRareItemName = formatName(
                    randomRareFishes.name
                  );
                  console.log(formattedItemName);

                  const footerTexts = [
                    "May your net be ever full and your fish tales even taller!",
                    "Keep reeling in the fun!",
                    "Remember, even the smallest fish has a big story!",
                    "Fish on, fellow angler!",
                    "Don't forget to do your fishy victory dance!",
                    "Tight lines and good times!",
                    "Fishing is the reel deal!",
                    "Share your fishy adventures with your fellow sailors!",
                    "Catch a fish, and make a friend!",
                    "May your fishing trips be as deep as the ocean!",
                    "Here's to hooking the big one next time!",
                    "Reel in memories that will last a lifetime!",
                    "Fish, relax, repeat!",
                    "Keep calm and fish on!",
                    "The sea is full of surprises—what's your next catch?",
                    "Life's a beach, and then you fish!",
                    "In the game of fishing, you win or you reel!",
                    "Every fish is a new story to tell.",
                    "Dive into the world of fin-tastic adventures!",
                    "Reel life is the best life!",
                    "Hooked on fishing, addicted to fun!",
                    "May your hooks be sharp, and your fish be plentiful!",
                    "Fish 'til you drop, then fish some more!",
                    "Cast away your worries with every cast!",
                    "Keep your friends close and your fish closer!",
                    "The ocean is calling, and I must go fishing!",
                    "Anglers make the best fishy friends!",
                    "Fishing: the art of drowning worms and saving souls!",
                    "Catch and release—fish and friendships!",
                  ];

                  // Select a random footer text
                  const randomFooterText =
                    footerTexts[Math.floor(Math.random() * footerTexts.length)];

                  // Create an embed to show the result
                  if (chance > 0 && chance < 3) {
                    const rareFishEmbed = new Discord.MessageEmbed()
                      .addField(
                        `${user.username} found a ${randomRareFishes.name} ${randomRareFishes.emoji}`,
                        `${rareFunnyText}`
                      )
                      .setColor("#2B2D31")
                      .setFooter(randomFooterText);
                    db.add(`${formattedRareItemName}_${tokenDB}`, 1);
                    message.channel.send(rareFishEmbed);
                    return;
                  }
                  const fishEmbed = new Discord.MessageEmbed()
                    .addField(
                      `${user.username} hooked a ${randomItem.name} ${randomItem.emoji}`,
                      `${randomFunnyText}`
                    )
                    .setColor("#2B2D31")
                    .setFooter(randomFooterText);
                  db.add(`${formattedItemName}_${tokenDB}`, 1);
                  message.channel.send(fishEmbed);
                }
                // Update boss health and cooldown
                // Send an updated boss message
                const bossHealthBar = createHealthBar(
                  thassormentorBossHealth,
                  1210901,
                  16
                );
                thassormentorBossHealth = thassormentorBossHealth
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const thassormentorBossEmbed = new Discord.MessageEmbed()
                  .setColor("#2B2D31")
                  .setAuthor("Thasormentor, the sea king")
                  .addField(
                    `${thassormentorBossHealth} / 1,210,901`,
                    `${bossHealthBar}`,
                    true
                  )
                  .setImage("https://i.ibb.co/CK1bcZv/thassormentor.gif")
                  .setFooter(randomFooterText);
                await bossMessage.edit(thassormentorBossEmbed);

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

      // Set the cooldown timestamp
      db.set(cooldownKey, currentTime);
    }
  },
};
