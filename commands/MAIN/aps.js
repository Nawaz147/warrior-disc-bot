const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "achievements",
  aliases: ["aps", "achievementPoints", "AchievementPoints", "Aps", "APS"],
  description: "Check your achievements and remaining ones.",
  usage: "achievements",
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

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      const achievementPoints = db.fetch(`achievementPoints_${tokenDB}`) || 0;
      const allAchievements = [
        {
          name: "Enshrined as a Rune Legend (200 APS)",
          description: "Register yourself with Rune warden discord bot",
          aps: 200,
          achieved: db.fetch(`enshrinedAsARuneLegend_${tokenDB}`) || false,
        },
        {
          name: "First Blood (500 APS)",
          description: "Get your first kill",
          aps: 500,
          totalKillsRequired: 1,
          achieved: db.fetch(`firstBlood_${tokenDB}`) || false,
        },
        {
          name: "Decade of Annihilation (300 APS)",
          description: "Get 10 kills",
          aps: 300,
          totalKillsRequired: 10,
          achieved: db.fetch(`decadeOfAnnihilation_${tokenDB}`) || false,
        },
        {
          name: "Half-century of Destruction (800 APS)",
          description: "Get 50 kills",
          aps: 800,
          totalKillsRequired: 50,
          achieved: db.fetch(`halfCenturyOfDestruction_${tokenDB}`) || false,
        },
        {
          name: "Century of Slaughter (1500 APS)",
          description: "Get 100 kills",
          aps: 1500,
          totalKillsRequired: 100,
          achieved: db.fetch(`centuryOfSlaughter_${tokenDB}`) || false,
        },
        {
          name: "Acquired a hefty sum of 100k (100 APS)",
          description: "Loot 100,000 gold",
          aps: 100,
          totalGoldRequired: 100000,
          achieved: db.fetch(`acquiredAHeftySumOf100k_${tokenDB}`) || false,
        },
        {
          name: "Amassed an impressive haul of 500k (200 APS)",
          description: "Loot 500,000 gold",
          aps: 200,
          totalGoldRequired: 500000,
          achieved:
            db.fetch(`amassedAnImpressiveHaulOf500k_${tokenDB}`) || false,
        },
        {
          name: "Reached a million in riches (500 APS)",
          description: "Loot 1,000,000 gold",
          aps: 500,
          totalGoldRequired: 1000000,
          achieved: db.fetch(`reachedAmillionInRiches_${tokenDB}`) || false,
        },
        {
          name: "Glorious 10-Million Plunder (1000 APS)",
          description: "Loot 10,000,000 gold",
          aps: 1000,
          totalGoldRequired: 10000000,
          achieved: db.fetch(`glorious10mPlunder_${tokenDB}`) || false,
        },
        {
          name: "Wealth Conqueror (1700 APS)",
          description: "Loot 100,000,000 gold",
          aps: 1700,
          totalGoldRequired: 100000000,
          achieved: db.fetch(`wealthConqueror_${tokenDB}`) || false,
        },
        {
          name: "Emerging Awareness (100 APS)",
          description: "Do your first awakening [normal / elite]",
          aps: 100,
          totalAwakeningsRequired: 1,
          achieved: db.fetch(`emergingAwareness_${tokenDB}`) || false,
        },
        {
          name: "Tenth Enlightenment (365 APS)",
          description: "Do awakening 10 times [normal / elite]",
          aps: 365,
          totalAwakeningsRequired: 10,
          achieved: db.fetch(`tenthEnlightenment_${tokenDB}`) || false,
        },
        {
          name: "Ascended Fifty (500 APS)",
          description: "Do awakening 50 times [normal / elite]",
          aps: 500,
          totalAwakeningsRequired: 50,
          achieved: db.fetch(`ascendedFifty_${tokenDB}`) || false,
        },
        {
          name: "Centennial Epiphany (625 APS)",
          description: "Do awakening 100 times [normal / elite]",
          aps: 625,
          totalAwakeningsRequired: 100,
          achieved: db.fetch(`centennialEpiphany_${tokenDB}`) || false,
        },
      ];
      const userData = {
        totalGoldEarned: db.fetch(`lootedGold_${tokenDB}`) || 0,
        totalKills: db.fetch(`bossesKilledTotal_${tokenDB}`) || 0,
        totalAwakenings: db.fetch(`gemsUsed_${tokenDB}`) || 0,
      };

      const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Unaccomplished Achievements`)
        .setColor("#00FF00")
        .setFooter(`APS - ${achievementPoints} / 8390`);

      // Filter out the achieved achievements
      const remainingAchievements = allAchievements.filter(
        (achievement) => !achievement.achieved
      );

      if (remainingAchievements.length === 0) {
        embed.setDescription(
          "Congratulations! You have completed all achievements."
        );
        embed.setTitle(`${user.username}`);
      } else {
        for (const achievement of remainingAchievements) {
          let progress = "";

          // Inside the for loop, update the if conditions as follows:

          if (achievement.description.includes("gold")) {
            if (achievement.totalGoldRequired) {
              const goldProgress = Math.min(
                userData.totalGoldEarned,
                achievement.totalGoldRequired
              );
              progress = `${goldProgress.toLocaleString()} / ${achievement.totalGoldRequired.toLocaleString()} gold looted`;
            } else {
              progress = `Achievement data missing for gold`;
            }
          } else if (achievement.description.includes("kills")) {
            if (achievement.totalKillsRequired) {
              const killsProgress = Math.min(
                userData.totalKills,
                achievement.totalKillsRequired
              );
              progress = `${killsProgress.toLocaleString()} / ${achievement.totalKillsRequired.toLocaleString()} killed`;
            } else {
              progress = `Achievement data missing for kills`;
            }
          } else if (achievement.description.includes("awakening")) {
            if (achievement.totalAwakeningsRequired) {
              const awakeningsProgress = Math.min(
                userData.totalAwakenings,
                achievement.totalAwakeningsRequired
              );
              progress = `${awakeningsProgress.toLocaleString()} / ${achievement.totalAwakeningsRequired.toLocaleString()} awakened`;
            } else {
              progress = `Achievement data missing for awakenings`;
            }
          }

          embed.addField(
            achievement.name,
            `${achievement.description}\nProgress: [${progress}]`
          );
        }
      }

      message.channel.send(embed);
    }
  },
};
