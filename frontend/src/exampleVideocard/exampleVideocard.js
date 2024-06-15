import React, { Component } from "react";
import Product from "../product/product";

class ExampleVideoCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataState: [],
            dataState2: [],
            lol: false
        }
    }

    handleCheck = () => {
        fetch(`http://26.69.114.65:8080/laptops?page=1&size=10`,{
            method: "GET",
            headers: {
                 "Content-Type": "application/json"
            },
            // credentials: 'include' // Добавьте эту строку
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
                dataState: data
            })
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      };



      handleCheckid = () => {
        fetch(`http://26.69.114.65:8080/laptops/1`,{
            method: "GET",
            headers: {
                 "Content-Type": "application/json"
            },
            // credentials: 'include' // Добавьте эту строку
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
                dataState2: data
            })
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      };

    render(){
        const { dataState} = this.state;
        const elementProduct = dataState.map(item => {
            return (
                <Product
                    productId = {item.id}
                    {...item}
                />
            )
        });
        return (
            <div>
                <h1 onClick={this.handleCheck}>Click</h1>
                
                <div className="tovar">
                    {elementProduct}    
                </div>
                <h2 onClick={this.handleCheckid}>id product</h2>
            </div>
        )
    }
}

export default ExampleVideoCard;