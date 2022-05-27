import Menu from "./Menu";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import "./styles/Auth.css";

function Login(){

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('isLogin') === "true"){
            navigate('/App');
        }
    })

    const [error, setError] = useState(null);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const updateField = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:8888/api/auth/login.php', JSON.stringify(loginForm))
        .then((result) => {
            console.log("info: "+result.data.info+" error: "+result.data.error+" isLogin: "+result.data.isLogin+"userKey: "+result.data.userKey);
            console.log(result.data);
            setError(result.data.error);
            if(result.data.isLogin === "true"){
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("userKey", result.data.userKey);
                navigate('/App');
            }
        })
            
    }
    return(
        
        <div>
            <Menu />
            <div className="container loginPage">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="row">
                    <form className="formCard col-5" onSubmit={handleSubmit}>
                        <h1>Logowanie</h1>
                        <p className="p-24">Email</p>
                        <input type="text" placeholder="example@email.com" name="email" onChange={updateField}/>
                        <p className="p-24" >Hasło</p>
                        <input type="password" placeholder="hasło" name="password" onChange={updateField}/>
                        <input type="submit" value="zaloguj"/>
                        <br />
                        <Link to="#" className="loginLink">Nie masz jeszcze konta? Zarejestruj sie!</Link>
                        <Link to="#" className="loginLink">Przypomnij hasło.</Link>
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Login;