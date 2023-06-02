import {SERVER,PATH_API_GET_ALL_CAR} from './Server';

export const fetchData = async () =>{
    const response = await fetch(SERVER+PATH_API_GET_ALL_CAR);

    const json = response.json();

    return json;
}
