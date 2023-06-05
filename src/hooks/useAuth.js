import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () =>{
    return useContext(AuthContext);
}

export const accessToken = (token) =>{
    return `bearer ${token}`;
}

export default useAuth;