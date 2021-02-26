import './App.css';
import {Route, Switch} from 'react-router-dom';
import Product from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Order from './components/Order/Order';
import Category from './components/Category/Category';
import ProductManagement from './components/ProductManagement/ProductManagement';
import OrderManagement from './components/OrderManagement/OrderManagement';
import Statistics from './components/Statistics/Statistics';
import Login from './components/Login/Login';


function App() { 
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/product" component={Product}/>
        <Route path="/productDetail/:productId" component={ProductDetail}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/order" component={Order}/>
        <Route path="/checkout" component={Checkout} exact/>
        <Route path="/checkout/:cartId/:navfrom" component={Checkout}/>

        <Route path="/statistics" component={Statistics}/>
        <Route path="/category" component={Category}/>
        <Route path="/productManagement" component={ProductManagement}/>
        <Route path="/orderManagement" component={OrderManagement}/>
      </Switch>
    </div>
  );
}

export default App;
