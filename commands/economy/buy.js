// const Discord = require("discord.js");
// const db = require("quick.db");

// module.exports = {
//   name: "buy",
//   aliases: ["buy", "get"],
//   description: "To buy",
//   usage: "buy",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       let author = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

//       let Embed = new Discord.MessageEmbed()
//         .setColor("#FFFFFF")
//         .setDescription(
//           ` You need 2000 __**oyons**__ <:Oyon:949194574344114196> to purchase Bronze VIP`
//         );

//       switch (args[0]) {
//         case "premium":
//           if (author < 20000) return message.channel.send(Embed);

//           await db.fetch(`premium_${user.id}.${tokenDB}`);
//           await db.set(`premium_${user.id}.${tokenDB}`, true);

//           let Embed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` Purchased PREMIUM VIP For 50,00,00,000 __**oyons**__ <:Oyon:949194574344114196>`
//             );

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 500000000);
//           message.channel.send(Embed2);
//           break;

//         case "mobile":
//           let Embedn = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 3,500 __**oyons**__ <:Oyon:949194574344114196> to purchase a mobile`
//             );

//           if (author < 3500) return message.channel.send(Embedn);

//           await db.fetch(`mobile_${user.id}.${tokenDB}`);
//           await db.add(`mobile_${user.id}.${tokenDB}`, 1);

//           let Embed3 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` Purchased a mobile for 3,500 __**oyons**__ <:Oyon:949194574344114196>`
//             );

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 3500);
//           message.channel.send(Embed3);
//           break;

//         case "car":
//           let Embed4 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 7,000 __**oyons**__ <:Oyon:949194574344114196> to purchase a new car`
//             );

//           if (author < 7000) return message.channel.send(Embed4);

//           await db.fetch(`car_${user.id}.${tokenDB}`);
//           await db.add(`car_${user.id}.${tokenDB}`, 1);

//           let Embed5 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` Purchased a New Car For 7000 __**oyons**__ <:Oyon:949194574344114196>`
//             );

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 7000);
//           message.channel.send(Embed5);
//           break;

//         case "fish":
//         case "fishing":
//           let Embed6 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 1,250 __**oyons**__ <:Oyon:949194574344114196> to purchase a fishing rod`
//             );

//           if (author < 1250) return message.channel.send(Embed6);
//           let iffish = await db.get(`fish_${user.id}.${tokenDB}`);
//           if (iffish !== null) {
//             if (iffish.rod === 1)
//               return message.channel.send("You already have a fishing rod!");
//           }

//           //await db.fetch(`fish_${user.id}.${tokenDB}`)
//           await db.add(`fish_${user.id}.${tokenDB}.rod`, 1);
//           await db.set(`fish_${user.id}.${tokenDB}.fish`, []);

//           let Embed7 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` Purchased a Fishing rod For 25 __**oyons**__ <:Oyon:949194574344114196>`
//             );

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 1250);
//           message.channel.send(Embed7);
//           break;

//         case "mansion":
//           let Embed8 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 120,000 __**oyons**__ <:Oyon:949194574344114196> to purchase a Mansion`
//             );

//           if (author < 120000) return message.channel.send(Embed8);

//           await db.fetch(`house_${user.id}.${tokenDB}`);
//           await db.add(`house_${user.id}.${tokenDB}`, 1);

//           let Embed9 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` Purchased a Mansion For 120,000 __**oyons**__ <:Oyon:949194574344114196>`
//             );

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 120000);
//           message.channel.send(Embed9);
//           break;

//         case "brencyTepta":
//           let brencyEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 5,00,00,00,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the brency tepta`
//             );
//           let brencyEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a brency tepta for 5,00,00,00,000 __**oyons**__`
//             );

//           if (author < 5000000000) return message.channel.send(brencyEmbed);

//           await db.fetch(`brency tepta_${user.id}.${tokenDB}`);
//           await db.add(`brency tepta_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 5000000000);
//           message.channel.send(brencyEmbed2);
//           break;

//         case "goldCoin":
//           let goldCoinEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 50,00,00,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the gold coin`
//             );
//           let goldCoinEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a gold coin for 50,00,00,000 __**oyons**__`
//             );

//           if (author < 500000000) return message.channel.send(goldCoinEmbed);

//           await db.fetch(`goldCoin_${user.id}.${tokenDB}`);
//           await db.add(`goldCoin_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 500000000);
//           message.channel.send(goldCoinEmbed2);
//           break;

//         case "chepCrown":
//           let chepCrownEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 35,00,00,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the chep crown`
//             );
//           let chepCrownEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a Chep crown for 35,00,00,000 __**oyons**__`
//             );

//           if (author < 350000000) return message.channel.send(chepCrownEmbed);

//           await db.fetch(`chep_crown_${user.id}.${tokenDB}`);
//           await db.add(`chep_crown_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 350000000);
//           message.channel.send(chepCrownEmbed2);
//           break;

//         case "chepTrophy":
//           let chepTrophyEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 50,000,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the chep trophy`
//             );
//           let chepTrophyEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a chep trophy for 50,000,000 __**oyons**__`
//             );

//           if (author < 50000000) return message.channel.send(chepTrophyEmbed2);

//           await db.fetch(`chepTrophy_${user.id}.${tokenDB}`);
//           await db.add(`chepTrophy_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 1000000);
//           message.channel.send(chepTrophyEmbed);
//           break;

//         case "chepMedal":
//           let chepMedalEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 15,000,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the chep medal`
//             );
//           let chepMedalEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a chep medal for 15,000,000 __**oyons**__`
//             );

//           if (author < 15000000) return message.channel.send(chepMedalEmbed2);

//           await db.fetch(`chepMedal_${user.id}.${tokenDB}`);
//           await db.add(`chepMedal_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 15000000);
//           message.channel.send(chepMedalEmbed);
//           break;

//         case "fluffyTemcha":
//           let fluffyTemchaEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 500,000,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the fluffy temcha`
//             );
//           let fluffyTemchaEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a fluffy temcha for 500,000,000 __**oyons**__`
//             );

//           if (author < 500000000)
//             return message.channel.send(fluffyTemchaEmbed2);

//           await db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//           await db.add(`fluffyTemcha_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 500000000);
//           message.channel.send(fluffyTemchaEmbed);
//           break;

//         case "volta":
//           let voltaEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 1,000,000,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the volta`
//             );
//           let voltaEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               `Purchased a volta for 1,000,000,000 __**oyons**__`
//             );

//           if (author < 1000000000) return message.channel.send(voltaEmbed2);

//           await db.fetch(`voltaPurchase_${user.id}.${tokenDB}`);
//           await db.add(`voltaPurchase_${user.id}.${tokenDB}`, 1);
//           await db.set(`voltaProtection_${user.id}.${tokenDB}`, true);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 1000000000);
//           message.channel.send(voltaEmbed);
//           break;

//         case "chepStatue":
//           let chepStatueEmbed2 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(
//               ` You need 500,000 __**oyons**__ <:Oyon:949194574344114196> to purchase the chepStatue`
//             );
//           let chepStatueEmbed = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(`Purchased a chepStatue for 500,000 __**oyons**__`);

//           if (author < 500000) return message.channel.send(chepStatueEmbed2);

//           await db.fetch(`chepStatue_${user.id}.${tokenDB}`);
//           await db.add(`chepStatue_${user.id}.${tokenDB}`, 1);

//           await db.subtract(`money_${user.id}.${tokenDB}.pocket`, 500000);
//           message.channel.send(chepStatueEmbed);
//           break;

//         default:
//           let embed3 = new Discord.MessageEmbed()
//             .setColor("#FFFFFF")
//             .setDescription(" Enter an item to buy");
//           message.channel.send(embed3);
//           break;
//       }
//     }
//   },
// };
