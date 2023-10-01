import { useSDK } from '@metamask/sdk-react'
import React, { useState } from 'react'
import abi from './gitarg.json'
import Web3 from 'web3'
import './App.css';
import logo from './img/SVG/argctl.svg';

const contract = '0xb85C685226095d20EA648C35B9CCE6C1556006A5'
function App() {
  const { sdk, connected, connecting, provider, chainId } = useSDK()

  const [account, setAccount] = useState()
  const connect = async () => {
    try {
      const accounts = await sdk.connect()
      setAccount(accounts[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Interface Tar Git, Git Tar Fascinator
        </p>
        <button onClick={connect}>connect</button>
        {account && <div> {account} </div>}
        <p>test your wallet, teller wait start</p>
      </header>
    </div>
  );
}

export default App;
