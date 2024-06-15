import { Component } from "react";
import './footer.css';
import instaIcon from '../img/instagram 1.svg';
import clockIcon from '../img/clock-regular 1.svg';

class Footer extends Component{
    render(){
        return(
                <footer className="footer">
                    <div className="wrapper">
                        <div className="footer__content">
                            <div className="footer__logo logo">Logo</div>
                            <div className="footer__instas-list">
                                <div className="footer__title">Соцмережі</div>
                                <ul className="footer__instas">
                                    <li className="footer__insta">
                                        <a href="#" className="footer_insta-link">
                                            <div className="footer__insta-logo"><img src={instaIcon} alt="" /></div>
                                            <div className="footer__insta-name">Чернявский Павло</div>
                                        </a>
                                    </li>
                                    <li className="footer__insta">
                                        <a href="#" className="footer_insta-link">
                                            <div className="footer__insta-logo"><img src={instaIcon} alt="" /></div>
                                            <div className="footer__insta-name">Бахмет Іван</div>
                                        </a>
                                    </li>
                                    <li className="footer__insta">
                                        <a href="#" className="footer_insta-link">
                                            <div className="footer__insta-logo"><img src={instaIcon} alt="" /></div>
                                            <div className="footer__insta-name">Макаренко Сергій</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__contact">
                                <div className="footer__title">Контактний номер</div>
                                <ul className="footer__contact-list">
                                    <li className="footer__contact-vodafone">+38 099 000 99 99</li>
                                </ul>
                            </div>
                            <div className="footer__timetable">
                                <div className="footer__title">Графік роботи</div>
                                <div className="footer__timetable-item">
                                    <img src={clockIcon} alt="" />
                                    <span>ПН - НД 9:00 - 21:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
        )
    }
}

export default Footer;