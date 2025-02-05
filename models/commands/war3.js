module.exports.config = {
  name: "war3",
  version: "1.0.0",
  hasPermssion: 2, // Only admin can use
  credits: "SAURABH THAKUR",
  description: "Enables war mode where the bot replies only to messages from a specific user",
  commandCategory: "Admin",
  usages: "war3 on [100007994598695] / war off",
  cooldowns: 5,
};

let warMode = false; // Tracks if war mode is active
let targetUID = null; // Stores the UID of the user to target in war mode
const botAdminUIDs = ["100007994598695", "61553634015672"]; // Replace with the actual bot admin UIDs

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, senderID, messageID, body } = event;

  // If war mode is active, reply only to messages from the targeted user
  if (warMode && senderID === targetUID) {
    const name = await Users.getNameUser(senderID);
    const replies = [
      "कुतिया कामिनी एक लात मरुँगा 😹👈", "तू पागल है बे ", "तेरी आंखे फोड़ दुगा कामिनी 😡👈", "जादा हवा मे मत उड़ वरना गिर जाएगी 😹👈", "तुझे मै पेल दुगा 😐", "भसग जा चुड़ैद कही की 😹👈", "तू चुड़ैद है और तेरे सारे आशिक़ भूत है 😹👈", "चल निकल पतली गली से कुतीया 😹👈", " तू एक नम्बर की की गाँधी है हाहाहा 😹👈", " ओये चुड़ैल तू फिर आ गई अपना मुँह पीला करके 😹👈", "मोटी भैस भाग यहाँ से 😐👈", "तू जादा खाना खा खा के मोटी भैस हो गई है बे 😹👈", "एक लात मरुँगा तो गटर मे गिरेगी जाके 😹👈", "तू वही है ना जो मेरे पडोसी के कच्चे धोया करती थी बे 😹👈", "सुनो मेरी बात कल्लो परी तुम एक दिन नाले मे थी पड़ी 😹👈", "तू पागल खाने से कब आई बे 😹👈", "तुमे एक जॉब देता तुम मेरी नाक साफ किया करो रोज़ मै तुमे 2₹ दिया करुँगा 😹👈", "चला भाग वरना एक थप्पड़ मरुंगा सुसु करती घूमेगी 😹👈", "तू एक नम्बर की उल्लू 🦉 की पाठठी है 😹👈", " मछली 🐟 जल की रानी है तू सब की टट्टी 💩साफ करने वाली है 😹👈",
      // ... (same as before)
    ];

    // Generate a random reply
    const reply = replies[Math.floor(Math.random() * replies.length)];

    // Send the reply
    return api.sendMessage(reply.replace("{name}", name), threadID, messageID);
  }
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  const command = args[0];

  // Check if the sender is the bot admin
  if (!botAdminUIDs.includes(senderID)) {
    return api.sendMessage("Only the bot admin can use this command.", threadID, messageID);
  }

  // Command to turn war mode on
  if (command === "on") {
    const uid = args[1]; // Get the UID from the command

    // Ensure a UID was provided
    if (!uid) {
      return api.sendMessage("Please provide a UID to target.", threadID, messageID);
    }

    // Set war mode to active and save the target UID
    warMode = true;
    targetUID = uid;

    return api.sendMessage(`War mode activated! Now targeting UID: ${uid}`, threadID, messageID);
  }

  // Command to turn war mode off
  if (command === "off") {
    // Disable war mode
    warMode = false;
    targetUID = null;

    return api.sendMessage("War mode deactivated.", threadID, messageID);
  }

  return api.sendMessage("Invalid command. Use 'war on [UID]' or 'war off'.", threadID, messageID);
};