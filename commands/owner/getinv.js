module.exports = {
  name: "getinvite",
  aliases: ["getinv", "gi"],
  category: "owner",
  description: "Generates an invitation to the server in question.",
  usage: "gi",

  run: async (bot, message, args) => {
    let guild = null;

    if (!args[0])
      return message.channel.send(
        "Enter the Guild Name or Guild ID where you want the Invite Link."
      );

    // Fetch the guild based on the provided argument (guild name or ID)
    if (isNaN(args[0])) {
      // If the argument is not a number, try to find the guild by name
      guild = bot.guilds.cache.find(
        (g) => g.name.toLowerCase() === args.join(" ").toLowerCase()
      );
    } else {
      // If the argument is a number, try to find the guild by ID
      guild = bot.guilds.cache.get(args[0]);
    }

    // Check if the guild was found
    if (!guild) {
      return message.channel.send(
        `I am not in the server \`${args.join(" ")}\`.`
      );
    }

    let tChannel = guild.channels.cache.find(
      (ch) =>
        ch.type == "text" &&
        ch.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE")
    );

    if (!tChannel) {
      return message.channel.send(
        "Sorry, I don't have the `CREATE_INSTANT_INVITE` permission there!"
      );
    } else {
      let invite = await tChannel
        .createInvite({ temporary: false, maxAge: 0 })
        .catch((err) => {
          return message.channel.send(`${err} has occurred!`);
        });

      message.channel.send(invite.url);
    }
  },
};
