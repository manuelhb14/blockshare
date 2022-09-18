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
          <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
          <p>Description</p>
          <input type="text" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
          <p>Amount</p>
          <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
          <p>Token</p>
          <select name="token" id="token" value={expenseToken} onChange={(e) => setExpenseToken(e.target.value)}>
            <option value="EVMOS">EVMOS</option>
            <option value="ATOM">ATOM</option>
            <option value="USDC">USDC</option>
          </select>
          <p>Category</p>
          <select name="category" id="category" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="/food.jpeg">Food</option>
            <option value="/transport.jpeg">Transport</option>
            <option value="/entertainment.jpeg">Entertainment</option>
            <option value="/other.jpeg">Other</option>
          </select>
          <p>Active until</p>
          <input type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
          <p>Debtors</p>
          <p>Debtor</p>
          <p>Amount</p>
          {expenseDebtors.map((x, i) => {
            return (
              <div className="">
                <input
                  name="address"
                  placeholder="0x1234...5678"
                  value={x.address}
                  onChange={e => handleInputChange(e, i)}
                />
                <input
                  className=""
                  name="amount"
                  placeholder="$"
                  value={x.amount}
                  onChange={e => handleInputChange(e, i)}
                />
                <div className="">
                  {expenseDebtors.length !== 1 && <button
                    className="mr10"
                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                  {expenseDebtors.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                </div>
              </div>
            );
          })}
          <button onClick={sendExpense}>Create</button>
        </Modal>
      ) : null}
    </nav>
  );
}

