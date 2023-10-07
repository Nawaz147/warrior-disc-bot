const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
module.exports = {
  name: "token",
  description: "Stores your name as a token",
  aliases: ["token"],
  usage: "token",
  run: async (client, message, args) => {
    const update = db.fetch(`updateInProgress`);
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!args[0]) {
      message.channel.send("Usage: token me.x");
      return;
    } else if (update == true && message.author.id !== "768747976767832084") {
      const updateInProgressEmbed = new Discord.MessageEmbed()
        .setTitle(`Temporary Command Suspension`)
        .setDescription(
          `
Sorry ${currentUser.username} , commands are disabled at the moment.
The bot is currently undergoing an update. Please be patient!          
`
        )
        .setColor("#3498db")
        .setTimestamp();
      message.channel.send(updateInProgressEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
      return;
    }

    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const tokenUser = db.fetch(`nameofUser_${user.id}.${tokenDB}`);

    if (args[0] === tokenDB) {
      const embed = new MessageEmbed()
        .setTitle("Token")
        .setDescription(`Hey! this is your token`)
        .setColor("#00ff00")
        .setFooter(`${user.username}`);
      message.channel.send(embed);
      return;
    }

    if (args[0] === "me") {
      if (!tokenDB) {
        let token =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        let embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s token`)
          .setDescription(`Your new token: ||${token}||`)
          .setColor("GREEN");
        message.channel.send(`Your new token has been sent on your dms`);
        const apsEmbed = new Discord.MessageEmbed()
          .setTitle(`ACHIEVEMENT COMPLETE - Enshrined as a Mysterionix legend`)
          .setDescription(`${user} You gained 200 aps`)
          .setColor("#00FF00");
        message.channel.send(apsEmbed);

        user.send(embed);
        setTimeout(() => {
          const guide1Embed = new Discord.MessageEmbed()
            .setTitle("Guide")
            .setDescription(
              `Type tos.x to check terms of service and type tos accept.x to accept and get access to playing `
            )
            .setColor(`#0000FF`);
          message.channel.send(guide1Embed);
        }, 3000);
        // Store the token in the database
        db.set(`${user.id}.valoriumToken`, token);
        db.set(`enshrinedAsAMysterionixLegend_${token}`, true);
        db.set(`tokenExists_${token}`, true);
        db.add(`achievementPoints_${token}`, 200);
        console.log(db.fetch(`achievementPoints_${token}`));

        // Save the current date (day, month, and year) in the database
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getFullYear()}`;
        db.set(`${user.id}.tokenCreationDate`, formattedDate);
      } else {
        message.channel.send("Your token has been sent on your dms.");
        user.send(`Your Mysterionix token: ||${tokenDB}||`);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      }
      return;
    }
    function simulateLoading(duration, progressCallback) {
      return new Promise((resolve) => {
        const interval = 100;
        let progress = 0;

        const timer = setInterval(() => {
          progress += (interval / duration) * 100;
          if (progress >= 100) {
            clearInterval(timer);
            progressCallback(100);
            resolve();
          } else {
            progressCallback(Math.round(progress));
          }
        }, interval);
      });
    }
    if (args[0] == "change") {
      const mysterionixProActivated =
        db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
      if (mysterionixProActivated == false) {
        const premiumUserEmbed = new Discord.MessageEmbed()
          .setTitle("Premium Command")
          .setDescription(
            `This command is only for premium users. Upgrade to Mysterionix Pro for exclusive benefits!`
          )
          .setColor("#ffd700")
          .setThumbnail("https://i.ibb.co/SwtWtK5/mysterionix-pro-final.gif");
        message.channel.send(premiumUserEmbed);
        return;
      } else {
        var newToken = args[1];

        if (message.guild) {
          // If in a guild, inform the user to use the command in DMs
          const dmOnlyEmbed = new Discord.MessageEmbed()
            .setTitle("Command Restricted")
            .setDescription(
              "This command can only be used in DMs (Direct Messages)."
            )
            .setColor("#ff0000");
          message.channel.send(dmOnlyEmbed);
          return;
        } else if (!/^[a-zA-Z0-9]+$/.test(newToken)) {
          message.channel.send(
            "Token must contain only alphanumeric characters."
          );
          return;
        }
        if (!newToken) {
          message.channel.send(`Enter a token which you want to keep!`);
          return;
        } else if (newToken.length < 8) {
          message.channel.send(`Token must be at least 8 characters long.`);
          return;
        } else if (newToken.length > 15) {
          message.channel.send(`Token cannnot be more than 15 characters`);
          return;
        } else if (db.fetch(`tokenExists_${newToken}`) == true) {
          message.channel.send(`Failed to keep that as your token`);
        } else {
          timeout = 7 * 24 * 60 * 60 * 1000;
          var cooldown = await db.fetch(
            `tokenChangeCooldown_${message.author.id}`
          );
          if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
            let time = timeout - (Date.now() - cooldown);

            let days = Math.floor(time / (24 * 60 * 60 * 1000));
            let hours = Math.floor(
              (time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
            );
            let minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
            let seconds = Math.floor((time % (60 * 1000)) / 1000);

            let timeEmbed = new Discord.MessageEmbed()
              .setColor("#FFFFFF") // A captivating orange color
              .setTitle("Take a break!") // An intense title
              .setDescription(
                `You need to wait ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds to change your token again!`
              );
            message.channel.send(timeEmbed);
            return;
          }
          db.set(`tokenChangeCooldown_${message.author.id}`, Date.now());

          const loadingMessage = await message.channel.send(
            "changing your token... Please wait."
          );

          // Simulate a delay for database operations
          await simulateLoading(100, (progress) => {
            // Update the loading message with the percentage
            if (progress == 100) {
              const embed = new Discord.MessageEmbed()
                .setTitle(`${user.username}'s new token`)
                .setDescription(`Your new token: ||${newToken}||`)
                .setColor("GREEN");
              loadingMessage.edit("Token changed");
              user.send(embed);
            }
          });
          db.set(
            `money_${newToken}.pocket`,
            db.fetch(`money_${tokenDB}.pocket`) || 0
          );
          db.set(`ruix_${newToken}`, db.fetch(`ruix_${tokenDB}`) || 0);
          db.set(`key_${newToken}`, db.fetch(`key_${tokenDB}`) || 0);
          db.set(`goldBar_${newToken}`, db.fetch(`goldBar_${tokenDB}`) || 0);
          db.set(`texarus_${newToken}`, db.fetch(`texarus_${tokenDB}`) || 0);
          db.set(`waetra_${newToken}`, db.fetch(`waetra_${tokenDB}`) || 0);
          db.set(`rasheta_${newToken}`, db.fetch(`rasheta_${tokenDB}`) || 0);
          db.set(
            `natureDaggers_${newToken}`,
            db.fetch(`natureDaggers_${tokenDB}`) || 0
          );
          db.set(
            `immortalGun_${newToken}`,
            db.fetch(`immortalGun_${tokenDB}`) || 0
          );
          db.set(
            `daggerOfDeath_${newToken}`,
            db.fetch(`daggerOfDeath_${tokenDB}`) || 0
          );
          db.set(
            `awakeningGem_${newToken}`,
            db.fetch(`awakeningGem_${tokenDB}`) || 0
          );
          db.set(
            `eliteAwakeningGem_${newToken}`,
            db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0
          );
          db.set(
            `vortexOrb_${newToken}`,
            db.fetch(`vortexOrb_${tokenDB}`) || 0
          );
          db.set(
            `verdantLeaf_${newToken}`,
            db.fetch(`verdantLeaf_${tokenDB}`) || 0
          );
          db.set(
            `celestialMoonstone_${newToken}`,
            db.fetch(`celestialMoonstone_${tokenDB}`) || 0
          );
          db.set(
            `crystallineCorestone_${newToken}`,
            db.fetch(`crystallineCorestone_${tokenDB}`) || 0
          );
          db.set(
            `tomeOfEverlastingWisdom_${newToken}`,
            db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0
          );
          db.set(
            `goldenGhostKnightSet_${newToken}`,
            db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0
          );
          db.set(
            `supremeMagicalSet_${newToken}`,
            db.fetch(`supremeMagicalSet_${tokenDB}`) || 0
          );
          db.set(
            `frozenSet_${newToken}`,
            db.fetch(`frozenSet_${tokenDB}`) || 0
          );
          db.set(
            `superGolemSet_${newToken}`,
            db.fetch(`superGolemSet_${tokenDB}`) || 0
          );
          db.set(
            `arcaneSenseiSet_${newToken}`,
            db.fetch(`arcaneSenseiSet_${tokenDB}`) || 0
          );
          db.set(
            `dawnfireSet_${newToken}`,
            db.fetch(`dawnfireSet_${tokenDB}`) || 0
          );
          db.set(
            `intrepidSet_${newToken}`,
            db.fetch(`intrepidSet_${tokenDB}`) || 0
          );
          db.set(
            `medusaSet_${newToken}`,
            db.fetch(`medusaSet_${tokenDB}`) || 0
          );
          db.set(
            `rustyGears_${newToken}`,
            db.fetch(`rustyGears_${tokenDB}`) || 0
          );
          db.set(`dustbin_${newToken}`, db.fetch(`dustbin_${tokenDB}`) || 0);
          db.set(
            `newspaper_${newToken}`,
            db.fetch(`newspaper_${tokenDB}`) || 0
          );
          db.set(
            `tornCloth_${newToken}`,
            db.fetch(`tornCloth_${tokenDB}`) || 0
          );
          db.set(
            `usedTissue_${newToken}`,
            db.fetch(`usedTissue_${tokenDB}`) || 0
          );
          db.set(
            `valoriumsTear_${newToken}`,
            db.fetch(`valoriumsTear_${tokenDB}`) || 0
          );
          db.set(
            `valoriumsEclipsianSoul_${newToken}`,
            db.fetch(`valoriumsEclipsianSoul_${tokenDB}`) || 0
          );
          db.set(
            `abyssalCrownOfDominance_${newToken}`,
            db.fetch(`abyssalCrownOfDominance_${tokenDB}`) || 0
          );
          db.set(
            `mysticRuneOfResilience_${newToken}`,
            db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0
          );
          db.set(
            `auroraGaze_${newToken}`,
            db.fetch(`auroraGaze_${tokenDB}`) || 0
          );
          db.set(
            `abyssalStarcrystal_${newToken}`,
            db.fetch(`abyssalStarcrystal_${tokenDB}`) || 0
          );
          db.set(
            `brokenStick_${newToken}`,
            db.fetch(`brokenStick_${tokenDB}`) || 0
          );
          db.set(`bullet_${newToken}`, db.fetch(`bullet_${tokenDB}`) || 0);
          db.set(
            `EldrazursGrimoireOfRuin_${newToken}`,
            db.fetch(`EldrazursGrimoireOfRuin_${tokenDB}`) || 0
          );
          db.set(
            `abyssalScepterOfOblivion_${newToken}`,
            db.fetch(`abyssalScepterOfOblivion_${tokenDB}`) || 0
          );
          db.set(
            `mysticRuneOfResilience_${newToken}`,
            db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0
          );
          db.set(
            `orbOfElementalMastery_${newToken}`,
            db.fetch(`orbOfElementalMastery_${tokenDB}`) || 0
          );
          db.set(
            `shieldOfTheEarthshaker_${newToken}`,
            db.fetch(`shieldOfTheEarthshaker_${tokenDB}`) || 0
          );
          db.set(
            `timekeepersChronometer_${newToken}`,
            db.fetch(`timekeepersChronometer_${tokenDB}`) || 0
          );
          db.set(
            `eldritchFlameScroll_${newToken}`,
            db.fetch(`eldritchFlameScroll_${tokenDB}`) || 0
          );
          db.set(
            `moonsShineOfMetalSword_${newToken}`,
            db.fetch(`moonsShineOfMetalSword_${tokenDB}`) || 0
          );
          db.set(
            `infernothsWrathfulEye_${newToken}`,
            db.fetch(`infernothsWrathfulEye_${tokenDB}`) || 0
          );
          db.set(
            `pyroclasmicGem_${newToken}`,
            db.fetch(`pyroclasmicGem_${tokenDB}`) || 0
          );
          db.set(
            `pyroclasmicEssence_${newToken}`,
            db.fetch(`pyroclasmicEssence_${tokenDB}`) || 0
          );
          db.set(
            `magmaticTorch_${newToken}`,
            db.fetch(`magmaticTorch_${tokenDB}`) || 0
          );
          db.set(
            `eternalFlameEssence_${newToken}`,
            db.fetch(`eternalFlameEssence_${tokenDB}`) || 0
          );
          db.set(`blackOil_${newToken}`, db.fetch(`blackOil_${tokenDB}`) || 0);
          db.set(`hotWater_${newToken}`, db.fetch(`hotWater_${tokenDB}`) || 0);
          db.set(
            `transparentGlass_${newToken}`,
            db.fetch(`transparentGlass_${tokenDB}`) || 0
          );
          db.set(
            `sarcasticFringehead_${newToken}`,
            db.fetch(`sarcasticFringehead_${tokenDB}`) || 0
          );
          db.set(`salmon_${newToken}`, db.fetch(`salmon_${tokenDB}`) || 0);
          db.set(
            `smellyFish_${newToken}`,
            db.fetch(`smellyFish_${tokenDB}`) || 0
          );
          db.set(
            `burnedFish_${newToken}`,
            db.fetch(`burnedFish_${tokenDB}`) || 0
          );
          db.set(
            `grumpyCatfish_${newToken}`,
            db.fetch(`grumpyCatfish_${tokenDB}`) || 0
          );
          db.set(
            `pancakeFish_${newToken}`,
            db.fetch(`pancakeFish_${tokenDB}`) || 0
          );
          db.set(
            `discoJellyfish_${newToken}`,
            db.fetch(`discoJellyfish_${tokenDB}`) || 0
          );
          db.set(
            `sodaCanfish_${newToken}`,
            db.fetch(`sodaCanfish_${tokenDB}`) || 0
          );
          db.set(
            `lavaLampEel_${newToken}`,
            db.fetch(`lavaLampEel_${tokenDB}`) || 0
          );
          db.set(
            `rubberDuckyfish_${newToken}`,
            db.fetch(`rubberDuckyfish_${tokenDB}`) || 0
          );
          db.set(
            `pirateParrotfish_${newToken}`,
            db.fetch(`pirateParrotfish_${tokenDB}`) || 0
          );
          db.set(
            `toiletSeatLid_${newToken}`,
            db.fetch(`toiletSeatLid_${tokenDB}`) || 0
          );
          db.set(
            `alienAnglerfish_${newToken}`,
            db.fetch(`alienAnglerfish_${tokenDB}`) || 0
          );
          db.set(
            `ninjaStarfish_${newToken}`,
            db.fetch(`ninjaStarfish_${tokenDB}`) || 0
          );
          db.set(`boot_${newToken}`, db.fetch(`boot_${tokenDB}`) || 0);
          db.set(`bottle_${newToken}`, db.fetch(`bottle_${tokenDB}`) || 0);
          db.set(
            `fishingRod_${newToken}`,
            db.fetch(`fishingRod_${tokenDB}`) || 0
          );
          db.set(
            `luminaFin_${newToken}`,
            db.fetch(`luminaFin_${tokenDB}`) || 0
          );
          db.set(
            `bubblegumBlowfish_${newToken}`,
            db.fetch(`bubblegumBlowfish_${tokenDB}`) || 0
          );
          db.set(
            `disguisedDiverfish_${newToken}`,
            db.fetch(`disguisedDiverfish_${tokenDB}`) || 0
          );
          db.set(
            `tokenCreationDate_${newToken}`,
            db.fetch(`tokenCreationDate_${tokenDB}`) || 0
          );
          db.set(
            `daysPlayed_${newToken}`,
            db.fetch(`daysPlayed_${tokenDB}`) || 0
          );
          db.set(
            `monthsPlayed_${newToken}`,
            db.fetch(`monthsPlayed_${tokenDB}`) || 0
          );
          db.set(
            `bossesKilledTotal_${newToken}`,
            db.fetch(`bossesKilledTotal_${tokenDB}`) || 0
          );
          db.set(
            `mysterionixProActivated_${newToken}`,
            db.fetch(`mysterionixProActivated_${tokenDB}`) || true
          );
          db.set(
            `uselessUsageOfCommand_${newToken}`,
            db.fetch(`uselessUsageOfCommand_${tokenDB}`) || 0
          );
          db.set(
            `usefulUsageOfCommand_${newToken}`,
            db.fetch(`usefulUsageOfCommand_${tokenDB}`) || 0
          );
          db.set(
            `equippedNatureDaggers_${newToken}`,
            db.fetch(`equippedNatureDaggers_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedVentorianBow_${newToken}`,
            db.fetch(`equippedVentorianBow_${tokenDB}`)
          ) || "False";
          db.set(
            `ventorianBow_${newToken}`,
            db.fetch(`ventorianBow_${tokenDB}`)
          ) || 0;
          db.set(
            `equippedTexarus_${newToken}`,
            db.fetch(`equippedTexarus_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedWaetra_${newToken}`,
            db.fetch(`equippedWaetra_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedRasheta_${newToken}`,
            db.fetch(`equippedRasheta_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedImmortalGun_${newToken}`,
            db.fetch(`equippedImmortalGun_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedDaggerOfDeath_${newToken}`,
            db.fetch(`equippedDaggerOfDeath_${tokenDB}`)
          ) || "False";
          db.set(
            `equippedMoonsShineOfMetalSword_${newToken}`,
            db.fetch(`equippedMoonsShineOfMetalSword_${tokenDB}`)
          ) || "False";
          db.set(
            `inventoryPrivate_${newToken}`,
            db.fetch(`inventoryPrivate_${tokenDB}`)
          ) || false;
          db.set(
            `infoPrivate_${newToken}`,
            db.fetch(`infoPrivate_${tokenDB}`)
          ) || false;
          db.set(
            `balancePrivate_${newToken}`,
            db.fetch(`balancePrivate_${tokenDB}`)
          ) || false;
          db.set(
            `daggerOfDeathXP_${newToken}`,
            db.fetch(`daggerOfDeathXP_${tokenDB}`)
          ) || 0;
          db.set(
            `daggerOfDeathLevel_${newToken}`,
            db.fetch(`daggerOfDeathLevel_${tokenDB}`)
          ) || 0;
          db.set(
            `daggerOfDeathDamage_${newToken}`,
            db.fetch(`daggerOfDeathDamage_${tokenDB}`)
          ) || 0;
          db.set(
            `enshrinedAsAMysterionixLegend_${newToken}`,
            db.fetch(`enshrinedAsAMysterionixLegend_${tokenDB}`)
          ) || false;
          db.set(`firstBlood_${newToken}`, db.fetch(`firstBlood_${tokenDB}`)) ||
            false;
          db.set(
            `decadeOfAnnihilation_${newToken}`,
            db.fetch(`decadeOfAnnihilation_${tokenDB}`)
          ) || false;
          db.set(
            `halfCenturyOfDestruction_${newToken}`,
            db.fetch(`halfCenturyOfDestruction_${tokenDB}`)
          ) || false;
          db.set(
            `centuryOfSlaughter_${newToken}`,
            db.fetch(`centuryOfSlaughter_${tokenDB}`)
          ) || false;
          db.set(
            `acquiredAHeftySumOf100k_${newToken}`,
            db.fetch(`acquiredAHeftySumOf100k_${tokenDB}`)
          ) || false;
          db.set(
            `amassedAnImpressiveHaulOf500k_${newToken}`,
            db.fetch(`amassedAnImpressiveHaulOf500k_${tokenDB}`)
          ) || false;
          db.set(
            `reachedAmillionInRiches_${newToken}`,
            db.fetch(`reachedAmillionInRiches_${tokenDB}`)
          ) || false;
          db.set(
            `glorious10mPlunder_${newToken}`,
            db.fetch(`glorious10mPlunder_${tokenDB}`)
          ) || false;
          db.set(
            `wealthConqueror_${newToken}`,
            db.fetch(`wealthConqueror_${tokenDB}`)
          ) || false;
          db.set(
            `emergingAwareness_${newToken}`,
            db.fetch(`emergingAwareness_${tokenDB}`)
          ) || false;
          db.set(
            `tenthEnlightenment_${newToken}`,
            db.fetch(`tenthEnlightenment_${tokenDB}`)
          ) || false;
          db.set(
            `ascendedFifty_${newToken}`,
            db.fetch(`ascendedFifty_${tokenDB}`)
          ) || false;
          db.set(
            `centennialEpiphany_${newToken}`,
            db.fetch(`centennialEpiphany_${tokenDB}`)
          ) || false;
          db.set(`lootedGold_${newToken}`, db.fetch(`lootedGold_${tokenDB}`)) ||
            0;

          db.set(
            `totalAwakenings_${newToken}`,
            db.fetch(`totalAwakenings_${tokenDB}`)
          ) || 0;

          db.set(`awake1_${newToken}`, db.fetch(`awake1_${tokenDB}`)) || 0;
          db.set(`awake2_${newToken}`, db.fetch(`awake2_${tokenDB}`)) || 0;
          db.set(`awake3_${newToken}`, db.fetch(`awake3_${tokenDB}`)) || 0;
          db.set(
            `monarchSlayerTitleOpened_${newToken}`,
            db.fetch(`monarchSlayerTitleOpened_${tokenDB}`)
          ) || false;
          db.set(
            `monarchSlayerTitle_${newToken}`,
            db.fetch(`monarchSlayerTitle_${tokenDB}`)
          ) || 0;
          db.set(`warPoints_${newToken}`, db.fetch(`warPoints_${tokenDB}`)) ||
            0;
          db.set(`battlesWon_${newToken}`, db.fetch(`battlesWon_${tokenDB}`)) ||
            false;
          db.set(
            `battlesLost_${newToken}`,
            db.fetch(`battlesLost_${tokenDB}`)
          ) || false;
          db.set(
            `unlockedCrateOfEnergy_${newToken}`,
            db.fetch(`unlockedCrateOfEnergy_${tokenDB}`)
          ) || false;
          db.set(
            `acceptedTOS_${newToken}`,
            db.fetch(`acceptedTOS_${tokenDB}`)
          ) || false;
          db.delete(`${user.id}.valoriumToken`);
          db.set(`${user.id}.valoriumToken`, newToken);
          db.delete(`tokenExists_${tokenDB}`);
          db.set(`tokenExists_${newToken}`, true);
        }
      }
    }

    if (message.author.id === "768747976767832084" && args[0] === "register") {
      let user =
        message.mentions.users.first() ||
        client.users.cache.get(args[0]) ||
        message.author;
      const tokenDB = db.fetch(`${user.id}.valoriumToken`);
      if (!tokenDB) {
        let token =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
        let embed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s token`)
          .setDescription(`Your new token: ||${token}||`)
          .setColor("GREEN");
        message.channel.send(`His new token has been sent on his dms`);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        const apsEmbed = new Discord.MessageEmbed()
          .setTitle(`ACHIEVEMENT COMPLETE - Enshrined as a Mysterionix legend`)
          .setDescription(`${user} You gained 200 aps`)
          .setColor("#00FF00");
        message.channel.send(apsEmbed);
        user.send(embed);

        // Store the token in the database
        db.set(`${user.id}.valoriumToken`, token);
        db.set(`enshrinedAsAMysterionixLegend_${token}`, true);
        db.add(`achievementPoints_${token}`, 200);
        db.set(`tokenExists_${token}`, true);

        // Save the current date (day, month, and year) in the database
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getFullYear()}`;
        db.set(`tokenCreationDate_${token}`, formattedDate);
      } else {
        message.channel.send("His Token is already registered");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
      return;
    }
  },
};
