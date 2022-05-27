import "./styles/NavBoard.css";
import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

function NavBoard(){

    const navigate = useNavigate()
    const [userName, setUserName] = useState(null);
    const userKey = localStorage.getItem("userKey");

    const logout = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:8888/api/auth/logout.php', '{"userKey": "'+userKey+'"}')
        .then(
            localStorage.setItem("isLogin", "false"),
            localStorage.setItem("email", ""),
            navigate("/Login")
        )
    }

    useEffect(() => {
        getName();
    });

    const getName = () => {
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getUserName", "userKey": "'+userKey+'"}')
        .then((result) => {
            setUserName(result.data.userName);
        })
    }   



    return(
        <nav className="navBoard">
            <div className="logoWhite">Cadronet</div>
            <i className="fa-solid fa-circle-user userIcon"></i> 
            <p>{userName}</p>
            <Link className="navButton" to="/App"><i className="fa-solid fa-chart-column"></i>Dashboard</Link>
            <Link className="navButton" to="/App/Schedule"><i className="fa-solid fa-calendar-days"></i> Grafik pracy</Link>
            <Link className="navButton" to="/App/Availability"><i className="fa-solid fa-clipboard-list"></i> Dyspozycja</Link>
            <Link className="navButton" to="/App/Settings"><i className="fa-solid fa-gear"></i>Ustawienia</Link>
            <Link className="navButton" to="#"  onClick= {logout}><i className="fa-solid fa-right-from-bracket"></i>Wyloguj</Link>
        </nav>
    )
}

export default NavBoard;