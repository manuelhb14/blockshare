import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [address, setAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Cabin at Huasca de Ocampo",
      amount: 1000,
      token: "USDC",
      date: "1662388788",
      description: "Trip to Mexico’s magical town. Visit the Prismas Balsalticos and the Museo de los Duendes",
      image: "/accomodation.jpeg",
      owner: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      timeLimit: "1662641048",
      status: "Pending",
      debtors: [
        {
          address: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
          amount: 500,
          payments: [
            {
              amount: 500,
              date: "1662488788",
            }
          ],
        },
        {
          address: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
          amount: 250,
          payments: [
            {
              amount: 100,
              date: "1662458788",
            },
            {
              amount: 50,
              date: "1662508788",
            }
          ],
        },
        {
          address: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
          amount: 250,
          payments: [
          ],
        }
      ],
    },
    {
      id: 2,
      name: "Car for trip",
      amount: 200,
      token: "USDC",
      date: "1662389879",
      description: "We will be using the KIA Rio car to visit Huasca de Ocampo",
      image: "/car-rental.jpeg",
      owner: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      timeLimit: "1663333079",
      status: "Paid",
      debtors: [
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
      ],
    },
  ]);

  return (
    <DataContext.Provider value={{ address, setAddress, isConnected, setIsConnected, selectedExpense, setSelectedExpense, expenses, setExpenses }}>
      {props.children}
    </DataContext.Provider>
  );
}

