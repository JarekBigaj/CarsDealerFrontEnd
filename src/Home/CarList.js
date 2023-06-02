import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";

const CarList = () =>{
    const [carsList, setCasrsList] = useState();

    useEffect(()=>{

        (async () => {
            const response = await fetchData();
            console.log({response})
        })()
    },[])

    return (
        <div>
            123
        </div>
    )
}

export default CarList;