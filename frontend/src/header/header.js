import { Component } from "react";
import  "./header.css";
import compareIcon from "../img/scale-balanced-solid 1.svg";
import favouriteIcon from "../img/heart-regular 1.svg";
import cartIcon from "../img/cart-shopping-solid 1.svg";
import searchIcon from "../img/magnifying-glass-solid 1.svg";

class Header extends Component{
    render(){
        return(
            <div className="wrapper">
                <header className="header">
                    <div className="container">
                        <div className="header__content">
                            <a className="header__logo logo" href="#">Logo</a>
                            <div className="header__catalog">
                                <div className="burger-span"></div>
                                <div className="header-catalog__name">Каталог</div>
                            </div>
                            <div className="header__search">
                                <form action="" className="header__search-form">
                                    <div className="search-form__content">
                                        <img src={searchIcon} alt="" className="search-panel__icon"/>
                                        <input type="text" className="header__search-panel" placeholder="Пошук товарів"/>
                                        <button className="header__search-button common-btn" type="submit">Знайти</button>
                                    </div>
                                </form>
                            </div>
                            <div className="header__login">Увійти</div>
                            <ul className="header-icons__list">
                                <li className="header-list__item"><img src={compareIcon} alt="" /></li>
                                <li className="header-list__item"><img src={favouriteIcon} alt="" /></li>
                                <li className="header-list__item header-cart">
                                    <img src={cartIcon} alt="" />
                                    <div className="cart__amount">2</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </header>
            </div>
        )
    }
}

export default Header;