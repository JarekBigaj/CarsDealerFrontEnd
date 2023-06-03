import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () =>{
    return useContext(AuthContext);
}

export const accessToken = () =>{
    return `bearer ${localStorage.getItem("user")}`;
}

export default useAuth;