const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const e = require("express");
const prices = require("../../prices.json");
const moneyCap = config.moneyCap;
module.exports = {
  name: "sell",
  aliases: ["sale", "Sell"],
  description: "To sell an item",
  usage: "sell",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else {
      var item = args[0];
      if (!item) {
        message.channel.send(
          "Enter an item name you want to sell , eg: +sell rasheta"
        );
      } else if (!prices.hasOwnProperty(item)) {
        message.channel.send(
          `Invalid item name , **Usage example : +sell [itemID] [Number of pieces]**`
        );
      } else {
        var amountOfPieces = parseInt(args[1]);
        if (isNaN(amountOfPieces) || amountOfPieces < 1) {
          message.channel.send(
            "Please enter a valid number of item pieces to sell."
          );
          return; // Stop execution if the number of pieces is not valid
        }
        const totalGoldGained = prices[item] * amountOfPieces;

        // Get the user's current pocket gold
        const currentGold = db.fetch(`money_${tokenDB}.pocket`);

        // Check if the gold limit will be exceeded after the sale
        if (currentGold + totalGoldGained > moneyCap) {
          message.channel.send("**You cannot exceed the gold limit.**");
          return;
        } else {
          var amountOfPieces = parseInt(args[1]);
          if (item == "goldBar") {
            const goldBar = db.fetch(`goldBar_${tokenDB}`);
            if (!goldBar) {
              message.channel.send(`You dont have Gold Bar`);
            } else if (amountOfPieces > goldBar) {
              message.channel.send(`You dont have ${amountOfPieces}x Gold Bar`);
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`goldBarStoreAdd`, amountOfPieces);
              db.subtract(`goldBar_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                prices.goldBar * amountOfPieces
              );
              const goldBarSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Gold Bar`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "Gold Bar" FOR ${
                    prices.goldBar * amountOfPieces
                  } GOLD COINS (you have ${
                    goldBar - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(goldBarSoldEmbed);
            }
          }
          if (item == "rasheta") {
            const rasheta = db.fetch(`rasheta_${tokenDB}`);
            if (!rasheta) {
              message.channel.send(`You dont have Rasheta The Furious Axe`);
            } else if (amountOfPieces > rasheta) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Rasheta The Furious Axe`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`rashetaStoreAdd`, amountOfPieces);
              db.subtract(`rasheta_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.rasheta / 2) * amountOfPieces
              );

              const rashetaSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Rasheta The Furious Axe`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "RASHETA THE FURIOUS AXE" FOR ${
                    (prices.rasheta / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    rasheta - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(rashetaSoldEmbed);
            }
          }
          if (item == "waetra") {
            const waetra = db.fetch(`waetra_${tokenDB}`);
            if (!waetra) {
              message.channel.send(`You dont have Waetra the freezed bow`);
            } else if (amountOfPieces > waetra) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Waetra the freezed bow`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`waetraStoreAdd`, amountOfPieces);
              db.subtract(`waetra_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.waetra / 2) * amountOfPieces
              );
              const waetraSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Waetra the freezed bow`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "WAETRA THE FREEZED BOW" FOR ${
                    (prices.waetra / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    waetra - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(waetraSoldEmbed);
            }
          }
          if (item == "texarus") {
            const texarus = db.fetch(`texarus_${tokenDB}`);
            if (!texarus) {
              message.channel.send(
                `You dont have Texarus the demonished staff`
              );
            } else if (amountOfPieces > texarus) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Texarus the demonished staff`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`texarusStoreAdd`, amountOfPieces);
              db.subtract(`texarus_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.texarus / 2) * amountOfPieces
              );
              const texarusSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Texarus the demonished staff`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "TEXARUS THE DEMONISHED STAFF" FOR ${
                    (prices.texarus / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    texarus - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(texarusSoldEmbed);
            }
          }
          if (item == "natureDaggers") {
            const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
            if (!natureDaggers) {
              message.channel.send(
                `You dont have Nature Daggers of Superpower`
              );
            } else if (amountOfPieces > natureDaggers) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Nature daggers of superpower`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`natureDaggersStoreAdd`, amountOfPieces);
              db.subtract(`natureDaggers_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.natureDaggers / 2) * amountOfPieces
              );
              const natureDaggersSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Nature Daggers of Superpower`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "NATURE DAGGERS OF SUPERPOWER" FOR ${
                    (prices.natureDaggers / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    natureDaggers - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(natureDaggersSoldEmbed);
            }
          }
          if (item == "immortalGun") {
            const immortalGun = db.fetch(`immortalGun_${tokenDB}`);
            if (!immortalGun) {
              message.channel.send(`You dont have Immortal Gun of Energy`);
            } else if (amountOfPieces > immortalGun) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Immortal gun of energy`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              db.add(`immortalGunStoreAdd`, amountOfPieces);
              db.subtract(`immortalGun_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.immortalGun / 2) * amountOfPieces
              );
              const immortalGunSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Immortal Gun of Energy`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "IMMORTAL GUN OF ENERGY" FOR ${
                    (prices.immortalGun / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    immortalGun - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(immortalGunSoldEmbed);
            }
          }

          if (item == "goldenGhostKnightSet") {
            const goldenGhostKnightSet = db.fetch(
              `goldenGhostKnightSet_${tokenDB}`
            );
            if (!goldenGhostKnightSet) {
              message.channel.send(`You dont have Golden Ghost Knight Set`);
            } else if (amountOfPieces > goldenGhostKnightSet) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Golden ghost knight set`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              const goldenGhostKnightSetSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Golden Ghost Knight Set`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "GOLDEN GHOST KNIGHT SET" FOR ${
                    (prices.goldenGhostKnightSet / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    goldenGhostKnightSet - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(goldenGhostKnightSetSoldEmbed);
              db.add(`goldenGhostKnightSetStoreAdd`, amountOfPieces);
              db.subtract(`goldenGhostKnightSet_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.goldenGhostKnightSet / 2) * amountOfPieces
              );
            }
          }
          if (item == "arcaneSenseiSet") {
            const arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
            if (!arcaneSenseiSet) {
              message.channel.send(`You dont have Arcane sensei set`);
            } else if (amountOfPieces > arcaneSenseiSet) {
              message.channel.send(
                `You dont have ${amountOfPieces}x Arcane sensei set`
              );
            } else if (!amountOfPieces) {
              message.channel.send(
                `Mention the amount of pieces you want to sell`
              );
            } else {
              const arcaneSenseiSetSoldEmbed = new Discord.MessageEmbed()
                .setTitle(`Arcane sensei set`)
                .setDescription(
                  `YOU SOLD ${amountOfPieces}x "ARCANE SENSEI SET" FOR ${
                    (prices.arcaneSenseiSet / 2) * amountOfPieces
                  } GOLD COINS (you have ${
                    arcaneSenseiSet - amountOfPieces
                  } pieces left)`
                )
                .setColor("#D33333");
              message.channel.send(arcaneSenseiSetSoldEmbed);
              db.add(`arcaneSenseiSetStoreAdd`, amountOfPieces);
              db.subtract(`arcaneSenseiSet_${tokenDB}`, amountOfPieces);
              db.add(
                `money_${tokenDB}.pocket`,
                (prices.arcaneSenseiSet / 2) * amountOfPieces
              );
            }
          }
        }
        if (item == "frozenSet") {
          const frozenSet = db.fetch(`frozenSet_${tokenDB}`);
          if (!frozenSet) {
            message.channel.send(`You dont have Frozen set`);
          } else if (amountOfPieces > frozenSet) {
            message.channel.send(`You dont have ${amountOfPieces}x Frozen set`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const frozenSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Frozen set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "FROZEN SET" FOR ${
                  (prices.frozenSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  frozenSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(frozenSetSoldEmbed);
            db.add(`frozenSetStoreAdd`, amountOfPieces);
            db.subtract(`frozenSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.frozenSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "superGolemSet") {
          const superGolemSet = db.fetch(`superGolemSet_${tokenDB}`);
          if (!superGolemSet) {
            message.channel.send(`You dont have Super golem set`);
          } else if (amountOfPieces > superGolemSet) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Super golem set`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const superGolemSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Super golem set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "SUPER GOLEM SET" FOR ${
                  (prices.superGolemSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  superGolemSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(superGolemSetSoldEmbed);
            db.add(`superGolemSetStoreAdd`, amountOfPieces);
            db.subtract(`superGolemSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.superGolemSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "dawnfireSet") {
          const dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
          if (!dawnfireSet) {
            message.channel.send(`You dont have Dawnfire set`);
          } else if (amountOfPieces > dawnfireSet) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Dawnfire set`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const dawnfireSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Dawnfire set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "DAWNFIRE SET" FOR ${
                  (prices.dawnfireSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  dawnfireSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(dawnfireSetSoldEmbed);
            db.add(`dawnfireSetStoreAdd`, amountOfPieces);
            db.subtract(`dawnfireSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.dawnfireSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "intrepidSet") {
          const intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
          if (!intrepidSet) {
            message.channel.send(`You dont have Intrepid set`);
          } else if (amountOfPieces > intrepidSet) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Intrepid set`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const intrepidSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Intrepid set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "INTREPID SET" FOR ${
                  (prices.intrepidSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  intrepidSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(intrepidSetSoldEmbed);
            db.add(`intrepidSetStoreAdd`, amountOfPieces);
            db.subtract(`intrepidSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.intrepidSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "medusaSet") {
          const medusaSet = db.fetch(`medusaSet_${tokenDB}`);
          if (!medusaSet) {
            message.channel.send(`You dont have Medusa set`);
          } else if (amountOfPieces > medusaSet) {
            message.channel.send(`You dont have ${amountOfPieces}x Medusa set`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const medusaSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Medusa set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "MEDUSA SET" FOR ${
                  (prices.medusaSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  medusaSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(medusaSetSoldEmbed);
            db.add(`medusaStoreAdd`, amountOfPieces);
            db.subtract(`medusaSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.medusaSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "supremeMagicalSet") {
          const supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
          if (!supremeMagicalSet) {
            message.channel.send(`You dont have Supreme magical set`);
          } else if (amountOfPieces > supremeMagicalSet) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Supreme magical set`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const supremeMagicalSetSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Supreme magical set`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "SUPREME MAGICAL SET" FOR ${
                  (prices.supremeMagicalSet / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  supremeMagicalSet - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(supremeMagicalSetSoldEmbed);
            db.add(`supremeMagicalSetStoreAdd`, amountOfPieces);
            db.subtract(`supremeMagicalSet_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.supremeMagicalSet / 2) * amountOfPieces
            );
          }
        }
        if (item == "unlockedCrateOfEnergy") {
          message.channel.send("ITS NOT SELLABLE");
        }
        if (item == "vortexOrb") {
          const vortexOrb = db.fetch(`vortexOrb_${tokenDB}`);
          if (!vortexOrb) {
            message.channel.send(`You dont have Vortex orb`);
          } else if (amountOfPieces > vortexOrb) {
            message.channel.send(`You dont have ${amountOfPieces}x Vortex orb`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const vortexOrbSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Vortex orb`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "VORTEX ORB" FOR ${
                  (prices.vortexOrb / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  vortexOrb - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(vortexOrbSoldEmbed);
            db.add(`vortexOrbStoreAdd`, amountOfPieces);
            db.subtract(`vortexOrb_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.vortexOrb / 2) * amountOfPieces
            );
          }
        }
        if (item == "verdantLeaf") {
          const verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`);
          if (!verdantLeaf) {
            message.channel.send(`You dont have Verdant Whisper leaf`);
          } else if (amountOfPieces > verdantLeaf) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Verdant Whisper leaf`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const verdantLeafSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Verdant Whisper leaf`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "VERDANT WHISPER LEAF" FOR ${
                  (prices.verdantLeaf / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  verdantLeaf - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(verdantLeafSoldEmbed);
            db.add(`verdantLeafStoreAdd`, amountOfPieces);
            db.subtract(`verdantLeaf_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.verdantLeaf / 2) * amountOfPieces
            );
          }
        }
        if (item == "celestialMoonstone") {
          const celestialMoonstone = db.fetch(`celestialMoonstone_${tokenDB}`);
          if (!celestialMoonstone) {
            message.channel.send(`You dont have Celestial Moonstone`);
          } else if (amountOfPieces > celestialMoonstone) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Celestial Moonstone`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const celestialMoonstoneSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Celestial Moonstone`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "CELESTIAL MOONSTONE" FOR ${
                  (prices.celestialMoonstone / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  celestialMoonstone - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(celestialMoonstoneSoldEmbed);
            db.add(`celestialMoonstoneStoreAdd`, amountOfPieces);
            db.subtract(`celestialMoonstone_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.celestialMoonstone / 2) * amountOfPieces
            );
          }
        }
        if (item == "crystallineCorestone") {
          const crystallineCorestone = db.fetch(
            `crystallineCorestone_${tokenDB}`
          );
          if (!crystallineCorestone) {
            message.channel.send(`You dont have Crystalline Corestone`);
          } else if (amountOfPieces > crystallineCorestone) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Crystalline Corestone`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const crystallineCorestoneSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Crystalline Corestone`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "CRYSTALLINE CORESTONE" FOR ${
                  (prices.crystallineCorestone / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  crystallineCorestone - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(crystallineCorestoneSoldEmbed);
            db.add(`crystallineCorestoneStoreAdd`, amountOfPieces);
            db.subtract(`crystallineCorestone_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.crystallineCorestone / 2) * amountOfPieces
            );
          }
        }
        if (item == "tomeOfEverlastingWisdom") {
          const tomeOfEverlastingWisdom = db.fetch(
            `tomeOfEverlastingWisdom_${tokenDB}`
          );
          if (!tomeOfEverlastingWisdom) {
            message.channel.send(`You dont have Tome of everlasting wisdom`);
          } else if (amountOfPieces > tomeOfEverlastingWisdom) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Tome of everlasting wisdom`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const tomeOfEverlastingWisdomSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Tome of everlasting wisdom`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "TOME OF EVERLASTING WISDOM" FOR ${
                  (prices.tomeOfEverlastingWisdom / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  tomeOfEverlastingWisdom - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(tomeOfEverlastingWisdomSoldEmbed);
            db.add(`tomeOfEverlastingWisdomStoreAdd`, amountOfPieces);
            db.subtract(`tomeOfEverlastingWisdom_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.tomeOfEverlastingWisdom / 2) * amountOfPieces
            );
          }
        }
        if (item == "rustyGears") {
          const rustyGears = db.fetch(`rustyGears_${tokenDB}`);
          if (!rustyGears) {
            message.channel.send(`You dont have Rusty gears`);
          } else if (amountOfPieces > rustyGears) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Rusty gears`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const rustyGearsSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Rusty gears`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "RUSTY GEARS" FOR ${
                  (prices.rustyGears / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  rustyGears - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(rustyGearsSoldEmbed);
            db.add(`rustyGearsStoreAdd`, amountOfPieces);
            db.subtract(`rustyGears_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.rustyGears / 2) * amountOfPieces
            );
          }
        }
        if (item == "dustbin") {
          const dustbin = db.fetch(`dustbin_${tokenDB}`);
          if (dustbin < 1) {
            message.channel.send(`You dont have Dustbin`);
          } else if (amountOfPieces > dustbin) {
            message.channel.send(`You dont have ${amountOfPieces}x Dustbin`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const dustbinSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Dustbin`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "DUSTBIN" FOR ${
                  (prices.dustbin / 2) * amountOfPieces
                } GOLD COINS (you have ${dustbin - 1} pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(dustbinSoldEmbed);
            db.add(`dustbinStoreAdd`, amountOfPieces);
            db.subtract(`dustbin_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.dustbin / 2) * amountOfPieces
            );
          }
        }
        if (item == "newspaper") {
          const newspaper = db.fetch(`newspaper_${tokenDB}`);
          if (!newspaper) {
            message.channel.send(`You dont have Newspaper`);
          } else if (amountOfPieces > newspaper) {
            message.channel.send(`You dont have ${amountOfPieces}x Newspaper`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const newspaperSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Newspaper`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "NEWSPAPER" FOR ${
                  (prices.newspaper / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  newspaper - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(newspaperSoldEmbed);
            db.add(`newspaperStoreAdd`, amountOfPieces);
            db.subtract(`newspaper_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.newspaper / 2) * amountOfPieces
            );
          }
        }
        if (item == "tornCloth") {
          const tornCloth = db.fetch(`tornCloth_${tokenDB}`);
          if (!tornCloth) {
            message.channel.send(`You dont have Torn cloth`);
          } else if (amountOfPieces > tornCloth) {
            message.channel.send(`You dont have ${amountOfPieces}x Torn cloth`);
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const tornClothSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Torn cloth`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "TORN CLOTH" FOR ${
                  (prices.tornCloth / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  tornCloth - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(tornClothSoldEmbed);
            db.add(`tornClothStoreAdd`, amountOfPieces);
            db.subtract(`tornCloth_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.tornCloth / 2) * amountOfPieces
            );
          }
        }
        if (item == "usedTissue") {
          const usedTissue = db.fetch(`usedTissue_${tokenDB}`);
          if (!usedTissue) {
            message.channel.send(`You dont have Used tissue`);
          } else if (amountOfPieces > usedTissue) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Used tissue`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const usedTissueSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Used tissue`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "USED TISSUE" FOR ${
                  (prices.usedTissue / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  usedTissue - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(usedTissueSoldEmbed);
            db.add(`usedTissueStoreAdd`, amountOfPieces);
            db.subtract(`usedTissue_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.usedTissue / 2) * amountOfPieces
            );
          }
        }
        if (item == "brokenStick") {
          const brokenStick = db.fetch(`brokenStick_${tokenDB}`);
          if (!brokenStick) {
            message.channel.send(`You dont have Broken stick`);
          } else if (amountOfPieces > brokenStick) {
            message.channel.send(
              `You dont have ${amountOfPieces}x Broken stick`
            );
          } else if (!amountOfPieces) {
            message.channel.send(
              `Mention the amount of pieces you want to sell`
            );
          } else {
            const brokenStickSoldEmbed = new Discord.MessageEmbed()
              .setTitle(`Broken stick`)
              .setDescription(
                `YOU SOLD ${amountOfPieces}x "BROKEN STICK" FOR ${
                  (prices.brokenStick / 2) * amountOfPieces
                } GOLD COINS (you have ${
                  brokenStick - amountOfPieces
                } pieces left)`
              )
              .setColor("#D33333");
            message.channel.send(brokenStickSoldEmbed);
            db.add(`brokenStickStoreAdd`, amountOfPieces);
            db.subtract(`brokenStick_${tokenDB}`, amountOfPieces);
            db.add(
              `money_${tokenDB}.pocket`,
              (prices.brokenStick / 2) * amountOfPieces
            );
          }
        }
      }
      if (item == "awakeningGem") {
        const awakeningGem = db.fetch(`awakeningGem_${tokenDB}`);
        if (!awakeningGem) {
          message.channel.send(`You dont have Awakening gem`);
        } else if (amountOfPieces > awakeningGem) {
          message.channel.send(
            `You dont have ${amountOfPieces}x Awakening gem`
          );
        } else if (!amountOfPieces) {
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          const awakeningGemSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Awakening gem`)
            .setDescription(
              `YOU SOLD ${amountOfPieces}x "AWAKENING GEM" FOR ${
                (prices.awakeningGem / 2) * amountOfPieces
              } GOLD COINS (you have ${
                awakeningGem - amountOfPieces
              } pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(awakeningGemSoldEmbed);
          db.add(`awakeningGemStoreAdd`, amountOfPieces);
          db.subtract(`awakeningGem_${tokenDB}`, amountOfPieces);
          db.add(
            `money_${tokenDB}.pocket`,
            (prices.awakeningGem / 2) * amountOfPieces
          );
        }
      }
      if (item == "eliteAwakeningGem") {
        const eliteAwakeningGem = db.fetch(`eliteAwakeningGem_${tokenDB}`);
        if (!eliteAwakeningGem) {
          message.channel.send(`You dont have Elite Awakening gem`);
        } else if (amountOfPieces > eliteAwakeningGem) {
          message.channel.send(
            `You dont have ${amountOfPieces}x Elite Awakening gem`
          );
        } else if (!amountOfPieces) {
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          const eliteAwakeningGemSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Elite Awakening gem`)
            .setDescription(
              `YOU SOLD ${amountOfPieces}x "ELITE AWAKENING GEM" FOR ${
                (prices.eliteAwakeningGem / 2) * amountOfPieces
              } GOLD COINS (you have ${
                eliteAwakeningGem - amountOfPieces
              } pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(eliteAwakeningGemSoldEmbed);
          db.add(`eliteAwakeningGemStoreAdd`, amountOfPieces);
          db.subtract(`eliteAwakeningGem_${tokenDB}`, amountOfPieces);
          db.add(
            `money_${tokenDB}.pocket`,
            (prices.eliteAwakeningGem / 2) * amountOfPieces
          );
        }
      }
    }
  },
};
