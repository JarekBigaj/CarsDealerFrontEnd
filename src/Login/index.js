import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import '../styles/AuthForm.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';

const LOGIN_URL = '/Auth/Login'
const USER_ROLE_DATA_URL = '/api/user/User/role'
const Login = () =>{
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    },[]);
    
    useEffect(()=>{
        setErrMsg('');
    },[email,pwd]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email, password: pwd}),
                {
                    headers: { 'Content-Type' : 'application/json'},
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.data;
            const getUserRole = await axios.get(USER_ROLE_DATA_URL,{
                headers: {
                    'Accept': 'text/plain',
                    'Authorization' : `bearer ${accessToken}`
                    }
            });
            const {role} = getUserRole.data.data;
            setAuth({accessToken,roles : role, email});
            setEmail('');
            setPwd('');
            navigate(from,{replace: true});
        } catch (err) {
            if(!err?.response)
                setErrMsg('No server Respones');
            if (err.response?.status === 400)
                setErrMsg('Missing Username or Password');
            if(err.response?.status === 401)
                setErrMsg('Unauthorized');
            else
                setErrMsg('Login Failed');

            errRef.current.focus();
        }

    }

    return(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br/>
                <span className="line">
                    <Link to={'/register'}>Sign Up</Link>
                </span>
            </p>
        </section>
    )
}
export default Login;