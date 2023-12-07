const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "awaken",
  aliases: ["Awaken", "awak", "Awak"],
  description: "To awaken vanity",
  usage: "awaken",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
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
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
      }

      // Normal and elite awakens possible arrays
      const normalPossibleAwakes = [
        0.25, 0.25, 0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32,
        0.35,
      ];

      const elitePossibleAwakes = [
        0.25, 0.25, 0.25, 0.3, 0.3, 0.3, 0.3, 0.3, 0.32, 0.32, 0.32, 0.5, 0.55,
        0.6,
      ];

      var awakGem = db.fetch(`awakeningGem_${tokenDB}`) || 0;
      var eliteAwakGem = db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0;

      const normalAwakenings = shuffleArray([...normalPossibleAwakes]);
      const eliteAwakenings = shuffleArray([...elitePossibleAwakes]);

      const awakenEmbed = new MessageEmbed()
        .setTitle("Awakenings")
        .setDescription(
          `${normalAwakenings[0]}x Gold Loot\n${normalAwakenings[1]}x Gold Loot\n${normalAwakenings[2]}x Gold Loot`
        )
        .setColor(`#2B2D31`);

      if (eliteAwakGem > 0) {
        awakenEmbed.addField(
          "Gems",
          `${eliteAwakGem} ${"🌟"} , ${awakGem} ${"💎"}`
        );
      } else {
        awakenEmbed.addField("Gems", `${awakGem} ${"💎"}`);
      }

      const awakenMessage = await message.channel.send(awakenEmbed);

      // Add reactions for elite and normal gems
      const eliteReaction = "🌟";
      const normalReaction = "💎";

      await awakenMessage.react(eliteReaction);
      await awakenMessage.react(normalReaction);

      const filter = (reaction, user) => {
        return (
          [eliteReaction, normalReaction].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      const collector = awakenMessage.createReactionCollector(filter, {
        dispose: true,
        time: 7 * 24 * 60 * 60 * 1000,
      });

      collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === eliteReaction && eliteAwakGem > 0) {
          const eliteAwakenEmbed = new MessageEmbed()
            .setTitle("Elite Awakenings")
            .setDescription(
              `${eliteAwakenings[0]}x Gold Loot\n${eliteAwakenings[1]}x Gold Loot\n${eliteAwakenings[2]}x Gold Loot`
            )
            .setColor(`#2B2D31`)
            .addField(
              "Gems",
              `${eliteAwakGem - 1} ${"🌟"} , ${awakGem} ${"💎"}`
            );

          db.set(
            `goldLoot_${tokenDB}`,
            eliteAwakenings[0] + eliteAwakenings[1] + eliteAwakenings[2]
          );
          db.set(`awake1_${tokenDB}`, eliteAwakenings[0]);
          db.set(`awake2_${tokenDB}`, eliteAwakenings[1]);
          db.set(`awake3_${tokenDB}`, eliteAwakenings[2]);

          awakenMessage.reactions.removeAll().then(() => {
            awakenMessage.react(eliteReaction);
            awakenMessage.react(normalReaction);
          });

          awakenMessage.edit(eliteAwakenEmbed);
          console.log(
            `Elite Awakening : `,
            eliteAwakenings[1] + eliteAwakenings[2]
          );

          eliteAwakGem -= 1;
          db.set(`eliteAwakeningGem_${tokenDB}`, eliteAwakGem);
        } else if (reaction.emoji.name === normalReaction && awakGem > 0) {
          const normalAwakenEmbed = new MessageEmbed()
            .setTitle("Normal Awakenings")
            .setDescription(
              `${normalAwakenings[0]}x Gold Loot\n${normalAwakenings[1]}x Gold Loot\n${normalAwakenings[2]}x Gold Loot`
            )
            .setColor(`#2B2D31`)
            .addField(
              "Gems",
              `${eliteAwakGem} ${"🌟"} , ${awakGem - 1} ${"💎"}`
            );

          db.set(
            `goldLoot_${tokenDB}`,
            normalAwakenings[0] + normalAwakenings[1] + normalAwakenings[2]
          );
          db.set(`awake1_${tokenDB}`, normalAwakenings[0]);
          db.set(`awake2_${tokenDB}`, normalAwakenings[1]);
          db.set(`awake3_${tokenDB}`, normalAwakenings[2]);

          awakenMessage.reactions.removeAll().then(() => {
            awakenMessage.react(eliteReaction);
            awakenMessage.react(normalReaction);
          });

          awakenMessage.edit(normalAwakenEmbed);
          console.log(
            `Normal Awakening : `,
            normalAwakenings[1] + normalAwakenings[2]
          );

          awakGem -= 1;
          db.set(`awakeningGem_${tokenDB}`, awakGem);
        }
      });

      collector.on("remove", (reaction, user) => {
        // Handle removal of reactions if needed
      });
    }
  },
};
