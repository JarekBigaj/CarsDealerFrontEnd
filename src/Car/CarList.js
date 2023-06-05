import { useEffect, useState } from "react";
import axios from "../api/axios";
import CustomTable from "../helperComponents/CustomTable";
import { getTableColumnName } from "../helperFunctions/tableHelper";
import Pagination from '../helperComponents/Pagination';

const URL_CARS = '/api/Car/GetAll';

const CarList = () =>{
    const [carsData, setCarsData] = useState([]);
    const [msg, setMsg] = useState();
    const [isSuccess, setIsSuccess] = useState();
    const [showPage,setShowPage] = useState(1);
    const [currentPage,setCurrentPage] = useState();
    const [pages, setPages] = useState(0);


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
            setCurrentPage(currentPage);
            setPages(pages);
            setMsg(message);
            setIsSuccess(success);
        })()
    },[showPage])
    const propsName = getTableColumnName(carsData);
    const handleChangePage = (page) =>{
        setShowPage(page);
    }
    const arrowPageChange = (arrow) => {
        if(arrow === "left"&& showPage>1)
            setShowPage((prev) => prev-1);
        if(arrow === "right"&& showPage<pages)
            setShowPage((prev)=>prev+1);
    }
    return (
        <div>
            {carsData.length?(
                <div>
                    <CustomTable 
                        props={carsData} 
                        propsName={propsName} 
                        title={"Cars List"}
                        to={'car'}
                    />
                    <Pagination 
                        pages={pages} 
                        currentPage={currentPage} 
                        handleChangeCurrentPage={handleChangePage}
                        arrowPageChange={arrowPageChange}
                    />
                </div>
            ) :(
                <div><span>Lodaing ...</span></div>
            )

            }
            
        </div>
    )
}

export default CarList;