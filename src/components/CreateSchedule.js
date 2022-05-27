import React, { useEffect, useState } from 'react';
import NavBoard from './NavBoard';
import axios from 'axios';
import "./styles/CreateSchedule.css";
function CreateSchedule(){
    const [employeesAv, setEmployessAv] = useState();
    const [employeesSchedule, setEmployeesSchedule] = useState();
    const [nav, setNav] = useState(0);
    const [dateDisplay, setDateDisplay] = useState('');
    const [dayHeader, setDayHeader] = useState([]);
    const [usersName, setUsersName] = useState([]);
    const [clicked, setClicked] = useState(null);
    

    const goNext = () =>{
        setNav(nav + 1);
    };
    const goBack = () =>{
        setNav(nav - 1 );
    }

    const getEmployeesAv = () =>{
        const userKey = localStorage.getItem("userKey");
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getEmployeesAv", "userKey": "'+userKey+'"}')
        .then((result) => {
          setEmployessAv(result.data);
          console.log(result.data);
        });
    }

    useEffect(() => getEmployeesAv(), []);

    const getEmployeesSchedule = () =>{
        const userKey = localStorage.getItem("userKey");
        axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getEmployeesSchedule", "userKey": "'+userKey+'"}')
        .then((result) => {
          setEmployeesSchedule(result.data);
        });
    }
    useEffect(() => getEmployeesSchedule(), []);

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
            daysArr.push({
                value: dayString 
            });
        }

        if(employeesAv){
            const usersArr = [];
            for(let i = 0; i < employeesAv["users"]; i++){
                const name = employeesAv[employeesAv["usersId"][i]].fistName+" "+employeesAv[employeesAv["usersId"][i]].lastName;
                const userId = employeesAv["usersId"][i];
                usersArr.push({name, daysInMonth, userId});
            }
            setUsersName(usersArr);
        }
        
        
        setDayHeader(daysArr);

    }, [nav, employeesAv]);

     const DayHeader = ({day}) => { 
        return(
             <th>
                 {day.value}
             </th>
        );
     };

     const SchedulePopup = ({onClose, onSave}) =>{
        const [schedule, setSchedule] = useState();
         return(
             <>
                <div id="newEventModal">
                <h4>Dodaj zmianę</h4>
                
                <i onClick={onClose} className="fa-solid fa-xmark"></i>
                <h6>{clicked[1]}</h6>
                <br/>
                Od <input type="time" name="hourIn" onChange={e => setSchedule({...schedule, [e.target.name]: e.target.value})}/> do <input type="time" name="hourOut" onChange={e => setSchedule({...schedule, [e.target.name]: e.target.value})}/>
                <button onClick={() =>{if(schedule['hourIn'] && schedule['hourOut']){ onSave(schedule)}}} id="saveButton">Save</button>   
            </div>
            <div id="modalBackDrop"></div>
            
        </>
         );
     }

     const Employees = ({employee, days}) => {
        const employeeDays = [];
            for(let i=0; i < employee.daysInMonth; i++){
                employeeDays.push(<td key={i} onClick={() => setClicked([employeesAv[employee.userId]['id'], days[i].value])}  className={`${employeesAv[employee.userId]["availability"][days[i].value] === 'Dostępny'? "eAvAllow" : ""} ${employeesAv[employee.userId]["availability"][days[i].value] === 'Niedostępny'? "eAvDeny" : ""}`}>
                    {employeesSchedule[employee.userId]["schedule"][days[i].value] && <div className="scheduleWrapper"> {employeesSchedule[employee.userId]["schedule"][days[i].value].hourIn}-{employeesSchedule[employee.userId]["schedule"][days[i].value].hourOut}</div>}
                    
                    
                </td>);
            }
            
            return(
                <tr>
                    <td>
                        {employee.name} 
                    </td>
                    {employeeDays}
                    
                </tr>
            );
     };
    //if(employeesSchedule){
      //  console.log(employeesSchedule["1"]["schedule"]["2022-04-01"].hourIn);
    //}
     
    return(
        <>
        <NavBoard />
        <div className="appContent">
            <div id="header">
                <button onClick = {goBack} id="backButton"><i className="fa-solid fa-angle-left"></i></button>
                <div>{ dateDisplay }</div>
                <button onClick = {goNext} id="nextButton"><i className="fa-solid fa-angle-right"></i></button>
            </div>
            
            <div id="CreateSchedule">
                <table>
                    <tbody>
                        <tr>
                            <th>Imie i Nazwisko</th>
                            {dayHeader.map((d, index) => (
                                <DayHeader
                                    key={index} 
                                    day={d}
                                />
                            ))}
                        </tr>
                        
                        {usersName.map((e, index) => (
                            <Employees
                                key={index} 
                                employee={e}
                                days={dayHeader}
                            />
                        ))}
                    </tbody>
                </table>
                
            </div>

            {clicked && <SchedulePopup
                onClose={() => setClicked(null)}
                onSave={(schedule) => {
                    const userKey = localStorage.getItem("userKey");
      
                    axios.post('http://localhost:8888/api/auth/setSchedule.php',
                    '{"userKey": "'+userKey+'", "date": "'+clicked[1]+'", "id": "'+clicked[0]+'", "hourIn": "'+schedule.hourIn+'", "hourOut": "'+schedule.hourOut+'"}')
                    .then((result) => {
                        setEmployeesSchedule(result.data);
                    })

                    setClicked(null)
                    
                }}

                />
            }
          
        </div>
    </>
    );
}

export default CreateSchedule;