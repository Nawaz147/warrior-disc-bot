// const Discord = require("discord.js");
// const { readdirSync } = require("fs");
// const colors = require("./../../colors.json");
// const { MessageEmbed } = require("discord.js");
// const fs = require("fs");
// const { promisify } = require("util");
// const readFileAsync = promisify(fs.readFile);

// const ownerID = "768747976767832084";
// module.exports = {
//   name: "reload",
//   description: "Reload command- Dev Only",
//   aliases: ["Reload"],

//   run: async (bot, message, args) => {
//     if (message.author.id != ownerID) {
//       const rembed = new MessageEmbed()
//         .setTitle("Error")
//         .setDescription(
//           "❌ You are not authorized to use this command as it is resticted to the owner only"
//         )
//         .setColor(colors.uptime)
//         .setFooter(message.author.username, bot.user.displayAvatarURL())
//         .setTimestamp();
//       message.channel.send(rembed).then((m) =>
//         m.delete({
//           timeout: 7500,
//         })
//       );
//     } else {
//       if (!args[0])
//         return message.channel.send("Please provide a command name!");

//       let commandName = args[0].toLowerCase();

//       try {
//         delete require.cache[require.resolve(`../MAIN/${commandName}.js`)];

//         // Assuming 'newCommandCode' contains the updated code for the command
//         const newCommandCode = `/* Your updated command code here */`;

//         // Write the updated code back to the file
//         await fs.writeFile(
//           `../MAIN/${commandName}.js`,
//           newCommandCode,
//           (err) => {
//             if (err) {
//               console.error(err);
//               return message.channel.send(
//                 `Could not Reload and Save Command: ${commandName}.js Because: \n${err}`
//               );
//             }
//             message.channel.send(
//               `Successfully reloaded and saved: \`${commandName}.js\``
//             );
//           }
//         );
//       } catch (e) {
//         console.error(e);
//         return message.channel.send(
//           `Could not Reload and Save Command: ${commandName}.js Because: \n${e}`
//         );
//       }
//     }
//   },
// };
