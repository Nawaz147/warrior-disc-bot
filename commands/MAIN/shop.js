const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "goldShop",
  aliases: ["shop"],
  description: "To see shop",
  usage: "moneyShop",
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
      var natureDaggersPieces = db.fetch(`natureDaggersStoreAdd`);
      if (natureDaggersPieces == null) {
        natureDaggersPieces = 0;
      }
      var rashetaPieces = db.fetch(`rashetaStoreAdd`);
      if (rashetaPieces == null) {
        rashetaPieces = 0;
      }
      var waetraPieces = db.fetch(`waetraStoreAdd`);
      if (waetraPieces == null) {
        waetraPieces = 0;
      }
      var texarusPieces = db.fetch(`texarusStoreAdd`);
      if (texarusPieces == null) {
        texarusPieces = 0;
      }
      var rubyOfRoyaltyPieces = db.fetch(`rubyOfRoyaltyStoreAdd`);
      if (rubyOfRoyaltyPieces == null) {
        rubyOfRoyaltyPieces = 0;
      }
      var goldenGloryCardPieces = db.fetch(`goldenGloryCardStoreAdd`);
      if (goldenGloryCardPieces == null) {
        goldenGloryCardPieces = 0;
      }
      var royalStatueOfHonor = db.fetch(`royalStatueOfHonorStoreAdd`);
      if (royalStatueOfHonor == null) {
        royalStatueOfHonor = 0;
      }
      var royaltyCoinPieces = db.fetch(`royaltyCoinStoreAdd`);
      if (royaltyCoinPieces == null) {
        royaltyCoinPieces = 0;
      }

      var magnificentCarpetPieces = db.fetch(`magnificentCarpetStoreAdd`);
      if (magnificentCarpetPieces == null) {
        magnificentCarpetPieces = 0;
      }
      var magnificentPenPieces = db.fetch(`magnificentPenStoreAdd`);
      if (magnificentPenPieces == null) {
        magnificentPenPieces = 0;
      }
      var splendidTrophyPieces = db.fetch(`splendidTrophyStoreAdd`);
      if (splendidTrophyPieces == null) {
        splendidTrophyPieces = 0;
      }
      var keysSackPieces = db.fetch(`keysSackStoreAdd`);
      if (keysSackPieces == null) {
        keysSackPieces = 0;
      }
      var immortalGunPieces = db.fetch(`immortalGunStoreAdd`);
      if (immortalGunPieces == null) {
        immortalGunPieces = 0;
      }
      var daggerOfDeathPieces = db.fetch(`daggerOfDeathStoreAdd`);
      if (daggerOfDeathPieces == null) {
        daggerOfDeathPieces = 0;
      }
      var arcaneSenseiPieces = db.fetch(`arcaneSenseiStoreAdd`);
      if (arcaneSenseiPieces == null) {
        arcaneSenseiPieces = 0;
      }
      var goldenGhostKnightSetPieces = db.fetch(`goldenGhostKnightSetStoreAdd`);
      if (goldenGhostKnightSetPieces == null) {
        goldenGhostKnightSetPieces = 0;
      }
      var awakeningGemPieces = db.fetch(`awakeningGemStoreAdd`);
      if (awakeningGemPieces == null) {
        awakeningGemPieces = 0;
      }
      var EliteAwakeningGemPieces = db.fetch(`eliteAwakeningGemStoreAdd`);
      if (EliteAwakeningGemPieces == null) {
        EliteAwakeningGemPieces = 0;
      }
      var goldBarPieces = 999999999999999999999999999999999999999999999999999;
      if (goldBarPieces == null) {
        goldBarPieces = 0;
      }
      var bulletPieces = 999999999999999999999999999999999999999999999999999;
      if (bulletPieces == null) {
        bulletPieces = 0;
      }
      if (!args[1]) {
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        const shopEmbed = new Discord.MessageEmbed().setTitle(`SHOP`)
          .setDescription(`
----------------
**WEAPONS**
----------------

**DAGGER OF DEATH :** (${daggerOfDeathPieces}) in stock [price : 300,000,000] <sells for half price>
**IMMORTAL GUN OF ENERGY :** (${immortalGunPieces}) in stock [price : 150,000,000] <sells for half price>
**NATURE DAGGERS OF SUPERPOWER :** (${natureDaggersPieces}) in stock [price : 100,000,000] <sells for half price>
**RASHETA THE FURIOUS AXE :** (${rashetaPieces}) in stock [price : 50,000,000] <sells for half price>
**WAETRA THE FREEZED BOW :** (${waetraPieces}) in stock [price : 22,500,000] <sells for half price>
**TEXARUS THE DEMONISHED STAFF :** (${texarusPieces}) in stock [price : 5,000,000] <sells for half price>

----------------
**OTHERS**
----------------

**Awakening gem :** (${awakeningGemPieces}) in stock [price : 17,850] <sells for half price>
**Elite Awakening gem :** (${EliteAwakeningGemPieces}) in stock [price : 126,920] <sells for half price>
**Gold Bar :** (UNLIMITED) in stock [price : 10,000,000] <sells for full price>
**Bullet :** (UNLIMITED) in stock [price : 35,000,000] <sells for half price>
`);
        message.channel.send(shopEmbed);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      } else {
        const money = db.fetch(`money_${tokenDB}.pocket`);
        if (args[0] == "buy") {
          if (args[1] == "bullet") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentioned = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentioned);
            } else if (money < prices.bullet * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (bulletPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (bulletPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`bullet_${tokenDB}`, 1);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.bullet * amountOfPieces
              );
              db.subtract(`bulletStoreAdd`, amountOfPieces);
              db.add(`power_${tokenDB}`, amountOfPieces * 0.48);
              var bulletPrice = prices.bullet;
              var bulletTotalPrice = prices.bullet * amountOfPieces;
              bulletPrice = bulletPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              bulletTotalPrice = bulletTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const bulletEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Bullet`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${bulletPrice}`)
                .addField(`Total buy price`, `${bulletTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(bulletEmbed);
            }
          }
          if (args[1] == "natureDaggers") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.natureDaggers * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (natureDaggersPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (natureDaggersPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`natureDaggers_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.natureDaggers * amountOfPieces
              );
              db.subtract(`natureDaggersStoreAdd`, amountOfPieces);
              var natureDaggersPrice = prices.natureDaggers;
              var natureDaggersTotalPrice =
                prices.natureDaggers * amountOfPieces;
              natureDaggersPrice = natureDaggersPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              natureDaggersTotalPrice = natureDaggersTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const natureDaggersEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Nature daggers of superpower`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${natureDaggersPrice}`)
                .addField(`Total buy price`, `${natureDaggersTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(natureDaggersEmbed);
            }
          }
          if (args[1] == "immortalGun") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.immortalGun * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (immortalGunPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (immortalGunPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`immortalGun_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.immortalGun * amountOfPieces
              );
              db.subtract(`immortalGunStoreAdd`, amountOfPieces);
              var immortalGunPrice = prices.immortalGun;
              var immortalGunTotalPrice = prices.immortalGun * amountOfPieces;
              immortalGunPrice = immortalGunPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              immortalGunTotalPrice = immortalGunTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const immortalGunEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Immortal gun of energy`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${immortalGunPrice}`)
                .addField(`Total buy price`, `${immortalGunTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(immortalGunEmbed);
            }
          }
          if (args[1] == "rasheta") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.rasheta * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (rashetaPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (rashetaPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`rasheta_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.rasheta * amountOfPieces
              );
              db.subtract(`rashetaStoreAdd`, amountOfPieces);
              var rashetaPrice = prices.rasheta;
              var rashetaTotalPrice = prices.rasheta * amountOfPieces;
              rashetaPrice = rashetaPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              rashetaTotalPrice = rashetaTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const rashetaEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Rasheta the furious axe`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${rashetaPrice}`)
                .addField(`Total buy price`, `${rashetaTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(rashetaEmbed);
            }
          }
          if (args[1] == "waetra") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.waetra * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (waetraPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (waetraPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`waetra_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.waetra * amountOfPieces
              );
              db.subtract(`waetraStoreAdd`, amountOfPieces);
              var waetraPrice = prices.waetra;
              var waetraTotalPrice = prices.waetra * amountOfPieces;
              waetraPrice = waetraPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              waetraTotalPrice = waetraTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const waetraEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Waetra the freezed bow`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${waetraPrice}`)
                .addField(`Total buy price`, `${waetraTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(waetraEmbed);
            }
          }
          if (args[1] == "texarus") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.texarus * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (texarusPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (texarusPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`texarus_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.texarus * amountOfPieces
              );
              db.subtract(`texarusStoreAdd`, amountOfPieces);
              var texarusPrice = prices.texarus;
              var texarusTotalPrice = prices.texarus * amountOfPieces;
              texarusPrice = texarusPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              texarusTotalPrice = texarusTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const texarusEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Texarus the demonished staff`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${texarusPrice}`)
                .addField(`Total buy price`, `${texarusTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(texarusEmbed);
            }
          }
          if (args[1] == "awakeningGem") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.awakeningGem * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (awakeningGemPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (awakeningGemPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`awakeningGem_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.awakeningGem * amountOfPieces
              );
              db.subtract(`awakeningGemStoreAdd`, amountOfPieces);
              var awakeningGemPrice = prices.awakeningGem;
              var awakeningGemTotalPrice = prices.awakeningGem * amountOfPieces;
              awakeningGemPrice = awakeningGemPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              awakeningGemTotalPrice = awakeningGemTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const awakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Awakening gem`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${awakeningGemPrice}`)
                .addField(`Total buy price`, `${awakeningGemTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(awakeningGemEmbed);
            }
          }
          // ... your existing code ...

          if (args[1] == "eliteAwakeningGem") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.eliteAwakeningGem * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (eliteAwakeningGemPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (eliteAwakeningGemPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`eliteAwakeningGem_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.eliteAwakeningGem * amountOfPieces
              );
              db.subtract(`eliteAwakeningGemStoreAdd`, amountOfPieces);
              var eliteAwakeningGemPrice = prices.eliteAwakeningGem;
              var eliteAwakeningGemTotalPrice =
                prices.eliteAwakeningGem * amountOfPieces;
              eliteAwakeningGemPrice = eliteAwakeningGemPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              eliteAwakeningGemTotalPrice = eliteAwakeningGemTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const eliteAwakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Elite awakening gem`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${eliteAwakeningGemPrice}`)
                .addField(`Total buy price`, `${eliteAwakeningGemTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(eliteAwakeningGemEmbed);
            }
          }
          if (args[1] == "goldBar") {
            var amountOfPieces = args[2];
            if (!amountOfPieces) {
              const PiecesNotMentionedEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `Please enter valid amount of pieces [eg. shop buy (itemID).v]`
                )
                .setColor(`#b10000`);
              message.channel.send(PiecesNotMentionedEmbed);
            } else if (money < prices.goldBar * amountOfPieces) {
              const insufficientMoneyEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `You dont have sufficient amount of money to purchase this item`
                )
                .setColor(`#b10000`);
              message.channel.send(insufficientMoneyEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (goldBarPieces == 0) {
              const zeroPiecesEmbed = new Discord.MessageEmbed()
                .setDescription(`There are (0) pieces of it in the shop`)
                .setColor(`#b10000`);
              message.channel.send(zeroPiecesEmbed);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (goldBarPieces < amountOfPieces) {
              const amountExceededEmbed = new Discord.MessageEmbed()
                .setDescription(
                  `${amountOfPieces} pieces of it are not available in the shop`
                )
                .setColor(`#b10000`);
              message.channel.send(amountExceededEmbed);
            } else {
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`goldBar_${tokenDB}`, amountOfPieces);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.goldBar * amountOfPieces
              );
              var goldBarPrice = prices.goldBar;
              var goldBarTotalPrice = prices.goldBar * amountOfPieces;
              goldBarPrice = goldBarPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              goldBarTotalPrice = goldBarTotalPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const goldBarEmbed = new Discord.MessageEmbed()
                .setTitle(`Purchase successful`)
                .addField(`Item name`, `Nature daggers of superpower`)
                .addField(`Number of pieces`, `${amountOfPieces}`)
                .addField(`Buy price per piece`, `${goldBarPrice}`)
                .addField(`Total buy price`, `${goldBarTotalPrice}`)
                .setColor(`#56FFA4`)
                .setTimestamp();
              message.channel.send(goldBarEmbed);
            }
          }
        }
      }
    }
  },
};
