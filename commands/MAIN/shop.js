const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const prices = require("../../prices.json");
module.exports = {
  name: "goldShop",
  aliases: ["shop"],
  description: "To see shop",
  usage: "moneyShop",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
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
      var awakeningGemPieces = 999999999999999999999999999999999999999999999999999;
      if (awakeningGemPieces == null) {
        awakeningGemPieces = 0;
      }
      var EliteAwakeningGemPieces = 999999999999999999999999999999999999999999999999999;
      if (EliteAwakeningGemPieces == null) {
        EliteAwakeningGemPieces = 0;
      }
      if (!args[1]) {
        const shopEmbed = new Discord.MessageEmbed().setTitle(`SHOP`)
          .setDescription(`
----------------
**WEAPONS**
----------------

**IMMORTAL GUN OF ENERGY :** (${immortalGunPieces}) in stock [price : 150,000,000]
**NATURE DAGGERS OF SUPERPOWER :** (${natureDaggersPieces}) in stock [price : 100,000,000]
**RASHETA THE FURIOUS AXE :** (${rashetaPieces}) in stock [price : 50,000,000]
**WAETRA THE FREEZED BOW :** (${waetraPieces}) in stock [price : 22,500,000]
**TEXARUS THE DEMONISHED STAFF :** (${texarusPieces}) in stock [price : 5,000,000]

----------------
**OTHERS**
----------------

**Awakening gem :** (UNLIMITED) in stock [price : 17,850]
**Elite Awakening gem :** (UNLIMITED) in stock [price : 126,920]
`);
        message.channel.send(shopEmbed);
      } else {
        const money = db.fetch(`money_${tokenDB}.pocket`);
        if (args[0] == "buy") {
          if (args[1] == "natureDaggers") {
            if (money < prices.natureDaggers) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (natureDaggersPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const natureDaggersEmbed = new Discord.MessageEmbed()
                .setTitle(`Nature daggers of superpower`)
                .setDescription(`You purchased Nature Daggers of superpower !`);
              message.channel.send(natureDaggersEmbed);
              db.add(`natureDaggers_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.natureDaggers);
              db.subtract(`natureDaggersStoreAdd`, 1);
            }
          }
          if (args[1] == "immortalGun") {
            if (money < prices.immortalGun) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (immortalGunPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const immortalGunEmbed = new Discord.MessageEmbed()
                .setTitle(`Immortal Gun of Energy`)
                .setDescription(`You purchased Immortal Gun of Energy`);
              message.channel.send(immortalGunEmbed);
              db.add(`immortalGun_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.immortalGun);
              db.subtract(`immortalGunStoreAdd`, 1);
            }
          }
          if (args[1] == "rasheta") {
            if (money < prices.rashetaAxe) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (rashetaPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const rashetaEmbed = new Discord.MessageEmbed()
                .setTitle(`Rasheta the furious axe`)
                .setDescription(`You purchased Rasheta the furious axe !`);
              message.channel.send(rashetaEmbed);
              db.add(`rasheta_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.rashetaAxe);
              db.subtract(`rashetaStoreAdd`, 1);
            }
          }
          if (args[1] == "waetra") {
            if (money < prices.waetraBow) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (waetraPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const waetraEmbed = new Discord.MessageEmbed()
                .setTitle(`Waetra the freezed bow`)
                .setDescription(`You purchased Waetra the freezed bow !`);
              message.channel.send(waetraEmbed);
              db.add(`waetra_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.waetraBow);
              db.subtract(`waetraStoreAdd`, 1);
            }
          }
          if (args[1] == "texarus") {
            if (money < prices.texarusStaff) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (texarusPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const texarusEmbed = new Discord.MessageEmbed()
                .setTitle(`Texarus the demonished staff`)
                .setDescription(`You purchased Texarus the demonished staff !`);
              message.channel.send(texarusEmbed);
              db.add(`texarus_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.texarusStaff);
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
            } else if (awakeningGemPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Awakening gem in Valorium shop.`
              );
            } else if (quantity > awakeningGemPieces) {
              message.channel.send(
                `There are only ${awakeningGemPieces} awakening gem(s) left.`
              );
            } else {
              const awakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Awakening gem`)
                .setDescription(
                  `You purchased Awakening gem (${quantity} pieces)`
                );
              message.channel.send(awakeningGemEmbed);
              db.add(`awakeningGem_${tokenDB}`, quantity);
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
            } else if (EliteAwakeningGemPieces == 0) {
              message.channel.send(
                `There are (0) pieces of Elite Awakening gem in Valorium shop.`
              );
            } else if (quantity > EliteAwakeningGemPieces) {
              message.channel.send(
                `There are only ${EliteAwakeningGemPieces} elite awakening gem(s) left.`
              );
            } else {
              const eliteAwakeningGemEmbed = new Discord.MessageEmbed()
                .setTitle(`Elite Awakening gem`)
                .setDescription(
                  `You purchased Elite Awakening gem (${quantity} pieces)`
                );
              message.channel.send(eliteAwakeningGemEmbed);
              db.add(`eliteAwakeningGem_${tokenDB}`, quantity);
              db.subtract(
                `money_${tokenDB}.pocket`,
                prices.eliteAwakeningGem * quantity
              );
              db.subtract(`EliteAwakeningGemStoreAdd`, quantity);
            }
          }

          // ... your existing code ...

          // ... your existing code ...

          if (args[1] == "rubyOfRoyalty") {
            if (money < prices.rubyOfRoyalty) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (rubyOfRoyaltyPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const rubyOfRoyaltyEmbed = new Discord.MessageEmbed()
                .setTitle(`Ruby of royalty`)
                .setDescription(`You purchased Ruby of Royalty !`);
              message.channel.send(rubyOfRoyaltyEmbed);
              db.add(`rubyOfRoyalty_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.rubyOfRoyalty);
              db.subtract(`rubyOfRoyaltyStoreAdd`, 1);
            }
          }
          if (args[1] == "goldenGloryCard") {
            if (money < prices.goldenGloryCard) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (goldenGloryCardPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const goldenGloryCardEmbed = new Discord.MessageEmbed()
                .setTitle(`Golden glory card`)
                .setDescription(`You purchased Golden glory card !`);
              message.channel.send(goldenGloryCardEmbed);
              db.add(`goldenGloryCard_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.goldenGloryCard);
              db.subtract(`goldenGloryCardStoreAdd`, 1);
            }
          }
          if (args[1] == "royalStatueOfHonor") {
            if (money < prices.royalStatueOfHonor) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (royalStatueOfHonor == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const royalStatueOfHonorEmbed = new Discord.MessageEmbed()
                .setTitle(`Royalty Statue of Honor`)
                .setDescription(`You purchased Royalty Statue of Honor !`);
              message.channel.send(royalStatueOfHonorEmbed);
              db.add(`royalStatueOfHonor_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.royalStatueOfHonor);
              db.subtract(`royalStatueOfHonorStoreAdd`, 1);
            }
          }
          if (args[1] == "royaltyCoin") {
            if (money < prices.royalStatueOfHonor) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (royaltyCoinPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const royaltyCoinEmbed = new Discord.MessageEmbed()
                .setTitle(`Royalty Coin`)
                .setDescription(`You purchased Royalty Coin !`);
              message.channel.send(royaltyCoinEmbed);
              db.add(`royaltyCoin_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.royalStatueOfHonor);
              db.subtract(`royaltyCoinStoreAdd`, 1);
            }
          }

          if (args[1] == "magnificentCarpet") {
            if (money < prices.magnificentCarpet) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (magnificentCarpetPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const magnificentCarpetEmbed = new Discord.MessageEmbed()
                .setTitle(`Magnificent Carpet`)
                .setDescription(`You purchased Magnificent Carpet !`);
              message.channel.send(magnificentCarpetEmbed);
              db.add(`magnificentCarpet_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.magnificentCarpet);
              db.subtract(`magnificentCarpetStoreAdd`, 1);
            }
          }
          if (args[1] == "magnificentPen") {
            if (money < prices.magnificentPen) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (magnificentPenPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const magnificentPenEmbed = new Discord.MessageEmbed()
                .setTitle(`Magnificent Pen`)
                .setDescription(`You purchased Magnificent Pen !`);
              message.channel.send(magnificentPenEmbed);
              db.add(`magnificentPen_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.magnificentPen);
              db.subtract(`magnificentPenStoreAdd`, 1);
            }
          }

          if (args[1] == "splendidTrophy") {
            if (money < prices.splendidTrophy) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (splendidTrophyPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const splendidTrophyEmbed = new Discord.MessageEmbed()
                .setTitle(`Splendid Trophy`)
                .setDescription(`You purchased Splendid Trophy !`);
              message.channel.send(splendidTrophyEmbed);
              db.add(`splendidTrophy_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, prices.splendidTrophy);
              db.subtract(`splendidTrophyStoreAdd`, 1);
            }
          }

          if (args[1] == "keysSack") {
            if (money < prices.keysSack) {
              message.channel.send(`You dont have enough money to buy it`);
            } else if (keysSackPieces == 0) {
              message.channel.send(`There are (0) pieces in Valorium shop`);
            } else {
              const keysSackEmbed = new Discord.MessageEmbed()
                .setTitle(`1x 2850 keys sack`)
                .setDescription(`You purchased 2850 keys sack !`);
              message.channel.send(keysSackEmbed);
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
