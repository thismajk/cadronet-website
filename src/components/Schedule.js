import NavBoard from './NavBoard';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/Schedule.css";
function Schedule(){
    const [nav, setNav] = useState(0);
    const [dateDisplay, setDateDisplay] = useState('');
    const [days, setDays] = useState([]);
    const [schedule, setSchedule] = useState();
    

    const goNext = () =>{
        setNav(nav + 1);
    };
    const goBack = () =>{
        setNav(nav - 1 );
    }

    const getSchedule = () =>{
        const userKey = localStorage.getItem("userKey");
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getSchedule", "userKey": "'+userKey+'"}')
        .then((result) => {
          setSchedule(result.data);
        });
    };

    useEffect(() => getSchedule);

    useEffect(()=>{
        const dt = new Date();
        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        let selMonth = month + nav; 
        let selYear = year;

        if(selMonth >= 0){
            while(selMonth/12 >= 1){
                selMonth = selMonth - 12;
                selYear = selYear + 1;
            }
        }
        else{
            selMonth = selMonth * (-1)+11;
                while(selMonth/12 >= 1){
                    selMonth = selMonth - 12;
                    selYear = selYear - 1;
                } 
                selMonth = 11 - selMonth;
        }
       
        const monthMap = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
        setDateDisplay(monthMap[selMonth]+" | "+selYear);

        const daysInMonth = new Date(selYear, selMonth+1, 0).getDate();

        const daysArr = [];
        
        for(let i=1; i <= daysInMonth; i++){
            const dayString = `${selYear}-${('0' + (selMonth + 1)).slice(-2)}-${('0' + (i)).slice(-2)}`;
            const weekDay = new Date(dayString).toLocaleDateString('pl-PL', {
                weekday: 'long',
            }) 
            daysArr.push({
                date: dayString,
                weekDay: weekDay,
            });
        }

        setDays(daysArr);
    }, [nav]);

    const Day = ({day}) =>{
        return(
            <div className = "scheduleDay">
                <div className = "dayInfo">
                    <div>{day.date}</div>
                    <div>{day.weekDay}</div>
                </div>
                <div className = "scheduleInfo">
                    {schedule && schedule[day.date] ? <div className='scheduleCard'>{schedule[day.date].hourIn} : {schedule[day.date].hourOut} </div> : <div className='scheduleNone'> Brak zmiany</div>}
                </div>
                <div style={{clear: "both"}}></div>
            </div>
        )
    }

    return(
        <>
        <NavBoard />
        <div className="appContent">
            <div id="header">
                <button onClick = {goBack} id="backButton"><i className="fa-solid fa-angle-left"></i></button>
                <div>{ dateDisplay }</div>
                <button onClick = {goNext} id="nextButton"><i className="fa-solid fa-angle-right"></i></button>
            </div>
            <Link to="/App/Schedule/Create-Schedule" className="simpleBtn"><i className="fa-solid fa-plus"></i> Utwórz grafik</Link>
            <div style={{clear: 'both'}}></div>
            <div className="schedule">
                {days.map((d, index) => (
                    <Day
                        key={index} 
                        day={d}
                    />
                ))}
            </div>
            
        </div>

        
            
    </>
    );
}

export default Schedule;