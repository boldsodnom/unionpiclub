// emotionGraph.js — Firestore live data ашиглах хувилбар (Chart.js)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

  // Firebase Config (UnionPiClub)
  const firebaseConfig = {
    apiKey: "AIzaSyAN6glFtcpkblLO153R4voEqCq3Bkd4BvQ",
    authDomain: "unionpiclub-core.firebaseapp.com",
    projectId: "unionpiclub-core"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Chart init with dummy data
  const chartData = {
    labels: emotionLabels,
    datasets: [{
      label: "Emotion Frequency",
      data: [0, 0, 0, 0, 0],
      backgroundColor: emotionLabels.map(emotion => emotionColors[emotion]),
      borderColor: "#343a40",
      borderWidth: 1,
      borderRadius: 5
    }]
  };

  const chartConfig = {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  };

  const chartInstance = new Chart(ctx, chartConfig);

  // Realtime Firestore listener
  const colRef = collection(db, "emotion_data");

  onSnapshot(colRef, (snapshot) => {
    const counts = { Joy: 0, Sad: 0, Curious: 0, Inspired: 0, Neutral: 0 };

    snapshot.forEach(doc => {
      const emotion = doc.data().emotion;
      if (counts[emotion] !== undefined) counts[emotion]++;
    });

    // Update chart data
    chartInstance.data.datasets[0].data = emotionLabels.map(label => counts[label]);
    chartInstance.update();
  });

});