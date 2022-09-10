import React, { useContext } from 'react';
import { DataContext } from './context/DataContext';
import { ethers } from 'ethers';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

import './css/main.css'

function App() {

  const { address, setAddress, isConnected, setIsConnected } = useContext(DataContext);

  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
