/* chatbot.js - moved out of html so CSP allows it */

/* helper: detect indexedDB availability */
function idbAvailable() {
  try {
    return !!window.indexedDB;
  } catch (e) {
    return false;
  }
}

(function () {
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const chatClose = document.getElementById("chatClose");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");
  const chatBadge = document.getElementById("chatBadge");

  const sessionId =
    "session-" + Date.now() + "-" + Math.random().toString(36).slice(2, 11);
  const userId = "user-" + Math.random().toString(36).slice(2, 11);

  let WEBHOOK_URL = null;

  /* ensure welcome only displays once */
  let welcomeShown = false;

  // Receive config from parent
  window.addEventListener("message", function (e) {
    const data = e.data || {};
    if (data && data.type === "APP_INIT") {
      if (data.webhook) WEBHOOK_URL = data.webhook;
      if (data.token) sessionStorage.setItem("SOMO_TOKEN", data.token);

      // Debug log
      try {
        window.parent.postMessage(
          { type: "CHAT_LOG", msg: "APP_INIT received in iframe" },
          "*"
        );
      } catch (err) {}

      // === SHOW CUSTOM WELCOME MESSAGE ===
      if (!welcomeShown) {
        welcomeShown = true;

        const welcomeText =
          "👋 Habari! I'm SomoBot, your bilingual assistant for SomoLink.\n\n" +
          "I can help you with:\n" +
          "• Internet packages and pricing\n" +
          "• M-PESA payment instructions\n" +
          "• Connectivity troubleshooting\n" +
          "• Account registration\n\n" +
          "How can I assist you today?";

        addMessage(welcomeText, "bot");
      }
    }
  });

  const hasIDB = idbAvailable();
  if (!hasIDB) {
    console.warn("IndexedDB not available. Using memory only.");
    try {
      window.parent.postMessage(
        { type: "CHAT_LOG", msg: "IDB unavailable in iframe" },
        "*"
      );
    } catch (err) {}
  }

  // Toggle open / close
  chatToggle?.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    const open = chatWindow.classList.contains("open");
    chatWindow.setAttribute("aria-hidden", !open);
    chatToggle.setAttribute("aria-expanded", open);

    if (!open) chatBadge.classList.remove("show");
  });

  chatClose?.addEventListener("click", () => {
    chatWindow.classList.remove("open");
    chatWindow.setAttribute("aria-hidden", "true");
    chatToggle.setAttribute("aria-expanded", "false");

    window.parent.postMessage({ type: "CHAT_CLOSE" }, "*");
  });

  chatSend?.addEventListener("click", sendMessage);
  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, "user");
    chatInput.value = "";
    showTypingIndicator();

    if (!WEBHOOK_URL) {
      hideTypingIndicator();
      addMessage(
        "Chatbot not configured. Please open from the main app.",
        "bot"
      );
      return;
    }

    try {
      const token = sessionStorage.getItem("SOMO_TOKEN");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = "Bearer " + token;

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ message, sessionId, userId }),
      });

      const data = await res.json();
      hideTypingIndicator();

      if (data && data.success !== false && data.response)
        addMessage(data.response, "bot");
      else addMessage("Sorry, I encountered an error. Try again.", "bot");
    } catch (err) {
      console.error(err);
      hideTypingIndicator();
      addMessage(
        "Sorry, I couldn't connect to the server. Please check the webhook.",
        "bot"
      );
    }
  }

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = sender === "user" ? "👤" : "🤖";

    const content = document.createElement("div");
    content.className = "message-content";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.innerHTML = text.replace(/\n/g, "<br>");

    const time = document.createElement("div");
    time.className = "message-time";
    time.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    content.appendChild(bubble);
    content.appendChild(time);
    msg.appendChild(avatar);
    msg.appendChild(content);
    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (!chatWindow.classList.contains("open") && sender === "bot")
      chatBadge.classList.add("show");
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "message typing";
    indicator.id = "typingIndicator";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "🤖";

    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator show";
    typingDiv.innerHTML =
      '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    indicator.appendChild(avatar);
    indicator.appendChild(typingDiv);
    chatMessages.appendChild(indicator);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
  }
})();
