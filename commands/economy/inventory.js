// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const disbut = require("discord-buttons");
// module.exports = {
//   name: "inv",
//   aliases: ["inventory"],
//   description: "To see inventory",
//   usage: "inventory",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user =
//       message.mentions.users.first() ||
//       client.users.cache.get(args[0]) ||
//       message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
//       );
//     } else {
//       let bal = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);
//       if (bal === null) bal = 0;

//       let bank = await db.fetch(`money_${user.id}.${tokenDB}.bank`);
//       if (bank === null) bank = 0;

//       let vip = await db.fetch(`premium_${user.id}.${tokenDB}`);
//       if (vip === null) vip = "None";
//       if (vip === true) vip = "premium";

//       let chepCrown = await db.fetch(`chep_crown_${user.id}.${tokenDB}`);
//       if (chepCrown === null) chepCrown = 0;
//       if (chepCrown === undefined) chepCrown = 0;

//       let goldCoins = await db.fetch(`gold_coin_${user.id}.${tokenDB}`);
//       if (goldCoins === null) goldCoins = 0;
//       if (goldCoins === undefined) goldCoins = 0;

//       let newcar = await db.fetch(`my_car_${user.id}.${tokenDB}`);
//       if (newcar === null) newcar = 0;
//       if (newcar === undefined) newcar = 0;

//       let brencyTepta = await db.fetch(`brency_tepta_${user.id}.${tokenDB}`);
//       if (brencyTepta === null) brencyTepta = 0;
//       if (brencyTepta === undefined) brencyTepta = 0;

//       let newhouse = await db.fetch(`my_house_${user.id}.${tokenDB}`);
//       if (newhouse === null) newhouse = 0;
//       if (newhouse === undefined) newhouse = 0;

//       let chepStatue = await db.fetch(`chep_statue_${user.id}.${tokenDB}`);
//       if (chepStatue === null) chepStatue = 0;
//       if (chepStatue === undefined) chepStatue = 0;

//       let chepMedal = await db.fetch(`chep_medal_${user.id}.${tokenDB}`);
//       if (chepMedal === null) chepMedal = 0;
//       if (chepMedal === undefined) chepMedal = 0;

//       let chepTrophy = await db.fetch(`chepTrophy_${user.id}.${tokenDB}`);
//       if (chepTrophy === null) chepTrophy = 0;
//       if (chepTrophy === undefined) chepTrophy = 0;

//       let fluffyTemcha = await db.fetch(`fluffyTemcha_${user.id}.${tokenDB}`);
//       if (fluffyTemcha === null) fluffyTemcha = 0;
//       if (fluffyTemcha === undefined) fluffyTemcha = 0;

//       let volta = await db.fetch(`voltaPurchase_${user.id}.${tokenDB}`);
//       if (volta === null) volta = 0;
//       if (volta === undefined) volta = 0;

//       let key = await db.fetch(`key_${user.id}.${tokenDB}`);
//       if (key === null) key = 0;
//       if (key === undefined) key = 0;

//       let fish = await db.fetch(`fish_${user.id}.${tokenDB}.fish`);

//       // db.set moneyEmbed
//       let moneyEmbed = new Discord.MessageEmbed()
//         .setColor("YELLOW")
//         .setThumbnail("https://i.ibb.co/TBQTpfJ/INVENTORY.png").setDescription(`
//   \n**Inventory**

//   **🚗 Car :** ${newcar} x pcs **|** (rare)

//   **🏡 Mansion :** ${newhouse} x pcs **|** (collectable)

//   **<:brencyTepta:948542822867410944> Brency Tepta :** ${brencyTepta} x pcs **|** (Super Legendary)

//   **<:gold_coin:948543424271892520> Gold Coin :** ${goldCoins} x pcs **|** (collectable)

//   **<:chepCrown:948544931499245628> Chep Crown :** ${chepCrown} x pcs **|** (collectable)

//   **<:Chep_statue:950711406314004530> Chep Statue :** ${chepStatue} x pcs **|** (collectable)

//   **<:chep_medal:950712675657203723> Chep Medal :** ${chepMedal} x pcs **|** (collectable)

//   **<:chep_trophy:950712928598892564> Chep Trophy :** ${chepTrophy} x pcs **|** (collectable)

//   **<:fluffy_temcha:950713782987014165> Fluffy Temcha :** ${fluffyTemcha} x pcs **|** (Legendary)

//   **<:volta:950714759462928474> Volta :** ${volta} x pcs **|** ( Defend & Legendary )

//   **🔑 Key :** ${key} x pcs **|** ( Lucky draw )
// `);
//       // message react
//       var Msg = await message.channel.send(moneyEmbed); // sends message

//       let inventory = new disbut.MessageButton()
//         .setStyle("green") //default: blurple
//         .setLabel("Inventory") //default: NO_LABEL_PROVIDED
//         .setID("Inventory"); //note: if you use the style "url" you must provide url using .setURL('https://example.com')
//       let profile = new disbut.MessageButton()
//         .setStyle("green") //default: blurple
//         .setLabel("Profile") //default: NO_LABEL_PROVIDED
//         .setID("Profile"); //note: if you use the style "url" you must provide url using .setURL('https://example.com')

//       message.channel.send("", {
//         buttons: [inventory, profile],
//       });
//       client.on("clickButton", async (button, user, interaction) => {
//         if (button.id === "Profile") {
//           const embed = new Discord.MessageEmbed()
//             .setColor("GREEN")
//             .setTitle("Profile").setDescription(`
//            **Total Money:** ${bal + bank}
//            **Net worth:** ${
//              bal +
//              bank +
//              chepCrown +
//              goldCoins +
//              newcar +
//              brencyTepta +
//              newhouse +
//              chepStatue +
//              chepMedal +
//              chepTrophy +
//              fluffyTemcha +
//              volta
//            }
//           `);
//           Msg.edit(embed);
//         }
//         if (button.id === "Inventory") {
//           Msg.edit(moneyEmbed);
//         }
//       });
//     }
//   },
// };
