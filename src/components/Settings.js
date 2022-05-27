import NavBoard from "./NavBoard";
import axios from "axios";
import React, { useEffect, useState } from 'react';
function Settings(){
    const [pin, setPin] = useState();
    const userKey = localStorage.getItem("userKey");
   
    axios.post('http://localhost:8888/api/auth/getData.php', '{"functionName": "getPin", "userKey": "'+userKey+'"}')
    .then((result) => {
        setPin(result.data);
        console.log(result.data);
    });

    return(
        <>
            <NavBoard/>
            <div className="appContent">
                <h1>Ustawienia</h1>
                <p>PIN: {pin}</p>
                <hr />
                <span>Stare hasło</span><br/>
                <input type="passowrd" /><br/>
                <span>Nowe hasło</span><br/>
                <input type="passowrd" /><br/>
                <span>Powtórz nowe hasło</span><br/>
                <input type="passowrd" /><br/>
                <br />  

                <input type="button" value="Zmień hasło" className="simpleBtn"/>
            </div>
        </>
    );
}
export default Settings;