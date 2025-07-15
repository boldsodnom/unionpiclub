import { submitRatingToFirestore } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
  const mentorMessages = [
    "Сайн байна уу, нааш ир! Энэ бол таны анхны Capsule.",
    "Бид хамтдаа таны сэтгэл хөдлөл, санаа бодлыг ойлгож сурах болно.",
    "Capsule-ийн төгсгөлд сэтгэгдлээ үлдээгээрэй. Та чухал хүн шүү!"
  ];

  const container = document.querySelector("#chat-container");

  function createBubble(text, sender = "mentor") {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
  }

  let i = 0;
  function showMentorMessages() {
    if (i < mentorMessages.length) {
      setTimeout(() => {
        createBubble(mentorMessages[i], "mentor");
        i++;
        showMentorMessages();
      }, 1600);
    } else {
      setTimeout(showUnlockPrompt, 1000);
    }
  }

  function showUnlockPrompt() {
    const prompt = document.createElement("div");
    prompt.className = "unlock-prompt";
    prompt.innerHTML = `
      🧬 Capsule нээхэд таны гишүүнчлэлийн түвшин шаардагдана.<br><br>
      <strong>Platinum гишүүнчлэл:</strong> Нээх боломжтой<br>
      <button id="unlock-btn" class="btn-glow">Capsule нээх</button>
    `;
    container.appendChild(prompt);
    container.scrollTop = container.scrollHeight;
    document.querySelector("#unlock-btn").addEventListener("click", unlockCapsule);
  }

  function unlockCapsule() {
    createBubble("🎉 Capsule нээгдлээ!", "mentor");
    setTimeout(showEmotionRating, 1000);
  }

  function showEmotionRating() {
    const rating = document.createElement("div");
    rating.className = "rating-stars";
    rating.innerHTML = "🧠 Та Capsule-ийн сэтгэл хөдлөлийг хэрхэн мэдэрсэн бэ?<br>";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.innerHTML = "★";
      star.dataset.value = i;
      star.classList.add("star");
      rating.appendChild(star);
    }

    container.appendChild(rating);
    container.scrollTop = container.scrollHeight;

    document.querySelectorAll(".rating-stars .star").forEach(star => {
      star.addEventListener("click", () => {
        document.querySelectorAll(".rating-stars .star").forEach(s => s.classList.remove("selected"));
        star.classList.add("selected");

        const ratingValue = star.dataset.value;
        const capsuleId = "test_capsule_001";
        submitRatingToFirestore(capsuleId, ratingValue);
        alert(`Сэтгэл хөдлөлийн үнэлгээ бүртгэгдлээ: ${ratingValue} од! 🌟`);
      });
    });
  }

  showMentorMessages();
});