import React, { useState,useRef,useEffect } from 'react'
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { accessToken } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../styles/AddCar.css'

const URL_CAR = '/api/car'

const AddCar = () => {
    const navigate = useNavigate();
    const carRef = useRef();
    const {auth} = useAuth();
    const [make, setMake] = useState("Audi");
    const [model, setModel] = useState("A4");
    const [year, setYear] = useState(1940);
    const [price, setPrice] = useState(1000);
    const [mileage, setMileage] = useState(10000);

    useEffect(() => {
        carRef.current.focus();
    },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(URL_CAR,
                JSON.stringify({make,model,year,price,mileage}),
                {
                    headers:{
                        'Content-Type':'application/json',
                        'Accept': 'text/plain',
                        'Authorization' : accessToken(auth.accessToken)
                }
                });
            navigate('/')
        }catch(err){
            console.error(err);
            
        }
    }
  return (
    <div className='wrapper'>
        <div className='component-wrapper'>
            <form className='car-form' onSubmit={handleSubmit}>
                <label className='car-label' htmlFor="make">
                    Make:
                </label>
                <input
                    className='car-input'
                    type="text"
                    id="make"
                    ref={carRef}
                    autoComplete="on"
                    placeholder={make}
                    onChange={(e) => setMake(e.target.value)}
                />
                <label className='car-label' htmlFor="model">
                    Model:
                </label>
                <input
                    className='car-input'
                    type="text"
                    id="model"
                    ref={carRef}
                    autoComplete="on"
                    placeholder={model}
                    onChange={(e) => setModel(e.target.value)}
                />
                <label className='car-label' htmlFor="year">
                    Year:
                </label>
                <input
                    className='car-input'
                    type="number"
                    id="year"
                    ref={carRef}
                    autoComplete="on"
                    placeholder={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <label className='car-label' htmlFor="mileage">
                    Mileage:
                </label>
                <input
                    className='car-input'
                    type="number"
                    id="mileage"
                    ref={carRef}
                    autoComplete="on"
                    placeholder={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                />
                <label className='car-label' htmlFor="pirce">
                    Price:
                </label>
                <input
                    className='car-input'
                    type="number"
                    id="price"
                    ref={carRef}
                    autoComplete="on"
                    placeholder={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button className='form-button'>Confirm</button>
            </form>
        </div>
    </div>
  )
}

export default AddCar