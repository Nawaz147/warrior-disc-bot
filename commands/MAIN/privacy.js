const Discord = require("discord.js");
const db = require("quick.db");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "privacy",
  aliases: ["privacy"],
  description: "To enable or disable privacy",
  usage: "privacy",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      const mysterionixProActivated =
        db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
      if (mysterionixProActivated == true) {
        if (!args[0]) {
          message.channel.send(
            `Mention if you want to disable or enable . Example : privacy enable inventory.x`
          );
          return;
        }
        if (!args[1]) {
          message.channel.send(
            `Mention which command privacy you want to enable / disable . Example : privacy enable inventory.x`
          );
          return;
        }
        if (args[0] == "enable") {
          if (
            args[1] == "inv" ||
            args[1] == "inventory" ||
            args[1] == "Inv" ||
            args[1] == "Inventory"
          ) {
            message.channel.send(`Your inventory is private now!`);
            db.set(`inventoryPrivate_${tokenDB}`, true);
            return;
          }
          if (args[1] == "info" || args[1] == "Info") {
            message.channel.send(`Your info is private now!`);
            db.set(`infoPrivate_${tokenDB}`, true);
            return;
          }
          if (
            args[1] == "bal" ||
            args[1] == "balance" ||
            args[1] == "Bal" ||
            args[1] == "Balance"
          ) {
            message.channel.send(`Your balance is private now!`);
            db.set(`balancePrivate_${tokenDB}`, true);
            return;
          }
        } else if (args[0] == "disable") {
          if (
            args[1] == "inv" ||
            args[1] == "inventory" ||
            args[1] == "Inv" ||
            args[1] == "Inventory"
          ) {
            message.channel.send(`Your inventory is not private now!`);
            db.set(`inventoryPrivate_${tokenDB}`, false);
            return;
          }
          if (args[1] == "info" || args[1] == "Info") {
            message.channel.send(`Your info is not private now!`);
            db.set(`infoPrivate_${tokenDB}`, false);
            return;
          }
          if (
            args[1] == "bal" ||
            args[1] == "balance" ||
            args[1] == "Bal" ||
            args[1] == "Balance"
          ) {
            message.channel.send(`Your balance is not private now!`);
            db.set(`balancePrivate_${tokenDB}`, false);
            return;
          }
        }
      } else {
        message.channel.send(`This command is only for premium users`);
      }
    }
  },
};
