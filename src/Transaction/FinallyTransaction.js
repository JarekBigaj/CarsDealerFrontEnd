import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQueryParamsId } from '../helperFunctions/queryParamsHelper';
import axios from '../api/axios';
import { accessToken } from '../hooks/useAuth';
import useAuth from '../hooks/useAuth';
import '../styles/CardInfo.css'

const URL_CAR = '/api/Car/';
const URL_PURCHASE = '/api/Purchase';

const FinallyTransaction = () => {
    const [car,setCar] = useState('');
    const {auth} = useAuth();

    const navigate = useNavigate();
    const paramsId = getQueryParamsId();

    useEffect(()=>{
        (async () => {
            const response = (await axios.get(URL_CAR+paramsId));
            if(response.status !== 200) throw new console.error(`It's something go wrong`);
            const dataFromResponse = response.data;
            const {data} = dataFromResponse;
            const {id,make,model,price} = data;
            setCar(() =>{
                return {id,make,model,price};
            });
        })()
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const buyCar = {amount: car.price , payment:1 ,carId : car.id}
        try{
            const response = await axios.post(URL_PURCHASE, 
                JSON.stringify(buyCar),
                {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'text/plain',
                        'Authorization' : accessToken(auth.accessToken)
                    },
                    withCredentials: true
                }
            );
            navigate('/transaction')
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className='wrapper'>
        <div className='component'>
            <h1 className='title' >Do you wanna Buy this car ?</h1>
            <div className='details'>
                <h2>{`${car.make} ${car.model}`}</h2>
                <h3>{`${car.price}$`}</h3>
            </div>
                <form onSubmit={handleSubmit}>
                    
                    <button className='offer-button'>Confirm</button>
                </form>
            <div >  
                <button className='offer-button' onClick={() => navigate('/car?id='+paramsId)}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default FinallyTransaction