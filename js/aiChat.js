// Toggle Chat Visibility
function toggleChat() {
  const chatBox = document.querySelector(".chat-ai-assistant");
  chatBox.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const messages = document.getElementById("chatMessages");

  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (text) {
      appendMessage(text, "user");
      input.value = "";

      // Temporary static Emma AI reply
      setTimeout(() => {
        appendMessage("Би таныг ойлголоо 😊", "emma");
      }, 500);
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});