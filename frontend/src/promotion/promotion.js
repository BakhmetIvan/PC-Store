import { Component } from "react";
import './promotion.css';
import legionImg from '../img/products/legion 1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

class Promotion extends Component{
    render(){
        return(
            <div className="promotion">
                <div className="promotion__timer">
                    <div className="timer__title">До завершення акції:</div>
                    <div className="timer__block-timer">
                        <div className="block-timer__item">
                            <div className="block-timer__number">08</div>
                            <div className="block-timer__name">Днів</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">23</div>
                            <div className="block-timer__name">Годин</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">49</div>
                            <div className="block-timer__name">Хвилин</div>
                        </div>
                        <div className="block-timer__item">
                            <div className="block-timer__number">11</div>
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