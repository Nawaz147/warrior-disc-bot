// const discord = require("discord.js"); // Define the discord.js module
// const client = new discord.Client(); // Create a discord.js client (constructor)
// const disbut = require("discord-buttons");
// module.exports = {
//   name: "tst",
//   aliases: ["test"],
//   description: "To tst",
//   usage: "tst",
//   category: "test",
//   run: async (client, message, args) => {
//     let user = message.author;
//     const tokenDB = db.fetch(`${user.id}.oyOtoken`);
//     if (!tokenDB) {
//       message.channel.send(
//         `${user} your token is not registered yet , type Oyo token me to set your Oyo token`
//       );
//     } else {

//     }
//     let button1 = new disbut.MessageButton()
//       .setStyle("red") //default: blurple
//       .setLabel("No") //default: NO_LABEL_PROVIDED
//       .setID("button1"); //note: if you use the style "url" you must provide url using .setURL('https://example.com')
//     let button2 = new disbut.MessageButton()
//       .setStyle("green") //default: blurple
//       .setLabel("Yes") //default: NO_LABEL_PROVIDED
//       .setID("button2"); //note: if you use the style "url" you must provide url using .setURL('https://example.com')

//     message.channel.send("click the button", {
//       buttons: [button1, button2],
//     });
//   },
// };
