import React, { Component } from "react";

import "./ProductListPage.sass";
import { getProducts } from "../../api.js";
import { Product } from "../index";

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
      <div className="productListWrap container">
        <h2 className="listTitle"> List of products</h2>
        <ul className="productsGroupList">
          {productItems && productItems.length > 0 ? (
            productItems.map(item => (
              <Product key={item.id} productItem={item} />
            ))
          ) : (
            <li className="productMessage">There are no products</li>
          )}
        </ul>
      </div>
    );
  }
}
