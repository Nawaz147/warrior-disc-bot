module.exports = {
  name: "setwelcome",
  run: async (client, message, args) => {
    let channel = message.mentions.channels.first();

    if (!channel) {
      message.reply(`Mention a channel`);
    }

    client.db.set(`channel_${message.guild.id}`, message.channel.id);

    message.channel.send(`Now ${channel} has been set as a welcome channel`);
  },
};
