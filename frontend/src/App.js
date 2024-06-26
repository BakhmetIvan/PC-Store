import './App.css';
import React, {useState, useEffect} from 'react';
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
import OrderPage from './orderPage/orderPage';
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


const App = () => {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isLoginVisible: false,
  //     // isloading: true,
  //     // cities: []
  //   }
  // }
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [cartData, setCartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [overflowY, setOverlowY] = useState(true);

  const token = localStorage.getItem('token');
  let currentQuantity = 1;

  useEffect( ()  => {
    if(token){
      fetch(`http://26.69.114.65:8080/cart`, {
          method: 'GET',
          headers: {
              "Content-Type": 'application/json',
              'Authorization': `Bearer ${token}`
          },
      })
      .then(response => response.json())
      .then(data => {
          setCartData(data);
          setIsLoading(false);
          console.log(data);
          console.log('apppppppppp')
      })
      .catch(error => {
          setIsLoading(false);
          console.log('Error fetching products:', error);
      });
    }
       
  }, []);

  const updateCartData = (newData) => {
      setCartData(newData);
  }


  const cartRequest = () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      fetch(`http://26.69.114.65:8080/cart`, {
         method: 'GET',
         headers: {
             "Content-Type": 'application/json',
             'Authorization': `Bearer ${token}`
         },
     })
     .then(response => response.json())
     .then(data => {
         setCartData(data);
         setIsLoading(false);
         console.log(data);
     })
     .catch(error => {
         setIsLoading(false);
         console.log('Error fetching products:', error);
     });
  }

  const onHandleCart = () => {
    setOverlowY(!overflowY);
    setIsCartOpen(!isCartOpen);
    document.body.style.overflowY = overflowY ? 'hidden' : 'scroll';
    cartRequest();
    console.log(overflowY);
}

  const toggleLoginVisability = () =>{
    setLoginVisible(!isLoginVisible);
    document.body.style.overflow = 'hidden';
  }

    return (
      <div>  
        <Router>
          <Header onLoginClick={toggleLoginVisability} cartData={cartData} updateCartData={updateCartData} cartRequest={cartRequest} isCartOpen={isCartOpen} isLoading={isLoading} onHandleCart={onHandleCart}/>
              <Routes>
                <Route path='/' element={
                  <div className='wrapper'>
                    <div className="container">
                      <div className="check_flexbox">
                        <LaptopsComponent cartData={cartData} updateCartData={updateCartData}/>
                      </div>
                      <Filter/>

                    </div>



                    {/* <ExampleVideoCard/> */}



                    {/* <Promotion/> */}


                    {/* <ProductsCategory title="Ноутбуки"/>
                    <ProductsCategory title="Монітори"/>
                    <ProductsCategory title="Відеокарти"/> */}


                    {isLoginVisible && <AuthPanel onModalClose={toggleLoginVisability} isLoginVisible={isLoginVisible} />}

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
                    <OrderPage/>
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
                  <ProductPage openModalLogin={toggleLoginVisability}/>
                  {isLoginVisible && <AuthPanel onModalClose={toggleLoginVisability} isLoginVisible={isLoginVisible} />}
                </>
                }/>
                <Route path='/product/:id/characteristic' element={<ProductPageCharact/>}/>
                <Route path='/product/:id/reviews' element={
                  <>
                    <ProductPageReviews openModalLogin={toggleLoginVisability}/>
                    {isLoginVisible && <AuthPanel onModalClose={toggleLoginVisability} isLoginVisible={isLoginVisible} />}
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

export default App;
