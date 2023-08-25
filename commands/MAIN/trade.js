// var currentUser = message.author;
// var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
// if (!tokenDB) {
//   message.channel.send(
//     `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
//   );
// } else if (banned == true && !message.mentions.users.first()) {
//   const banEmbed = new Discord.MessageEmbed()
//     .setTitle(user)
//     .setDescription(`Your account has been banned`)
//     .addField("Reason", `${banReason}`)
//     .addField("Date", `${banDate}`)
//     .setColor("#FFFF00");
//   message.channel.send(banEmbed);
//   db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
// } else if (banned == true && message.mentions.users.first()) {
//   const banEmbed = new Discord.MessageEmbed()
//     .setTitle(user)
//     .setDescription(`That user's account has been banned`)
//     .addField("Reason", `${banReason}`)
//     .addField("Date", `${banDate}`)
//     .setColor("#FFFF00");
//   message.channel.send(banEmbed);
//   db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
// } else if (update == true && message.author.id !== "768747976767832084") {
//   const updateInProgressEmbed = new Discord.MessageEmbed()
//     .setTitle(`Temporary Command Suspension`)
//     .setDescription(
//       `
// Sorry ${currentUser.username} , commands are disabled at the moment.
// The bot is currently undergoing an update. Please be patient!
// `
//     )
//     .setColor("#3498db")
//     .setTimestamp();
//   message.channel.send(updateInProgressEmbed);
//   db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
// } else if (acceptedTOS == false && !message.mentions.users.first()) {
//   const acceptTOSembed = new Discord.MessageEmbed()
//     .setTitle(`Failed to proceed`)
//     .setDescription(
//       `
// You need to accept the terms of service for using this discord bot!
// Type **+tos** to check the terms of service.
// Type **+tos accept** to accept the terms of service.
// `
//     )
//     .setColor("#808080");
//   message.channel.send(acceptTOSembed);
//   db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
// } else if (acceptedTOS == false && message.mentions.users.first()) {
//   const acceptTOSembed = new Discord.MessageEmbed()
//     .setTitle(`Failed to proceed`)
//     .setDescription(
//       `
// ${user.username} has not yet accepted the terms of service
// `
//     )
//     .setColor("#808080");
//   message.channel.send(acceptTOSembed);
//   db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
// } else {
//   var buyOrSell = args[0];
//   var item = args[1];
//   var amountOfItem = args[2];
//   var gold = args[3];
//   if (!item && !gold && !buyOrSell && !amountOfItem) {
//     message.channel.send(
//       `Invalid command usage , Usage eg. +trade 1 waetraBow 20000000`
//     );
//   } else if (item && !gold && !buyOrSell && !amountOfItem) {
//     message.channel.send(
//       `Invalid command usage , Usage eg. +trade 1 waetraBow 20000000`
//     );
//   } else if (item && gold && !buyOrSell && !amountOfItem) {
//     message.channel.send(
//       `Invalid command usage , Usage eg. +trade 1 waetraBow 20000000`
//     );
//   } else if (item && gold && buyOrSell && !amountOfItem) {
//     message.channel.send(
//       `Invalid command usage , Usage eg. +trade 1 waetraBow 20000000`
//     );
//   } else if (!item && !gold && !buyOrSell && amountOfItem) {
//     //function here
//   }
// }
