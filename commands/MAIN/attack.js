const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "attack",
  aliases: ["attack", "attack"],
  description: "To attack a user",
  usage: "attack",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    const mentionedUser = message.mentions.users.first();
    const mentionedUserTokenDB = db.fetch(`${mentionedUser.id}.valoriumToken`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true && !message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`Your account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (banned == true && message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`That user's account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
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
    } else if (acceptedTOS == false && !message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
You need to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service.
Type **+tos accept** to accept the terms of service.
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
${user.username} has not yet accepted the terms of service
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else if (!mentionedUserTokenDB) {
      message.channel.send(
        `That user isn't registered to Valorium discord bot`
      );
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else if (mentionedUser == message.author) {
      message.channel.send(`You cannot battle yourself!`);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      var userSoldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
      var mentionedSoldiers = db.fetch(`soldiers_${mentionedUserTokenDB}`) || 0;
      const soldiersDifference = userSoldiers - mentionedSoldiers;
      const platinumReward = Math.floor(Math.random() * 801) + 200; // Random platinum between 200 and 1000
      const warPointsReward =
        soldiersDifference <= 10
          ? Math.floor(Math.random() * 11) // Random war points between 0 and 10
          : soldiersDifference <= 20
          ? Math.floor(Math.random() * 6) + 15 // Random war points between 15 and 20
          : soldiersDifference <= 35
          ? Math.floor(Math.random() * 16) + 35 // Random war points between 35 and 50
          : Math.floor(Math.random() * 21) + 60; // Random war points between 60 and 80

      const bullet = db.fetch(`bullet_${tokenDB}`) || 0;

      if (bullet <= 0) {
        message.channel.send("You don't have any bullets to attack!");
        return;
      } else if (userSoldiers <= 0) {
        message.channel.send("You cannot attack without any soldiers!");
        return;
      } else {
        // Determine the outcome of the battle
        if (userSoldiers > mentionedSoldiers) {
          if (mentionedSoldiers >= 2) {
            db.subtract(
              `soldiers_${mentionedUserTokenDB}`,
              mentionedSoldiers / 2
            );
            var mentionedSoldiers = db.fetch(
              `soldiers_${mentionedUserTokenDB}`
            );
          } else if (mentionedSoldiers == 1) {
            db.subtract(`soldiers_${mentionedUserTokenDB}`, 1);
            var mentionedSoldiers = db.fetch(
              `soldiers_${mentionedUserTokenDB}`
            );
          }
          message.channel.send({
            embed: {
              color: "#FF0000",
              title: "Victory!",
              description: `
${user.username} emerged victorious against ${mentionedUser}!
${user.username} received : ${warPointsReward} War points
${user.username} received : ${platinumReward} Platinum
${mentionedUser.username}'s ${mentionedSoldiers} soldiers were killed
`,
              thumbnail: {
                url: user.displayAvatarURL({ dynamic: true }),
              },
            },
          });
          db.add(`battlesWon_${tokenDB}`, 1);
          db.add(`battlesLost_${mentionedUserTokenDB}`, 1);
          // Give rewards to the winning user

          db.add(`platinum_${tokenDB}`, platinumReward);
          db.add(`warPoints_${tokenDB}`, warPointsReward);

          // Send a message to the mentioned user
          const mentionedUserDM = await mentionedUser.createDM();
          mentionedUserDM.send({
            embed: {
              color: "#FF0000",
              title: "You were defeated!",
              description: `
You were defeated by the army of ${user.username}.
Your ${mentionedSoldiers} soldiers were killed              
`,
              thumbnail: {
                url: user.displayAvatarURL({ dynamic: true }),
              },
            },
          });
        } else {
          // Mentioned user wins
          message.channel.send({
            embed: {
              color: "#FF0000",
              title: "Defeat!",
              description: `
${user.username} was defeated by the army of ${mentionedUser.username}.
${mentionedUser.username} received : ${warPointsReward} War points
${mentionedUser.username} received : ${platinumReward} Platinum
${user.username}'s ${userSoldiers} soldiers were killed              
`,
              thumbnail: {
                url: mentionedUser.displayAvatarURL({ dynamic: true }),
              },
            },
          });
          mentionedUserDM.send({
            embed: {
              color: "#FF0000",
              title: "Victory",
              description: `
You emerged victorious against ${user.username}!
You received : ${warPointsReward} War points
You received : ${platinumReward} Platinum
${user.username}'s ${userSoldiers} soldiers were killed          
`,
              thumbnail: {
                url: user.displayAvatarURL({ dynamic: true }),
              },
            },
          });
          db.add(`battlesWon_${mentionedUserTokenDB}`, 1);
          db.add(`battlesLost_${tokenDB}`, 1);
          db.add(`platinum_${mentionedUserTokenDB}`, platinumReward);
          db.add(`warPoints_${mentionedUserTokenDB}`, warPointsReward);
        }
      }
    }
  },
};
