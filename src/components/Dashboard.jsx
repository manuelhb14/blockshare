import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { ethers } from 'ethers';
import Modal from 'react-modal';

export default function Dashboard() {

  const { isConnected, setIsConnected, expenses, selectedExpense, setSelectedExpense } = useContext(DataContext);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const convertDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }

  const getDaysLeft = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let now = new Date();
    let diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  const openModal = (expense) => {
    setSelectedExpense(expense);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const modalStyle = {
    overlay: {
      position: 'fixed',
      inset: '0px',
      backgroundColor: 'rgba(0,0,0,0.25)'
    }
  }

  const getRemainingAmount = () => {
    if (selectedExpense) {
      console.log(selectedExpense);
      let total = selectedExpense.amount;
      selectedExpense.debtors.forEach(debtor => {
        if (debtor.payments.length > 0) {
          debtor.payments.forEach(payment => {
            total -= payment.amount;
          });
        }
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
  
  return (
    <section className="dashboard">
      <div className="container">
        <h1 className="title">My expenses<button className="link">View all expenses<img src="./img/icon/arrow.svg" alt="arrow-icon" /></button></h1>
        <div className="content row">
          {selectedExpense ? (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" style={modalStyle}>
              <div className="modal-content container">
                <button onClick={closeModal} className="close"><img src="./img/icon/close.svg" alt="close button icon" /></button>
                <div className="top row">
                  <div className="col-6">
                    <p className="owner" data-address={selectedExpense.owner}>{reduceAddress(selectedExpense.owner)}<img src="./img/icon/copy.svg" alt="copy address icon" /></p>
                    <h2 className="title">{selectedExpense.name}</h2>
                    <p className="description">{selectedExpense.description}</p>
                    {/*<button>Pay split</button>*/}
                  </div>
                  <div className="col-2"></div>
                  <div className="col-4">
                    <img src={selectedExpense.image} alt="expense" className="modal-img" />
                  </div>
                </div>
                <div className="middle row">
                  <div className="col">
                    <p>Created</p>
                    <p>{convertDate(selectedExpense.date)}</p>
                  </div>
                  <div className="col">
                    <p>Total</p>
                    <p>{selectedExpense.amount} {selectedExpense.token}</p>
                  </div>
                  <div className="col">
                    <p>Remaining</p>
                    <p>{getRemainingAmount()} {selectedExpense.token}</p>
                  </div>
                  <div className="col">
                    <p>Time remaining</p>
                    <p>{getDaysLeft(selectedExpense.timeLimit)} days</p>
                  </div>
                  <div className="col">
                    <p>Status</p>
                    <p>{selectedExpense.status}</p>
                  </div>
                </div>
                <div className="bottom">
                  <h2 className="title">Debtors</h2>
                  <div className="table">
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <p>Name</p>
                        </div>
                        <div className="col">
                          <p>Share</p>
                        </div>
                        <div className="col">
                          <p>Remaining</p>
                        </div>
                        <div className="col">
                          <p>Time remaining</p>
                        </div>
                        <div className="col">
                          <p>Status</p>
                        </div>
                      </div>
                      {selectedExpense.debtors.map(debtor => (
                        <div className="row">
                          <div className="col">
                            <p>{reduceAddress(debtor.address)}</p>
                          </div>
                          <div className="col">
                            <p>{debtor.amount} {selectedExpense.token}</p>
                          </div>
                          <div className="col">
                            <p>{debtor.payments.reduce((a, b) => a + b.amount, 0)} {selectedExpense.token}</p>
                          </div>
                          <div className="col">
                            <p>{debtor.payments.length > 0 ? convertDate(debtor.payments[debtor.payments.length - 1].date) : "N/A"}</p>
                          </div>
                          <div className="col status">
                            <p className={debtor.payments.reduce((a, b) => a + b.amount, 0) === debtor.amount ? "Paid" : "Pending"}>{debtor.payments.reduce((a, b) => a + b.amount, 0) === debtor.amount ? "Paid" : "Pending"}</p>
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
            <div className="container-card col-12 col-md-4 col-lg-3">
              <div className="cards" key={expense.id} onClick={() => openModal(expense)}>
                <div className="top">
                  <p className="owner">{reduceAddress(expense.owner)}</p>
                  <img src={expense.image} alt="expense" />
                </div>
                <div className="bottom container">
                  <div className="row">
                    <div className="name col-8">
                      <h2>{expense.name}</h2>
                    </div>
                    <div className="status col-4">
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
            </div>
          )) : (
            <p>No expenses</p>
          )}
        </div>
      </div>

    </section>
  );
}