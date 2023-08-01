// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
// const waetraDamage = require("../../weaponStats/waetraBow.json");
// const texarusDamage = require("../../weaponStats/texarusStaff.json");
// const natureDaggerss = require("../../weaponStats/natureDaggers.json");
// const ventorianBoww = require("../../weaponStats/ventorianBow.json");
// module.exports = {
//   name: "play",
//   aliases: ["Play", "PLAY", "pLaY", "PlAy"],
//   description: "To play the event",
//   usage: "play",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const eggHuntEvent = db.fetch(`eggHuntEventActive`);
//     if (eggHuntEvent == true) {
//       let user = message.author;
//       const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//       const banned = db.fetch(`banned_${user.id}.${tokenDB}`);
//       const banReason = db.fetch(`reasonForBan_${user.id}.${tokenDB}`);
//       const banDate = db.fetch(`banDate_${user.id}.${tokenDB}`);

//       if (!tokenDB) {
//         message.channel.send(
//           `${user} your Oyo token is not registered yet , type Oyo token me to set your Oyo token`
//         );
//       } else if (banned == true) {
//         const banEmbed = new Discord.MessageEmbed()
//           .setTitle(user)
//           .setDescription(`This account is banned`)
//           .addField("Reason", `${banReason}`)
//           .addField("Date", `${banDate}`)
//           .setColor("#FFFF00");
//         message.channel.send(banEmbed);
//       } else {
//         const texarus = db.fetch(`texarus_${user.id}.${tokenDB}`);
//         const natureDaggers = db.fetch(`natureDaggers_${user.id}.${tokenDB}`);
//         const natureDaggersEquipped = db.fetch(
//           `equippedNatureDaggers_${user.id}.${tokenDB}`
//         );
//         const ventorianBow = db.fetch(`ventorianBow_${user.id}.${tokenDB}`);
//         const ventorianBowEquipped = db.fetch(
//           `equippedVentorianBow_${user.id}.${tokenDB}`
//         );
//         const texarusEquipped = db.fetch(
//           `equippedTexarus_${user.id}.${tokenDB}`
//         );
//         const waetra = db.fetch(`waetra_${user.id}.${tokenDB}`);
//         const waetraEquipped = db.fetch(`equippedWaetra_${user.id}.${tokenDB}`);
//         const rasheta = db.fetch(`rasheta_${user.id}.${tokenDB}`);
//         const rashetaEquipped = db.fetch(
//           `equippedRasheta_${user.id}.${tokenDB}`
//         );
//         const lesforesha = "Lesforesha";
//         // const lesforeshaHealth = 50000;
//         // const lesforeshaHealth = db.set(`LesforehaDamage`, 100000);
//         const eggs = [
//           "Golden ventorian egg 2022",
//           "Green ventorian egg 2022",
//           "Red ventorian egg 2022",
//           "Blue ventorian egg 2022",
//           "Healar ventorian egg 2022",
//         ];
//         const randomEgg = eggs[Math.floor(Math.random() * eggs.length)];

//         if (args[0] === "hit") {
//           if (
//             texarusEquipped === "False" &&
//             waetraEquipped === "False" &&
//             rashetaEquipped === "False" &&
//             natureDaggersEquipped === "False" &&
//             ventorianBowEquipped === "False"
//           ) {
//             message.channel.send(`${user} you need to equip a weapon first`);
//           } else {
//             const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//             if (texarusEquipped === "True") {
//               if (lesforeshaHealth < 0) {
//                 const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you hit ${lesforesha}`)
//                   .addField(`Lesforesha Total Health`, `100000`)
//                   .addField(`Lesforesha current Health`, `0`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#DE1738");
//                 message.channel.send(lesforeshaEmbed2);
//               } else {
//                 const lesforeshaEmbed = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you hit ${lesforesha}`)
//                   .addField(
//                     `Lesforesha Total Health`,
//                     `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                   )
//                   .addField(`Lesforesha current Health`, `${lesforeshaHealth}`)
//                   .addField(`Your damage`, `${texarusDamage.Damage}`)
//                   .setColor("#DE1738");
//                 message.channel.send(lesforeshaEmbed);
//               }
//               db.subtract(`LesforehaHealth_${user.id}`, texarusDamage.Damage);

//               if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                 const lesforeshaDead = new Discord.MessageEmbed()
//                   .setTitle(`${lesforesha}`)
//                   .setDescription(`${user} you killed ${lesforesha}`)
//                   .setColor("#32CD32");
//                 message.channel.send(lesforeshaDead);
//                 db.set(`LesforehaHealth_${user.id}`, 100000);
//                 // drop 4 eggs
//                 const egg1 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg}`
//                 );

//                 if (randomEgg === "Golden ventorian egg 2022") {
//                   egg1.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg === "Healar ventorian egg 2022") {
//                   egg1.setColor("#E5E4E2");
//                   db.fetch(`oyonsVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`oyonsVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg === "Green ventorian egg 2022") {
//                   egg1.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg === "Red ventorian egg 2022") {
//                   egg1.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${user}.${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${user}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg === "Blue ventorian egg 2022") {
//                   egg1.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg1.setDescription(
//                     `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }

//                 message.channel.send(egg1);

//                 const randomEgg2 =
//                   eggs[Math.floor(Math.random() * eggs.length)];

//                 const egg2 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg2}`
//                 );

//                 if (randomEgg2 === "Golden ventorian egg 2022") {
//                   egg2.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg2 === "Healar ventorian egg 2022") {
//                   egg2.setColor("#E5E4E2");
//                   db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg2 === "Green ventorian egg 2022") {
//                   egg2.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg2 === "Red ventorian egg 2022") {
//                   egg2.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg2 === "Blue ventorian egg 2022") {
//                   egg2.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg2.setDescription(
//                     `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }
//                 message.channel.send(egg2);

//                 const randomEgg3 =
//                   eggs[Math.floor(Math.random() * eggs.length)];

//                 const egg3 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg3}`
//                 );
//                 if (randomEgg3 === "Golden ventorian egg 2022") {
//                   egg3.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg3 === "Healar ventorian egg 2022") {
//                   egg3.setColor("#E5E4E2");
//                   db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg3 === "Green ventorian egg 2022") {
//                   egg3.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg3 === "Red ventorian egg 2022") {
//                   egg3.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg3 === "Blue ventorian egg 2022") {
//                   egg3.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg3.setDescription(
//                     `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }
//                 message.channel.send(egg3);

//                 const randomEgg4 =
//                   eggs[Math.floor(Math.random() * eggs.length)];
//                 const egg4 = new Discord.MessageEmbed().setDescription(
//                   `${user} received : ${randomEgg4}`
//                 );

//                 if (randomEgg4 === "Golden ventorian egg 2022") {
//                   egg4.setColor("#FFD700");
//                   db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                   );
//                 }
//                 if (randomEgg4 === "Healar ventorian egg 2022") {
//                   egg4.setColor("#E5E4E2");
//                   db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                   );
//                 }
//                 if (randomEgg4 === "Green ventorian egg 2022") {
//                   egg4.setColor("#32CD32");
//                   db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                   );
//                 }
//                 if (randomEgg4 === "Red ventorian egg 2022") {
//                   egg4.setColor("#DE1738");
//                   db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                   );
//                 }
//                 if (randomEgg4 === "Blue ventorian egg 2022") {
//                   egg4.setColor("#0000ff");
//                   db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                   db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                   egg4.setDescription(
//                     `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                   );
//                 }

//                 message.channel.send(egg4);
//               }
//             } else if (waetraEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (waetraEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${waetraDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${waetraDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 // the lesforeshaEmbed is send save in db
//                 db.subtract(`LesforehaHealth_${user.id}`, waetraDamage.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Healar ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Healar ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Healar ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Healar ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (natureDaggersEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (natureDaggersEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${natureDaggerss.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(
//                   `LesforehaHealth_${user.id}`,
//                   natureDaggerss.Damage
//                 );

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Healar ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Healar ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Healar ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Healar ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (ventorianBowEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (ventorianBowEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${ventorianBoww.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(`LesforehaHealth_${user.id}`, ventorianBoww.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Healar ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Healar ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Healar ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Healar ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             } else if (rashetaEquipped === "True") {
//               const lesforeshaHealth = db.fetch(`LesforehaHealth_${user.id}`);
//               if (rashetaEquipped === "True") {
//                 if (lesforeshaHealth < 0) {
//                   const lesforeshaEmbed2 = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(`Lesforesha Total Health`, `100000`)
//                     .addField(`Lesforesha current Health`, `0`)
//                     .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed2);
//                 } else {
//                   const lesforeshaEmbed = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you hit ${lesforesha}`)
//                     .addField(
//                       `Lesforesha Total Health`,
//                       `${db.set(`lesforeshaHealth_${user.id}`, 100000)}`
//                     )
//                     .addField(
//                       `Lesforesha current Health`,
//                       `${lesforeshaHealth}`
//                     )
//                     .addField(`Your damage`, `${rashetaDamage.Damage}`)
//                     .setColor("#DE1738");
//                   message.channel.send(lesforeshaEmbed);
//                 }
//                 db.subtract(`LesforehaHealth_${user.id}`, rashetaDamage.Damage);

//                 if (lesforeshaHealth == 0 || lesforeshaHealth < 0) {
//                   const lesforeshaDead = new Discord.MessageEmbed()
//                     .setTitle(`${lesforesha}`)
//                     .setDescription(`${user} you killed ${lesforesha}`)
//                     .setColor("#32CD32");
//                   message.channel.send(lesforeshaDead);
//                   db.set(`LesforehaHealth_${user.id}`, 100000);
//                   // drop 4 eggs
//                   const egg1 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg}`
//                   );

//                   if (randomEgg === "Golden ventorian egg 2022") {
//                     egg1.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg === "Healar ventorian egg 2022") {
//                     egg1.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg === "Green ventorian egg 2022") {
//                     egg1.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg === "Red ventorian egg 2022") {
//                     egg1.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg === "Blue ventorian egg 2022") {
//                     egg1.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg1.setDescription(
//                       `${user} received : ${randomEgg} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }

//                   message.channel.send(egg1);

//                   const randomEgg2 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg2 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg2}`
//                   );

//                   if (randomEgg2 === "Golden ventorian egg 2022") {
//                     egg2.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg2 === "Healar ventorian egg 2022") {
//                     egg2.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg2 === "Green ventorian egg 2022") {
//                     egg2.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg2 === "Red ventorian egg 2022") {
//                     egg2.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg2 === "Blue ventorian egg 2022") {
//                     egg2.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg2.setDescription(
//                       `${user} received : ${randomEgg2} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg2);

//                   const randomEgg3 =
//                     eggs[Math.floor(Math.random() * eggs.length)];

//                   const egg3 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg3}`
//                   );
//                   if (randomEgg3 === "Golden ventorian egg 2022") {
//                     egg3.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg3 === "Healar ventorian egg 2022") {
//                     egg3.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg3 === "Green ventorian egg 2022") {
//                     egg3.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg3 === "Red ventorian egg 2022") {
//                     egg3.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg3 === "Blue ventorian egg 2022") {
//                     egg3.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg3.setDescription(
//                       `${user} received : ${randomEgg3} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg3);

//                   const randomEgg4 =
//                     eggs[Math.floor(Math.random() * eggs.length)];
//                   const egg4 = new Discord.MessageEmbed().setDescription(
//                     `${user} received : ${randomEgg4}`
//                   );

//                   if (randomEgg4 === "Golden ventorian egg 2022") {
//                     egg4.setColor("#FFD700");
//                     db.fetch(`goldenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`goldenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:goldenVentorianEgg:964896403610546277>`
//                     );
//                   }
//                   if (randomEgg4 === "Healar ventorian egg 2022") {
//                     egg4.setColor("#E5E4E2");
//                     db.fetch(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`oyonsVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : Healar ventorian egg 2022 <:oyonsVentorianEgg:964896823678468167>`
//                     );
//                   }
//                   if (randomEgg4 === "Green ventorian egg 2022") {
//                     egg4.setColor("#32CD32");
//                     db.fetch(`greenVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`greenVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:greenVentorianEgg:964896380529311844>`
//                     );
//                   }
//                   if (randomEgg4 === "Red ventorian egg 2022") {
//                     egg4.setColor("#DE1738");
//                     db.fetch(`redVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`redVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:redVentorianEgg:964896421432152125>`
//                     );
//                   }
//                   if (randomEgg4 === "Blue ventorian egg 2022") {
//                     egg4.setColor("#0000ff");
//                     db.fetch(`blueVentorianEgg2022_${user.id}.${tokenDB}`);
//                     db.add(`blueVentorianEgg2022_${user.id}.${tokenDB}`, 1);
//                     egg4.setDescription(
//                       `${user} received : ${randomEgg4} <:blueVentorianEgg:964896436623904790>`
//                     );
//                   }
//                   message.channel.send(egg4);
//                 }
//               }
//             }
//           }
//         }
//       }
//     } else {
//     }
//   },
// };
