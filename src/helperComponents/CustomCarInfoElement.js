import React from 'react'
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom'

const CustomCarInfoElement = ({props,paramsId}) => {
    const navigate = useNavigate();
    const {make,model,mileage,year,price} = props ? props : '';

    
  return (
        <div className='wrapper'>
            {props ? (
                <div className='card-field'>
                    <div className='title'><label>{make} {model}</label></div>
                    <div className='details'>
                        <label>Year of production : {year}</label>
                        <br/>
                        <label>Mileage : {mileage}</label>
                        <br/>
                    </div>
                    <div className='price-field'>
                        <label className='price'>{price}$</label>
                    </div>
                    <div className='button-wrapper'>
                        <button className='offer-button' onClick={() => navigate(`/makeanoffer?id=${paramsId}`)}>
                            Make an Offer
                        </button>
                    </div>
                </div>
            ) : (
                <div className='loading-field'><span className='loading'>Loading...</span></div>
            )}
        </div>
  )
}

export default CustomCarInfoElement