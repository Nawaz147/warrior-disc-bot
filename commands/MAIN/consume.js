const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const startFunction = require("../../startCommandFunction.js");
const moment = require("moment");

module.exports = {
  name: "consume",
  aliases: ["use", "cons"],
  description: "To consume an item",
  usage: "consume",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    const isPoisoned = db.fetch(`isPoisoned_${tokenDB}`) || false;
    const currentUser = message.author;
    if (startFunction) {
      await startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const item = args[0];
      const amountOfPieces = parseInt(args[1]);

      // Check if amountOfPieces is a valid integer
      if (
        (isNaN(amountOfPieces) && args[0] !== "ebonrosePerfume") ||
        (amountOfPieces <= 0 && args[0] !== "ebonrosePerfume") ||
        (!Number.isInteger(amountOfPieces) && args[0] !== "ebonrosePerfume")
      ) {
        return message.channel.send(
          "Please provide a valid number for the amount of pieces."
        );
      }
      if (item == "candy") {
        if (isPoisoned) {
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
        const candy = db.fetch(`candy_${tokenDB}`) || 0;

        if (candy >= amountOfPieces) {
          let totalGoldCoins = 0;

          for (let i = 0; i < amountOfPieces; i++) {
            const chance = Math.floor(Math.random() * 4750) + 1;
            let randomGoldCoins;

            if (chance > 2 || chance == 2) {
              randomGoldCoins = Math.floor(Math.random() * 4021) + 1;
            } else {
              randomGoldCoins = Math.floor(Math.random() * 22134012) + 6241092;
            }
            totalGoldCoins += randomGoldCoins;
          }

          const finalGoldCoins = totalGoldCoins
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          const consumeEmbed = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription(
              `You consumed ${amountOfPieces} ${
                amountOfPieces > 1 ? "yummy candies" : "yummy candy"
              } and got blessed with <:goldCoin:1156621221761388676> ${finalGoldCoins}`
            );
          db.subtract(`candy_${tokenDB}`, amountOfPieces);
          db.add(`money_${tokenDB}.pocket`, totalGoldCoins);
          message.channel.send(consumeEmbed);
        } else {
          message.channel.send(`You don't have that amount of candy.`);
        }
      } else if (item == "chocolateBar") {
        if (isPoisoned) {
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
        const chocolateBar = db.fetch(`chocolateBar_${tokenDB}`) || 0;

        if (chocolateBar >= amountOfPieces) {
          let totalGoldCoins = 0;

          for (let i = 0; i < amountOfPieces; i++) {
            const chance = Math.floor(Math.random() * 5250) + 1;
            let randomGoldCoins;

            if (chance > 2 || chance == 2) {
              randomGoldCoins = Math.floor(Math.random() * 4021) + 1;
            } else {
              randomGoldCoins = Math.floor(Math.random() * 29214582) + 811672;
            }

            totalGoldCoins += randomGoldCoins;
          }
          const finalGoldCoins = totalGoldCoins
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          const consumeEmbed = new Discord.MessageEmbed()
            .setColor("#2B2D31")
            .setDescription(
              `You consumed ${amountOfPieces} ${
                amountOfPieces > 1
                  ? "delicious chocolate bars"
                  : "delicious chocolate bar"
              } and walked away with <:goldCoin:1156621221761388676> ${finalGoldCoins}`
            );
          db.subtract(`chocolateBar_${tokenDB}`, amountOfPieces);
          db.add(`money_${tokenDB}.pocket`, totalGoldCoins);
          message.channel.send(consumeEmbed);
        } else {
          message.channel.send(`You don't have that amount of chocolate bar.`);
        }
      } else if (item == "poison") {
        if (isPoisoned) {
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
        const poison = db.fetch(`poison_${tokenDB}`) || 0;

        const userToBePoisoned = message.mentions.users.first();
        // const userToBePoisonedTOKEN = db.fetch(
        //   `${userToBePoisoned.id}.valoriumToken`
        // );
        if (!userToBePoisoned) {
          return message.channel.send(`Mention a user you want to poison`);
        } else if (userToBePoisoned == currentUser) {
          const selfPoisonEmbed = new Discord.MessageEmbed()
            .setDescription(`${user.username}, you cannot poison yourself`)
            .setColor("#2B2D31");
          message.channel.send(selfPoisonEmbed);
          return;
        } else if (poison >= amountOfPieces) {
          if (amountOfPieces > 500) {
            message.channel.send(`You can give maximum poison of 500x vials`);
            return;
          }

          const poison = db.fetch(`poison_${tokenDB}`) || 0;
          const userToBePoisoned = message.mentions.users.first();
          const userToBePoisonedTOKEN = db.fetch(
            `${userToBePoisoned.id}.valoriumToken`
          );
          // Check if the user is already poisoned
          const isPoisoned = db.fetch(`isPoisoned_${userToBePoisonedTOKEN}`);
          if (isPoisoned) {
            const poison = db.fetch(`poison_${tokenDB}`) || 0;
            const userToBePoisoned = message.mentions.users.first();
            const userToBePoisonedTOKEN = db.fetch(
              `${userToBePoisoned.id}.valoriumToken`
            );
            const remainingTime = db.fetch(
              `poisonedTime_${userToBePoisonedTOKEN}`
            );
            const formattedTime = moment.duration(remainingTime).humanize();
            // message.channel.send(
            //   `${userToBePoisoned} is already poisoned, wait for ${formattedTime} for the effect to end.`
            // );
            // db.delete(`isPoisoned_${userToBePoisonedTOKEN}`);
            // db.delete(`poisonedTime_${userToBePoisonedTOKEN}`);
            return;
          }

          // Add a cooldown of 1 minute per poison
          db.set(`isPoisoned_${userToBePoisonedTOKEN}`, true);
          const cooldownDuration = amountOfPieces * 60000;
          db.set(`poisonedTime_${userToBePoisonedTOKEN}`, cooldownDuration);
          setTimeout(() => {
            db.delete(`isPoisoned_${userToBePoisonedTOKEN}`);
            db.delete(`poisonedTime_${userToBePoisonedTOKEN}`);
            userToBePoisoned.send(
              `You are back healthy and the poision effect has ended`
            );
          }, cooldownDuration);

          // Continue with the poison consumption logic
          // You can add your logic here without showing any random messages

          const consumeEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(
              `${user.username} you gave ${amountOfPieces} ${
                amountOfPieces > 1 ? "vials of poison" : "vial of poison"
              } to ${userToBePoisoned.username}`
            );
          message.channel.send(consumeEmbed);
          db.subtract(`poison_${tokenDB}`, amountOfPieces);

          const poisonEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setDescription(
              `${userToBePoisoned} you were given ${amountOfPieces} ${
                amountOfPieces > 1 ? "vials of poison" : "vial of poison"
              } by ${user}.`
            );
          userToBePoisoned.send(poisonEmbed);
        } else {
          message.channel.send(`You don't have that amount of poison.`);
        }
      } else if (item == "ebonrosePerfume") {
        const poisoned = db.fetch(`isPoisoned_${tokenDB}`) || false;
        if (amountOfPieces) {
          message.channel.send(
            `You can consume only one piece of it and that also when you are poisoned`
          );
        } else if (poisoned !== true) {
          message.channel.send(`You arent poisoned`);
        } else {
          db.delete(`isPoisoned_${tokenDB}`);
          db.delete(`poisonedTime_${tokenDB}`);
          db.subtract(`ebonrosePerfume_${tokenDB}`, 1);
          const poisonRemoved = new Discord.MessageEmbed()
            .setDescription(
              `Your poison was removed by the extraordinary smell of ebonrose perfume`
            )
            .setColor(`#66ff00`);
          message.channel.send(poisonRemoved);
        }
      }
    }
  },
};
