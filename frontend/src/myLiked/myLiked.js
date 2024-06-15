import { Component } from "react";
import './myLiked.css';
import Product from "../product/product";

class MyLiked extends Component{
    render(){
        return(
            <div className="account-page__right-block">
                <div className="right-block__content">
                    <div className="right-block__title">Обрані товари</div>
                    <div className="chhhh">
                    <Product/>
                    <Product/>
                    <Product/>
                    </div>

                </div>
            </div>
        )
    }
}

export default MyLiked;