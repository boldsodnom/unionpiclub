document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: "service_qawf2pj",
      template_id: "template_1y0ln0l",
      user_id: "LwPJe_lm-0oF945Fg",
      template_params: data,
    }),
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("response-message").innerText = "✅ Амжилттай илгээгдлээ!";
        document.getElementById("contact-form").reset();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .catch((error) => {
      document.getElementById("response-message").innerText = "❌ Алдаа гарлаа: " + error.message;
    });
});