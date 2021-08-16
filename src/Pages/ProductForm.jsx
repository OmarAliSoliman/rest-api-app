import React, { Component } from "react";

// axios
import axios from "axios";

// joi
import joi from "joi-browser";

class ProductForm extends Component {
  state = {
    name: "",
    price: "",
    lastItem: 0,
    errors: {},
  };

  schema = {
    name: joi.string().required(),
    price: joi.string().required(),
  };

  componentDidMount() {
    // if(this.state.lastItem === 0) return;
    axios.get("http://localhost:3000/product").then((res) => {
      if(res.data.length === 0){
        return
      }
      this.setState(
        {
          lastItem: res.data[res.data.length - 1].id,
        },
        () => {
          console.log(this.state.lastItem);
        }
      );
    });

    // for edit info
    const varUrl = this.props.match.params.id;
    // console.log(varUrl);
    if (varUrl !== "new") {
      axios.get("http://localhost:3000/product/" + varUrl).then((res) => {
        const state = { ...this.state };
        state.name = res.data.name;
        state.price = res.data.price;
        this.setState(state);
        // here i change ald state with new state
      });
    }
  }

  validate = (e) => {
    const state = { ...this.state };
    delete state.lastItem;
    delete state.errors;
    const res = joi.validate(state, this.schema, { abortEarly: false });

    if (res.error === null) {
      this.setState({
        errors: {},
      });
      return res.error;
    }

    let newErrors = {};
    res.error.details.map((er, index) => {
      newErrors[er.path] = er.message;
    });

    this.setState({
      errors: newErrors,
    });
    return res.error;
  };

  render() {
    const handelChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    const handelSubmit = (e) => {
      e.preventDefault();

      const errors = this.validate();
      console.log(errors);
      if (errors === null) {
        // Edit;
        const varUrl = this.props.match.params.id;
        if (varUrl !== "new") {
          const state = { ...this.state };
          state.count = 0;
          delete state.lastItem;
          delete state.errors;
          axios.put("http://localhost:3000/product/" + varUrl, state);

          // put send all object and replace it
          this.props.history.replace("/");

          // Add
        } else {
          const state = { ...this.state };
          state.count = 0;
          state.id = this.state.lastItem + 1;
          delete state.lastItem;
          delete state.errors;
          axios.post("http://localhost:3000/product", state);
          this.props.history.replace("/");
        }
      } else {
        return;
      }

    };

    const { name, price } = this.state;

    return (
      <div className="container">
        <form onSubmit={handelSubmit}>
          <h4 className="section-header">product form</h4>
          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <div className="form-group">
                <label htmlFor="productName"></label>
                <input
                  type="text"
                  name=""
                  id="productName"
                  placeholder="product-name"
                  className="form-control"
                  value={name}
                  name="name"
                  onChange={handelChange}
                />
                <span className="error">{this.state.errors.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice"></label>
                <input
                  type="text"
                  name=""
                  id="productPrice"
                  placeholder="product-price"
                  className="form-control"
                  value={price}
                  name="price"
                  onChange={handelChange}
                />
                <span className="error">{this.state.errors.price}</span>
              </div>
            </div>
          </div>
          <button className="btn bg-white mt-3" type="submit">
            {this.props.match.params.id === "new" ? "Save" : "Edit"}
          </button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
