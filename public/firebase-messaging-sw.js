// Import the functions you need from the SDKs you need

importScripts(
	'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js'
);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
	console.log('Recibiste mensaje mientras estabas ausente');
	// previo a mostrar notificación
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo.png',
	};

	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});
