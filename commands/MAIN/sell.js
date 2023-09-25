const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const e = require("express");
const prices = require("../../prices.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

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
      var item = args[0];
      var itemDB = db.fetch(`${args[0]}_${tokenDB}`);
      if (!item) {
        message.channel.send(
          "Invalid command usage , correct usage eg: +sell rasheta 1"
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else if (!prices.hasOwnProperty(item)) {
        message.channel.send(
          `Invalid item name , **Usage example : +sell [itemID] [Number of pieces]**`
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        var amountOfPieces = parseInt(args[1]);
        if (
          (isNaN(amountOfPieces) && item !== "trashItems") ||
          (amountOfPieces < 1 && item !== "trashItems")
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
          var goldBar = db.fetch(`goldBar_${tokenDB}`) || 0;
          if (item == "goldBar") {
            if (goldBar > 0) {
              if (goldBar == amountOfPieces || goldBar > amountOfPieces) {
                goldBarSellPrice = prices.goldBar;
                db.add(`goldBarStoreAdd`, amountOfPieces);
                db.subtract(`goldBar_${tokenDB}`, amountOfPieces);
                db.add(
                  `money_${tokenDB}.pocket`,
                  prices.goldBar * amountOfPieces
                );
                goldBarSellPrice = goldBarSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                goldBarTotalSellPrice = prices.goldBar * amountOfPieces;
                goldBarTotalSellPrice = goldBarTotalSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const goldBarSoldEmbed = new Discord.MessageEmbed()
                  .setTitle(`Sold Successfully`)
                  .addField(`Item name`, "Gold bar")
                  .addField(`Number of pieces`, `${amountOfPieces}`)
                  .addField(`Sell price per piece`, `${goldBarSellPrice}`)
                  .addField(`Total sell price`, `${goldBarTotalSellPrice}`)
                  .setTimestamp()
                  .setColor("#008080");
                db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                message.channel.send(goldBarSoldEmbed);
              }
            }
          }

          if (item == "rasheta") {
            var rasheta = db.fetch(`rasheta_${tokenDB}`) || 0;
            if (rasheta > 0) {
              if (rasheta == amountOfPieces || rasheta > amountOfPieces) {
                rashetaSellPrice = prices.rasheta / 2;
                db.add(`rashetaStoreAdd`, amountOfPieces);
                db.subtract(`rasheta_${tokenDB}`, amountOfPieces);
                db.add(
                  `money_${tokenDB}.pocket`,
                  (prices.rasheta / 2) * amountOfPieces
                );
                rashetaSellPrice = rashetaSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                rashetaTotalSellPrice = (prices.rasheta / 2) * amountOfPieces;
                rashetaTotalSellPrice = rashetaTotalSellPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                const rashetaSoldEmbed = new Discord.MessageEmbed()
                  .setTitle(`Sold Successfully`)
                  .addField(`Item name`, "Rasheta the furious axe")
                  .addField(`Number of pieces`, `${amountOfPieces}`)
                  .addField(`Sell price per piece`, `${rashetaSellPrice}`)
                  .addField(`Total sell price`, `${rashetaTotalSellPrice}`)
                  .setTimestamp()
                  .setColor("#008080");
                db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                message.channel.send(rashetaSoldEmbed);
              } else if (rasheta == 0) {
                message.channel.send("You dont have gold bar");
              } else if (rasheta > 0 && rasheta !== amountOfPieces) {
                message.channel.send(
                  `You dont have ${amountOfPieces}x gold bars`
                );
              } else {
                db.set(`rasheta_${tokenDB}`, 0);
              }
            }
          }
          if (item == "waetra") {
            waetraSellPrice = prices.waetra / 2;
            db.add(`waetraStoreAdd`, amountOfPieces);
            db.subtract(`waetra_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.waetra / 2) * amountOfPieces
            );
            waetraSellPrice = waetraSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            waetraTotalSellPrice = (prices.waetra / 2) * amountOfPieces;
            waetraTotalSellPrice = waetraTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const waetraSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Waetra the freezed bow")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${waetraSellPrice}`)
              .addField(`Total sell price`, `${waetraTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(waetraSoldEmbed);
          }
          if (item == "texarus") {
            texarusSellPrice = prices.texarus / 2;
            db.add(`texarusStoreAdd`, amountOfPieces);
            db.subtract(`texarus_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.texarus / 2) * amountOfPieces
            );
            texarusSellPrice = texarusSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            texarusTotalSellPrice = (prices.texarus / 2) * amountOfPieces;
            texarusTotalSellPrice = texarusTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const texarusSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Texarus the demonished staff")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${texarusSellPrice}`)
              .addField(`Total sell price`, `${texarusTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(texarusSoldEmbed);
          }
          if (item == "natureDaggers") {
            natureDaggersSellPrice = prices.natureDaggers / 2;
            db.add(`natureDaggersStoreAdd`, amountOfPieces);
            db.subtract(`natureDaggers_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.natureDaggers / 2) * amountOfPieces
            );
            natureDaggersSellPrice = natureDaggersSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            natureDaggersTotalSellPrice =
              (prices.natureDaggers / 2) * amountOfPieces;
            natureDaggersTotalSellPrice = natureDaggersTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const natureDaggersSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Nature daggers of superpower")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${natureDaggersSellPrice}`)
              .addField(`Total sell price`, `${natureDaggersTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(natureDaggersSoldEmbed);
          }
          if (item == "immortalGun") {
            immortalGunSellPrice = prices.immortalGun / 2;
            db.add(`immortalGunStoreAdd`, amountOfPieces);
            db.subtract(`immortalGun_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.immortalGun / 2) * amountOfPieces
            );
            immortalGunSellPrice = immortalGunSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            immortalGunTotalSellPrice =
              (prices.immortalGun / 2) * amountOfPieces;
            immortalGunTotalSellPrice = immortalGunTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const immortalGunSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Immortal gun of energy")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${immortalGunSellPrice}`)
              .addField(`Total sell price`, `${immortalGunTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(immortalGunSoldEmbed);
          }
          if (item == "daggerOfDeath") {
            const daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
            if (!daggerOfDeath) {
              message.channel.send(`You dont have Dagger of death`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (amountOfPieces > daggerOfDeath) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Dagger of death`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              daggerOfDeathSellPrice = prices.daggerOfDeath / 2;
              db.add(`daggerOfDeathStoreAdd`, amountOfPieces);
              db.subtract(`daggerOfDeath_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.daggerOfDeath / 2) * amountOfPieces
              );
              daggerOfDeathSellPrice = daggerOfDeathSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              daggerOfDeathTotalSellPrice =
                (prices.daggerOfDeath / 2) * amountOfPieces;
              daggerOfDeathTotalSellPrice = daggerOfDeathTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const daggerOfDeathSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Sold Successfully`)
                .addField(`Item name`, "Dagger of death")
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Sell price per piece`, `${daggerOfDeathSellPrice}`)
                .addField(`Total sell price`, `${daggerOfDeathTotalSellPrice}`)
                .setTimestamp()
                .setColor("#008080");
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              message.channel.send(daggerOfDeathSoldEmbed);
            }
          }

          if (item == "goldenGhostKnightSet") {
            goldenGhostKnightSetSellPrice = prices.goldenGhostKnightSet;
            db.add(`goldenGhostKnightSetStoreAdd`, amountOfPieces);
            db.subtract(`goldenGhostKnightSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.goldenGhostKnightSet * amountOfPieces
            );
            goldenGhostKnightSetSellPrice = goldenGhostKnightSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            goldenGhostKnightSetTotalSellPrice =
              prices.goldenGhostKnightSet * amountOfPieces;
            goldenGhostKnightSetTotalSellPrice =
              goldenGhostKnightSetTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const goldenGhostKnightSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Golden ghost knight set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${goldenGhostKnightSetSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${goldenGhostKnightSetTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(goldenGhostKnightSetSoldEmbed);
          }
          if (item == "arcaneSenseiSet") {
            arcaneSenseiSetSellPrice = prices.arcaneSenseiSet;
            db.add(`arcaneSenseiSetStoreAdd`, amountOfPieces);
            db.subtract(`arcaneSenseiSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.arcaneSenseiSet * amountOfPieces
            );
            arcaneSenseiSetSellPrice = arcaneSenseiSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            arcaneSenseiSetTotalSellPrice =
              prices.arcaneSenseiSet * amountOfPieces;
            arcaneSenseiSetTotalSellPrice = arcaneSenseiSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const arcaneSenseiSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Arcane sensei set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${arcaneSenseiSetSellPrice}`)
              .addField(`Total sell price`, `${arcaneSenseiSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(arcaneSenseiSetSoldEmbed);
          }

          if (item == "frozenSet") {
            frozenSetSellPrice = prices.frozenSet;
            db.add(`frozenSetStoreAdd`, amountOfPieces);
            db.subtract(`frozenSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.frozenSet * amountOfPieces
            );
            frozenSetSellPrice = frozenSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            frozenSetTotalSellPrice = prices.frozenSet * amountOfPieces;
            frozenSetTotalSellPrice = frozenSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const frozenSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Frozen set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${frozenSetSellPrice}`)
              .addField(`Total sell price`, `${frozenSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(frozenSetSoldEmbed);
          }

          if (item == "superGolemSet") {
            superGolemSetSellPrice = prices.superGolemSet;
            db.add(`superGolemSetStoreAdd`, amountOfPieces);
            db.subtract(`superGolemSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.superGolemSet * amountOfPieces
            );
            superGolemSetSellPrice = superGolemSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            superGolemSetTotalSellPrice = prices.superGolemSet * amountOfPieces;
            superGolemSetTotalSellPrice = superGolemSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const superGolemSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Super golem set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${superGolemSetSellPrice}`)
              .addField(`Total sell price`, `${superGolemSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(superGolemSetSoldEmbed);
          }
          if (item == "dawnfireSet") {
            dawnfireSetSellPrice = prices.dawnfireSet;
            db.add(`dawnfireSetStoreAdd`, amountOfPieces);
            db.subtract(`dawnfireSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.dawnfireSet * amountOfPieces
            );
            dawnfireSetSellPrice = dawnfireSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dawnfireSetTotalSellPrice = prices.dawnfireSet * amountOfPieces;
            dawnfireSetTotalSellPrice = dawnfireSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const dawnfireSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Dawnfire set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${dawnfireSetSellPrice}`)
              .addField(`Total sell price`, `${dawnfireSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(dawnfireSetSoldEmbed);
          }
          if (item == "intrepidSet") {
            intrepidSetSellPrice = prices.intrepidSet;
            db.add(`intrepidSetStoreAdd`, amountOfPieces);
            db.subtract(`intrepidSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.intrepidSet * amountOfPieces
            );
            intrepidSetSellPrice = intrepidSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            intrepidSetTotalSellPrice = prices.intrepidSet * amountOfPieces;
            intrepidSetTotalSellPrice = intrepidSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const intrepidSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Intrepid set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${intrepidSetSellPrice}`)
              .addField(`Total sell price`, `${intrepidSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(intrepidSetSoldEmbed);
          }
          if (item == "medusaSet") {
            medusaSetSellPrice = prices.medusaSet;
            db.add(`medusaSetStoreAdd`, amountOfPieces);
            db.subtract(`medusaSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.medusaSet * amountOfPieces
            );
            medusaSetSellPrice = medusaSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            medusaSetTotalSellPrice = prices.medusaSet * amountOfPieces;
            medusaSetTotalSellPrice = medusaSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const medusaSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Medusa set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${medusaSetSellPrice}`)
              .addField(`Total sell price`, `${medusaSetTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(medusaSetSoldEmbed);
          }
          if (item == "supremeMagicalSet") {
            supremeMagicalSetSellPrice = prices.supremeMagicalSet;
            db.add(`supremeMagicalSetStoreAdd`, amountOfPieces);
            db.subtract(`supremeMagicalSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              prices.supremeMagicalSet * amountOfPieces
            );
            supremeMagicalSetSellPrice = supremeMagicalSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            supremeMagicalSetTotalSellPrice =
              prices.supremeMagicalSet * amountOfPieces;
            supremeMagicalSetTotalSellPrice = supremeMagicalSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const supremeMagicalSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Supreme magical set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${supremeMagicalSetSellPrice}`)
              .addField(
                `Total sell price`,
                `${supremeMagicalSetTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(supremeMagicalSetSoldEmbed);
          }
          if (item == "unlockedCrateOfEnergy") {
            message.channel.send("You cannot sell it");
          }
          if (item == "vortexOrb") {
            vortexOrbSellPrice = prices.vortexOrb / 2;
            db.add(`vortexOrbStoreAdd`, amountOfPieces);
            db.subtract(`vortexOrb_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.vortexOrb / 2) * amountOfPieces
            );
            vortexOrbSellPrice = vortexOrbSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            vortexOrbTotalSellPrice = (prices.vortexOrb / 2) * amountOfPieces;
            vortexOrbTotalSellPrice = vortexOrbTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const vortexOrbSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Vortex orb")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${vortexOrbSellPrice}`)
              .addField(`Total sell price`, `${vortexOrbTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(vortexOrbSoldEmbed);
          }
          if (item == "verdantLeaf") {
            verdantLeafSellPrice = prices.verdantLeaf / 2;
            db.add(`verdantLeafStoreAdd`, amountOfPieces);
            db.subtract(`verdantLeaf_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.verdantLeaf / 2) * amountOfPieces
            );
            verdantLeafSellPrice = verdantLeafSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            verdantLeafTotalSellPrice =
              (prices.verdantLeaf / 2) * amountOfPieces;
            verdantLeafTotalSellPrice = verdantLeafTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const verdantLeafSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Verdant whisper leaf")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${verdantLeafSellPrice}`)
              .addField(`Total sell price`, `${verdantLeafTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(verdantLeafSoldEmbed);
          }
          if (item == "celestialMoonstone") {
            celestialMoonstoneSellPrice = prices.celestialMoonstone / 2;
            db.add(`celestialMoonstoneStoreAdd`, amountOfPieces);
            db.subtract(`celestialMoonstone_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.celestialMoonstone / 2) * amountOfPieces
            );
            celestialMoonstoneSellPrice = celestialMoonstoneSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            celestialMoonstoneTotalSellPrice =
              (prices.celestialMoonstone / 2) * amountOfPieces;
            celestialMoonstoneTotalSellPrice = celestialMoonstoneTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const celestialMoonstoneSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Celestial Moonstone")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${celestialMoonstoneSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${celestialMoonstoneTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(celestialMoonstoneSoldEmbed);
          }
          if (item == "crystallineCorestone") {
            crystallineCorestoneSellPrice = prices.crystallineCorestone / 2;
            db.add(`crystallineCorestoneStoreAdd`, amountOfPieces);
            db.subtract(`crystallineCorestone_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.crystallineCorestone / 2) * amountOfPieces
            );
            crystallineCorestoneSellPrice = crystallineCorestoneSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            crystallineCorestoneTotalSellPrice =
              (prices.crystallineCorestone / 2) * amountOfPieces;
            crystallineCorestoneTotalSellPrice =
              crystallineCorestoneTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const crystallineCorestoneSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Crystalline corestone")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${crystallineCorestoneSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${crystallineCorestoneTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(crystallineCorestoneSoldEmbed);
          }
          if (item == "tomeOfEverlastingWisdom") {
            tomeOfEverlastingWisdomSellPrice =
              prices.tomeOfEverlastingWisdom / 2;
            db.add(`tomeOfEverlastingWisdomStoreAdd`, amountOfPieces);
            db.subtract(`tomeOfEverlastingWisdom_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.tomeOfEverlastingWisdom / 2) * amountOfPieces
            );
            tomeOfEverlastingWisdomSellPrice = tomeOfEverlastingWisdomSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            tomeOfEverlastingWisdomTotalSellPrice =
              (prices.tomeOfEverlastingWisdom / 2) * amountOfPieces;
            tomeOfEverlastingWisdomTotalSellPrice =
              tomeOfEverlastingWisdomTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const tomeOfEverlastingWisdomSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Tome of everlasting wisdom")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${tomeOfEverlastingWisdomSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${tomeOfEverlastingWisdomTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(tomeOfEverlastingWisdomSoldEmbed);
          }
          if (item == "rustyGears") {
            rustyGearsSellPrice = prices.rustyGears / 2;
            db.add(`rustyGearsStoreAdd`, amountOfPieces);
            db.subtract(`rustyGears_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.rustyGears / 2) * amountOfPieces
            );
            rustyGearsSellPrice = rustyGearsSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            rustyGearsTotalSellPrice = (prices.rustyGears / 2) * amountOfPieces;
            rustyGearsTotalSellPrice = rustyGearsTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const rustyGearsSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Rusty gears")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${rustyGearsSellPrice}`)
              .addField(`Total sell price`, `${rustyGearsTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(rustyGearsSoldEmbed);
          }
          if (item == "dustbin") {
            dustbinSellPrice = prices.dustbin / 2;
            db.add(`dustbinStoreAdd`, amountOfPieces);
            db.subtract(`dustbin_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.dustbin / 2) * amountOfPieces
            );
            dustbinSellPrice = dustbinSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dustbinTotalSellPrice = (prices.dustbin / 2) * amountOfPieces;
            dustbinTotalSellPrice = dustbinTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const dustbinSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Dustbin")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${dustbinSellPrice}`)
              .addField(`Total sell price`, `${dustbinTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(dustbinSoldEmbed);
          }
          if (item == "newspaper") {
            newspaperSellPrice = prices.newspaper / 2;
            db.add(`newspaperStoreAdd`, amountOfPieces);
            db.subtract(`newspaper_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.newspaper / 2) * amountOfPieces
            );
            newspaperSellPrice = newspaperSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            newspaperTotalSellPrice = (prices.newspaper / 2) * amountOfPieces;
            newspaperTotalSellPrice = newspaperTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const newspaperSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Newspaper")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${newspaperSellPrice}`)
              .addField(`Total sell price`, `${newspaperTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(newspaperSoldEmbed);
          }
          if (item == "tornCloth") {
            tornClothSellPrice = prices.tornCloth / 2;
            db.add(`tornClothStoreAdd`, amountOfPieces);
            db.subtract(`tornCloth_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.tornCloth / 2) * amountOfPieces
            );
            tornClothSellPrice = tornClothSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            tornClothTotalSellPrice = (prices.tornCloth / 2) * amountOfPieces;
            tornClothTotalSellPrice = tornClothTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const tornClothSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Torn cloth")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${tornClothSellPrice}`)
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(tornClothSoldEmbed);
          }
          if (item == "usedTissue") {
            usedTissueSellPrice = prices.usedTissue / 2;
            db.add(`usedTissueStoreAdd`, amountOfPieces);
            db.subtract(`usedTissue_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.usedTissue / 2) * amountOfPieces
            );
            usedTissueSellPrice = usedTissueSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            usedTissueTotalSellPrice = (prices.usedTissue / 2) * amountOfPieces;
            usedTissueTotalSellPrice = usedTissueTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const usedTissueSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Used tissue")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${usedTissueSellPrice}`)
              .addField(`Total sell price`, `${usedTissueTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(usedTissueSoldEmbed);
          }
          if (item == "brokenStick") {
            brokenStickSellPrice = prices.brokenStick / 2;
            db.add(`brokenStickStoreAdd`, amountOfPieces);
            db.subtract(`brokenStick_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.brokenStick / 2) * amountOfPieces
            );
            brokenStickSellPrice = brokenStickSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            brokenStickTotalSellPrice =
              (prices.brokenStick / 2) * amountOfPieces;
            brokenStickTotalSellPrice = brokenStickTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const brokenStickSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Broken stick")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${brokenStickSellPrice}`)
              .addField(`Total sell price`, `${brokenStickTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(brokenStickSoldEmbed);
          }
          if (item == "bullet") {
            bulletSellPrice = prices.bullet / 2;
            db.add(`bulletStoreAdd`, amountOfPieces);
            db.subtract(`bullet_${tokenDB}`, amountOfPieces);
            db.subtract(`power_${tokenDB}`, 0.48 * amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.bullet / 2) * amountOfPieces
            );
            bulletSellPrice = bulletSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            bulletTotalSellPrice = (prices.bullet / 2) * amountOfPieces;
            bulletTotalSellPrice = bulletTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const bulletSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Bullet")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${bulletSellPrice}`)
              .addField(`Total sell price`, `${bulletTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(bulletSoldEmbed);
          }
          if (item == "soldier") {
            message.channel.send(
              "You cannot sell a soldier , what are you even thinking 😑😑"
            );
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          }
          if (item == "awakeningGem") {
            awakeningGemSellPrice = prices.awakeningGem / 2;
            db.add(`awakeningGemStoreAdd`, amountOfPieces);
            db.subtract(`awakeningGem_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.awakeningGem / 2) * amountOfPieces
            );
            awakeningGemSellPrice = awakeningGemSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            awakeningGemTotalSellPrice =
              (prices.awakeningGem / 2) * amountOfPieces;
            awakeningGemTotalSellPrice = awakeningGemTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const awakeningGemSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Awakening gem")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${awakeningGemSellPrice}`)
              .addField(`Total sell price`, `${awakeningGemTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(awakeningGemSoldEmbed);
          }
          if (item == "eliteAwakeningGem") {
            eliteAwakeningGemSellPrice = prices.eliteAwakeningGem / 2;
            db.add(`eliteAwakeningGemStoreAdd`, amountOfPieces);
            db.subtract(`eliteAwakeningGem_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.eliteAwakeningGem / 2) * amountOfPieces
            );
            eliteAwakeningGemSellPrice = eliteAwakeningGemSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            eliteAwakeningGemTotalSellPrice =
              (prices.eliteAwakeningGem / 2) * amountOfPieces;
            eliteAwakeningGemTotalSellPrice = eliteAwakeningGemTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const eliteAwakeningGemSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Elite awakening gem")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${eliteAwakeningGemSellPrice}`)
              .addField(
                `Total sell price`,
                `${eliteAwakeningGemTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(eliteAwakeningGemSoldEmbed);
          }
          if (item == "valoriumsTear") {
            valoriumsTearSellPrice = prices.valoriumsTear / 2;
            db.add(`valoriumsTearStoreAdd`, amountOfPieces);
            db.subtract(`valoriumsTear_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.valoriumsTear / 2) * amountOfPieces
            );
            valoriumsTearSellPrice = valoriumsTearSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            valoriumsTearTotalSellPrice =
              (prices.valoriumsTear / 2) * amountOfPieces;
            valoriumsTearTotalSellPrice = valoriumsTearTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const valoriumsTearSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Valorium's tear")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${valoriumsTearSellPrice}`)
              .addField(`Total sell price`, `${valoriumsTearTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(valoriumsTearSoldEmbed);
          }
          if (item == "valoriumsEclipsianSoul") {
            valoriumsEclipsianSoulSellPrice = prices.valoriumsEclipsianSoul / 2;
            db.add(`valoriumsEclipsianSoulStoreAdd`, amountOfPieces);
            db.subtract(`valoriumsEclipsianSoul_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.valoriumsEclipsianSoul / 2) * amountOfPieces
            );
            valoriumsEclipsianSoulSellPrice = valoriumsEclipsianSoulSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            valoriumsEclipsianSoulTotalSellPrice =
              (prices.valoriumsEclipsianSoul / 2) * amountOfPieces;
            valoriumsEclipsianSoulTotalSellPrice =
              valoriumsEclipsianSoulTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const valoriumsEclipsianSoulSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Valorium's Eclipsian soul")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${valoriumsEclipsianSoulSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${valoriumsEclipsianSoulTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(valoriumsEclipsianSoulSoldEmbed);
          }
          if (item == "abyssalCrownOfDominance") {
            abyssalCrownOfDominanceSellPrice =
              prices.abyssalCrownOfDominance / 2;
            db.add(`abyssalCrownOfDominanceStoreAdd`, amountOfPieces);
            db.subtract(`abyssalCrownOfDominance_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.abyssalCrownOfDominance / 2) * amountOfPieces
            );
            abyssalCrownOfDominanceSellPrice = abyssalCrownOfDominanceSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            abyssalCrownOfDominanceTotalSellPrice =
              (prices.abyssalCrownOfDominance / 2) * amountOfPieces;
            abyssalCrownOfDominanceTotalSellPrice =
              abyssalCrownOfDominanceTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const abyssalCrownOfDominanceSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Abyssal crown of dominance")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${abyssalCrownOfDominanceSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${abyssalCrownOfDominanceTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(abyssalCrownOfDominanceSoldEmbed);
          }
          if (item == "abyssalStarcrystal") {
            abyssalStarcrystalSellPrice = prices.abyssalStarcrystal / 2;
            db.add(`abyssalStarcrystalStoreAdd`, amountOfPieces);
            db.subtract(`abyssalStarcrystal_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.abyssalStarcrystal / 2) * amountOfPieces
            );
            abyssalStarcrystalSellPrice = abyssalStarcrystalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            abyssalStarcrystalTotalSellPrice =
              (prices.abyssalStarcrystal / 2) * amountOfPieces;
            abyssalStarcrystalTotalSellPrice = abyssalStarcrystalTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const abyssalStarcrystalSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Abyssal starcrystal")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${abyssalStarcrystalSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${abyssalStarcrystalTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(abyssalStarcrystalSoldEmbed);
          }
          if (item == "eldrazursGrimoireOfRuin") {
            EldrazursGrimoireOfRuinSellPrice =
              prices.EldrazursGrimoireOfRuin / 2;
            db.add(`EldrazursGrimoireOfRuinStoreAdd`, amountOfPieces);
            db.subtract(`EldrazursGrimoireOfRuin_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.EldrazursGrimoireOfRuin / 2) * amountOfPieces
            );
            EldrazursGrimoireOfRuinSellPrice =
              EldrazursGrimoireOfRuinSellPrice.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            EldrazursGrimoireOfRuinTotalSellPrice =
              (prices.EldrazursGrimoireOfRuin / 2) * amountOfPieces;
            EldrazursGrimoireOfRuinTotalSellPrice =
              EldrazursGrimoireOfRuinTotalSellPrice.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            const EldrazursGrimoireOfRuinSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Eldra'zur's grimoire of ruin")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${EldrazursGrimoireOfRuinSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${EldrazursGrimoireOfRuinTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(EldrazursGrimoireOfRuinSoldEmbed);
          }
          if (item == "abyssalScepterOfOblivion") {
            AbyssalScepterOfOblivionSellPrice =
              prices.AbyssalScepterOfOblivion / 2;
            db.add(`AbyssalScepterOfOblivionStoreAdd`, amountOfPieces);
            db.subtract(`AbyssalScepterOfOblivion_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.AbyssalScepterOfOblivion / 2) * amountOfPieces
            );
            AbyssalScepterOfOblivionSellPrice =
              AbyssalScepterOfOblivionSellPrice.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            AbyssalScepterOfOblivionTotalSellPrice =
              (prices.AbyssalScepterOfOblivion / 2) * amountOfPieces;
            AbyssalScepterOfOblivionTotalSellPrice =
              AbyssalScepterOfOblivionTotalSellPrice.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              );
            const AbyssalScepterOfOblivionSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Abyssal scepter of oblivion")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${AbyssalScepterOfOblivionSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${AbyssalScepterOfOblivionTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(AbyssalScepterOfOblivionSoldEmbed);
          }
          if (item == "monarchSlayerTitle") {
            monarchSlayerTitleSellPrice = prices.monarchSlayerTitle / 2;
            db.add(`monarchSlayerTitleStoreAdd`, amountOfPieces);
            db.subtract(`monarchSlayerTitle_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.monarchSlayerTitle / 2) * amountOfPieces
            );
            monarchSlayerTitleSellPrice = monarchSlayerTitleSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            monarchSlayerTitleTotalSellPrice =
              (prices.monarchSlayerTitle / 2) * amountOfPieces;
            monarchSlayerTitleTotalSellPrice = monarchSlayerTitleTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const monarchSlayerTitleSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Monarch slayer title")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${monarchSlayerTitleSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${monarchSlayerTitleTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(monarchSlayerTitleSoldEmbed);
          }
          if (item == "mysticRuneOfResilience") {
            mysticRuneOfResilienceSellPrice = prices.mysticRuneOfResilience / 2;
            db.add(`mysticRuneOfResilienceStoreAdd`, amountOfPieces);
            db.subtract(`mysticRuneOfResilience_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.mysticRuneOfResilience / 2) * amountOfPieces
            );
            mysticRuneOfResilienceSellPrice = mysticRuneOfResilienceSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            mysticRuneOfResilienceTotalSellPrice =
              (prices.mysticRuneOfResilience / 2) * amountOfPieces;
            mysticRuneOfResilienceTotalSellPrice =
              mysticRuneOfResilienceTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const mysticRuneOfResilienceSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Mystic rune of resilience")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${mysticRuneOfResilienceSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${mysticRuneOfResilienceTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            if (mysticRuneOfResilience == 0) {
              db.set(`power_${tokenDB}`, (bullet * 0.48 + soldiers * 0.08) / 2);
            }

            message.channel.send(mysticRuneOfResilienceSoldEmbed);
          }
          if (item == "auroraGaze") {
            auroraGazeSellPrice = prices.auroraGaze / 2;
            db.add(`auroraGazeStoreAdd`, amountOfPieces);
            db.subtract(`auroraGaze_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.auroraGaze / 2) * amountOfPieces
            );
            auroraGazeSellPrice = auroraGazeSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            auroraGazeTotalSellPrice = (prices.auroraGaze / 2) * amountOfPieces;
            auroraGazeTotalSellPrice = auroraGazeTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const auroraGazeSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Aurora gaze")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${auroraGazeSellPrice}`)
              .addField(`Total sell price`, `${auroraGazeTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(auroraGazeSoldEmbed);
          }
          if (item == "orbOfElementalMastery") {
            orbOfElementalMasterySellPrice = prices.orbOfElementalMastery / 2;
            db.add(`orbOfElementalMasteryStoreAdd`, amountOfPieces);
            db.subtract(`orbOfElementalMastery_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.orbOfElementalMastery / 2) * amountOfPieces
            );
            orbOfElementalMasterySellPrice = orbOfElementalMasterySellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            orbOfElementalMasteryTotalSellPrice =
              (prices.orbOfElementalMastery / 2) * amountOfPieces;
            orbOfElementalMasteryTotalSellPrice =
              orbOfElementalMasteryTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const orbOfElementalMasterySoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Orb of elemental mastery")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${orbOfElementalMasterySellPrice}`
              )
              .addField(
                `Total sell price`,
                `${orbOfElementalMasteryTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(orbOfElementalMasterySoldEmbed);
          }
          if (item == "shieldOfTheEarthshaker") {
            shieldOfTheEarthshakerSellPrice = prices.shieldOfTheEarthshaker / 2;
            db.add(`shieldOfTheEarthshakerStoreAdd`, amountOfPieces);
            db.subtract(`shieldOfTheEarthshaker_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.shieldOfTheEarthshaker / 2) * amountOfPieces
            );
            shieldOfTheEarthshakerSellPrice = shieldOfTheEarthshakerSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            shieldOfTheEarthshakerTotalSellPrice =
              (prices.shieldOfTheEarthshaker / 2) * amountOfPieces;
            shieldOfTheEarthshakerTotalSellPrice =
              shieldOfTheEarthshakerTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const shieldOfTheEarthshakerSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Shield of the earthshaker")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${shieldOfTheEarthshakerSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${shieldOfTheEarthshakerTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(shieldOfTheEarthshakerSoldEmbed);
          }
          if (item == "timekeepersChronometer") {
            timekeepersChronometerSellPrice = prices.timekeepersChronometer / 2;
            db.add(`timekeepersChronometerStoreAdd`, amountOfPieces);
            db.subtract(`timekeepersChronometer_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.timekeepersChronometer / 2) * amountOfPieces
            );
            timekeepersChronometerSellPrice = timekeepersChronometerSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            timekeepersChronometerTotalSellPrice =
              (prices.timekeepersChronometer / 2) * amountOfPieces;
            timekeepersChronometerTotalSellPrice =
              timekeepersChronometerTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const timekeepersChronometerSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Timekeeper's chronometer")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${timekeepersChronometerSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${timekeepersChronometerTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(timekeepersChronometerSoldEmbed);
          }
          if (item == "eldritchFlamescroll") {
            eldritchFlamescrollSellPrice = prices.eldritchFlamescroll / 2;
            db.add(`eldritchFlamescrollStoreAdd`, amountOfPieces);
            db.subtract(`eldritchFlamescroll_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.eldritchFlamescroll / 2) * amountOfPieces
            );
            eldritchFlamescrollSellPrice = eldritchFlamescrollSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            eldritchFlamescrollTotalSellPrice =
              (prices.eldritchFlamescroll / 2) * amountOfPieces;
            eldritchFlamescrollTotalSellPrice =
              eldritchFlamescrollTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const eldritchFlamescrollSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Eldritch flamescroll")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${eldritchFlamescrollSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${eldritchFlamescrollTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(eldritchFlamescrollSoldEmbed);
          }
          if (item == "infernothsWrathfulEye") {
            infernothsWrathfulEyeSellPrice = prices.infernothsWrathfulEye / 2;
            db.add(`infernothsWrathfulEyeStoreAdd`, amountOfPieces);
            db.subtract(`infernothsWrathfulEye_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.infernothsWrathfulEye / 2) * amountOfPieces
            );
            infernothsWrathfulEyeSellPrice = infernothsWrathfulEyeSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            infernothsWrathfulEyeTotalSellPrice =
              (prices.infernothsWrathfulEye / 2) * amountOfPieces;
            infernothsWrathfulEyeTotalSellPrice =
              infernothsWrathfulEyeTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const infernothsWrathfulEyeSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Infernoth's wrathful eye")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${infernothsWrathfulEyeSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${infernothsWrathfulEyeTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(infernothsWrathfulEyeSoldEmbed);
          }
          if (item == "pyroclasmicGem") {
            pyroclasmicGemSellPrice = prices.pyroclasmicGem / 2;
            db.add(`pyroclasmicGemStoreAdd`, amountOfPieces);
            db.subtract(`pyroclasmicGem_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.pyroclasmicGem / 2) * amountOfPieces
            );
            pyroclasmicGemSellPrice = pyroclasmicGemSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            pyroclasmicGemTotalSellPrice =
              (prices.pyroclasmicGem / 2) * amountOfPieces;
            pyroclasmicGemTotalSellPrice = pyroclasmicGemTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const pyroclasmicGemSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Pyroclasmic gem")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${pyroclasmicGemSellPrice}`)
              .addField(`Total sell price`, `${pyroclasmicGemTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(pyroclasmicGemSoldEmbed);
          }
          if (item == "pyroclasmicEssence") {
            pyroclasmicEssenceSellPrice = prices.pyroclasmicEssence / 2;
            db.add(`pyroclasmicEssenceStoreAdd`, amountOfPieces);
            db.subtract(`pyroclasmicEssence_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.pyroclasmicEssence / 2) * amountOfPieces
            );
            pyroclasmicEssenceSellPrice = pyroclasmicEssenceSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            pyroclasmicEssenceTotalSellPrice =
              (prices.pyroclasmicEssence / 2) * amountOfPieces;
            pyroclasmicEssenceTotalSellPrice = pyroclasmicEssenceTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const pyroclasmicEssenceSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Pyroclasmic essence")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${pyroclasmicEssenceSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${pyroclasmicEssenceTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(pyroclasmicEssenceSoldEmbed);
          }
          if (item == "magmaticTorch") {
            magmaticTorchSellPrice = prices.magmaticTorch / 2;
            db.add(`magmaticTorchStoreAdd`, amountOfPieces);
            db.subtract(`magmaticTorch_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.magmaticTorch / 2) * amountOfPieces
            );
            magmaticTorchSellPrice = magmaticTorchSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            magmaticTorchTotalSellPrice =
              (prices.magmaticTorch / 2) * amountOfPieces;
            magmaticTorchTotalSellPrice = magmaticTorchTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const magmaticTorchSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Magmatic torch")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${magmaticTorchSellPrice}`)
              .addField(`Total sell price`, `${magmaticTorchTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(magmaticTorchSoldEmbed);
          }
          if (item == "eternalFlameEssence") {
            eternalFlameEssenceSellPrice = prices.eternalFlameEssence / 2;
            db.add(`eternalFlameEssenceStoreAdd`, amountOfPieces);
            db.subtract(`eternalFlameEssence_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.eternalFlameEssence / 2) * amountOfPieces
            );
            eternalFlameEssenceSellPrice = eternalFlameEssenceSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            eternalFlameEssenceTotalSellPrice =
              (prices.eternalFlameEssence / 2) * amountOfPieces;
            eternalFlameEssenceTotalSellPrice =
              eternalFlameEssenceTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const eternalFlameEssenceSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Eternal flame essence")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${eternalFlameEssenceSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${eternalFlameEssenceTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(eternalFlameEssenceSoldEmbed);
          }
          if (item == "blackOil") {
            blackOilSellPrice = prices.blackOil / 2;
            db.add(`blackOilStoreAdd`, amountOfPieces);
            db.subtract(`blackOil_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.blackOil / 2) * amountOfPieces
            );
            blackOilSellPrice = blackOilSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            blackOilTotalSellPrice = (prices.blackOil / 2) * amountOfPieces;
            blackOilTotalSellPrice = blackOilTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const blackOilSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Black oil")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${blackOilSellPrice}`)
              .addField(`Total sell price`, `${blackOilTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(blackOilSoldEmbed);
          }
          if (item == "hotWater") {
            hotWaterSellPrice = prices.hotWater / 2;
            db.add(`hotWaterStoreAdd`, amountOfPieces);
            db.subtract(`hotWater_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.hotWater / 2) * amountOfPieces
            );
            hotWaterSellPrice = hotWaterSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            hotWaterTotalSellPrice = (prices.hotWater / 2) * amountOfPieces;
            hotWaterTotalSellPrice = hotWaterTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const hotWaterSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Hot water")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${hotWaterSellPrice}`)
              .addField(`Total sell price`, `${hotWaterTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(hotWaterSoldEmbed);
          }
          if (item == "transparentGlass") {
            transparentGlassSellPrice = prices.transparentGlass / 2;
            db.add(`transparentGlassStoreAdd`, amountOfPieces);
            db.subtract(`transparentGlass_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.transparentGlass / 2) * amountOfPieces
            );
            transparentGlassSellPrice = transparentGlassSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            transparentGlassTotalSellPrice =
              (prices.transparentGlass / 2) * amountOfPieces;
            transparentGlassTotalSellPrice = transparentGlassTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const transparentGlassSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Transparent glass")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${transparentGlassSellPrice}`)
              .addField(`Total sell price`, `${transparentGlassTotalSellPrice}`)
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(transparentGlassSoldEmbed);
          }
          if (item == "moonsShineOfMetalSword") {
            moonsShineOfMetalSwordSellPrice = prices.moonsShineOfMetalSword / 2;
            db.add(`moonsShineOfMetalSwordStoreAdd`, amountOfPieces);
            db.subtract(`moonsShineOfMetalSword_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.moonsShineOfMetalSword / 2) * amountOfPieces
            );
            moonsShineOfMetalSwordSellPrice = moonsShineOfMetalSwordSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            moonsShineOfMetalSwordTotalSellPrice =
              (prices.moonsShineOfMetalSword / 2) * amountOfPieces;
            moonsShineOfMetalSwordTotalSellPrice =
              moonsShineOfMetalSwordTotalSellPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const moonsShineOfMetalSwordSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Moon's shine of metal sword")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(
                `Sell price per piece`,
                `${moonsShineOfMetalSwordSellPrice}`
              )
              .addField(
                `Total sell price`,
                `${moonsShineOfMetalSwordTotalSellPrice}`
              )
              .setTimestamp()
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(moonsShineOfMetalSwordSoldEmbed);
          }
          if (item == "trashItems") {
            var rustyGears = db.fetch(`rustyGears_${tokenDB}`) || 0;
            var rustyGearsSellPrice = prices.rustyGears / 2;
            var tornCloth = db.fetch(`tornCloth_${tokenDB}`) || 0;
            var tornClothSellPrice = prices.tornCloth / 2;
            var brokenStick = db.fetch(`brokenStick_${tokenDB}`) || 0;
            var brokenStickSellPrice = prices.brokenStick / 2;
            var dustbin = db.fetch(`dustbin_${tokenDB}`) || 0;
            var dustbinSellPrice = prices.dustbin / 2;
            var newspaper = db.fetch(`newspaper_${tokenDB}`) || 0;
            var newspaperSellPrice = prices.newspaper / 2;
            var usedTissue = db.fetch(`usedTissue_${tokenDB}`) || 0;
            var usedTissueSellPrice = prices.usedTissue / 2;
            if (rustyGears > 0) {
              db.set(`rustyGears_${tokenDB}`, 0);
              db.add(
                `money_${tokenDB}.pocket`,
                rustyGearsSellPrice * rustyGears
              );
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                rustyGearsSellPrice * rustyGears
              );
            }
            if (tornCloth > 0) {
              db.set(`tornCloth_${tokenDB}`, 0);
              db.add(`money_${tokenDB}.pocket`, tornClothSellPrice * tornCloth);
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                tornClothSellPrice * tornCloth
              );
            }
            if (brokenStick > 0) {
              db.set(`brokenStick_${tokenDB}`, 0);
              db.add(
                `money_${tokenDB}.pocket`,
                brokenStickSellPrice * brokenStick
              );
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                brokenStickSellPrice * brokenStick
              );
            }
            if (dustbin > 0) {
              db.set(`dustbin_${tokenDB}`, 0);
              db.add(`money_${tokenDB}.pocket`, dustbinSellPrice * dustbin);
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                dustbinSellPrice * dustbin
              );
            }
            if (newspaper > 0) {
              db.set(`newspaper_${tokenDB}`, 0);
              db.add(`money_${tokenDB}.pocket`, newspaperSellPrice * newspaper);
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                newspaperSellPrice * newspaper
              );
            }
            if (usedTissue > 0) {
              db.set(`usedTissue_${tokenDB}`, 0);
              db.add(
                `money_${tokenDB}.pocket`,
                usedTissueSellPrice * usedTissue
              );
              db.add(
                `trashItemsMoneyEarned_${tokenDB}`,
                usedTissueSellPrice * usedTissue
              );
            }
            if (
              rustyGears > 0 ||
              tornCloth > 0 ||
              brokenStick > 0 ||
              dustbin > 0 ||
              newspaper > 0 ||
              usedTissue > 0
            ) {
              trashItemsSellPrice =
                db.fetch(`trashItemsMoneyEarned_${tokenDB}`) || 0;
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
              db.set(`trashItemsMoneyEarned_${tokenDB}`, 0);
              message.channel.send(trashItemsSoldEmbed);
            } else {
              const noTrashEmbed = new Discord.MessageEmbed()
                .setDescription(`You dont have any trash item`)
                .setColor(`#008080`);
              message.channel.send(noTrashEmbed);
            }
          }
        }
      }
    }
  },
};
