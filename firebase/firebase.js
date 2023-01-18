
const firebaseConfig = {
  apiKey: 'AIzaSyDlj4rmHO_kq3Z6ya2zqgGdP0AUg2znX9I',
  authDomain: 'memory-card-app.firebaseapp.com',
  databaseURL: 'https://memory-card-app.firebaseio.com',
  projectId: 'memory-card-app',
  storageBucket: 'memory-card-app.appspot.com',
  messagingSenderId: '174804862889',
  appId: '1:174804862889:web:64474a9820dd9d87c6e6b8',
  measurementId: 'G-9ENQL2QJRE'
};

export const initializeFirebase = () => firebase.initializeApp(firebaseConfig);
