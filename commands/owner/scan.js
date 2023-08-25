const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "scan",
  aliases: ["Scan", "scan", "SCAN"],
  description: "To use scan",
  usage: "scan",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      client.users.cache.find((user) => user.id === args[0]) ||
      message.author;

    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;

    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (
      banned == true &&
      !message.mentions.users.first() &&
      user.id !== "768747976767832084"
    ) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`Your account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (
      banned == true &&
      message.mentions.users.first() &&
      user.id !== "768747976767832084"
    ) {
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
    } else {
      if (
        (message.author.id == "768747976767832084" &&
          message.mentions.users.first()) ||
        client.users.cache.get(args[0]) ||
        client.users.cache.find((user) => user.id === args[0])
      ) {
        const userAvatar = user.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 1024,
        }); // Get user's avatar URL
        const userStatus = user.presence.status;

        let statusText;
        if (userStatus === "online") {
          statusText = "Online";
        } else if (userStatus === "idle") {
          statusText = "Idle";
        } else if (userStatus === "dnd") {
          statusText = "Do Not Disturb";
        } else if (userStatus === "offline") {
          statusText = "Offline";
        } else {
          statusText = "Unknown";
        }
        const uselessUsageOfCommand =
          db.fetch(`uselessUsageOfCommand_${tokenDB}`) || 0;
        const usefulUsageOfCommand =
          db.fetch(`usefulUsageOfCommand_${tokenDB}`) || 0;
        const bannedCount = db.fetch(`bannedCount_${tokenDB}`) || 0;
        const tokenCreationDate = db.fetch(`${user.id}.tokenCreationDate`);
        const currentDate = new Date();
        const creationDateParts = tokenCreationDate.split(".");
        const creationDate = new Date(
          parseInt(creationDateParts[2]),
          parseInt(creationDateParts[1]) - 1,
          parseInt(creationDateParts[0])
        );

        var scanUserEmbed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s scanned report`)
          .setDescription(
            `
User id : ${user.id}
Username : ${user.username}
Token : ${tokenDB}
Useless command usage : ${uselessUsageOfCommand}
Useful command usage :  ${usefulUsageOfCommand}
Banned? : ${banned ? true : false}
${!banned ? `Number of times banned : ${bannedCount}` : ""}
Discord Account Creation Date : ${user.createdAt.toISOString().split("T")[0]}
Token creation date : ${tokenCreationDate}
Status: ${statusText}
`
          )
          .setThumbnail(userAvatar)
          .setColor("#ffffff");
        if (banned == true) {
          scanUserEmbed
            .setDescription(
              `
User id : ${user.id}
Username : ${user.username}
Token : ${tokenDB}
Useless command usage : ${uselessUsageOfCommand}
Useful command usage :  ${usefulUsageOfCommand}
Banned? : ${banned ? true : false}
${banned ? `Ban Reason : ${banReason}\nBan Date : ${banDate}` : ""}
${banned ? `Number of times banned : ${bannedCount}` : ""}
Discord Account Creation Date : ${user.createdAt.toISOString().split("T")[0]}
Token creation date : ${tokenCreationDate}
Status: ${statusText}
`
            )
            .setThumbnail(userAvatar);
        }
        message.channel.send(
          "User details has been scanned and sent on your dms"
        );
        message.author.send(scanUserEmbed);
      } else {
        message.channel.send("Please mention a user to scan");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
    }
  },
};
