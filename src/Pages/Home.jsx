import React, { Component } from "react";

// react router dom
import { Link } from "react-router-dom";

// axios
import axios from "axios";

// react bootstrap
import { Table } from "react-bootstrap";


import {toast} from 'react-toastify';

class Home extends Component {
  state = {
    product: [],
  };

  componentDidMount() {
    axios.get("http://localhost:3000/product").then((res) => {
      this.setState({
        product: res.data,
      });
    });
  }

  // componentDidUpdate(){
  //   axios.get("http://localhost:3000/product").then((res) => {
  //     this.setState({
  //       product: res.data,
  //     });
  //   });
  // }

  render() {
    const { product } = this.state;

    const deleteItem = async (index, item) => {

      // copy of old product
      const oldProduct = [...this.state.product];

      const newProduct = [...this.state.product];
      newProduct.splice(index, 1);
      this.setState({
        product: newProduct,
      });

      try{
        await axios.delete("http://localhost:3000/product/" + item.id);
      }catch (ex){
        toast.error("Wrong Choose Item");
        this.setState({
          product: oldProduct 
        })
      }

    };

    return (
      <div className="container">
        <h4 className="section-header">Admin Panel</h4>
        <div className="bnt-add-more">
          <Link to="/productForm/new" className="btn">
            Add
          </Link>
          <Table hover className="mt-5 product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th>option</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link className="btn" to={"/productForm/" + item.id}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="btn btn-danger bg-danger"
                      onClick={() => deleteItem(index, item)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Home;
