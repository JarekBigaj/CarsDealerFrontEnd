import { Link, useMatch, useResolvedPath} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from '@fortawesome/free-solid-svg-icons';
import './styles/Navbar.css'
import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
    const {auth,setAuth} = useAuth();
    const [toggleActive,setToggleActive] = useState(false);
    const {accessToken,roles} = auth;
    return (
        <div className="navbar">
            <Link className="site-title navbar-link" to="/">Cars Dealer</Link>
            <FontAwesomeIcon className="toggle-button" onClick={()=> setToggleActive(!toggleActive) } icon={faBars} />
            <ul className={`navbar-list ${toggleActive? "toggle-active":""}`}>
                <CustomLink to={"/"} >Home</CustomLink>
                {roles === 'User'?
                    <>
                        <CustomLink to={"/offer"} >Your Offers</CustomLink>
                        <CustomLink to={"/transaction"}>Your Transactions</CustomLink>
                    </>
                    :
                    <></>
                }
                {roles === 'CarsDealer'?
                    <>
                        <CustomLink to={"/AddCar"}>Add Car</CustomLink>
                        {/* <CustomLink to={"/AcceptOffer"}>Accept Offer</CustomLink> */}

                    </>
                    :
                    <></>
                }
                {!accessToken?
                    <>
                        <CustomLink to={"/login"} >Login</CustomLink>
                        <CustomLink to={"/register"}>Register</CustomLink> 
                    </> 
                    :
                    <>
                        <Link to={"/"} className={`navbar-logout`} onClick={() => {
                            setAuth('');
                        }}>Logout</Link>
                    </>
                }
                
            </ul>
        </div>
    )
}

const CustomLink = ({to,children,...props}) =>{
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end:true})
    return (
        <li className={`navbar-item ${isActive? "active": ""}`}>
            <Link className="navbar-link" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar;