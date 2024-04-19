import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { userGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";


export const ExpenceTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions , transactionTotals } = userGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTrasactionType] = useState("expense");
  const navigate = useNavigate();

const {balance , income , expenses} = transactionTotals

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription("")
    setTransactionAmount("")
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); 
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s' Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
             {balance >= 0 ? <h2> ${balance}</h2>: <h2> -${balance * -1}</h2>}
          </div>
          <div className="summery">
            <div className="income">
              <h3>Income</h3>
              <h2> ${income}</h2>
            </div>
            <div className="expenses">
              <h3>Expences</h3>
              <h2> ${expenses}</h2>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              checked={transactionType === "expense"}
              id="expense"
              value="expense"
              onChange={(e) => setTrasactionType(e.target.value)}
            />
            <label htmlFor="expences">Expences</label>
            <input
              type="radio"
              checked={transactionType === "income"}
              id="income"
              value="income"
              onChange={(e) => setTrasactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            {""}
            <img alt="profileimage" src={profilePhoto} className="profile-photo" />
            <button onClick={signUserOut} className="sing-out-button">
              Sing Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <div className="container">
          <h3>Transactions</h3>
          <ul>
            <li>
              {transactions.map((transaction) => {
                const { description, transactionAmount, transactionType } =
                  transaction;
                return (
                  <li>
                    <h4> {description} </h4>
                    <p>
                      {""}${transactionAmount} . {""}
                      <label
                        style={{
                          color:
                            transactionType === "expense" ? "red" : "green",
                        }}
                      >
                        {transactionType}
                      </label>
                    </p>
                  </li>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
