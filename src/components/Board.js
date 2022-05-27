import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import NavBoard from './NavBoard';
function Board(){
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('isLogin') !== "true"){
            navigate('/login');
        }
    })

    const [workReg, setWorkReg] = useState(0);
    const [workPlan, setWorkPlan] = useState(0);
    const [workHours, setWorkHours] = useState(0);
    const [profit, setProfit] = useState(0);

    const getDataDashboard = () => {
        const userKey = localStorage.getItem("userKey");
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getDashboard", "userKey": "'+userKey+'"}')
        .then((result) => {
            setWorkReg(result.data.workReg);
            setWorkPlan(result.data.workPlan);
            setWorkHours(result.data.workHours);
            setProfit(result.data.profit);
        });
    }

    useEffect(() => { getDataDashboard() });
    
    
    return(
        <>
            <NavBoard />
            <div className="appContent">
                <h1>Dashboard</h1>
                <div className="wrapper">
                    <div>Zarejestrowane zmiany: {workReg}</div>
                    <div>Zaplanowane zmiany: {workPlan}</div>
                    <div>Przepracowane godziny: {workHours}h</div>
                    <div>Wynagrodzenie: {profit}PLN</div>
                </div>
            </div>
            
        </>
    );
}


export default Board;