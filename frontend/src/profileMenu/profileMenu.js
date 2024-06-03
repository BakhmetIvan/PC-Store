import { Component } from "react";
import './profileMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';


class ProfileMenu extends Component{
    render(){
        return(
            <div className="profile-menu">
                <div className="profile-menu__content">
                    <ul className="profile-menu__list">
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faCartShopping} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Мої замовлення</div>
                        </li>
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faUser} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Персональні дані</div>
                        </li>
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faHeart} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Обрані товари</div>
                        </li>
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faScaleBalanced} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Список порівнянь</div>
                        </li>
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faEye} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Переглянуті товари</div>
                        </li>
                        <li className="profile-menu__item">
                            <div className="profile-menu__item-img">
                            <FontAwesomeIcon icon={faComment} className="profile-menu__item-img-icon"/>
                            </div>
                            <div className="profile-menu__item-title">Мої відгуки</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProfileMenu;