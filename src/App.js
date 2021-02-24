import './App.css';
import {Route, Switch} from 'react-router-dom';
import Product from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Order from './components/Order/Order';


function App() { 
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Product} exact/>
        <Route path="/product" component={Product}/>
        <Route path="/productDetail/:productId" component={ProductDetail}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/order" component={Order}/>
        <Route path="/checkout" component={Checkout} exact/>
        <Route path="/checkout/:cartId" component={Checkout}/>
      </Switch>
    </div>
  );
}

export default App;
