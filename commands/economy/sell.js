// const Discord = require("discord.js");
// const db = require("quick.db");
// module.exports = {
//   name: "sell",
//   aliases: ["sell", "sellItem"],
//   description: "To see sell",
//   usage: "sell",
//   category: "Economy",
//   run: async (client, message, args) => {
//     if (!args[0]) {
//       message.channel.send(
//         "Please specify the number of the item you want to sell"
//       );
//     } else if (!args[1]) {
//       message.channel.send("Please specify the item you want to sell");
//     }
//     const amount = args[0];
//     const item = args[1];
//     const user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       if (item === "brencyTepta") {
//         const brencyTepta = db.fetch(`brency tepta_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (brencyTepta === null) {
//           return message.channel.send(
//             "You don't have any brency tepta to sell"
//           );
//           // if user has less than the number they want to sell
//         } else if (brencyTepta < amount) {
//           return message.channel.send(
//             "You don't have enough brency tepta to sell"
//           );
//         } else {
//           const brencyEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " brency tepta")
//             .setDescription(
//               `You succesfully sold ${amount} brency tepta for ${
//                 amount * 2500000000
//               }`
//             );
//           db.subtract(`brency tepta_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 2500000000);
//           message.channel.send(brencyEmbed);
//         }
//       }
//       if (item === "car") {
//         const car = db.fetch(`car_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (car === null) {
//           return message.channel.send("You don't have any car to sell");
//           // if user has less than the number they want to sell
//         } else if (car < amount) {
//           return message.channel.send("You don't have enough car to sell");
//         } else {
//           const carEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " car")
//             .setDescription(
//               `You succesfully sold ${amount} car for ${amount * 3750}`
//             );
//           db.subtract(`car_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 3750);
//           message.channel.send(carEmbed);
//         }
//       }

//       if (item === "mansion") {
//         const Mansion = db.fetch(`house_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (Mansion === null) {
//           return message.channel.send("You don't have any Mansion to sell");
//           // if user has less than the number they want to sell
//         } else if (Mansion < amount) {
//           return message.channel.send("You don't have enough Mansion to sell");
//         } else {
//           const MansionEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " Mansion")
//             .setDescription(
//               `You succesfully sold ${amount} Mansion for ${amount * 60000}`
//             );
//           db.subtract(`house_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 60000);
//           message.channel.send(MansionEmbed);
//         }
//       }
//       if (item === "goldCoin") {
//         const goldCoin = db.fetch(`goldCoin_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (goldCoin === null) {
//           return message.channel.send("You don't have any goldCoin to sell");
//           // if user has less than the number they want to sell
//         } else if (goldCoin < amount) {
//           return message.channel.send("You don't have enough goldCoin to sell");
//         } else {
//           const goldCoinEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " goldCoin")
//             .setDescription(
//               `You succesfully sold ${amount} goldCoin for ${amount * 25000000}`
//             );
//           db.subtract(`goldCoin_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 25000000);
//           message.channel.send(goldCoinEmbed);
//         }
//       }
//       if (item === "chepCrown") {
//         const chepCrown = db.fetch(`chep_crown${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (chepCrown === null) {
//           return message.channel.send("You don't have any chepCrown to sell");
//           // if user has less than the number they want to sell
//         } else if (chepCrown < amount) {
//           return message.channel.send(
//             "You don't have enough chepCrown to sell"
//           );
//         } else {
//           const chepCrownEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " chepCrown")
//             .setDescription(
//               `You succesfully sold ${amount} chepCrown for ${
//                 amount * 250000000
//               }`
//             );
//           db.subtract(`chep_crown${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 250000000);
//           message.channel.send(chepCrownEmbed);
//         }
//       }

//       if (item === "chepStatue") {
//         const chepStatue = db.fetch(`chepStatue_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (chepStatue === null) {
//           return message.channel.send("You don't have any chepStatue to sell");
//           // if user has less than the number they want to sell
//         } else if (chepStatue < amount) {
//           return message.channel.send(
//             "You don't have enough chepStatue to sell"
//           );
//         } else {
//           const chepStatueEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " chepStatue")
//             .setDescription(
//               `You succesfully sold ${amount} chepStatue for ${amount * 250000}`
//             );
//           db.subtract(`chepStatue_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 250000);
//           message.channel.send(chepStatueEmbed);
//         }
//       }

//       if (item === "chepMedal") {
//         const chepMedal = db.fetch(`chepMedal_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (chepMedal === null) {
//           return message.channel.send("You don't have any chepMedal to sell");
//           // if user has less than the number they want to sell
//         } else if (chepMedal < amount) {
//           return message.channel.send(
//             "You don't have enough chepMedal to sell"
//           );
//         } else {
//           const chepMedalEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " chepMedal")
//             .setDescription(
//               `You succesfully sold ${amount} chepMedal for ${amount * 7500000}`
//             );
//           db.subtract(`chepMedal_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 7500000);
//           message.channel.send(chepMedalEmbed);
//         }
//       }

//       if (item === "chepTrophy") {
//         const chepTrophy = db.fetch(`chepTrophy_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (chepTrophy === null) {
//           return message.channel.send("You don't have any chepTrophy to sell");
//           // if user has less than the number they want to sell
//         } else if (chepTrophy < amount) {
//           return message.channel.send(
//             "You don't have enough chepTrophy to sell"
//           );
//         } else {
//           const chepTrophyEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " chepTrophy")
//             .setDescription(
//               `You succesfully sold ${amount} chepTrophy for ${
//                 amount * 25000000
//               }`
//             );
//           db.subtract(`chepTrophy_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 25000000);
//           message.channel.send(chepTrophyEmbed);
//         }
//       }

//       if (item === "fluffyTemcha") {
//         const fluffyTemcha = db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (fluffyTemcha === null) {
//           return message.channel.send(
//             "You don't have any fluffyTemcha to sell"
//           );
//           // if user has less than the number they want to sell
//         } else if (fluffyTemcha < amount) {
//           return message.channel.send(
//             "You don't have enough fluffyTemcha to sell"
//           );
//         } else {
//           const fluffyTemchaEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " fluffyTemcha")
//             .setDescription(
//               `You succesfully sold ${amount} fluffyTemcha for ${
//                 amount * 250000000
//               }`
//             );
//           db.subtract(`fluffyTemcha_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 250000000);
//           message.channel.send(fluffyTemchaEmbed);
//         }
//       }

//       if (item === "petrolar") {
//         const petrolar = db.fetch(`petrolar_${user.id}.${tokenDB}`);

//         // if user doesn't have any brency tepta
//         if (petrolar === null) {
//           return message.channel.send("You don't have any petrolar to sell");
//           // if user has less than the number they want to sell
//         } else if (petrolar < amount) {
//           return message.channel.send("You don't have enough petrolar to sell");
//         } else {
//           const petrolarValue = // 100000 to 575000
//             Math.floor(Math.random() * (600000 - 100000 + 1)) + 100000;
//           db.get(`lastPetrolarUser`);
//           db.subtract(`petrolarPiecesInDiscord`, amount);

//           const petrolarEmbed = new Discord.MessageEmbed()
//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " petrolar")
//             .setDescription(
//               `You succesfully sold ${amount} petrolar for ${
//                 amount * petrolarValue
//               }
//                Sold price per each = ${petrolarValue}

//                 **You got a loss**
//                 `
//             );
//           // if petrolarValue is greater than 500000
//           if (petrolarValue > 500000) {
//             petrolarEmbed.setDescription(`You succesfully sold ${amount} petrolar for ${
//               amount * petrolarValue
//             }
//             Sold price per each = ${petrolarValue}

//             **You got a profit**
//             `);
//           }
//           db.subtract(`petrolar_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * petrolarValue);
//           message.channel.send(petrolarEmbed);
//         }
//       }

//       if (item === "volta") {
//         const volta = db.fetch(`volta_${user.id}.${tokenDB}`);
//         // if user doesn't have any brency tepta
//         if (volta === null) {
//           return message.channel.send("You don't have any volta to sell");
//           // if user has less than the number they want to sell
//         } else if (volta < amount) {
//           return message.channel.send("You don't have enough volta to sell");
//         } else {
//           const voltaEmbed = new Discord.MessageEmbed()

//             .setColor("#0099ff")
//             .setTitle("Sold " + amount + " volta")
//             .setDescription(
//               `You succesfully sold ${amount} volta for ${amount * 500000000}`
//             );
//           db.subtract(`voltaPurchase_${user.id}.${tokenDB}`, amount);
//           db.add(`money_${user.id}.${tokenDB}.pocket`, amount * 500000000);
//           message.channel.send(voltaEmbed);
//         }
//       }
//     }
//   },
// };
