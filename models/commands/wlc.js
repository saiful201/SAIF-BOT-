const fs = require("fs");
const path = require("path"); // Import the path module

module.exports.config = {
  name: "admin2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "admin",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  const { threadID, messageID } = event;
  const triggerWords = ["WELCOME", "Welcome", "Wlc", "welcome"]; // Array for easier checking

  if (triggerWords.some(word => event.body.indexOf(word) === 0)) {
    const imagePath = path.join(__dirname, "noprefix", "wlc.jpeg"); // Use path.join for cross-platform compatibility

    // Check if the file exists *before* trying to read it
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("Error: wlc.jpeg not found!", err);
        api.sendMessage("Welcome to the group!", threadID, messageID); // Fallback message
      } else {
        const msg = {
          body: "😻 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐎𝐔𝐑 𝐆𝐑𝐎𝐔𝐏 😻",
          attachment: fs.createReadStream(imagePath),
        };
        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🙈", messageID, (err) => {}, true); // Use messageID directly
      }
    });
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};

