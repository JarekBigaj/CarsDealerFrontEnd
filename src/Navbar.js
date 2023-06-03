import { Link, useMatch, useResolvedPath} from "react-router-dom";
import './styles/Navbar.css'
import useAuth from "./hooks/useAuth";

const Navbar = () => {
    const {auth,setAuth} = useAuth();
    const {accessToken,role} = auth;
    return (
        <div className="navbar">
            <Link className="site-title navbar-link" to="/">Cars Dealer</Link>
            <ul className="navbar-list">
                <CustomLink to={"/"}>Home</CustomLink>
                {role === 'User'?
                    <CustomLink to={"/offer"}>Offer</CustomLink>
                    :
                    <></>
                }
                {!auth?
                    <>
                        <CustomLink to={"/login"}>Login</CustomLink>
                        <CustomLink to={"/register"}>Register</CustomLink> 
                    </> 
                    :
                    <>
                        <Link to={"/"} className={`navbar-logout`} onClick={() => {
                            localStorage.removeItem("user");
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
        <li className={`navbar-item ${isActive? "active": ""} `}>
            <Link className="navbar-link" to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar;