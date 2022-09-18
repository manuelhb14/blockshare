import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [createExpense, setCreateExpense] = useState(false);
  const [debtors, setDebtors] = useState({debtors: [
    {
      address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      amount: 100,
      payments: [
        {
          amount: 500,
          date: "1662488788",
        }
      ],
    }
  ]
  });

  return (
    <DataContext.Provider value={{ address, setAddress, isConnected, setIsConnected, selectedExpense, setSelectedExpense, expenses, setExpenses, createExpense, setCreateExpense }}>
      {props.children}
    </DataContext.Provider>
  );
}

