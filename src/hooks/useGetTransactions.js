import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";



export const userGetTransactions = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [transactions, setTransactions] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [transactionTotals , setTransactionsTotals] = useState({balance:0.0 , income:0.0 , expenses:0   });
  const transactionCollectionRef = collection(db, "transactions");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unscubscribe;
    try {   
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
    unscubscribe =   onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpnses = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if(data.transactionType === "expense") {
            totalExpnses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount)
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpnses;
        setTransactionsTotals( {
          balance,
          expenses:totalExpnses,
          income:totalIncome
        })
      });
    } catch (err) {
      console.error(err);
    }
    return () => unscubscribe()
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTransactions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { transactions , transactionTotals };
};
