import { useSDK } from '@metamask/sdk-react'
import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import abi from './gitarg.json'
import './App.css';
import logo from './img/SVG/argctl.svg';

//const arg = '0xb85C685226095d20EA648C35B9CCE6C1556006A5'
const arg = process.env.REACT_APP_ARG
console.log({ arg })
//console.log('REACT_APP_ARG: ', process.env.REACT_APP_ARG)
let provider
let signer
let contract
function App() {
  const { sdk, connected, connecting, chainId } = useSDK()
  const [account, setAccount] = useState()
  const [symbol, setSymbol] = useState()
  const [decimals, setDecimals] = useState()
  const [name, setName] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const [balanceOf, setBalanceOf] = useState()

  const connect = async () => {
    try {
      const accounts = await sdk.connect()
      setAccount(accounts[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };
  
  const getSymbol = async () => setSymbol(await contract.symbol())
  const getDecimals = async () => setDecimals((await contract.decimals()).toString())
  const getName = async () => setName(await contract.name())
  const getTotalSupply = async () => setTotalSupply((await contract.totalSupply()).toString())
  const getBalanceOf = async () => setBalanceOf((await contract.balanceOf(account)).toString())
  
  useEffect(() => {
    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider = new ethers.BrowserProvider(window.ethereum)
    provider.getSigner().then(s => {
      signer = s 
      contract = new ethers.Contract(arg, abi, signer)
    })
    //setProvider(prov)
    /*provider.getSigner().then(s => {
      signer = s
    })
    */
    //console.log({ signer })
  }, [])
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
        {account && <div><h2>contract</h2><button onClick={getSymbol}>symbol</button></div>}
        {symbol && <div><h3>{symbol}</h3><button onClick={getDecimals}>decimals</button></div>}
        {decimals && <div><h3>{decimals}</h3><button onClick={getName}>name</button></div>}
        {name && <div><h3>{name}</h3><button onClick={getTotalSupply}>totalSupply</button></div>}
        {totalSupply && <div><h3>{totalSupply}</h3><button onClick={getBalanceOf}>balanceOf(me)</button></div>}
        {balanceOf && <div><h3>{balanceOf}</h3><div>(decimals) float</div></div>}
      </header>
    </div>
  );
}

export default App;
