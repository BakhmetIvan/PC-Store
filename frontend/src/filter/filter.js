import { Component } from "react";
import './filter.css';
import chefronIcon from '../img/chevron-up-solid 1.svg';

class Filter extends Component{
    render(){
        return(
            <div className="filter">
                <div className="filter__content">
                    <div className="filter__cost">
                        <div className="filter-block__name">Ціна</div>
                        <div className="filter-cost__content">
                            <input type="text" className="filter-cost__range" value={500}/>
                            <div className="filter-cost__dash"></div>
                            <input type="text" className="filter-cost__range" value={4500}/>
                            <button className="filter-cost__button ">OK</button>
                        </div>
                        <div className="filter-cost__slider"></div>
                    </div>
                    <div className="filter__filter-block">
                        <div className="filter-block__name">Бренд</div>
                        <ul className="fitler-block__content">
                            <li className="filter-block__checkboxes">
                                <input id="Asus" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Asus" className="filter-block__checkbox-name">Asus</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Lenovo" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Lenovo" className="filter-block__checkbox-name">Lenovo</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="MSI" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="MSI" className="filter-block__checkbox-name">MSI</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Samsung" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Samsung" className="filter-block__checkbox-name">Samsung</label>
                            </li>
                        </ul>
                        <div className="filter-block__arrow"><img src={chefronIcon} alt="" /></div>
                        <div className="filter-block__end"></div>
                    </div>
                    <div className="filter__filter-block">
                        <div className="filter-block__name">Обсяг відеопам'яті</div>
                        <ul className="fitler-block__content">
                            <li className="filter-block__checkboxes">
                                <input id="2GB" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="2GB" className="filter-block__checkbox-name">2 ГБ</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Lenovo" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Lenovo" className="filter-block__checkbox-name">Lenovo</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="MSI" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="MSI" className="filter-block__checkbox-name">MSI</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Samsung" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Samsung" className="filter-block__checkbox-name">Samsung</label>
                            </li>
                        </ul>
                        <div className="filter-block__arrow arrow_down"><img src={chefronIcon} alt="" /></div>
                        <div className="filter-block__end"></div>
                    </div>
                    <div className="filter__filter-block">
                        <div className="filter-block__name">Бренд</div>
                        <ul className="fitler-block__content">
                            <li className="filter-block__checkboxes">
                                <input id="Asus" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Asus" className="filter-block__checkbox-name">Asus</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Lenovo" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Lenovo" className="filter-block__checkbox-name">Lenovo</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="MSI" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="MSI" className="filter-block__checkbox-name">MSI</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Samsung" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Samsung" className="filter-block__checkbox-name">Samsung</label>
                            </li>
                        </ul>
                        <div className="filter-block__arrow"><img src={chefronIcon} alt="" /></div>
                        <div className="filter-block__end"></div>
                    </div>
                    <div className="filter__filter-block">
                        <div className="filter-block__name">Бренд</div>
                        <ul className="fitler-block__content">
                            <li className="filter-block__checkboxes">
                                <input id="Asus" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Asus" className="filter-block__checkbox-name">Asus</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Lenovo" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Lenovo" className="filter-block__checkbox-name">Lenovo</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="MSI" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="MSI" className="filter-block__checkbox-name">MSI</label>
                            </li>
                            <li className="filter-block__checkboxes">
                                <input id="Samsung" type="checkbox" className="filter-block__checkbox"/>
                                <label htmlFor="Samsung" className="filter-block__checkbox-name">Samsung</label>
                            </li>
                        </ul>
                        <div className="filter-block__arrow"><img src={chefronIcon} alt="" /></div>
                        <div className="filter-block__end"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;