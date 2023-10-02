const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");
const icons = require("../../itemIcons.json");

module.exports = {
  name: "buy",
  aliases: ["purchase", "Purchase", "Buy"],
  description: "To buy items",
  usage: "buy",
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
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("I don't have the permission to manage messages.");
        return;
      }
      var item = args[0];
      var itemDB = db.fetch(`${args[0]}_${tokenDB}`);
      var storeItemDB = db.fetch(`${args[0]}StoreAdd_${tokenDB}`);
      if (!item) {
        message.channel.send(
          "Invalid command usage , correct usage eg: buy rasheta 1.x"
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (!prices.hasOwnProperty(item)) {
        message.channel.send(
          `Invalid item name , **Usage example : buy [itemID] [Number of pieces].x**`
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        var amountOfPieces = parseInt(args[1]);
        if (
          (isNaN(amountOfPieces) && item !== "trashItems") ||
          (amountOfPieces < 1 && item !== "trashItems")
        ) {
          message.channel.send(
            "Please enter a valid number of item pieces to buy."
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          return; // Stop execution if the number of pieces is not valid
        }
        // Get the user's current pocket gold
        const currentGold = db.fetch(`money_${tokenDB}.pocket`);

        // Check if the gold limit will be exceeded after the sale

        var amountOfPieces = parseInt(args[1]);
        if (prices.hasOwnProperty(item)) {
          let fullNameItem = item.charAt(0).toUpperCase() + item.slice(1); // Capitalize the first letter
          fullNameItem = fullNameItem.replace(/([A-Z])/g, " $1").trim(); // Formatting
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          const itemPrice = prices[item];
          itemBuyPrice = itemPrice;
          itemTotalBuyPrice = itemPrice * amountOfPieces;

          if (
            item == "unlockedCrateOfEnergy" ||
            item == "soldier" ||
            item == "ruix" ||
            item == "ventorianBow" ||
            item == "trashItems" ||
            item == "fishes"
          ) {
            message.channel.send("You cannot buy it!");
            return;
          }
          if (itemTotalBuyPrice > currentGold) {
            message.channel.send(`You dont have enough money!`);
            return;
          }
          db.subtract(`${item}StoreAdd`, amountOfPieces);
          db.add(`${item}_${tokenDB}`, amountOfPieces);
          db.subtract(`money_${tokenDB}.pocket`, itemTotalBuyPrice);
          itemBuyPrice = itemBuyPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          itemTotalBuyPrice = itemTotalBuyPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          const itemSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Purchase successful!`)
            .addField(`Item name`, `${icons[item]} ${fullNameItem}`)
            .addField(`Number of pieces`, `${amountOfPieces}`)
            .addField(`Buy price per piece`, `${itemBuyPrice}`)
            .addField(`Total Buy price`, `${itemTotalBuyPrice}`)
            .setTimestamp()
            .setColor("#008080");
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          message.channel.send(itemSoldEmbed);
        }
      }
    }
  },
};
