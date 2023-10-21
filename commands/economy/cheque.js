const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");

module.exports = {
  name: "cheque",
  aliases: ["cheque"],
  description: "To create a gold coins cheque",
  usage: "cheque create <amount> <@user> OR cheque redeem <code>",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    let targetUser = message.mentions.users.first();
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);

    if (!tokenDB) {
      return message.channel.send(
        `${user} your token is not registered yet, type 'token me.x' to set your Mysterionix token`
      );
    }

    if (args[0] === "create") {
      let amount = parseFloat(args[1]);

      if (isNaN(amount) || amount <= 0) {
        return message.channel.send(
          `<@${user.id}> Please provide a valid positive amount for the cheque`
        );
      }

      let usermoney = db.fetch(`money_${tokenDB}.pocket`) || 0;

      if (amount * 1.5 > usermoney) {
        return message.channel.send(
          `<@${user.id}> You don't have enough money to create a cheque for this amount`
        );
      }

      if (!targetUser) {
        return message.channel.send(
          `<@${user.id}> Please mention a user to give the cheque`
        );
      }

      let code = Math.floor(Math.random() * 1000000);
      let taxAmount = amount * 0.15;

      let amountInWords = convertAmountToWords(amount);

      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Cheque")
        .setDescription(`Sent a cheque to ${targetUser}`)
        .addField(`Amount`, `${amount.toFixed(2)} Gold coins`);

      message.channel.send(embed);

      let canvas = Canvas.createCanvas(1200, 600);
      let ctx = canvas.getContext("2d");

      // Background Patterns
      ctx.fillStyle = "#ffffe6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dotted Pattern Lines
      ctx.strokeStyle = "#ddd";
      ctx.setLineDash([5, 5]);
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Border
      ctx.strokeStyle = "#000";
      ctx.setLineDash([]);
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Header Line
      ctx.beginPath();
      ctx.moveTo(30, 120);
      ctx.lineTo(canvas.width - 30, 120);
      ctx.stroke();

      // Header
      ctx.fillStyle = "#000";
      ctx.font = "bold 40px Arial";
      ctx.fillText("Mysterionix Bank", 30, 90);

      // Sender Line
      ctx.beginPath();
      ctx.moveTo(30, 180);
      ctx.lineTo(canvas.width - 30, 180);
      ctx.stroke();

      // Sender
      ctx.font = "bold 30px Arial";
      ctx.fillText(`Sender: ${user.tag}`, 30, 150);

      // Payee Line
      ctx.beginPath();
      ctx.moveTo(30, 240);
      ctx.lineTo(canvas.width - 30, 240);
      ctx.stroke();

      // Payee
      ctx.font = "bold 30px Arial";
      ctx.fillText(`Pay to: ${targetUser.tag}`, 30, 210);

      // Amount Line
      ctx.beginPath();
      ctx.moveTo(30, 300);
      ctx.lineTo(canvas.width - 30, 300);
      ctx.stroke();

      // Amount
      ctx.font = "bold 30px Arial";
      ctx.fillText(`Amount: ${amountInWords} gold coins only`, 30, 270);

      // Serial Number
      ctx.font = "italic 24px Arial";
      ctx.fillText(`Serial number: ${code}`, canvas.width - 300, 90);

      // Sender's Signature Line
      let senderSignatureLineStart = canvas.width / 4;
      let senderSignatureLineEnd = canvas.width / 2 - 30;

      ctx.beginPath();
      ctx.moveTo(senderSignatureLineStart, 500);
      ctx.lineTo(senderSignatureLineEnd, 500);
      ctx.stroke();

      // "Sender's Signature" Text
      let senderText = "Sender's Signature";
      let senderTextWidth = ctx.measureText(senderText).width;
      ctx.font = "italic 24px Arial";
      ctx.fillText(
        senderText,
        (senderSignatureLineEnd + senderSignatureLineStart - senderTextWidth) /
          2,
        480
      );

      // User's Logo
      const userLogoURL = user.avatarURL({ format: "png" });
      const userLogo = await Canvas.loadImage(userLogoURL);

      // Draw Circular Image for User's Logo
      ctx.save();
      const userLogoX =
        (senderSignatureLineEnd + senderSignatureLineStart - 50) / 2; // Adjust 50 based on the size of your logo
      const userLogoY = 525;
      ctx.beginPath();
      ctx.arc(userLogoX, userLogoY + 25, 25, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(userLogo, userLogoX - 25, userLogoY, 50, 50);
      ctx.restore();

      // Receiver's Signature Line
      let receiverSignatureLineStart = canvas.width / 2 + 30;
      let receiverSignatureLineEnd = (3 * canvas.width) / 4;

      ctx.beginPath();
      ctx.moveTo(receiverSignatureLineStart, 500);
      ctx.lineTo(receiverSignatureLineEnd, 500);
      ctx.stroke();

      // "Receiver's Signature" Text
      let receiverText = "Receiver's Signature";
      let receiverTextWidth = ctx.measureText(receiverText).width;
      ctx.font = "italic 24px Arial";
      ctx.fillText(
        receiverText,
        (receiverSignatureLineEnd +
          receiverSignatureLineStart -
          receiverTextWidth) /
          2,
        480
      );

      // Draw Circular Image for Receiver's Logo
      const receiverLogoURL = targetUser.avatarURL({ format: "png" });
      const receiverLogo = await Canvas.loadImage(receiverLogoURL);

      // Draw Circular Image
      ctx.save();
      const receiverLogoX =
        (receiverSignatureLineEnd + receiverSignatureLineStart - 50) / 2; // Adjust 50 based on the size of your logo
      const receiverLogoY = 525;
      ctx.beginPath();
      ctx.arc(receiverLogoX, receiverLogoY + 25, 25, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(receiverLogo, receiverLogoX - 25, receiverLogoY, 50, 50);
      ctx.restore();

      targetUser.send(
        new Discord.MessageAttachment(canvas.toBuffer(), "cheque.png")
      );
      db.subtract(`money_${tokenDB}.pocket`, amount + taxAmount);
      db.set(`cheque_${code}`, {
        user: user.id,
        amount: amount,
        time: Date.now(),
      });
    } else if (args[0] === "redeem") {
      let code = args[1];

      if (!code) {
        return message.channel.send(
          `<@${user.id}> Please provide the code of the cheque to redeem`
        );
      }

      let cheque = db.fetch(`cheque_${code}`);

      if (!cheque) {
        return message.channel.send(`<@${user.id}> This cheque does not exist`);
      }

      if (cheque.redeemed) {
        return message.channel.send(
          `<@${user.id}> This cheque has already been redeemed`
        );
      }

      if (Date.now() - cheque.time > 259200000) {
        return message.channel.send(
          `<@${user.id}> This cheque has expired and can't be redeemed anymore`
        );
      }

      let amount = cheque.amount;
      db.add(`money_${tokenDB}.pocket`, amount);
      db.set(`cheque_${code}.redeemed`, true);

      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Cheque Redeemed")
        .setDescription(
          `**${user}**, you have redeemed a cheque for **${amount} gold coins**.`
        );

      message.channel.send(embed);
    } else {
      message.channel.send(
        `<@${user.id}>
        **TO CREATE** a Cheque and send - 'cheque create <amount> <@user>'
        **TO REDEEM** a Cheque - 'cheque redeem <code>'
        `
      );
    }
  },
};

function convertAmountToWords(amount) {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  let words = "";

  if (amount >= 1000000) {
    words += convertAmountToWords(Math.floor(amount / 1000000)) + " Million ";
    amount %= 1000000;
  }

  if (amount >= 1000) {
    words += convertAmountToWords(Math.floor(amount / 1000)) + " Thousand ";
    amount %= 1000;
  }

  if (amount >= 100) {
    words += convertAmountToWords(Math.floor(amount / 100)) + " Hundred ";
    amount %= 100;
  }

  if (amount > 0) {
    if (words !== "") words += "and ";

    if (amount < 10) {
      words += units[amount];
    } else if (amount < 20) {
      words += teens[amount - 10];
    } else {
      words += tens[Math.floor(amount / 10)];
      if (amount % 10 > 0) {
        words += "-" + units[amount % 10];
      }
    }
  }

  return words.trim();
}
