import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    const { productItem } = this.props;

    return (
      <li className="card productItem">
        <Link
          to={{
            pathname: `/productlist/${productItem.id}`,
            state: {
              product: productItem
            }
          }}
        >
          <img
            className="card-img-top"
            src={`http://smktesting.herokuapp.com/static/${productItem.img}`}
            alt=""
          />
          <div className="card-body productBody">
            <h4 className="card-title">{productItem.title}</h4>
          </div>
        </Link>
      </li>
    );
  }
}
