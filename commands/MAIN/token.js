const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "token",
  description: "Stores your name as a token",
  aliases: ["token"],
  usage: "token",
  run: async (client, message, args) => {
    const update = db.fetch(`updateInProgress`);
    if (!args[0]) {
      message.channel.send("Usage: +token me");
      return;
    }
    if (update) {
      message.channel.send(
        "You cannot use any commands right now! Bot is updating"
      );
      return;
    }

    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const tokenUser = db.fetch(`nameofUser_${user.id}.${tokenDB}`);

    if (args[0] === tokenDB) {
      const embed = new MessageEmbed()
        .setTitle("Token")
        .setDescription(`Eyy! this is your token`)
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
        message.channel.send(`Your token has been sent on your dms`);
        const apsEmbed = new Discord.MessageEmbed()
          .setTitle(`APS COMPLETE - Enshrined as a Valorium legend`)
          .setDescription(`${user} You gained 200 aps`)
          .setColor("#00FF00");
        message.channel.send(apsEmbed);

        user.send(embed);

        // Store the token in the database
        db.set(`${user.id}.valoriumToken`, token);
        db.set(`enshrinedAsAValoriumLegend_${token}`, true);
        db.add(`achievementPoints_${token}`, 200);
        console.log(db.fetch(`achievementPoints_${token}`));

        // Save the current date (day, month, and year) in the database
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getFullYear()}`;
        db.set(`${user.id}.tokenCreationDate`, formattedDate);
      } else {
        message.channel.send("Your token has already been registered.");
        user.send(`Your Valorium token: ||${tokenDB}||`);
      }
      return;
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
        message.channel.send(`His token has been sent on his dms`);
        const apsEmbed = new Discord.MessageEmbed()
          .setTitle(`APS COMPLETE - Enshrined as a Valorium legend`)
          .setDescription(`${user} You gained 200 aps`)
          .setColor("#00FF00");
        message.channel.send(apsEmbed);
        user.send(embed);

        // Store the token in the database
        db.set(`${user.id}.valoriumToken`, token);
        db.set(`enshrinedAsAValoriumLegend_${token}`, true);
        db.add(`achievementPoints_${token}`, 200);
        // Save the current date (day, month, and year) in the database
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getFullYear()}`;
        db.set(`${user.id}.tokenCreationDate`, formattedDate);
      } else {
        message.channel.send("His Token is already registered");
      }
      return;
    }
  },
};
