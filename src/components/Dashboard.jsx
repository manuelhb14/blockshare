import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { ethers } from 'ethers';
import Modal from 'react-modal';

export default function Dashboard() {

  const { address, isConnected, setIsConnected, expenses, setExpenses, selectedExpense, setSelectedExpense, createExpense } = useContext(DataContext);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");

  const tokenMap = {
    "EvmoSwap": "0x7cBa32163a8f4c56C846f5C3685E3b7a450c9002",
    "USDC": "0xae95d4890bf4471501E0066b6c6244E1CAaEe791",
  }

  const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ]

  const sendPaymentWithToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = tokenMap[selectedExpense.token];
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const decimals = await contract.decimals();
    const tx = await contract.transfer(selectedExpense.owner, ethers.utils.parseUnits(amount, decimals));
    await tx.wait();
    console.log("tx sent");
  }

  const sendPaymentWithEther = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
      to: selectedExpense.owner,
      value: ethers.utils.parseEther(amount)
    });
    await tx.wait();
    console.log("tx sent");
  }

  const sendPayment = async () => {
    if (selectedExpense.token === "EVMOS") {
      await sendPaymentWithEther();
    } else {
      await sendPaymentWithToken();
    }
  }
  
  const convertDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  const getDaysLeft = (timestamp) => {
    // console.log(timestamp);
    let date = new Date(timestamp);
    let now = new Date();
    // console.log(date);
    // console.log(now);
    let diff = date.getTime() - now.getTime();
    console.log(diff);
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  const openModal = (expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const openPaymentModal = (expense) => {
    setModalIsOpen(false);
    setPaymentModalIsOpen(true);
  }

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
    setModalIsOpen(true);
    setAmount("");
  }

  const modalStyle = {
    overlay: {
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'rgba(0,0,0,0.25)',
      zIndex: '4'
    }
  }

  const modalStyle2 = {
    overlay: {
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      zIndex: '5'
    }
  }

  const getRemainingAmount = () => {
    if (selectedExpense) {
      console.log(selectedExpense);
      let total = selectedExpense.amount;
      selectedExpense.payments.forEach(payment => {
        total -= payment.amount;
      });
      return total;
    }
    return 0;
  }

  const reduceAddress = (address) => {
    var f5 = address.substring(0, 5);
    var l4 = address.substring(address.length - 4);
    var result = f5 + "..." + l4;
    return result;
  }

  const getExpenses = async () => {
    const response = await fetch(`https://myshare.azurewebsites.net/api/retrieveexpenses?address=${address}`);
    const data = await response.json();
    await setExpenses(data.expenses);
    console.log(data);
  }

  const paySplit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
  }

  useEffect(() => {
    if (isConnected && address) {
      getExpenses();
    }
  }, [isConnected, address, createExpense]);


  return (
    <section className="dashboard">
      <div className="dashboard-container container">
        <h1 className="title">My expenses<button className="link">View all expenses<img src="./img/icon/arrow.svg" alt="arrow-icon" /></button></h1>
        <div className="content row">
          {selectedExpense ? (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" style={modalStyle}>
              <div className="modal-content container">
                <button onClick={closeModal} className="close"><img src="./img/icon/close.svg" alt="close button icon" /></button>
                <div className="top row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                {/*onClick={navigator.clipboard.writeText(selectedExpense.owner)}<img src="./img/icon/copy.svg" alt="copy address icon" />*/}
                    <p className="owner">{reduceAddress(selectedExpense.owner)}</p>
                    <h2 className="title">{selectedExpense.name}</h2>
                    <p className="description">{selectedExpense.description}</p>
                    <button onClick={openPaymentModal} className="pay-btn">Pay split<img src="./img/icon/wallet.svg" alt="pay button icon" /></button>
                  </div>
                  <div className="col-2"></div>
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                    <img src={selectedExpense.image} alt="expense" className="modal-img" />
                  </div>
                </div>
                <div className="middle row">
                  <div className="column col-4 col-sm-4">
                    <p>Created</p>
                    <p>{convertDate(selectedExpense.date)}</p>
                  </div>
                  <div className="column col-4 col-sm-4">
                    <p>Total</p>
                    <p>{selectedExpense.amount} {selectedExpense.token}</p>
                  </div>
                  <div className="column col-4 col-sm-4">
                    <p>Remaining</p>
                    <p>{getRemainingAmount()} {selectedExpense.token}</p>
                  </div>
                  <div className="column col-4 col-sm-4">
                    <p>Time remaining</p>
                    <p>{getDaysLeft(selectedExpense.timeLimit)} days</p>
                  </div>
                  <div className="column col-4 col-sm-4">
                    <p>Status</p>
                    <p>{selectedExpense.status}</p>
                  </div>
                </div>
                <div className="bottom">
                  <h2 className="title">Debtors</h2>
                  <div className="table">
                    <div className="container">
                      <div className="row">
                        <div className="column">
                          <p>Name</p>
                        </div>
                        <div className="column">
                          <p>Share</p>
                        </div>
                        <div className="column">
                          <p>Remaining</p>
                        </div>
                        <div className="column">
                          <p>Paid on</p>
                        </div>
                        <div className="column">
                          <p>Status</p>
                        </div>
                      </div>
                      {selectedExpense.debtors.map(debtor => (
                        <div className="row">
                          <div className="column">
                            <p>{reduceAddress(debtor.address)}</p>
                          </div>
                          <div className="column">
                            <p>{debtor.amount} {selectedExpense.token}</p>
                          </div>
                          <div className="column">
                            <p>{debtor.amount - selectedExpense.payments.reduce((a, b) => a + b.amount, 0)} {selectedExpense.token}</p>
                          </div>
                          <div className="column">
                            <div className="date">
                              {selectedExpense.payments.length > 0 ?
                                <a href={`https://evm.evmos.dev/tx/${selectedExpense.payments[selectedExpense.payments.length - 1]}`}>
                                  <p>{convertDate(selectedExpense.payments[selectedExpense.payments.length - 1].date)}</p>
                                </a>
                                : <p>N/A</p>
                              }
                            </div>
                          </div>
                          <div className="column status">
                            <p className={selectedExpense.payments.reduce((a, b) => a + b.amount, 0) === debtor.amount ? "Paid" : "Pending"}>{selectedExpense.payments.reduce((a, b) => a + b.amount, 0) === debtor.amount ? "Paid" : "Pending"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          ) : null}
          {expenses ? expenses.map((expense) => (
            <div className="container-card col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="cards" key={expense.id} onClick={() => openModal(expense)}>
                <div className="top">
                  <p className="owner">{reduceAddress(expense.owner)}</p>
                  <img src={expense.image} alt="expense" />
                </div>
                <div className="bottom container">
                  <div className="row">
                    <div className="name">
                      <h2>{expense.name}</h2>
                    </div>
                    <div className="status">
                      <p className={expense.status}>{expense.status}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="description col-12">
                      <p>{expense.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="price col-6">
                      <p><img src="./img/icon/coins.svg" alt="coin-icon" /><b>{expense.amount}</b> {expense.token}</p>
                    </div>
                    <div className="time-limit col-6">
                      <p><img src="./img/icon/calendar.svg" alt="calendar-icon" /><b>{getDaysLeft(expense.timeLimit)}</b> days</p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedExpense ?
                <Modal isOpen={paymentModalIsOpen} onRequestClose={closePaymentModal} className="modal modal-2" style={modalStyle2}>
                  <form action="javascript:void(0);" onSubmit={sendPayment} className="modal-content container needs-validation">
                  <button onClick={closePaymentModal} className="close"><img src="./img/icon/close.svg" alt="close button icon" /></button>
                    <div className="top row">
                      <h2 className="title">{selectedExpense.name}</h2>
                    </div>
                    <div className="middle form-container">
                    <button className="text" onClick={() => setAmount(selectedExpense.amount.toString())}>Pay: {selectedExpense.amount} {selectedExpense.token}</button>
                      <div className="form row">
                        <div className="form-col col-12">
                          <label for="payAmount">Amount</label>
                        </div>
                        <div className="form-col col-10">
                          <input id="payAmount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
                        </div>
                        <div className="form-col col-2">
                          <button className="btn-type-3">Max</button>
                        </div>
                      </div>
                      <div className="info-text row">
                        <div className="col-6">
                          <p>Network fee:</p>
                        </div>
                        <div className="col-6">
                          <p className="text-end">0.0003 EVMOS</p>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="bottom row">
                      <div className="bottom-content">
                        <button type="submit" className="pay submit-btn">Confirm</button>
                      </div>
                    </div>
                  </form>
                </Modal>
                : null}
            </div>
          )) : (
            <p>No expenses</p>
          )}
        </div>
      </div>

    </section>
  );
}