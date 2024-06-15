import './App.css';
import { Component } from 'react';
import Login from './login/login';
import Register from './register/register';
import Header from './header/header';
import Filter from './filter/filter';
import Product from './product/product';
import Footer from './footer/footer';
import Promotion from './promotion/promotion';
import ProductsCategory from './productsCategory/productsCategory';
import ProfileMenu from './profileMenu/profileMenu';
import MyOrders from './myOrders/myOrders';
import CategoryPage from './categoryPage/categoryPage';
import PageNotFound from './pageNotFound/pageNotFound';
import AuthPanel from './authPanel/authPanel';
import MyLiked from './myLiked/myLiked';
import ProductPage from './productPage/productPage';
import axios from 'axios';

import ProductPageReviews from './productPageReviews/productPageReviews';
import ExampleVideoCard from './exampleVideocard/exampleVideocard';
import LaptopsComponent from './laptopsComponent/laptopsComponent';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import ProductPageCharact from './productPageCharact/productPageCharact';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoginVisible: false,



      isloading: true,
      cities: []
    }
  }

  componentDidMount(){

    const fetchCities = async () => {
      try {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey: 'cdbf7e42a7f76137c77e25b4d0fad374',
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {}
        });
        
        if (response.data.success) {
          this.setState({cities: response.data.data});
          console.log('cities');
          console.log(this.state.cities);
        } else {
          console.log('Failed to fetch cities');
        }
      } catch (err) {
        console.log('nelsa')
      } finally {
        this.setState({isloading: false});
        this.setState({isloading: false});
      }
    };

    fetchCities();
  }

  toggleLoginVisability = () =>{
    this.setState((state) => {
      return{
        isLoginVisible: !state.isLoginVisible
      }
    });
    document.body.style.overflow = 'hidden';
    console.log(this.state.isLoginVisible);
  }

  render(){
    return (
      <div>
  
  
        <Router>
          <Header onLoginClick={this.toggleLoginVisability}/>
              <Routes>
                <Route path='/' element={
                  <div className='wrapper'>
                    <div className="container">
                      <div className="check_flexbox">
                        <LaptopsComponent/>
                      </div>
                      <Filter/>

                    </div>



                    {/* <ExampleVideoCard/> */}



                    {/* <Promotion/> */}


                    {/* <ProductsCategory title="Ноутбуки"/>
                    <ProductsCategory title="Монітори"/>
                    <ProductsCategory title="Відеокарти"/> */}


                    {this.state.isLoginVisible && <AuthPanel onModalClose={this.toggleLoginVisability} isLoginVisible={this.state.isLoginVisible} />}

                    <LaptopsComponent/>
                    <Filter/>
                    <h1>-------------------------------------</h1>
                    <div className="App">
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    </div>
                    <Footer/>
                    <h1>-------------------------------------</h1>
                    <div className="OOOOrders">
                      <ProfileMenu/>
                      <MyOrders/>
                    </div> 
                  </div>
                }/>
                <Route path='/categoryPage' element={<CategoryPage/>}/>
                
                <Route path='/account/myOrders' element={
                  <div className='wrapper'>
                    <div className="account__wrapper">
                      <ProfileMenu/>
                      <MyOrders/>
                    </div>
                  </div>
                }/>
                <Route path='/account/myLiked' element={
                  <div className='wrapper'>
                    <div className="account__wrapper">
                      <ProfileMenu/>
                      <MyLiked/>
                    </div>
                  </div>
                }/>
                <Route path='/product/:id' element={
                <>
                  <ProductPage openModalLogin={this.toggleLoginVisability}/>
                  {this.state.isLoginVisible && <AuthPanel onModalClose={this.toggleLoginVisability} isLoginVisible={this.state.isLoginVisible} />}
                </>
                }/>
                <Route path='/product/:id/characteristic' element={<ProductPageCharact/>}/>
                <Route path='/product/:id/reviews' element={
                  <>
                    <ProductPageReviews openModalLogin={this.toggleLoginVisability}/>
                    {this.state.isLoginVisible && <AuthPanel onModalClose={this.toggleLoginVisability} isLoginVisible={this.state.isLoginVisible} />}
                  </>
                }/>
                <Route path='*' element={<PageNotFound/>}/>
                
              </Routes>

          <Footer/>
        </Router>
  
  
  
        {/* <Header/>
        <Promotion/>
        <ProductsCategory title="Ноутбуки"/>
        <ProductsCategory title="Монітори"/>
        <ProductsCategory title="Відеокарти"/>
        <h1>hola amigos</h1>
        <Login/>
        <h1>hola amigos</h1>
        <Register/>
        <h1>hola amigos</h1>
        <Filter/>
        <h1>hola amigos</h1>
        <div className="App">
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        </div>
        <Footer/>
        <h1>Hola amigops</h1>
        <div className="OOOOrders">
          <ProfileMenu/>
          <MyOrders/>
        </div> */}
      </div>
  
    );
  }
}

export default App;
