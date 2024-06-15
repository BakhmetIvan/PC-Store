import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Router, Routes} from "react-router-dom";
import { Route } from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Feedback from "../feedback/feedback";
import closeIcon from '../img/close.svg';
import axios from 'axios';
import AuthPanel from "../authPanel/authPanel";


import ReviewsComponent from "../reviewsComponent/reviewsComponent";

import '../productPage/productPage.css';
import '../product/product.css';

const ProductPageReviews = ({openModalLogin}) => {

    const {id} = useParams();
    const navigate = useNavigate();


    const [product, setProduct] = useState([]);
    const [addReview, setAddReview] = useState(false);
    const [addRating, setAddRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);
    const [allreviews, setAllReviews] = useState(null);
    const [reviewComment, setReviewComment] = useState(null);
    const token = localStorage.getItem('token');
    const [mainImg, setMainImg] = useState(0);

    const [activeTab, setActiveTab] = useState('reviews');


    useEffect(() => {
        fetch(`http://26.69.114.65:8080/laptops/${id}/reviews`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllReviews(data);
            })
            .catch(error => {
                console.log('Error fetching products:', error)
            });
    }, [id]);

    const showAllCharacteristic = () => {
        fetch(`http://26.69.114.65:8080/laptops/${id}/characteristic`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setCharacteristic(data);
                console.log(characteristic);
            })
            .catch(error => {
                console.log('Error fetching products:', error)
            });
    };

    const showAllReviews = () => {
        fetch(`http://26.69.114.65:8080/laptops/${id}/reviews`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllReviews(data);
            })
            .catch(error => {
                console.log('Error fetching products:', error)
            });
    };

    const addNewReview = () => {
        setAddReview(true);
    }

    const closeModal = () => {
        setAddReview(false);
    }

    const wrapperCloseModal = (e) => {
        if(e.target.classList.contains('auth__background')){
            closeModal();
        }
    }


    const onHandleChange = (e) => {
        setReviewComment(e.target.value);
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            rating: addRating,
            comment: reviewComment}
        try {
            const response = await axios.post(`http://26.69.114.65:8080/laptops/${id}/reviews`, reviewData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }
            });
            console.log(response.data);
            closeModal();
            window.location.reload();
            // Обработка успешного ответа от бекенда
            // const token = response.data.token;
            // localStorage.setItem('token', token);
            // this.setState({
            //     errorMessage: false,
            //  })
            //  this.goHome();
        } catch (error) {
            // this.setState({
            //     errorMessage: true
            //  })
        }
    }

    const doCharacteristic = () => {
        setActiveTab('characteristic');
        showAllCharacteristic();
        showAllCharacteristic();
        navigate(`/product/${id}/characteristic`);
    }

    const doReviews = () => {
        setActiveTab('reviews');
        showAllReviews();
        showAllReviews();
        navigate(`/product/${id}/reviews`);
    }

    const doHome = () => {
        setActiveTab('');

        navigate(`/product/${id}`);
    }

    return(
        <div className="wrapper">
            <div className="container">
                <nav className="product-page__nav">
                    <ul className="product-page-nav__list">
                        <li className={`product-page-nav__item ${activeTab === '' ? ' tab-product__active': ''}`} onClick={() => doHome()}>Головна</li>
                        <li className={`product-page-nav__item ${activeTab === 'characteristic' ? ' tab-product__active': ''}`} onClick={() => doCharacteristic()}>Характеристики</li>
                        <li className={`product-page-nav__item ${activeTab === 'reviews' ? ' tab-product__active': ''}`} onClick={() => doReviews()}>Відгуки</li>
                    </ul>
                </nav>
                <div className="product-page__section">
                        <div className="product-page-section__content">
                            <div className="product-page-section__title">Відгуки користувачів</div>
                            <div className="product-page-section-feedback__content">
                                <ul className="product-page-section-feedback__list">
                                    <ReviewsComponent id={id} />
                                </ul>
                                <div className="product-page-section-feedback__rating">
                                    <div className="feedback-rating__title">Загальний рейтинг</div>
                                    <div className="feedback-rating__current">
                                        <ul className="feedback-rating-current__stars">
                                        {[...Array(5)].map((star, index) => {
                                            const currentRate = index + 1;
                                            return(
                                                <li><FontAwesomeIcon icon={faStar} className={`rating__star ${1 ? ' star-yellow' : ''}`}/></li>
                                            )
                                        })}
                                        </ul>
                                        <div className="feedback-rating-current__numbers">4.3 / 5</div>
                                    </div>
                                    <ul className="feedback-rating__sorting">
                                         <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">2</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">1</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">0</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">0</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">0</div>
                                        </li> 
                                    </ul>
                                    <div className="feedback-rating__button common-btn" onClick={() => {
                                        if(token){
                                            addNewReview();
                                        }
                                        else{
                                            // <Login/>
                                            openModalLogin();
                                        }
                                    }
                                        
                                    }>Залишити відгук</div>
                                </div>
                            </div>
                        </div>
                        {addReview &&
                            <div className="auth__background" onClick={wrapperCloseModal}>
                                <div className="auth__modal">
                                    <div className="review__block">
                                        <div className="review-block__title">Залиште ваш відгук</div>
                                        <div className="review-block__text">Оцінка товару {addRating}</div>
                                        <ul className="review-block__stars">
                                            {[...Array(5)].map((star, index) => {
                                                const currentRate = index + 1;
                                                console.log(addRating)
                                                return(
                                                    <label>
                                                        <input 
                                                            type="radio" 
                                                            name="rate" 
                                                            className="rate__radio"
                                                            value={currentRate}
                                                            onClick={() => setAddRating(currentRate)}
                                                            />
                                                            
                                                        <li className="review-block__star">
                                                            <FontAwesomeIcon icon={faStar}
                                                                color={currentRate <= (hover || addRating) ? '#ffaa2b' : 'grey'} 
                                                                onMouseEnter={() => setHover(currentRate)}
                                                                onMouseLeave={() => setHover(null)}/>
                                                                
                                                            </li>
                                                    </label>
                                                )
                                            })}

                                        </ul>
                                        <form onSubmit={onHandleSubmit} action="" className="review-add__form">
                                            <textarea name="comment" id="" cols="80" rows="7" value={reviewComment} onChange={onHandleChange} className="review-form__comment" placeholder="Коментар"></textarea>
                                            <button type="submit" className="review-block__button">Залишити відгук</button>
                                        </form>
                                        <div className="review-block__close" onClick={closeModal} ><img src={closeIcon} alt="close" /></div>  {/* onClick={this.handleCloseModal} */}
                                    </div>
                                </div>
                            </div>
                            }
                    </div>
            </div>
        </div>
    )
}

export default ProductPageReviews;
