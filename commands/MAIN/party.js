var Discord = require("discord.js");
var db = require("quick.db");
var Canvas = require("canvas");
var config = require("../../config.json");
var wazBow = require("../../weaponStats/wazbow.json");
var moneyCap = config.moneyCap;
var startFunction = require("../../startCommandFunction.js");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarus = require("../../weaponStats/texarusStaff.json");
const natureDaggerss = require("../../weaponStats/natureDaggers.json");
const ventorianBoww = require("../../weaponStats/ventorianBow.json");
const immortalGunn = require("../../weaponStats/immortalGun.json");
const daggerOfDeathh = require("../../weaponStats/daggerOfDeath.json");
const moonsShineOfMetalSwordd = require("../../weaponStats/moonsShineOfMetalSword.json");
module.exports = {
  name: "party",
  aliases: ["PARTY", "prty", "Prty"],
  description: "To create/join/leave a party",
  usage: "party",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    var subcommand = args[0] ? args[0].toLowerCase() : null;
    var userId = message.author.id;

    // Retrieve user-specific data
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    var banned = db.fetch(`banned_${tokenDB}`) || false;
    var update = db.fetch(`updateInProgress`);

    if (startFunction) {
      startFunction(message, args, client);
    }

    if (acceptedTOS == true && update == false && banned == false) {
      var userTokenDB = new db.table(`tokenDB_${userId}`);
      var partyData = userTokenDB.get(`party`) || { leader: null, members: [] };

      switch (subcommand) {
        case "create":
          if (partyData.leader) {
            return message.channel.send("You are already in a party");
          } else if (partyData.members == userId) {
            return message.channel.send("You are already in a party");
          }

          // Create a new party data object
          partyData.leader = userId;
          partyData.members = [userId];

          // Save party data in the user's tokenDB
          userTokenDB.set(`party`, partyData);

          message.channel.send("Party created!");
          break;

        case "invite":
          if (partyData.members.length == 3) {
            return message.channel.send(`Your party is full`);
          }
          if (!partyData.leader || partyData.leader !== userId) {
            return message.channel.send(
              "Only the party leader can invite members."
            );
          }
          var mention = message.mentions.members.first();
          if (!mention || partyData.members.includes(mention.id)) {
            return message.channel.send(
              "Invalid mention or user is already in the party."
            );
          }

          // Store the invitation in the user's tokenDB for the invited user
          var inviteKey = `partyInvite_${mention.id}`;
          var inviteData = {
            inviter: userId,
            party: partyData,
          };
          var inviteTokenDB = new db.table(`tokenDB_${mention.id}`);
          inviteTokenDB.set(inviteKey, inviteData);

          message.channel.send(`Invitation sent to ${mention}.`);
          break;

        case "join":
          var inviter = message.mentions.members.first();
          if (!inviter || inviter.user.id === userId) {
            return message.channel.send("Invalid mention or self-mention.");
          }

          if (partyData.members.includes(userId)) {
            return message.channel.send("You are already in a party.");
          }

          // Check if the user has a pending party invitation
          var inviteKey = `partyInvite_${userId}`;
          var inviteData = userTokenDB.get(inviteKey);
          if (!inviteData || inviteData.inviter !== inviter.id) {
            return message.channel.send(
              "You haven't been invited to a party by this user."
            );
          }

          // Determine the user's weapon damage based on their equipped weapon
          let weaponDamage = 0; // Default value for unknown weapon
          const equippedWeaponName = db.fetch(`wepName_${tokenDB}`);

          let equippedWeapon = "";
          switch (equippedWeaponName) {
            case "natureDaggers":
              weaponDamage = natureDaggerss.Damage;
              equippedWeapon = "Nature Daggers";
              break;
            case "ventorianBow":
              weaponDamage = ventorianBoww.Damage;
              equippedWeapon = "Ventorian Bow";
              break;
            case "texarusStaff":
              weaponDamage = texarus.Damage;
              equippedWeapon = "Texarus Staff";
              break;
            case "waetraBow":
              weaponDamage = waetraDamage.Damage;
              equippedWeapon = "Waetra Bow";
              break;
            case "rashetaAxe":
              weaponDamage = rashetaDamage.Damage;
              equippedWeapon = "Rasheta Axe";
              break;
            case "immortalGun":
              weaponDamage = immortalGunn.Damage;
              equippedWeapon = "Immortal Gun";
              break;
            case "daggerOfDeath":
              var daggerOfDeathLevel =
                db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
              if (daggerOfDeathLevel > 1) {
                weaponDamage = db.fetch(`daggerOfDeathDamage_${tokenDB}`);
              } else {
                weaponDamage = daggerOfDeathh.Damage;
              }
              equippedWeapon = "Dagger of Death";
              break;
            case "moonsShineOfMetalSword":
              weaponDamage = moonsShineOfMetalSwordd.Damage;
              equippedWeapon = "Moons Shine of Metal Sword";
              break;
            // Add cases for other weapons here...
            default:
              // Handle the case where the equipped weapon is unknown
              message.channel.send("Unknown equipped weapon.");
              return;
          }

          // Create a member data object to store user-specific data
          if (!inviteData.party.members) {
            inviteData.party.members = []; // Initialize it as an empty array
          }

          if (!inviteData.party.membersData) {
            inviteData.party.membersData = []; // Initialize it as an empty array
          }

          const memberData = {
            userId: userId,
            equippedWeapon: equippedWeapon,
            weaponDamage: weaponDamage,
          };

          // Add the user's data to partyData
          inviteData.party.members.push(userId);
          inviteData.party.membersData.push(memberData);
          // Save party data in the user's tokenDB
          userTokenDB.set(`party`, inviteData.party);

          // Remove the invitation
          userTokenDB.delete(inviteKey);
          message.channel.send(`${message.author} has joined the party.`);

          // Update the party data for the inviter in their tokenDB as well
          var inviterTokenDB = new db.table(`tokenDB_${inviter.id}`);
          var inviterPartyData = inviterTokenDB.get(`party`) || {
            leader: null,
            members: [],
            membersData: [],
          };

          // Check if inviterPartyData.members and inviterPartyData.membersData are undefined
          if (!inviterPartyData.members) {
            inviterPartyData.members = []; // Initialize it as an empty array
          }

          if (!inviterPartyData.membersData) {
            inviterPartyData.membersData = []; // Initialize it as an empty array
          }

          inviterPartyData.members.push(userId);
          inviterPartyData.membersData.push(memberData);
          inviterTokenDB.set(`party`, inviterPartyData);
          break;
        case "leader":
          if (!partyData.leader || partyData.leader !== userId) {
            return message.channel.send(
              "Only the party leader can change leadership."
            );
          }
          var newLeader = message.mentions.members.first();
          if (!newLeader || !partyData.members.includes(newLeader.id)) {
            return message.channel.send(
              "Invalid mention or user is not in the party."
            );
          }
          partyData.leader = newLeader.id;

          // Update party data in the user's tokenDB
          userTokenDB.set(`party`, partyData);

          message.channel.send(`${newLeader} is now the party leader.`);
          break;

        case "leave":
          if (!partyData.members.includes(userId)) {
            return message.channel.send("You are not in a party.");
          }
          if (partyData.leader === userId) {
            userTokenDB.delete(`party`);
            message.channel.send("Party disbanded.");
          } else {
            // User is not the leader, remove them from the party
            partyData.members = partyData.members.filter(
              (memberId) => memberId !== userId
            );

            // Update party data in the user's tokenDB
            userTokenDB.set(`party`, partyData);
            message.channel.send("You have left the party.");

            // Remove the user from the party in the database
            if (partyData.members.length === 0) {
              userTokenDB.delete(`party`);
            }
          }
          break;

        case "view":
          if (!partyData.leader) {
            return message.channel.send("You are not the party leader.");
          }
          var partyLeader = await client.users.fetch(partyData.leader);
          var partyMembers = await Promise.all(
            partyData.members.map(async (memberId) => {
              return {
                id: memberId,
                username: (await client.users.fetch(memberId)).username,
              };
            })
          );

          var partyEmbed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("Party Information")
            .addField("Party Leader", partyLeader.username)
            .addField(
              "Party Members",
              partyMembers.map((member) => member.username).join("\n")
            );

          message.channel.send(partyEmbed);
          break;

        default:
          message.channel.send(
            "Invalid subcommand. Use `create`, `invite`, `leave`, `join`, `leader`, or `view`."
          );
          break;
      }
    }
  },
};
