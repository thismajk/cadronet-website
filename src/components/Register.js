import Menu from "./Menu";
import Footer from "./Footer";
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

function Register(){

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('isLogin') === "true"){
            navigate('/App');
        }
    })

    const [error, setError] = useState(null);
    const [registerForm, setRegisterForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repPassword: '',
        accept: ''

    });
    const updateField = e => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }
    const updateCheckbox = e => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.checked
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post('http://localhost:8888/api/auth/register.php', JSON.stringify(registerForm))
        .then((result) => {
            console.log("info: "+result.data.info+" error: "+result.data.error);
            setError(result.data.error);
            if(result.data.info === "success"){
                navigate('/Login');
            }
        })
            
    }

    return(
        <div>
            <Menu />
            <div className="container registerPage">
                
                <div className="row">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form className="formCard col-12 col-md-8 col-lg-6 col-xl-5" onSubmit={handleSubmit}>
                        <h1>Rejestracja</h1>
                        <p className="p-20">Email</p>
                        <input type="text" placeholder="example@email.com" name="email" onChange={updateField}/>
                        <p className="p-20">Imię</p>
                        <input type="text" placeholder="Jan" name="firstName" onChange={updateField}/>
                        <p className="p-20">Nazwisko</p>
                        <input type="text" placeholder="Kowalski" name="lastName" onChange={updateField}/>
                        <p className="p-20">Hasło</p>
                        <input type="password" placeholder="hasło" name="password" onChange={updateField}/>
                        <p className="p-20">Powtórz hasło</p>
                        <input type="password" placeholder="powtórz hasło" name="repPassword" onChange={updateField}/>
                        <label>
                            <input type="checkbox" name="accept" onChange={updateCheckbox}/><span> Akceptuje <Link to="#" className="b-400">regulamin</Link> oraz <Link to="#" className="b-400">Politykę prywatności</Link></span>
                        </label>
                        <input type="submit" value="Zarejestruj"/>
                        <br />
                    </form>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Register;