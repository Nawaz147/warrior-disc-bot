// const Discord = require("discord.js");
// const db = require("quick.db");
// const colors = require("../../colors.json");
// const ms = require("parse-ms");

// module.exports = {
//   name: "store",
//   aliases: ["Store"],
//   description: "To see store",
//   usage: "store",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     const Platinum = db.fetch(`orons_${tokenDB}`);
//     const banned = db.fetch(`banned_${tokenDB}`);
//     const banReason = db.fetch(`reasonForBan_${tokenDB}`);
//     const banDate = db.fetch(`banDate_${tokenDB}`);
//     const update = db.fetch(`updateInProgress`);

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
//     } else if (update == true) {
//       message.channel.send(
//         `You cannot use any commands right now! Bot is updating`
//       );
//     } else {
//       var item = args.slice(1).join(" ");
//       if (args[0]) {
//         if (args[0] !== "buy" && args[0] !== "add") {
//           message.channel.send(
//             `***Inavlid command Usage [type +store buy (itemName)] , eg : +store buy texarus***`
//           );
//         }
//       }
//       if (!args[0]) {
//         const legendsCrateOpened = db.fetch(`legendsCrateOpened_${tokenDB}`);
//         const texarusPieces = db.fetch(`texarusPieces`);
//         const waetraPieces = db.fetch(`waetraPieces`);
//         const rashetaPieces = db.fetch(`rashetaPieces`);
//         // const mercyCratePieces = db.fetch(`mercyCratePieces`);
//         const legendsCratePieces = db.fetch(`legendsCratePieces`);
//         const natureDaggersPieces = db.fetch(`natureDaggersPieces`);
//         const keysPieces = db.fetch(`keysPieces`);
//         const immortalGunPieces = db.fetch(`immortalGunPieces`);
//         const storeEmbed = new Discord.MessageEmbed()
//           .setColor("#FFFFFF")
//           .setTitle("**__Store__**").setDescription(`
// **Immortal gun of power** - *58600* Platinum (${immortalGunPieces} in stock)
// **Nature Daggers of superpower** - *40860* Platinum (${natureDaggersPieces} in stock)
// **Rasheta the furious** - *7860* Platinum (${rashetaPieces} in stock)
// **Waetra the freezed** - *4760* Platinum (${waetraPieces} in stock)
// **Texarus the demonished** - *3250* Platinum (${texarusPieces} in stock)
// **<:keys:1049349577746169866> 2500 keys sack** - 2850 Platinum (${keysPieces} in stock)
// **<:treasureChest:1048854125078646836> Locked crate of legends** - *2050* Platinum (${legendsCratePieces} in stock) [you opened ${legendsCrateOpened}/10]
//       `);
//         message.channel.send(storeEmbed);
//       } else {
//         if (args[0] == "add") {
//           if (message.author.id == "768747976767832084") {
//             if (item == "rasheta") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`rashetaPieces`, amount);
//                 message.channel.send(`Added ${amount} Rasheta's to stock`);
//               }
//             }
//             if (item == "natureDaggers") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`natureDaggersPieces`, amount);
//                 message.channel.send(
//                   `Added ${amount} Nature dagger's to stock`
//                 );
//               }
//             }
//             if (item == "waetra") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`waetraPieces`, amount);
//                 message.channel.send(`Added ${amount} Waetra's to stock`);
//               }
//             }
//             if (item == "immortalGun") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`immortalGunPieces`, amount);
//                 message.channel.send(`Added ${amount} Immortal gun's to stock`);
//               }
//             }
//             // if (item == "mercyCrate") {
//             //   let amount = parseInt(args[2]);
//             //   if (!amount) {
//             //     message.channel.send("Please enter a valid amount");
//             //   } else {
//             //     db.add(`mercyCratePieces`, amount);
//             //     message.channel.send(
//             //       `Added ${amount} Locked crates of mercy to stock`
//             //     );
//             //   }
//             // }
//             if (item == "legendsCrate") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`legendsCratePieces`, amount);
//                 message.channel.send(
//                   `Added ${amount} Locked crates of legends to stock`
//                 );
//               }
//             }
//             if (item == "texarus") {
//               let amount = parseInt(args[2]);
//               if (!amount) {
//                 message.channel.send("Please enter a valid amount");
//               } else {
//                 db.add(`texarusPieces`, amount);
//                 message.channel.send(`Added ${amount} Texarus's to stock`);
//               }
//             }
//           }
//         }
//         if (args[0] == "buy") {
//           if (item == "rasheta") {
//             if (Platinum < "7860") {
//               message.channel.send(
//                 `You need ${7860 - Platinum} Platinum more to buy this item`
//               );
//             } else {
//               const rashetaPieces = db.fetch(`rashetaPieces`);
//               if (rashetaPieces == "0" || rashetaPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`rashetaPieces`, 1);
//                 db.add(`rasheta_${tokenDB}`, 1);
//                 db.subtract(`orons_${tokenDB}`, 7860);
//                 message.channel.send(
//                   `*###* You purchased 1 Rasheta the Furious *###*`
//                 );
//               }
//             }
//           }
//           if (item == "immortalGun") {
//             if (Platinum < "58600") {
//               message.channel.send(
//                 `You need ${58600 - Platinum} Platinum more to buy this item`
//               );
//             } else {
//               const immortalGunPieces = db.fetch(`immortalGunPieces`);
//               if (immortalGunPieces == "0" || immortalGunPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`immortalGunPieces`, 1);
//                 db.add(`immortalGun_${tokenDB}`, 1);
//                 db.subtract(`orons_${tokenDB}`, 58600);
//                 message.channel.send(
//                   `*###* You purchased 1 Immortal the power *###*`
//                 );
//               }
//             }
//           }
//           if (item == "natureDaggers") {
//             if (Platinum < "40860") {
//               message.channel.send(
//                 `You need ${40860 - Platinum} Platinum more to buy this item`
//               );
//             } else {
//               const natureDaggersPieces = db.fetch(`natureDaggersPieces`);
//               if (natureDaggersPieces == "0" || natureDaggersPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`natureDaggersPieces`, 1);
//                 db.add(`natureDaggers_${tokenDB}`, 1);
//                 db.subtract(`orons_${tokenDB}`, 40860);
//                 message.channel.send(
//                   `*###* You purchased 1 Nature Daggers of Superpower *###*`
//                 );
//                 console.log(`
// -----------------------------------------------------------------
// ${user} has purchased 1 Nature daggers of superpower
// -----------------------------------------------------------------
//               `);
//               }
//             }

//             //           } else if (item == "mercyCrate") {
//             //             if (Platinum < "10") {
//             //               message.channel.send(
//             //                 `You need ${10 - Platinum} Platinum more to buy this item`
//             //               );
//             //             } else {
//             //               const mercyCratePieces = db.fetch(`mercyCratePieces`);
//             //               if (mercyCratePieces == "0" || mercyCratePieces < "0") {
//             //                 const soldEmbed = new Discord.MessageEmbed()
//             //                   .setTitle("ALL PIECES ARE SOLD OUT !!")
//             //                   .setColor(colors.red);
//             //                 message.channel.send(soldEmbed);
//             //               } else {
//             //                 db.add(`mercyCrateOpened_${tokenDB}`, 1);
//             //                 let DropsGoldCoins = ["5000", "3000", "25000", "50000", "10000"];
//             //                 let dropsPlatinum = ["10", "25", "2", "5", "4"];
//             //                 let dropsWeapons = [
//             //                   "Rasheta",
//             //                   "Waetra",
//             //                   "Texarus",
//             //                   "natureDaggers",
//             //                 ];
//             //                 let dropsRareLustrozyn = ["50000000", "25000000"];
//             //                 let chance = Math.floor(Math.random() * 100) + 0;
//             //                 let PlatinumChance =
//             //                   dropsPlatinum[Math.floor(Math.random() * dropsPlatinum.length)];
//             //                 let rareLustrozynChance =
//             //                   dropsRareLustrozyn[
//             //                     Math.floor(Math.random() * dropsRareLustrozyn.length)
//             //                   ];
//             //                 let weaponsChance =
//             //                   dropsWeapons[Math.floor(Math.random() * dropsWeapons.length)];
//             //                 let GoldCoinsChance =
//             //                   DropsGoldCoins[Math.floor(Math.random() * DropsGoldCoins.length)];
//             //                 const mercyCrateOpened = db.fetch(
//             //                   `mercyCrateOpened_${tokenDB}`
//             //                 );
//             //                 console.log(mercyCrateOpened);
//             //                 if (mercyCrateOpened == "850") {
//             //                   if (weaponsChance == "Rasheta") {
//             //                     message.channel.send(
//             //                       "```fix" +
//             //                         `
//             // !!! You received : Rasheta the furious axe !!!
//             // ` +
//             //                         "```"
//             //                     );
//             //                     db.add(`rasheta_${tokenDB}`, 1);
//             //                     db.set(`mercyCrateOpened_${tokenDB}`, 0);
//             //                   } else if (weaponsChance == "Waetra") {
//             //                     message.channel.send(
//             //                       "```fix" +
//             //                         `
//             // !!! You received : Waetra the freezed bow !!!
//             // ` +
//             //                         "```"
//             //                     );
//             //                     db.add(`waetra_${tokenDB}`, 1);
//             //                     db.set(`mercyCrateOpened_${tokenDB}`, 0);
//             //                   } else if (weaponsChance == "Texarus") {
//             //                     message.channel.send(
//             //                       "```fix" +
//             //                         `
//             // !!! You received : Texarus the demonished staff!!!
//             // ` +
//             //                         "```"
//             //                     );
//             //                     db.set(`mercyCrateOpened_${tokenDB}`, 0);
//             //                     db.add(`texarus_${tokenDB}`, 1);
//             //                   } else if (weaponsChance == "natureDaggers") {
//             //                     message.channel.send(
//             //                       "```diff" +
//             //                         `
//             // -!!! You received : Nature Daggers of Superpower !!!
//             // ` +
//             //                         "```"
//             //                     );
//             //                     db.set(`mercyCrateOpened_${tokenDB}`, 0);
//             //                     db.add(`natureDaggers_${tokenDB}`, 1);
//             //                   }
//             //                 } else {
//             //                   if (chance <= 7) {
//             //                     if (PlatinumChance == "10") {
//             //                       message.channel.send(
//             //                         "```json" +
//             //                           `
//             // "You received : 10 Platinum"
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`orons_${tokenDB}`, 10);
//             //                     } else if (PlatinumChance == "25") {
//             //                       message.channel.send(
//             //                         "```json" +
//             //                           `
//             // "You received : 25 Platinum"
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`orons_${tokenDB}`, 25);
//             //                     } else if (PlatinumChance == "2") {
//             //                       message.channel.send(
//             //                         "```json" +
//             //                           `
//             // "You received : 2 Platinum"
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`orons_${tokenDB}`, 2);
//             //                     } else if (PlatinumChance == "4") {
//             //                       message.channel.send(
//             //                         "```json" +
//             //                           `
//             // "You received : 4 Platinum"
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`orons_${tokenDB}`, 4);
//             //                     } else if (PlatinumChance == "5") {
//             //                       message.channel.send(
//             //                         "```json" +
//             //                           `
//             // "You received : 5 Platinum"
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`orons_${tokenDB}`, 5);
//             //                     }
//             //                   } else if (chance <= 5) {
//             //                     if (weaponsChance == "Rasheta") {
//             //                       message.channel.send(
//             //                         "```fix" +
//             //                           `
//             // !!! You received : Rasheta the furious axe !!!
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`rasheta_${tokenDB}`, 1);
//             //                       console.log("Someone looted rasheta the furious axe");
//             //                     } else if (weaponsChance == "Waetra") {
//             //                       message.channel.send(
//             //                         "```fix" +
//             //                           `
//             // !!! You received : Waetra the freezed bow !!!
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`waetra_${tokenDB}`, 1);
//             //                       console.log("Someone looted waetra the freezed bow");
//             //                     } else if (weaponsChance == "Texarus") {
//             //                       message.channel.send(
//             //                         "```fix" +
//             //                           `
//             // !!! You received : Texarus the Demonished staff !!!
//             // ` +
//             //                           "```"
//             //                       );
//             //                       console.log(
//             //                         "Someone looted Texarus the demonished staff"
//             //                       );
//             //                       db.add(`texarus_${tokenDB}`, 1);
//             //                     } else if (weaponsChance == "natureDaggers") {
//             //                       message.channel.send(
//             //                         "```diff" +
//             //                           `
//             // -!!! You received : Nature Daggers of Superpower !!!
//             // ` +
//             //                           "```"
//             //                       );
//             //                       console.log(
//             //                         "Someone looted Nature daggers of superpower"
//             //                       );
//             //                       db.fetch(`natureDaggers_${tokenDB}`);
//             //                       db.add(`natureDaggers_${tokenDB}`, 1);
//             //                     }
//             //                   } else if (chance <= 6) {
//             //                     if (rareLustrozynChance == "25000000") {
//             //                       message.channel.send(
//             //                         "```fix" +
//             //                           `
//             //  You received : 25,000,000 Lustrozyns
//             // ` +
//             //                           "```"
//             //                       );
//             //                       db.add(`money_${tokenDB}.pocket`, 25000000);
//             //                     } else if (rareLustrozynChance == "50000000") {
//             //                       message.channel.send(
//             //                         "```fix" +
//             //                           `
//             // You received : 50,000,000 Lustrozyns
//             // ` +
//             //                           "```"
//             //                       );
//             //                       console.log(`You received : 50,000,000`);
//             //                       db.add(`money_${tokenDB}.pocket`, 50000000);
//             //                     }
//             //                   } else {
//             //                     if (GoldCoinsChance == "500") {
//             //                       message.channel.send("```You received : 5000 Gold Coins```");
//             //                       db.add(`money_${tokenDB}.pocket`, 5000);
//             //                     } else if (GoldCoinsChance == "3000") {
//             //                       message.channel.send("```You received : 3,000 Gold Coins```");
//             //                       db.add(`money_${tokenDB}.pocket`, 3000);
//             //                     } else if (GoldCoinsChance == "25000") {
//             //                       message.channel.send("```You received : 25,000 Gold Coins```");
//             //                       db.add(`money_${tokenDB}.pocket`, 25000);
//             //                     } else if (GoldCoinsChance == "50000") {
//             //                       message.channel.send("```You received : 50,000 Gold Coins```");
//             //                       db.add(`money_${tokenDB}.pocket`, 50000);
//             //                     } else if (GoldCoinsChance == "100000") {
//             //                       message.channel.send(
//             //                         "```You received : 100,000 Gold Coins```"
//             //                       );
//             //                       db.add(`money_${tokenDB}.pocket`, 100000);
//             //                     } else {
//             //                       message.channel.send("```You received : 1,200 Gold Coins```");
//             //                       db.add(`money_${tokenDB}.pocket`, 1200);
//             //                     }
//             //                   }
//             //                   db.subtract(`mercyCratePieces`, 1);
//             //                   db.subtract(`orons_${tokenDB}`, 10);
//             //                 }
//             //               }
//             //             }
//           } else if (item == "legendsCrate") {
//             var keys = await db.fetch(`userKeys_${tokenDB}`);
//             if (Platinum < "2050") {
//               message.channel.send(
//                 `You need ${2050 - Platinum} Platinum more to buy this item`
//               );
//             } else if (keys > "2050" || keys == "2050") {
//               const legendsCratePieces = db.fetch(`legendsCratePieces`);
//               if (legendsCratePieces == "0" || legendsCratePieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("ALL PIECES ARE SOLD OUT !!")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`legendsCratePieces`, 1);
//                 let DropsGoldCoins = ["50000", "12000", "5000"];
//                 let dropsPlatinum = ["10", "25", "100", "5", "42"];
//                 let dropsWeapons = [
//                   "Rasheta",
//                   "Waetra",
//                   "Texarus",
//                   "natureDaggers",
//                   "immortalGun",
//                 ];
//                 let dropsRareItems = [
//                   "Magnificent carpet",
//                   "Magnificent pen",
//                   "Splendid Trophy",
//                 ];
//                 let weaponsChance =
//                   dropsWeapons[Math.floor(Math.random() * dropsWeapons.length)];
//                 let GoldCoinsChance =
//                   DropsGoldCoins[
//                     Math.floor(Math.random() * DropsGoldCoins.length)
//                   ];
//                 let dropsRareItemsChance =
//                   dropsRareItems[
//                     Math.floor(Math.random() * dropsRareItems.length)
//                   ];
//                 let chance = Math.floor(Math.random() * 100) + 0;
//                 let PlatinumChance =
//                   dropsPlatinum[
//                     Math.floor(Math.random() * dropsPlatinum.length)
//                   ];
//                 const legendsCrateOpened = db.fetch(
//                   `legendsCrateOpened_${tokenDB}`
//                 );
//                 let timeout = 10000;
//                 let cooldown = await db.fetch(`cooldown_${tokenDB}`);
//                 if (
//                   cooldown !== null &&
//                   timeout - (Date.now() - cooldown) > 0
//                 ) {
//                   let time = ms(timeout - (Date.now() - cooldown));
//                   let timeEmbed = new Discord.MessageEmbed()
//                     .setColor("#FFFFFF")
//                     .setDescription(
//                       `Wait! You need to wait ${time.seconds}s ${time.milliseconds}ms`
//                     );
//                   message.channel.send(timeEmbed);
//                 } else if (legendsCrateOpened == "10") {
//                   if (dropsRareItemsChance == "Magnificent carpet") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent Carpet
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`magnificentCarpet_${tokenDB}`, 1);
//                     }, 1500);
//                   } else if (dropsRareItemsChance == "Magnificent pen") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent Pen
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`magnificentPen_${tokenDB}`, 1);
//                     }, 1500);
//                   } else if (dropsRareItemsChance == "Splendid Trophy") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Splendid Trophy
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`splendidTrophy_${tokenDB}`, 1);
//                     }, 1500);
//                     db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                     db.add(`magnificentTrophy_${tokenDB}`, 1);
//                   }
//                 } else {
//                   if (chance <= 7) {
//                     if (PlatinumChance == "10") {
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 10 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 10);
//                       }, 1500);
//                     } else if (PlatinumChance == "25") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 25 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 25);
//                       }, 1500);
//                     } else if (PlatinumChance == "100") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// You received : 100 Platinum
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 100);
//                       }, 1500);
//                     } else if (PlatinumChance == "42") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 42 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 42);
//                       }, 1500);
//                     } else if (PlatinumChance == "5") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 5 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 5);
//                       }, 1500);
//                     }
//                   } else if (chance <= 50) {
//                     if (weaponsChance == "Rasheta") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Rasheta The furious axe !!!
// ` +
//                             "```"
//                         );
//                         db.add(`rasheta_${tokenDB}`, 1);
//                       }, 5000);
//                     }
//                     if (weaponsChance == "immortalGun") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! Immortal Gun of Energy !!!
// ` +
//                             "```"
//                         );
//                         db.add(`immortalGun_${tokenDB}`, 1);
//                       }, 5000);
//                     } else if (weaponsChance == "Waetra") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Waetra the freezed bow !!!
// ` +
//                             "```"
//                         );
//                         db.add(`waetra_${tokenDB}`, 1);
//                       }, 5000);
//                     } else if (weaponsChance == "Texarus") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                             "```"
//                         );
//                         db.add(`texarus_${tokenDB}`, 1);
//                       }, 6000);
//                     } else if (weaponsChance == "natureDaggers") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -!!! You received : Nature daggers of superpower !!!
// ` +
//                             "```"
//                         );
//                         db.add(`natureDaggers_${tokenDB}`, 1);
//                       }, 6000);
//                     }
//                   } else if (chance <= 49) {
//                     if (dropsRareItemsChance == "Magnificent carpet") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent Carpet
// ` +
//                             "```"
//                         );
//                         db.add(`magnificentCarpet_${tokenDB}`, 1);
//                       }, 6500);
//                     } else if (dropsRareItemsChance == "Magnificent pen") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent Pen
// ` +
//                             "```"
//                         );
//                         db.add(`magnificentPen_${tokenDB}`, 1);
//                       }, 6500);
//                     } else if (dropsRareItemsChance == "Splendid trophy") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy
// ` +
//                             "```"
//                         );
//                         db.add(`splendidTrophy_${tokenDB}`, 1);
//                       }, 6500);
//                     }
//                   } else {
//                     if (GoldCoinsChance == "5000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 5000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "3000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 3000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "12000") {
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 12,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 12000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "50000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 50,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 50000);
//                       }, 6000);
//                     } else {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 4,700 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 4700);
//                       }, 6000);
//                     }
//                   }
//                   db.subtract(`userKeys_${tokenDB}`, 2050);
//                 }
//               }
//             } else {
//               const legendsCratePieces = db.fetch(`legendsCratePieces`);
//               if (legendsCratePieces == "0" || legendsCratePieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("ALL PIECES ARE SOLD OUT !!")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`legendsCratePieces`, 1);
//                 let DropsGoldCoins = ["50000", "12000", "5000"];
//                 let dropsPlatinum = ["10", "25", "100", "5", "42"];
//                 let dropsWeapons = [
//                   "Rasheta",
//                   "Waetra",
//                   "Texarus",
//                   "natureDaggers",
//                 ];
//                 let dropsRareItems = [
//                   "Magnificent carpet",
//                   "Magnificent pen",
//                   "Splendid Trophy",
//                 ];
//                 let weaponsChance =
//                   dropsWeapons[Math.floor(Math.random() * dropsWeapons.length)];
//                 let GoldCoinsChance =
//                   DropsGoldCoins[
//                     Math.floor(Math.random() * DropsGoldCoins.length)
//                   ];
//                 let dropsRareItemsChance =
//                   dropsRareItems[
//                     Math.floor(Math.random() * dropsRareItems.length)
//                   ];
//                 let chance = Math.floor(Math.random() * 100) + 0;
//                 let PlatinumChance =
//                   dropsPlatinum[
//                     Math.floor(Math.random() * dropsPlatinum.length)
//                   ];
//                 const legendsCrateOpened = db.fetch(
//                   `legendsCrateOpened_${tokenDB}`
//                 );
//                 let timeout = 10000;
//                 let cooldown = await db.fetch(`cooldown_${tokenDB}`);
//                 if (
//                   cooldown !== null &&
//                   timeout - (Date.now() - cooldown) > 0
//                 ) {
//                   let time = ms(timeout - (Date.now() - cooldown));
//                   let timeEmbed = new Discord.MessageEmbed()
//                     .setColor("#FFFFFF")
//                     .setDescription(
//                       `Wait! You need to wait ${time.seconds}s ${time.milliseconds}ms`
//                     );
//                   message.channel.send(timeEmbed);
//                 } else if (legendsCrateOpened == "10") {
//                   if (dropsRareItemsChance == "Magnificent carpet") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent Carpet
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`magnificentCarpet_${tokenDB}`, 1);
//                     }, 1500);
//                   } else if (dropsRareItemsChance == "Magnificent pen") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent Pen
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`magnificentPen_${tokenDB}`, 1);
//                     }, 1500);
//                   } else if (dropsRareItemsChance == "Splendid Trophy") {
//                     await db.set(`cooldown_${tokenDB}`, Date.now());
//                     var opening = await message.channel.send(
//                       "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                     );
//                     setTimeout(function () {
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Splendid Trophy
// ` +
//                           "```"
//                       );
//                       db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                       db.add(`splendidTrophy_${tokenDB}`, 1);
//                     }, 1500);
//                     db.set(`legendsCrateOpened_${tokenDB}`, 0);
//                     db.add(`magnificentTrophy_${tokenDB}`, 1);
//                   }
//                 } else {
//                   if (chance <= 7) {
//                     if (PlatinumChance == "10") {
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 10 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 10);
//                       }, 1500);
//                     } else if (PlatinumChance == "25") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 25 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 25);
//                       }, 1500);
//                     } else if (PlatinumChance == "100") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// You received : 100 Platinum
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 100);
//                       }, 1500);
//                     } else if (PlatinumChance == "42") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 42 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 42);
//                       }, 1500);
//                     } else if (PlatinumChance == "5") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```json" +
//                             `
// "You received : 5 Platinum"
// ` +
//                             "```"
//                         );
//                         db.add(`orons_${tokenDB}`, 5);
//                       }, 1500);
//                     }
//                   } else if (chance <= 50) {
//                     if (weaponsChance == "Rasheta") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Rasheta The furious axe !!!
// ` +
//                             "```"
//                         );
//                         db.add(`rasheta_${tokenDB}`, 1);
//                       }, 5000);
//                     } else if (weaponsChance == "Waetra") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Waetra the freezed bow !!!
//   ` +
//                             "```"
//                         );
//                         db.add(`waetra_${tokenDB}`, 1);
//                       }, 5000);
//                     } else if (weaponsChance == "Texarus") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                             "```"
//                         );
//                         db.add(`texarus_${tokenDB}`, 1);
//                       }, 6000);
//                     } else if (weaponsChance == "natureDaggers") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -!!! You received : Nature daggers of superpower !!!
//   ` +
//                             "```"
//                         );
//                         db.add(`natureDaggers_${tokenDB}`, 1);
//                       }, 6000);
//                     }
//                   } else if (chance <= 49) {
//                     if (dropsRareItemsChance == "Magnificent carpet") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent Carpet
// ` +
//                             "```"
//                         );
//                         db.add(`magnificentCarpet_${tokenDB}`, 1);
//                       }, 6500);
//                     } else if (dropsRareItemsChance == "Magnificent pen") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
//   You received : Magnificent Pen
//   ` +
//                             "```"
//                         );
//                         db.add(`magnificentPen_${tokenDB}`, 1);
//                       }, 6500);
//                     } else if (dropsRareItemsChance == "Splendid trophy") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// You received : Magnificent carpet ?
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Magnificent pen ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Splendid Trophy ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
//   You received : Splendid Trophy
//   ` +
//                             "```"
//                         );
//                         db.add(`splendidTrophy_${tokenDB}`, 1);
//                       }, 6500);
//                     }
//                   } else {
//                     if (GoldCoinsChance == "5000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 5000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "3000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 3000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "12000") {
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 12,000 Gold Coins
//   ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 12000);
//                       }, 6000);
//                     } else if (GoldCoinsChance == "50000") {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       await db.set(`cooldown_${tokenDB}`, Date.now());
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 50,000 Gold Coins
// ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 50000);
//                       }, 6000);
//                     } else {
//                       db.add(`legendsCrateOpened_${tokenDB}`, 1);
//                       var opening = await message.channel.send(
//                         "Opening Legends crate <:treasureChest:1048854125078646836> ..."
//                       );
//                       opening.edit(
//                         "```fix" +
//                           `
// !!! You received : Texarus the demonished staff !!!
// ` +
//                           "```"
//                       );
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Rasheta The furious axe ?
// ` +
//                             "```"
//                         );
//                       }, 100);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Immortal Gun of Energy ?
// ` +
//                             "```"
//                         );
//                       }, 300);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```fix" +
//                             `
// You received : Texarus the demonished staff ?
// ` +
//                             "```"
//                         );
//                       }, 500);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```diff" +
//                             `
// -You received : Nature Daggers of superpower ?
// ` +
//                             "```"
//                         );
//                       }, 800);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 5000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1200);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
// You received : 3,000 Gold Coins ?
// ` +
//                             "```"
//                         );
//                       }, 1500);
//                       setTimeout(function () {
//                         opening.edit("```" + `??....??....??` + "```");
//                       }, 2000);
//                       setTimeout(function () {
//                         opening.edit(
//                           "```" +
//                             `
//   You received : 4,700 Gold Coins
//   ` +
//                             "```"
//                         );
//                         db.add(`money_${tokenDB}.pocket`, 4700);
//                       }, 6000);
//                     }
//                   }
//                   db.subtract(`orons_${tokenDB}`, 2050);
//                 }
//               }
//             }
//           } else if (item == "waetra") {
//             if (Platinum < "4760") {
//               `You need ${4760 - Platinum} Platinum more to buy this item`;
//             } else {
//               const waetraPieces = db.fetch(`waetraPieces`);
//               if (waetraPieces == "0" || waetraPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`orons_${tokenDB}`, 4760);
//                 db.subtract(`waetraPieces`, 1);
//                 db.add(`waetra_${tokenDB}`, 1);
//                 message.channel.send(
//                   `*###* You purchased 1 Waetra The Freezed *###*`
//                 );
//                 console.log(`
// -----------------------------------------------------------------
// ${user} has purchased 1 Waetra the Freezed
// -----------------------------------------------------------------
//               `);
//               }
//             }
//           } else if (item == "texarus") {
//             if (Platinum < "3250") {
//               `You need ${3250 - Platinum} Platinum more to buy this item`;
//             } else {
//               const TexarusPieces = db.fetch(`texarusPieces`);
//               if (TexarusPieces == "0" || TexarusPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`texarusPieces`, 1);
//                 db.add(`texarus_${tokenDB}`, 1);
//                 db.subtract(`orons_${tokenDB}`, 3250);
//                 message.channel.send(
//                   `*###* You purchased 1 Texarus the Demonished *###*`
//                 );
//               }
//             }
//           } else if (item == "keysSack") {
//             if (Platinum < "2850") {
//               `You need ${2850 - Platinum} Platinum more to buy this item`;
//             } else {
//               const KeysPieces = db.fetch(`keysPieces`);
//               if (KeysPieces == "0" || KeysPieces < "0") {
//                 const soldEmbed = new Discord.MessageEmbed()
//                   .setTitle("SOLD OUT !")
//                   .setColor(colors.red);
//                 message.channel.send(soldEmbed);
//               } else {
//                 db.subtract(`keysPieces`, 1);
//                 db.add(`2850keys_${tokenDB}`, 1);
//                 db.subtract(`orons_${tokenDB}`, 2850);
//                 message.channel.send(`*You purchased* **2850 keys sack**`);
//               }
//             }
//           }
//           if (item) {
//             if (
//               item !== "legendsCrate" &&
//               item !== "texarus" &&
//               item !== "waetra" &&
//               item !== "rasheta" &&
//               item !== "natureDaggers" &&
//               item !== "immortalGun" &&
//               item !== "keysSack"
//             ) {
//               message.channel.send(
//                 `*Invalid Item Name [Item named : **${item}** does not exist] , Usage eg : +store buy waetra*`
//               );
//             }
//           }
//         }
//       }
//     }
//   },
// };
