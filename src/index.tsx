import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import 'modern-normalize/modern-normalize.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SpeechProvider
      appId="0eb3e030-5d97-40c7-96cd-9df5a3f0d325"
      debug={true}
      logSegments={true}
      vad={{ enabled: false }}
    >
      <App />
    </SpeechProvider>
  </React.StrictMode>
);
