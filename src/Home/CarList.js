import { useEffect, useState } from "react";
import axios from "../api/axios";

const URL_CARS = '/api/Car/GetAll';

const CarList = () =>{
    const [carsData, setCarsData] = useState([]);
    const [msg, setMsg] = useState();
    const [isSuccess, setIsSuccess] = useState();

    useEffect(()=>{
        (async () => {
            const response = (await axios.get(URL_CARS));
            if(response.status !== 200) throw new console.error(`It's something go wrong`);
            const dataFromResponse = response.data;
            const {data,message,success} = dataFromResponse;
            setCarsData(data);
            setMsg(message);
            setIsSuccess(success);
        })()
    },[])

    console.log({carsData})
    return (
        <div>
            <ul>
                {
                    carsData.map((car) => {
                        const {id,make,model,millage,price,year} = car;
                        return(
                            <li key={id}>
                                Make: {make} <br/>
                                Model: {model} <br/>
                                Price: {price} <br/>
                                Year: {year} <br/>
                                Millage: {millage}<br/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CarList;