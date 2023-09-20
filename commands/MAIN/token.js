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
          .setTitle(`ACHIEVEMENT COMPLETE - Enshrined as a Rune legend`)
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
        db.set(`enshrinedAsRuneLegend_${token}`, true);
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
        user.send(`Your Valorium token: ||${tokenDB}||`);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
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
        message.channel.send(`His new token has been sent on his dms`);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        const apsEmbed = new Discord.MessageEmbed()
          .setTitle(`ACHIEVEMENT COMPLETE - Enshrined as a Rune legend`)
          .setDescription(`${user} You gained 200 aps`)
          .setColor("#00FF00");
        message.channel.send(apsEmbed);
        user.send(embed);

        // Store the token in the database
        db.set(`${user.id}.valoriumToken`, token);
        db.set(`enshrinedAsRuneLegend_${token}`, true);
        db.add(`achievementPoints_${token}`, 200);
        // Save the current date (day, month, and year) in the database
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}.${
          currentDate.getMonth() + 1
        }.${currentDate.getFullYear()}`;
        db.set(`${user.id}.tokenCreationDate`, formattedDate);
      } else {
        message.channel.send("His Token is already registered");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
      return;
    }
  },
};
