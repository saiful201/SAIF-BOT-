const emojiResponses = {
  "Bot Bhay": {
    "OWNER": [
      "क्या सोच रहे हो दीदी ",
      "दीदी जी कहां थे आप ",
      "दीदी आई लव यू ❤️",
      "हां दीदी बताइए मैं यही हूं बताइए क्या हुआ "
    ]
  },
  "Bhai": {
     "OWNER": [
      "क्या सोच रही हो मेरी प्यारी दीदी जी",
      "दीदी आप आ गये ",
      "दीदी जी ज्यादा ना सोचा करो मैं यही हूं 🫣❤️",
     "दीदी जी आई मिस यू ",
      "दीदी जी आर्डर दीजिए क्या करना है ❤️",
      "दीदी जी मैं आपका गोलू मोलू हूं ना ",
      "दीदी जी मेरा शादी कब करोगे ",
      "क्या हुआ दीदी जी ",
      "दीदी जी आपको पता मेरा बर्थडे कब है ",
      "दीदी मेरे साथ घूमने चलोगे 🫣❤️",
      "दीदी मुझे चॉकलेट चाहिए ",
      "दीदी मेरे को खिलौने चाहिए खेलने के लिए आप दिलआओगे ना ❤️",
      "दीदी मुझे पिज़्ज़ा खाना है ",
      "क्या सोच रहे हो बॉस ",
      "दीदी में हमेशा आपके साथ हूं ",
      "दीदी पापा मम्मी और आपके साथ मुझे ना एक फोटो क्लिक करनी है ",
      "दीदी कुछ खाने को दो ना ",
      "दीदी आप मुझसे ना प्यार नहीं करते ",
      "दीदी आप कितनी गंदी हो आप मुझे बाहर खेलने भी नहीं जाने देते",
      "दीदी आपका सिर दर्द कर रहा होगा ना मैं आपका सिर दबा दूं ❤️",
      "दीदी आपने मेडिसन ली ",
      "दीदी डैडी को बोलो ना मुझ पर गुस्सा नहीं करें ",
      "सोना दीदी  सिर्फ मेरी है ",
      "दीदी चॉकलेट खाओगे ❤️",
      "दीदी मेरे मम्मी कहां है 🫣",
      "दीदी मुझे भी लूडो खेलना है ",
    ]
  }
};

module.exports.config = {
  name: "SAURABH-BOT-10",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAURABH XD",
  description: "MADE BY SAURABH THAKUR",
  commandCategory: "No command marks needed",
  cooldowns: 0,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  const lowercaseBody = body.toLowerCase();

  // Create a lookup table for emojis
  const emojiLookup = {};
  for (const emoji in emojiResponses) {
    emojiLookup[emoji.toLowerCase()] = emojiResponses[emoji];
  }

  // Find the matching emoji
  const matchedEmoji = Object.keys(emojiLookup).find(emoji => lowercaseBody.includes(emoji));

  if (matchedEmoji) {
    try {
      const ThreadInfo = await api.getThreadInfo(threadID);
      const user = ThreadInfo.userInfo.find(user => user.id === senderID);

      const botOwnerID = "100008372476102"; // Your bot owner UID
      let responseArray;

      if (senderID === botOwnerID) {
        responseArray = emojiLookup[matchedEmoji]["OWNER"];
      } else {
        // Determine user's gender and select appropriate response array
        const gender = user.sex ? user.sex.toLowerCase() : null;
        if (gender === "male") {
          responseArray = emojiLookup[matchedEmoji]["MALE"] || emojiLookup[matchedEmoji]["DEFAULT"];
        } else if (gender === "female") {
          responseArray = emojiLookup[matchedEmoji]["FEMALE"] || emojiLookup[matchedEmoji]["DEFAULT"];
        } else {
          responseArray = emojiLookup[matchedEmoji]["DEFAULT"];
        }
      }

      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
      api.sendMessage({ body: randomResponse }, threadID, messageID);
    } catch (error) {
      console.error("Error handling event:", error);
      // Handle errors gracefully, e.g., send a default message
      api.sendMessage({ body: "Oops, something went wrong!" }, threadID, messageID);
    }
  }
};

module.exports.run = function() {};
