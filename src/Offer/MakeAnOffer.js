import React, { useEffect, useState ,useRef} from 'react'
import { getQueryParamsId } from '../helperFunctions/queryParamsHelper';
import axios from '../api/axios';
import useAuth, { accessToken } from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom'
import '../styles/MakeAnOffer.css'


const URL_CAR = '/api/Car/';
const URL_OFFER = '/api/offer/Offer/';
const OFFER_REGEX = /^\d{1,10}$/;
const MakeAnOffer = () => {
    const [currentCar,setCurrentCar] = useState();
    const [proposedAmount, setProposedAmount] = useState();
    const [errMsg, setErrMsg] = useState('');
    const {auth} = useAuth();

    const amountRef = useRef();

    const navigate = useNavigate();
    const paramsId = getQueryParamsId();

    useEffect(()=>{
        (async () => {
            const response = (await axios.get(URL_CAR+paramsId));
            if(response.status !== 200) throw new console.error(`It's something go wrong`);
            const dataFromResponse = response.data;
            const {data} = dataFromResponse;
            setCurrentCar(() =>{
                return data;
            });
        })()
    },[])
    useEffect(()=>{
        amountRef.current.focus();
    },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const result = OFFER_REGEX.test(proposedAmount);
        if(!result){
            setErrMsg("Invalid Entry");
            return
        }
        
        try{
            const response = await axios.post(URL_OFFER+paramsId, 
                JSON.stringify({proposedAmount}),
                {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'text/plain',
                        'Authorization' : accessToken(auth.accessToken)
                    },
                    withCredentials: true
                }
            );
            navigate('/offer')
        } catch (err) {
            console.error(err);
        }
    }
    const {make,model,price} = currentCar ? currentCar:'';

  return (
    <div className='card-wrapper'>
        <div className='component-wrapper'>
            <h1 className='title-offer'>Make an Offer</h1>
            <h2 className='cars-offer-name'>{make} {model}</h2>
            <div className='price-offer'>
                <label className='offer-price'>Price: {price}$</label>
                <br/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='proposedAmount' className='your-offer'>Your Offer:</label>
                    <input 
                        id="proposedAmount"
                        ref={amountRef}
                        type='text'
                        onChange={(e) => setProposedAmount(() => e.target.value)}
                        value={proposedAmount}
                        placeholder={price}
                        className='input-offer-field'
                    />  
                    <button className='confirm-button'>Confirm</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default MakeAnOffer