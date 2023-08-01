// const Discord = require("discord.js");
// const ms = require("parse-ms");
// const db = require("quick.db");
// const Canvas = require("canvas");
// module.exports = {
//   name: "eventInfo",
//   aliases: ["event", "eventPrewiew", "eventDetails"],
//   description: "To get current eventInfo",
//   usage: "eventInfo",
//   category: "Economy",
//   run: async (client, message, args) => {
//     const update = db.fetch(`updateInProgress`);
//     if (update == true) {
//       message.channel.send(
//         `You cannot use any commands right now! Bot is updating`
//       );
//     } else {
//       const eventEmbed = new Discord.MessageEmbed()
//         .setColor("#66FF33")
//         .setTitle("Event Info")
//         .addField("Event Name : ", "Oyo event")
//         .addField(
//           "Description : ",
//           "In this event you can kill the boss and loot some amazing things and lot of oyons"
//         )
//         .addField("Event Start Date : ", "1/12/2022")
//         .addField("Event End Date : ", "Not Decided")
//         .setDescription(
//           `
// **YOU CAN LOOT**

// **RARE : **
// Oyo pack <:Oyopack:1047775486610255872>
// 3250 orons

// **OTHER : **
// 150,000 to 750,000 orons
// `
//         )
//         .setTimestamp();

//       message.channel.send(eventEmbed);
//       // const doublePriceEvent = new Discord.MessageEmbed()
//       //   .setColor("#66FF33")
//       //   .setTitle("Upcoming Event Info")
//       //   .addField("Event Name : ", "Gold Rush")
//       //   .addField(
//       //     "Description : ",
//       //     "In this event you can sell your items for real price "
//       //   )
//       //   .addField("Example : ", "1 car = 7500")
//       //   .addField("Event Start Date : ", "04/15/2022")
//       //   .addField("Event End Date : ", "04/22/2022")
//       //   .setThumbnail(
//       //     "https://lh3.googleusercontent.com/d0ftoGSluoBqaglyymRDWPwaBq0383FEoVPFtUWfAogrxgMowOM9dEsTtkxQbPYml3vLdhk=s120"
//       //   );
//       // message.channel.send(doublePriceEvent);
//     }
//   },
// };
