// const Discord = require("discord.js");
// const db = require("quick.db");
// module.exports = {
//   name: "purchase",
//   aliases: ["purchase", "purchaseItem", "buy"],
//   description: "To see purchase",
//   usage: "purchase",
//   category: "Economy",
//   run: async (client, message, args) => {
//     var amount = args[0];
//     var item = args[1];
//     var user = message.author;
//     var tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     var money = db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//     const fiftyPercentDiscount = false;
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       if (item == "car") {
//         if (fiftyPercentDiscount == true) {
//           if (money < amount * 3750) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               "Please enter the amount of cars you want to buy"
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else {
//             const discountCarEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} cars for ~~${
//                   amount * 7500
//                 }~~ ${amount * 3750}`
//               );
//             message.channel.send(discountCarEmbed);
//             db.delete(`lastCarUser`);
//             db.add(`carPiecesInDiscord`, amount);
//             db.set(`lastCarUser`, `${user}`);
//             db.fetch(`my_car_${user.id}.${tokenDB}`);
//             db.add(`my_car_${user.id}.${tokenDB}`, amount);
//             db.subtract(`money_${user.id}.${tokenDB}.pocket`, amount * 3750);
//           }
//         } else if (fiftyPercentDiscount == false) {
//           if (money < amount * 7500) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of cars you wanna buy`
//             );
//           } else {
//             db.delete(`lastCarUser`);
//             db.add(`carPiecesInDiscord`, amount);
//             db.set(`lastCarUser`, `${user}`);
//             db.fetch(`my_car_${user.id}.${tokenDB}`);
//             db.add(`my_car_${user.id}.${tokenDB}`, amount);
//             db.subtract(`money_${user.id}.${tokenDB}.pocket`, amount * 7500);
//             const carEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} cars for ${
//                   amount * 7500
//                 }`
//               );
//             message.channel.send(carEmbed);
//           }
//         }
//       } else if (item == "mansion") {
//         if (fiftyPercentDiscount == true) {
//           if (money < amount * 60000) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               "Please enter the amount of mansions you want to buy"
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else {
//             const discountMansionEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} mansions for ~~${
//                   amount * 120000
//                 }~~ ${amount * 60000}`
//               );
//             message.channel.send(discountMansionEmbed);
//             db.delete(`lastMansionUser`);
//             db.add(`mansionPiecesInDiscord`, amount);
//             db.set(`lastMansionUser`, `${user}`);
//             db.fetch(`my_house_${user.id}.${tokenDB}`);
//             db.add(`my_house_${user.id}.${tokenDB}`, amount);
//             db.subtract(`money_${user.id}.${tokenDB}.pocket`, amount * 60000);
//           }
//         } else if (fiftyPercentDiscount == false) {
//           if (money < amount * 120000) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of mansions you wanna buy`
//             );
//           } else {
//             db.delete(`lastMansionUser`);
//             db.add(`mansionPiecesInDiscord`, amount);
//             db.set(`lastMansionUser`, `${user}`);
//             db.fetch(`new_house_${user.id}.${tokenDB}`);
//             db.add(`new_house_${user.id}.${tokenDB}`, amount);
//             db.subtract(`money_${user.id}.${tokenDB}.pocket`, amount * 120000);
//             const mansionEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} mansions for ${
//                   amount * 120000
//                 }`
//               );

//             message.channel.send(mansionEmbed);
//           }
//         }
//       }
//     }

//     if (item == "brencyTepta") {
//       if (fiftyPercentDiscount == true) {
//         if (money < amount * 2500000000) {
//           message.channel.send(
//             `${user} you don't have enough money to buy this item`
//           );
//           if (item == "mansion") {
//             if (money < amount * 120000) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of mansions you wanna buy`
//               );
//             } else {
//               db.fetch(`house_${user.id}.${tokenDB}`);
//               db.add(`house_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 120000
//               );
//               const mansionEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} mansions for ${
//                     amount * 120000
//                   }`
//                 );
//               message.channel.send(mansionEmbed);
//             }
//           }
//         }
//         if (item == "brencyTepta") {
//           if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of brencyTepta you wanna buy`
//             );
//           } else if (money < amount * 5000000000) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else {
//             db.fetch(`brency_tepta_${user.id}.${tokenDB}`);
//             db.add(`brency_tepta_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 5000000000
//             );
//             const brencyTeptaEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} brencyTeptas for ${
//                   amount * 5000000000
//                 }`
//               );
//           }
//           if (!amount) {
//             message.channel.send(
//               "Please enter the amount of brencyTepta you want to buy"
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else {
//             const discountBrencyEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} Brency Tepta's for ~~${
//                   amount * 5000000000
//                 }~~ ${amount * 2500000000}`
//               );
//             message.channel.send(discountBrencyEmbed);
//             db.delete(`lastBrencyTeptaUser`);
//             db.add(`brencyTeptaPiecesInDiscord`, amount);
//             db.set(`lastBrencyTeptaUser`, `${user}`);
//             db.fetch(`brency_tepta_${user.id}.${tokenDB}`);
//             db.add(`brency_tepta_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 2500000000
//             );
//           }
//         } else if (fiftyPercentDiscount == false) {
//           if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of brencyTepta you wanna buy`
//             );
//           } else if (money < amount * 5000000000) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else {
//             db.delete(`lastBrencyTeptaUser`);
//             db.add(`brencyTeptaPiecesInDiscord`, amount);
//             db.set(`lastBrencyTeptaUser`, `${user}`);
//             db.fetch(`brency_tepta_${user.id}.${tokenDB}`);
//             db.add(`brency_tepta_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 5000000000
//             );
//             const brencyTeptaEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} Brency Tepta's for ${
//                   amount * 5000000000
//                 }`
//               );
//             message.channel.send(brencyTeptaEmbed);
//           }
//         }
//       }
//     } else if (item == "goldCoin") {
//       if (fiftyPercentDiscount == true) {
//         if (money < amount * 12500000) {
//           message.channel.send(
//             `${user} you don't have enough money to buy this item`
//           );
//           if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (money < amount * 25000000) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of goldCoin you wanna buy`
//             );
//           } else {
//             db.fetch(`goldCoin_${user.id}.${tokenDB}`);
//             db.add(`goldCoin_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 25000000
//             );
//             const goldCoinEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} goldCoins for ${
//                   amount * 25000000
//                 }`
//               );
//           }
//           if (!amount) {
//             message.channel.send(
//               "Please enter the amount of Gold Coins you want to buy"
//             );
//           } else if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//           } else {
//             const discountGoldCoinEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} Gold coins for ~~${
//                   amount * 25000000
//                 }~~ ${amount * 12500000}`
//               );
//             message.channel.send(discountGoldCoinEmbed);
//             db.delete(`lastGoldCoinUser`);
//             db.add(`brencyTeptaPiecesInDiscord`, amount);
//             db.set(`lastGoldCoinUserInDiscord`, `${user}`);
//             db.fetch(`gold_coin_${user.id}.${tokenDB}`);
//             db.add(`gold_coin_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 12500000
//             );
//           }
//         } else if (fiftyPercentDiscount == false) {
//           if (amount > money) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase this item`
//             );
//           } else if (money < amount * 25000000) {
//             message.channel.send(
//               `${user} you don't have enough money to purchase ${amount} ${item}`
//             );
//           } else if (!amount) {
//             message.channel.send(
//               `Please enter the amount of goldCoin you wanna buy`
//             );
//           } else {
//             db.delete(`lastGoldCoinUser`);
//             db.add(`goldCoinPiecesInDiscord`, amount);
//             db.set(`lastGoldCoinUser`, `${user}`);
//             db.fetch(`gold_coin_${user.id}.${tokenDB}`);
//             db.add(`gold_coin_${user.id}.${tokenDB}`, amount);
//             db.subtract(
//               `money_${user.id}.${tokenDB}.pocket`,
//               amount * 25000000
//             );
//             const goldCoinEmbed = new Discord.MessageEmbed()
//               .setColor("#00FFFF")
//               .setDescription(
//                 `You have successfully purchased ${amount} goldCoins for ${
//                   amount * 25000000
//                 }`
//               );
//             message.channel.send(goldCoinEmbed);
//           }
//         }
//       } else if (item == "chepCrown") {
//         if (fiftyPercentDiscount == true) {
//           if (money < amount * 125000000) {
//             message.channel.send(
//               `${user} you don't have enough money to buy this item`
//             );
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (money < amount * 250000000) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of chepCrown you wanna buy`
//               );
//             } else {
//               db.fetch(`chep_crown_${user.id}.${tokenDB}`);
//               db.add(`chep_crown_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 250000000
//               );
//               const chepCrownEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} chepCrowns for ${
//                     amount * 250000000
//                   }`
//                 );
//             }
//             if (!amount) {
//               message.channel.send(
//                 "Please enter the amount of Chep crown's you want to buy"
//               );
//             } else if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to buy this item`
//               );
//             } else {
//               const discountBrencyEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} Chep crown's for ~~${
//                     amount * 250000000
//                   }~~ ${amount * 125000000}`
//                 );
//               message.channel.send(discountBrencyEmbed);
//               db.delete(`lastChepCrownUser`);
//               db.add(`chepCrownPiecesInDiscord`, amount);
//               db.set(`lastChepCrownUserInDiscord`, `${user}`);
//               db.fetch(`gold_coin_${user.id}.${tokenDB}`);
//               db.add(`gold_coin_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 125000000
//               );
//             }
//           } else if (fiftyPercentDiscount == false) {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (money < amount * 250000000) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of chepCrown you wanna buy`
//               );
//             } else {
//               db.delete(`lastChepCrownUser`);
//               db.add(`chepCrownPiecesInDiscord`, amount);
//               db.set(`lastChepCrownUser`, `${user}`);
//               db.fetch(`chep_crown_${user.id}.${tokenDB}`);
//               db.add(`chep_crown_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 250000000
//               );
//               const chepCrownEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} chepCrowns for ${
//                     amount * 250000000
//                   }`
//                 );
//               message.channel.send(chepCrownEmbed);
//             }
//           }
//         } else if (item == "chepStatue") {
//           if (fiftyPercentDiscount == true) {
//             if (money < amount * 750000) {
//               message.channel.send(
//                 `${user} you don't have enough money to buy this item`
//               );
//               if (amount > money) {
//                 message.channel.send(
//                   `${user} you don't have enough money to purchase this item`
//                 );
//               } else if (!amount) {
//                 message.channel.send(
//                   `Please enter the amount of chepStatue you wanna buy`
//                 );
//               } else if (money < amount * 7500) {
//                 message.channel.send(
//                   `${user} you don't have enough money to purchase ${amount} ${item}`
//                 );
//               } else {
//                 db.fetch(`chepStatue_${user.id}.${tokenDB}`);
//                 db.add(`chepStatue_${user.id}.${tokenDB}`, amount);
//                 db.subtract(
//                   `money_${user.id}.${tokenDB}.pocket`,
//                   amount * 500000
//                 );
//                 const chepStatueEmbed = new Discord.MessageEmbed()
//                   .setColor("#00FFFF")
//                   .setDescription(
//                     `You have successfully purchased ${amount} chepStatues for ${
//                       amount * 500000
//                     }`
//                   );
//               }
//               if (!amount) {
//                 message.channel.send(
//                   "Please enter the amount of Chep statue's you want to buy"
//                 );
//               } else if (amount > money) {
//                 message.channel.send(
//                   `${user} you don't have enough money to buy this item`
//                 );
//               } else {
//                 const discountBrencyEmbed = new Discord.MessageEmbed()
//                   .setColor("#00FFFF")
//                   .setDescription(
//                     `You have successfully purchased ${amount} Chep statue's for ~~${
//                       amount * 1500000
//                     }~~ ${amount * 750000}`
//                   );
//                 message.channel.send(discountBrencyEmbed);
//                 db.delete(`lastChepStatueUser`);
//                 db.add(`chepStatuePiecesInDiscord`, amount);
//                 db.set(`lastChepStatueUserInDiscord`, `${user}`);
//                 db.fetch(`chep_statue_${user.id}.${tokenDB}`);
//                 db.add(`chep_statue_${user.id}.${tokenDB}`, amount);
//                 db.subtract(
//                   `money_${user.id}.${tokenDB}.pocket`,
//                   amount * 750000
//                 );
//               }
//             } else if (fiftyPercentDiscount == false) {
//               if (amount > money) {
//                 message.channel.send(
//                   `${user} you don't have enough money to purchase this item`
//                 );
//               } else if (!amount) {
//                 message.channel.send(
//                   `Please enter the amount of chepStatue you wanna buy`
//                 );
//               } else if (money < amount * 1500000) {
//                 message.channel.send(
//                   `${user} you don't have enough money to purchase ${amount} ${item}`
//                 );
//               } else {
//                 db.delete(`lastChepStatueUser`);
//                 db.add(`chepStatuePiecesInDiscord`, amount);
//                 db.set(`lastChepStatueUser`, `${user}`);
//                 db.fetch(`chep_statue_${user.id}.${tokenDB}`);
//                 db.add(`chep_statue_${user.id}.${tokenDB}`, amount);
//                 db.subtract(
//                   `money_${user.id}.${tokenDB}.pocket`,
//                   amount * 1500000
//                 );
//                 const chepStatueEmbed = new Discord.MessageEmbed()
//                   .setColor("#00FFFF")
//                   .setDescription(
//                     `You have successfully purchased ${amount} chepStatues for ${
//                       amount * 1500000
//                     }`
//                   );
//                 message.channel.send(chepStatueEmbed);
//               }
//             }
//           } else if (item == "chepMedal") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of chepMedal you wanna buy`
//               );
//             } else if (money < amount * 7500) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else {
//               db.fetch(`chep_medal_${user.id}.${tokenDB}`);
//               db.add(`chep_medal_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 15000000
//               );
//               const chepMedalEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} chepMedals for ${
//                     amount * 15000000
//                   }`
//                 );
//               message.channel.send(chepMedalEmbed);
//             }
//           } else if (item == "chepTrophy") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of chepTrophy's you wanna buy`
//               );
//             } else if (money < amount * 50000000) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else {
//               db.fetch(`chepTrophy_${user.id}.${tokenDB}`);
//               db.add(`chepTrophy_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 50000000
//               );
//               const chepTrophyEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} chepTrophy's for ${
//                     amount * 50000000
//                   }`
//                 );
//               message.channel.send(chepTrophyEmbed);
//             }
//           } else if (item == "fluffyTemcha") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of fluffyTemcha's you wanna buy`
//               );
//             } else if (money < amount * 7500) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase ${amount} ${item}`
//               );
//             } else {
//               db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//               db.add(`fluffyTemcha_${user.id}.${tokenDB}`, amount);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 500000000
//               );
//               const fluffyTemchaEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} fluffyTemcha's for ${
//                     amount * 500000000
//                   }`
//                 );
//               message.channel.send(fluffyTemchaEmbed);
//             }
//           } else if (item == "volta") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of volta's you wanna buy`
//               );
//             } else {
//               db.fetch(`voltaPurchase_${user.id}.${tokenDB}`);
//               db.add(`voltaPurchase_${user.id}.${tokenDB}`, amount);
//               db.set(`voltaProtection_${user.id}.${tokenDB}`, true);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 1000000000
//               );
//               const voltaEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} volta's for ${
//                     amount * 1000000000
//                   }`
//                 );
//               message.channel.send(voltaEmbed);
//             }
//           } else if (item == "petrolar") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of Petrolar's you wanna buy`
//               );
//             } else {
//               db.delete(`lastPetrolarUser`);
//               db.fetch(`petrolar_${user.id}.${tokenDB}`);
//               db.add(`petrolar_${user.id}.${tokenDB}`, amount);
//               db.add(`piecesInDiscord`, amount);
//               db.set(`lastPetrolarPieceInDiscord`, `${user}`);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 500000
//               );
//               const petrolarEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} Petrolar's for ${
//                     amount * 500000
//                   }`
//                 );
//               message.channel.send(petrolarEmbed);
//             }
//           } else if (item == "texarus") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of texarus's you wanna buy`
//               );
//             } else {
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 50000000
//               );
//               db.delete(`lastTexarusUser`);
//               db.fetch(`texarus_${user.id}.${tokenDB}`);
//               db.add(`texarus_${user.id}.${tokenDB}`, amount);
//               db.add(`texarusPiecesInDiscord`, amount);
//               db.set(`lastTexarusUserInDiscord`, `${user}`);
//               db.set(`texarusPower`, 5000);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 50000000
//               );
//               const texarusEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} Texarus the demonished for ${
//                     amount * 50000000
//                   }`
//                 );
//               message.channel.send(texarusEmbed);
//             }
//           } else if (item == "waetra") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of texarus's you wanna buy`
//               );
//             } else {
//               db.delete(`lastWaetraUser`);
//               db.fetch(`waetra_${user.id}.${tokenDB}`);
//               db.add(`waetra_${user.id}.${tokenDB}`, amount);
//               db.add(`waetraPiecesInDiscord`, amount);
//               db.set(`lastWaetrUserInDiscord`, `${user}`);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 350000000
//               );
//               const waetraEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} Waetra the freezed for ${
//                     amount * 350000000
//                   }`
//                 );
//               message.channel.send(waetraEmbed);
//             }
//           } else if (item == "rasheta") {
//             if (amount > money) {
//               message.channel.send(
//                 `${user} you don't have enough money to purchase this item`
//               );
//             } else if (!amount) {
//               message.channel.send(
//                 `Please enter the amount of texarus's you wanna buy`
//               );
//             } else {
//               db.delete(`lastRashetaUser`);
//               db.fetch(`rasheta_${user.id}.${tokenDB}`);
//               db.add(`rasheta_${user.id}.${tokenDB}`, amount);
//               db.add(`rashetaPiecesInDiscord`, amount);
//               db.set(`lastRashetaUserInDiscord`, `${user}`);
//               db.subtract(
//                 `money_${user.id}.${tokenDB}.pocket`,
//                 amount * 800000000
//               );
//               const rashetaEmbed = new Discord.MessageEmbed()
//                 .setColor("#00FFFF")
//                 .setDescription(
//                   `You have successfully purchased ${amount} Rasheta the Furious for ${
//                     amount * 800000000
//                   }`
//                 );
//               message.channel.send(rashetaEmbed);
//             }
//           }
//         }
//       }
//     }
//   },
// };
