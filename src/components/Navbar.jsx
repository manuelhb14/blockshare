import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import { NavLink, Router, Routes, Route } from 'react-router-dom';

import '../css/global.css';
import '../css/navbar.css';

export default function Navbar() {

  const { address, setAddress, isConnected, setIsConnected, createExpense, setCreateExpense } = useContext(DataContext);

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
      <NavLink to='/'>
        <img src="img/logo/evmos-logo.svg" alt="logo" className='evmos-logo nav-logo' />
      </NavLink>
      <img src="/bell.svg" alt="bell" className='bell' />
      <NavLink to='/dashboard' className='nav-a'>
        Dashboard
      </NavLink>
      {isConnected ? (
        <button onClick={() => setCreateExpense(true)}>Create expense</button>
      ) : null}
      {isConnected ? (
        <button onClick="">{formatAddress(address)}</button>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
      {createExpense ? (
        <Modal isOpen={createExpense} onRequestClose={() => setCreateExpense(false)}>
          <h2>Create a shared expense</h2>
          <p>Name</p>
          <input type="text" />
          <p>Description</p>
          <input type="text" />
          <p>Image</p>
          <input type="file" />
          <p>Amount</p>
          <input type="number" />
          <p>Token</p>
          <select name="token" id="token">
            <option value="0">EVMOS</option>
            <option value="1">ATOM</option>
            <option value="2">USDC</option>
          </select>
          <p>Deadline</p>
          <input type="date" />
          <p>Debtors</p>
          <input type="text" />
          <button onClick={() => setCreateExpense(false)}>Cancel</button>
          <button onClick={() => setCreateExpense(false)}>Create</button>
        </Modal>
      ) : null}
    </nav>
  );
}

