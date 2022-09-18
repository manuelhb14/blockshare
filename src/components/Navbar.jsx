import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import { NavLink, Router, Routes, Route } from 'react-router-dom';

import '../css/global.css';
import '../css/navbar.css';

export default function Navbar() {

  const { address, setAddress, isConnected, setIsConnected, createExpense, setCreateExpense } = useContext(DataContext);

  const [expenseName, setExpenseName] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(null);
  const [expenseToken, setExpenseToken] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState(null);
  const [expenseDebtors, setExpenseDebtors] = useState([{ address: "", amount: null }]);


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...expenseDebtors];
    list[index][name] = value;
    setExpenseDebtors(list);
  };

  const handleRemoveClick = index => {
    const list = [...expenseDebtors];
    list.splice(index, 1);
    setExpenseDebtors(list);
  };

  const handleAddClick = () => {
    setExpenseDebtors([...expenseDebtors, { address: "", amount: null }]);
  };

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

  const sendExpense = async () => {
    let expense = {
      name: expenseName,
      amount: parseInt(expenseAmount),
      token: expenseToken,
      date: (Date.now() / 1000).toFixed(0).toString(),
      description: expenseDescription,
      image: expenseCategory,
      owner: address,
      timeLimit: (Date.parse(expenseDate) / 1000).toString(),
      status: "Pending",
      debtors: expenseDebtors.map(debtor => {
        return {
          address: debtor.address,
          amount: parseInt(debtor.amount),
        }
      }
      )
    }
    console.log(expense);
    // post to backend
    await fetch('https://myshare.azurewebsites.net/api/createexpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      }
      )
      .catch((error) => {
        console.error('Error:', error);
      }
      );
    setCreateExpense(false);
  }

  const modalStyle = {
    overlay: {
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'rgba(0,0,0,0.25)'
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
        <Modal isOpen={createExpense} onRequestClose={() => setCreateExpense(false)} className="modal" style={modalStyle}>
          <div className="modal-content container">
            <button onClick={() => setCreateExpense(false)} className="close"><img src="./img/icon/close.svg" alt="close button icon" /></button>
            <div className="top row">
              <h2 className="title">Create a shared expense</h2>
            </div>
            <div className="form-container">
              <div className="form row">
                <div className="form-col col-12">
                  <label for="formName">Name</label>
                  <input id="formName" type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                </div>
              </div>
              {/*<div className="form row">
                <div className="form-col col-12">
                  <label for="formDescription">Description</label>
                  <input id="formDescription" type="text" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
                </div>
              </div>*/}
              <div className="form row">
                <div className="form-col col-6">
                  <label for="token">Token</label>
                  <select name="token" id="token" value={expenseToken} onChange={(e) => setExpenseToken(e.target.value)}>
                    <option value="EVMOS">EVMOS</option>
                    <option value="ATOM">ATOM</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
                <div className="form-col col-6">
                  <label for="formTotal">Total</label>
                  <input id="formTotal" type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
                </div>
              </div>
              <div className="form row">
                <div className="form-col col-12">
                  <label for="category">Category</label>
                  <select name="category" id="category" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option value="/food.jpeg">Food</option>
                    <option value="/transport.jpeg">Transport</option>
                    <option value="/entertainment.jpeg">Entertainment</option>
                    <option value="/other.jpeg">Other</option>
                  </select>
                </div>
              </div>
              <div className="form row">
                <div className="form-col col-12">
                  <label for="formDescription">Description</label>
                  <textarea id="formDescription" type="text" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} rows="3" placeholder="The description comes here..." />
                </div>
              </div>
              <div className="form row">
                <div className="form-col col-12">
                  <label for="formDate">Active until</label>
                  <input id="formDate" type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="top row">
              <h2 className="title">Debtors</h2>
            </div>
            <div className="form-container">
              <div className="form row">
                <div className="form-col col-6">
                  <label>Debtor</label>
                </div>
                <div className="form-col col-6">
                  <label>Amount</label>
                </div>
              </div>
              {expenseDebtors.map((x, i) => {
                return (
                  <div className="form row">
                    <div className="form-col col-6">
                      <input name="address" placeholder="0x1234...5678" value={x.address} onChange={e => handleInputChange(e, i)} />
                    </div>
                    <div className="form-col col-5">
                      <input className="" name="amount" placeholder="$" value={x.amount} onChange={e => handleInputChange(e, i)} />
                    </div>
                    <div className="form-col col-1">
                      {expenseDebtors.length !== 1 && <button className="remove-btn mr10" onClick={() => handleRemoveClick(i)}><img src="./img/icon/close.svg" alt="remove debtor button icon" /></button>}
                    </div>
                    <div className="form-col col-12">
                      {expenseDebtors.length - 1 === i && <button className="add-btn" onClick={handleAddClick}>Add new debtor</button>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bottom row">
              <div className="bottom-content">
                <button className="create-btn" onClick={sendExpense}>Create expense</button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </nav>
  );
}

