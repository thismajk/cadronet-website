import { BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import './styles/Menu.css';
function Menu(){
    return(
        <div className="menu">
            <Link to="/" className="logo">Cadronet</Link>
            <nav>
                <Link to="../Login" className="nav-btn">Logowanie</Link>
                <Link to="../Register" className="nav-btn">Rejestracja</Link>
            </nav>
            <div className="clear"></div>
        </div>
    );
}

export default Menu;
