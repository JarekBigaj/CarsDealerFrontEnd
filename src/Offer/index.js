import React, { useState,useEffect, useContext } from 'react'
import axios from '../api/axios';
import useAuth, { accessToken } from '../hooks/useAuth';
import CustomTable from '../helperComponents/CustomTable';
import { getTableColumnName, getTableColumnNameForOffers } from '../helperFunctions/tableHelper';

const URL_OFFER = '/api/offer/Offer/GetAll';
const Offer = () => {
  const [offers, setOffers] = useState();
  const {auth} = useAuth();

  useEffect(() => {
    (async () =>{
      try{
        const response = await axios.get(URL_OFFER,{
          headers: {
            'Accept': 'text/plain',
            'Authorization' : accessToken()
          }
        });
        setOffers(() => response.data.data);
        console.log({response})
      } catch (err){
        console.error(err);
      }
    })()

  },[])
  // useEffect(() => {
  //   (async () => {
  //     const response = (await axios.get(URL_CAR+));
  //     if(response.status !== 200) throw new console.error(`It's something go wrong`);
  //     const dataFromResponse = response.data;
  //     const {data} = dataFromResponse;
  //     setCurrentCar(() =>{
  //         return data;
  //     });
  // })()
  // },[offers])
  const propsName = getTableColumnName(offers);
  console.log({offers})

  return (
      <div>
            <CustomTable 
                props={offers} 
                propsName={propsName} 
                title={"Your Offers List"}
            />
      </div>
  )
}

export default Offer;