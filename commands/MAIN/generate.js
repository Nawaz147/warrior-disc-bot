const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");

module.exports = {
  name: "hack",
  aliases: ["Hack", "heck"],
  description: "To heck money",
  usage: "hack",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    if (message.author.id == "768747976767832084") {
      let timeout = 1;
      const tokenDB = db.fetch(`${user.id}.valoriumToken`);

      let multiplier = await db.fetch(`multiplier_${user.id}.${tokenDB}`);
      if (!multiplier) multiplier = 1;
      let amount = parseInt(args[0]);
      let generate = await db.fetch(`generate_${user.id}.${tokenDB}`);

      if (generate !== null && timeout - (Date.now() - generate) > 0) {
        let time = ms(timeout - (Date.now() - generate));

        let timeEmbed = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`❌ Try again ! ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed);
      } else {
        await db.add(`money_${tokenDB}.pocket`, amount);
        //   await db.set(`generate_${user.id}.${tokenDB}`, Date.now());

        message.channel.send(
          `✅  You have hacked ${amount} **gold coins** for you !`
        );
      }
    } else {
      return;
    }
  },
};
