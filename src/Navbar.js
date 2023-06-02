import { Link, useMatch, useResolvedPath} from "react-router-dom";
import './styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link className="site-title navbar-link" to="/">Cars Dealer</Link>
            <ul className="navbar-list">
                <CustomLink to={"/"}>Home</CustomLink>
                <CustomLink to={"/login"}>Login</CustomLink>
                <CustomLink to={"/register"}>Register</CustomLink>
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