const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

async function startFunction(message, args, client) {
  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
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
    if (user == currentUser) {
      const tokenEmbed = new Discord.MessageEmbed()
        .setTitle(`🔑 Time to Unlock Adventure: Register Your Token!`)
        .setDescription(
          `
Ready to jump into the exciting world of Mysterionix? Hang on a moment – it appears your Mysterionix token hasn't been registered just yet.
Don't worry, setting things up is a breeze! Just type token me.x and unlock the gates to amazing adventures in no time. If you're curious why things seem restricted, it's all due to that token magic. Once you enter token me.x, those doors will swing wide open, and your Mysterionix journey will begin!
No time to waste! Type token me.x like a pro and let's kickstart your adventure. See you on the heroic side! 🚀🗡️`
        )
        .setColor(`#6A1B9A`);
      message.channel.send(tokenEmbed);
    } else {
      const otherTokenEmbed = new Discord.MessageEmbed()
        .setTitle(
          `Adventure Awaits: ${user.username}'s Token is Not Yet Registered`
        )
        .setDescription(
          `
It appears that the Mysterionix token for this user has not yet been registered. The path to adventure remains sealed until they personally type token me.x to activate their entry into the world of Mysterionix.
Feel free to share this guidance with them, so they can step into their destined role as a hero and unlock the realms of possibility that await.
Safe travels, and may the winds of fortune guide your way!      
`
        )
        .setColor(`#8A2BE2`);
      message.channel.send(otherTokenEmbed);
    }
  } else if (banned == true && user == currentUser) {
    const banEmbed = new Discord.MessageEmbed()
      .setTitle("Failed to access")
      .setDescription(`Your account has been banned`)
      .addField("Reason", `${banReason}`)
      .addField("Date", `${banDate}`)
      .setColor("#8B0000");
    message.channel.send(banEmbed);
    db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
  } else if (banned == true && user !== currentUser) {
    const banEmbed = new Discord.MessageEmbed()
      .setTitle("Failed to access")
      .setDescription(`${user.username}'s account has been banned`)
      .addField("Reason", `${banReason}`)
      .addField("Date", `${banDate}`)
      .setColor("#8B0000");
    message.channel.send(banEmbed);
    db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
  } else if (update == true) {
    const updateInProgressEmbed = new Discord.MessageEmbed()
      .setTitle(`Temporary Command Suspension`)
      .setDescription(
        `
Sorry ${currentUser.username} , commands are disabled at the moment.
The bot is currently undergoing an update. Please be patient!
Update : Making prices reasonable!
`
      )
      .setColor("#3498db")
      .setTimestamp();
    message.channel.send(updateInProgressEmbed);
    db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
  } else if (acceptedTOS == false && user == currentUser) {
    const acceptTOSembed = new Discord.MessageEmbed()
      .setTitle(`Failed to proceed`)
      .setDescription(
        `
You need to accept the terms of service for using this discord bot!
To review the terms of service, simply type **tos.x**
To accept the terms of service, use the command **tos accept.x**
`
      )
      .setColor("#808080");
    message.channel.send(acceptTOSembed);
    db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
  } else if (acceptedTOS == false && user !== currentUser) {
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
  }
  const isPoisoned = db.fetch(`isPoisoned_${tokenDB}`);
  if (isPoisoned && args[0] !== "ebonrosePerfume") {
    const remainingTime = db.fetch(`poisonedTime_${tokenDB}`);
    const formattedTime = moment.duration(remainingTime).humanize();
    if (user !== currentUser) {
      const poisonEmbed = new Discord.MessageEmbed()
        .setTitle("Poisoned!")
        .setDescription(
          `${user} is poisoned. Please wait for ${formattedTime} for the effect to end.`
        )
        .setColor("#2B2D31");

      message.channel.send(poisonEmbed);
      return;
    } else {
      const poisonEmbed = new Discord.MessageEmbed()
        .setTitle("Poisoned!")
        .setDescription(
          `Oh no! You are poisoned. Please wait for ${formattedTime} for the effect to end.`
        )
        .setColor("#2B2D31")
        .setFooter("Get well soon!");

      message.channel.send(poisonEmbed);
      // db.delete(`isPoisoned_${tokenDB}`);
      // db.delete(`poisonedTime_${tokenDB}`);
      return;
    }
  }
  return;
}
module.exports = startFunction;
