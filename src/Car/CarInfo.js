import React, { useEffect, useState } from 'react'
import CustomInfoElement from '../helperComponents/CustomCarInfoElement'
import { getQueryParamsId } from '../helperFunctions/queryParamsHelper'
import axios from '../api/axios';

const URL_CAR = '/api/Car/';

const CarInfo = () => {
  const [currentCar, setCurrentCar] = useState();
  const paramsId = getQueryParamsId();

  useEffect(() =>{
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

  return (
    <div>
      <CustomInfoElement props={currentCar} paramsId={paramsId}/>
    </div>
  )
}

export default CarInfo