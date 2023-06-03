import React, { useState,useEffect, useContext } from 'react'
import axios from '../api/axios';
import useAuth, { accessToken } from '../hooks/useAuth';
import AuthContext, { AuthProvider } from '../context/AuthProvider';

const URL_OFFER = '/api/offer/Offer/GetAll';
const Offer = () => {
  const [offers, setOffers] = useState();
  const {auth} = useAuth();
  console.log({auth})

  useEffect(() => {
    (async () =>{
      try{
        const response = await axios.get(URL_OFFER,{
          headers: {
            'Accept': 'text/plain',
            'Authorization' : accessToken()
          }
        });
        setOffers(response.data.data);
      } catch (err){
        console.error(err);
      }
    })()

  },[])

  return (
    <article>
      <h2>Offers List</h2>
      {offers?.length
        ?(
          <ul>
            {offers.map((offer,i) => 
              <li key={i}>
                {offer?.proposedAmount}
              </li>)}
          </ul>
        ): <p>No offer to display</p>
      } 
    </article>
  )
}

export default Offer;