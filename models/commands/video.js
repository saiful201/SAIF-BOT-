const got = require("got");
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "video",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "NOBITA BABU",
    description: "Search and download videos from YouTube.",
    commandCategory: "Entertainment",
    usages: "[search term]",
    cooldowns: 5,
  },
  run: async function ({ api, event, args }) {
    const searchTerm = args.join(" ");
    if (!searchTerm) {
      return api.sendMessage(
        "Please provide a search term. Example: video tere bin",
        event.threadID,
        event.messageID
      );
    }

    // Notify the user that the bot is searching
    api.sendMessage(`📥 Searching YouTube for video "${searchTerm}"...`, event.threadID, event.messageID);

    try {
      // Search for the video
      const searchUrl = `https://shankar-sir-ytd.onrender.com/buscar?text=${encodeURIComponent(searchTerm)}`;
      const response = await got(searchUrl, { responseType: "json" });

      if (!response.body.success || !response.body.data || response.body.data.length === 0) {
        return api.sendMessage("No results found for your search.", event.threadID, event.messageID);
      }

      // Get the first result
      const topResult = response.body.data[0];
      const { title, url } = topResult;

      // Download and send the video
      downloadAndSendVideo(url, title, api, event);
    } catch (e) {
      console.error("Error during YouTube search:", e);
      api.sendMessage("Failed to search or download video. Please try again later.", event.threadID, event.messageID);
    }
  },
};

const downloadAndSendVideo = async (url, title, api, event) => {
  const videoPath = "./youtube_video.mp4";
  try {
    // API to get the download link
    const apiUrl = `https://shankar-sir-ytd2.onrender.com/api/ytdl?url=${encodeURIComponent(url)}&type=mp4`;
    console.log("Fetching video from API:", apiUrl);

    const response = await got(apiUrl, { responseType: "json", timeout: 30000 });
    console.log("API Response:", response.body);

    const downloadUrl = response.body.data.download;
    if (!downloadUrl) {
      throw new Error("No download URL found in the API response.");
    }

    // Stream and save the video
    const videoStream = got.stream(downloadUrl);
    const fileStream = fs.createWriteStream(videoPath);
    videoStream.pipe(fileStream);

    fileStream.on("finish", async () => {
      console.log("Video file downloaded successfully.");

      // Send the video to the user
      await api.sendMessage(
        {
          body: `Here is your video: ${title}`,
          attachment: fs.createReadStream(videoPath),
        },
        event.threadID,
        event.messageID
      );

      // Clean up the downloaded file
      fs.unlinkSync(videoPath);
      console.log("Video file sent and deleted.");
    });

    fileStream.on("error", (err) => {
      console.error("Error writing file:", err);
      api.sendMessage("Failed to save video file. Please try again later.", event.threadID, event.messageID);
    });
  } catch (e) {
    console.error("Error downloading video:", e);
    api.sendMessage("Failed to download the video. Please try again later.", event.threadID, event.messageID);
  }
};