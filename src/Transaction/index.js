import React, { useState,useEffect } from 'react'
import axios from '../api/axios';
import useAuth,{accessToken} from '../hooks/useAuth';
import { getTableColumnName } from '../helperFunctions/tableHelper';
import CustomTable from '../helperComponents/CustomTable';
import '../styles/CarList.css'


const URL_PURCHASE = '/api/Purchase';
const URL_CAR = '/api/Car/';
const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [carTransaction,setCarTransaction] = useState([]);
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

  const carData = async (carId) =>{
    try{
      const response = await axios.get(URL_CAR+carId,{
        headers: {
          'Accept': 'text/plain',
          'Authorization' : accessToken(auth.accessToken)
        }
      });
      const {data} = response.data;
      return data;
    } catch (err){
      console.error(err);
    }
    return ;
  }
  useEffect(() =>{
    Promise.all(transactions.map(transaction => carData(transaction.carId)))
    .then(result => setCarTransaction(result));
  },[transactions])

  const combinedData = transactions.map((transaction,key) => {
    const {amount,payment} = transaction;
    return{
      Make : carTransaction[key]?.make,
      Model : carTransaction[key]?.model,
      Price: amount,
      Payment: payment === 1? "Transfer" : ""
    }
  })
  const propsName = getTableColumnName(combinedData);
  return (
    <div className="table-wrapper">
        {transactions.length?(
            <div>
              <CustomTable 
                props={combinedData} 
                propsName={propsName} 
                title={"Your Transaction List"}
                isOffer={true}
              />
            </div>
          ) :(
            <div><span>You don't have any transaction!</span></div>
          )
        }
            
      </div>
  )
}

export default Transaction;