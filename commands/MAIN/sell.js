const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const e = require("express");
const prices = require("../../prices.json");
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
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
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
      var item = args.slice(0).join(" ");
      // var possiblitiesRasheta = [
      //   "Rasheta the furious axe",
      //   "Rasheta The Furious Axe",
      //   "Rasheta The furious Axe",
      //   "rasheta the furious axe",
      //   "rashet",
      //   "Rasheta",
      // ];
      // var possiblitiesNatureDaggers = [
      //   "Nature Daggers Of Superpower",
      //   "Nature Daggers Of Superpower",
      //   "nature daggers of superpower",
      //   "NatureDaggers",
      //   "nature",
      //   "natureDagger",
      // ];
      if (!item) {
        message.channel.send(
          "Enter an item name you want to sell , eg: +sell rasheta"
        );
      }
      var amountOfPieces = parseInt(args[1]);
      if (item == "rasheta") {
        const rasheta = db.fetch(`rasheta_${tokenDB}`);
        if (!rasheta) {
          message.channel.send(`You dont have Rasheta The Furious Axe`);
        } else if (amountOfPieces > rasheta) {
          message.channel.send(
            `You dont have ${amountOfPieces}x Rasheta The Furious Axe`
          );
        } else if (!amountOfPieces) {
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          db.add(`rashetaStoreAdd`, 1);
          db.subtract(`rasheta_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.rashetaAxe);
          const rashetaSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Rasheta The Furious Axe`)
            .setDescription(
              `YOU SOLD "RASHETA THE FURIOUS AXE" FOR ${
                prices.rashetaAxe
              } GOLD COINS (you have ${rasheta - 1} pieces left)`
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
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          db.add(`waetraStoreAdd`, 1);
          db.subtract(`waetra_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.waetraBow);
          const waetraSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Waetra the freezed bow`)
            .setDescription(
              `YOU SOLD "WAETRA THE FREEZED BOW" FOR ${
                prices.waetraBow
              } GOLD COINS (you have ${waetra - 1} pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(waetraSoldEmbed);
        }
      }
      if (item == "texarus") {
        const texarus = db.fetch(`texarus_${tokenDB}`);
        if (!texarus) {
          message.channel.send(`You dont have Texarus the demonished staff`);
        } else if (amountOfPieces > texarus) {
          message.channel.send(
            `You dont have ${amountOfPieces}x Texarus the demonished staff`
          );
        } else if (!amountOfPieces) {
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          db.add(`texarusStoreAdd`, 1);
          db.subtract(`texarus_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.texarusStaff);
          const texarusSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Texarus the demonished staff`)
            .setDescription(
              `YOU SOLD "TEXARUS THE DEMONISHED STAFF" FOR ${
                prices.texarusStaff
              } GOLD COINS (you have ${texarus - 1} pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(texarusSoldEmbed);
        }
      }
      if (item == "natureDaggers") {
        const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        if (!natureDaggers) {
          message.channel.send(`You dont have Nature Daggers of Superpower`);
        } else if (amountOfPieces > rasheta) {
          message.channel.send(
            `You dont have ${amountOfPieces}x Nature daggers of superpower`
          );
        } else if (!amountOfPieces) {
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          db.add(`natureDaggersStoreAdd`, 1);
          db.subtract(`natureDaggers_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.natureDaggers);
          const natureDaggersSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Nature Daggers of Superpower`)
            .setDescription(
              `YOU SOLD "NATURE DAGGERS OF SUPERPOWER" FOR ${
                prices.natureDaggers
              } GOLD COINS (you have ${natureDaggers - 1} pieces left)`
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
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          db.add(`immortalGunStoreAdd`, 1);
          db.subtract(`immortalGun_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.immortalGun);
          const immortalGunSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Immortal Gun of Energy`)
            .setDescription(
              `YOU SOLD IMMORTAL GUN OF ENERGY" FOR ${
                prices.immortalGun
              } GOLD COINS (you have ${immortalGun - 1} pieces left)`
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
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          const goldenGhostKnightSetSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Golden Ghost Knight Set`)
            .setDescription(
              `YOU SOLD "GOLDEN GHOST KNIGHT SET" FOR ${
                prices.goldenGhostKnightSet
              } GOLD COINS (you have ${goldenGhostKnightSet - 1} pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(goldenGhostKnightSetSoldEmbed);
          db.add(`goldenGhostKnightSetStoreAdd`, 1);
          db.subtract(`goldenGhostKnightSet_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.goldenGhostKnightSet);
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
          message.channel.send(`Mention the amount of pieces you want to sell`);
        } else {
          const arcaneSenseiSetSoldEmbed = new Discord.MessageEmbed()
            .setTitle(`Arcane sensei set`)
            .setDescription(
              `YOU SOLD "ARCANE SENSEI SET" FOR ${
                prices.arcaneSenseiSet
              } GOLD COINS (you have ${arcaneSenseiSet - 1} pieces left)`
            )
            .setColor("#D33333");
          message.channel.send(arcaneSenseiSetSoldEmbed);
          db.add(`arcaneSenseiSetStoreAdd`, 1);
          db.subtract(`arcaneSenseiSet_${tokenDB}`, 1);
          db.add(`money_${tokenDB}.pocket`, prices.arcaneSenseiSet);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const frozenSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Frozen set`)
          .setDescription(
            `YOU SOLD "FROZEN SET" FOR ${
              prices.frozenSet
            } GOLD COINS (you have ${frozenSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(frozenSetSoldEmbed);
        db.add(`frozenSetStoreAdd`, 1);
        db.subtract(`frozenSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.frozenSet);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const superGolemSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Super golem set`)
          .setDescription(
            `YOU SOLD "SUPER GOLEM SET" FOR ${
              prices.superGolemSet
            } GOLD COINS (you have ${superGolemSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(superGolemSetSoldEmbed);
        db.add(`superGolemSetStoreAdd`, 1);
        db.subtract(`superGolemSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.superGolemSet);
      }
    }
    if (item == "dawnfireSet") {
      const dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
      if (!dawnfireSet) {
        message.channel.send(`You dont have Dawnfire set`);
      } else if (amountOfPieces > dawnfireSet) {
        message.channel.send(`You dont have ${amountOfPieces}x Dawnfire set`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const dawnfireSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Dawnfire set`)
          .setDescription(
            `YOU SOLD "DAWNFIRE SET" FOR ${
              prices.dawnfireSet
            } GOLD COINS (you have ${dawnfireSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(dawnfireSetSoldEmbed);
        db.add(`dawnfireSetStoreAdd`, 1);
        db.subtract(`dawnfireSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.dawnfireSet);
      }
    }
    if (item == "intrepidSet") {
      const intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
      if (!intrepidSet) {
        message.channel.send(`You dont have Intrepid set`);
      } else if (amountOfPieces > intrepidSet) {
        message.channel.send(`You dont have ${amountOfPieces}x Intrepid set`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const intrepidSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Intrepid set`)
          .setDescription(
            `YOU SOLD "INTREPID SET" FOR ${
              prices.intrepidSet
            } GOLD COINS (you have ${intrepidSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(intrepidSetSoldEmbed);
        db.add(`intrepidSetStoreAdd`, 1);
        db.subtract(`intrepidSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.intrepidSet);
      }
    }
    if (item == "medusaSet") {
      const medusaSet = db.fetch(`medusaSet_${tokenDB}`);
      if (!medusaSet) {
        message.channel.send(`You dont have Medusa set`);
      } else if (amountOfPieces > medusaSet) {
        message.channel.send(`You dont have ${amountOfPieces}x Medusa set`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const medusaSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Medusa set`)
          .setDescription(
            `YOU SOLD "MEDUSA SET" FOR ${
              prices.medusaSet
            } GOLD COINS (you have ${medusaSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(medusaSetSoldEmbed);
        db.add(`medusaStoreAdd`, 1);
        db.subtract(`medusaSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.medusaSet);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const supremeMagicalSetSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Supreme magical set`)
          .setDescription(
            `YOU SOLD "SUPREME MAGICAL SET" FOR ${
              prices.supremeMagicalSet
            } GOLD COINS (you have ${supremeMagicalSet - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(supremeMagicalSetSoldEmbed);
        db.add(`supremeMagicalSetStoreAdd`, 1);
        db.subtract(`supremeMagicalSet_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.supremeMagicalSet);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const vortexOrbSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Vortex orb`)
          .setDescription(
            `YOU SOLD "VORTEX ORB" FOR ${
              prices.vortexOrb
            } GOLD COINS (you have ${vortexOrb - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(vortexOrbSoldEmbed);
        db.add(`vortexOrbStoreAdd`, 1);
        db.subtract(`vortexOrb_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.vortexOrb);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const verdantLeafSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Verdant Whisper leaf`)
          .setDescription(
            `YOU SOLD "VERDANT WHISPER LEAF" FOR ${
              prices.verdantLeaf
            } GOLD COINS (you have ${verdantLeaf - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(verdantLeafSoldEmbed);
        db.add(`verdantLeafStoreAdd`, 1);
        db.subtract(`verdantLeaf_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.verdantLeaf);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const celestialMoonstoneSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Celestial Moonstone`)
          .setDescription(
            `YOU SOLD "CELESTIAL MOONSTONE" FOR ${
              prices.celestialMoonstone
            } GOLD COINS (you have ${celestialMoonstone - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(celestialMoonstoneSoldEmbed);
        db.add(`celestialMoonstoneStoreAdd`, 1);
        db.subtract(`celestialMoonstone_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.celestialMoonstone);
      }
    }
    if (item == "crystallineCorestone") {
      const crystallineCorestone = db.fetch(`crystallineCorestone_${tokenDB}`);
      if (!crystallineCorestone) {
        message.channel.send(`You dont have Crystalline Corestone`);
      } else if (amountOfPieces > crystallineCorestone) {
        message.channel.send(
          `You dont have ${amountOfPieces}x Crystalline Corestone`
        );
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const crystallineCorestoneSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Crystalline Corestone`)
          .setDescription(
            `YOU SOLD "CRYSTALLINE CORESTONE" FOR ${
              prices.crystallineCorestone
            } GOLD COINS (you have ${crystallineCorestone - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(crystallineCorestoneSoldEmbed);
        db.add(`crystallineCorestoneStoreAdd`, 1);
        db.subtract(`crystallineCorestone_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.crystallineCorestone);
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
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const tomeOfEverlastingWisdomSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Tome of everlasting wisdom`)
          .setDescription(
            `YOU SOLD "TOME OF EVERLASTING WISDOM" FOR ${
              prices.tomeOfEverlastingWisdom
            } GOLD COINS (you have ${tomeOfEverlastingWisdom - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(tomeOfEverlastingWisdomSoldEmbed);
        db.add(`tomeOfEverlastingWisdomStoreAdd`, 1);
        db.subtract(`tomeOfEverlastingWisdom_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.tomeOfEverlastingWisdom);
      }
    }
    if (item == "rustyGears") {
      const rustyGears = db.fetch(`rustyGears_${tokenDB}`);
      if (!rustyGears) {
        message.channel.send(`You dont have Rusty gears`);
      } else if (amountOfPieces > rustyGears) {
        message.channel.send(`You dont have ${amountOfPieces}x Rusty gears`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const rustyGearsSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Rusty gears`)
          .setDescription(
            `YOU SOLD "RUSTY GEARS" FOR ${
              prices.rustyGears
            } GOLD COINS (you have ${rustyGears - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(rustyGearsSoldEmbed);
        db.add(`rustyGearsStoreAdd`, 1);
        db.subtract(`rustyGears_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.rustyGears);
      }
    }
    if (item == "dustbin") {
      const dustbin = db.fetch(`dustbin_${tokenDB}`);
      if (!dustbin) {
        message.channel.send(`You dont have Dustbin`);
      } else if (amountOfPieces > dustbin) {
        message.channel.send(`You dont have ${amountOfPieces}x Dustbin`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const dustbinSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Dustbin`)
          .setDescription(
            `YOU SOLD "DUSTBIN" FOR ${prices.dustbin} GOLD COINS (you have ${
              dustbin - 1
            } pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(dustbinSoldEmbed);
        db.add(`dustbinStoreAdd`, 1);
        db.subtract(`dustbin_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.dustbin);
      }
    }
    if (item == "newspaper") {
      const newspaper = db.fetch(`newspaper_${tokenDB}`);
      if (!newspaper) {
        message.channel.send(`You dont have Newspaper`);
      } else if (amountOfPieces > newspaper) {
        message.channel.send(`You dont have ${amountOfPieces}x Newspaper`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const newspaperSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Newspaper`)
          .setDescription(
            `YOU SOLD "NEWSPAPER" FOR ${
              prices.newspaper
            } GOLD COINS (you have ${newspaper - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(newspaperSoldEmbed);
        db.add(`newspaperStoreAdd`, 1);
        db.subtract(`newspaper_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.newspaper);
      }
    }
    if (item == "tornCloth") {
      const tornCloth = db.fetch(`tornCloth_${tokenDB}`);
      if (!tornCloth) {
        message.channel.send(`You dont have Torn cloth`);
      } else if (amountOfPieces > tornCloth) {
        message.channel.send(`You dont have ${amountOfPieces}x Torn cloth`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const tornClothSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Torn cloth`)
          .setDescription(
            `YOU SOLD "TORN CLOTH" FOR ${
              prices.tornCloth
            } GOLD COINS (you have ${tornCloth - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(tornClothSoldEmbed);
        db.add(`tornClothStoreAdd`, 1);
        db.subtract(`tornCloth_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.tornCloth);
      }
    }
    if (item == "usedTissue") {
      const usedTissue = db.fetch(`usedTissue_${tokenDB}`);
      if (!usedTissue) {
        message.channel.send(`You dont have Used tissue`);
      } else if (amountOfPieces > usedTissue) {
        message.channel.send(`You dont have ${amountOfPieces}x Used tissue`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const usedTissueSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Used tissue`)
          .setDescription(
            `YOU SOLD "USED TISSUE" FOR ${
              prices.usedTissue
            } GOLD COINS (you have ${usedTissue - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(usedTissueSoldEmbed);
        db.add(`usedTissueStoreAdd`, 1);
        db.subtract(`usedTissue_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.usedTissue);
      }
    }
    if (item == "brokenStick") {
      const brokenStick = db.fetch(`brokenStick_${tokenDB}`);
      if (!brokenStick) {
        message.channel.send(`You dont have Broken stick`);
      } else if (amountOfPieces > brokenStick) {
        message.channel.send(`You dont have ${amountOfPieces}x Broken stick`);
      } else if (!amountOfPieces) {
        message.channel.send(`Mention the amount of pieces you want to sell`);
      } else {
        const brokenStickSoldEmbed = new Discord.MessageEmbed()
          .setTitle(`Broken stick`)
          .setDescription(
            `YOU SOLD "BROKEN STICK" FOR ${
              prices.brokenStick
            } GOLD COINS (you have ${brokenStick - 1} pieces left)`
          )
          .setColor("#D33333");
        message.channel.send(brokenStickSoldEmbed);
        db.add(`brokenStickStoreAdd`, 1);
        db.subtract(`brokenStick_${tokenDB}`, 1);
        db.add(`money_${tokenDB}.pocket`, prices.brokenStick);
      }
    }
  },
};
