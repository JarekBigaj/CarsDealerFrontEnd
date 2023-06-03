import React, { useState,useEffect, useContext } from 'react'
import axios from '../api/axios';
import { accessToken } from '../hooks/useAuth';

const URL_PURCHASE = '/controller';
const Transaction = () => {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    (async () =>{
      try{
        const response = await axios.get(URL_PURCHASE,{
          headers: {
            'Accept': 'text/plain',
            'Authorization' : accessToken()
          }
        });
        setTransactions(response.data.data);
      } catch (err){
        console.error(err);
      }
    })()

  },[])

  return (
    <article>
      <h2>Transactions List</h2>
      {transactions?.length
        ?(
          <ul>
            {transactions.map((transaction,i) => 
              <li key={i}>
                {transaction?.amount}
              </li>)}
          </ul>
        ): <p>No transaction to display</p>
      } 
    </article>
  )
}

export default Transaction;