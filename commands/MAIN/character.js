const Discord = require("discord.js");
const ms = require("parse-ms");
const { Client, Intents, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const sizeOf = require("image-size");
const axios = require("axios");
const Canvas = require("canvas");
const jimp = require("jimp");
const gifFrames = require("gif-frames");
const GIFEncoder = require("gif-encoder-2");
const path = require("path");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "character",
  aliases: ["Character", "char"],
  description: "To check character vanity",
  usage: "Character",
  category: "Character",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    const isPoisoned = db.fetch(`isPoisoned_${tokenDB}`) || false;
    if (startFunction) {
      await startFunction(message, args, client);
    }
    if (
      tokenDB &&
      acceptedTOS == true &&
      update == false &&
      banned == false &&
      isPoisoned == false
    ) {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      message.channel.send(`Loading . . .`);
      const goldenGhostKnightSetEquipped = db.fetch(
        `goldenGhostKnightSetEquipped_${tokenDB}`
      );
      const medusaSetEquipped = db.fetch(`medusaSetEquipped_${tokenDB}`);
      const intrepidSetEquipped = db.fetch(`intrepidSetEquipped_${tokenDB}`);
      const arcaneSenseiEquipped = db.fetch(
        `arcaneSenseiSetEquipped_${tokenDB}`
      );
      const frozenSetEquipped = db.fetch(`frozenSetEquipped_${tokenDB}`);
      const dawnfireSetEquipped = db.fetch(`dawnfireSetEquipped_${tokenDB}`);
      const supremeMagicalSetEquipped = db.fetch(
        `supremeMagicalSetEquipped_${tokenDB}`
      );
      class Welcomer {
        constructor({ gif, blur, delay, frame_limit } = {}) {
          this.gif ??= gif;
          this.blur ??= blur;
          this.delay = delay || 50;
          this.frame_limit = frame_limit || 30;
        }

        /* Set background of the image (url) */
        setBackground(background) {
          this.background = background;
          return this;
        }

        /* Set if the background you want to use is a gif or not */
        setGIF(condition) {
          this.gif = condition;
          return this;
        }

        /* Set the blur value if don't then don't use it */
        setBlur(value) {
          this.blur = value;
          return this;
        }

        /* set delay between each frame */
        setDelay(delay) {
          this.delay = delay;
        }

        /* set how many frames you want to extract from gif (default is 30) */
        setFrameLimit(limit) {
          this.frame_limit = limit;
        }

        /* method  to get image size from its url */
        async _getImageSize(url) {
          const data = await axios(url, {
            responseType: "arraybuffer",
          });

          return sizeOf(data.data);
        }

        /* method to render frame */
        async _renderFrame(frame) {
          if (goldenGhostKnightSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (medusaSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (arcaneSenseiEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          } else if (intrepidSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (frozenSetEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          } else if (dawnfireSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (supremeMagicalSetEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          }
          const ctx = canvas.getContext("2d");
          ctx.text = `${user}`;
          const scale = Math.max(
            canvas.width / frame.frameInfo.width,
            canvas.height / frame.frameInfo.height
          );
          const x = canvas.width / 2 - (frame.frameInfo.width / 2) * scale;
          const y = canvas.height / 2 - (frame.frameInfo.height / 2) * scale;

          let background = await jimp.read(frame.getImage()._obj);

          if (this.blur) background.blur(this.blur);

          background = await background.getBufferAsync("image/png");

          ctx.drawImage(
            await Canvas.loadImage(background),
            x,
            y,
            frame.frameInfo.width * scale,
            frame.frameInfo.height * scale
          );

          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          ctx.font = `bold 36px Arial`;
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "start";
          ctx.strokeStyle = "#f5f5f5";

          ctx.font = `bold 25px Arial`;
          ctx.fillStyle = "#FFFFFF";

          return ctx;
        }

        /* method to generate static image */
        async _generateImage() {
          const img = await this._getImageSize(this.background);

          if (goldenGhostKnightSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (medusaSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (arcaneSenseiEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          } else if (intrepidSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (frozenSetEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          } else if (dawnfireSetEquipped == true) {
            var canvas = Canvas.createCanvas(700, 1500);
          } else if (supremeMagicalSetEquipped == true) {
            var canvas = Canvas.createCanvas(1400, 1600);
          }
          const ctx = canvas.getContext("2d");

          const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const x = canvas.width / 2 - (img.width / 2) * scale;
          const y = canvas.height / 2 - (img.height / 2) * scale;

          let background = await jimp.read(this.background);

          if (this.blur) background.blur(this.blur);
          background = await background.getBufferAsync("image/png");

          ctx.drawImage(
            await Canvas.loadImage(background),
            x,
            y,
            img.width * scale,
            img.height * scale
          );

          ctx.strokeRect(0, 0, canvas.width, canvas.height);
          ctx.font = `bold 36px Arial`;
          ctx.fillStyle = "#FFFFFF";
          ctx.text = `${user}`;

          return canvas.toBuffer();
        }

        /* generate image with saved settings */
        async generate() {
          if (!this.gif) return this._generateImage();

          const firstframe = await gifFrames({
            url: this.background,
            frames: 0,
          });
          const cumulative =
            firstframe[0].frameInfo.disposal !== 1 ? false : true;

          let data = await gifFrames({
            url: this.background,
            frames: "all",
            cumulative,
          });
          if (data.length >= this.frame_limit)
            data = data.slice(0, this.frame_limit);

          if (goldenGhostKnightSetEquipped == true) {
            var encoder = new GIFEncoder(700, 1500);
          } else if (medusaSetEquipped == true) {
            var encoder = new GIFEncoder(700, 1500);
          } else if (intrepidSetEquipped == true) {
            var encoder = new GIFEncoder(700, 1500);
          } else if (arcaneSenseiEquipped == true) {
            var encoder = new GIFEncoder(1400, 1600);
          } else if (frozenSetEquipped == true) {
            var encoder = new GIFEncoder(1400, 1600);
          } else if (dawnfireSetEquipped == true) {
            var encoder = new GIFEncoder(700, 1500);
          } else if (supremeMagicalSetEquipped == true) {
            var encoder = new GIFEncoder(1400, 1600);
          }
          encoder.start();
          const frames = await Promise.all(
            data.map((x) => this._renderFrame(x))
          );
          for (let frame of frames) encoder.addFrame(frame);

          encoder.finish();
          return encoder.out.getData();
        }
      }
      const VanitiesFolderPath = path.join(__dirname, "Vanities");

      if (goldenGhostKnightSetEquipped == true) {
        var imagePath = path.join(
          VanitiesFolderPath,
          "goldenGhostKnightSet.gif"
        );
        console.log("Image Path:", imagePath); // Add this line for debugging
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(await image.generate(), "goldenSet.gif"),
          ],
        });
      } else if (medusaSetEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "medusaSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(await image.generate(), "medusaSet.gif"),
          ],
        });
      } else if (intrepidSetEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "intrepidSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(await image.generate(), "intrepidSet.gif"),
          ],
        });
      } else if (arcaneSenseiEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "arcaneSenseiSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(
              await image.generate(),
              "arcaneSenseiSet.gif"
            ),
          ],
        });
      } else if (frozenSetEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "frozenSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(await image.generate(), "frozenSet.gif"),
          ],
        });
      } else if (dawnfireSetEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "dawnfireSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(await image.generate(), "dawnfireSet.gif"),
          ],
        });
      } else if (supremeMagicalSetEquipped == true) {
        var imagePath = path.join(VanitiesFolderPath, "supremeMagicalSet.gif");
        const image = new Welcomer()
          .setBackground(imagePath)
          .setGIF(true)
          .setBlur(0);
        return message.channel.send({
          files: [
            new MessageAttachment(
              await image.generate(),
              "supremeMagicalSet.gif"
            ),
          ],
        });
      } else {
        message.channel.send(`${user} doesnt have any vanity equipped`);
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
    }
  },
};
