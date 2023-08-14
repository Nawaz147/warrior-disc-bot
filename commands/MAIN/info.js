const Discord = require("discord.js");
const db = require("quick.db");
const prices = require("../../prices.json");

module.exports = {
  name: "info",
  aliases: ["Info"],
  description: "To check info",
  usage: "info",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet, type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      var bossesKilledTotal = db.fetch(`bossesKilledTotal_${tokenDB}`);
      if (bossesKilledTotal == null || bossesKilledTotal == undefined || NaN) {
        bossesKilledTotal = 0;
      }
      var achievementPoints = db.fetch(`achievementPoints_${tokenDB}`);
      if (achievementPoints == null || achievementPoints == undefined || NaN) {
        achievementPoints = 0;
      }
      var soldiers = db.fetch(`soldiers_${tokenDB}`);
      if (soldiers == null || soldiers == undefined || NaN) {
        soldiers = 0;
      }
      var battlesWon = db.fetch(`battlesWon_${tokenDB}`);
      if (battlesWon == null || battlesWon == undefined || NaN) {
        battlesWon = 0;
      }
      var battlesLost = db.fetch(`battlesLost_${tokenDB}`);
      if (battlesLost == null || battlesLost == undefined || NaN) {
        battlesLost = 0;
      }
      var warPoints = db.fetch(`warPoints_${tokenDB}`);
      if (warPoints == null || warPoints == undefined || NaN) {
        warPoints = 0;
      }
      var goldBar = db.fetch(`goldBar_${tokenDB}`);
      if (goldBar == null || goldBar == undefined || NaN) {
        goldBar = 0;
      }
      var texarus = db.fetch(`texarus_${tokenDB}`);
      if (texarus == null || texarus == undefined || NaN) {
        texarus = 0;
      }
      var waetra = db.fetch(`waetra_${tokenDB}`);
      if (waetra == null || waetra == undefined || NaN) {
        waetra = 0;
      }
      var rasheta = db.fetch(`rasheta_${tokenDB}`);
      if (rasheta == null || rasheta == undefined || NaN) {
        rasheta = 0;
      }
      var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
      if (natureDaggers == null || natureDaggers == undefined || NaN) {
        natureDaggers = 0;
      }
      var immortalGun = db.fetch(`immortalGun_${tokenDB}`);
      if (immortalGun == null || immortalGun == undefined || NaN) {
        immortalGun = 0;
      }
      var awakeningGem = db.fetch(`awakeningGem_${tokenDB}`);
      if (awakeningGem == null || awakeningGem == undefined || NaN) {
        awakeningGem = 0;
      }
      var eliteAwakeningGem = db.fetch(`eliteAwakeningGem_${tokenDB}`);
      if (eliteAwakeningGem == null || eliteAwakeningGem == undefined || NaN) {
        eliteAwakeningGem = 0;
      }
      var vortexOrb = db.fetch(`vortexOrb_${tokenDB}`);
      if (vortexOrb == null || vortexOrb == undefined || NaN) {
        vortexOrb = 0;
      }
      var verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`);
      if (verdantLeaf == null || verdantLeaf == undefined || NaN) {
        verdantLeaf = 0;
      }
      var celestialMoonstone = db.fetch(`celestialMoonstone_${tokenDB}`);
      if (
        celestialMoonstone == null ||
        celestialMoonstone == undefined ||
        NaN
      ) {
        celestialMoonstone = 0;
      }
      var crystallineCorestone = db.fetch(`crystallineCorestone_${tokenDB}`);
      if (
        crystallineCorestone == null ||
        crystallineCorestone == undefined ||
        NaN
      ) {
        crystallineCorestone = 0;
      }
      var tomeOfEverlastingWisdom = db.fetch(
        `tomeOfEverlastingWisdom_${tokenDB}`
      );
      if (
        tomeOfEverlastingWisdom == null ||
        tomeOfEverlastingWisdom == undefined ||
        tomeOfEverlastingWisdom == NaN
      ) {
        tomeOfEverlastingWisdom = 0;
      }
      var goldenGhostKnightSet = db.fetch(`goldenGhostKnightSet_${tokenDB}`);
      if (
        goldenGhostKnightSet == null ||
        goldenGhostKnightSet == undefined ||
        goldenGhostKnightSet === NaN
      ) {
        goldenGhostKnightSet = 0;
      }
      var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
      if (
        supremeMagicalSet == null ||
        supremeMagicalSet == undefined ||
        supremeMagicalSet === NaN
      ) {
        supremeMagicalSet = 0;
      }
      var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
      if (frozenSet == null || frozenSet == undefined || frozenSet === NaN) {
        frozenSet = 0;
      }
      var superGolemSet = db.fetch(`superGolemSet_${tokenDB}`);
      if (
        superGolemSet == null ||
        superGolemSet == undefined ||
        superGolemSet === NaN
      ) {
        superGolemSet = 0;
      }
      var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
      if (
        arcaneSenseiSet == null ||
        arcaneSenseiSet == undefined ||
        arcaneSenseiSet === NaN
      ) {
        arcaneSenseiSet = 0;
      }
      var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
      if (
        dawnfireSet == null ||
        dawnfireSet == undefined ||
        dawnfireSet === NaN
      ) {
        dawnfireSet = 0;
      }
      var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
      if (
        intrepidSet == null ||
        intrepidSet == undefined ||
        intrepidSet === NaN
      ) {
        intrepidSet = 0;
      }
      var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
      if (medusaSet == null || medusaSet == undefined || medusaSet === NaN) {
        medusaSet = 0;
      }
      var rustyGears = db.fetch(`rustyGears_${tokenDB}`);
      if (rustyGears == null || rustyGears == undefined || rustyGears === NaN) {
        rustyGears = 0;
      }
      var dustbin = db.fetch(`dustbin_${tokenDB}`);
      if (dustbin == null || dustbin == undefined || dustbin === NaN) {
        dustbin = 0;
      }
      var newspaper = db.fetch(`newspaper_${tokenDB}`);
      if (newspaper == null || newspaper == undefined || newspaper === NaN) {
        newspaper = 0;
      }
      var tornCloth = db.fetch(`tornCloth_${tokenDB}`);
      if (tornCloth == null || tornCloth == undefined || tornCloth === NaN) {
        tornCloth = 0;
      }
      var usedTissue = db.fetch(`usedTissue_${tokenDB}`);
      if (usedTissue == null || usedTissue == undefined || usedTissue === NaN) {
        usedTissue = 0;
      }
      var brokenStick = db.fetch(`brokenStick_${tokenDB}`);
      if (
        brokenStick == null ||
        brokenStick == undefined ||
        brokenStick === NaN
      ) {
        brokenStick = 0;
      }
      var bullet = db.fetch(`bullet_${tokenDB}`);
      if (bullet == null || bullet == undefined || bullet === NaN) {
        bullet = 0;
      }
      var balance = db.fetch(`money_${tokenDB}.pocket`);
      if (balance == null || balance == undefined || balance === NaN) {
        balance = 0;
      }

      var netWorth =
        goldBar * prices.goldBar +
        texarus * prices.texarus +
        waetra * prices.waetra +
        rasheta * prices.rasheta +
        natureDaggers * prices.natureDaggers +
        immortalGun * prices.immortalGun +
        awakeningGem * prices.awakeningGem +
        eliteAwakeningGem * prices.eliteAwakeningGem +
        vortexOrb * prices.vortexOrb +
        verdantLeaf * prices.verdantLeaf +
        celestialMoonstone * prices.celestialMoonstone +
        crystallineCorestone * prices.crystallineCorestone +
        tomeOfEverlastingWisdom * prices.tomeOfEverlastingWisdom +
        goldenGhostKnightSet * prices.goldenGhostKnightSet +
        supremeMagicalSet * prices.supremeMagicalSet +
        frozenSet * prices.frozenSet +
        superGolemSet * prices.superGolemSet +
        arcaneSenseiSet * prices.arcaneSenseiSet +
        dawnfireSet * prices.dawnfireSet +
        intrepidSet * prices.intrepidSet +
        medusaSet * prices.medusaSet +
        rustyGears * prices.rustyGears +
        dustbin * prices.dustbin +
        newspaper * prices.newspaper +
        tornCloth * prices.tornCloth +
        usedTissue * prices.usedTissue +
        brokenStick * prices.brokenStick +
        bullet * prices.bullet +
        balance;
      netWorth = netWorth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const userInfoEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Info`)
        .addField("User ID", user.id)
        .addField("User Tag", user.tag)
        .addField("Is Banned?", banned ? "Yes" : "No")
        .addField("User status", user.presence.status)
        .addField("Bosses killed", bossesKilledTotal)
        .addField("Achievement Points (APS)", achievementPoints)
        .addField("Soldiers under command", soldiers)
        .addField("Battles Won", battlesWon)
        .addField("Battles Lost", battlesLost)
        .addField("War points", warPoints)
        .addField("Net worth", netWorth)
        .setColor("#ffffff");

      if (banned === true) {
        userInfoEmbed.addField("Ban Reason", banReason);
        userInfoEmbed.addField("Ban Date", banDate);
      } else {
        // Fetch the token creation date from the database
        const tokenCreationDate = db.fetch(`${user.id}.tokenCreationDate`);

        if (!tokenCreationDate) {
          message.channel.send("Unable to fetch token creation date.");
          return;
        }

        // Calculate the played duration using native JavaScript date functions
        const currentDate = new Date();
        const creationDateParts = tokenCreationDate.split(".");
        const creationDate = new Date(
          parseInt(creationDateParts[2]),
          parseInt(creationDateParts[1]) - 1,
          parseInt(creationDateParts[0])
        );

        const timeDifference = currentDate.getTime() - creationDate.getTime();
        const daysPlayed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const monthsPlayed = Math.floor(daysPlayed / 30);

        userInfoEmbed.addField(
          "Played Duration",
          `${monthsPlayed} months ${daysPlayed % 30} days`
        );
      }

      message.channel.send(userInfoEmbed);
    }
  },
};
