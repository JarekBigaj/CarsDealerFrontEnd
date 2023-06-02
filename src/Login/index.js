import { useEffect, useRef, useState, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios";
import '../styles/AuthForm.css';

const LOGIN_URL = '/Auth/Login'
const Login = () =>{
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success,setSuccess] = useState('');

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
                    withCredentials: ''
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({email,pwd,roles,accessToken});
            setEmail('');
            setPwd('');
            setSuccess(true);
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
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br/>
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ) : (
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
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>)}
        </>
    )
}
export default Login;