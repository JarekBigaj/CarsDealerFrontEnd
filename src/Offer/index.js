import React, { useState,useEffect, useContext } from 'react'
import axios from '../api/axios';
import useAuth, { accessToken } from '../hooks/useAuth';
import CustomTable from '../helperComponents/CustomTable';
import { getTableColumnName, getTableColumnNameForOffers } from '../helperFunctions/tableHelper';

const URL_OFFER = '/api/offer/Offer/GetAll';
const Offer = () => {
  const [offers, setOffers] = useState([]);
  const {auth} = useAuth();

  useEffect(() => {
    (async () =>{
      try{
        const response = await axios.get(URL_OFFER,{
          headers: {
            'Accept': 'text/plain',
            'Authorization' : accessToken(auth.accessToken)
          }
        });
        setOffers(() => response.data.data);
        console.log({response})
      } catch (err){
        console.error(err);
      }
    })()

  },[])

  const propsName = getTableColumnName(offers);

  return (
      <div>
        {offers.length?(
            <div>
              <CustomTable 
                props={offers} 
                propsName={propsName} 
                title={"Your Offers List"}
              />
            </div>
          ) :(
            <div><span>You don't have any offers!</span></div>
          )
        }
            
      </div>
  )
}

export default Offer;