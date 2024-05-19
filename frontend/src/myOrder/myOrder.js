import { Component } from "react";
import './myOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import legionImg from '../img/products/legion 1.jpg';


class MyOrder extends Component{
    render(){
        return(
            <div className="my-order">
                <div className="my-order__content">
                    <div className="my-order__id">№ 79845</div>
                    <div className="my-order__type my-order__type--done">Виконано</div>
                    <div className="my-order__img">
                        <img src={legionImg} alt="" />
                    </div>
                    <div className="my-order__price">39 999 ₴</div>
                    <div className="my-order__date">21.06.2024</div>
                    <div className="my-order__arrow" ><FontAwesomeIcon icon={faChevronDown}/></div>
                </div>
            </div>
        )
    }
}

export default MyOrder;