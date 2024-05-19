import { Component } from "react";
import './login.css';
import closeIcon from '../img/close.svg';



class Login extends Component{
    render(){
        return(
            <div>
                <div className="login__block">
                    <div className="logreg__content">
                        <div className="switcher">
                            <div className="switcher__option switcher__option-active">Вхід</div>
                            <div className="switcher__option">Реєстрація</div>
                        </div>
                        <form action="" className="logreg__form">
                            <input type="email" placeholder="Email" className="form__input"/>
                            <input type="password" placeholder="Пароль" className="form__input"/>
                            <button type="submit" className="logreg__button">Увійти</button>
                        </form>
                    </div>
                    <div className="logreg__close"><img src={closeIcon} alt="close" /></div>
                </div>
            </div>
        )
    }
}

export default Login;