import { Component } from "react";
import "./register.css";
import truckIcon from "../img/truck.svg";
import boxIcon from "../img/box-open-solid 1.svg";
import squareCheckIcon from "../img/square-check-solid 1.svg";
import briefcaseIcon from "../img/briefcase-solid 1.svg";
import closeIcon from '../img/close.svg';


class Register extends Component {
    render(){
        return(
            <div>
                <div className="reg__blocks">
                    <div className="reg__block">
                        <div className="logreg__content">
                            <div className="switcher">
                                <div className="switcher__option">Вхід</div>
                                <div className="switcher__option switcher__option-active">Реєстрація</div>
                            </div>
                            <form action="" className="logreg__form">
                                <div className="input__name">
                                    <input type="text" placeholder="Ім'я" className="form__input input-short"/>
                                    <input type="text" placeholder="Прізвище" className="form__input input-short"/>
                                </div>
                                <input type="email" placeholder="Email" className="form__input"/>
                                <input type="tel" placeholder="Номер телефону" className="form__input"/>
                                <input type="password" placeholder="Пароль" className="form__input"/>
                                <input type="password" placeholder="Підтвердження пароля" className="form__input"/>
                                <button type="submit" className="logreg__button">Зареєструватися</button>
                        </form>
                        </div>
                    </div>
                    <div className="reg__info">
                        <div className="reg-info__content">
                            <div className="reg-info__logo">Logo</div>
                            <ul className="reg-info__list">
                                <li className="reg-info__item"><img src={truckIcon} alt="" />Швидка доставка</li>
                                <li className="reg-info__item"><img src={boxIcon} alt="" />Велика кількість товарів</li>
                                <li className="reg-info__item"><img src={squareCheckIcon} alt="" />Контроль якості</li>
                                <li className="reg-info__item"><img src={briefcaseIcon} alt="" />На ринку з 2014 року</li>
                            </ul>
                            <div className="reg-info__contacts">
                                <div className="reg-info-contacts__content">
                                    <div className="reg-info-contacts__item">Email: fortlviv@nure.ua</div>
                                    <div className="reg-info-contacts__item">Телефон: 099 999 00 99</div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logreg__close"><img src={closeIcon} alt="close" /></div>
                </div>
            </div>
        )
    }
}


export default Register;