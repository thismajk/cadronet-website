import './styles/Footer.css';
import { Link } from "react-router-dom";
import React from 'react';

function Footer(){
    return(
        <footer>
            <nav>
                <Link to="#" className="footerBtn">Logowanie</Link>
                <Link to="#" className="footerBtn">Rejestracja</Link>
                <Link to="#" className="footerBtn">Regulamin</Link>
                <Link to="#" className="footerBtn">Polityka prywatności</Link>
                <Link to="#" className="footerBtn">Kontakt</Link>
            </nav>
            <div className="footerBottom">Cadronet 2022 | All rights reserved</div>
        </footer>
    );
}

export default Footer;
