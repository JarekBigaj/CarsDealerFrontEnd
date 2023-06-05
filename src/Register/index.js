import { useRef,useState,useEffect } from "react";
import {faCheck,faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../styles/AuthForm.css';
import axios from "../api/axios";
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/Auth/register';

const Register = () =>{
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [vaildEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [vaildPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [vaildMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        const result =  EMAIL_REGEX.test(email);
        console.log({result});
        console.log({email});
        setValidEmail(result);
    },[email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log({result});
        console.log({password});
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    },[password,matchPassword]);

    useEffect(()=>{
        setErrMsg('');
    }, [email,password,matchPassword]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({email,password}),
                {
                    headers:{'Content-Type':'application/json'}
                });
            console.log({response});
            setSuccess(true);
        }catch(err){
            if(!err.response) setErrMsg('No Server Response');
            if(err.response?.status === 409) setErrMsg('Email Taken');
            setErrMsg('Registration Failed');
            errRef.current.focus();
        }
    }

    return(
        <>
        {success ? (
            <section>
                <h1>Success</h1>
                <br/>
                <p>
                    <a href="#">Sign In!</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg":"offscreen"}
            aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                    <span className={vaildEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={vaildEmail || !email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={vaildEmail ? "false":"true"}
                    aria-describedby="uidnote"
                    onFocus={()=> setEmailFocus(true)}
                    onBlur={()=> setEmailFocus(false)}
                />
                <p id="uidnote" className={emailFocus && email && !vaildEmail ? "instructions": "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must be like example@email.com .
                </p>
                <label htmlFor="password">
                    Password:
                    <span className={vaildPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={vaildPassword || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={vaildPassword ? "false":"true"}
                    aria-describedby="pwdnote"
                    onFocus={()=> setPasswordFocus(true)}
                    onBlur={()=> setPasswordFocus(false)}
                />
                <p id="pwdnote" className={passwordFocus && !vaildPassword 
                    ? "instructions": "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character. <br/>
                    Allowed special characters:
                    <span aria-label="at symbol">@</span><span aria-label="exclamation mark">!</span>
                    <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                    <span aria-label="hashtag">#</span>
                </p>
                <label htmlFor="confirm_password">
                    Confirm Password:
                    <span className={vaildMatch && matchPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={vaildMatch || !matchPassword ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    required
                    aria-invalid={vaildMatch ? "false":"true"}
                    aria-describedby="confirmnote"
                    onFocus={()=> setMatchFocus(true)}
                    onBlur={()=> setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !vaildMatch 
                    ? "instructions": "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field. <br/>
                </p>
                <button disabled={!vaildEmail || !vaildPassword || !vaildMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br/>
                <span className="line">
                    <Link to={'/login'}>Sign In</Link>
                </span>
            </p>
        </section>)}
        </>
    )
}

export default Register;