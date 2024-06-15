import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Feedback from "../feedback/feedback";
import closeIcon from '../img/close.svg';
import axios from 'axios';
import AuthPanel from "../authPanel/authPanel";


import ReviewsComponent from "../reviewsComponent/reviewsComponent";
import ProductPageCharact from "../productPageCharact/productPageCharact";

import './productPage.css';
import '../product/product.css';
const ProductPage = ({openModalLogin}) => {

    const {id} = useParams();
    const navigate = useNavigate();


    const [product, setProduct] = useState([]);
    const [addReview, setAddReview] = useState(false);
    const [addRating, setAddRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);
    const [allreviews, setAllReviews] = useState(null);
    const [reviewComment, setReviewComment] = useState(null);
    const [mainImg, setMainImg] = useState(0);
    const token = localStorage.getItem('token');

    const [activeTab, setActiveTab] = useState('');

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
    useEffect(() => {
        fetch(`http://26.69.114.65:8080/laptops/${id}`,{
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.log('Error fetching products:', error)
            });
        
    }, [id]);

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

    const changeImg = (index) => {
        setMainImg(index);
    }
    const averageRating = parseFloat(product.averageRating);
    const formattedRating = isNaN(averageRating) ? 'N/A' : averageRating.toFixed(1);
            return(

                <div className="wrapper">
                <div className="container">
                    <nav className="product-page__nav">
                        <ul className="product-page-nav__list">
                            <li className={`product-page-nav__item ${activeTab === '' ? ' tab-product__active': ''}`} onClick={() => setActiveTab('')}>Головна</li>
                            <li className={`product-page-nav__item ${activeTab === 'characteristic' ? ' tab-product__active': ''}`} onClick={() => doCharacteristic()}>Характеристики</li>
                            <li className={`product-page-nav__item ${activeTab === 'reviews' ? ' tab-product__active': ''}`} onClick={() => doReviews()}>Відгуки</li>
                        </ul>
                    </nav>
                    {activeTab === '' && 
                        <>
                            <div className="product-page__main">
                        <div className="product-page__images">
                            <div className="product-page-images__main-image">
                                {product.images && product.images[mainImg].data && product.images[mainImg].data ? (
                                <img src={`data:image/jpeg;base64,${product.images[mainImg].data}`} alt={product.images.title} />
                            ) : ''}
                            </div>
                            <ul className="product-page-images__small">
                                {[...Array(4)].map((img, index) => {
                                        return(
                                                <li className="product-page-images_small-img" onClick={() => changeImg(index)}>
                                                {product.images && product.images[index].data && product.images[index].data ? (
                                                <img src={`data:image/jpeg;base64,${product.images[index].data}`} alt={product.images.title} />
                                            ) : ''} 
                                            </li>)
                                    })}
                            </ul>
                        </div>
                        <div className="product-page__right">
                            <div className="product-page-right__content">
                                <div className="product-page-right__title">{product.name}</div> 
                                <div className="product-page-right__second-line">
                                    <ul className="product-page-right-second-line__stars">
                                    {[...Array(5)].map((star, index) => {
                                        const currentRate = index + 1;
                                        return(
                                            <li><FontAwesomeIcon icon={faStar} className={`rating__star ${currentRate <= Math.round(product.averageRating) ? ' star-yellow' : ''}`}/></li>
                                        )
                                    })}
                                    </ul>
                                    <div className="product-page-right-second-line__comments">
                                        <div className="product-page-right-second-line--comments__img"><img src="" alt="" /></div>
                                        <div className="product-page-right-second-line-comments__amount">{product.reviewsCount} відгуків</div>
                                    </div>
                                    <div className="product-page-right-second-line__id">Код товару: {product.id}</div>
                                </div>
                                <div className="product-page-right__third-line">
                                    {product.amount 
                                    ? <div className="product-page-right-third-line__available">В наявності</div>
                                    : <div className="product-page-right-third-line__unavailable">Немає в наявності</div>}


                                    <div className="product-page-right-third-line__options">
                                        <div className="product-page-right-third-line__option"><FontAwesomeIcon icon={faHeart} className="product__favourite"/></div>
                                        <div className="product-page-right-third-line__option"><FontAwesomeIcon icon={faScaleBalanced} className="product__scale"/></div>
                                    </div>
                                </div>
                                <div className="product-page-right__bottom">
                                    <div className="product-page-right-bottom__price">{product.price} <span>₴</span></div>
                                    <div className="product-page-right-bottom__button common-btn">
                                        <div className="product-page-right-bottom__button-icon"><FontAwesomeIcon icon={faCartShopping} className=""/></div>
                                        <div className="product-page-right-bottom__button-text">Купити</div>
                                    </div>
                                </div>
                                <div className="product-page-right__charact">
                                    <div className="product-page-charart__title">Характеристики</div>
                                    <div className="product-page-charart__sub-title">Екран</div>
                                    <ul className="product-page-charart__list">
                                        <li className="product-page-charart__item">
                                            <div className="product-page-charart-item__name">Діагональ екрану</div>
                                            <div className="product-page-charart-item__dots"></div>
                                            <div className="product-page-charart-item__value">{product.diagonal}</div>
                                        </li>
                                        <li className="product-page-charart__item">
                                            <div className="product-page-charart-item__name">Тип матриці</div>
                                            <div className="product-page-charart-item__dots"></div>
                                            <div className="product-page-charart-item__value">{product.screenType}</div>
                                        </li>
                                        <li className="product-page-charart__item">
                                            <div className="product-page-charart-item__name">Частота оновлення екрану</div>
                                            <div className="product-page-charart-item__dots"></div>
                                            <div className="product-page-charart-item__value">{product.refreshRate}</div>
                                        </li>
                                        <li className="product-page-charart__item">
                                            <div className="product-page-charart-item__name">Роздільна здатність екрану</div>
                                            <div className="product-page-charart-item__dots"></div>
                                            <div className="product-page-charart-item__value">{product.resolution}</div>
                                        </li>
                                    </ul>
                                    <div className="product-page-charart__all-btn" onClick={() => doCharacteristic()}>Всі характеристики</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="product-page__section">
                        <div className="product-page-section__content">
                            <div className="product-page-section__title">Опис товару</div>
                            <div className="product-page-section-description__text">{product.description}</div>
                        </div>
                    </div>
                    <div className="product-page__section">
                        <div className="product-page-section__content">
                            <div className="product-page-section__title" onClick={showAllReviews}>Відгуки користувачів</div>
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
                                                <li><FontAwesomeIcon icon={faStar} className={`rating__star ${currentRate <= Math.round(product.averageRating) ? ' star-yellow' : ''}`}/></li>
                                            )
                                        })}
                                        </ul>
                                        <div className="feedback-rating-current__numbers">{formattedRating} / 5</div>
                                    </div>
                                    <ul className="feedback-rating__sorting">
                                        {[5, 4, 3, 2, 1].map((rating, index) => (
                                            <li className="feedback-rating__sort" key={index}>
                                                <ul className="feedback-rating-sort-stars">
                                                    {[...Array(rating)].map((_, starIndex) => (
                                                        <li className="feedback-rating-current-star star-yellow" key={starIndex}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="feedback-rating-sort__line"></div>
                                                <div className="feedback-rating-sort__amount">{product.stars && product.stars[rating] !== undefined ? product.stars[rating] : 0}</div>
                                            </li>
                                        ))}
                                        {/* <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
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
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount"></div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li> */}
                                    </ul>
                                    <div className="feedback-rating__button common-btn" onClick={() => {
                                        if(token){
                                            addNewReview();
                                        }
                                        else{
                                            openModalLogin();
                                        }
                                    }}>Залишити відгук</div>
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
                                        <div className="review-block__close" onClick={closeModal} ><img src={closeIcon} alt="close" /></div>  
                                    </div>
                                </div>
                            </div>
                            }
                    </div>
                        </>
                    }
                    {/* {activeTab === 'characteristic' && 
                        <>
                        <div className="product-page__section">
                            <div className="product-page-section__title">Характеристики</div>

                            <ul className="product-page-charart__list">
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Діагональ екрану</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{product.diagonal}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Тип матриці</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{product.screenType}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Частота оновлення екрану</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{product.refreshRate} ГЦ</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Роздільна здатність екрану</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{product.resolution}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Ємність батареї</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.batteryCapacity}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Назва бренду</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.brandName}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Країна виробник</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.country}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Тип диску</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.diskType}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Відеокарта</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.gpu}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Пам'ять відеокарти</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.gpuMemory} ГБ</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Операційна система</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.operationSystem}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Процесор</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.processor}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Оперативна пам'ять</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.ramMemory} ГБ</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Кількість слотів для оперативної пам'яті</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.ramSlotAmount}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Тип оперативної пам'яті</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.ramType}</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Пам'ять</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.storage} ГБ</div>
                                                </li>
                                                <li className="product-page-charart__item">
                                                    <div className="product-page-charart-item__name">Гарантія, міс.</div>
                                                    <div className="product-page-charart-item__dots"></div>
                                                    <div className="product-page-charart-item__value">{characteristic.warrantyPeriod}</div>
                                                </li>
                                            </ul>
                            </div> 
                        </>    
                    }
                    {activeTab === 'reviews' &&
                        <>
                             
                    <div className="product-page__section">
                        <div className="product-page-section__content">
                            <div className="product-page-section__title" onClick={showAllReviews}>Відгуки користувачів</div>
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
                                                <li><FontAwesomeIcon icon={faStar} className={`rating__star ${currentRate <= Math.round(product.averageRating) ? ' star-yellow' : ''}`}/></li>
                                            )
                                        })}
                                        </ul>
                                        <div className="feedback-rating-current__numbers">{product.averageRating} / 5</div>
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
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                        <li className="feedback-rating__sort">
                                            <ul className="feedback-rating-sort-stars">
                                                <li className="feedback-rating-current-star star-yellow"><FontAwesomeIcon icon={faStar} /></li>
                                            </ul>
                                            <div className="feedback-rating-sort__line"></div>
                                            <div className="feedback-rating-sort__amount">10</div>
                                        </li>
                                    </ul>
                                    <div className="feedback-rating__button common-btn" onClick={() => {
                                        if(token){
                                            console.log("token");
                                        }
                                        else{
                                            console.log("no token");
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
                                        <div className="review-block__close" onClick={closeModal} ><img src={closeIcon} alt="close" /></div>  
                                    </div>
                                </div>
                            </div>
                            }
                    </div>
                        </>
                    } */}
                
                </div>
            </div> 


        )
 


}


export default ProductPage;