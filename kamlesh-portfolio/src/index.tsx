import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker with enhanced PWA features
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('[PWA] ✅ Service Worker registered successfully. App is now available offline!');
  },
  onUpdate: (registration) => {
    console.log('[PWA] 🔄 New version available! Update notification will be shown.');
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
