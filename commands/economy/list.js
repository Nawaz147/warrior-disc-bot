// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// module.exports = {
//   name: "List",
//   aliases: ["list", "LiSt", "lIsT", "LIST"],
//   description: "To play your items",
//   usage: "play",
//   category: "Economy",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {
//       const itemQuantity = args[0];
//       const itemName = args[1];
//       const itemPrice = args[2];

//       if (!itemQuantity) {
//         message.channel.send(
//           `${user} you need to specify the quantity of the item you want to list`
//         );
//       }
//       if (!itemName) {
//         message.channel.send(
//           `${user} you need to specify the name of the item you want to list`
//         );
//       } else if (!itemPrice) {
//         message.channel.send(
//           `${user} you need to specify the price of the item you want to list`
//         );
//       }
//     }
//   },
// };
