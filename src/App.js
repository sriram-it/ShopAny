import './App.css';
import {Route, Switch} from 'react-router-dom';
import Product from './components/Product/Product';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() { 
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Product} exact/>
        <Route path="/product" component={Product}/>
        <Route path="/productDetail/:productId" component={ProductDetail}/>
      </Switch>
    </div>
  );
}

export default App;
