import React, { useState,useEffect, useContext } from 'react'
import axios from '../api/axios';
import useAuth, { accessToken } from '../hooks/useAuth';
import CustomTable from '../helperComponents/CustomTable';
import { getTableColumnName, getTableColumnNameForOffers } from '../helperFunctions/tableHelper';
import '../styles/CarList.css'

const URL_OFFER = '/api/offer/Offer/GetAllCarsOffer';
const Offer = () => {
  const [carOffers, setCarOffers] = useState([]);
  
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
        const {data} = response.data;
        const selectOffersData = data?.map((value) => {
          const {id,make,model,price,offers} = value;
          const [lastOffer] = offers?.slice(-1);
          const idOffer = lastOffer?.id ? lastOffer.id : null;
          const {proposedAmount,isAcepted} = lastOffer ? lastOffer:{proposedAmount:"",isAcepted:''};
          return {id,make,model,price,idOffer,proposedAmount,isAcepted};
        });
        setCarOffers(()=>selectOffersData);
      } catch (err){
        console.error(err);
      }
    })()
  },[])

  const propsName = getTableColumnName(carOffers);
  const changedPropsName = propsName.map(name => {
    if(name === "idOffer") return "Id Your Offer";
    if(name === "proposedAmount") return "Your Propoused Price";
    if(name === "isAcepted") return "Status";
    return name;
  })

  return (
      <div className="table-wrapper">
        {carOffers.length?(
            <div>
              <CustomTable 
                props={carOffers} 
                propsName={changedPropsName} 
                title={"Your Offers List"}
                isOffer={true}
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