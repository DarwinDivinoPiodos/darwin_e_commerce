import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Protected from "./Protected";
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}

        {/* Route components */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/productlist">
            <Protected Cmp={ProductList} />
          </Route>
          <Route path="/addproduct">
            <Protected Cmp={AddProduct} />
          </Route>

          <Route path="/updateproduct/:id">
            <Protected Cmp={UpdateProduct} />
          </Route>

          <Route path="/search">
            <Protected Cmp={SearchProduct} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
