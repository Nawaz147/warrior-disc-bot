const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "awaken",
  aliases: ["Awaken", "awak", "Awak"],
  description: "To awaken vanity",
  usage: "awaken",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      return message.channel.send(
        `${user} your Warrior Legends token is not registered yet, type +token me to set your Warrior Legends token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user.username)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      return message.channel.send(banEmbed);
    } else if (update == true) {
      return message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
      }
      //normal awakes possible
      const normalPossibleAwakes1 = [
        0.25, 0.25, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32,
        0.35,
      ];
      const normalPossibleAwakesSlot1 = shuffleArray(normalPossibleAwakes1);
      const normalPossibleAwakes2 = [
        0.25, 0.25, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32,
        0.35,
      ];
      const normalPossibleAwakesSlot2 = shuffleArray(normalPossibleAwakes2);
      const normalPossibleAwakes3 = [
        0.25, 0.25, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32,
        0.35,
      ];
      const normalPossibleAwakesSlot3 = shuffleArray(normalPossibleAwakes3);

      //elite awakes possible
      const elitePossibleAwakes1 = [
        0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32, 0.5, 0.55,
        0.6,
      ];
      const elitePossibleAwakesSlot1 = shuffleArray(elitePossibleAwakes1);
      const elitePossibleAwakes2 = [
        0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32, 0.5, 0.55,
        0.6,
      ];
      const elitePossibleAwakesSlot2 = shuffleArray(elitePossibleAwakes2);
      const elitePossibleAwakes3 = [
        0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32, 0.5, 0.55,
        0.6,
      ];
      const elitePossibleAwakesSlot3 = shuffleArray(elitePossibleAwakes3);

      var awakGem = db.fetch(`awakeningGem_${tokenDB}`);
      if (awakGem == undefined || awakGem == null) {
        awakGem = 0;
      }
      var eliteAwakGem = db.fetch(`eliteAwakeningGem_${tokenDB}`);
      if (eliteAwakGem == undefined || eliteAwakGem == null) {
        eliteAwakGem = 0;
      }
      if (args[0] == "elite") {
        if (eliteAwakGem == 0) {
          message.channel.send("You litterally have 0 elite awakening gems");
        } else {
          db.subtract(`eliteAwakeningGem_${tokenDB}`, 1);
          db.add(`gemsUsed_${tokenDB}`, 1);
          var gemsUsed = db.fetch(`gemsUsed_${tokenDB}`);
          const apsData = [
            {
              gemsAmount: 1,
              aps: 100,
              key: "emergingAwareness",
              title: "APS COMPLETE - Emerging Awareness",
            },
            {
              gemsAmount: 10,
              aps: 365,
              key: "tenthEnlightenment",
              title: "APS COMPLETE - Tenth Enlightenment",
            },
            {
              gemsAmount: 50,
              aps: 500,
              key: "ascendedFifty",
              title: "APS COMPLETE - Ascended Fifty",
            },
            {
              gemsAmount: 100,
              aps: 625,
              key: "centennialEpiphany",
              title: "APS COMPLETE - Centennial Epiphany",
            },
          ];

          for (const achievement of apsData) {
            const achievementKey = `${achievement.key}_${tokenDB}`;
            if (
              gemsUsed >= achievement.gemsAmount &&
              !db.fetch(achievementKey)
            ) {
              const apsEmbed = new Discord.MessageEmbed()
                .setTitle(achievement.title)
                .setDescription(`${user} You gained ${achievement.aps} aps`)
                .setColor("#00FF00");
              db.set(achievementKey, true);
              db.add(`achievementPoints_${tokenDB}`, achievement.aps);
              message.channel.send(apsEmbed);
            }
          }
          const eliteAwakEmbed = new MessageEmbed()
            .setTitle("Awakenings")
            .setDescription(
              `
${elitePossibleAwakesSlot1[0]}x Gold Loot
${elitePossibleAwakesSlot2[0]}x Gold Loot
${elitePossibleAwakesSlot3[0]}x Gold Loot

`
            );
          db.set(
            `goldLoot_${tokenDB}`,
            elitePossibleAwakesSlot1[0] +
              elitePossibleAwakesSlot2[0] +
              elitePossibleAwakesSlot3[0]
          );
          db.set(`awake1_${tokenDB}`, elitePossibleAwakesSlot1[0]);
          db.set(`awake2_${tokenDB}`, elitePossibleAwakesSlot2[0]);
          db.set(`awake3_${tokenDB}`, elitePossibleAwakesSlot3[0]);
          message.channel.send(eliteAwakEmbed);
          console.log(
            elitePossibleAwakesSlot1[0] +
              elitePossibleAwakesSlot2[0] +
              elitePossibleAwakesSlot3[0]
          );
        }
      } else if (args[0] == "view") {
        const awake1 = db.fetch(`awake1_${tokenDB}`);
        const awake2 = db.fetch(`awake2_${tokenDB}`);
        const awake3 = db.fetch(`awake3_${tokenDB}`);
        const viewAwakEmbed = new MessageEmbed()
          .setTitle("Your awakenings")
          .setDescription(
            `
${awake1}x Gold Loot
${awake2}x Gold Loot
${awake3}x Gold Loot

`
          );
        message.channel.send(viewAwakEmbed);
      } else {
        if (awakGem == 0) {
          message.channel.send("You litterally have 0 awakening gems");
        } else {
          db.subtract(`awakeningGem_${tokenDB}`, 1);
          db.add(`gemsUsed_${tokenDB}`, 1);
          var gemsUsed = db.fetch(`gemsUsed_${tokenDB}`);
          const apsData = [
            {
              gemsAmount: 1,
              aps: 100,
              key: "emergingAwareness",
              title: "APS COMPLETE - Emerging Awareness",
            },
            {
              gemsAmount: 10,
              aps: 365,
              key: "tenthEnlightenment",
              title: "APS COMPLETE - Tenth Enlightenment",
            },
            {
              gemsAmount: 50,
              aps: 500,
              key: "ascendedFifty",
              title: "APS COMPLETE - Ascended Fifty",
            },
            {
              gemsAmount: 100,
              aps: 625,
              key: "centennialEpiphany",
              title: "APS COMPLETE - Centennial Epiphany",
            },
          ];

          for (const achievement of apsData) {
            const achievementKey = `${achievement.key}_${tokenDB}`;
            if (
              gemsUsed >= achievement.gemsAmount &&
              !db.fetch(achievementKey)
            ) {
              const apsEmbed = new Discord.MessageEmbed()
                .setTitle(achievement.title)
                .setDescription(`${user} You gained ${achievement.aps} aps`)
                .setColor("#00FF00");
              db.set(achievementKey, true);
              db.add(`achievementPoints_${tokenDB}`, achievement.aps);
              message.channel.send(apsEmbed);
            }
          }
          const normalAwakeEmbed = new MessageEmbed()
            .setTitle("Awakenings")
            .setDescription(
              `
${normalPossibleAwakesSlot1[0]}x Gold Loot
${normalPossibleAwakesSlot2[0]}x Gold Loot
${normalPossibleAwakesSlot3[0]}x Gold Loot

`
            );
          db.set(
            `goldLoot_${tokenDB}`,
            normalPossibleAwakesSlot1[0] +
              normalPossibleAwakesSlot2[0] +
              normalPossibleAwakesSlot3[0]
          );
          db.set(`awake1_${tokenDB}`, normalPossibleAwakesSlot1[0]);
          db.set(`awake2_${tokenDB}`, normalPossibleAwakesSlot2[0]);
          db.set(`awake3_${tokenDB}`, normalPossibleAwakesSlot3[0]);
          message.channel.send(normalAwakeEmbed);
          console.log(
            normalPossibleAwakesSlot1[0] +
              normalPossibleAwakesSlot2[0] +
              normalPossibleAwakesSlot3[0]
          );
        }
      }
    }
  },
};
