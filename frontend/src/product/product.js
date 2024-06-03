import { Component } from "react";
import './product.css';
import legionImg from '../img/products/legion 1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";


class Product extends Component{
    render(){
        return(
            <div className="product">
                <div className="product__content">
                    <a href="#" className="product__image">
                        <img src={legionImg} alt="" />
                    </a>
                    <a href="#" className="product__name">Ноутбук ігровий Lenovo Legion 5 16IRX9 (83DG0092RA)</a>
                    <div className="product__review">
                        <ul className="product__rating">
                            <li><FontAwesomeIcon icon={faStar} className="rating__star star-yellow"/></li>
                            <li><FontAwesomeIcon icon={faStar} className="rating__star star-yellow"/></li>
                            <li><FontAwesomeIcon icon={faStar} className="rating__star star-yellow"/></li>
                            <li><FontAwesomeIcon icon={faStar} className="rating__star"/></li>
                            <li><FontAwesomeIcon icon={faStar} className="rating__star"/></li>
                        </ul>
                        <a href="#" className="product__comments">
                            <div className="product__comments-icon"><FontAwesomeIcon icon={faComment} /></div>
                            <div className="product__comments-amount">15</div>
                        </a>
                    </div>
                    <div className="product__aviability product__aviability-true">В наявності</div>
                    <div className="product__price">
                        <div className="product__price-old">
                            <div className="product__price-old_price">49999</div>
                            <div className="product__price-discount">-40%</div>
                        </div>
                        <div className="product__price-new">39999 <span>₴</span></div>
                    </div>
                    <div className="product__cart-button orange"><FontAwesomeIcon icon={faCartShopping} className="cart-shopping"/></div>
                    <div className="product__options">
                        <div className='product__option'><FontAwesomeIcon icon={faHeart} className="product__favourite"/></div>
                        <div className='product__option product__option-yellow'><FontAwesomeIcon icon={faScaleBalanced} className="product__scale"/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;