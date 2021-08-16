import React, { Component } from "react";

// css
import "./css/style.css";

// react router dom
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// react toastifiy
import { ToastContainer } from "react-toastify";

// component
import NavBar from "./Component/NavBar";
import Home from "./Pages/Home";
import ProductForm from "./Pages/ProductForm";

// css
import '../node_modules/react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Router>
          <div className="App">
            <NavBar />
            <Switch>
              <Route path="/productForm/:id" component={ProductForm}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
