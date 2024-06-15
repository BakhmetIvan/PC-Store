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

const ProductPageCharact = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [characteristic, setCharacteristic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const [activeTab, setActiveTab] = useState('characteristic');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://26.69.114.65:8080/laptops/${id}/characteristic`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                });
                const data = await response.json();
                setCharacteristic(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching product:', error);
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!characteristic) {
        return <div>Data not available</div>;
    }

    const doReviews = () => {
        setActiveTab('reviews');
        navigate(`/product/${id}/reviews`);
    }
    const doHome = () => {
        setActiveTab('');
        navigate(`/product/${id}`);
    }

        return(
            <div className="wrapper">
            <div className="container">
            <div className="product-page__charact-margin">

                <nav className="product-page__nav">
                    <ul className="product-page-nav__list">
                        <li className={`product-page-nav__item ${activeTab === '' ? ' tab-product__active': ''}`} onClick={() => doHome()}>Головна</li>
                        <li className={`product-page-nav__item ${activeTab === 'characteristic' ? ' tab-product__active': ''}` }>Характеристики</li>
                        <li className={`product-page-nav__item ${activeTab === 'reviews' ? ' tab-product__active': ''}`} onClick={() => doReviews()}>Відгуки</li>
                    </ul>
                </nav>
                <div className="product-page__section">
                    <div className="product-page-section__title" onClick={() => console.log(characteristic)}>Характеристики</div>
                        <ul className="product-page-charart__list">
                                <li className="product-page-charart__item">
                                    <div className="product-page-charart-item__name">Діагональ екрану</div>
                                    <div className="product-page-charart-item__dots"></div>
                                    <div className="product-page-charart-item__value">{characteristic.diagonal}</div>
                                </li>
                                <li className="product-page-charart__item">
                                    <div className="product-page-charart-item__name">Тип матриці</div>
                                    <div className="product-page-charart-item__dots"></div>
                                    <div className="product-page-charart-item__value">{characteristic.screenType}</div>
                                </li>
                                <li className="product-page-charart__item">
                                    <div className="product-page-charart-item__name">Частота оновлення екрану</div>
                                    <div className="product-page-charart-item__dots"></div>
                                    <div className="product-page-charart-item__value">{characteristic.refreshRate} ГЦ</div>
                                </li>
                                <li className="product-page-charart__item">
                                    <div className="product-page-charart-item__name">Роздільна здатність екрану</div>
                                    <div className="product-page-charart-item__dots"></div>
                                    <div className="product-page-charart-item__value">{characteristic.resolution}</div>
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
            </div>
            </div>
            </div>



        )
 


}


export default ProductPageCharact;