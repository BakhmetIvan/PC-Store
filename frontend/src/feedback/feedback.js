import { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './feedback.css';

class Feedback extends Component{

    render(){
        const dateTimeString = this.props.date;

        const dateOnly = dateTimeString.split('T')[0];
        return(
            <div className="feedback">
                <div className="feedback__content">
                    <div className="feedback__header">
                        <div className="feedback-header__name">{this.props.firstName} {this.props.lastName}</div>
                        <div className="feedback-header__date">{dateOnly}</div>
                        <ul className="feedback-header__stars">
                            {[...Array(5)].map((star, index) => {
                                const currentRate = index + 1;
                                return(
                                    <li><FontAwesomeIcon icon={faStar} className={`rating__star ${currentRate <= this.props.rating ? ' star-yellow' : ''}`}/></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="feedback__text">{this.props.comment}</div>
                </div>
            </div>
        )
    }
}

export default Feedback;