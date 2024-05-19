import { Component } from "react";
import './productsCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Product from "../product/product";

class ProductsCategory extends Component{

    render(){

        return(
            <div className="category">
                <div className="container">
                    <div className="category__header">
                        <div className="category__title">{this.props.title}</div>
                        <div className="category__nav">
                            <a href="#" className="category__more"><span>Показати всі</span></a>
                            <div className="category__arrows">
                                <div className="category__arrow arrow-left"><FontAwesomeIcon icon={faArrowLeft}/></div>
                                <div className="category__arrow arrow-right"><FontAwesomeIcon icon={faArrowRight}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="category__body">
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </div>
        )
    }
} 

export default ProductsCategory;