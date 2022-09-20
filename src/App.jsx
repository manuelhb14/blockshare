import React, { useContext } from 'react';
import { DataContext } from './context/DataContext';
import { ethers } from 'ethers';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/Home'
import Dapp from './pages/Dapp';

import './css/global.css'
import './css/dashboard.css'

function App() {

  const { address, setAddress, isConnected, setIsConnected } = useContext(DataContext);

  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/dashboard' element={ <Dapp />} />
        </Routes>
    </Router>
  );
}

export default App;
