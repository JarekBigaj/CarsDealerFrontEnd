import { useEffect, useState } from "react";
import axios from "../api/axios";
import CustomTable from "../helperComponents/CustomTable";
import { getTableColumnName } from "../helperFunctions/tableHelper";

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
            console.log({dataFromResponse})
            setCarsData(() =>{
                const filteredData = data.filter(value => !value.purchase)
                const selectedProps = filteredData.map(({ purchase, ...rest }) => rest);
                return selectedProps;
            });
            setMsg(message);
            setIsSuccess(success);
        })()
    },[])
    const propsName = getTableColumnName(carsData);

    return (
        <div>
            <CustomTable 
                props={carsData} 
                propsName={propsName} 
                title={"Cars List"}
                to={'car'}
            />
        </div>
    )
}

export default CarList;