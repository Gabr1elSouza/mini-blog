import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebasee";
const firebaseConfig = {
  apiKey: "AIzaSyBNd8FkzrV6TXysIglqknIwjsMY6nal_oo",
  authDomain: "mini-blog-c0ae5.firebaseapp.com",
  projectId: "mini-blog-c0ae5",
  storageBucket: "mini-blog-c0ae5.appspot.com",
  messagingSenderId: "769273774245",
  appId: "1:769273774245:web:f2a47467116b10b1efcd4c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
