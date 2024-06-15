import { Component } from "react";
import  "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faHeart, faArrowRightFromBracket, faMessage, faXmark, faTrash, faDesktop, faMicrochip, faHardDrive, faLaptop, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import compareIcon from "../img/scale-balanced-solid 1.svg";
import favouriteIcon from "../img/heart-regular 1.svg";
import cartIcon from "../img/cart-shopping-solid 1.svg";
import searchIcon from "../img/magnifying-glass-solid 1.svg";
import circleUser from "../img/circle-user-regular 1.svg";
import legionImg from '../img/products/legion 1.jpg';
import Cart from "../cart/cart";


import CatalogMenu from "../catalogMenu/catalogMenu";

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            isCartOpen: false,
            cartData: [],
            isLoading: true
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        fetch(`http://26.69.114.65:8080/cart`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({cartData: data, isLoading: false});
                console.log(this.state.cartData);
            })
            .catch(error => {
                this.setState({ isLoading: false });
                console.log('Error fetching products:', error)
            });    }

    onHandleChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    onHandleClear = () => {
        this.setState({
            searchText : '',
        })
    }
  
    onHandleCart = () => {
        this.setState(state => {
            return{
                isCartOpen: !state.isCartOpen
            }
        })
    }

    quitAccount = () => {
        localStorage.removeItem('token');
    }

    render(){
    const {cartData} = this.state;
    const isAuthorized = localStorage.getItem('token');
    const imageSrc = cartData.image && cartData.image.data ? `data:image/jpeg;base64,${cartData.image.data}` : '';

    const cartItems = this.state.isLoading
    ? <div>Loading...</div>
    : cartData.cartItems.map((cart, index) => (
        <li key={index} className="cart-modal-product">
            {/* <div className="cart-modal-product__img"><img src={legionImg} alt="" /></div> */}
            <a href={`/product`} className="cart-modal-product__img">
                    {imageSrc && <img src={imageSrc} alt="" />}
                </a>
            <div className="cart-modal-product__content">
                <div className="cart-modal-product__title">{cart.laptopTitle}</div>
                <div className="cart-modal-product__bottom">
                    <div className="cart-modal-product__price">{cart.laptopPrice} <span>₴</span></div>
                    <div className="cart-modal-product__counter cart-counter">
                        <div className="cart-counter__button">-</div>
                        <div className="cart-counter__number">{cart.quantity}</div>
                        <div className="cart-counter__button">+</div>
                    </div>
                    <div className="cart-modal-product__totalPrice">{cart.totalPrice} <span>₴</span></div>
                </div>
                <div className="cart-modal-product__close"><FontAwesomeIcon icon={faTrash} /></div>
            </div>
        </li>
    ));
        return(
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
                                {/* <CatalogMenu/> */}
                                <div className="header__search">
                                    <form action="" className="header__search-form">
                                        <div className="search-form__content">
                                            <img src={searchIcon} alt="" className="search-panel__icon"/>
                                            <input type="text" name="searchText" value={this.state.searchText}  onInput={this.onHandleChange} className="header__search-panel" placeholder="Пошук товарів"/>
                                            <div className="header__search-close" onClick={this.onHandleClear}><FontAwesomeIcon icon={faXmark} /></div>
                                            <button className="header__search-button common-btn" type="submit">Знайти</button>
                                        </div>
                                    </form>
                                </div>
                                <ul className="header-icons__list">
                                        {isAuthorized
                                            ? <li className="header-list__item"><div className="header-account"><img src={circleUser} alt="" />
                                                <ul className="header-account__list">
                                                    <li className="header-account__item">
                                                        <a href="/account/cabinet" className="header-account__link">
                                                            <div className="header-account__item--img"><FontAwesomeIcon icon={faHouse}/></div>
                                                            <span>Мій кабінет</span>
                                                        </a>
                                                    </li>
                                                    <li className="header-account__item">
                                                        <a href="/account/myOrders" className="header-account__link">
                                                            <div className="header-account__item--img"><FontAwesomeIcon icon={faCartShopping}/></div>
                                                            <span>Мої замовлення</span>
                                                        </a>
                                                    </li>
                                                    <li className="header-account__item">
                                                        <a href="/account/myLiked" className="header-account__link">
                                                            <div className="header-account__item--img"><FontAwesomeIcon icon={faHeart}/></div>
                                                            <span>Обрані товари</span>
                                                        </a>
                                                    </li>
                                                    <li className="header-account__item">
                                                        <a href="/product" className="header-account__link">
                                                            <div className="header-account__item--img"><FontAwesomeIcon icon={faMessage}/></div>
                                                            <span>Мої відгуки</span>
                                                        </a>
                                                    </li>
                                                    <li className="header-account__item">
                                                        <a href="/" className="header-account__link" onClick={this.quitAccount}>
                                                            <div className="header-account__item--img"><FontAwesomeIcon icon={faArrowRightFromBracket}/></div>
                                                            <span>Вийти</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                </div></li>
                                            : <div className="header__login" onClick={this.props.onLoginClick}>Увійти</div>}
                                    
                                    <li className="header-list__item"><img src={compareIcon} alt="" /></li>
                                    <li className="header-list__item"><a href="/account/myLiked"><img src={favouriteIcon} alt="" /></a></li>
                                    <li className="header-list__item header-cart" onClick={this.onHandleCart}>
                                        <img src={cartIcon} alt="" />
                                        {/* <div className="cart__amount">2</div> */}
                                    </li>
                                </ul>
                                {this.state.isCartOpen 
                                    && <div className="auth__background">
                                            <div className="header-cart__modal">
                                                <div className="cart-modal__title">Кошик</div>
                                                <ul className="cart-modal__list">
                                                    {cartItems}
                                                    {/* <li className="cart-modal-product">
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
                                                    </li>
                                                    <li className="cart-modal-product">
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
                                                    </li> */}
                                                </ul>
                                                <div className="cart-modal__totalPrice-title">Загальна сума:</div>
                                                <div className="cart-modal__price">{cartData.total} <span>₴</span></div>
                                                <ul className="cart-modal__buttons">
                                                    <li className="cart-modal__button">Оформити замовлення</li>
                                                    <li className="cart-modal__button" onClick={this.onHandleCart}>Продовжити покупки</li>
                                                </ul>
                                                <div className="cart-modal__close" onClick={this.onHandleCart}><FontAwesomeIcon icon={faXmark} /></div>
                                            </div>
                                        </div>}
                                        {/* {this.state.isCartOpen && <Cart onHandleCart={this.onHandleCart}/>} */}
                                    {0 &&
                                    <div className="auth__background">
                                    <div className="header-cart__modal">
                                        <div className="cart-modal__title">Кошик</div>
                                        <div className="cart-modal__no-product">
                                            <div className="no-product-cart__text">Кошик порожній</div>
                                            <div className="no-product-cart__img"><FontAwesomeIcon icon={faCartShopping}/></div>
                                        </div>
                                        <ul className="cart-modal__buttons">
                                            <li className="cart-modal__button" onClick={this.onHandleCart}>Повернутись до товарів</li>  
                                        </ul>
                                        <div className="cart-modal__close" onClick={this.onHandleCart}><FontAwesomeIcon icon={faXmark} /></div>
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </div>

                </header>
        )
    }
}

export default Header;