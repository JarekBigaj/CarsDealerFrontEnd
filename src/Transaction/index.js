import React, { useState,useEffect } from 'react'
import axios from '../api/axios';
import useAuth,{accessToken} from '../hooks/useAuth';


const URL_PURCHASE = '/controller';
const Transaction = () => {
  const [transactions, setTransactions] = useState();
  const {auth} = useAuth();
  useEffect(() => {
    (async () =>{
      try{
        const response = await axios.get(URL_PURCHASE,{
          headers: {
            'Accept': 'text/plain',
            'Authorization' : accessToken(auth.accessToken)
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