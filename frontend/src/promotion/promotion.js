import { Component } from "react";
import './promotion.css';
import legionImg from '../img/products/legion 1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

class Promotion extends Component{
    constructor(props){
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        
    }
    
    startTimer() {
        const endDate = new Date("2024-06-15");
        var userTimezoneOffset = endDate.getTimezoneOffset() * 60000;
        const endDateUTC = new Date(endDate.getTime() + userTimezoneOffset);

        this.UpdateTimer(endDateUTC);

        if (endDateUTC > new Date()) {
            this.interval = setInterval(() => this.UpdateTimer(endDateUTC), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    UpdateTimer = (deadline) => {
        const total = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(total / (1000*60*60*24)),
              hours = Math.floor((total % (1000*60*60*24)) / (1000*60*60)),
              minutes = Math.floor(total % (1000*60*60) / (1000*60)),
              seconds = Math.floor(total % (1000*60) / 1000);

        if (total <= 0) {
            clearInterval(this.interval);
            return;
        }
        this.setState({days, hours, minutes, seconds});
    }


    render(){
        this.startTimer();
        const {days, hours, minutes, seconds} = this.state;
        return(
            <div className="promotion">
                <div className="promotion__timer">
                    <div className="timer__title">До завершення акції:</div>
                    <div className="timer__block-timer">
                        <div className="block-timer__item">
                            <div className="block-timer__number">{days}</div>
                            <div className="block-timer__name">Днів</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">{hours}</div>
                            <div className="block-timer__name">Годин</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">{minutes}</div>
                            <div className="block-timer__name">Хвилин</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">{seconds}</div>
                            <div className="block-timer__name">Секунд</div>
                        </div>
                    </div>
                </div>
                <a href="#" className="promotion__sale-product">
                    <div className="sale-product__img">
                    <img src={legionImg} alt="" />
                    </div>
                    <div className="sale-product__content">
                        <div className="sale-product__title">Ноутбук ігровий Lenovo Legion 5 16IRX9 (83DG0092RA)</div>
                        <div className="sale-product__sale product__price-discount">-40%</div>
                        <ul className="sale-product__props">
                            <li className="sale-product__prop">Intel Core i7 12500 </li>
                            <li className="sale-product__prop">Nvidia RTX 4070 TI</li>
                            <li className="sale-product__prop">16 ГБ ОЗП</li>
                        </ul>
                        <div className="sale-product__price">
                            <div className="sale-product__old-price product__price-old_price">49 999</div>
                            <div className="sale-product__new-price product__price-new">39 999 <span>₴</span></div>
                        </div>
                        <div className="sale-product__button product__cart-button orange"><FontAwesomeIcon icon={faCartShopping} className="cart-shopping"/></div>
                    </div>
                    <div className="sale-product__arrows">
                        
                    </div>
                </a>
            </div>
        )
    }
}

export default Promotion;