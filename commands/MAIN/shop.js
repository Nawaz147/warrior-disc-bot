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
            const quantity = parseInt(args[2]);

            if (isNaN(quantity) || quantity <= 0) {
              message.channel.send(
                `Please provide a valid number of Bullets to buy.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (money < prices.bullet * quantity) {
              message.channel.send(
                `You don't have enough money to buy ${quantity} Bullet(s).`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (bulletPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Bullet in Valorium shop.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (quantity > bulletPieces) {
              message.channel.send(
                `There are only ${bulletPieces} Bullet(s) left.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              if (money < prices.bullet) {
                message.channel.send(`You dont have enough money to buy it`);
                db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
              } else if (bulletPieces == 0) {
                message.channel.send(`There are (0) pieces in Valorium shop`);
                db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
              } else {
                const bulletEmbed = new Discord.MessageEmbed()
                  .setTitle(`Bullet`)
                  .setDescription(`You purchased ${quantity}x bullets`);
                message.channel.send(bulletEmbed);
                db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
                db.add(`bullet_${tokenDB}`, 1);
                db.subtract(`money_${tokenDB}.pocket`, prices.bullet);
                db.subtract(`bulletStoreAdd`, 1);
              }
            }
          }
          if (args[1] == "natureDaggers") {
            if (money < prices.natureDaggers) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (natureDaggersPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const natureDaggersEmbed = new Discord.MessageEmbed()
                .setTitle(`Nature daggers of superpower`)
                .setDescription(`You purchased Nature Daggers of superpower !`);
              message.channel.send(natureDaggersEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`natureDaggers_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.natureDaggers);
              db.subtract(`natureDaggersStoreAdd`, 1);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            }
          }
          if (args[1] == "immortalGun") {
            if (money < prices.immortalGun) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (immortalGunPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const immortalGunEmbed = new Discord.MessageEmbed()
                .setTitle(`Immortal Gun of Energy`)
                .setDescription(`You purchased Immortal Gun of Energy`);
              message.channel.send(immortalGunEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`immortalGun_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.immortalGun);
              db.subtract(`immortalGunStoreAdd`, 1);
            }
          }
          if (args[1] == "rasheta") {
            if (money < prices.rasheta) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (rashetaPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const rashetaEmbed = new Discord.MessageEmbed()
                .setTitle(`Rasheta the furious axe`)
                .setDescription(`You purchased Rasheta the furious axe !`);
              message.channel.send(rashetaEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`rasheta_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.rasheta);
              db.subtract(`rashetaStoreAdd`, 1);
            }
          }
          if (args[1] == "waetra") {
            if (money < prices.waetra) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (waetraPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const waetraEmbed = new Discord.MessageEmbed()
                .setTitle(`Waetra the freezed bow`)
                .setDescription(`You purchased Waetra the freezed bow !`);
              message.channel.send(waetraEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`waetra_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.waetra);
              db.subtract(`waetraStoreAdd`, 1);
            }
          }
          if (args[1] == "texarus") {
            if (money < prices.texarus) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (texarusPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const texarusEmbed = new Discord.MessageEmbed()
                .setTitle(`Texarus the demonished staff`)
                .setDescription(`You purchased Texarus the demonished staff !`);
              message.channel.send(texarusEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`texarus_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.texarus);
              db.subtract(`texarusStoreAdd`, 1);
            }
          }
          // ... your existing code ...

          if (args[1] == "awakeningGem") {
            const quantity = parseInt(args[2]);

            if (isNaN(quantity) || quantity <= 0) {
              message.channel.send(
                `Please provide a valid number of awakening gems to buy.`
              );
            } else if (money < prices.awakeningGem * quantity) {
              message.channel.send(
                `You don't have enough money to buy ${quantity} awakening gem(s).`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (awakeningGemPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Awakening gem in Valorium shop.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (quantity > awakeningGemPieces) {
              message.channel.send(
                `There are only ${awakeningGemPieces} awakening gem(s) left.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const awakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Awakening gem`)
                .setDescription(
                  `You purchased Awakening gem (${quantity} pieces)`
                );
              message.channel.send(awakeningGemEmbed);
              db.add(`awakeningGem_${tokenDB}`, quantity);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.awakeningGem * quantity
              );
              db.subtract(`awakeningGemStoreAdd`, quantity);
            }
          }
          // ... your existing code ...

          if (args[1] == "eliteAwakeningGem") {
            const quantity = parseInt(args[2]);

            if (isNaN(quantity) || quantity <= 0) {
              message.channel.send(
                `Please provide a valid number of elite awakening gems to buy.`
              );
            } else if (money < prices.eliteAwakeningGem * quantity) {
              message.channel.send(
                `You don't have enough money to buy ${quantity} elite awakening gem(s).`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (EliteAwakeningGemPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Elite Awakening gem in Valorium shop.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (quantity > EliteAwakeningGemPieces) {
              message.channel.send(
                `There are only ${EliteAwakeningGemPieces} elite awakening gem(s) left.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const eliteAwakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Elite Awakening gem`)
                .setDescription(
                  `You purchased Elite Awakening gem (${quantity} pieces)`
                );
              message.channel.send(eliteAwakeningGemEmbed);
              db.add(`eliteAwakeningGem_${tokenDB}`, quantity);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.eliteAwakeningGem * quantity
              );
              db.subtract(`EliteAwakeningGemStoreAdd`, quantity);
            }
          }
          if (args[1] == "goldBar") {
            const quantity = parseInt(args[2]);

            if (isNaN(quantity) || quantity <= 0) {
              message.channel.send(
                `Please provide a valid number of elite awakening gems to buy.`
              );
            } else if (money < prices.goldBar * quantity) {
              message.channel.send(
                `You don't have enough money to buy ${quantity} Gold Bar(s).`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (goldBarPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Gold Bar in Valorium shop.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (quantity > goldBarPieces) {
              message.channel.send(
                `There are only ${goldBarPieces} Gold Bar(s) left.`
              );
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const goldBarEmbed = new Discord.MessageEmbed()
                .setTitle(`Gold Bar`)
                .setDescription(`You purchased Gold Bar (${quantity} pieces)`);
              message.channel.send(goldBarEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`goldBar_${tokenDB}`, quantity);
              db.subtract(`money_${tokenDB}.pocket`, prices.goldBar * quantity);
              db.subtract(`goldBarStoreAdd`, quantity);
            }
          }
          // ... your existing code ...

          // ... your existing code ...

          if (args[1] == "rubyOfRoyalty") {
            if (money < prices.rubyOfRoyalty) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (rubyOfRoyaltyPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const rubyOfRoyaltyEmbed = new Discord.MessageEmbed()
                .setTitle(`Ruby of royalty`)
                .setDescription(`You purchased Ruby of Royalty !`);
              message.channel.send(rubyOfRoyaltyEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`rubyOfRoyalty_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.rubyOfRoyalty);
              db.subtract(`rubyOfRoyaltyStoreAdd`, 1);
            }
          }
          if (args[1] == "goldenGloryCard") {
            if (money < prices.goldenGloryCard) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (goldenGloryCardPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const goldenGloryCardEmbed = new Discord.MessageEmbed()
                .setTitle(`Golden glory card`)
                .setDescription(`You purchased Golden glory card !`);
              message.channel.send(goldenGloryCardEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`goldenGloryCard_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.goldenGloryCard);
              db.subtract(`goldenGloryCardStoreAdd`, 1);
            }
          }
          if (args[1] == "royalStatueOfHonor") {
            if (money < prices.royalStatueOfHonor) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (royalStatueOfHonor == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const royalStatueOfHonorEmbed = new Discord.MessageEmbed()
                .setTitle(`Royalty Statue of Honor`)
                .setDescription(`You purchased Royalty Statue of Honor !`);
              message.channel.send(royalStatueOfHonorEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`royalStatueOfHonor_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.royalStatueOfHonor);
              db.subtract(`royalStatueOfHonorStoreAdd`, 1);
            }
          }
          if (args[1] == "royaltyCoin") {
            if (money < prices.royalStatueOfHonor) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (royaltyCoinPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const royaltyCoinEmbed = new Discord.MessageEmbed()
                .setTitle(`Royalty Coin`)
                .setDescription(`You purchased Royalty Coin !`);
              message.channel.send(royaltyCoinEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`royaltyCoin_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.royalStatueOfHonor);
              db.subtract(`royaltyCoinStoreAdd`, 1);
            }
          }

          if (args[1] == "magnificentCarpet") {
            if (money < prices.magnificentCarpet) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (magnificentCarpetPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const magnificentCarpetEmbed = new Discord.MessageEmbed()
                .setTitle(`Magnificent Carpet`)
                .setDescription(`You purchased Magnificent Carpet !`);
              message.channel.send(magnificentCarpetEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`magnificentCarpet_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.magnificentCarpet);
              db.subtract(`magnificentCarpetStoreAdd`, 1);
            }
          }
          if (args[1] == "magnificentPen") {
            if (money < prices.magnificentPen) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (magnificentPenPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const magnificentPenEmbed = new Discord.MessageEmbed()
                .setTitle(`Magnificent Pen`)
                .setDescription(`You purchased Magnificent Pen !`);
              message.channel.send(magnificentPenEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`magnificentPen_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.magnificentPen);
              db.subtract(`magnificentPenStoreAdd`, 1);
            }
          }

          if (args[1] == "splendidTrophy") {
            if (money < prices.splendidTrophy) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (splendidTrophyPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const splendidTrophyEmbed = new Discord.MessageEmbed()
                .setTitle(`Splendid Trophy`)
                .setDescription(`You purchased Splendid Trophy !`);
              message.channel.send(splendidTrophyEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`splendidTrophy_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.splendidTrophy);
              db.subtract(`splendidTrophyStoreAdd`, 1);
            }
          }

          if (args[1] == "keysSack") {
            if (money < prices.keysSack) {
              message.channel.send(`You dont have enough money to buy it`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else if (keysSackPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
              db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
            } else {
              const keysSackEmbed = new Discord.MessageEmbed()
                .setTitle(`1x 2850 keys sack`)
                .setDescription(`You purchased 2850 keys sack !`);
              message.channel.send(keysSackEmbed);
              db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
              db.add(`2850keys_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.keysSack);
              db.subtract(`keysSackStoreAdd`, 1);
            }
          }
        }
      }
    }
  },
};
