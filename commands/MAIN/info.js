const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "info",
  aliases: ["Info"],
  description: "To check info",
  usage: "info",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet, type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      var bossesKilledTotal = db.fetch(`bossesKilledTotal_${tokenDB}`);
      if (bossesKilledTotal == null || bossesKilledTotal == undefined) {
        bossesKilledTotal = 0;
      }
      var achievementPoints = db.fetch(`achievementPoints_${tokenDB}`);
      if (achievementPoints == null || achievementPoints == undefined) {
        achievementPoints = 0;
      }
      var soldiers = db.fetch(`soldiers_${tokenDB}`);
      if (soldiers == null || soldiers == undefined) {
        soldiers = 0;
      }
      var battlesWon = db.fetch(`battlesWon_${tokenDB}`);
      if (battlesWon == null || battlesWon == undefined) {
        battlesWon = 0;
      }
      var battlesLost = db.fetch(`battlesLost_${tokenDB}`);
      if (battlesLost == null || battlesLost == undefined) {
        battlesLost = 0;
      }
      var warPoints = db.fetch(`warPoints_${tokenDB}`);
      if (warPoints == null || warPoints == undefined) {
        warPoints = 0;
      }
      const userInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Info`)
        .addField("User ID", user.id)
        .addField("User Tag", user.tag)
        .addField("Is Banned?", banned ? "Yes" : "No")
        .addField("User status", user.presence.status)
        .addField("Bosses killed", bossesKilledTotal)
        .addField("Achievement Points (APS)", achievementPoints)
        .addField("Soldiers under command", soldiers)
        .addField("Battles Won", battlesWon)
        .addField("Battles Lost", battlesLost)
        .addField("War points", warPoints)
        .setColor("#ffffff");

      if (banned === true) {
        userInfoEmbed.addField("Ban Reason", banReason);
        userInfoEmbed.addField("Ban Date", banDate);
      } else {
        // Fetch the token creation date from the database
        const tokenCreationDate = db.fetch(`${user.id}.tokenCreationDate`);

        if (!tokenCreationDate) {
          message.channel.send("Unable to fetch token creation date.");
          return;
        }

        // Calculate the played duration using native JavaScript date functions
        const currentDate = new Date();
        const creationDateParts = tokenCreationDate.split(".");
        const creationDate = new Date(
          parseInt(creationDateParts[2]),
          parseInt(creationDateParts[1]) - 1,
          parseInt(creationDateParts[0])
        );

        const timeDifference = currentDate.getTime() - creationDate.getTime();
        const daysPlayed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const monthsPlayed = Math.floor(daysPlayed / 30);

        userInfoEmbed.addField(
          "Played Duration",
          `${monthsPlayed} months ${daysPlayed % 30} days`
        );
      }

      message.channel.send(userInfoEmbed);
    }
  },
};
