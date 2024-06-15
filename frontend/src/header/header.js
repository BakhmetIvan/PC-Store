import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faHeart, faArrowRightFromBracket, faMessage, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import compareIcon from "../img/scale-balanced-solid 1.svg";
import favouriteIcon from "../img/heart-regular 1.svg";
import cartIcon from "../img/cart-shopping-solid 1.svg";
import searchIcon from "../img/magnifying-glass-solid 1.svg";
import circleUser from "../img/circle-user-regular 1.svg";
import legionImg from '../img/products/legion 1.jpg';
import axios from 'axios';

const Header = (props) => {
    const [searchText, setSearchText] = useState('');

    const token = localStorage.getItem('token');
    let currentQuantity = 1;


    // const cartItemRequest = (id) => {
    //     setIsLoading(true);
    //     const token = localStorage.getItem('token');
    //     fetch(`http://26.69.114.65:8080/cart/${id}`, {
    //        method: 'GET',
    //        headers: {
    //            "Content-Type": 'application/json',
    //            'Authorization': `Bearer ${token}`
    //        },
    //    })
    //    .then(response => response.json())
    //    .then(data => {
    //        setCartData[id](data);
    //        setIsLoading(false);
    //        console.log(data);
    //    })
    //    .catch(error => {
    //        setIsLoading(false);
    //        console.log('Error fetching products:', error);
    //    });
    // }
    const onPlusAmount = async (id) => {
        const item = props.cartData.cartItems.find(item => item.id === id);
        if (!item) return;

        let quantity = item.quantity + 1;
        let reviewData = { quantity }; // Убедитесь, что данные отправляются как объект


        try {
            const response = await axios.put(`http://26.69.114.65:8080/cart/${id}`, reviewData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data); 
            props.cartRequest();
        } catch (error) {
            console.error("There was an error adding to the cart:", error);
        }
        console.log(id);
        console.log(currentQuantity);
    };

    const onMinusAmount = async (id) => {
        const item = props.cartData.cartItems.find(item => item.id === id);
        if (!item) return;

        const quantity = item.quantity - 1;
        const reviewData = { quantity }; // Убедитесь, что данные отправляются как объект
        currentQuantity = quantity;


        try {
            const response = await axios.put(`http://26.69.114.65:8080/cart/${id}`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data); 
            props.cartRequest();
        } catch (error) {
            console.error("There was an error adding to the cart:", error);
        }
        console.log(id);
        console.log(currentQuantity)
    };


    const onDeleteItem = async (id) => {

        // let reviewData = { id }; // Убедитесь, что данные отправляются как объект

        try {
            const response = await axios.delete(`http://26.69.114.65:8080/cart/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data); 
            props.cartRequest();
        } catch (error) {
            console.error("There was an error adding to the cart:", error);
        }
        console.log(id);
        console.log(currentQuantity);
    };
    // const onPlusAmount = () => {
    //     fetch(`http://26.69.114.65:8080/cart`, {
    //         method: 'UPDATE',
    //         headers: {
    //             "Content-Type": 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setCartData(data);
    //         setIsLoading(false);
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         setIsLoading(false);
    //         console.log('Error fetching products:', error);
    //     });
    // }

    const onHandleChange = (e) => {
        setSearchText(e.target.value);
    }

    const onHandleClear = () => {
        setSearchText('');
    }

    const quitAccount = () => {
        localStorage.removeItem('token');
    }

    const isAuthorized = localStorage.getItem('token');

    const cartItems = props.isLoading
    ? <div>Loading...</div>
    : props.cartData.cartItems && 
        props.cartData.cartItems.map((cart, index) => {
            const imageSrc = cart.image && cart.image.data ? `data:image/jpeg;base64,${cart.image.data}` : '';
            return (
                <li key={index} className="cart-modal-product">
                    <a href={`/product/${cart.laptopId}`} className="cart-modal-product__img">
                        {imageSrc && <img src={imageSrc} alt="" />}
                    </a>
                    <div className="cart-modal-product__content">
                        <div className="cart-modal-product__title">{cart.laptopTitle}</div>
                        <div className="cart-modal-product__bottom">
                            <div className="cart-modal-product__price">{cart.laptopPrice.toLocaleString('uk-UA')} <span>₴</span></div>
                            <div className="cart-modal-product__counter cart-counter">
                                <div className={cart.quantity > 1 ? 'cart-counter__button'  : 'cart-counter__button disabled'} onClick={() => onMinusAmount(cart.id)}>-</div>
                                <div className="cart-counter__number">{cart.quantity}</div>
                                <div className="cart-counter__button" onClick={() => onPlusAmount(cart.id)}>+</div>
                            </div>
                            <div className="cart-modal-product__totalPrice">{cart.totalPrice.toLocaleString('uk-UA')} <span>₴</span></div>
                        </div>
                        <div className="cart-modal-product__close" onClick={() => onDeleteItem(cart.id)}><FontAwesomeIcon icon={faTrash} /></div>
                    </div>
                </li>
            );
        });

    return (
        <header className="header">
            <div className="wrapper">
                <div className="container">
                    <div className="header__content">
                        <a className="header__logo logo" href="/">Logo</a>
                        <div className="header__catalog">
                            <div className="burger-span"></div>
                            <div className="header-catalog__name">Каталог</div>
                            <ul className="catalog__list">
                                <li className="catalog__item"><a href="#">Ноутбуки</a></li>
                                <li className="catalog__item"><a href="/categoryPage">Монітори</a></li>
                                <li className="catalog__item"><a href="#">Відеокарти</a></li>
                                <li className="catalog__item"><a href="#">Процесори</a></li>
                                <li className="catalog__item"><a href="#">Блоки живлення</a></li>
                                <li className="catalog__item"><a href="#">Жорсткі диски</a></li>
                                <li className="catalog__item"><a href="#">Оперативна пам'ять</a></li>
                                <li className="catalog__item"><a href="#">Материньскі плати</a></li>
                                <li className="catalog__item"><a href="#">Чохли</a></li>
                            </ul>
                        </div>
                        <div className="header__search">
                            <form action="" className="header__search-form">
                                <div className="search-form__content">
                                    <img src={searchIcon} alt="" className="search-panel__icon" />
                                    <input 
                                        type="text" 
                                        name="searchText" 
                                        value={searchText}  
                                        onInput={onHandleChange} 
                                        className="header__search-panel" 
                                        placeholder="Пошук товарів" 
                                    />
                                    <div className="header__search-close" onClick={onHandleClear}><FontAwesomeIcon icon={faXmark} /></div>
                                    <button className="header__search-button common-btn" type="submit">Знайти</button>
                                </div>
                            </form>
                        </div>
                        <ul className="header-icons__list">
                            {isAuthorized
                                ? <li className="header-list__item">
                                    <div className="header-account">
                                        <img src={circleUser} alt="" />
                                        <ul className="header-account__list">
                                            <li className="header-account__item">
                                                <a href="/account/cabinet" className="header-account__link">
                                                    <div className="header-account__item--img"><FontAwesomeIcon icon={faHouse} /></div>
                                                    <span>Мій кабінет</span>
                                                </a>
                                            </li>
                                            <li className="header-account__item">
                                                <a href="/account/myOrders" className="header-account__link">
                                                    <div className="header-account__item--img"><FontAwesomeIcon icon={faCartShopping} /></div>
                                                    <span>Мої замовлення</span>
                                                </a>
                                            </li>
                                            <li className="header-account__item">
                                                <a href="/account/myLiked" className="header-account__link">
                                                    <div className="header-account__item--img"><FontAwesomeIcon icon={faHeart} /></div>
                                                    <span>Обрані товари</span>
                                                </a>
                                            </li>
                                            <li className="header-account__item">
                                                <a href="/product" className="header-account__link">
                                                    <div className="header-account__item--img"><FontAwesomeIcon icon={faMessage} /></div>
                                                    <span>Мої відгуки</span>
                                                </a>
                                            </li>
                                            <li className="header-account__item">
                                                <a href="/" className="header-account__link" onClick={quitAccount}>
                                                    <div className="header-account__item--img"><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                                                    <span>Вийти</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                  </li>
                                : <div className="header__login" onClick={props.onLoginClick}>Увійти</div>}
                            <li className="header-list__item"><img src={compareIcon} alt="" /></li>
                            <li className="header-list__item"><a href="/account/myLiked"><img src={favouriteIcon} alt="" /></a></li>
                            <li className="header-list__item header-cart" onClick={props.onHandleCart}>
                                <img src={cartIcon} alt="" />
                            </li>
                        </ul>
                        {props.isCartOpen && 
                            <div className="auth__background">
                                <div className="header-cart__modal">
                                    <div className="cart-modal__scroll-content">
                                        <div className="cart-modal__title">Кошик</div>
                                        <ul className="cart-modal__list">
                                            {cartItems}
                                        </ul>
                                    </div>
                                    <div className="cart-modal__footer">
                                    <div className="cart-modal__totalPrice-title">Загальна сума:</div>
                                        <div className="cart-modal__price">{props.cartData.total.toLocaleString('uk-UA')} <span>₴</span></div>
                                        <ul className="cart-modal__buttons">
                                            <li className="cart-modal__button">Оформити замовлення</li>
                                            <li className="cart-modal__button" onClick={props.onHandleCart}>Продовжити покупки</li>
                                        </ul>
                                    </div>
                                        {/* <div className="cart-modal__totalPrice-title">Загальна сума:</div>
                                        <div className="cart-modal__price">{cartData.total} <span>₴</span></div>
                                        <ul className="cart-modal__buttons">
                                            <li className="cart-modal__button">Оформити замовлення</li>
                                            <li className="cart-modal__button" onClick={onHandleCart}>Продовжити покупки</li>
                                        </ul> */}
                                    <div className="cart-modal__close" onClick={props.onHandleCart}><FontAwesomeIcon icon={faXmark} /></div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
