const canvacord = require("canvacord");
const axios = require("axios");

const {
  Client,
  Collection,
  Intents,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
//sk-bDum7CqaRGM2tEeVjgdRT3BlbkFJh74o1hT2BXIJ7EwU3neXz

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
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "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",
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

const pingCommand = require("./slashcommands/ping");

// Register your ping command
client.commands.set(pingCommand.data.name, pingCommand);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Check if the command exists
  if (!client.commands.has(commandName)) return;

  try {
    // Execute the command
    await client.commands.get(commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
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
const commands = new Map();

function loadCommands() {
  // Implement your logic to load commands into the 'commands' Map
  // For simplicity, let's assume you have a 'commands' directory
  // with each command in a separate file.
}

function reloadCommand(commandName) {
  try {
    // Delete the cached module for the specified command
    delete require.cache[require.resolve(`./commands/MAIN/${commandName}.js`)];

    // Reload the command
    const reloadedCommand = require(`./commands/MAIN/${commandName}.js`);

    // Update the 'commands' Map with the reloaded command
    commands.set(commandName, reloadedCommand);

    console.log(`Command '${commandName}' reloaded successfully.`);
    return true;
  } catch (error) {
    console.error(`Error reloading command '${commandName}':`, error);
    return false;
  }
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  loadCommands();
});

client.on("message", (message) => {
  function restartBot() {
    console.log("Restarting...");
    process.exit(0); // Exit the Node.js process, triggering a restart
  }
  const args = message.content.split(" ");
  const commandName = args.shift().toLowerCase();
  // client.on("message", async (message) => {
  //   // Ignore messages from bots
  //   if (message.author.bot) return;

  //   if (
  //     message.content.startsWith("!econstats") &&
  //     message.author.id === "768747976767832084"
  //   ) {

  //     // Split the message content into args
  //     const args = message.content.split(" ");

  //     if (!args[1]) {
  //       function createEconomyEmbed(title, description) {
  //         return new Discord.MessageEmbed()
  //           .setTitle("ECONOMY STATS")
  //           .setDescription(description)
  //           .setColor("#00ff00");
  //       }
  //       // Calculate average money per user
  //       const averageMoneyPerUser = calculateAverageMoneyPerUser();

  //       // Create and send the embed
  //       const embed = createEconomyEmbed(
  //         "Economy Stats - Average Money Per User (including goldBars)",
  //         `Average Money Per User: ${averageMoneyPerUser.toFixed(2)}`
  //       );

  //       message.channel.send(embed);
  //       return;
  //     } else {
  //       function calculateTotalItemPieces(itemName) {
  //         const allUserTokens = datab
  //           .all()
  //           .filter((entry) => entry.ID.startsWith(`${args[0]}_`))
  //           .map((entry) => entry.ID.slice(6));

  //         let totalItemPieces = 0;

  //         for (const tokenDB of allUserTokens) {
  //           const tokenDB = datab.fetch(`${message.member.id}.valoriumToken`);
  //           const userItemPieces = datab.get(`${itemName}_${tokenDB}`) || 0;
  //           totalItemPieces += userItemPieces;
  //         }

  //         return totalItemPieces;
  //       }

  //       // Assume args[1] contains the item name
  //       const itemName = args[1];

  //       // Calculate total item pieces in the economy
  //       const totalItemPieces = calculateTotalItemPieces(itemName);

  //       // Create and send the embed
  //       const embed = createEconomyEmbed(
  //         `Economy Stats - Total ${itemName} Pieces in the Economy`,
  //         `Total ${itemName} Pieces: ${totalItemPieces}`
  //       );
  //       message.channel.send(embed);
  //       return;
  //     }
  //   }

  //   function calculateAverageMoneyPerUser() {
  //     const allUserTokens = datab
  //       .all()
  //       .filter((entry) => entry.ID.startsWith("money_"))
  //       .map((entry) => entry.ID.slice(6));

  //     let totalMoney = 0;

  //     for (const tokenDB of allUserTokens) {
  //       const tokenDB = datab.fetch(`${message.member.id}.valoriumToken`);
  //       const userBalance = datab.get(`money_${tokenDB}.pocket`) || 0;
  //       const userGoldBars = datab.get(`goldBar_${tokenDB}`) || 0;

  //       // Each goldBar is worth 10,000,000
  //       totalMoney += userBalance + userGoldBars * 10000000;
  //     }

  //     const totalUsers = allUserTokens.length;
  //     return totalUsers === 0 ? 0 : totalMoney / totalUsers;
  //   }
  // });
  if (commandName === "!reload" && args.length === 1) {
    const success = reloadCommand(args[0]);
    message.reply(
      success
        ? `Command '${args[0]}' reloaded.`
        : `Error reloading command '${args[0]}.js'.`
    );
  } else {
    // Handle other commands
    const command = commands.get(commandName);
    if (command) {
      // Execute the command
      command.execute(message, args);
    }
  }
});
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
const RiveScript = require("rivescript");

const rs = new RiveScript();
rs.loadFile([
  "./brain.rive", // Add your own RiveScript files here
])
  .then(() => {
    console.log("RiveScript files loaded!");
  })
  .catch((err) => {
    console.error("Error loading RiveScript files:", err);
  });
client.on("message", async (message) => {
  // Load your RiveScript files (you can customize these files for your responses)
  if (message.content.startsWith(".ai ")) {
    const tokenDB = datab.fetch(`${message.author.id}.valoriumToken`);
    const mysterionixProActivated =
      datab.fetch(`mysterionixProActivated_${tokenDB}`) || false;
    if (mysterionixProActivated == true) {
      const userMessage = message.content.slice(".ai ".length).trim();
      rs.sortReplies();
      const botReply = await rs.reply("user", userMessage);

      console.log(`User: ${userMessage}`);
      console.log(`Bot: ${botReply}`);

      // Reply to the user
      message.reply(botReply);
    } else {
      const premiumUserEmbed = new Discord.MessageEmbed()
        .setTitle("Premium Command")
        .setDescription(
          `This ai is only for premium users. Upgrade to Mysterionix Pro for exclusive benefits!`
        )
        .setColor("#ffd700")
        .setThumbnail("https://i.ibb.co/SwtWtK5/mysterionix-pro-final.gif");
      message.channel.send(premiumUserEmbed);
    }
  }

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
});
