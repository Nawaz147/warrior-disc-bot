// const Discord = require("discord.js");
// const { readdirSync } = require("fs");
// const colors = require("./../../colors.json");
// const { MessageEmbed } = require("discord.js");
// const ownerID = "916176454679674892";
// module.exports = {
//   name: "reloadFun",
//   description: "Reload command- Dev Only",
//   aliases: ["rfun"],

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
//         delete require.cache[require.resolve(`../Fun/${commandName}.js`)];
//         const pull = require(`../Fun/${commandName}.js`);
//         //   bot.commands.set(pull.config.name, pull)
//         message.channel.send(`Successfully reloaded: \`${commandName}\``);
//       } catch (e) {
//         console.log(e);
//         return message.channel.send(
//           `Could not Reload Command: ${commandName} From Moderation Module Because: \n${e}`
//         );
//       }
//     }
//   },
// };
