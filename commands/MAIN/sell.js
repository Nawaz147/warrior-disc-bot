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

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      var item = args[0];
      if (!item) {
        message.channel.send(
          "Enter an item name you want to sell , eg: +sell rasheta"
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
          if (item == "goldBar") {
            goldBarSellPrice = prices.goldBar;
            db.add(`goldBarStoreAdd`, amountOfPieces);
            db.subtract(`goldBar_${tokenDB}`, amountOfPieces);
            db.add(`money_${tokenDB}.pocket`, prices.goldBar * amountOfPieces);
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
              .addField(`Pieces left with you`, `${goldBar - amountOfPieces}`)
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(goldBarSoldEmbed);
          }
          if (item == "rasheta") {
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
              .addField(`Pieces left with you`, `${rasheta - amountOfPieces}`)
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(rashetaSoldEmbed);
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
              .addField(`Pieces left with you`, `${waetra - amountOfPieces}`)
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
              .addField(`Pieces left with you`, `${texarus - amountOfPieces}`)
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
              .addField(
                `Pieces left with you`,
                `${natureDaggers - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${immortalGun - amountOfPieces}`
              )
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
                .addField(
                  `Pieces left with you`,
                  `${daggerOfDeath - amountOfPieces}`
                )
                .setColor("#008080");
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              message.channel.send(daggerOfDeathSoldEmbed);
            }
          }

          if (item == "goldenGhostKnightSet") {
            goldenGhostKnightSetSellPrice = prices.goldenGhostKnightSet / 2;
            db.add(`goldenGhostKnightSetStoreAdd`, amountOfPieces);
            db.subtract(`goldenGhostKnightSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.goldenGhostKnightSet / 2) * amountOfPieces
            );
            goldenGhostKnightSetSellPrice = goldenGhostKnightSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            goldenGhostKnightSetTotalSellPrice =
              (prices.goldenGhostKnightSet / 2) * amountOfPieces;
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
              .addField(
                `Pieces left with you`,
                `${goldenGhostKnightSet - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(goldenGhostKnightSetSoldEmbed);
          }
          if (item == "arcaneSenseiSet") {
            arcaneSenseiSetSellPrice = prices.arcaneSenseiSet / 2;
            db.add(`arcaneSenseiSetStoreAdd`, amountOfPieces);
            db.subtract(`arcaneSenseiSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.arcaneSenseiSet / 2) * amountOfPieces
            );
            arcaneSenseiSetSellPrice = arcaneSenseiSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            arcaneSenseiSetTotalSellPrice =
              (prices.arcaneSenseiSet / 2) * amountOfPieces;
            arcaneSenseiSetTotalSellPrice = arcaneSenseiSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const arcaneSenseiSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Arcane sensei set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${arcaneSenseiSetSellPrice}`)
              .addField(`Total sell price`, `${arcaneSenseiSetTotalSellPrice}`)
              .addField(
                `Pieces left with you`,
                `${arcaneSenseiSet - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(arcaneSenseiSetSoldEmbed);
          }

          if (item == "frozenSet") {
            frozenSetSellPrice = prices.frozenSet / 2;
            db.add(`frozenSetStoreAdd`, amountOfPieces);
            db.subtract(`frozenSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.frozenSet / 2) * amountOfPieces
            );
            frozenSetSellPrice = frozenSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            frozenSetTotalSellPrice = (prices.frozenSet / 2) * amountOfPieces;
            frozenSetTotalSellPrice = frozenSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const frozenSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Frozen set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${frozenSetSellPrice}`)
              .addField(`Total sell price`, `${frozenSetTotalSellPrice}`)
              .addField(`Pieces left with you`, `${frozenSet - amountOfPieces}`)
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(frozenSetSoldEmbed);
          }

          if (item == "superGolemSet") {
            superGolemSetSellPrice = prices.superGolemSet / 2;
            db.add(`superGolemSetStoreAdd`, amountOfPieces);
            db.subtract(`superGolemSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.superGolemSet / 2) * amountOfPieces
            );
            superGolemSetSellPrice = superGolemSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            superGolemSetTotalSellPrice =
              (prices.superGolemSet / 2) * amountOfPieces;
            superGolemSetTotalSellPrice = superGolemSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const superGolemSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Super golem set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${superGolemSetSellPrice}`)
              .addField(`Total sell price`, `${superGolemSetTotalSellPrice}`)
              .addField(
                `Pieces left with you`,
                `${superGolemSet - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(superGolemSetSoldEmbed);
          }
          if (item == "dawnfireSet") {
            dawnfireSetSellPrice = prices.dawnfireSet / 2;
            db.add(`dawnfireSetStoreAdd`, amountOfPieces);
            db.subtract(`dawnfireSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.dawnfireSet / 2) * amountOfPieces
            );
            dawnfireSetSellPrice = dawnfireSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dawnfireSetTotalSellPrice =
              (prices.dawnfireSet / 2) * amountOfPieces;
            dawnfireSetTotalSellPrice = dawnfireSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const dawnfireSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Dawnfire set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${dawnfireSetSellPrice}`)
              .addField(`Total sell price`, `${dawnfireSetTotalSellPrice}`)
              .addField(
                `Pieces left with you`,
                `${dawnfireSet - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(dawnfireSetSoldEmbed);
          }
          if (item == "intrepidSet") {
            intrepidSetSellPrice = prices.intrepidSet / 2;
            db.add(`intrepidSetStoreAdd`, amountOfPieces);
            db.subtract(`intrepidSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.intrepidSet / 2) * amountOfPieces
            );
            intrepidSetSellPrice = intrepidSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            intrepidSetTotalSellPrice =
              (prices.intrepidSet / 2) * amountOfPieces;
            intrepidSetTotalSellPrice = intrepidSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const intrepidSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Intrepid set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${intrepidSetSellPrice}`)
              .addField(`Total sell price`, `${intrepidSetTotalSellPrice}`)
              .addField(
                `Pieces left with you`,
                `${intrepidSet - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(intrepidSetSoldEmbed);
          }
          if (item == "medusaSet") {
            medusaSetSellPrice = prices.medusaSet / 2;
            db.add(`medusaSetStoreAdd`, amountOfPieces);
            db.subtract(`medusaSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.medusaSet / 2) * amountOfPieces
            );
            medusaSetSellPrice = medusaSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            medusaSetTotalSellPrice = (prices.medusaSet / 2) * amountOfPieces;
            medusaSetTotalSellPrice = medusaSetTotalSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const medusaSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Sold Successfully`)
              .addField(`Item name`, "Medusa set")
              .addField(`Number of pieces`, `${amountOfPieces}`)
              .addField(`Sell price per piece`, `${medusaSetSellPrice}`)
              .addField(`Total sell price`, `${medusaSetTotalSellPrice}`)
              .addField(`Pieces left with you`, `${medusaSet - amountOfPieces}`)
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(medusaSetSoldEmbed);
          }
          if (item == "supremeMagicalSet") {
            supremeMagicalSetSellPrice = prices.supremeMagicalSet / 2;
            db.add(`supremeMagicalSetStoreAdd`, amountOfPieces);
            db.subtract(`supremeMagicalSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.supremeMagicalSet / 2) * amountOfPieces
            );
            supremeMagicalSetSellPrice = supremeMagicalSetSellPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            supremeMagicalSetTotalSellPrice =
              (prices.supremeMagicalSet / 2) * amountOfPieces;
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
              .addField(
                `Pieces left with you`,
                `${supremeMagicalSet - amountOfPieces}`
              )
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
              .addField(`Pieces left with you`, `${vortexOrb - amountOfPieces}`)
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
              .addField(
                `Pieces left with you`,
                `${verdantLeaf - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${celestialMoonstone - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${crystallineCorestone - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${tomeOfEverlastingWisdom - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${rustyGears - amountOfPieces}`
              )
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
              .addField(`Pieces left with you`, `${dustbin - amountOfPieces}`)
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
              .addField(`Pieces left with you`, `${newspaper - amountOfPieces}`)
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
              .addField(`Total sell price`, `${tornClothTotalSellPrice}`)
              .addField(`Pieces left with you`, `${tornCloth - amountOfPieces}`)
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
              .addField(
                `Pieces left with you`,
                `${usedTissue - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${brokenStick - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(brokenStickSoldEmbed);
          }
          if (item == "bullet") {
            bulletSellPrice = prices.bullet / 2;
            db.add(`bulletStoreAdd`, amountOfPieces);
            db.subtract(`bullet_${tokenDB}`, amountOfPieces);
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
              .addField(`Pieces left with you`, `${bullet - amountOfPieces}`)
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
              .addField(
                `Pieces left with you`,
                `${awakeningGem - amountOfPieces}`
              )
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
              .addField(
                `Pieces left with you`,
                `${eliteAwakeningGem - amountOfPieces}`
              )
              .setColor("#008080");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            message.channel.send(eliteAwakeningGemSoldEmbed);
          }
        }
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
          db.add(`money_${tokenDB}.pocket`, rustyGearsSellPrice * rustyGears);
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
          db.add(`money_${tokenDB}.pocket`, brokenStickSellPrice * brokenStick);
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
          db.add(`money_${tokenDB}.pocket`, usedTissueSellPrice * usedTissue);
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
            .addField(`Item name`, "All useless trash items")
            .addField(`Total sell price`, `${trashItemsSellPrice}`)
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
  },
};
