const Discord = require("discord.js");
const db = require("quick.db");
const prices = require("../../prices.json");

module.exports = {
  name: "tos",
  aliases: ["Tos", "TOS"],
  description: "To check / accept terms of service",
  usage: "tos",
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
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      if (args[0] == "accept") {
        var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
        if (acceptedTOS == true) {
          message.channel.send(
            "You have already accepted the terms of service."
          );
        } else {
          db.set(`acceptedTOS_${tokenDB}`, true);
          const acceptedTOSembed = new Discord.MessageEmbed()
            .setTitle("TERMS OF SERVICE")
            .setDescription(
              "You have accepted the terms of service , you can now play!"
            );
          message.channel.send(acceptedTOSembed);
        }
      } else if (!args[0]) {
        const tosEmbed = new Discord.MessageEmbed()
          .setTitle("Terms of Service")
          .setDescription(
            "Please read and accept the following terms of service before using the bot."
          )
          .addField(
            "1. Behavior and Conduct",
            "You agree to maintain respectful behavior and follow the community guidelines. Any form of harassment, hate speech, or disruptive behavior will not be tolerated."
          )
          .addField(
            "2. Account Usage",
            "You are responsible for the security of your account. Sharing account information or engaging in fraudulent activities will result in penalties."
          )
          .addField(
            "3. Dispute Resolution",
            "Any disputes will be handled by the bot's owner. Owner decision on any matter related to the bot is final."
          )
          .addField(
            "4. Changes to Terms of Service",
            "We reserve the right to modify these terms at any time. You will be notified of changes and are responsible for staying updated with the latest version."
          )
          .addField(
            "5. Autoclicker",
            "Using autoclicker to gain benifit is prohibitted and the user's access to the bot will be terminated"
          )
          .addField(
            "6. User Accounts and Ownership",
            "By using our Discord RPG bot, you acknowledge and agree that user accounts created within the bot remain the property of the bot's owner. While you have the privilege of using and interacting with your user account, you do not acquire any ownership rights over the account or its associated data. The bot's owner reserves the right to suspend or terminate user accounts as outlined in this Terms of Service."
          )
          .setFooter(
            "Type +tos accept if you agree to abide by the Terms of Service."
          )
          .setColor("#3498db");

        // Send the ToS embed to the user
        message.channel.send(tosEmbed);
      }
    }
  },
};
