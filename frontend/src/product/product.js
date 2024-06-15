import React, { useState, useEffect } from "react";
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCartShopping, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const Product = ({ name, image, averageRating, price, reviewsCount, productId, cartData }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [cartList, setCartList] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if productId is in cartItems
        if (cartData && cartData.cartItems) {
            const foundInCart = cartData.cartItems.some(item => item.laptopId === productId);
            setIsAddedToCart(foundInCart);
        } else {
            setIsAddedToCart(false); // If cartData or cartItems is not available, set isAddedToCart to false
        }
    }, [cartData, productId]);

    const addToCart = async () => {
        const reviewData = {
            laptopId: productId,
            quantity: 1
        };

        try {
            const response = await axios.post(`http://26.69.114.65:8080/cart`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data); // Handle successful response from the backend
            setIsAddedToCart(true);
        } catch (error) {
            console.error("There was an error adding to the cart:", error);
        }
    };

    // const { image, averageRating, price, name, reviewsCount } = item;
    const imageSrc = image && image.data ? `data:image/jpeg;base64,${image.data}` : '';

    return (
        <div className="product">
            <div className="product__content">
                <a href={`/product/${productId}`} className="product__image">
                    {imageSrc && <img src={imageSrc} alt="" />}
                </a>
                <a href={`/product/${productId}`} className="product__name">{name}</a>
                <div className="product__review">
                    {reviewsCount ?
                        <ul className="product__rating">
                            {[...Array(5)].map((star, index) => {
                                const currentRate = index + 1;
                                return (
                                    <li key={index}>
                                        <FontAwesomeIcon 
                                            icon={faStar} 
                                            className={`rating__star ${currentRate <= Math.round(averageRating) ? 'star-yellow' : ''}`} 
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                        : <div className="product__no-comments">Залишити відгук</div>
                    }
                    <a href={`/product/${productId}/reviews`} className="product__comments">
                        <div className="product__comments-icon"><FontAwesomeIcon icon={faComment} /></div>
                        <div className="product__comments-amount">{reviewsCount}</div>
                    </a>
                </div>
                <div className="product__aviability product__aviability-true" onClick={() => console.log(cartList)}>В наявності</div>
                <div className="product__price">
                    <div className="product__price-new">{price} <span>₴</span></div>
                </div>
                {isAddedToCart
                    ? <div className="product__cart-button button__in-cart"><FontAwesomeIcon icon={faCartShopping} className="cart-shopping" /></div>
                    : <div className="product__cart-button orange" onClick={addToCart}><FontAwesomeIcon icon={faCartShopping} className="cart-shopping" /></div>
                }
                <div className="product__options">
                    <div className='product__option' ><FontAwesomeIcon icon={faHeart} className="product__favourite" /></div>
                    <div className='product__option'><FontAwesomeIcon icon={faScaleBalanced} className="product__scale" /></div>
                </div>
            </div>
        </div>
    );
};

export default Product;
