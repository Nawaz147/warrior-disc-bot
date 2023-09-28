const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");
const moneyCap = config.moneyCap;

module.exports = {
  name: "award",
  aliases: ["Awrd", "awrd"],
  description: "To award a user (dev only)",
  usage: "trade",
  category: "Economy",
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const mentionedUser = message.mentions.users.first(); // Mentioned user
    const tokenDBUser = db.fetch(`${message.author.id}.valoriumToken`);
    const tokenDBMentioned = db.fetch(`${mentionedUser.id}.valoriumToken`);
    const mentionedUserMoney =
      db.fetch(`money_${tokenDBMentioned}.pocket`) || 0;
    const balance = db.fetch(`money_${tokenDBUser}.pocket`) || 0;
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDBUser}`) || false;
    const banned = db.fetch(`banned_${tokenDBUser}`) || false;
    if (message.author.id == "768747976767832084") {
    }
    if (
      tokenDBUser &&
      acceptedTOS == true &&
      update == false &&
      banned == false
    ) {
      const itemID = args[0];
      let fullNameItem = itemID.charAt(0).toUpperCase() + itemID.slice(1); // Capitalize the first letter
      fullNameItem = fullNameItem.replace(/([A-Z])/g, " $1").trim(); // Formatting
      if (itemID == "texarus") {
        fullNameItem = "Texarus the demonished staff";
      } else if (itemID == "waetra") {
        fullNameItem = "Waetra the freezed bow";
      } else if (itemID == "rasheta") {
        fullNameItem = "Rasheta the furious axe";
      } else if (itemID == "verdantLeaf") {
        fullNameItem = "Verdant whisper leaf";
      } else if (itemID == "natureDaggers") {
        fullNameItem = "Nature daggers of superpower";
      } else if (itemID == "immortalGun") {
        fullNameItem = "Immortal gun of energy";
      }
      if (!itemID || !prices.hasOwnProperty(itemID)) {
        message.channel.send(`Invalid item ID or the item does not exist`);
        return;
      }
      var amountOfPieces = args[1];
      var itemDB = db.fetch(`${itemID}_${tokenDBUser}`) || 0;

      const tradeEmbed = new Discord.MessageEmbed()
        .setTitle(`Awarded`)
        .setDescription(
          `Hey ${mentionedUser} , you have been awarded [${fullNameItem} x ${amountOfPieces}] by <@768747976767832084>`
        )
        .setTimestamp();
      db.add(`${itemID}_${tokenDBMentioned}`, amountOfPieces);

      message.channel.send(tradeEmbed);
    }
  },
};
