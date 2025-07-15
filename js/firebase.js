// firebase.js — Firebase Auth + Firestore Setup (Modular v10+)

import { submitRatingToFirestore } from './firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 1. Firebase Config (Insert your real config below)
const firebaseConfig = {
  apiKey: "AIzaSyAN6glFtcpkblLO153R4voEqCq3Bkd4BvQ",
  authDomain: "unionpiclub-core.firebaseapp.com",
  projectId: "unionpiclub-core",
  storageBucket: "unionpiclub-core.appspot.com",
  messagingSenderId: "447464759147",
  appId: "1:447464759147:web:1ea6af08abda78b33e362e",
  measurementId: "G-E9LXZJS3MP"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Anonymous Sign-in
signInAnonymously(auth)
  .then(() => {
    console.log("✅ Anonymous sign-in successful.");
  })
  .catch((error) => {
    console.error("❌ Sign-in error:", error.message);
  });

// 4. Track current user
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("👤 Logged in as:", user.uid);
  }
});

// 5. Firestore Submission Function
export async function submitRatingToFirestore(capsuleId, ratingValue) {
  if (!currentUser) {
    console.warn("⚠️ User not authenticated.");
    return;
  }

  try {
    await addDoc(collection(db, "capsule_feedback"), {
      capsule_id: capsuleId,
      user_id: currentUser.uid,
      rating: parseInt(ratingValue),
      timestamp: serverTimestamp()
    });
    console.log(`🌟 Rating submitted (${ratingValue}) for Capsule: ${capsuleId}`);
  } catch (error) {
    console.error("❌ Firestore submission failed:", error);
  }
}