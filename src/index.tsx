import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechProvider } from '@speechly/react-client';
import App from './App';
import 'modern-normalize/modern-normalize.css';
import './styles.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import awsconfig from './aws-exports.js';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';

import {BrowserRouter as Router} from "react-router-dom"
Amplify.configure(awsconfig);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Authenticator.Provider>

    <SpeechProvider
      appId="0eb3e030-5d97-40c7-96cd-9df5a3f0d325"
      debug={true}
      logSegments={false}
      vad={{ enabled: false }}
    >
        <Provider store={store}>
            <App />
        </Provider>
      
     
    </SpeechProvider>
    </Authenticator.Provider>
);
