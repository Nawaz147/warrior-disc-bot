const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");

module.exports = {
  name: "penalty",
  aliases: [],
  description: "To penalty someone",
  usage: "penalty",
  category: "penalty",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    if (message.author.id == "768747976767832084") {
      if (!tokenDB) {
        message.channel.send(
          `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
        );
      } else if (banned == true) {
        const banEmbed = new Discord.MessageEmbed()
          .setTitle(user)
          .setDescription(`This account is banned`)
          .addField("Reason", `${banReason}`)
          .addField("Date", `${banDate}`)
          .setColor("#FFFF00");
        message.channel.send(banEmbed);
      } else {
        amount = args[1];
        reason = args.slice(2).join(" ");
        if (!amount) {
          message.channel.send(`Please specify an amount to penalty`);
        } else if (!amount) {
          message.channel.send(`Please specify an amount`);
        } else {
          db.subtract(`money_${tokenDB}.pocket`, amount);
          amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (!reason) {
            reason = "Not specified";
          }
          const penaltyEmbed = new Discord.MessageEmbed()
            .setTitle(`Penalty`)
            .setDescription(
              `
You penaltied ${user}
Reason : ${reason}
Amount : ${amount} Gold Coins
`
            )
            .setTimestamp()
            .setColor("#ffffff");
          message.channel.send(penaltyEmbed);
        }
        const penaltyNotification = new Discord.MessageEmbed()
          .setTitle(`You have been penaltied`)
          .setDescription(
            `
Penaltied by : ${user}
Reason : ${reason}
Amount : ${amount} Gold Coins
`
          )
          .setTimestamp()
          .setColor("#d3d3d3");
        user.send(penaltyNotification);
      }
    } else {
      let user =
        message.mentions.users.first() ||
        client.users.cache.get(args[0]) ||
        message.author;
      if (user.id == "768747976767832084") {
        message.channel.send(
          `WOOOT !! You are trying to penalty my one and only owner 😡 , you have been penalted by me [amount : 50,000]`
        );
        db.subtract(`money_${tokenDB}.pocket`, 50000);
        const penaltyNotification = new Discord.MessageEmbed()
          .setTitle(`You have been penaltied`)
          .setDescription(
            `
Penaltied by : <@934850905273159710>
Reason : Trying to penalty someone
amount : 50,000 Gold Coins
`
          )
          .setTimestamp()
          .setColor("#d3d");
        user.send(penaltyNotification);
      }
      message.channel.send(
        `WHOA ! WHOA ! trying to penalty someone ..? You have been penaltied by me (amount : 50000)`
      );
      db.subtract(`money_${tokenDB}.pocket`, 50000);
      const penaltyNotification = new Discord.MessageEmbed()
        .setTitle(`You have been penaltied`)
        .setDescription(
          `
Penaltied by : <@934850905273159710>
Reason : Trying to penalty someone
amount : 50,000 Gold Coins
`
        )
        .setTimestamp()
        .setColor("#d3d");
      user.send(penaltyNotification);
    }
  },
};
