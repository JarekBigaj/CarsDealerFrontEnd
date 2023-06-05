import { useEffect, useState } from "react";
import axios from "../api/axios";
import CustomTable from "../helperComponents/CustomTable";
import { getTableColumnName } from "../helperFunctions/tableHelper";

const URL_CARS = '/api/Car/GetAll';

const CarList = () =>{
    const [carsData, setCarsData] = useState([]);
    const [msg, setMsg] = useState();
    const [isSuccess, setIsSuccess] = useState();
    const [showPage,setShowPage] = useState(1);


    useEffect(()=>{
        (async () => {
            const response = (await axios.get(URL_CARS+`/${showPage}`));
            if(response.status !== 200) throw new console.error(`It's something go wrong`);
            const dataFromResponse = response.data;
            const {data,message,success} = dataFromResponse;
            const {items,pages,currentPage} = data;
            setCarsData(() =>{
                const filteredData = items.filter(value => !value.purchase)
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