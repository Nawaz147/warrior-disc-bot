const canvacord = require("canvacord");
const {
  Client,
  Collection,
  Intents,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
const { config } = require("dotenv");
const { suffix, db, token } = require("./config.json");
const datab = require("quick.db");
require("./server.js");
const Discord = require("discord.js");
const DiscordSlash = require("discord.js-slash-command");
const client = new Client({
  disableMentions: "everyone",
  partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const api = require("srod-v2");
const { Player } = require("discord-player");
const fs = require("fs");
client.player = new Player(client);
const ms = require("parse-ms");
//-----database-------
const { Database } = require("quickmongo");
//Collection
require("discord-buttons")(client);

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const data = [];

for (const file of commandFiles) {
  const commandfile = require(`./slashcommands/${file}`);
  client.commands.set(commandfile.name, commandfile);
  data.push({
    name: commandfile.name,
    description: commandfile.description,
    options: commandfile.options,
  });
}
client.db = new Database(db);
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
client.snipes = new Map();

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

const Events = require("./handlers/command.js");

// disable send messages till not verified
const mongoose = require("mongoose");
const wait = require("node:timers/promises").setTimeout;

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
    await wait(2000);
    await interaction.editReply("Pong again!");
  }
});
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("Connected to mongo db"));
const player = fs
  .readdirSync("./player")
  .filter((file) => file.endsWith(".js"));

//
// const Levels = require("discord-xp");
const { log } = require("console");

for (const file of player) {
  //console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  // client.player.on(file.split(".")[0], event.bind(null, client));
}
client.login(token);
client.on("ready", () => {
  client.user
    .setActivity(`help${suffix}`, {
      type: "LISTENING",
    })
    .catch(console.error);
});

client.on(
  "error",
  (e) =>
    console.log("An error was found") ||
    setTimeout(function () {
      console.log(e);
    }, 3000)
);
client.on(
  "warn",
  (e) =>
    console.log("A warn was found") ||
    setTimeout(function () {
      console.log(e);
    }, 3000)
);
client.on("disconnect", () => console.log("Disconnected"));
client.on("reconnecting", () => console.log("Reconnecting..."));

process.on("unhandledRejection", (err) => {
  console.error(err);
});
process.on("uncaughtException", (err) => {
  console.error(err);
});
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGBREAK", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGHUP", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGQUIT", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGABRT", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGKILL", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGSTOP", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGTSTP", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGCONT", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGTTIN", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGTTOU", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.on("SIGUSR1", () => {
  console.log("\nShutting down...");
  process.exit(0);
});
process.stdin.on("data", (data) => {
  if (data.toString().trim() === "stop") {
    console.log("\nShutting down...");
    process.exit(0);
  }
});

client.on("messageDelete", async (message) => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!client.commands.has(interaction.commandName)) return;
  try {
    await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
  client.guilds.cache.get(config.guild)?.commands.set(data);
});

// ANTI-MENTION
client.on("message", async (message) => {
  user = message.member;
});

// ... (your existing imports)

client.on("message", async (message) => {
  if (message.channel.type == "dm") {
    if (message.content == "fish.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "inv.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "play hit.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "play.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "farm hit.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "farm.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "sell.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "trade.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
    if (message.content == "buy.x") {
      message.channel.send(`This command is server limited`);
      return;
    }
  }
  if (message.author.bot) return;

  // Check if the message is sent in a guild
  if (message.guild) {
    const tokenDB = datab.fetch(`${message.author.id}.valoriumToken`);
    const tokenUser = datab.fetch(`nameofUser_${message.author}`);

    if (message.content.includes(tokenDB)) {
      message.delete().then(async () => {
        var alertEmbed = new Discord.MessageEmbed()
          .setTitle(`⚠ ALERT ⚠`)
          .setDescription(
            `You cannot share your token (Anyone can access your account if you share it and sharing it is strictly prohibited)`
          )
          .setColor(`#EE4B2B`);
        message.author.send(alertEmbed);
      });
    }

    if (!message.content.endsWith(suffix)) return;

    // If message.member is uncached, cache it.
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content.trim().slice(0, -suffix.length).split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) {
      try {
        command.run(client, message, args);
      } catch (error) {
        console.error(error);
        return message.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } else {
    // Handle DM commands here
    if (message.content.endsWith(suffix)) {
      const args = message.content.trim().slice(0, -suffix.length).split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;

      // Get the command
      let command = client.commands.get(cmd);
      // If none is found, try to find it by alias
      if (!command) command = client.commands.get(client.aliases.get(cmd));

      // If a command is finally found, run the command
      if (command) {
        try {
          command.run(client, message, args);
        } catch (error) {
          console.error(error);
          return message.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
          });
        }
      }
    }
  }
});

client.setMaxListeners("disconnect", 15);

// Set the maximum number of listeners for the guildMemberAdd event to 15
client.setMaxListeners("guildMemberAdd", 15);
client.on("message", async (message, member) => {
  if (message.channel.type === "dm") {
    console.log(
      `${message.author.username}#${message.author.discriminator} said : ${message.content}`
    );

    if (message.content.endsWith(suffix)) {
      return message.channel.send(
        `Hi ${message.author.username} , You can't use commands in DM!`
      );
    }
    if (message.type === "APPLICATION_COMMAND") return;
  }

  client.on("disconnect", (event) => {
    if (event.code !== 1000) {
      console.log(
        "Discord client disconnected with reason: " +
          event.reason +
          " (" +
          event.code +
          ")."
      );

      if (event.code === 4004) {
        if (token === "your_token_here") {
          console.log(
            'It appears that you have not yet added a token. Please replace "your_token_here" with a valid token in the config file.'
          );
        } else if (token.length < 50) {
          console.log(
            "It appears that you have entered a client secret or other invalid string. Please ensure that you have entered a bot token and try again."
          );
        } else {
          console.log(
            "Please double-check the configured token and try again."
          );
        }
        process.exit();
        return;
      }

      console.log("Attempting to reconnect in 6s...");
      setTimeout(() => {
        client.login(token);
      }, 6000);
    }
  });

  // if db error occurs fire this
  client.on("guildMemberAdd", async (member) => {
    let message = `Hey ${member} welcome to ${member.guild.name}`;

    let channel = await client.db.get(`channel_${member.guild.id}`);
    const welcomeCard = new canvacord.Welcomer()
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setAvatar(member.user.displayAvatarURL({ format: "png" }))
      .setColor("title", "#fff")
      .setColor("username-box", "#293480")
      .setColor("discriminator-box", "#293480")
      .setColor("message-box", "#34068a")
      .setColor("avatar", "#550dd1")
      .setBackground("https://wallpaperaccess.com/full/360436.jpg")
      .setMemberCount(member.guild.memberCount);
    let attachment = new Discord.MessageAttachment(
      await welcomeCard.build(),
      "welcome.png"
    );

    if (!channel) return;

    client.channels.cache.get(channel).send(attachment);
    client.channels.cache.get(channel).send(message);
  });
});
