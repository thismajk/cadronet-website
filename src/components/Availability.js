import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import NavBoard from './NavBoard';
import "./styles/Availability.css";

function Availability(){
    const [nav, setNav] = useState(0);
    const [av, setAv] = useState();
    const [dateDisplay, setDateDisplay] = useState('');
    const [calendar, setCalendar] = useState([]);
    const [clicked, setClicked] = useState();

    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('isLogin') !== "true"){
            navigate('/login');
        }
    })

    const goNext = () =>{
        setNav(nav + 1);
    };
    const goBack = () =>{
        setNav(nav - 1 );
    }

    const getAv = () =>{
        const userKey = localStorage.getItem("userKey");
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getAvailability", "userKey": "'+userKey+'"}')
        .then((result) => {
          const rep = result.data;
          setAv(rep);
        });
    };

    useEffect(() => getAv(), []);
    
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

        const weekdays = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
        const daysInMonth = new Date(selYear, selMonth+1, 0).getDate();
        const firstDayOfMonth = new Date(selYear, selMonth, 1);
        const dateString = firstDayOfMonth.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = [];
        if(av){
            for(let i=1; i <= daysInMonth+paddingDays; i++){
                const dayString = `${selYear}-${('0' + (selMonth + 1)).slice(-2)}-${('0' + (i - paddingDays)).slice(-2)}`;
                if(i > paddingDays){
                    daysArr.push({
                        value: i-paddingDays, 
                        isCurrentDay: i - paddingDays === day && nav === 0,
                        date: dayString,
                        availability: av[dayString],
                    });
                }
                else{
                    daysArr.push({
                        value: 'padding',
                        isCurrentDay: false,
                        date: '',
                        availability: null,
                    });
                }
            }
        }
        setCalendar(daysArr);

    }, [nav, av]);

    const Day = ({day, onClick}) => {
       const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
       return(
            <div onClick={onClick} className={className}>
                {day.value === 'padding' ? '' : day.value}
                {day.availability && <div className={`event ${day.availability.status === 'Dostępny'? "avAllow" : ""} ${day.availability.status === 'Niedostępny'? "avDeny" : ""}`}>{day.availability.status}</div>}
            </div>
       );
    };

    const AvPopup = ({ onSave, onClose }) =>{
        const [dayAv, setDayAv] = useState('');
        return(
            <>
                <div id="newEventModal">
                    <h2>Dodawanie dyspozycji</h2>
                    <select
                    onChange={e => setDayAv(e.target.value)} 
                    value={dayAv} >  
                        <option>Wybierz dostępność</option>
                        <option value="Dostępny">Dostępny</option>
                        <option value="Niedostępny">Niedostępny</option>
                    </select>

                    <button onClick={() => {if (dayAv) { onSave(dayAv); } }} id="saveButton">Save</button>
                    <button 
                        onClick={onClose}
                        id="cancelButton">Cancel
                    </button>
                </div>
                <div id="modalBackDrop"></div>
            </>
          );
        };
  
    
    return(
        <>
            <NavBoard />
            <div className="appContent">
                <div id="header">
                    <button onClick = {goBack} id="backButton"><i className="fa-solid fa-angle-left"></i></button>
                    <div>{ dateDisplay }</div>
                    <button onClick = {goNext} id="nextButton"><i className="fa-solid fa-angle-right"></i></button>
                </div>
            <div id="weekdays">
                <div>Poniedziałek</div>
                <div>Wtorek</div>
                <div>Środa</div>
                <div>Czwartek</div>
                <div>Piątek</div>
                <div>Sobota</div>
                <div>Niedziela</div>
            </div>
            
            <div id="calendar">   
                {calendar.map((d, index) => (
                    <Day
                        key={index} 
                        day={d}
                        onClick={() => {
                            if (d.value !== 'padding') {
                              setClicked(d.date);
                            }
                        }}
                    />
                ))}
            </div>
            {clicked && <AvPopup 
                onClose={() => setClicked(null)}
                onSave={dayAv => {
            
                    const userKey = localStorage.getItem("userKey");
      
                    axios.post('http://localhost:8888/api/auth/setAv.php',
                    '{"userKey": "'+userKey+'", "date": "'+clicked+'", "title": "'+dayAv+'"}')
                    .then((result) => {
                    
                      setAv(result.data);
                    })
                    setClicked(null);
                }}
            />}


                
            </div>
        </>
    );
}

export default Availability;

