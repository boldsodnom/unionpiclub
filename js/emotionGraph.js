// emotionGraph.js — Renders Emotion Heatmap Graph (using Chart.js)

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("emotionGraph");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const emotionLabels = ["Joy", "Sad", "Curious", "Inspired", "Neutral"];
  const emotionColors = {
    Joy: "#FFE066",
    Sad: "#6C757D",
    Curious: "#74C0FC",
    Inspired: "#63E6BE",
    Neutral: "#CED4DA"
  };

  // 🔁 Temporary static data — Firestore холболт хожим хийхэд солигдоно
  const emotionData = {
    labels: emotionLabels,
    datasets: [{
      label: "Emotion Frequency",
      data: [12, 5, 8, 15, 6],
      backgroundColor: emotionLabels.map(emotion => emotionColors[emotion]),
      borderColor: "#343a40",
      borderWidth: 1,
      borderRadius: 5
    }]
  };

  const emotionConfig = {
    type: "bar",
    data: emotionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 10
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `🧠 ${context.label}: ${context.raw} удаа`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              size: 14
            }
          },
          grid: {
            color: "rgba(255,255,255,0.1)"
          }
        },
        x: {
          ticks: {
            font: {
              size: 14
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  };

  new Chart(ctx, emotionConfig);
});