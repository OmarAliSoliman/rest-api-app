import React, { Component } from "react";

// css
import "./css/style.css";

// react router dom
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// component
import NavBar from "./Component/NavBar";
import Home from "./Pages/Home";
import ProductForm from "./Pages/ProductForm";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/productForm/:id' component={ProductForm} ></Route>
            <Route path='/' component = {Home}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
