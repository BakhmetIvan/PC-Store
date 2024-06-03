import './App.css';
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

function App() {
  return (
    <div>
      <Header/>
      <div className="App">
      <h1>hola amigos</h1>
      <Login/>
      <h1>hola amigos</h1>
      <Register/>
      </div>
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
      <Promotion/>
      <ProductsCategory title="Ноутбуки"/>
      <ProductsCategory title="Монітори"/>
      <ProductsCategory title="Відеокарти"/>
      <div className="OOOOrders">
        <ProfileMenu/>
        <MyOrders/>
      </div>
    </div>

  );
}

export default App;
