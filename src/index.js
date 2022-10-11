import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DAppProvider, Goerli } from '@usedapp/core'


const config = {
  networks: [Goerli],
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: 'https://eth-goerli.g.alchemy.com/v2/33CyeLi1BoHljETDGX3ThJ-7V1yeZmKD',
  },
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <DAppProvider config={config}>
            <App />
  </DAppProvider>
);
