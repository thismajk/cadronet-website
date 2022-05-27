import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import "./styles/Home.css";
import heroImg from '../img/heroImg.svg';
import homeImg1 from '../img/homeImg1.svg';
import homeImg2 from '../img/homeImg2.svg';
import homeImg3 from '../img/homeImg3.svg';


function Home(){
    return(
        <div className="container-fluid">
            <Menu />
            <div className="hero">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="heroTextBox">
                            <div className="heroHeader">Cadronet</div>
                            <div className="heroText">Jest to system ewidencji czasu pracy, dzięki któremu znacząco ułatwisz pracę kadr!</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <img className="heroImg" src= {heroImg} alt="hero"/>
                    </div>
                </div>
            </div>

            <p className="homeHeader">JAKIE MOZLIWOŚCI DAJE CADRONET?</p>

            <div className="row homeSection">
                
                <div className="col-12 col-lg-6 homeSectionImg">
                        <img className="homeImg" src= {homeImg1} alt="planner"/>
                </div>
                <div className="col-12 col-lg-6 homeSectionText ">
                    <div className="heightMiddle">
                        <h1 className="homeSectionHeader">Planowanie Grafików</h1>
                        <p>Prosty i przejżysty system tworzenia grafików dla pracowników, do którego będziesz mieć dostęp z kazdego miejsca na świecie!</p>
                        <p>Po utworzeniu grafiku każdy pracownik będzie miał do niego dostęp, oraz możlowść zgłoszenia błędów.</p>
                        <p>System dyspozycji, w którym każdy pracownik będzie zgłaszać dni oraz godziny w które jest dostępny </p>
                    </div>  
                </div>
            </div>

            <div className="row homeSection">
                <div className="col-12 col-lg-6 homeSectionText">
                    <div className="heightMiddle">
                        <h1 className="homeSectionHeader">Licznik czasu pracy</h1>
                        <p>Do obliczania czasu pracy każdy pracownik będzie musiał przed rozpoczęciem zmiany zalogować się do systemu, oraz po zakończeniu zmiany wylogować się.</p>
                        <p className="bold-400">Logowanie do systemu jest możliwe poprzez:</p>
                        <ul>
                            <li>Wpisanie kodu PIN na urządzeniu słóżbowym</li>
                            <li>Zeskanowanie kodu qr w aplikacji na swoim użadzeniu</li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-lg-6 homeSectionImg"><img className="homeImg" src= {homeImg2} alt="timer"/></div>
            </div>
            <div className="row homeSection">
                <div className="col-12 col-lg-6 homeSectionImg"><img className="homeImg" src= {homeImg3} alt="analytics"/></div>
                <div className="col-12 col-lg-6 homeSectionText">
                    <div className="heightMiddle">
                        <h1 className="homeSectionHeader">Analiza czasu pracy  </h1>
                        <p className="bold-400">Jako pracodawca masz podglad do danych takich jak:   </p>
                        <ul>
                            <li>Ilość przepracowanych przez pracownika godzin </li>
                            <li>Szacowany Czas pracy w miesącu </li>
                            <li>Należność za przepracowany czas </li>
                            <li>Zarejestrowane spóźnienia</li>
                            <li>Zarejestrowane nieobecności </li>
                            <li>Lista obecności na żywo</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Home;