const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "login",
  aliases: ["Login"],
  description: "To login with token",
  usage: "login",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
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
      var token = args[0];
      if (token == tokenDB) {
        message.channel.send(`You are already logged in to this token `);
      } else {
        var tokenExists = db.fetch(`tokenExists_${token}`) || false;
        if (tokenExists == true) {
          db.set(`${user.id}.valoriumToken`, token);
          const loggedInEmbed = new Discord.MessageEmbed()
            .setDescription(`Logged in with token : ${token}`)
            .setColor(`#b10000`);
          user.send(loggedInEmbed);

          // Delete the user's message
          message.delete().catch(console.error);
        } else {
          const invalidTokenEmbed = new Discord.MessageEmbed()
            .setDescription(`The token you provided is invalid`)
            .setColor(`#b10000`);
          message.channel.send(invalidTokenEmbed);
        }
      }
    }
  },
};
