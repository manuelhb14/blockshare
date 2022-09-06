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

  return (
    <div className="">
      <h1>My expenses</h1>
      <button>View all expenses</button>
      {selectedExpense ? (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <p>{selectedExpense.owner}</p>
          <h2>{selectedExpense.name}</h2>
          <p>{selectedExpense.description}</p>
          <img src={selectedExpense.image} alt="expense" width={200} />
          <p>Created</p>
          <p>{convertDate(selectedExpense.date)}</p>
          <p>Total</p>
          <p>{selectedExpense.amount} {selectedExpense.token}</p>
          <p>Remaining</p>
          <p>{getRemainingAmount()} {selectedExpense.token}</p>
          <p>Time remaining</p>
          <p>{getDaysLeft(selectedExpense.timeLimit)} days</p>
          <h2>Debtors</h2>
          <p>Name</p>
          <p>Share</p>
          <p>Remaining</p>
          <p>Time remaining</p>
          <p>Status</p>
          {selectedExpense.debtors.map(debtor => (
            <div>
              <p>{debtor.address}</p>
              <p>{debtor.amount} {selectedExpense.token}</p>
              <p>{debtor.payments.reduce((a, b) => a + b.amount, 0)} {selectedExpense.token}</p>
              <p>{debtor.payments.length > 0 ? convertDate(debtor.payments[debtor.payments.length - 1].date) : "N/A"}</p>
              <p>{debtor.payments.reduce((a, b) => a + b.amount, 0) === debtor.amount ? "Paid" : "Pending"}</p>
            </div>
          ))}
          <button onClick={closeModal}>Close</button>
        </Modal>
      ) : null}
      {expenses ? expenses.map((expense) => (
        <div className="" key={expense.id} onClick={() => openModal(expense)}>
          <p>{expense.owner}</p>
          <img src={expense.image} alt="expense" width={100} />
          <h2>{expense.name}</h2>
          <p>{expense.status}</p>
          <p>{expense.description}</p>
          <p>{expense.amount} {expense.token}</p>
          <p>{getDaysLeft(expense.timeLimit)} days left</p>
        </div>
      )) : (
        <p>No expenses</p>
      )}

    </div>
  );
}