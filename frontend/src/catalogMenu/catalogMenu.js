import { Component } from 'react';
import './catalogMenu.css';

class CatalogMenu extends Component{
    render(){
        return(
            <div>
                <div className="header__catalog">
                    <div className="burger-span"></div>
                    <div className="header-catalog__name">Каталог</div>
                    <ul className="catalog__list">
                        <li className="catalog__item"><a href="#">Ноутбуки</a></li>
                        <li className="catalog__item"><a href="/categoryPage">Відеокарти</a></li>
                        <li className="catalog__item"><a href="#">Телефони</a></li>
                        <li className="catalog__item"><a href="#">Монітори</a></li>
                        <li className="catalog__item"><a href="#">Зарядні пристрої</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default CatalogMenu;