const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "attack",
  aliases: ["attack", "attack"],
  description: "To attack a user",
  usage: "attack",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
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
      const mentionedUser = message.mentions.users.first();
      if (!mentionedUser) {
        message.channel.send(
          "Mention a user to attack . e.g : **+attack @user**"
        );
      }
      const mentionedUserTokenDB = db.fetch(
        `${mentionedUser.id}.valoriumToken`
      );
      if (!mentionedUserTokenDB) {
        message.channel.send(
          `That user isn't registered to Valorium discord bot`
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (mentionedUser == message.author) {
        message.channel.send(`You cannot battle yourself!`);
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (!mentionedUser) {
        message.channel.send(
          `Mention a user to attack . **e.g : +attack @user**`
        );
      } else {
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        var userSoldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
        var mentionedSoldiers =
          db.fetch(`soldiers_${mentionedUserTokenDB}`) || 0;
        var userPower = db.fetch(`soldiers_${tokenDB}`) || 0;
        var mentionedPower = db.fetch(`soldiers_${mentionedUserTokenDB}`) || 0;
        const soldiersDifference = userSoldiers - mentionedSoldiers;
        const randomPower = Math.floor(Math.random() * 1.2) + 0.1;

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
        } else if (userSoldiers < 25) {
          message.channel.send("You need atleast 25 soldiers to attack");
          return;
        } else if (mentionedSoldiers < 25 && userSoldiers < 25) {
          message.channel.send("You and your enemy needs atleast 25 soldiers");
        } else if (mentionedSoldiers < 25) {
          message.channel.send("That user needs to have atleast 25 soldiers");
        } else {
          // Determine the outcome of the battle
          if (userPower > mentionedPower) {
            message.channel.send({
              embed: {
                color: "#2B2D31",
                title: "Victory!",
                description: `
${user.username} emerged victorious against ${mentionedUser}!
${user.username} received : ${warPointsReward} War points
${mentionedUser.username}'s ${mentionedSoldiers} soldiers were killed
`,
                thumbnail: {
                  url: user.displayAvatarURL({ dynamic: true }),
                },
              },
            });
            db.add(`battlesWon_${tokenDB}`, 1);
            db.add(`power_${tokenDB}`, randomPower);
            db.add(`battlesLost_${mentionedUserTokenDB}`, 1);
            // Give rewards to the winning user

            db.add(`warPoints_${tokenDB}`, warPointsReward);

            // Send a message to the mentioned user
            const mentionedUserDM = await mentionedUser.createDM();
            mentionedUserDM.send({
              embed: {
                color: "#2B2D31",
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
            message.channel.send({
              embed: {
                color: "#2B2D31",
                title: "Defeat!",
                description: `
${user.username} was defeated by the army of ${mentionedUser.username}.
${mentionedUser.username} received : ${warPointsReward} War points
${user.username}'s ${userSoldiers} soldiers were killed
`,
                thumbnail: {
                  url: mentionedUser.displayAvatarURL({ dynamic: true }),
                },
              },
            });
            mentionedUserDM.send({
              embed: {
                color: "#2B2D31",
                title: "Victory",
                description: `
You emerged victorious against ${user.username}!
You received : ${warPointsReward} War points
${user.username}'s ${userSoldiers} soldiers were killed
`,
                thumbnail: {
                  url: user.displayAvatarURL({ dynamic: true }),
                },
              },
            });
            db.add(`battlesWon_${mentionedUserTokenDB}`, 1);
            db.add(`battlesLost_${tokenDB}`, 1);
            db.add(`warPoints_${mentionedUserTokenDB}`, warPointsReward);
            db.add(`power_${mentionedUserTokenDB}`, randomPower);
          }
        }
      }
    }
  },
};
