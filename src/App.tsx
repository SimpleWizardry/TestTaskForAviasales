import React from 'react';
import './App.scss';
import logo from './img/Logo.png';
import s7logo from './img/S7 Logo.png'

const App: React.FC = () => {
  //const i:number = 3;

  return (
    <div className='screen'>
        <div className='container main'>
            <div className='row logo-holder'>
                <img src={logo} alt='logo' />
            </div>
            <div className='container row main-content_holder'>
                <div className='col s4 m4 l4'>
                    <div className='main-content_holder--input_block'>
                        <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
                        <form action="#">
                            <p>
                                <label>
                                    <input className="checkbox-input filled-in" type="checkbox"/>
                                    <span>Все</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="filled-in checkbox-input" type="checkbox"/>
                                    <span>Без пересадок</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="filled-in checkbox-input" type="checkbox"/>
                                    <span>1 пересадка</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="filled-in checkbox-input" type="checkbox"/>
                                    <span>2 пересадки</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="filled-in checkbox-input" type="checkbox"/>
                                    <span>3 пересадки</span>
                                </label>
                            </p>
                        </form>
                    </div>
                </div>
                <div className='col s8 m8 l8'>
                    <div className='row main-content_holder--filter_tabs'>
                        <ul className="tabs">
                            <li className="tab col s4">
                                <a href="#test1">САМЫЙ ДЕШЕВЫЙ</a>
                            </li>
                            <li className="tab col s4">
                                <a  href="#test2">САМЫЙ БЫСТРЫЙ</a>
                            </li>
                            <li className="tab col s4">
                                <a className="active" href="#test4">ОПТИМАЛЬНЫЙ</a>
                            </li>
                        </ul>
                    </div>
                    <div className='row main-content_holder--ticket'>
                        <div className='row main-content_holder--ticket__top-line'>
                            <span className='ticket-price'>13 400 р</span>
                            <div className='col l4'>
                            </div>
                            <img src={s7logo} alt='s7-logo' />
                        </div>
                        <div className='row ticket-info'>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    MOW - HKT
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    10:45 - 08:45
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    В ПУТИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    21ч 15м
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    2 ПЕРЕСАДКИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    HKG, JNB
                                </span>
                            </div>
                        </div>

                        <div className='row ticket-info'>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    MOW - HKT
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    10:45 - 08:45
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    В ПУТИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    21ч 15м
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    2 ПЕРЕСАДКИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    HKG, JNB
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
