import { Component } from "react";
import './categoryPage.css';
import Product from "../product/product";
import Filter from "../filter/filter";

class CategoryPage extends Component{
    render(){
        return(
            <div>
                <Product/>
                <Product/>
                <Filter/>
            </div>
        )
    }
}

export default CategoryPage;