import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBPN6QuRS1hbkpUkvHlwg8jY_9uvP2jsas',
  authDomain: 'osahonosime-46910.firebaseapp.com',
  projectId: 'osahonosime-46910',
  storageBucket: 'osahonosime-46910.firebasestorage.app',
  messagingSenderId: '129025063036',
  appId: '1:129025063036:web:131e1077d1e6b6b95c31f9',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// // import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// // export const db = getFirestore(app);
