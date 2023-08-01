// const discord = require("discord.js");
// const client = new discord.Client({
//   intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES],
// });
// const { MessageActionRow, MessageButton } = require("discord.js");
// const db = require("quick.db");

// // ExtendedTextChannel to support buttons in discord.js v13
// class ExtendedTextChannel extends discord.TextChannel {
//   async send(content, options) {
//     if (typeof content === "object" && content.hasOwnProperty("components")) {
//       const components = content.components.map((row) =>
//         row.components.map((component) =>
//           component instanceof MessageButton
//             ? new MessageButton(component)
//             : component
//         )
//       );
//       content = { ...content, components };
//     }
//     return super.send(content, options);
//   }
// }
// discord.TextChannel = ExtendedTextChannel;

// module.exports = {
//   name: "trade",
//   aliases: ["trd"],
//   description: "To trade",
//   usage: "trade",
//   category: "trade",
//   run: async (client, message, args) => {
//     let user = message.author || message.mentions.users.first();
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);

//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet, type 'Oyo token me' to set your Oyo token`
//       );
//       return;
//     } else {
//       let giveItem = args[0];
//       let getMoney = parseInt(args[1]);
//       const rashetaAxe = db.fetch(`rasheta_${user.id}`);
//       if (giveItem == "rasheta") {
//         if (!getMoney) {
//           message.channel.send("Enter the amount of money you want in return");
//         } else {
//           if (!rashetaAxe) {
//             message.channel.send(`${user} doesn't have it`);
//           } else {
//             const tradeEmbed = new discord.MessageEmbed()
//               .setTitle(`TRADE`)
//               .setDescription(`${message.author} has sent you a trade !`)
//               .addField(`You give`, `${getMoney} Gold Coins`)
//               .addField(`You get`, `${giveItem}`)
//               .addField(`To accept type`, `+accept (in a server)`);

//             // Send the trade embed
//             const tradeMessage = await user.send({ embeds: [tradeEmbed] });

//             // Save trade information in the database
//             db.set(`tradePending_${user.id}`, 1);
//             db.set(`moneyHeGive_${user.id}`, getMoney);
//             db.set(`itemIgive_${tokenDB}`, giveItem);
//             db.set(`tradeSenderUser_${user.id}`, message.author.id);

//             message.channel.send(`You sent a trade to ${user} !`);

//             // Add trade interaction to the embed message
//             const acceptButton = new MessageActionRow().addComponents(
//               new MessageButton()
//                 .setCustomId("accept_trade")
//                 .setLabel("Accept Trade")
//                 .setStyle("SUCCESS")
//             );

//             await tradeMessage.edit({
//               embeds: [tradeEmbed],
//               components: [acceptButton],
//             });

//             // Interaction handler
//             const filter = (interaction) =>
//               interaction.customId === "accept_trade" &&
//               interaction.user.id === user.id;
//             const collector = tradeMessage.createMessageComponentCollector({
//               filter,
//               time: 15000,
//             });

//             collector.on("collect", async (interaction) => {
//               interaction.deferUpdate();

//               // Handle the trade confirmation here
//               const senderID = db.get(`tradeSenderUser_${user.id}`);
//               const moneyToReceive = db.get(`moneyHeGive_${user.id}`);
//               const itemToReceive = db.get(`itemIgive_${message.author.id}`);
//               // Implement the trade logic and give the items/gold to the respective users
//               // For example, add gold and the item to the user's inventory

//               // Clear the trade data from the database after the trade is complete
//               db.delete(`tradePending_${user.id}`);
//               db.delete(`moneyHeGive_${user.id}`);
//               db.delete(`itemIgive_${message.author.id}`);
//               db.delete(`tradeSenderUser_${user.id}`);

//               // Inform both users that the trade is complete
//               message.channel.send(
//                 `Trade between ${message.author} and ${user} was successful!`
//               );
//               user.send(`Trade with ${message.author} was successful!`);
//             });

//             collector.on("end", (collected) => {
//               if (collected.size === 0) {
//                 // If the user didn't accept the trade within the specified time
//                 message.channel.send(`Trade with ${user} has expired.`);
//                 db.delete(`tradePending_${user.id}`);
//                 db.delete(`moneyHeGive_${user.id}`);
//                 db.delete(`itemIgive_${message.author.id}`);
//                 db.delete(`tradeSenderUser_${user.id}`);
//               }
//             });
//           }
//         }
//       } /// he gives money, I give item
//     }
//   },
// };
