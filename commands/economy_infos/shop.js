// const Discord = require("discord.js");
// const MessageEmbed = require("discord.js");
// const db = require("quick.db");
// module.exports = {
//   name: "shop",
//   aliases: ["market"],
//   description: "To get bot news",
//   usage: "news",
//   run: async (client, message, args) => {
//     const tokenDB = db.fetch(`${message.author.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${message.author} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       if (!args[0]) {
//         message.channel.send(
//           "Please mention an item , example : Oyo shop chepMedal"
//         );
//       }
//       let user =
//         message.mentions.users.first() ||
//         client.users.cache.get(args[0]) ||
//         message.author;
//       if (args[0] == "car") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let newcar = await db.fetch(`car_${user.id}`);
//         if (newcar === null) newcar = 0;
//         // add comma to newcar amount

//         const carEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(` Car owned (${newcar})`)
//           .addField("A car")
//           .setColor("RED")
//           .setDescription(`Value : 1,750 `)
//           .setFooter(`Total owned cars value : ${newcar * 1750}`);
//         message.channel.send(carEmbed);
//       }
//       if (args[0] == "mansion") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let mansion = await db.fetch(`house_${user.id}`);
//         if (mansion === null) mansion = 0;
//         // add comma to newcar amount

//         const mansionEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(` Mansion's owned (${mansion})`)
//           .addField("A mansion made of bricks")
//           .setColor("RED")
//           .setDescription(`Value : 120,000 `)
//           .setFooter(`Total owned mansion's value : ${mansion * 120000}`);
//         message.channel.send(mansionEmbed);
//       }

//       if (args[0] == "brencyTepta") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let BrencyTepta = await db.fetch(`brency tepta_${user.id}`);
//         if (BrencyTepta === null) BrencyTepta = 0;
//         // add comma to newcar amount

//         const BrencyTeptaEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(` BrencyTepta's owned (${BrencyTepta})`)
//           .addField("Made of 30k Oyo stones")
//           .setColor("RED")
//           .setDescription(`Value : 5,000,000,000 `)
//           .setFooter(
//             `Total owned BrencyTepta's value : ${BrencyTepta * 5000000000}`
//           );
//         message.channel.send(BrencyTeptaEmbed);
//       }

//       if (args[0] == "goldCoin") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         const carEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`Car (${newcar}) owned`)
//           .setDescription(`A super automatic car`)
//           .addField("Value", "``7,500``")
//           .addField("ID", "``car``")
//           .addField("Rarity", "``Rare``")
//           .addField("Pieces on Oyo economy", "``" + carQuantity + "``")
//           .setColor("#FF160C")
//           .addField("Last user to buy", "" + lastCarUser + "")
//           .setThumbnail("https://i.ibb.co/tpTGCQT/car.png")
//           .addField("Total Owned Value", "``" + newcar * 7500 + " oyons``");
//         message.channel.send(carEmbed);
//       }
//       if (args[0] == "mansion") {
//         money = await db.fetch(`money_${user.id}.pocket`);
//         let goldCoin = await db.fetch(`goldCoin_${user.id}`);
//         if (goldCoin === null) goldCoin = 0;
//         // add comma to newcar amount

//         const goldCoinEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(` goldCoin's owned (${goldCoin})`)
//           .addField("Made of 1k carat gold")
//           .setColor("RED")
//           .setDescription(`Value : 50,000,000 `)
//           .setFooter(`Total owned goldCoin's value : ${goldCoin * 50000000}`);
//         message.channel.send(goldCoinEmbed);
//       }

//       if (args[0] == "chepCrown") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let chepCrown = await db.fetch(`chepCrown_${user.id}`);
//         if (chepCrown === null) chepCrown = 0;
//         // add comma to newcar amount

//         let BrencyTepta = await db.fetch(`brency_tepta_${user.id}.${tokenDB}`);
//         if (BrencyTepta === null) BrencyTepta = 0;
//         let brencyTeptaQuantity = db.get(`brencyTeptaPiecesInDiscord`);
//         let lastBrencyTeptaUser = db.get(`lastBrencyTeptaUser`);
//         if (lastBrencyTeptaUser === null) lastBrencyTeptaUser = "None";
//         if (brencyTeptaQuantity === null) brencyTeptaQuantity = 0;
//         // add comma to newcar amount
//         const chepCrownEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(` chepCrown's owned (${chepCrown})`)
//           .addField("Made of gold coins")
//           .setColor("RED")
//           .setDescription(`Value : 250,000,000 `)
//           .setFooter(
//             `Total owned chepCrown's value : ${chepCrown * 250000000}`
//           );
//         message.channel.send(chepCrownEmbed);
//       }

//       if (args[0] == "chepStatue") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let chepStatue = await db.fetch(`chepStatue_${user.id}`);
//         if (chepStatue === null) chepStatue = 0;
//         // add comma to newcar amount

//         let goldCoin = await db.fetch(`gold_coin_${user.id}.${tokenDB}`);
//         if (goldCoin === null) goldCoin = 0;
//         let goldCoinQuantity = db.get(`goldCoinPiecesInDiscord`);
//         let lastGoldCoinUser = db.get(`lastGoldCoinUser`);
//         if (lastGoldCoinUser === null) lastGoldCoinUser = "None";
//         if (goldCoinQuantity === null) goldCoinQuantity = 0;
//         // add comma to newcar amount
//         const chepStatueEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`chepStatue's owned (${chepStatue})`)
//           .addField("Made of 100 carat gold")
//           .setColor("RED")
//           .setDescription(`Value : 1,000,000 `)
//           .setFooter(
//             `Total owned chepStatue's value : ${chepStatue * 1000000}`
//           );
//         message.channel.send(chepStatueEmbed);
//       }

//       if (args[0] == "chepMedal") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let chepMedal = await db.fetch(`chepMedal_${user.id}`);
//         if (chepMedal === null) chepMedal = 0;
//         // add comma to newcar amount

//         const chepMedalEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`chepMedal's owned (${chepMedal})`)
//           .addField("A bright and shiny medal")
//           .setColor("RED")
//           .setDescription(`Value : 15,000,000 `)
//           .setFooter(`Total owned chepMedal's value : ${chepMedal * 15000000}`);
//         message.channel.send(chepMedalEmbed);
//       }

//       if (args[0] == "chepTrophy") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let chepTrophy = await db.fetch(`chepTrophy_${user.id}`);
//         if (chepTrophy === null) chepTrophy = 0;
//         // add comma to newcar amount

//         const chepTrophyEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`chepTrophy's owned (${chepTrophy})`)
//           .addField("A winner's trophy")
//           .setColor("RED")
//           .setDescription(`Value : 50,000,000 `)
//           .setFooter(
//             `Total owned chepTrophy's value : ${chepTrophy * 50000000}`
//           );
//         message.channel.send(chepTrophyEmbed);
//       }

//       if (args[0] == "fluffyTemcha") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let fluffyTemcha = await db.fetch(`fluffyTemcha_${user.id}`);
//         if (fluffyTemcha === null) fluffyTemcha = 0;
//         // add comma to newcar amount

//         let chepMedal = await db.fetch(`chep_medal_${user.id}.${tokenDB}`);
//         if (chepMedal === null) chepMedal = 0;
//         let chepMedalQuantity = db.get(`chepMedalPiecesInDiscord`);
//         let lastChepMedalUser = db.get(`lastChepMedalUser`);
//         if (lastChepMedalUser === null) lastChepMedalUser = "None";
//         if (chepMedalQuantity === null) chepMedalQuantity = 0;
//         // add comma to newcar amount
//         const fluffyTemchaEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`fluffyTemcha's owned (${fluffyTemcha})`)
//           .addField("Made of 50k bags of Oyo cotton")
//           .setColor("RED")
//           .setDescription(`Value : 500,000,000 `)
//           .setFooter(
//             `Total owned fluffyTemcha's value : ${fluffyTemcha * 500000000}`
//           );
//         message.channel.send(fluffyTemchaEmbed);
//       }

//       if (args[0] == "volta") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let volta = await db.fetch(`volta_${user.id}`);
//         if (volta === null) volta = 0;
//         // add comma to newcar amount

//         let chepTrophy = await db.fetch(`chep_trophy_${user.id}.${tokenDB}`);
//         if (chepTrophy === null) chepTrophy = 0;
//         let chepTrophyQuantity = db.get(`ChepTrophyPiecesInDiscord`);
//         let lastChepTrophyUser = db.get(`lastChepTrophyUser`);
//         if (lastChepTrophyUser === null) lastChepTrophyUser = "None";
//         if (chepTrophyQuantity === null) chepTrophyQuantity = 0;
//         // add comma to newcar amount

//         const chepTrophyEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`Chep Trophy (${chepTrophy}) owned`)
//           .setDescription(`A winner's trophy`)
//           .setThumbnail("https://i.ibb.co/tD96Cts/fluffy-temcha.png")
//           .addField("Value", "``50,000,000``")
//           .addField("ID", "``chepTrophy``")
//           .addField("Rarity", "``Collectable``")
//           .addField("Pieces on Oyo economy", "``" + chepTrophyQuantity + "``")
//           .setColor("#FFDB51")
//           .addField("Last user to buy", "" + lastChepTrophyUser + "")
//           .setThumbnail("https://i.ibb.co/tsRL1dV/chep-trophy.png")
//           .addField(
//             "Total Owned Value",
//             "``" + chepTrophy * 50000000 + " oyons``"
//           );
//         message.channel.send(chepTrophyEmbed);
//       }

//       if (args[0] == "fluffyTemcha") {
//         money = await db.fetch(`money_${user.id}.pocket`);

//         let fluffyTemcha = await db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//         if (fluffyTemcha === null) fluffyTemcha = 0;
//         let fluffy_temcha_quantity = db.get(`FluffypiecesInDiscord`);
//         let lastFluffyTemchaUser = db.get(`lastFluffyTemchaUser`);
//         if (lastFluffyTemchaUser === null) lastFluffyTemchaUser = "None";
//         if (fluffy_temcha_quantity === null) fluffy_temcha_quantity = 0;
//         // add comma to newcar amount

//         const fluffyTemchaEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`Fluffy Temcha (${fluffyTemcha}) owned`)
//           .setDescription(`Made of 50k Bags of Oyo cotton `)
//           .setThumbnail("https://i.ibb.co/tD96Cts/fluffy-temcha.png")
//           .addField("Value", "``500,000,000``")
//           .addField("ID", "``fluffyTemcha``")
//           .addField("Rarity", "``Legendary``")
//           .addField(
//             "Pieces on Oyo economy",
//             "``" + fluffy_temcha_quantity + "``"
//           )
//           .setColor("#39FF14")
//           .addField("Last user to buy", "" + lastFluffyTemchaUser + "")
//           .addField(
//             "Total Owned Value",
//             "``" + fluffyTemcha * 500000000 + " oyons``"
//           );
//         message.channel.send(fluffyTemchaEmbed);
//       }

//       if (args[0] == "volta") {
//         money = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//         let voltaQuantity = db.get(`piecesInDiscord`);
//         let lastVoltaUser = db.get(`lastVoltaUser`);
//         if (lastVoltaUser === null) lastVoltaUser = "None";
//         if (voltaQuantity === null) voltaQuantity = 0;
//         let volta = await db.fetch(`voltaPurchase_${user.id}.${tokenDB}`);
//         if (volta === null) volta = 0;
//         // add comma to newcar amount

//         const voltaEmbed = new Discord.MessageEmbed()
//           // set embed title to owned cars number
//           .setTitle(`Volta (${volta}) owned`)
//           .setDescription(`Made of Oyo lightning `)
//           .addField("Value", "``1,000,000,000``")
//           .addField("ID", "``volta``")
//           .addField("Rarity", "``Legendary``")
//           .addField("Pieces on Oyo economy", "``" + voltaQuantity + "``")
//           .addField("Last user to buy", "" + lastVoltaUser + "")
//           .setThumbnail("https://i.ibb.co/qrK81x3/volta.png")
//           .setColor("#AAFF00")
//           .addField(
//             "Total Owned Value",
//             "``" + volta * 1000000000 + " oyons``"
//           );

//         message.channel.send(voltaEmbed);
//       }
//       const voltaEmbed = new Discord.MessageEmbed()
//         // set embed title to owned cars number
//         .setTitle(`volta's owned (${volta})`)
//         .addField("Made of Lightning ⚡")
//         .setColor("RED")
//         .setDescription(`Value : 1,000,000,000 `)
//         .setFooter(`Total owned volta's value : ${volta * 1000000000}`);
//       message.channel.send(voltaEmbed);
//     }
//   },
// };
