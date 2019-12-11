import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProductListPage.sass";
import { getProducts } from "../../api.js";

export default class ProductListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productItems: [],
      loading: false,
      error: false
    };
  }

  async fetchGetProducts() {
    this.setState({
      loading: true
    });

    try {
      const result = await getProducts();
      this.setState({
        productItems: result
      });
    } catch (error) {
      this.setState({
        error: error
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    this.fetchGetProducts();
  }

  render() {
    const { productItems } = this.state;

    return (
      <div className="productWrap container">
        <h2 className="listTitle"> List of products</h2>
        <ul className="productsGroupList">
          {productItems.length > 0 ? (
            productItems.map(item => (
              <li key={item.id} className="card productItem">
                <Link
                  to={{
                    pathname: `/productlist/${item.id}`,
                    state: {
                      product: item
                    }
                  }}
                >
                  <img
                    className="card-img-top"
                    src={`http://smktesting.herokuapp.com/static/${item.img}`}
                    alt=""
                  />
                  <div className="card-body productBody">
                    <h4 className="card-title">{item.title}</h4>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="productMessage">There are no products</li>
          )}
        </ul>
      </div>
    );
  }
}
