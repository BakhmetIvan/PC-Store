import React, { Component } from 'react';
import axios from 'axios';
import "./register.css";
import truckIcon from "../img/truck.svg";
import boxIcon from "../img/box-open-solid 1.svg";
import squareCheckIcon from "../img/square-check-solid 1.svg";
import briefcaseIcon from "../img/briefcase-solid 1.svg";
import closeIcon from '../img/close.svg';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                repeatPassword: ''
            },
            errorMessage: '',
            regStatus: false
        }
    }

    goHome = () => 
    {
    window.location.href="/";
    }


  ////////////////MODAL/////////////////////////
  handleCloseModal = () => {
    this.props.onModalClose();
    document.body.style.overflow = 'scroll';
}

wrapperCloseModal = (e) => {
    if(e.target.classList.contains('auth__background')){
        this.handleCloseModal();
    }
}



    onHandleChange = (e) => {
        this.setState(prevState => ({
                     formData: {
                         ...prevState.formData,
                         [e.target.name]: e.target.value
                     }
                 }));
    }

    onHandleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.formData);
        try {
                     const response = await axios.post('http://26.69.114.65:8080/auth/registration', this.state.formData, {
                         headers: {
                             'Content-Type': 'application/json'
                         }
                     });
                     console.log(response.data); 
                     this.setState({
                        errorMessage: '',
                        regStatus: true
                     })
                     setTimeout(() => {
                        this.props.handleModal();
                     }, 3000);
        } catch (error) {
                    console.error('Ошибка при регистрации:', error.response.data); 
                    this.setState({
                    errorMessage: error.response.data
                    })
        }
    }

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://26.69.114.65:8080/authentication/login', this.state.formData, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log(response.data); // Обработка успешного ответа от бекенда
    //     } catch (error) {
    //         console.error('Ошибка при регистрации:', error.response.data); // Обработка ошибки от бекенда
    //     }
    // };

    render() {
        const {firstName, lastName, email, phoneNumber, password, repeatPassword, errorMessage} = this.state;
        return (
            <div className='auth__background' onClick={this.wrapperCloseModal}> 
                <div className='auth__modal'>
                    <div className={`reg__blocks ${this.props.modalActive ? '' : ' modal-active'}`}>
                        <div className="reg__block">
                            <div className="logreg__content">
                                <div className="switcher">
                                    <div className="switcher__option" onClick={this.props.handleModal}>Вхід</div>
                                    <div className="switcher__option switcher__option-active">Реєстрація</div>
                                </div>
                                {this.state.regStatus
                                ?   <div className='reg-succeed'>All ok</div>
                                :   <form onSubmit={this.onHandleSubmit} className="logreg__form">
                                        {errorMessage && <div className='reg__error'>{errorMessage.errors[0]}</div> }
                                            <div className="input__name">
                                                <input type="text" name="firstName" value={firstName} placeholder="Ім'я" className="form__input input-short" onChange={this.onHandleChange}/>
                                                <input type="text" name="lastName" value={lastName} placeholder="Прізвище" className="form__input input-short" onChange={this.onHandleChange} />
                                            </div>
                                            <input type="email" name="email" value={email} placeholder="Email" className="form__input" onChange={this.onHandleChange} />
                                            <input type="number" name="phoneNumber" value={phoneNumber} placeholder="Номер телефону" className="form__input" onChange={this.onHandleChange} />
                                            <input type="password" name="password" value={password} placeholder="Пароль" className="form__input" onChange={this.onHandleChange}/>
                                            <input type="password" name="repeatPassword" value={repeatPassword} placeholder="Підтвердження пароля" className="form__input" onChange={this.onHandleChange} />
                                            <button type="submit" className="logreg__button">Зареєструватися</button>
                                    </form>}
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
                            <div className="logreg__close" onClick={this.handleCloseModal}><img src={closeIcon} alt="close" /></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Register;
