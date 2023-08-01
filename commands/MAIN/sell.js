// const Discord = require("discord.js");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const config = require("../../config.json");
// const e = require("express");
// const prices = require("../../prices.json");
// module.exports = {
//   name: "sell",
//   aliases: ["sale", "Sell"],
//   description: "To sell an item",
//   usage: "sell",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
//     const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your Lustrozy token is not registered yet , type +token me to set your Lustrozy token`
//       );
//     } else if (banned == true) {
//       const banEmbed = new Discord.MessageEmbed()
//         .setTitle(user)
//         .setDescription(`This account is banned`)
//         .addField("Reason", `${banReason}`)
//         .addField("Date", `${banDate}`)
//         .setColor("#FFFF00");
//       message.channel.send(banEmbed);
//     } else {
//       var item = args.slice(0).join(" ");
//       // var possiblitiesRasheta = [
//       //   "Rasheta the furious axe",
//       //   "Rasheta The Furious Axe",
//       //   "Rasheta The furious Axe",
//       //   "rasheta the furious axe",
//       //   "rashet",
//       //   "Rasheta",
//       // ];
//       // var possiblitiesNatureDaggers = [
//       //   "Nature Daggers Of Superpower",
//       //   "Nature Daggers Of Superpower",
//       //   "nature daggers of superpower",
//       //   "NatureDaggers",
//       //   "nature",
//       //   "natureDagger",
//       // ];
//       if (!item) {
//         message.channel.send(
//           "Enter an item name you want to sell , eg: +sell rasheta"
//         );
//       }
//       if (item == "rasheta") {
//         const rasheta = db.fetch(`rasheta_${user.id}.${tokenDB}`);
//         if (!rasheta) {
//           message.channel.send(`You dont have Rasheta The Furious Axe`);
//         } else {
//           db.add(`rashetaStoreAdd`, 1);
//           db.subtract(`rasheta_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.rashetaAxe);
//           const rashetaSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Rasheta The Furious Axe`)
//             .setDescription(
//               `YOU SOLD "RASHETA THE FURIOUS AXE" FOR ${
//                 prices.rashetaAxe
//               } GOLD COINS (you have ${rasheta - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(rashetaSoldEmbed);
//         }
//       }
//       if (item == "waetra") {
//         const waetra = db.fetch(`waetra_${user.id}.${tokenDB}`);
//         if (!waetra) {
//           message.channel.send(`You dont have Waetra the freezed bow`);
//         } else {
//           db.add(`waetraStoreAdd`, 1);
//           db.subtract(`waetra_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.waetraBow);
//           const waetraSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Waetra the freezed bow`)
//             .setDescription(
//               `YOU SOLD "WAETRA THE FREEZED BOW" FOR ${
//                 prices.waetraBow
//               } GOLD COINS (you have ${waetra - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(waetraSoldEmbed);
//         }
//       }
//       if (item == "texarus") {
//         const texarus = db.fetch(`texarus_${user.id}.${tokenDB}`);
//         if (!texarus) {
//           message.channel.send(`You dont have Texarus the demonished staff`);
//         } else {
//           db.add(`texarusStoreAdd`, 1);
//           db.subtract(`texarus_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.texarusStaff);
//           const texarusSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Texarus the demonished staff`)
//             .setDescription(
//               `YOU SOLD "TEXARUS THE DEMONISHED STAFF" FOR ${
//                 prices.texarusStaff
//               } GOLD COINS (you have ${texarus - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(texarusSoldEmbed);
//         }
//       }
//       if (item == "natureDaggers") {
//         const natureDaggers = db.fetch(`natureDaggers_${user.id}.${tokenDB}`);
//         if (!natureDaggers) {
//           message.channel.send(`You dont have Nature Daggers of Superpower`);
//         } else {
//           db.add(`natureDaggersStoreAdd`, 1);
//           db.subtract(`natureDaggers_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.natureDaggers);
//           const natureDaggersSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Nature Daggers of Superpower`)
//             .setDescription(
//               `YOU SOLD "NATURE DAGGERS OF SUPERPOWER" FOR ${
//                 prices.natureDaggers
//               } GOLD COINS (you have ${natureDaggers - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(natureDaggersSoldEmbed);
//         }
//       }
//       if (item == "immortalGun") {
//         const immortalGun = db.fetch(`immortalGun_${user.id}.${tokenDB}`);
//         if (!immortalGun) {
//           message.channel.send(`You dont have Immortal Gun of Energy`);
//         } else {
//           db.add(`immortalGunStoreAdd`, 1);
//           db.subtract(`immortalGun_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.immortalGun);
//           const immortalGunSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Immortal Gun of Energy`)
//             .setDescription(
//               `YOU SOLD IMMORTAL GUN OF ENERGY" FOR ${
//                 prices.immortalGun
//               } GOLD COINS (you have ${immortalGun - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(immortalGunSoldEmbed);
//         }
//       }
//       if (item == "rubyOfRoyalty") {
//         const rubyOfRoyalty = db.fetch(`rubyOfRoyalty_${user.id}.${tokenDB}`);
//         if (!rubyOfRoyalty) {
//           message.channel.send(`You dont have Ruby of Royalty`);
//         } else {
//           const rubyOfRoyaltySoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Ruby of Royalty`)
//             .setDescription(
//               `YOU SOLD "RUBY OF ROYALTY" FOR ${
//                 prices.rubyOfRoyalty
//               } GOLD COINS (you have ${rubyOfRoyalty - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(rubyOfRoyaltySoldEmbed);
//           db.add(`rubyOfRoyaltyStoreAdd`, 1);
//           db.subtract(`rubyOfRoyalty_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.rubyOfRoyalty);
//         }
//       }
//       if (item == "goldenGhostKnight") {
//         const goldenGhostKnightSet = db.fetch(
//           `goldenGhostKnightSet_${user.id}.${tokenDB}`
//         );
//         if (!goldenGhostKnightSet) {
//           message.channel.send(`You dont have Golden Ghost Knight Set`);
//         } else {
//           const goldenGhostKnightSetSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Golden Ghost Knight Set`)
//             .setDescription(
//               `YOU SOLD "GOLDEN GHOST KNIGHT SET" FOR ${
//                 prices.goldenGhostKnightSet
//               } GOLD COINS (you have ${goldenGhostKnightSet - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(goldenGhostKnightSetSoldEmbed);
//           db.add(`goldenGhostKnightSetStoreAdd`, 1);
//           db.subtract(`goldenGhostKnightSet_${user.id}.${tokenDB}`, 1);
//           db.add(
//             `money_${user.id}.${tokenDB}.pocket`,
//             prices.goldenGhostKnightSet
//           );
//         }
//       }
//       if (item == "arcaneSensei") {
//         const arcaneSenseiSet = db.fetch(
//           `arcaneSenseiSet_${user.id}.${tokenDB}`
//         );
//         if (!arcaneSenseiSet) {
//           message.channel.send(`You dont have Arcane sensei set`);
//         } else {
//           const arcaneSenseiSetSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Arcane sensei vanity set`)
//             .setDescription(
//               `YOU SOLD "Arcane Sensei vanity set" FOR ${
//                 prices.arcaneSenseiSet
//               } GOLD COINS (you have ${arcaneSenseiSet - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(arcaneSenseiSetSoldEmbed);
//           db.add(`arcaneSenseiStoreAdd`, 1);
//           db.subtract(`arcaneSenseiSet_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.arcaneSenseiSet);
//         }
//       }
//       if (item == "goldenGloryCard") {
//         const goldenGloryCard = db.fetch(
//           `goldenGloryCard_${user.id}.${tokenDB}`
//         );
//         if (!goldenGloryCard) {
//           message.channel.send(`You dont have Golden glory card`);
//         } else {
//           const goldenGloryCardSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Golden glory card`)
//             .setDescription(
//               `YOU SOLD "GOLDEN GLORY CARD" FOR ${
//                 prices.goldenGloryCard
//               } GOLD COINS (you have ${goldenGloryCard - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(goldenGloryCardSoldEmbed);
//           db.add(`goldenGloryCardStoreAdd`, 1);
//           db.subtract(`goldenGloryCard_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.goldenGloryCard);
//         }
//       }
//       if (item == "royalStatueOfHonor") {
//         const royalStatueOfHonor = db.fetch(
//           `royalStatueOfHonor_${user.id}.${tokenDB}`
//         );
//         if (!royalStatueOfHonor) {
//           message.channel.send(`You dont have Royal statue of honor`);
//         } else {
//           const royalStatueOfHonorSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Royal statue of honor`)
//             .setDescription(
//               `YOU SOLD "ROYAL STATUE OF HONOR" FOR ${
//                 prices.royalStatueOfHonor
//               } GOLD COINS (you have ${royalStatueOfHonor - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(royalStatueOfHonorSoldEmbed);
//           db.add(`royalStatueOfHonorStoreAdd`, 1);
//           db.subtract(`royalStatueOfHonor_${user.id}.${tokenDB}`, 1);
//           db.add(
//             `money_${user.id}.${tokenDB}.pocket`,
//             prices.royalStatueOfHonor
//           );
//         }
//       }
//       if (item == "royaltyCoin") {
//         const royaltyCoin = db.fetch(`royaltyCoin_${user.id}.${tokenDB}`);
//         if (!royaltyCoin) {
//           message.channel.send(`You dont have Royalty Coin`);
//         } else {
//           const royaltyCoinSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Royalty Coin`)
//             .setDescription(
//               `YOU SOLD "GOLDEN GLORY CARD" FOR ${
//                 prices.royaltyCoin
//               } GOLD COINS (you have ${royaltyCoin - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(royaltyCoinSoldEmbed);
//           db.add(`royaltyCoinStoreAdd`, 1);
//           db.subtract(`royaltyCoin_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.royaltyCoin);
//         }
//       }
//       if (item == "magnificentCarpet") {
//         const magnificentCarpet = db.fetch(
//           `magnificentCarpet_${user.id}.${tokenDB}`
//         );
//         if (!magnificentCarpet) {
//           message.channel.send(`You dont have Magnificent Carpet`);
//         } else {
//           const magnificentCarpetSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Magnificent Carpet`)
//             .setDescription(
//               `YOU SOLD "MAGNIFICENT CARPET" FOR ${
//                 prices.magnificentCarpet
//               } GOLD COINS (you have ${magnificentCarpet - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(magnificentCarpetSoldEmbed);
//           db.add(`magnificentCarpetStoreAdd`, 1);
//           db.subtract(`magnificentCarpet_${user.id}.${tokenDB}`, 1);
//           db.add(
//             `money_${user.id}.${tokenDB}.pocket`,
//             prices.magnificentCarpet
//           );
//         }
//       }
//       if (item == "magnificentPen") {
//         const magnificentPen = db.fetch(`magnificentPen_${user.id}.${tokenDB}`);
//         if (!magnificentPen) {
//           message.channel.send(`You dont have Magnificent Pen`);
//         } else {
//           const magnificentPenSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Magnificent Pen`)
//             .setDescription(
//               `YOU SOLD "MAGNIFICENT PEN" FOR ${
//                 prices.magnificentPen
//               } GOLD COINS (you have ${magnificentPen - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(magnificentPenSoldEmbed);
//           db.add(`magnificentPenStoreAdd`, 1);
//           db.subtract(`magnificentPen_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.magnificentPen);
//         }
//       }

//       if (item == "keysSack") {
//         const keys = db.fetch(`2850keys_${user.id}.${tokenDB}`);
//         if (!keys) {
//           message.channel.send(`You dont have keys sack`);
//         } else {
//           const keysSoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`2850 keys`)
//             .setDescription(
//               `YOU SOLD "2850 keys sack" FOR ${
//                 prices.keysSack
//               } GOLD COINS (you have ${keys - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(keysSoldEmbed);
//           db.add(`keysSackStoreAdd`, 1);
//           db.subtract(`2850keys_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.keysSack);
//         }
//       }

//       if (item == "splendidTrophy") {
//         const splendidTrophy = db.fetch(`splendidTrophy_${user.id}.${tokenDB}`);
//         if (!splendidTrophy) {
//           message.channel.send(`You dont have Splendid Trophy`);
//         } else {
//           const splendidTrophySoldEmbed = new Discord.MessageEmbed()
//             .setTitle(`Splendid Trophy`)
//             .setDescription(
//               `YOU SOLD "SPLENDID TROPHY" FOR ${
//                 prices.splendidTrophy
//               } GOLD COINS (you have ${splendidTrophy - 1} pieces left)`
//             )
//             .setColor("#D33333");
//           message.channel.send(splendidTrophySoldEmbed);
//           db.add(`splendidTrophyStoreAdd`, 1);
//           db.subtract(`splendidTrophy_${user.id}.${tokenDB}`, 1);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, prices.splendidTrophy);
//         }
//       }
//       if (item == "Rasheta the furious axe") {
//         message.channel.send(`Did u mean to write : **+sell rasheta**`);
//       } else if (item == "Rasheta The Furious Axe") {
//         message.channel.send(`Did u mean to write : **+sell rasheta**`);
//       } else if (item == "Rasheta The furious Axe") {
//         message.channel.send(`Did u mean to write : **+sell rasheta**`);
//       } else if (item == "rashet") {
//         message.channel.send(`Did u mean to write : **+sell rasheta**`);
//       } else if (item == "Rasheta") {
//         message.channel.send(`Did u mean to write : **+sell rasheta**`);
//       } else if (item == "Nature Daggers Of Superpower") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "nature daggers of superpower") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "Nature Daggers Of Superpower") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "nature") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "NatureDaggers") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "Naturedaggers") {
//         message.channel.send(`Did u mean to write : **+sell natureDaggers**`);
//       } else if (item == "Waetra The Freezed Bow") {
//         message.channel.send(`Did u mean to write : **+sell waetra**`);
//       } else if (item == "waetra the freezed bow") {
//         message.channel.send(`Did u mean to write : **+sell waetra**`);
//       } else if (item == "Waetra The Freezed bow") {
//         message.channel.send(`Did u mean to write : **+sell waetra**`);
//       } else if (item == "waetraBow") {
//         message.channel.send(`Did u mean to write : **+sell waetra**`);
//       } else if (item == "Waetra") {
//         message.channel.send(`Did u mean to write : **+sell waetra**`);
//       } else if (item == "Texarus The Demonished Staff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "texarus The demonished staff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "texarus the demonished staff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "Texarus the demonished staff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "Texarus") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "TexarusStaff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (item == "texarusStaff") {
//         message.channel.send(`Did u mean to write : **+sell texarus**`);
//       } else if (
//         item !== "rasheta" &&
//         item !== "waetra" &&
//         item !== "texarus" &&
//         item !== "natureDaggers" &&
//         item !== "immortalGun" &&
//         item !== "rubyOfRoyalty" &&
//         item !== "goldenGloryCard" &&
//         item !== "royalStatueOfHonor" &&
//         item !== "oyoMask" &&
//         item !== "royaltyCoin" &&
//         item !== "magnificentCarpet" &&
//         item !== "magnificentPen" &&
//         item !== "splendidTrophy" &&
//         item !== "keysSack"
//       ) {
//         message.channel.send(
//           `*Invalid item name [item named **${args[0]}**] does not exist , usage eg : +sell rasheta*`
//         );
//       }
//     }
//   },
// };
