# Blockshare

[*Project for Evmos Momentum Hackathon*](https://evmos2022.devpost.com/)

Blockshare is a Web3 based DeFi application that lets you manage shared expenses in a decentralized way.

## How Blockshare works 

Blockshare is a [**Web3 application**](https://blockshare.app) built on the [**Evmos ecosystem**](https://evmos.org/). It is conformed by two parties, the creditor and the debtor(s). In order to get startd, the creditor connects its wallet and creates an expense which includes:
* Title
* Description
* Category
* Total to pay
* Deadline
* Required token

It then selects the debtors addresses’ and the amount that each one will pay. Debtors then access the received expense and are able to pay the debt, be it by parts or all the debt in one transaction.

Supported ecosystems:

At the moment Blockshare is only available to be used with Evmos ecosystem. More information can be read on the [**documentation**](https://docs.evmos.org).

## Future for Blockshare
The following features are planned to be added.
Q4 2022
* Implementation of Evmos Name Service (Evmos domains)
* Custom image upload for expenses creations
* Ability to cancel an expense with automatic refund to the parties that had paid.
* Share link button to send expense efficiently to the debtors.

Q1 2023
* Notifications implementation
* Anti spam system. Only your contacts can add you to an expense.
* Automatic swap from desired coin to expense’s coin when paying.

Q2 2023
* Multiple blockchains compatibility.
* Automatic creation of recurring payments.
* Dynamic expense for constantly updating payments.
* • And more constant updates.


## Contribute to the project

Run the server in your local machine:

```bash
npm install

npm start
```

Open <http://localhost:3000> with your browser to see the result.


***Blockshare is in Beta. Use at your own risk with funds you're comfortable using.***
