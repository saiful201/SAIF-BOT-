const got = require('got');
const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "yt",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ARIF BABU",
    description: "Search and download music from YouTube.",
    commandCategory: "Entertainment",
    usages: "[search term]",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    const searchTerm = args.join(" ");
    if (!searchTerm) {
      return api.sendMessage(
        "Please provide a search term. Example: music tere bin",
        event.threadID,
        event.messageID
      );
    }

    api.sendMessage(`Searching YouTube for music "${searchTerm}"...`, event.threadID, event.messageID);

    try {
      const searchUrl = `https://shankar-sir-ytd.onrender.com/buscar?text=${encodeURIComponent(searchTerm)}`;
      const response = await got(searchUrl, { responseType: 'json' });

      if (!response.body.success || !response.body.data || response.body.data.length === 0) {
        return api.sendMessage("No results found for your search.", event.threadID, event.messageID);
      }

      const topResult = response.body.data[0]; // Take the first result
      const { title, url } = topResult;

      // Download and send the audio
      downloadAndSendMusic(url, title, api, event);
    } catch (e) {
      console.error("Error during YouTube search:", e);
      api.sendMessage(
        "Failed to search or download music. Please try again later.",
        event.threadID,
        event.messageID
      );
    }
  },
};

const downloadAndSendMusic = async (url, title, api, event) => {
  const audioPath = './youtube_audio.mp3';
  try {
    const apiUrl = `https://shankar-sir-ytd2.onrender.com/api/ytdl?url=${encodeURIComponent(url)}&type=mp3`;
    console.log("Fetching audio from API:", apiUrl);

    const response = await got(apiUrl, { responseType: "json", timeout: 30000 });
    console.log("API Response:", response.body);

    const downloadUrl = response.body.data.download;
    if (!downloadUrl) {
      throw new Error("No download URL found in the API response.");
    }

    const audioStream = got.stream(downloadUrl);
    const fileStream = fs.createWriteStream(audioPath);
    audioStream.pipe(fileStream);

    fileStream.on("finish", async () => {
      console.log("Audio file downloaded successfully.");

      // Send the title and the audio attachment after download completes
      await api.sendMessage(
        {
          body: `Here is your downloaded music: ${title}`,
          attachment: fs.createReadStream(audioPath),
        },
        event.threadID,
        event.messageID
      );

      fs.unlinkSync(audioPath);
      console.log("Audio file sent and deleted.");
    });

    fileStream.on("error", (err) => {
      console.error("Error writing file:", err);
      api.sendMessage(
        "Failed to save audio file. Please try again later.",
        event.threadID,
        event.messageID
      );
    });
  } catch (e) {
    console.error("Error downloading music:", e);
    api.sendMessage(
      "Failed to download the music. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};