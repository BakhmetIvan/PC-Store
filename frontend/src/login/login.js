import { Component } from "react";
import axios from 'axios';
import './login.css';
import closeIcon from '../img/close.svg';



class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',
            },
            errorMessage: false,
        }
    }

    goHome = () => {
        window.location.href = '/';
    }    

    ////////////////MODAL/////////////////////////
    handleCloseModal = () => {
        this.props.onModalClose();
        document.body.style.overflowY = 'scroll';
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
            const response = await axios.post('http://26.69.114.65:8080/auth/login', this.state.formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data); // Обработка успешного ответа от бекенда
            const token = response.data.token;
            localStorage.setItem('token', token);
            this.setState({
                errorMessage: false,
             })
             window.location.reload();
            } catch (error) {
            this.setState({
                errorMessage: true
             })
        }
    }
    render(){
        const {email, password, errorMessage} = this.state;
        console.log(this.props.isLoginVisible);
        return(
            <div className='auth__background' onClick={this.wrapperCloseModal}>    {/* onClick={this.wrapperCloseModal} */}
                <div className='auth__modal'>
                {/* <div className={`auth__modal ${this.props.isLoginVisible ? ' hidden' : ' active'}`}> */}
                    {/* <div className={`login__block ${this.props.modalActive ? ' modal-active' : ''}`}> */}
                    {/* <div className={`login__block ${this.props.isLoginVisible ? ' active' : ' hidden'}`}> */}
                        <div className="login__block">
                        <div className="logreg__content">
                            <div className="switcher">
                                <div className="switcher__option switcher__option-active">Вхід</div>
                                <div className="switcher__option" onClick={this.props.handleModal}>Реєстрація</div>
                            </div>
                            <form action="" onSubmit={this.onHandleSubmit} className="logreg__form">
                                {errorMessage && <div className='reg__error'>Неправильний логін або пароль</div> }
                                <input required type="email" name='email' value={email} placeholder="Email" className="form__input" onChange={this.onHandleChange}/>
                                <input required type="password" name='password' value={password} placeholder="Пароль" className="form__input" onChange={this.onHandleChange}/>
                                <button type="submit" className="logreg__button">Увійти</button>
                            </form>
                        </div>
                        <div className="logreg__close" onClick={this.handleCloseModal}><img src={closeIcon} alt="close" /></div>  {/* onClick={this.handleCloseModal} */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;