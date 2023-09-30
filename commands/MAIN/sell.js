const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const e = require("express");
const prices = require("../../prices.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");
const icons = require("../../itemIcons.json");

module.exports = {
  name: "sell",
  aliases: ["sale", "Sell"],
  description: "To sell an item",
  usage: "sell",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    const soldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
    const bullet = db.fetch(`bullet_${tokenDB}`) || 0;
    const mysticRuneOfResilience =
      db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0;
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
      if (!item) {
        message.channel.send(
          "Invalid command usage , correct usage eg: sell rasheta 1.x"
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (!prices.hasOwnProperty(item)) {
        message.channel.send(
          `Invalid item name , **Usage example : sell [itemID] [Number of pieces].x**`
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        var amountOfPieces = parseInt(args[1]);
        if (
          (isNaN(amountOfPieces) || amountOfPieces < 1) &&
          item !== "trashItems" &&
          item !== "fishes"
        ) {
          message.channel.send(
            "Please enter a valid number of item pieces to sell."
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);

          return; // Stop execution if the number of pieces is not valid
        } else if (amountOfPieces > itemDB) {
          message.channel.send(`You dont have that many pieces`);
          return;
        }
        if (item == "goldBar") {
          var totalGoldGained = prices[item] * amountOfPieces;
        } else {
          var totalGoldGained = (prices[item] / 2) * amountOfPieces;
        }

        // Get the user's current pocket gold
        const currentGold = db.fetch(`money_${tokenDB}.pocket`);

        // Check if the gold limit will be exceeded after the sale
        if (currentGold + totalGoldGained > moneyCap) {
          message.channel.send("**You cannot exceed the gold limit.**");
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          return;
        } else {
          var amountOfPieces = parseInt(args[1]);
          if (prices.hasOwnProperty(item)) {
            let fullNameItem = item.charAt(0).toUpperCase() + item.slice(1); // Capitalize the first letter
            fullNameItem = fullNameItem.replace(/([A-Z])/g, " $1").trim(); // Formatting
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            const itemPieces = db.fetch(`${item}_${tokenDB}`) || 0;
            if (itemPieces > 0) {
              const itemPrice = prices[item];
              if (itemPieces == amountOfPieces || itemPieces > amountOfPieces) {
                if (
                  item == "goldBar" ||
                  item == "pyroclasmicEssence" ||
                  item == "grumpyCatfish" ||
                  item == "pancakeFish" ||
                  item == "discoJellyfish" ||
                  item == "sodaCanfish" ||
                  item == "lavaLampEel" ||
                  item == "rubberDuckyfish" ||
                  item == "ninjaStarfish" ||
                  item == "alienAnglerfish" ||
                  item == "pirateParrotfish" ||
                  item == "toiletSeatLid" ||
                  item == "boot" ||
                  item == "salmon" ||
                  item == "burnedFish"
                ) {
                  itemSellPrice = itemPrice;
                  itemTotalSellPrice = itemPrice * amountOfPieces;
                } else {
                  itemSellPrice = itemPrice / 2;
                  itemTotalSellPrice = itemSellPrice * amountOfPieces;
                }
                if (
                  item == "unlockedCrateOfEnergy" ||
                  item == "soldier" ||
                  item == "ruix" ||
                  item == "ventorianBow" ||
                  item == "trashItems" ||
                  item == "fishes"
                ) {
                  message.channel.send("You cannot sell it!");
                  return;
                }
                confirmationItemTotalSellPrice = itemTotalSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                const confirmationMessage = new Discord.MessageEmbed()
                  .setDescription(
                    `Are you sure you want to sell ${amountOfPieces}x ${icons[item]} ${fullNameItem} for ${confirmationItemTotalSellPrice}?`
                  )
                  .setColor("#008080");

                // Send the embed as the confirmation message
                const confirmationMessageSent = await message.channel.send(
                  confirmationMessage
                );

                // Add reactions for confirmation
                await confirmationMessageSent.react("✅"); // Checkmark
                await confirmationMessageSent.react("❌"); // Cross

                // Collect reactions from the user for a limited time (e.g., 30 seconds)
                const filter = (reaction, user) =>
                  ["✅", "❌"].includes(reaction.emoji.name) &&
                  user.id === message.author.id;

                const collector =
                  confirmationMessageSent.createReactionCollector(filter, {
                    time: 60000,
                  });

                collector.on("collect", async (reaction) => {
                  if (reaction.emoji.name === "✅") {
                    confirmationMessageSent
                      .delete()
                      .catch((error) =>
                        console.error(
                          "Failed to delete confirmation message:",
                          error
                        )
                      );
                    confirmationMessageSent.reactions
                      .removeAll()
                      .catch((error) =>
                        console.error("Failed to clear reactions:", error)
                      );
                    db.add(`${item}StoreAdd`, amountOfPieces);
                    db.subtract(`${item}_${tokenDB}`, amountOfPieces);
                    db.add(`money_${tokenDB}.pocket`, itemTotalSellPrice);
                    itemSellPrice = itemSellPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    itemTotalSellPrice = itemTotalSellPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    const itemSoldEmbed = new Discord.MessageEmbed()
                      .setTitle(`Sold Successfully`)
                      .addField(`Item name`, `${icons[item]} ${fullNameItem}`)
                      .addField(`Number of pieces`, `${amountOfPieces}`)
                      .addField(`Sell price per piece`, `${itemSellPrice}`)
                      .addField(`Total sell price`, `${itemTotalSellPrice}`)
                      .setTimestamp()
                      .setColor("#008080");
                    db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                    message.channel.send(itemSoldEmbed);
                  } else if (reaction.emoji.name === "❌") {
                    confirmationMessageSent
                      .delete()
                      .catch((error) =>
                        console.error(
                          "Failed to delete confirmation message:",
                          error
                        )
                      );
                    message.channel.send(
                      `Ok, you didn't sell ${amountOfPieces}x ${item}`
                    );
                  }
                });

                // End collector after the specified time
                collector.on("end", (collected, reason) => {
                  if (reason === "time") {
                    message.channel.send(
                      `${user.username}'s sell confirmation expired`
                    );
                  }
                });
              }
            }
            var rustyGears = db.fetch(`rustyGears_${tokenDB}`) || 0;
            var tornCloth = db.fetch(`tornCloth_${tokenDB}`) || 0;
            var brokenStick = db.fetch(`brokenStick_${tokenDB}`) || 0;
            var dustbin = db.fetch(`dustbin_${tokenDB}`) || 0;
            var newspaper = db.fetch(`newspaper_${tokenDB}`) || 0;
            var usedTissue = db.fetch(`usedTissue_${tokenDB}`) || 0;
            var bottle = db.fetch(`bottle_${tokenDB}`) || 0;
            var boot = db.fetch(`boot_${tokenDB}`) || 0;
            var toiletSeatLid = db.fetch(`toiletSeatLid_${tokenDB}`) || 0;
            if (item == "trashItems") {
              if (
                rustyGears > 0 ||
                tornCloth > 0 ||
                brokenStick > 0 ||
                dustbin > 0 ||
                newspaper > 0 ||
                usedTissue > 0 ||
                bottle > 0 ||
                boot > 0 ||
                toiletSeatLid > 0
              ) {
                trashItemsSellPrice =
                  rustyGears * prices.rustyGears +
                  tornCloth * prices.tornCloth +
                  brokenStick * prices.brokenStick +
                  dustbin * prices.dustbin +
                  newspaper * prices.newspaper +
                  usedTissue * prices.usedTissue +
                  bottle * prices.bottle +
                  boot * prices.boot +
                  toiletSeatLid * prices.toiletSeatLid;
                db.add(`money_${tokenDB}.pocket`, trashItemsSellPrice);
                trashItemsSellPrice = trashItemsSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const trashItemsSoldEmbed = new Discord.MessageEmbed()
                  .setTitle(`Sold Successfully`)
                  .addField(`Item name`, "Trash items")
                  .addField(`Total sell price`, `${trashItemsSellPrice}`)
                  .setTimestamp()
                  .setColor("#008080");
                db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                db.set(`rustyGears_${tokenDB}`, 0);
                db.set(`tornCloth_${tokenDB}`, 0);
                db.set(`brokenStick_${tokenDB}`, 0);
                db.set(`dustbin_${tokenDB}`, 0);
                db.set(`newspaper_${tokenDB}`, 0);
                db.set(`usedTissue_${tokenDB}`, 0);
                db.set(`boot_${tokenDB}`, 0);
                db.set(`bottle_${tokenDB}`, 0);
                db.set(`toiletSeatLid_${tokenDB}`, 0);
                message.channel.send(trashItemsSoldEmbed);
              } else {
                const noTrashEmbed = new Discord.MessageEmbed()
                  .setDescription(`You dont have any trash item`)
                  .setColor(`#008080`);
                message.channel.send(noTrashEmbed);
              }
              return;
            }

            var sarcasticFringehead =
              db.fetch(`sarcasticFringehead_${tokenDB}`) || 0;
            var salmon = db.fetch(`salmon_${tokenDB}`) || 0;
            var smellyFish = db.fetch(`smellyFish_${tokenDB}`) || 0;
            var burnedFish = db.fetch(`burnedFish_${tokenDB}`) || 0;
            var grumpyCatfish = db.fetch(`grumpyCatfish_${tokenDB}`) || 0;
            var pancakeFish = db.fetch(`pancakeFish_${tokenDB}`) || 0;
            var discoJellyfish = db.fetch(`discoJellyfish_${tokenDB}`) || 0;
            var sodaCanfish = db.fetch(`sodaCanfish_${tokenDB}`) || 0;
            var lavaLampEel = db.fetch(`lavaLampEel_${tokenDB}`) || 0;
            var rubberDuckyfish = db.fetch(`rubberDuckyfish_${tokenDB}`) || 0;
            var pirateParrotfish = db.fetch(`pirateParrotfish_${tokenDB}`) || 0;
            var alienAnglerfish = db.fetch(`alienAnglerfish_${tokenDB}`) || 0;
            var ninjaStarfish = db.fetch(`ninjaStarfish_${tokenDB}`) || 0;
            if (item == "fishes") {
              if (
                sarcasticFringehead > 0 ||
                salmon > 0 ||
                smellyFish > 0 ||
                burnedFish > 0 ||
                grumpyCatfish > 0 ||
                pancakeFish > 0 ||
                discoJellyfish > 0 ||
                sodaCanfish > 0 ||
                lavaLampEel > 0 ||
                rubberDuckyfish > 0 ||
                pirateParrotfish > 0 ||
                alienAnglerfish > 0 ||
                ninjaStarfish > 0
              ) {
                fishesSellPrice =
                  sarcasticFringehead * prices.sarcasticFringehead +
                  salmon * prices.salmon +
                  smellyFish * prices.smellyFish +
                  burnedFish * prices.burnedFish +
                  grumpyCatfish * prices.grumpyCatfish +
                  pancakeFish * prices.pancakeFish +
                  discoJellyfish * prices.discoJellyfish +
                  sodaCanfish * prices.sodaCanfish +
                  lavaLampEel * prices.lavaLampEel +
                  rubberDuckyfish * prices.rubberDuckyfish +
                  pirateParrotfish * prices.pirateParrotfish +
                  alienAnglerfish * prices.alienAnglerfish +
                  ninjaStarfish * prices.ninjaStarfish;
                const soldFishes = [];

                const fishTypes = [
                  {
                    name: "sarcasticFringehead",
                    emoji: "<:sarcasticFringehead:1156929582335799388> ",
                    displayName: "Sarcastic Fringehead",
                  },
                  {
                    name: "salmon",
                    emoji: "<:salmon:1156929627126771784>",
                    displayName: "salmon",
                  },
                  {
                    name: "smellyFish",
                    emoji: "<:smellyFish:1156929529894424666>",
                    displayName: "Smelly Fish",
                  },
                  {
                    name: "burnedFish",
                    emoji: "<:burnedfish:1156939483267207220>",
                    displayName: "Burned Fish",
                  },
                  {
                    name: "grumpyCatfish",
                    emoji: "<:grumpyCatfish:1156929452056522812>",
                    displayName: "Grumpy Catfish",
                  },
                  {
                    name: "pancakeFish",
                    emoji: "<:pancakeFish:1156929418170744852>",
                    displayName: "Pancake Fish",
                  },
                  {
                    name: "discoJellyfish",
                    emoji: "<:discoJellyfish:1156929355465900133>",
                    displayName: "Disco Jellyfish",
                  },
                  {
                    name: "sodaCanfish",
                    emoji: "<:sodaCanfish:1156929327817035788>",
                    displayName: "Soda Canfish",
                  },
                  {
                    name: "lavaLampEel",
                    emoji: "<:lavaLampEel:1156939953448681472>",
                    displayName: "Lava Lamp Eel",
                  },
                  {
                    name: "rubberDuckyfish",
                    emoji: "<:rubberDuckyfish:1156938911004766240>",
                    displayName: "Rubber Duckyfish",
                  },
                  {
                    name: "pirateParrotfish",
                    emoji: "<:pirateParrotfish:1156938717781573733>",
                    displayName: "Pirate Parrotfish",
                  },
                  {
                    name: "alienAnglerfish",
                    emoji: "<:alienAnglerfish:1156938740586000394>",
                    displayName: "Alien Anglerfish",
                  },
                  {
                    name: "ninjaStarfish",
                    emoji: "<:ninjaStarfish:1156938871695757432>",
                    displayName: "Ninja Starfish",
                  },
                ];

                // Iterate through each fish type
                fishTypes.forEach((fishType) => {
                  const quantity = db.get(`${fishType.name}_${tokenDB}`) || 0;
                  if (quantity > 0) {
                    const totalPrice = quantity * prices[fishType.name];
                    console.log(totalPrice);
                    soldFishes.push(
                      `${quantity}x ${fishType.emoji} ${fishType.displayName}`
                    );
                  }
                });

                // Check if any fish was sold
                if (soldFishes.length > 0) {
                  confirmationFishesSellPrice = fishesSellPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  const confirmationMessage = new Discord.MessageEmbed()
                    .setDescription(
                      `Are you sure you want to sell :\n ${soldFishes.join(
                        "\n"
                      )}\n**Total sell price** : ${confirmationFishesSellPrice} `
                    )
                    .setColor("#008080");

                  // Send the embed as the confirmation message
                  const confirmationMessageSent = await message.channel.send(
                    confirmationMessage
                  );

                  // Add reactions for confirmation
                  await confirmationMessageSent.react("✅"); // Checkmark
                  await confirmationMessageSent.react("❌"); // Cross

                  // Collect reactions from the user for a limited time (e.g., 30 seconds)
                  const filter = (reaction, user) =>
                    ["✅", "❌"].includes(reaction.emoji.name) &&
                    user.id === message.author.id;

                  const collector =
                    confirmationMessageSent.createReactionCollector(filter, {
                      time: 60000,
                    });

                  collector.on("collect", async (reaction) => {
                    if (reaction.emoji.name === "✅") {
                      confirmationMessageSent
                        .delete()
                        .catch((error) =>
                          console.error(
                            "Failed to delete confirmation message:",
                            error
                          )
                        );
                      confirmationMessageSent.reactions
                        .removeAll()
                        .catch((error) =>
                          console.error("Failed to clear reactions:", error)
                        );
                      const fishTypePattern = /<:(\w+):/;
                      const fishTypeMatches = soldFishes.map((fish) =>
                        fish.match(fishTypePattern)
                      );

                      if (fishTypeMatches.every((match) => match && match[1])) {
                        fishTypeMatches.forEach((match, index) => {
                          const fishTypeName = match[1];
                          const fishType = fishTypes.find(
                            (type) => type.name === fishTypeName
                          );

                          if (fishType) {
                            db.set(`${fishType.name}_${tokenDB}`, 0);
                          }
                        });
                      }
                      db.set(`burnedFish_${tokenDB}`, 0);
                      db.add(`money_${tokenDB}.pocket`, fishesSellPrice);
                      fishesSellPrice = fishesSellPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                      const fishesSoldEmbed = new Discord.MessageEmbed()
                        .setTitle(`Sold Successfully`)
                        .addField(`Item name`, "Fishes")
                        .addField(`Fishes Sold`, soldFishes.join("\n"))
                        .addField(`Total sell price`, `${fishesSellPrice}`)
                        .setTimestamp()
                        .setColor("#008080");

                      message.channel.send(fishesSoldEmbed);

                      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                    } else if (reaction.emoji.name === "❌") {
                      confirmationMessageSent
                        .delete()
                        .catch((error) =>
                          console.error(
                            "Failed to delete confirmation message:",
                            error
                          )
                        );
                      message.channel.send(
                        `Ok , looks like you dont want to sell the fishes`
                      );
                    }
                  });

                  // End collector after the specified time
                  collector.on("end", (collected, reason) => {
                    if (reason === "time") {
                      message.channel.send(
                        `${user.username}'s sell confirmation expired`
                      );
                    }
                  });
                }
              } else {
                const noFishEmbed = new Discord.MessageEmbed()
                  .setDescription(`You dont have any fishes`)
                  .setColor(`#008080`);
                message.channel.send(noFishEmbed);
              }
            }
          }
        }
      }
    }
  },
};
