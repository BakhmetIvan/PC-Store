import { Component } from "react";
import './myOrders.css';
import MyOrder from "../myOrder/myOrder";


class MyOrders extends Component{
    render(){
        return(
            <div className="account-page__right-block">
                <div className="right-block__content">
                    <div className="right-block__title">Мої замовлення</div>
                    <ul className="my-orders__list-type">
                        <li className="my-orders__item-type my-orders__item-type--active" >Всі</li>
                        <li className='my-orders__item-type' >Виконані</li>
                        <li className='my-orders__item-type' >Скасовані</li>
                        <li className="my-orders__item-type" >У процесі</li>
                    </ul>
                </div>
                <div className="my-orders__all">
                    <MyOrder/>
                    <MyOrder/>
                    <MyOrder/>
                </div>
            </div>
        )
    }
}

export default MyOrders;