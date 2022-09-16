import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ethers } from 'ethers';
import { NavLink, Router, Routes, Route } from 'react-router-dom';

import '../css/global.css';
import '../css/navbar.css';

export default function Navbar() {

  const { address, setAddress, isConnected, setIsConnected } = useContext(DataContext);

  const connect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log('Connected to Ethereum');
        setIsConnected(true);
        let account = await window.ethereum.request({ method: "eth_accounts" });
        setAddress(account[0]);
      } catch (error) {
        console.log('Error connecting to Ethereum');
      }
    } else {
      console.log('No Metamask detected');
    }
  }

  const formatAddress = (address) => {
    if (address.length === 42) {
      return address.substring(0, 6) + "..." + address.substring(38);
    } else {
      return address;
    }
  }

  const disconnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log('Disconnected from Ethereum');
        setIsConnected(false);
        setAddress('');
      } catch (error) {
        console.log('Error disconnecting from Ethereum');
      }
    } else {
      console.log('No Metamask detected');
    }
  }

  return (
      <nav className="nav">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <NavLink to='/' className="logo">
                <img src="img/logo/evmos-logo.svg" alt="logo" />
              </NavLink>
            </div>
            <div className="col-6">
              <img src="/bell.svg" alt="bell" className='bell' />
              <NavLink to='/dashboard' className='nav-a'>
                Dashboard
              </NavLink>
              <button onClick="" className='nav-button nav-expense'>Create Expense</button>
              {isConnected ? (
                <button onClick="">{formatAddress(address)}</button>
              ) : (
                <button onClick={connect}>Connect</button>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
}

