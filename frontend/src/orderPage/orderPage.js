import React, {useState, useEffect} from "react"; 
import './orderPage.css';

const OrderPage = () => {

    return(
        <div className="wrapper">
            <div className="container">
                <div className="order-page">
                    <div className="order-page__title">Оформлення замовлення</div>
                    <div className="order-page__section">
                        <div className="order-page__subtitle">Товари в кошику</div>
                    </div>
                    <div className="order-page__section">
                        <div className="order-page__subtitle">Контактні дані</div>
                        <div className="order-page__contact-inputs">
                            <div className="order-page__contact-inputs-up">
                                <input required type="text" name='last_name' placeholder="Прізвище" className="order-page__contact-input-up"/>
                                <input required type="text" name='first_name' placeholder="Ім'я" className="order-page__contact-input-up"/>
                                <input type="text" name='middle_name' placeholder="По батькові" className="order-page__contact-input-up"/>
                            </div>
                            <div className="order-page__contact-inputs-down">
                                <input required type="tel" name='tel' placeholder="Номер телефону" className="order-page__contact-input-up" />
                                <input required type="email" name='email' placeholder="Email" className="order-page__contact-input-up" />
                            </div>
                        </div>
                    </div>
                    <div className="order-page__section">
                        <div className="order-page__subtitle">Оплата</div>
                        <div className="order-page-payment__checkbox">
                            <label className="order-page-payment__item">
                                <input type="radio"  name="payment" value={1}/>
                                Оплата при отриманні
                            </label>
                            <label className="order-page-payment__item">
                                <input type="radio" name="payment" value={2}/>
                                Оплата карткою онлайн
                            </label>
                        </div>
                    </div>
                </div>


                <div className="order-count">
                    <div className="order-count__title">Ціна замовлення :</div>
                    <ul className="order-count__list">
                        <li className="order-count__item">
                            <div className="order-count__item-text">2 товари на суму</div>
                            <div className="order-count__item-price">39 999 <span>₴</span></div>
                        </li>
                        <li className="order-count__item">
                            <div className="order-count__item-text">Вартість доставки</div>
                            <div className="order-count__item-price">200 <span>₴</span></div>
                        </li>
                        <li className="order-count__item">
                            <div className="order-count__item-text">Знижка</div>
                            <div className="order-count__item-price">- 400 <span>₴</span></div>
                        </li>
                    </ul>
                    <div className="order-count__total-price">
                        <div className="order-count__total-price-text">До сплати</div>
                        <div className="order-count__total-price-price">39 799 <span>₴</span></div>
                    </div>
                    <div className="order-count__button">Підтвердити замовлення</div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;