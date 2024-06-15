import React, {useState, useEffect} from "react";
import './cart.css';
import  "../header/header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faHeart, faArrowRightFromBracket, faMessage, faXmark, faTrash, faDesktop, faMicrochip, faHardDrive, faLaptop, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import compareIcon from "../img/scale-balanced-solid 1.svg";
import favouriteIcon from "../img/heart-regular 1.svg";
import cartIcon from "../img/cart-shopping-solid 1.svg";
import searchIcon from "../img/magnifying-glass-solid 1.svg";
import circleUser from "../img/circle-user-regular 1.svg";
import legionImg from '../img/products/legion 1.jpg';

const Cart = ({onHandleCart}) => {
    
    return(
        <div className="auth__background">
                                            <div className="header-cart__modal">
                                                <div className="cart-modal__title">Кошик</div>
                                                <div className="cart-modal-product">
                                                    <div className="cart-modal-product__img"><img src={legionImg} alt="" /></div>
                                                    <div className="cart-modal-product__content">
                                                        <div className="cart-modal-product__title">Ноутбук ігровий Lenovo Legion 5 16IRX9 (83DG0092RA)</div>
                                                        <div className="cart-modal-product__bottom">
                                                            <div className="cart-modal-product__price">39 999 <span>₴</span></div>
                                                            <div className="cart-modal-product__counter cart-counter">
                                                                <div className="cart-counter__button">-</div> 
                                                                <div className="cart-counter__number">1</div> 
                                                                <div className="cart-counter__button">+</div> 
                                                            </div>
                                                            <div className="cart-modal-product__totalPrice">39 999 <span>₴</span></div>
                                                        </div>
                                                        <div className="cart-modal-product__close"><FontAwesomeIcon icon={faTrash} /></div>
                                                    </div>
                                                </div>
                                                <div className="cart-modal-product">
                                                    <div className="cart-modal-product__img"><img src={legionImg} alt="" /></div>
                                                    <div className="cart-modal-product__content">
                                                        <div className="cart-modal-product__title">Ноутбук ігровий Lenovo Legion 5 16IRX9 (83DG0092RA)</div>
                                                        <div className="cart-modal-product__bottom">
                                                            <div className="cart-modal-product__price">139 999 <span>₴</span></div>
                                                            <div className="cart-modal-product__counter cart-counter">
                                                                <div className="cart-counter__button">-</div> 
                                                                <div className="cart-counter__number">1</div> 
                                                                <div className="cart-counter__button">+</div> 
                                                            </div>
                                                            <div className="cart-modal-product__totalPrice">139 999 <span>₴</span></div>
                                                        </div>
                                                        <div className="cart-modal-product__close"><FontAwesomeIcon icon={faTrash} /></div>
                                                    </div>
                                                </div>
                                                <div className="cart-modal__totalPrice-title">Загальна сума:</div>
                                                <div className="cart-modal__price">119 997 <span>₴</span></div>
                                                <ul className="cart-modal__buttons">
                                                    <li className="cart-modal__button">Оформити замовлення</li>
                                                    <li className="cart-modal__button" onClick={onHandleCart}>Продовжити покупки</li>
                                                </ul>
                                                <div className="cart-modal__close" onClick={onHandleCart}><FontAwesomeIcon icon={faXmark} /></div>
                                            </div>
                                        </div>
    )
}

export default Cart;