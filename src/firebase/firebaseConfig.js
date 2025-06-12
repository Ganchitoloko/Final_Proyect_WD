import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWs1rJhGMcQO1KxI8jhTa9j9eu6ddmC-U",
  authDomain: "sittebuddy.firebaseapp.com",
  projectId: "sittebuddy",
  storageBucket: "sittebuddy.appspot.com",
  messagingSenderId: "661272699122",
  appId: "1:661272699122:web:dd9ab1321c60d5770e306b",
  measurementId: "G-6WP3RVE0PM"
};

const app = initializeApp(firebaseConfig);

export default app;
