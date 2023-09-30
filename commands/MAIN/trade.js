const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");
const moneyCap = config.moneyCap;

module.exports = {
  name: "trade",
  aliases: ["trd", "Trade"],
  description: "To trade with someone",
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
    if (startFunction) {
      startFunction(message, args, client);
    }
    if (
      tokenDBUser &&
      acceptedTOS == true &&
      update == false &&
      banned == false
    ) {
      const tradeCooldowns = new Map();
      const tradeCooldown = tradeCooldowns.get(message.author.id);
      if (tradeCooldown && tradeCooldown > Date.now()) {
        const remainingTime = (tradeCooldown - Date.now()) / 1000;
        message.channel.send(
          `Please wait ${remainingTime.toFixed(
            1
          )} seconds before initiating another trade.`
        );
        return;
      }
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
      if (
        itemID == "goldBar" ||
        itemID == "soldier" ||
        itemID == "trashItems" ||
        itemID == "unlockedCrateOfEnergy" ||
        itemID == "ventorianBow" ||
        itemID == "fishes"
      ) {
        return message.channel.send(`You cannot trade that item`);
      }
      var money = args[2];
      var taxAmount = Math.ceil((5 / 100) * money);
      var finalAmount = parseFloat(money) + parseFloat(taxAmount);
      var amountOfPieces = args[1];
      var itemDB = db.fetch(`${itemID}_${tokenDBUser}`) || 0;
      if (!/^\d+$/.test(money)) {
        message.channel.send(`Money must be a valid number.`);
        return;
      } else if (!money && !amountOfPieces) {
        message.channel.send(
          `Specify the amount of pieces to sell and money you want for it`
        );
        return;
      } else if (!money) {
        message.channel.send(
          `Specify the amount of money you want for the item`
        );
        return;
      } else if (!amountOfPieces) {
        message.channel.send(
          `Specify the amount of item pieces you want to give`
        );
        return;
      } else if (itemDB == 0) {
        message.channel.send(`You don't have that item`);
        return;
      } else if (itemDB < amountOfPieces) {
        message.channel.send(`You don't have ${amountOfPieces}x ${itemID}`);
        return;
      } else if (mentionedUser == message.author) {
        message.channel.send(`You cannot trade with yourself`);
        return;
      } else if (!mentionedUser) {
        message.channel.send(`Mention a user to trade with`);
        return;
      } else if (money + balance > moneyCap.moneyCap) {
        message.channel.send(`You cannot exceed the money cap`);
        return;
      } else if (mentionedUserMoney < finalAmount) {
        message.channel.send(
          `${mentionedUser} does not have that amount of money`
        );
      } else {
        // Calculate the tax (5% of the money)
        var taxAmount = Math.ceil((5 / 100) * money);
        tradeCooldowns.set(message.author.id, Date.now() + 60000);

        // Format the money with commas
        money = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        taxAmount = taxAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        finalAmount = finalAmount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const tradeEmbed = new Discord.MessageEmbed()
          .setTitle(`🤝 Trade request from ${message.author.username}`)
          .setDescription(
            `Hey ${mentionedUser} , You received a Trade request from ${message.author.username}`
          )
          .addField(
            `-> ${message.author.username} offers`,
            `${fullNameItem} (${amountOfPieces})`
          )
          .addField(
            " " + mentionedUser.username + " gives <-",
            " <:goldCoin:1156621221761388676> " +
              money +
              " (`+" +
              taxAmount +
              " tax`)"
          )
          .addField(
            `${mentionedUser.username} gives total <-`,
            `<:goldCoin:1156621221761388676> ${finalAmount}`
          )
          .setColor(`#FFFF00`)
          .setFooter(`React with ✅ to accept or ❌ to reject`)
          .setTimestamp();

        message.channel
          .send(tradeEmbed)
          .then(async (tradeMessage) => {
            await tradeMessage.react("✅"); // Tick reaction
            await tradeMessage.react("❌"); // Cross reaction

            const filter = (reaction, reactingUser) =>
              ["✅", "❌"].includes(reaction.emoji.name) &&
              reactingUser.id === mentionedUser.id;

            const collector = tradeMessage.createReactionCollector(filter, {
              max: 1,
              time: 60000,
            });

            collector.on("collect", (reaction) => {
              if (reaction.emoji.name === "✅") {
                const itemDB = db.fetch(`${itemID}_${tokenDBUser}`) || 0;
                const moneyDB =
                  db.fetch(`money_${mentionedUserTokenDB}.pocket`) || 0;

                if (itemDB < amountOfPieces) {
                  message.channel.send(
                    `${message.author} don't have ${amountOfPieces}x ${fullNameItem}`
                  );
                } else if (moneyDB < finalAmount) {
                  message.channel.send(
                    `${mentionedUser.username}, you dont have that amount of money`
                  );
                } else {
                  money = args[2];
                  money = money
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const tradeEmbed = new Discord.MessageEmbed()
                    .setTitle(`Trade successful`)
                    .setDescription(
                      `The trade between ${message.author.username} and ${mentionedUser.username} was a success!`
                    )
                    .addField(
                      `+ ${mentionedUser.username} got`,
                      `${fullNameItem} (${amountOfPieces})`
                    )
                    .addField(
                      `+ ${message.author.username} got`,
                      `<:goldCoin:1156621221761388676> ${money}`
                    )
                    .setColor(`#4BB543`)
                    .setTimestamp();
                  message.channel.send(tradeEmbed);

                  // Update the trade (subtract item from the user, add item to the mentioned user)
                  var mentionedUserTokenDB = db.fetch(
                    `${mentionedUser.id}.valoriumToken`
                  );
                  var money = args[2];
                  var taxAmount = Math.ceil((5 / 100) * money);
                  var finalAmount = parseFloat(money) + parseFloat(taxAmount);
                  db.add(`${itemID}_${mentionedUserTokenDB}`, amountOfPieces);
                  db.subtract(`${itemID}_${tokenDBUser}`, amountOfPieces);

                  // Transfer money
                  db.add(`money_${tokenDBUser}.pocket`, money);
                  db.subtract(
                    `money_${mentionedUserTokenDB}.pocket`,
                    finalAmount
                  );
                }
              } else if (reaction.emoji.name === "❌") {
                const tradeFailEmbed = new Discord.MessageEmbed()
                  .setTitle(`Trade Rejected`)
                  .setDescription(
                    `The trade between ${message.author.username} and ${mentionedUser.username} was a failure!`
                  )
                  .setColor(`#b10000`)
                  .setTimestamp();
                message.channel.send(tradeFailEmbed);
              }
            });

            collector.on("end", (collected, reason) => {
              if (reason === "time") {
                tradeEmbed.setFooter("Trade expired"); // Set the footer to "Trade expired"
                tradeMessage.edit(tradeEmbed); // Update the message with the new footer
              }
              tradeMessage.reactions.removeAll().catch(console.error);
            });
          })
          .catch(console.error);
      }
    }
  },
};
